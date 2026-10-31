import React, { useState, useMemo } from 'react';
import {
  PlacementTest,
  ENGLISH_TESTS,
  SPANISH_TESTS,
  GERMAN_TESTS,
  PORTUGUESE_TESTS,
  AccuracyLevel,
} from '../data/directoryData';
import { TargetLanguage } from './LanguageTabs';
import {
  ExternalLink,
  Clock,
  Headphones,
  ShieldCheck,
  Search,
  FileBadge,
  Sparkles,
  Info,
} from 'lucide-react';

interface PlacementDirectoryProps {
  language: TargetLanguage;
  locale: 'ru' | 'en' | 'es';
}

type FilterCategory = 'All' | 'High/Very High Accuracy' | 'Includes Audio/Listening' | 'Under 20 Mins';

export const PlacementDirectory: React.FC<PlacementDirectoryProps> = ({ language, locale }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const rawTests: PlacementTest[] = useMemo(() => {
    switch (language) {
      case 'en':
        return ENGLISH_TESTS;
      case 'es':
        return SPANISH_TESTS;
      case 'de':
        return GERMAN_TESTS;
      case 'pt':
        return PORTUGUESE_TESTS;
      default:
        return ENGLISH_TESTS;
    }
  }, [language]);

  const uiTexts = {
    ru: {
      badge: 'Каталог внешних тестов',
      titleEn: 'Лучшие бесплатные тесты английского языка',
      titleEs: 'Лучшие бесплатные тесты испанского языка',
      titleDe: 'Лучшие бесплатные тесты немецкого языка',
      titlePt: 'Лучшие бесплатные тесты португальского языка',
      subtitle: 'Официальные и академические тесты определения уровня с оценкой точности, временем прохождения и прямыми ссылками.',
      searchPlaceholder: 'Поиск тестов, навыков или провайдера...',
      filters: {
        All: 'Все тесты',
        'High/Very High Accuracy': 'Высокая точность',
        'Includes Audio/Listening': 'С аудированием (Audio)',
        'Under 20 Mins': 'До 20 минут',
      },
      providerLabel: 'Провайдер',
      accuracyPrefix: 'Точность',
      certLabel: 'Сертификат',
      launchButton: 'Перейти к тесту',
      noResultsTitle: 'Тесты не найдены',
      noResultsDesc: 'Попробуйте выбрать другой фильтр или изменить поисковый запрос.',
      clearFilters: 'Сбросить фильтры',
    },
    en: {
      badge: 'Verified Benchmark Directory',
      titleEn: 'Curated Online English Placement Tests',
      titleEs: 'Curated Online Spanish Placement Tests',
      titleDe: 'Curated Online German Placement Tests',
      titlePt: 'Curated Online Portuguese Placement Tests',
      subtitle: 'The most reliable free external proficiency tests available on the web, vetted for academic rigor and diagnostic accuracy.',
      searchPlaceholder: 'Search tests, skills, or providers...',
      filters: {
        All: 'All Tests',
        'High/Very High Accuracy': 'High / Very High Accuracy',
        'Includes Audio/Listening': 'Includes Audio/Listening',
        'Under 20 Mins': 'Under 20 Mins',
      },
      providerLabel: 'Provider',
      accuracyPrefix: 'Accuracy',
      certLabel: 'Certificate',
      launchButton: 'Launch Official Test',
      noResultsTitle: 'No tests match your filter',
      noResultsDesc: 'Try selecting a different filter pill or clearing your search keywords.',
      clearFilters: 'Clear Filters',
    },
    es: {
      badge: 'Directorio de Pruebas Oficiales',
      titleEn: 'Pruebas de Nivel de Inglés Recomendadas',
      titleEs: 'Directorio de Pruebas Oficiales de Español',
      titleDe: 'Directorio de Pruebas Oficiales de Alemán',
      titlePt: 'Directorio de Pruebas Oficiales de Portugués',
      subtitle: 'Las pruebas de nivel gratuitas más fiables de la web, evaluadas por rigor académico y precisión diagnóstica.',
      searchPlaceholder: 'Buscar pruebas, habilidades o institución...',
      filters: {
        All: 'Todas las pruebas',
        'High/Very High Accuracy': 'Alta precisión',
        'Includes Audio/Listening': 'Con audio / comprensión auditiva',
        'Under 20 Mins': 'Menos de 20 mins',
      },
      providerLabel: 'Institución',
      accuracyPrefix: 'Precisión',
      certLabel: 'Certificado',
      launchButton: 'Iniciar prueba oficial',
      noResultsTitle: 'No se encontraron pruebas',
      noResultsDesc: 'Intenta seleccionar otro filtro o cambiar los términos de búsqueda.',
      clearFilters: 'Restablecer filtros',
    },
  }[locale];

  const filteredTests = useMemo(() => {
    return rawTests.filter((test) => {
      if (activeFilter === 'High/Very High Accuracy') {
        if (test.accuracy !== 'Very High' && test.accuracy !== 'High') return false;
      } else if (activeFilter === 'Includes Audio/Listening') {
        if (!test.hasAudio) return false;
      } else if (activeFilter === 'Under 20 Mins') {
        if (test.minutesEstimate > 20) return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const content = test.translations[locale];
        const matchesName = content.name.toLowerCase().includes(query);
        const matchesDesc = content.description.toLowerCase().includes(query);
        const matchesSkills = content.skills.some((s) => s.toLowerCase().includes(query));
        const matchesProvider = content.provider.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSkills && !matchesProvider) {
          return false;
        }
      }

      return true;
    });
  }, [rawTests, activeFilter, searchQuery, locale]);

  const getAccuracyBadge = (accuracy: AccuracyLevel) => {
    switch (accuracy) {
      case 'Very High':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold';
      case 'High':
        return 'bg-teal-100 text-teal-900 border-teal-300 font-bold';
      case 'Moderate to High':
        return 'bg-brand-50 text-brand-900 border-brand-200 font-semibold';
      case 'Moderate':
        return 'bg-neutral-100 text-neutral-800 border-neutral-300 font-medium';
      case 'Low to Moderate':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-medium';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="bg-[color:var(--color-neutral-50)] rounded-3xl border border-[color:var(--color-neutral-300)] shadow-md p-6 sm:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>{uiTexts.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            {language === 'en' && uiTexts.titleEn}
            {language === 'es' && uiTexts.titleEs}
            {language === 'de' && uiTexts.titleDe}
            {language === 'pt' && uiTexts.titlePt}
          </h2>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
            {uiTexts.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={uiTexts.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 bg-neutral-50 text-xs font-medium placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(['All', 'High/Very High Accuracy', 'Includes Audio/Listening', 'Under 20 Mins'] as FilterCategory[]).map(
          (pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setActiveFilter(pill)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeFilter === pill
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
              }`}
            >
              {pill === 'Includes Audio/Listening' && <Headphones className="w-3.5 h-3.5" />}
              {pill === 'Under 20 Mins' && <Clock className="w-3.5 h-3.5" />}
              {pill === 'High/Very High Accuracy' && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
              <span>{uiTexts.filters[pill]}</span>
            </button>
          )
        )}
      </div>

      {/* Grid of Cards */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {filteredTests.map((test) => {
            const content = test.translations[locale];

            return (
              <div
                key={test.id}
                className="bg-neutral-50 hover:bg-[color:var(--color-neutral-50)] rounded-3xl border border-neutral-200/90 p-6 shadow-2xs hover:shadow-md transition-all hover:border-brand-400 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] border uppercase tracking-wider ${getAccuracyBadge(
                        test.accuracy
                      )}`}
                    >
                      {uiTexts.accuracyPrefix}: {content.accuracyLabel}
                    </span>

                    <div className="flex items-center gap-2">
                      {content.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-900 border border-brand-200 text-[10px] font-extrabold uppercase tracking-wide">
                          {content.badge}
                        </span>
                      )}
                      {test.freeCertificate && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold flex items-center gap-1">
                          <FileBadge className="w-3 h-3 text-emerald-600" />
                          {uiTexts.certLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Provider */}
                  <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 group-hover:text-brand-700 transition-colors tracking-tight">
                    {content.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mb-3">
                    {uiTexts.providerLabel}: {content.provider}
                  </p>

                  {/* Time & Skills Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                    <div className="flex items-center gap-1 text-neutral-700 font-semibold bg-white border border-neutral-200 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{content.time}</span>
                    </div>

                    {content.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Localized Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {content.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-medium">
                    {content.accountNotice}
                  </span>

                  <a
                    href={test.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-all shadow-2xs group-hover:shadow-xs cursor-pointer active:scale-98"
                  >
                    <span>{uiTexts.launchButton}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-12 text-center space-y-3">
          <Info className="w-8 h-8 text-neutral-400 mx-auto" />
          <h4 className="text-base font-bold text-neutral-800">{uiTexts.noResultsTitle}</h4>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            {uiTexts.noResultsDesc}
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-xs font-bold text-neutral-800 transition-colors"
          >
            {uiTexts.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
};
export default PlacementDirectory;
