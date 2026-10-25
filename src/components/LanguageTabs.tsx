// src/components/LanguageTabs.tsx
import React from 'react';
import { BookCheck, Compass, Layers } from 'lucide-react';

interface LanguageTabsProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onSectionClick,
}) => {
  return (
    <div className="sticky top-16 z-40 bg-[color:var(--color-brand-100)]/90 backdrop-blur-md border-b border-[color:var(--color-brand-300)] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Main Language Switcher Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-white/70 border border-brand-200 shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentLanguage === 'en'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-brand-900 hover:bg-white/60'
              }`}
            >
              <span className="text-base leading-none select-none">🇬🇧</span>
              <span>English Placement & Level Check</span>
            </button>

            <button
              type="button"
              onClick={() => onLanguageChange('es')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                currentLanguage === 'es'
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-neutral-700 hover:text-brand-900 hover:bg-white/60'
              }`}
            >
              <span className="text-base leading-none select-none">🇪🇸</span>
              <span>Spanish Placement & Level Check (Español)</span>
            </button>
          </div>

          {/* Sub-Section Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-semibold no-scrollbar">
            <button
              type="button"
              onClick={() => onSectionClick('quick-quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'quick-quiz'
                  ? 'bg-brand-600 text-white font-bold shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-neutral-800 border border-brand-200'
              }`}
            >
              <BookCheck className="w-3.5 h-3.5" />
              <span>Диагностика (18 Qs)</span>
            </button>

            <button
              type="button"
              onClick={() => onSectionClick('directory')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'directory'
                  ? 'bg-brand-600 text-white font-bold shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-neutral-800 border border-brand-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Каталог тестов</span>
            </button>

            <button
              type="button"
              onClick={() => onSectionClick('cefr-guide')}
              className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'cefr-guide'
                  ? 'bg-brand-600 text-white font-bold shadow-2xs'
                  : 'bg-white/80 hover:bg-white text-neutral-800 border border-brand-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Шкала MCER (A1–C2)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LanguageTabs;
