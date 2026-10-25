import React, { useState } from 'react';
import { AUDIT_ISSUES, AuditIssue } from '../data/reviewData';
import { AlertCircle, CheckCircle, Code, Layers, FileCode2, Copy, Check } from 'lucide-react';

export const AuditView: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<AuditIssue>(AUDIT_ISSUES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview Intro */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          Technical & UX Friction Analysis
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
          We analyzed the three repositories (<code>landing_page</code>, <code>teacher-alex-account</code>, and <code>poke-me-on</code>) from both a student usability angle and a cross-app architecture perspective. Below are the 5 core issues and their exact fixes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Issue List */}
        <div className="lg:col-span-5 space-y-3">
          {AUDIT_ISSUES.map((issue) => {
            const isSelected = selectedIssue.id === issue.id;
            return (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      issue.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : issue.severity === 'high'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {issue.severity}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{issue.component}</span>
                </div>

                <h4 className="text-sm font-semibold text-white mt-2 leading-snug">
                  {issue.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{issue.problem}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-dive Detail & Code Diff */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                {selectedIssue.component}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  selectedIssue.severity === 'critical'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {selectedIssue.severity} priority
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mt-2">{selectedIssue.title}</h3>
          </div>

          {/* Root cause and solution */}
          <div className="space-y-3">
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/50 rounded-xl text-xs leading-relaxed text-rose-200">
              <strong className="block text-rose-300 mb-1">Root Cause & User Friction:</strong>
              {selectedIssue.problem}
            </div>

            <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/50 rounded-xl text-xs leading-relaxed text-emerald-200">
              <strong className="block text-emerald-300 mb-1">Recommended Solution:</strong>
              {selectedIssue.solution}
            </div>
          </div>

          {/* Before & After Code Blocks */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold text-rose-400">Current Broken / Friction Code:</span>
              </div>
              <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto max-h-48 leading-relaxed">
                <code>{selectedIssue.beforeCode}</code>
              </pre>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold text-emerald-400">Patched Production Code:</span>
                <button
                  onClick={() => handleCopy(selectedIssue.afterCode, selectedIssue.id)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60"
                >
                  {copiedId === selectedIssue.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Fix
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 bg-slate-950 rounded-xl border border-emerald-900/50 text-xs font-mono text-emerald-300 overflow-x-auto max-h-56 leading-relaxed">
                <code>{selectedIssue.afterCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
