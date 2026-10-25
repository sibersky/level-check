# Implementation Plan: Ultra-Fast Hybrid Telegram Experience for Poke-Me-On

This plan details the architecture and step-by-step implementation for transforming the **Poke-Me-On** Telegram interface into a blazing-fast, frictionless learning system combining:
1. **Instant Inline Chat Buttons (<100ms)** for quick scheduled reminders.
2. **Native Telegram Mini App (Web App)** for 60 FPS, zero-latency deep study sessions with audio, 3D card flips, and Telegram haptic feedback.

---

## 1. Root Bottlenecks Identified

1. **Sequential 6-Call Waterfall in Webhook**:
   - `answerCbQuery` &rarr; `findUnique` &rarr; `update` &rarr; `findFirst` &rarr; `editMessageText` &rarr; `sendFlashcard` are currently executed synchronously in series.
   - Total latency: **2.0s – 3.8s** of spinning clock on every button press.
2. **Synchronous Webhook Blocking**:
   - The bot waits for remote PostgreSQL roundtrips before acknowledging the user's tap to Telegram.
3. **Repeated Chat Clutter**:
   - Practicing 20 words in chat generates 40+ edited messages, polluting the student's conversation history.

---

## 2. Proposed Architecture & Solutions

### A. Accelerated Inline Chat Flow (<100ms Latency)
* **Immediate Telegram Acknowledgment**:
  - Send `answerCallbackQuery` in the very first tick (or directly in the webhook HTTP response body), stopping Telegram's loading spinner in **under 50ms**.
* **Parallel DB & Message Updates**:
  - Run the SM-2 algorithm in-memory and execute the Telegram message edit and database persistence in parallel.
* **Lean Prisma Projections**:
  - Select only minimal fields (`id, front, back, easinessFactor, interval, repetitions`) to minimize SQL wire transfer.

### B. Dedicated Telegram Mini App (`/poke_me_on/mini-app`)
* **Zero-Latency Client-Side Review**:
  - The Mini App loads all cards due for the session in a single lightweight JSON payload.
  - Flipping cards, grading recall, viewing example sentences, and playing pronunciation audio occur **instantly (0ms latency, 60 FPS)** in the client.
* **Native Telegram UX Integration**:
  - Adapts automatically to the user's Telegram theme (dark/light, accent colors).
  - Native Telegram **Haptic Feedback** (`impactOccurred('medium')` on flips and grading).
  - Native Telegram `MainButton` for session completion.
* **Frictionless Auto-Authentication via Telegram `initData`**:
  - No passwords or login redirects required. The Mini App validates Telegram's cryptographic HMAC signature against the bot token to authenticate the student automatically.

### C. Chat & Bot Command Integration
* In `/start` and review notifications:
  - Provide both quick inline buttons for 1-card checks and a prominent button: **«📱 Открыть режим карточек (Mini App)»**.
* Set Telegram Bot Menu Button to open the Mini App with 1 tap at the bottom of the chat interface.

---

## 3. Step-by-Step Implementation Steps

### Phase 1: Optimize Webhook & Inline Buttons
1. **Refactor `src/pages/api/telegram/webhook.ts`**:
   - Call `bot.telegram.answerCbQuery(callbackQueryId)` immediately before async operations.
   - Parallelize database queries and message edits.
   - Optimize Prisma queries with lean field selection.
2. **Benchmarking & Testing**:
   - Verify Telegram button response drops from ~2.5s down to <100ms.

### Phase 2: Build the Telegram Mini App (`/mini-app`)
1. **Telegram WebApp SDK Integration**:
   - Add Telegram WebApp client scripts and haptic feedback wrappers.
2. **Build Mini App Page (`src/pages/mini-app.tsx`)**:
   - Clean, mobile-first card interface matching Teacher Alex design system.
   - 3D card flip animation, audio pronunciation (TTS), and SM-2 grading buttons (Again, Hard, Good, Easy).
   - Session progress bar and summary screen with celebration animations.
3. **Telegram WebApp Authentication Route (`/api/telegram/webapp-session.ts`)**:
   - Verifies Telegram `initData` cryptographic hash and returns session tokens.

### Phase 3: Bot Menu & Notification Wiring
1. **Update `telegramUtils.ts`**:
   - Add the Mini App button (`web_app: { url: ... }`) to scheduled reminders.
   - Configure Telegram bot menu button to launch the Mini App.
2. **Build and Deployment**:
   - Run type checks, build verification, and push to GitHub repository.

---

## 4. Verification & Success Metrics

- **Inline Button Tap Latency**: Spinner stops in <100ms.
- **Mini App Review Latency**: 0ms card transitions, client-side 60 FPS.
- **Zero Chat Friction**: Clean, modern study flow without spamming chat logs.
