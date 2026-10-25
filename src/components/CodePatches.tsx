import React, { useState } from 'react';
import { FileCode, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface PatchFile {
  name: string;
  path: string;
  repo: 'teacher-alex-account' | 'poke-me-on';
  description: string;
  content: string;
}

const PATCH_FILES: PatchFile[] = [
  {
    name: 'Telegram Webhook Handler',
    path: 'src/pages/api/telegram/webhook/[secret].ts',
    repo: 'teacher-alex-account',
    description: 'Enables 1-tap Telegram deep linking via /start [code], provides rich markdown response with Poke-Me-On button, and supports manual /link [code].',
    content: `// src/pages/api/telegram/webhook/[secret].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const telegramMessageSchema = z.object({
  message: z.object({
    message_id: z.number(),
    chat: z.object({
      id: z.number(),
    }),
    text: z.string().optional(),
    date: z.number(),
  }),
});

async function sendTelegramMessage(
  chatId: number | string,
  text: string,
  replyMarkup?: any
): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return;

  const url = \`https://api.telegram.org/bot\${botToken}/sendMessage\`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup,
      }),
    });
  } catch (err) {
    console.error('Error sending telegram message:', err);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { secret } = req.query;
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Acknowledge Telegram immediately (200 OK)
  res.status(200).json({ status: 'received' });

  process.nextTick(async () => {
    try {
      const parseResult = telegramMessageSchema.safeParse(req.body);
      if (!parseResult.success) return;

      const { message } = parseResult.data;
      const chatId = message.chat.id;
      const rawText = message.text?.trim() || '';

      // Match /start 123456 (deep link), /link 123456, or raw 6 digits
      const match = rawText.match(/^(?:\\/(?:start|link)\\s+)?(\\d{6})$/i);

      if (!match) {
        if (rawText === '/start') {
          await sendTelegramMessage(
            chatId,
            '👋 *Welcome to Teacher Alex Vocabulary Assistant!*\\n\\nTo link your account, tap the **Connect on Telegram** button on the website, or reply here with \`/link [your 6-digit code]\`.'
          );
        } else {
          await sendTelegramMessage(
            chatId,
            '❓ Invalid code. Please use \`/link 123456\` with the active 6-digit code from your Teacher Alex settings.'
          );
        }
        return;
      }

      const userProvidedCode = match[1];

      // Query active codes
      const activeUsers = await prisma.user.findMany({
        where: {
          telegramLinkingCode: { not: null },
          telegramLinkingCodeExpires: { gt: new Date() },
        },
        select: { id: true, telegramLinkingCode: true, name: true },
      });

      let matchedUserId: string | null = null;
      let matchedUserName: string | null = null;

      for (const u of activeUsers) {
        if (u.telegramLinkingCode && (await bcrypt.compare(userProvidedCode, u.telegramLinkingCode))) {
          matchedUserId = u.id;
          matchedUserName = u.name;
          break;
        }
      }

      if (matchedUserId) {
        // Link chat ID and clear code
        await prisma.user.update({
          where: { id: matchedUserId },
          data: {
            telegramChatId: chatId.toString(),
            telegramLinkingCode: null,
            telegramLinkingCodeExpires: null,
          },
        });

        const appUrl = process.env.NEXTAUTH_URL || 'https://www.teacher-alex.com';
        const pokeMeOnUrl = \`\${appUrl}/poke_me_on\`;

        // Send rich celebration message with inline button back to Poke-Me-On
        await sendTelegramMessage(
          chatId,
          \`🎉 *Awesome \${matchedUserName || 'there'}! Your Telegram is connected to Teacher Alex!* 🎓\\n\\nYou will now receive scheduled vocabulary flashcards directly here in Telegram based on your Poke-Me-On settings.\`,
          {
            inline_keyboard: [
              [
                {
                  text: '🚀 Open Poke-Me-On & Review Words',
                  url: pokeMeOnUrl,
                },
              ],
            ],
          }
        );
      } else {
        await sendTelegramMessage(
          chatId,
          '❌ *Expired or Invalid Code*\\n\\nThe code you provided could not be found or has expired. Please refresh your browser page to get a new code.'
        );
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
    }
  });
}`,
  },
  {
    name: 'NextAuth Options with Cross-Subdomain SSO',
    path: 'src/pages/api/auth/[...nextauth].ts',
    repo: 'teacher-alex-account',
    description: 'Adds custom redirect callback to allow returning students to poke-me-on (cross-origin callbackUrl preservation).',
    content: `// In authOptions inside teacher-alex-account/src/pages/api/auth/[...nextauth].ts
callbacks: {
  async redirect({ url, baseUrl }) {
    // Relative paths stay on current baseUrl
    if (url.startsWith('/')) return \`\${baseUrl}\${url}\`;

    try {
      const targetOrigin = new URL(url);
      const isAllowedDomain =
        targetOrigin.hostname === 'teacher-alex.com' ||
        targetOrigin.hostname.endsWith('.teacher-alex.com') ||
        targetOrigin.hostname === 'localhost' ||
        targetOrigin.hostname.endsWith('.run.app') ||
        targetOrigin.hostname.endsWith('.vercel.app');

      if (isAllowedDomain) {
        return url; // CRITICAL: Allows redirecting user back to poke-me-on!
      }
    } catch (e) {
      // Invalid URL fallback
    }

    return baseUrl;
  },
  async jwt({ token, user, trigger }) {
    if (user) {
      token.id = user.id;
      token.telegramChatId = user.telegramChatId;
    } else if (trigger === 'update' && token.id) {
      const freshUser = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { telegramChatId: true },
      });
      token.telegramChatId = freshUser?.telegramChatId || null;
    }
    return token;
  },
  async session({ session, token }) {
    if (token?.id && session.user) {
      session.user.id = token.id as string;
      session.user.telegramChatId = token.telegramChatId as string | null;
    }
    return session;
  },
},`,
  },
  {
    name: 'Poke-Me-On JWT Fix',
    path: 'src/pages/api/auth/[...nextauth].ts',
    repo: 'poke-me-on',
    description: 'Fixes the null !== undefined bug that prevented Poke-Me-On from ever refreshing Telegram status when clicking Refresh Status.',
    content: `// In poke-me-on/src/pages/api/auth/[...nextauth].ts
callbacks: {
  async jwt({ token, user, trigger }) {
    // Initial sign-in:
    if (user) {
      token.id = user.id;
      token.telegramChatId = user.telegramChatId ?? null;
    }
    // FIX: Trigger re-fetch on session.update() or if telegramChatId is not set
    else if (token.id && (trigger === 'update' || !token.telegramChatId)) {
      const dbUser = await prisma.user.findUnique({
        where: { id: token.id as string },
        select: { telegramChatId: true },
      });
      token.telegramChatId = dbUser?.telegramChatId ?? null;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      if (token.id) session.user.id = token.id as string;
      session.user.telegramChatId = (token.telegramChatId as string | null) ?? null;
    }
    return session;
  },
},`,
  },
  {
    name: 'Poke-Me-On Settings Path Fix',
    path: 'src/pages/settings.tsx',
    repo: 'poke-me-on',
    description: 'Fixes the 404 destination from /auth/signin to /auth/login.',
    content: `// In poke-me-on/src/pages/settings.tsx (getServerSideProps)
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const accountHubUrl = process.env.ACCOUNT_HUB_URL;
  const appBaseUrl = process.env.NEXTAUTH_URL;

  if (!session?.user?.id || !accountHubUrl || !appBaseUrl) {
    // FIX: Use /auth/login instead of /auth/signin to prevent 404 error
    const destination = accountHubUrl
      ? \`\${accountHubUrl}/auth/login?callbackUrl=\${encodeURIComponent(appBaseUrl + context.resolvedUrl)}\`
      : '/';
    return { redirect: { destination, permanent: false } };
  }

  // ... rest of handler
};`,
  },
];

export const CodePatches: React.FC = () => {
  const [selectedPatch, setSelectedPatch] = useState<PatchFile>(PATCH_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedPatch.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          Production-Ready Code Patches
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review and copy the exact, tested code replacements for both <code>teacher-alex-account</code> and <code>poke-me-on</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File selector list */}
        <div className="lg:col-span-4 space-y-2">
          {PATCH_FILES.map((patch) => {
            const isSelected = selectedPatch.name === patch.name;
            return (
              <div
                key={patch.name}
                onClick={() => setSelectedPatch(patch)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-amber-500 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded ${
                      patch.repo === 'teacher-alex-account'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}
                  >
                    {patch.repo}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">{patch.name}</h4>
                <p className="text-xs font-mono text-slate-400 mt-1 truncate">{patch.path}</p>
              </div>
            );
          })}
        </div>

        {/* Code Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400">{selectedPatch.path}</span>
              <h3 className="text-base font-bold text-white">{selectedPatch.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedPatch.description}</p>
            </div>
            <button
              onClick={handleCopy}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-950" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto max-h-[460px] leading-relaxed">
            <code>{selectedPatch.content}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
