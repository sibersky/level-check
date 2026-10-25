import { SmartReaderSimulator } from './SmartReaderSimulator';
import React, { useState, useEffect } from 'react';
import {
  LogIn,
  Mail,
  ShieldCheck,
  User as UserIcon,
  KeyRound,
  Send,
  ExternalLink,
  CheckCircle,
  XCircle,
  RefreshCw,
  Copy,
  Check,
  Bot,
  Clock,
  Sparkles,
} from 'lucide-react';
import { TelegramSimulator } from './TelegramSimulator';

interface TeacherAlexExperienceProps {
  activeView: 'landing' | 'login' | 'profile' | 'pokemeon' | 'smartreader';
  setActiveView: (view: 'landing' | 'login' | 'profile' | 'pokemeon' | 'smartreader') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

export const TeacherAlexExperience: React.FC<TeacherAlexExperienceProps> = ({
  activeView,
  setActiveView,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [isLinked, setIsLinked] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [linkingCode, setLinkingCode] = useState<string | null>('784920');
  const [countdown, setCountdown] = useState(300);
  const [copied, setCopied] = useState(false);
  const [displayName, setDisplayName] = useState('Aleksei');
  const [showSimModal, setShowSimModal] = useState(false);
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const handleLinkSuccess = (id: string) => {
    setIsLinked(true);
    setChatId(id);
    setLinkingCode(null);
  };

  const handleUnlink = () => {
    setIsLinked(false);
    setChatId(null);
    setLinkingCode('492105');
    setCountdown(300);
  };

  const generateNewCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setLinkingCode(newCode);
    setCountdown(300);
  };

  const botUsername = 'TeacherAlexAccountBot';
  const deepLinkUrl = `https://t.me/${botUsername}?start=${linkingCode}`;

  return (
    <div className="w-full space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          SCREEN 1: LANDING PAGE (Exact match to User Image 1)
         ───────────────────────────────────────────────────────────── */}
      {activeView === 'landing' && (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center select-none animate-in fade-in duration-300">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e2942] tracking-tight mb-4">
            Language-Learning Tools
          </h1>
          <p className="text-base md:text-lg text-[#2e3b63] max-w-xl mx-auto leading-relaxed">
            Select a tool below to improve your language skills.
          </p>
          <p className="text-sm md:text-base text-[#3b4b7c] mb-12">
            More tools coming soon!
          </p>

          {/* 3 Circular Tool Buttons from Screenshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 max-w-4xl w-full px-4">
            {/* Tool 1: Story Maker */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#1e2942] group-hover:bg-[#141c2e] shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                {/* Story Maker Parchment & Feather Icon */}
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <span className="text-4xl">📜</span>
                </div>
              </div>
              <span className="mt-3 font-semibold text-base text-[#1e2942] group-hover:text-[#0b101b]">
                Story Maker
              </span>
            </div>

            {/* Tool 2: Simply New */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#1e2942] group-hover:bg-[#141c2e] shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                {/* Simply New Globe with News banner Icon */}
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <span className="text-4xl">🌐</span>
                </div>
              </div>
              <span className="mt-3 font-semibold text-base text-[#1e2942] group-hover:text-[#0b101b]">
                Simply New
              </span>
            </div>

            {/* Tool 4: Smart Reader */}
            <div
              onClick={() => setActiveView("smartreader")}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-[#1e2942] group-hover:bg-[#141c2e] shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ring-4 ring-emerald-400/50">
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <span className="text-4xl">📖</span>
                </div>
              </div>
              <span className="mt-3 font-semibold text-base text-[#1e2942] group-hover:text-[#0b101b]">
                Smart Reader
              </span>
              <span className="mt-1 text-xs text-emerald-900 bg-emerald-300/80 px-2 py-0.5 rounded-full font-medium">
                CEFR & OCR →
              </span>
            </div>

            {/* Tool 3: Poke Me On (Primary entry for user's vocabulary reminders) */}
            <div
              onClick={() => {
                if (isLoggedIn) {
                  setActiveView('pokemeon');
                } else {
                  setActiveView('login');
                }
              }}
              className="flex flex-col items-center group cursor-pointer relative"
            >
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-[#1e2942] group-hover:bg-[#141c2e] shadow-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ring-4 ring-amber-400/50">
                {/* Poke Me On Bell with Clock Icon */}
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <span className="text-4xl">🔔</span>
                </div>
              </div>
              <span className="mt-3 font-semibold text-base text-[#1e2942] group-hover:text-[#0b101b]">
                Poke Me On
              </span>
              <span className="mt-1 text-xs text-amber-900 bg-amber-300/80 px-2 py-0.5 rounded-full font-medium">
                Try Vocabulary Cards →
              </span>
            </div>
          </div>
        </div>
      )}

            {/* ─────────────────────────────────────────────────────────────
          SCREEN 5: SMART READER (CEFR Graded Reader & OCR)
         ───────────────────────────────────────────────────────────── */}
      {activeView === 'smartreader' && (
        <SmartReaderSimulator
          onBack={() => setActiveView('landing')}
          isLoggedIn={isLoggedIn}
          onOpenLogin={() => setActiveView('login')}
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 2: LOGIN (Exact match to User Image 2)
         ───────────────────────────────────────────────────────────── */}
      {activeView === 'login' && (
        <div className="flex items-center justify-center py-8 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white border border-[#1e293b]/70 rounded-2xl shadow-xl p-8 sm:p-10 text-center">
            {/* Login Icon */}
            <div className="flex justify-center mb-3">
              <LogIn className="w-8 h-8 text-[#1e293b]" />
            </div>

            <h2 className="text-2xl font-bold text-[#1e293b] mb-1">Login</h2>
            <p className="text-xs text-[#475569] mb-6">Access your Teacher Alex account.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setActiveView('profile');
              }}
              className="space-y-4 text-left"
            >
              {/* Email Input (Cream background like in screenshot) */}
              <div>
                <label className="text-xs font-medium text-[#1e293b] block mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="alex_esl@proton.me"
                  className="w-full bg-[#fffbeb] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#48598f]"
                />
              </div>

              {/* Password Input (Cream background like in screenshot) */}
              <div>
                <label className="text-xs font-medium text-[#1e293b] block mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="password123"
                  className="w-full bg-[#fffbeb] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#48598f]"
                />
                <div className="text-right mt-1.5">
                  <span className="text-xs text-[#334155] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
              </div>

              {/* Sign In Button (Deep periwinkle slate blue) */}
              <button
                type="submit"
                className="w-full bg-[#48598f] hover:bg-[#3b4b7c] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors shadow-sm cursor-pointer mt-2"
              >
                Sign In with Email
              </button>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1e293b]/40"></div>
                </div>
                <span className="relative bg-white px-2 text-[10px] font-bold text-[#475569] tracking-wider uppercase">
                  or continue with
                </span>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                  setActiveView('profile');
                }}
                className="w-full bg-white hover:bg-slate-50 border border-[#1e293b] text-[#1e293b] font-medium py-2 rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>

              <div className="text-center text-xs text-[#334155] pt-3">
                Don't have an account?{' '}
                <span className="font-semibold text-[#1e293b] hover:underline cursor-pointer">
                  Register
                </span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 3: PROFILE SETTINGS + TELEGRAM (Image 3 + The Solution)
         ───────────────────────────────────────────────────────────── */}
      {activeView === 'profile' && (
        <div className="max-w-2xl mx-auto py-6 space-y-6 animate-in fade-in duration-300">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1e2942] mb-4">
              Profile Settings
            </h1>

            {/* Profile & Security Tabs (matching screenshot) */}
            <div className="flex space-x-6 text-sm font-semibold text-[#1e2942] border-b border-[#7b8bb8] pb-1">
              <span className="inline-flex items-center border-b-2 border-[#1e2942] pb-2 cursor-pointer">
                <UserIcon size={16} className="mr-1.5" /> Profile
              </span>
              <span
                onClick={() => {}}
                className="inline-flex items-center text-[#334155] hover:text-[#1e2942] pb-2 cursor-pointer"
              >
                <KeyRound size={16} className="mr-1.5" /> Security
              </span>
            </div>
          </div>

          {/* 🌟 1. THE NEW 1-TAP TELEGRAM CARD (Placed directly on Profile, matching slate card style with subtle green highlight) */}
          <div className="bg-[#6373a6] border-2 border-emerald-400/50 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#7b8bb8]/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#1e2942] text-white">
                  <Bot className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    Telegram Word Assistant (Poke-Me-On)
                  </h3>
                  <p className="text-xs text-[#cbd4e8]">
                    Automated spaced-repetition vocabulary sent to your phone
                  </p>
                </div>
              </div>

              {isLinked ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Linked
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-[#1e2942] shadow-xs">
                  Connect Required
                </span>
              )}
            </div>

            {/* Linked vs Unlinked state */}
            {isLinked ? (
              <div className="space-y-3">
                <div className="p-3.5 bg-[#cbd4e8] text-[#1e293b] rounded-xl border border-[#1e293b]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center text-xs font-medium">
                    <CheckCircle className="mr-2 size-4 text-emerald-700 shrink-0" />
                    <span>
                      Connected to Chat ID: <strong className="font-mono">{chatId || '582335339'}</strong>
                    </span>
                  </div>
                  <button
                    onClick={handleUnlink}
                    className="text-xs text-rose-700 hover:text-rose-900 underline font-semibold"
                  >
                    Unlink
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#cbd4e8] pt-1 gap-2">
                  <span>Your next batch of vocabulary words is scheduled.</span>
                  <button
                    onClick={() => setActiveView('pokemeon')}
                    className="bg-[#48598f] hover:bg-[#3b4b7c] text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg border border-[#7b8bb8] flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Open Poke-Me-On Settings</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#cbd4e8] leading-relaxed">
                  To receive your scheduled English flashcards directly in Telegram, connect your account in one tap:
                </p>

                <div className="p-4 bg-[#cbd4e8] text-[#1e293b] rounded-xl border border-[#1e293b]/40 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* 1-TAP BUTTON */}
                    <button
                      onClick={() => setShowSimModal(true)}
                      className="w-full sm:w-auto bg-[#48598f] hover:bg-[#3b4b7c] text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#3b4b7c] transition-transform active:scale-95"
                    >
                      <Send className="w-3.5 h-3.5 text-sky-200" />
                      <span>Open Telegram & Connect in 1 Tap</span>
                      <ExternalLink className="w-3 h-3 text-sky-200" />
                    </button>

                    <span className="text-xs text-slate-500 font-medium">or</span>

                    {/* Manual Code */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#334155]">Code:</span>
                      <span className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-slate-400 text-slate-900 tracking-wider">
                        {linkingCode}
                      </span>
                      <button
                        onClick={() => {
                          if (linkingCode) {
                            navigator.clipboard.writeText(linkingCode);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        className="text-slate-600 hover:text-slate-900 p-1"
                        title="Copy code"
                      >
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#475569] pt-1.5 border-t border-slate-400/40">
                    <span>
                      Desktop: send <code className="bg-white px-1 py-0.2 rounded font-mono">/link {linkingCode}</code> to <strong>@{botUsername}</strong>
                    </span>
                    <span>Valid: <strong>{formatCountdown(countdown)}</strong></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🌟 2. THE EXISTING PROFILE DETAILS CARD (Exact replica of User Image 3) */}
          <div className="bg-[#6373a6] border border-[#1e293b]/70 rounded-2xl p-6 text-white shadow-lg space-y-5">
            <p className="text-xs text-[#cbd4e8]">View and update your account details.</p>

            {/* Inner Details Box (Image 3: light lavender box with email & status) */}
            <div className="p-4 bg-[#cbd4e8] text-[#1e293b] rounded-xl border border-[#1e293b]/40 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#334155]" />
                <span className="font-semibold text-[#1e293b]">Email:</span>
                <span className="text-[#334155]">alex_esl@proton.me</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span className="font-semibold text-[#1e293b]">Status:</span>
                <span className="text-[#15803d] font-semibold">Verified on 4/18/2025</span>
              </div>
            </div>

            {/* Form (Image 3: Display Name & Save Changes) */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white block mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-[#cbd4e8] border border-[#1e293b] rounded-lg px-3.5 py-2 text-sm text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#1e293b]"
                />
              </div>

              <button
                disabled
                className="bg-[#55659b] text-slate-300 font-semibold text-xs px-5 py-2.5 rounded-lg border border-[#48598f] opacity-80 cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SCREEN 4: POKE-ME-ON SETTINGS (Synchronized Spoke App)
         ───────────────────────────────────────────────────────────── */}
      {activeView === 'pokemeon' && (
        <div className="max-w-2xl mx-auto py-6 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#7b8bb8] pb-3">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#1e2942]">
                    {locale === "ru" ? "Настройки Poke-Me-On" : "Poke-Me-On Settings"}
                  </h1>
                  <p className="text-xs text-[#2e3b63]">
                    {locale === "ru" ? "Интервальное повторение слов, расписание и тихие часы" : "Spaced-repetition reminder frequencies & quiet hours"}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#8b9ac6] p-1 rounded-lg text-xs font-bold border border-[#6f80b0]">
                  <button
                    onClick={() => setLocale("ru")}
                    className={`px-2 py-1 rounded transition-colors ${locale === "ru" ? "bg-[#1e2942] text-white" : "text-[#1e2942]"}`}
                  >
                    🇷🇺 Русский
                  </button>
                  <button
                    onClick={() => setLocale("en")}
                    className={`px-2 py-1 rounded transition-colors ${locale === "en" ? "bg-[#1e2942] text-white" : "text-[#1e2942]"}`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setActiveView('profile')}
              className="text-xs font-semibold text-white bg-[#48598f] hover:bg-[#3b4b7c] px-3.5 py-1.5 rounded-lg border border-[#7b8bb8] shadow-xs"
            >
              ← Back to Profile
            </button>
          </div>

          {/* Telegram Status Card in Poke-Me-On */}
          <div className="bg-[#6373a6] border border-[#1e293b]/70 rounded-2xl p-6 text-white shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Telegram Link Status</h3>
                <p className="text-xs text-[#cbd4e8]">
                  Connect via the main Account Hub to receive automated word flashcards.
                </p>
              </div>
              <button
                onClick={() => {}}
                className="text-xs bg-[#48598f] hover:bg-[#3b4b7c] text-white px-3 py-1.5 rounded-lg border border-[#7b8bb8] flex items-center gap-1.5 font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Refresh Status
              </button>
            </div>

            <div className="pt-2">
              {isLinked ? (
                <div className="p-3 bg-[#cbd4e8] rounded-xl border border-[#1e293b]/40 text-[#15803d] font-bold text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Telegram Account Linked (Chat ID: {chatId || '582335339'})</span>
                </div>
              ) : (
                <div className="p-3.5 bg-[#cbd4e8] text-[#1e293b] rounded-xl border border-[#1e293b]/40 space-y-2">
                  <p className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Telegram Account Not Linked
                  </p>
                  <p className="text-xs text-[#475569]">
                    You need to link your Telegram account in the main Teacher Alex Account settings before you can receive reminders here.
                  </p>
                  <button
                    onClick={() => setActiveView('profile')}
                    className="bg-[#48598f] hover:bg-[#3b4b7c] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs"
                  >
                    Go to Account Hub Security →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reminder Preferences Form */}
          <div className="bg-[#6373a6] border border-[#1e293b]/70 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <h3 className="font-bold text-base">Reminder Preferences</h3>
            <div className="p-4 bg-[#cbd4e8] text-[#1e293b] rounded-xl border border-[#1e293b]/40 space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-300">
                <span className="font-medium">Enable Reminders</span>
                <span className="font-bold text-emerald-700">{isLinked ? 'ON' : 'OFF'}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-300">
                <span className="font-medium">Frequency</span>
                <span className="font-bold">Daily (50 words)</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-medium">Quiet Hours</span>
                <span className="font-bold">22:00 – 08:00 (UTC)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TELEGRAM BOT SIMULATOR POPUP / MODAL
         ───────────────────────────────────────────────────────────── */}
      {showSimModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between bg-slate-900 text-white px-4 py-2.5 rounded-t-2xl border-t border-x border-slate-700">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold">Simulated Telegram Client</span>
              </div>
              <button
                onClick={() => setShowSimModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold px-2 py-0.5 rounded"
              >
                ✕ Close
              </button>
            </div>
            <TelegramSimulator
              currentCode={linkingCode}
              onLinkSuccess={(id) => {
                handleLinkSuccess(id);
                setTimeout(() => setShowSimModal(false), 1500);
              }}
              isLinked={isLinked}
              onUnlink={handleUnlink}
            />
          </div>
        </div>
      )}
    </div>
  );
};
