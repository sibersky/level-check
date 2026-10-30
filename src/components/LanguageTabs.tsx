// src/components/LanguageTabs.tsx
import React from 'react';
import { BookCheck, Compass, Layers, Languages } from 'lucide-react';
import { FlagIcon } from './FlagIcon';

export type TargetLanguage = 'en' | 'es' | 'de' | 'pt';

interface LanguageTabsProps {
  currentLanguage: TargetLanguage;
  onLanguageChange: (lang: TargetLanguage) => void;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  currentLocale: 'ru' | 'en' | 'es';
}

export const LanguageTabs: React.FC<LanguageTabsProps> = ({
  currentLanguage,
  onLanguageChange,
  activeSection,
  onSectionClick,
  currentLocale,
}) => {
  const configByLocale = {
    ru: {
      categoryPrefix: 'Оценка уровня:',
      shortCategoryPrefix: 'Язык:',
      pills: {
        quiz: 'Диагностика (18 Qs)',
        directory: 'Каталог тестов',
        cefr: 'Шкала MCER (A1–C2)',
      },
    },
    en: {
      categoryPrefix: 'Placement & Level Check:',
      shortCategoryPrefix: 'Placement:',
      pills: {
        quiz: 'Diagnostic (18 Qs)',
        directory: 'Test Directory',
        cefr: 'CEFR Scale (A1–C2)',
      },
    },
    es: {
      categoryPrefix: 'Prueba de nivel:',
      shortCategoryPrefix: 'Idioma:',
      pills: {
        quiz: 'Diagnóstico (18 Qs)',
        directory: 'Directorio de Pruebas',
        cefr: 'Marco MCER (A1–C2)',
      },
    },
  }[currentLocale];

  const targetLanguages: { code: TargetLanguage; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
  ];

  return (
    <div className="sticky top-16 z-40 bg-[color:var(--color-brand-100)]/90 backdrop-blur-md border-b border-[color:var(--color-brand-300)] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* Main Language Switcher: "Placement & Level Check" header label + compact language buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-2xl bg-white/80 border border-brand-200/90 shadow-2xs overflow-x-auto no-scrollbar">
            {/* Header / Context Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-50 text-brand-900 border border-brand-200/70 text-xs font-black tracking-tight shrink-0 select-none">
              <Languages className="w-3.5 h-3.5 text-brand-700 shrink-0" />
              <span className="hidden sm:inline">{configByLocale.categoryPrefix}</span>
              <span className="sm:hidden">{configByLocale.shortCategoryPrefix}</span>
            </div>

            {/* Compact Language Selector Buttons */}
            {targetLanguages.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.code)}
                  className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-neutral-700 hover:text-brand-900 hover:bg-brand-100/60'
                  }`}
                  aria-pressed={isSelected}
                >
                  <FlagIcon country={lang.code} size="md" />
                  <span>{lang.name}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Section Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 lg:pb-0 text-xs font-semibold no-scrollbar shrink-0">
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
              <span>{configByLocale.pills.quiz}</span>
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
              <span>{configByLocale.pills.directory}</span>
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
              <span>{configByLocale.pills.cefr}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageTabs;
