import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  Bot,
  Mail,
  ShieldCheck,
  KeyRound,
  User as UserIcon,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { TelegramSimulator } from './TelegramSimulator';

export const StudentPrototype: React.FC = () => {
  const [isLinked, setIsLinked] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [linkingCode, setLinkingCode] = useState<string | null>('784920');
  const [countdown, setCountdown] = useState(300);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'pokemeon'>('profile');
  const [userName, setUserName] = useState('Alex');

  // Timer countdown simulation
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
    <div className="space-y-6">
      {/* Top Banner explaining the exact styling match */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Exact Brand Style Preserved
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Profile Page with Subtle Brand-Highlighted Telegram Card
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Rendered using Teacher Alex's original <code>bg-brand-200</code> background, <code>bg-brand-400</code> card structure, and Shadcn UI tokens. The Telegram card sits directly on the Profile page with a subtle highlight border.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
          >
            Profile Page (Account Hub)
          </button>
          <button
            onClick={() => setActiveTab('pokemeon')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'pokemeon'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white bg-slate-800'
            }`}
          >
            Poke-Me-On Settings
          </button>
        </div>
      </div>

      {/* Main Grid: Actual App (Left) & Telegram Live Simulator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Exact Teacher Alex Page Replica */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'profile' && (
            <div className="min-h-[580px] bg-[#fbf5e6] rounded-2xl border border-amber-200/90 shadow-xl p-6 sm:p-8 flex flex-col justify-between font-sans text-slate-900">
              <div className="space-y-6">
                {/* Page Title & Navigation Tabs */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    Profile Settings
                  </h1>
                  <div className="flex space-x-6 text-sm text-slate-500 border-b border-amber-200 pb-2">
                    <span className="font-semibold text-amber-900 inline-flex items-center border-b-2 border-amber-600 pb-2">
                      <UserIcon size={16} className="mr-1.5" /> Profile
                    </span>
                    <span className="text-slate-500 hover:text-amber-900 inline-flex items-center pb-2 cursor-pointer">
                      <KeyRound size={16} className="mr-1.5" /> Security
                    </span>
                  </div>
                </div>

                {/* 1. NEW TELEGRAM CARD DIRECTLY ON PROFILE (With subtle green/brand highlight) */}
                <div className="bg-[#f3ebd7] border-2 border-emerald-600/35 rounded-xl p-5 shadow-xs transition-all">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200/80">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-900">
                        <Bot className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900">
                          Telegram Learning Reminders
                        </h3>
                        <p className="text-xs text-slate-600">
                          Receive automated vocabulary cards from Poke-Me-On
                        </p>
                      </div>
                    </div>
                    {isLinked ? (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Active
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        Ready to Connect
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-3">
                    {isLinked ? (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-[#fbf5e6] rounded-lg border border-amber-200">
                          <div className="flex items-center text-xs font-medium text-emerald-800">
                            <CheckCircle className="mr-2 size-4 text-emerald-600 shrink-0" />
                            <span>Connected to Telegram Chat ID: <strong>{chatId || '582335339'}</strong></span>
                          </div>
                          <button
                            onClick={handleUnlink}
                            className="text-xs text-rose-700 hover:text-rose-900 underline font-medium"
                          >
                            Unlink
                          </button>
                        </div>
                        <div className="flex items-center justify-between pt-1 text-xs text-slate-600">
                          <span>Word reminders will arrive on your schedule.</span>
                          <button
                            onClick={() => setActiveTab('pokemeon')}
                            className="text-amber-800 hover:text-amber-950 font-semibold underline flex items-center gap-1"
                          >
                            Go to Poke-Me-On <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs text-slate-600">
                          To get daily spaced-repetition words sent directly to your phone, link your Telegram account below:
                        </p>

                        <div className="p-3.5 bg-[#fbf5e6] rounded-lg border border-amber-200 space-y-3">
                          <div className="flex flex-col sm:flex-row items-center gap-3">
                            {/* 1-Tap Deep Link Button using Teacher Alex brand color */}
                            <button
                              onClick={() => {
                                // Simulate click: highlight
                              }}
                              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ring-1 ring-amber-300"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Open Telegram & Connect in 1 Tap</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>

                            <span className="text-xs text-slate-400 font-medium">or</span>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-600">Code:</span>
                              <span className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-amber-300 text-slate-900 tracking-wider">
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
                                className="text-slate-500 hover:text-slate-800"
                                title="Copy code"
                              >
                                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-amber-200/60">
                            <span>
                              Send command <code className="font-mono bg-white px-1 rounded">/link {linkingCode}</code> to <strong className="text-amber-900">@{botUsername}</strong>
                            </span>
                            <span>Expires in: <strong>{formatCountdown(countdown)}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. EXISTING PROFILE DETAILS CARD (Preserved 100%) */}
                <div className="bg-[#f3ebd7] rounded-xl p-5 border border-amber-200/80 shadow-xs space-y-4">
                  <div className="text-xs text-slate-600">
                    View and update your account details.
                  </div>

                  {/* Display fixed info in bg-brand-200 box */}
                  <div className="space-y-2 text-sm border border-amber-200 rounded-md p-4 bg-[#fbf5e6]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="font-medium text-slate-700">Email:</span>
                      <span className="text-slate-600">alex@example.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium text-slate-700">Status:</span>
                      <span className="text-emerald-700 font-medium">Verified</span>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-[#fbf5e6] border border-amber-300 rounded-md px-3 py-1.5 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-md shadow-xs">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="text-[11px] text-slate-500 pt-4 border-t border-amber-200 flex items-center justify-between">
                <span>Teacher Alex Account Hub</span>
                <span>Version 0.1.0</span>
              </div>
            </div>
          )}

          {activeTab === 'pokemeon' && (
            <div className="min-h-[580px] bg-[#fbf5e6] rounded-2xl border border-amber-200/90 shadow-xl p-6 sm:p-8 flex flex-col justify-between font-sans text-slate-900">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Poke-Me-On Settings</h2>
                    <p className="text-xs text-slate-600">Configure vocabulary reminder schedule</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="text-xs font-semibold text-amber-800 bg-[#f3ebd7] px-3 py-1.5 rounded-lg border border-amber-300 hover:bg-amber-200"
                  >
                    ← Back to Profile
                  </button>
                </div>

                {/* Telegram Link Status in Poke-Me-On */}
                <div className="bg-[#f3ebd7] p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">Telegram Link Status</h4>
                      <p className="text-xs text-slate-600">Connect via main Account Hub</p>
                    </div>
                    <button
                      onClick={() => {}}
                      className="text-xs bg-[#fbf5e6] border border-amber-300 px-3 py-1 rounded-md font-medium text-slate-700 flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh Status
                    </button>
                  </div>

                  <div className="pt-2">
                    {isLinked ? (
                      <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Telegram Account Linked
                      </p>
                    ) : (
                      <div className="p-3 bg-[#fbf5e6] rounded-lg border border-amber-300 space-y-2">
                        <p className="text-xs font-semibold text-rose-700 flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-rose-600" /> Telegram Account Not Linked
                        </p>
                        <p className="text-xs text-slate-600">
                          Link your Telegram on the Account Hub to receive automated word cards.
                        </p>
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-md"
                        >
                          Go to Account Profile
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-[#f3ebd7] p-5 rounded-xl border border-amber-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-900">Reminder Preferences</h4>
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="flex items-center justify-between p-3 bg-[#fbf5e6] rounded border border-amber-200">
                      <span>Enable Reminders</span>
                      <span className="font-bold text-emerald-700">{isLinked ? 'ON' : 'OFF'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#fbf5e6] rounded border border-amber-200">
                      <span>Frequency</span>
                      <span className="font-bold">Twice Daily</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-3 border-t border-amber-200">
                teacher-alex.com/poke_me_on (Base Path)
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Telegram Bot Simulator */}
        <div className="lg:col-span-5 space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Telegram Bot Simulator
            </span>
            <span className="text-[11px] text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Live Webhook Testbed
            </span>
          </div>

          <TelegramSimulator
            currentCode={linkingCode}
            onLinkSuccess={handleLinkSuccess}
            isLinked={isLinked}
            onUnlink={handleUnlink}
          />
        </div>
      </div>
    </div>
  );
};
