export interface AuditIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  component: string;
  problem: string;
  solution: string;
  beforeCode: string;
  afterCode: string;
}

export const AUDIT_ISSUES: AuditIssue[] = [
  {
    id: 'deep-link',
    title: 'Manual 6-Digit Code vs. 1-Tap Telegram Deep Link',
    severity: 'critical',
    component: 'teacher-alex-account (Webhook & Link UI)',
    problem:
      'Currently, users are asked to memorize a 6-digit code, open Telegram manually, find the bot, and type "/link 123456". If they simply tap "START", the webhook rejects them with an error ("❓ Invalid command"). On mobile devices, this causes massive user drop-off.',
    solution:
      'Support Telegram deep-linking via "https://t.me/BotUsername?start=CODE". When the user taps the button, Telegram opens directly with a blue "START" button. Tapping START sends "/start CODE" which immediately connects their account with zero typing.',
    beforeCode: `// src/pages/api/telegram/webhook/[secret].ts
const messageText = message.text;
const match = messageText?.match(/^\\/link\\s+(\\d{6})$/);
if (!match) {
  await sendTelegramMessage(chatId, '❓ Invalid command. Please use /link 123456');
  return null;
}`,
    afterCode: `// src/pages/api/telegram/webhook/[secret].ts
const messageText = message.text?.trim() || '';

// Supports /start 123456 (1-tap deep link), /link 123456, or plain 123456
const match = messageText.match(/^(?:\\/(?:start|link)\\s+)?(\\d{6})$/i);

if (!match) {
  if (messageText === '/start') {
    await sendTelegramMessage(
      chatId,
      '👋 *Welcome to Teacher Alex!*\\n\\nPlease tap the **Connect Telegram** button on the website, or send your 6-digit code here.'
    );
  } else {
    await sendTelegramMessage(chatId, '❓ Invalid code. Please send /link 123456 with your code.');
  }
  return null;
}`,
  },
  {
    id: 'poke-me-on-signin-path',
    title: 'Broken Sign-in Path (/auth/signin vs /auth/login)',
    severity: 'critical',
    component: 'poke-me-on (src/pages/settings.tsx)',
    problem:
      'In poke-me-on, unauthenticated redirects point to `${accountHubUrl}/auth/signin`. However, teacher-alex-account hosts the login page at `/auth/login`. This results in a 404 Not Found error whenever unauthenticated users access poke-me-on settings.',
    solution:
      'Update poke-me-on to point to `/auth/login` and add an automatic alias/redirect in teacher-alex-account from `/auth/signin` to `/auth/login` for backward compatibility.',
    beforeCode: `// poke-me-on/src/pages/settings.tsx
const destination = accountHubUrl
  ? \`\${accountHubUrl}/auth/signin?callbackUrl=\${encodeURIComponent(appBaseUrl + context.resolvedUrl)}\`
  : '/';
return { redirect: { destination, permanent: false } };`,
    afterCode: `// poke-me-on/src/pages/settings.tsx
const destination = accountHubUrl
  ? \`\${accountHubUrl}/auth/login?callbackUrl=\${encodeURIComponent(appBaseUrl + context.resolvedUrl)}\`
  : '/';
return { redirect: { destination, permanent: false } };`,
  },
  {
    id: 'nextauth-redirect-block',
    title: 'Cross-Subdomain Callback Redirection Blocked by NextAuth',
    severity: 'critical',
    component: 'teacher-alex-account (src/pages/api/auth/[...nextauth].ts)',
    problem:
      'NextAuth defaults to preventing redirects to origins other than baseUrl (account.teacher-alex.com). When a student comes from poke-me-on (https://teacher-alex.com/poke_me_on), NextAuth drops the callbackUrl and forces the student back to account.teacher-alex.com, breaking SSO navigation.',
    solution:
      'Implement an explicit `redirect` callback in NextAuth options that permits URLs under .teacher-alex.com and development hosts.',
    beforeCode: `// teacher-alex-account/src/pages/api/auth/[...nextauth].ts
// (No redirect callback is defined — NextAuth defaults to same-origin only)
callbacks: {
  async jwt({ token, user }) { ... },
  async session({ session, token }) { ... },
}`,
    afterCode: `// teacher-alex-account/src/pages/api/auth/[...nextauth].ts
callbacks: {
  async redirect({ url, baseUrl }) {
    // Relative paths
    if (url.startsWith('/')) return \`\${baseUrl}\${url}\`;
    
    try {
      const parsedUrl = new URL(url);
      // Allow any *.teacher-alex.com subdomain or the apex domain
      if (
        parsedUrl.hostname === 'teacher-alex.com' ||
        parsedUrl.hostname.endsWith('.teacher-alex.com') ||
        parsedUrl.hostname === 'localhost' ||
        parsedUrl.hostname.endsWith('.run.app')
      ) {
        return url;
      }
    } catch {
      // invalid URL format fallback
    }
    return baseUrl;
  },
  async jwt({ token, user }) { ... },
  async session({ session, token }) { ... },
}`,
  },
  {
    id: 'jwt-telegram-cache-bug',
    title: 'Poke-Me-On Telegram Status Cache Invalidation Bug',
    severity: 'high',
    component: 'poke-me-on (src/pages/api/auth/[...nextauth].ts)',
    problem:
      'In poke-me-on, the JWT callback checks `token.telegramChatId === undefined` before fetching the latest status from the DB. But upon first login, `telegramChatId` is set to `null` (not undefined). Because `null !== undefined`, Poke-Me-On NEVER refreshes `telegramChatId` from the DB even if the user clicks "Refresh Status"!',
    solution:
      'Update the JWT callback to check `trigger === "update"` or re-verify with the database whenever `token.telegramChatId` is falsy.',
    beforeCode: `// poke-me-on/src/pages/api/auth/[...nextauth].ts
async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.telegramChatId = user.telegramChatId ?? null;
  }
  // BUG: token.telegramChatId is null, so null === undefined is false!
  else if (token.id && token.telegramChatId === undefined) {
    const dbUser = await prisma.user.findUnique({ where: { id: token.id }});
    token.telegramChatId = dbUser?.telegramChatId ?? null;
  }
  return token;
}`,
    afterCode: `// poke-me-on/src/pages/api/auth/[...nextauth].ts
async jwt({ token, user, trigger }) {
  if (user) {
    token.id = user.id;
    token.telegramChatId = user.telegramChatId ?? null;
  } else if (token.id && (trigger === 'update' || !token.telegramChatId)) {
    // Properly re-fetches from DB on session.update() or when unlinked
    const dbUser = await prisma.user.findUnique({
      where: { id: token.id as string },
      select: { telegramChatId: true }
    });
    token.telegramChatId = dbUser?.telegramChatId ?? null;
  }
  return token;
}`,
  },
  {
    id: 'registration-flow',
    title: 'Post-Registration Dead End vs. Guided Telegram Onboarding',
    severity: 'medium',
    component: 'teacher-alex-account (UI & Navigation)',
    problem:
      'After registration and email verification, users are left on `/settings/profile` with no direction. Telegram is buried in `/settings/security` below the password form. Users have no clue what to do to get their vocabulary words.',
    solution:
      'Show a guided 2-step onboarding banner across the hub: "Step 1: Account Verified ✅ → Step 2: Connect Telegram to receive vocabulary cards". Include a direct 1-tap connect button and immediate confirmation.',
    beforeCode: `// User registers -> navigates to /auth/check-email -> verifies ->
// redirects to /auth/login -> logs in -> redirects to /settings/profile.
// Screen shows only Name & Email. Zero mention of Telegram or Poke-Me-On.`,
    afterCode: `// Prominent Onboarding Card rendered on Home & Profile:
<div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
  <div className="flex items-center gap-3">
    <div className="p-2 bg-amber-500 text-white rounded-lg">
      <Bot className="w-5 h-5" />
    </div>
    <div>
      <h3 className="font-bold text-amber-950">Finish Setup: Connect Telegram</h3>
      <p className="text-sm text-amber-800">
        To receive your scheduled English vocabulary cards in Poke-Me-On, link your Telegram.
      </p>
    </div>
  </div>
  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium" asChild>
    <a href={deepLinkUrl} target="_blank">
      <Send className="w-4 h-4 mr-2" /> Connect in 1 Tap on Telegram
    </a>
  </Button>
</div>`,
  },
];
