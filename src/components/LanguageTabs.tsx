// src/components/LanguageTabs.tsx
import React from 'react';
import { BookCheck, Compass, Layers } from 'lucide-react';

export type TargetLanguage = 'en' | 'es' | 'de' | 'pt';

interface LanguageTabsProps {
  currentLanguage: TargetLanguage;
  onLanguageChange: (lang: TargetLanguage) => void;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onSectionClick,
}) => {
  const languages: { code: TargetLanguage; label: string; shortLabel: string; flag: string }[] = [
    {
      code: 'en',
      label: 'English Placement & Level Check',
      shortLabel: 'English',
      flag: '🇬🇧',
    },
    {
      code: 'es',
      label: 'Spanish Placement & Level Check (Español)',
      shortLabel: 'Español',
      flag: '🇪🇸',
    },
    {
      code: 'de',
      label: 'German Placement & Level Check (Deutsch)',
      shortLabel: 'Deutsch',
      flag: '🇩🇪',
    },
    {
      code: 'pt',
      label: 'Portuguese Placement & Level Check (Português)',
      shortLabel: 'Português',
      flag: '🇵🇹',
    },
  ];

  return (
    <div className="sticky top-16 z-40 bg-[color:var(--color-brand-100)]/90 backdrop-blur-md border-b border-[color:var(--color-brand-300)] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Main Language Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/70 border border-brand-200 shadow-2xs overflow-x-auto no-scrollbar">
            {languages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-brand-900 hover:bg-white/60'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-base leading-none select-none">{lang.flag}</span>
                  <span className="hidden md:inline">{lang.label}</span>
                  <span className="md:hidden">{lang.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Section Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-semibold no-scrollbar shrink-0">
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
