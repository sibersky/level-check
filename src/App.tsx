// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageTabs, TargetLanguage } from './components/LanguageTabs';
import { QuickEstimator } from './components/QuickEstimator';
import { PlacementDirectory } from './components/PlacementDirectory';
import { CefrGuide } from './components/CefrGuide';
import {
  ShieldCheck,
  Clock,
  Zap,
} from 'lucide-react';

export function App() {
  const [currentLocale, setCurrentLocale] = useState<'ru' | 'en' | 'es'>('ru');
  const [quizLanguage, setQuizLanguage] = useState<TargetLanguage>('en');
  const [activeSection, setActiveSection] = useState<string>('quick-quiz');

  // Load locale preference from URL query (e.g. nextInternalLocale from landing page), pathname, or localStorage
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const queryLocale = searchParams.get('nextInternalLocale') || searchParams.get('locale');
      if (queryLocale === 'ru' || queryLocale === 'en' || queryLocale === 'es') {
        setCurrentLocale(queryLocale);
        return;
      }

      const path = window.location.pathname;
      if (path.startsWith('/ru')) {
        setCurrentLocale('ru');
        return;
      } else if (path.startsWith('/es')) {
        setCurrentLocale('es');
        return;
      } else if (path.startsWith('/en')) {
        setCurrentLocale('en');
        return;
      }

      const saved = localStorage.getItem('teacher_alex_locale');
      if (saved === 'ru' || saved === 'en' || saved === 'es') {
        setCurrentLocale(saved);
      }
    } catch {}
  }, []);

  const handleLocaleChange = (loc: 'ru' | 'en' | 'es') => {
    setCurrentLocale(loc);
    try {
      localStorage.setItem('teacher_alex_locale', loc);
    } catch {}
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const heroContent = {
    ru: {
      suite: 'TEACHER ALEX LEARNING SUITE',
      titleEn: (
        <>
          Оценка уровня <span className="text-brand-700">английского языка</span>
        </>
      ),
      titleEs: (
        <>
          Оценка уровня <span className="text-brand-700">испанского языка</span>
        </>
      ),
      titleDe: (
        <>
          Оценка уровня <span className="text-brand-700">немецкого языка</span>
        </>
      ),
      titlePt: (
        <>
          Оценка уровня <span className="text-brand-700">португальского языка</span>
        </>
      ),
      subtitleEn:
        'Пройдите экспресс-диагностику из 18 вопросов от A1 до C2 с учетом вашей уверенности или выберите один из проверенных бесплатных внешних тестов.',
      subtitleEs:
        'Пройдите экспресс-диагностику из 18 вопросов испанского языка по стандарту MCER (A1–C2) или выберите официальный академический тест.',
      subtitleDe:
        'Пройдите экспресс-диагностику из 18 вопросов немецкого языка по стандарту CEFR (A1–C2) или выберите официальный тест Goethe-Institut, DW и Klett.',
      subtitlePt:
        'Пройдите экспресс-диагностику из 18 вопросов португальского языка (A1–C2) или выберите проверенные тесты Instituto Camões, Caminhos и Lenguia.',
      badgePrivate: '100% локально в браузере (без регистрации)',
      badgeStandard: 'Стандарт CEFR / MCER (A1–C2)',
      badgeTime: 'Время: ~5 минут',
    },
    en: {
      suite: 'TEACHER ALEX LEARNING SUITE',
      titleEn: (
        <>
          Find Your Exact <span className="text-brand-700">English Level</span>
        </>
      ),
      titleEs: (
        <>
          Find Your Exact <span className="text-brand-700">Spanish Level</span>
        </>
      ),
      titleDe: (
        <>
          Find Your Exact <span className="text-brand-700">German Level</span>
        </>
      ),
      titlePt: (
        <>
          Find Your Exact <span className="text-brand-700">Portuguese Level</span>
        </>
      ),
      subtitleEn:
        'Take our calibrated 18-question CEFR diagnostic with confidence weighting, or choose from our curated directory of the best free online placement tests.',
      subtitleEs:
        'Take our calibrated 18-question Spanish CEFR diagnostic test, or explore the most trusted official academic exams available online.',
      subtitleDe:
        'Take our calibrated 18-question German CEFR diagnostic test, or explore the most trusted official exams from Goethe-Institut, DW, and Klett.',
      subtitlePt:
        'Take our calibrated 18-question Portuguese CEFR diagnostic, or choose from our curated directory covering European and Brazilian Portuguese.',
      badgePrivate: '100% Client-Side & Private (No sign-up)',
      badgeStandard: 'CEFR / MCER Standard (A1–C2)',
      badgeTime: 'Estimated Time: ~5 Mins',
    },
    es: {
      suite: 'TEACHER ALEX LEARNING SUITE',
      titleEn: (
        <>
          Evaluación de Nivel de <span className="text-brand-700">Inglés</span>
        </>
      ),
      titleEs: (
        <>
          Descubre tu Nivel Exacto de <span className="text-brand-700">Español</span>
        </>
      ),
      titleDe: (
        <>
          Descubre tu Nivel Exacto de <span className="text-brand-700">Alemán</span>
        </>
      ),
      titlePt: (
        <>
          Descubre tu Nivel Exacto de <span className="text-brand-700">Portugués</span>
        </>
      ),
      subtitleEn:
        'Realiza nuestro diagnóstico calibrado de 18 preguntas MCER o explora las mejores pruebas oficiales de inglés en línea.',
      subtitleEs:
        'Realiza el diagnóstico de 18 preguntas calibradas según el marco MCER o explora las mejores pruebas oficiales del Instituto Cervantes y otras instituciones.',
      subtitleDe:
        'Realiza el diagnóstico de 18 preguntas de alemán según el marco MCER o explora las mejores pruebas oficiales del Goethe-Institut, DW y Klett.',
      subtitlePt:
        'Realiza el diagnóstico de 18 preguntas de portugués o explora pruebas acreditadas para portugués europeo y brasileño.',
      badgePrivate: '100% local en navegador (sin registro)',
      badgeStandard: 'Marco Europeo MCER (A1–C2)',
      badgeTime: 'Duración: ~5 minutos',
    },
  }[currentLocale];

  return (
    <div className="flex flex-col min-h-screen bg-[color:var(--color-brand-200)] text-neutral-900 antialiased font-sans">
      {/* 1. Official Header matching teacher-alex.com */}
      <Header
        currentLocale={currentLocale}
        onLocaleChange={handleLocaleChange}
      />

      {/* 2. Top-Level Language Switcher Tabs */}
      <LanguageTabs
        currentLanguage={quizLanguage}
        onLanguageChange={setQuizLanguage}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Hero Headline */}
      <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-xs font-bold tracking-wide uppercase shadow-2xs">
            {heroContent.suite}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-brand-900 tracking-tight leading-tight">
            {quizLanguage === 'en' && heroContent.titleEn}
            {quizLanguage === 'es' && heroContent.titleEs}
            {quizLanguage === 'de' && heroContent.titleDe}
            {quizLanguage === 'pt' && heroContent.titlePt}
          </h1>

          <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
            {quizLanguage === 'en' && heroContent.subtitleEn}
            {quizLanguage === 'es' && heroContent.subtitleEs}
            {quizLanguage === 'de' && heroContent.subtitleDe}
            {quizLanguage === 'pt' && heroContent.subtitlePt}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-xs font-semibold text-neutral-800">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-brand-300 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              {heroContent.badgePrivate}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-brand-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              {heroContent.badgeStandard}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-brand-300 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-brand-700" />
              {heroContent.badgeTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {/* Section A: Diagnostic Quiz */}
        <section id="quick-quiz" className="scroll-mt-36">
          <QuickEstimator language={quizLanguage} />
        </section>

        {/* Section B: External Test Directory (now fully localized with locale={currentLocale}) */}
        <section id="directory" className="scroll-mt-36">
          <PlacementDirectory language={quizLanguage} locale={currentLocale} />
        </section>

        {/* Section C: CEFR Guide */}
        <section id="cefr-guide" className="scroll-mt-36">
          <CefrGuide />
        </section>
      </main>

      {/* 3. Official Footer matching teacher-alex.com */}
      <Footer />
    </div>
  );
}

export default App;
