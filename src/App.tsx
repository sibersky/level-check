// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LanguageTabs, TargetLanguage } from './components/LanguageTabs';
import { QuickEstimator } from './components/QuickEstimator';
import { PlacementDirectory } from './components/PlacementDirectory';
import { CefrGuide } from './components/CefrGuide';

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
      titleEn: 'Оценка уровня английского языка',
      titleEs: 'Оценка уровня испанского языка',
      titleDe: 'Оценка уровня немецкого языка',
      titlePt: 'Оценка уровня португальского языка',
      subtitleEn:
        'Пройдите экспресс-диагностику из 18 вопросов от A1 до C2 с учетом вашей уверенности или выберите один из проверенных бесплатных внешних тестов.',
      subtitleEs:
        'Пройдите экспресс-диагностику из 18 вопросов испанского языка по стандарту MCER (A1–C2) или выберите официальный академический тест.',
      subtitleDe:
        'Пройдите экспресс-диагностику из 18 вопросов немецкого языка по стандарту CEFR (A1–C2) или выберите официальный тест Goethe-Institut, DW и Klett.',
      subtitlePt:
        'Пройдите экспресс-диагностику из 18 вопросов португальского языка (A1–C2) или выберите проверенные тесты Instituto Camões, Caminhos и Lenguia.',
    },
    en: {
      titleEn: 'Find Your English Level',
      titleEs: 'Find Your Spanish Level',
      titleDe: 'Find Your German Level',
      titlePt: 'Find Your Portuguese Level',
      subtitleEn:
        'Take our calibrated 18-question CEFR diagnostic with confidence weighting, or choose from our curated directory of the best free online placement tests.',
      subtitleEs:
        'Take our calibrated 18-question Spanish CEFR diagnostic test, or explore the most trusted official academic exams available online.',
      subtitleDe:
        'Take our calibrated 18-question German CEFR diagnostic test, or explore the most trusted official exams from Goethe-Institut, DW, and Klett.',
      subtitlePt:
        'Take our calibrated 18-question Portuguese CEFR diagnostic, or choose from our curated directory covering European and Brazilian Portuguese.',
    },
    es: {
      titleEn: 'Evaluación de Nivel de Inglés',
      titleEs: 'Descubre tu Nivel de Español',
      titleDe: 'Descubre tu Nivel de Alemán',
      titlePt: 'Descubre tu Nivel de Portugués',
      subtitleEn:
        'Realiza nuestro diagnóstico calibrado de 18 preguntas MCER o explora las mejores pruebas oficiales de inglés en línea.',
      subtitleEs:
        'Realiza el diagnóstico de 18 preguntas calibradas según el marco MCER o explora las mejores pruebas oficiales del Instituto Cervantes y otras instituciones.',
      subtitleDe:
        'Realiza el diagnóstico de 18 preguntas de alemán según el marco MCER o explora las mejores pruebas oficiales del Goethe-Institut, DW y Klett.',
      subtitlePt:
        'Realiza el diagnóstico de 18 preguntas de portugués o explora pruebas acreditadas para portugués europeo y brasileño.',
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
        currentLocale={currentLocale}
      />

      {/* Hero Headline matching Story Maker and Simply New visual style */}
      <section className="pt-6 sm:pt-8 pb-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            {quizLanguage === 'en' && heroContent.titleEn}
            {quizLanguage === 'es' && heroContent.titleEs}
            {quizLanguage === 'de' && heroContent.titleDe}
            {quizLanguage === 'pt' && heroContent.titlePt}
          </h1>

          <p className="text-sm text-neutral-700 leading-relaxed font-normal">
            {quizLanguage === 'en' && heroContent.subtitleEn}
            {quizLanguage === 'es' && heroContent.subtitleEs}
            {quizLanguage === 'de' && heroContent.subtitleDe}
            {quizLanguage === 'pt' && heroContent.subtitlePt}
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-10">
        {/* Section A: Diagnostic Quiz */}
        <section id="quick-quiz" className="scroll-mt-32">
          <QuickEstimator language={quizLanguage} locale={currentLocale} />
        </section>

        {/* Section B: External Test Directory */}
        <section id="directory" className="scroll-mt-32">
          <PlacementDirectory language={quizLanguage} locale={currentLocale} />
        </section>

        {/* Section C: CEFR Guide */}
        <section id="cefr-guide" className="scroll-mt-32">
          <CefrGuide locale={currentLocale} />
        </section>
      </main>

      {/* 3. Official Footer matching teacher-alex.com */}
      <Footer />
    </div>
  );
}

export default App;
