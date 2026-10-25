import React from 'react';
import { Globe, Shield, Bot, BookOpen, ArrowRight, CheckCircle2, Lock } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-400" />
          Teacher Alex Ecosystem Architecture & Seamless Flow
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          How the 3 repositories and Telegram interact to deliver an effortless, secure student experience with cross-domain SSO and spaced-repetition delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Node 1: Landing Page */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Portal / Hub
              </span>
              <span className="text-xs font-mono text-amber-400">landing_page</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-white">www.teacher-alex.com</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Main landing page, courses catalog, tool directory. Rewrites <code>/poke_me_on</code> to the Poke-Me-On deployment.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Student clicks <strong>Try Poke-Me-On</strong>
          </div>
        </div>

        {/* Node 2: Account Hub */}
        <div className="bg-slate-900 border border-amber-500/50 rounded-2xl p-5 relative ring-1 ring-amber-500/20 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                SSO & Auth Authority
              </span>
              <span className="text-xs font-mono text-amber-400">teacher-alex-account</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-white">account.teacher-alex.com</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Authenticates user, sets <code>.teacher-alex.com</code> session cookie, generates 1-tap Telegram linking deep-links, and preserves <code>callbackUrl</code>.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-medium">
            Pairs Telegram ID & redirects back to Poke-Me-On
          </div>
        </div>

        {/* Node 3: Poke-Me-On */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Learning Spoke App
              </span>
              <span className="text-xs font-mono text-sky-400">poke-me-on</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-white">teacher-alex.com/poke_me_on</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spaced-repetition learning item database. Shares the PostgreSQL database with Account Hub and runs the cron job sending words to Telegram.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500">
            Cron job delivers words to <code>telegramChatId</code>
          </div>
        </div>
      </div>

      {/* Telegram Bot Connector Hub */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-900/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Telegram Bot API (@TeacherAlexAccountBot)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Unified communication channel: 1-Tap Account Linking + Automated Word Delivery & Review
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> 1-Tap Deep Linking Ready
          </span>
        </div>
      </div>
    </div>
  );
};
