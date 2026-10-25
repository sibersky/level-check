# Level Check — Teacher Alex

Clean, modern, responsive CEFR Language Placement & Level Diagnostic application for **[teacher-alex.com](https://teacher-alex.com)**.

Runs **100% client-side** with zero external API calls or latency.

## 🚀 Features

- **Built-in Quick CEFR Estimator (18 Questions per Language)**:
  - Calibrated questions spanning A1 to C2 (Grammar, Vocabulary, Reading Comprehension).
  - Confidence weighting toggle (⚡ Confident vs 💭 Unsure) to eliminate lucky guesses.
  - "I'm not sure / Skip" mechanism.
  - Comprehensive results dashboard with band estimation, sub-skill mastery, and "Reality Check" (receptive vs productive fluency).
- **Curated Directory of Free Online Placement Tests**:
  - Filterable by accuracy, time (<20 mins), and audio/listening comprehension.
  - 7 English assessments (EF SET, Cambridge, British Council, Test-English, EnglishRadar, Lenguia, Preply).
  - 6 Spanish assessments (Instituto Cervantes AVE Global, Kwiziq, 123TeachMe, Cervantes EI, Lenguia, ESL).
  - 100% localized in **Russian**, **English**, and **Spanish**.
- **CEFR Reference Guide (A1–C2)**:
  - Interactive accordion detailing can-do criteria for Reading, Listening, Speaking, and Writing.
  - In-depth pedagogical guide explaining the "Passive Knowledge Gap".
- **Teacher Alex Suite Ecosystem Integration**:
  - Direct integration links with *Smart Reader*, *Story Maker*, *Poke-Me-On*, and *Simply New*.
  - Matches the official Teacher Alex design system (`theme.css`, `logo.png`, `brand-200` periwinkle background).

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with Teacher Alex design tokens
- **Icons**: Lucide React
- **Deployment**: Configured for Vercel via `vercel.json`

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

## 🌐 Deploy to Vercel

```bash
vercel deploy --prod
```
