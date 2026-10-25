import React, { useState, useMemo, useEffect } from 'react';
import {
  QuizQuestion,
  CEFRLevel,
  ENGLISH_QUESTIONS,
  SPANISH_QUESTIONS,
  GERMAN_QUESTIONS,
  PORTUGUESE_QUESTIONS,
} from '../data/quizData';
import { TargetLanguage } from './LanguageTabs';
import { FlagIcon } from './FlagIcon';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Newspaper,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';

interface QuickEstimatorProps {
  language: TargetLanguage;
  locale: 'ru' | 'en' | 'es';
}

interface AnswerState {
  selectedOption: number | null;
  isSkipped: boolean;
  isConfident: boolean;
}

export const QuickEstimator: React.FC<QuickEstimatorProps> = ({ language, locale }) => {
  const questions: QuizQuestion[] = useMemo(() => {
    switch (language) {
      case 'en':
        return ENGLISH_QUESTIONS;
      case 'es':
        return SPANISH_QUESTIONS;
      case 'de':
        return GERMAN_QUESTIONS;
      case 'pt':
        return PORTUGUESE_QUESTIONS;
      default:
        return ENGLISH_QUESTIONS;
    }
  }, [language]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Reset state when language changes
  useEffect(() => {
    setCurrentIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setShowReview(false);
  }, [language]);

  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ.id] || {
    selectedOption: null,
    isSkipped: false,
    isConfident: true,
  };

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: optionIndex,
        isSkipped: false,
        isConfident: prev[currentQ.id]?.isConfident ?? true,
      },
    }));
  };

  const handleSkipQuestion = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: null,
        isSkipped: true,
        isConfident: false,
      },
    }));
    handleNext();
  };

  const handleToggleConfidence = (confident: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        selectedOption: prev[currentQ.id]?.selectedOption ?? null,
        isSkipped: prev[currentQ.id]?.isSkipped ?? false,
        isConfident: confident,
      },
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setShowReview(false);
  };

  // Localized UI text dictionary
  const t = {
    ru: {
      badge: 'TEACHER ALEX DIAGNOSTIC',
      langLabel: {
        en: 'Английский язык (18 вопросов)',
        es: 'Испанский язык (18 вопросов)',
        de: 'Немецкий язык (18 вопросов)',
        pt: 'Португальский язык (18 вопросов)',
      },
      title: 'Экспресс-оценка уровня CEFR',
      subtitle:
        '18 адаптивных вопросов от A1 до C2 с учетом вашей уверенности в ответе. Работает локально в браузере.',
      progress: 'Прогресс',
      levelPrefix: 'Уровень',
      confidenceLabel: 'Уверенность:',
      confidentBtn: '⚡ Уверен (1.0 балл)',
      confidentTip: 'Полный 1.0 балл при верном ответе',
      unsureBtn: '💭 Не уверен (0.5 балла)',
      unsureTip: '0.5 балла при верном ответе (исключает угадывание)',
      readingPassage: 'Фрагмент для чтения',
      skipBtn: '🤷 Затрудняюсь ответить / Пропустить',
      backBtn: 'Назад',
      nextBtn: 'Следующий вопрос',
      finishBtn: 'Завершить тест',
      resultBadge: 'Ваш ориентировочный уровень CEFR',
      scoreLabel: 'Взвешенный балл',
      accuracyLabel: 'Точность ответов',
      tiersTitle: 'Результаты по ступеням владения',
      beginnerTier: 'Начальный (A1 – A2)',
      beginnerDesc: 'Базовая грамматика и обиходные фразы',
      intermediateTier: 'Средний (B1 – B2)',
      intermediateDesc: 'Сложные предложения, идиомы и периодика',
      advancedTier: 'Продвинутый (C1 – C2)',
      advancedDesc: 'Инверсии, сослагательное наклонение и нюансы',
      realityTitle: 'Teacher Alex Reality Check: Пассивный запас vs. Активная речь',
      realityP1:
        'Тесты с выбором вариантов оценивают <strong>рецептивные навыки</strong> (узнавание грамматики и понимание прочитанного). В реальной жизни уровень <strong>активной разговорной речи</strong> у большинства студентов обычно на <strong>0.5 – 1.0 ступень ниже</strong>, чем результат чтения.',
      realityP2:
        'Если ваш результат B2, в спонтанном диалоге вы, скорее всего, уверенно чувствуете себя на B1. Чтобы преодолеть этот разрыв, тренируйте активную речь на уроках с преподавателем!',
      servicesTitle: 'Примените ваш уровень в сервисах Teacher Alex',
      simplyNewDesc: 'Читайте свежие мировые новости, автоматически адаптированные под ваш уровень.',
      simplyNewBtn: 'Читать новости →',
      smartReaderDesc:
        'Загружайте любые статьи или книги: ридер подсветит только слова выше вашего уровня для сохранения в карточки.',
      smartReaderBtn: 'Открыть Smart Reader →',
      coursesTitle: 'Курсы и уроки Teacher Alex',
      coursesDesc:
        'Индивидуальные занятия для снятия языкового барьера, постановки произношения и подготовки к собеседованиям.',
      coursesBtn: 'Записаться на консультацию →',
      reviewShow: 'Посмотреть разбор всех 18 вопросов и пояснений',
      reviewHide: 'Скрыть подробный разбор ответов',
      questionWord: 'Вопрос',
      correctWord: 'Верно',
      skippedWord: 'Пропущен (0.0)',
      incorrectWord: 'Ошибка (0.0)',
      explanationWord: 'Пояснение:',
      retakeBtn: 'Пройти тест заново',
      bandDesc: {
        C2: {
          title: 'C2 — Mastery (В совершенстве)',
          desc: 'Исключительное свободное владение сложными грамматическими конструкциями, редкой идиоматической лексикой и академическим регистром.',
        },
        C1: {
          title: 'C1 — Effective Proficiency (Продвинутый)',
          desc: 'Уверенное спонтанное владение языком, сослагательным наклонением (subjunctive), сложными фразеологизмами и беглым чтением аутентичной публицистики.',
        },
        B2: {
          title: 'B2 — Vantage (Выше среднего)',
          desc: 'Самостоятельный пользователь. Свободное понимание развернутых текстов, естественная коммуникация в профессиональной среде и понимание современных медиа.',
        },
        B1: {
          title: 'B1 — Threshold (Средний уровень)',
          desc: 'Уверенная база стандартных грамматических конструкций, описание событий прошлого и планов на будущее, решение бытовых задач в путешествиях.',
        },
        A2: {
          title: 'A2 — Waystage (Элементарный)',
          desc: 'Базовые времена глаголов, короткие повседневные диалоги, ориентация в расписаниях, магазинах и простых объявлениях.',
        },
        A1: {
          title: 'A1 — Breakthrough (Начальный)',
          desc: 'Базовые фразы приветствия, глагол to be / ser / estar / sein, простые утвердительные предложения и базовый словарный запас выживания.',
        },
      },
    },
    en: {
      badge: 'TEACHER ALEX DIAGNOSTIC',
      langLabel: {
        en: 'English Language (18 Questions)',
        es: 'Spanish Language (18 Questions)',
        de: 'German Language (18 Questions)',
        pt: 'Portuguese Language (18 Questions)',
      },
      title: 'Quick CEFR Level Diagnostic',
      subtitle:
        '18 calibrated questions from A1 to C2 with confidence weighting. Evaluated 100% locally in your browser.',
      progress: 'Progress',
      levelPrefix: 'Level',
      confidenceLabel: 'Confidence:',
      confidentBtn: '⚡ Confident (1.0 pt)',
      confidentTip: 'Full 1.0 point for correct answer',
      unsureBtn: '💭 Unsure (0.5 pts)',
      unsureTip: '0.5 points for correct answer (filters out lucky guesses)',
      readingPassage: 'Reading Passage',
      skipBtn: '🤷 Not sure / Skip question',
      backBtn: 'Back',
      nextBtn: 'Next Question',
      finishBtn: 'Finish Test',
      resultBadge: 'Your Estimated CEFR Level',
      scoreLabel: 'Weighted Score',
      accuracyLabel: 'Accuracy',
      tiersTitle: 'Proficiency Tier Breakdown',
      beginnerTier: 'Beginner (A1 – A2)',
      beginnerDesc: 'Core grammar and essential survival phrases',
      intermediateTier: 'Intermediate (B1 – B2)',
      intermediateDesc: 'Complex sentences, idioms and native media',
      advancedTier: 'Advanced (C1 – C2)',
      advancedDesc: 'Inversion, subjunctive mood and subtle nuance',
      realityTitle: 'Teacher Alex Reality Check: Passive Recognition vs. Active Fluency',
      realityP1:
        'Multiple-choice placement tests measure <strong>receptive skills</strong> (reading comprehension and grammar recognition). In everyday communication, most learners’ <strong>active speaking fluency</strong> is typically <strong>0.5 to 1.0 band lower</strong> than their reading score.',
      realityP2:
        'If you scored B2, your comfortable spontaneous conversational level is likely closer to B1. To close this passive gap, prioritize structured speaking practice with a coach!',
      servicesTitle: 'Apply Your Level Across Teacher Alex Services',
      simplyNewDesc: 'Read today’s global news automatically adapted to your verified CEFR level.',
      simplyNewBtn: 'Read News →',
      smartReaderDesc:
        'Import any article or book: the reader highlights only vocabulary above your level for spaced-repetition flashcards.',
      smartReaderBtn: 'Open Smart Reader →',
      coursesTitle: 'Teacher Alex 1-on-1 Lessons',
      coursesDesc:
        'Personalized 1-on-1 coaching designed to break the speaking barrier, refine pronunciation, and prepare for interviews.',
      coursesBtn: 'Book Consultation →',
      reviewShow: 'Review all 18 questions and explanations',
      reviewHide: 'Hide detailed question review',
      questionWord: 'Question',
      correctWord: 'Correct',
      skippedWord: 'Skipped (0.0)',
      incorrectWord: 'Incorrect (0.0)',
      explanationWord: 'Explanation:',
      retakeBtn: 'Retake Diagnostic Test',
      bandDesc: {
        C2: {
          title: 'C2 — Mastery (Proficiency)',
          desc: 'Exceptional mastery of complex grammar, subtle idiomatic nuance, and academic/professional registers.',
        },
        C1: {
          title: 'C1 — Effective Proficiency (Advanced)',
          desc: 'Fluent, spontaneous command of nuanced syntax, subjunctive mood, idiomatic expressions, and authentic literature.',
        },
        B2: {
          title: 'B2 — Vantage (Upper-Intermediate)',
          desc: 'Independent user. Solid comprehension of extended speech and complex texts, natural interaction in professional settings.',
        },
        B1: {
          title: 'B1 — Threshold (Intermediate)',
          desc: 'Solid grasp of core grammar, narrating past events and future intentions, and handling daily travel situations comfortably.',
        },
        A2: {
          title: 'A2 — Waystage (Elementary)',
          desc: 'Basic verb tenses, simple conversational exchanges, and understanding predictable practical information.',
        },
        A1: {
          title: 'A1 — Breakthrough (Beginner)',
          desc: 'Foundational phrases, basic verbs (to be, ser/estar, sein), and essential survival vocabulary for day-to-day encounters.',
        },
      },
    },
    es: {
      badge: 'DIAGNÓSTICO TEACHER ALEX',
      langLabel: {
        en: 'Idioma Inglés (18 preguntas)',
        es: 'Idioma Español (18 preguntas)',
        de: 'Idioma Alemán (18 preguntas)',
        pt: 'Idioma Portugués (18 preguntas)',
      },
      title: 'Evaluación Rápida de Nivel MCER',
      subtitle:
        '18 preguntas calibradas de A1 a C2 con ponderación por confianza. Funciona 100% en tu navegador.',
      progress: 'Progreso',
      levelPrefix: 'Nivel',
      confidenceLabel: 'Confianza:',
      confidentBtn: '⚡ Seguro (1.0 pto)',
      confidentTip: '1.0 punto completo con respuesta correcta',
      unsureBtn: '💭 Inseguro (0.5 ptos)',
      unsureTip: '0.5 puntos con respuesta correcta (evita aciertos por azar)',
      readingPassage: 'Texto de lectura',
      skipBtn: '🤷 No estoy seguro / Omitir pregunta',
      backBtn: 'Atrás',
      nextBtn: 'Siguiente pregunta',
      finishBtn: 'Finalizar prueba',
      resultBadge: 'Tu nivel estimado de MCER',
      scoreLabel: 'Puntaje ponderado',
      accuracyLabel: 'Precisión',
      tiersTitle: 'Desglose por niveles de competencia',
      beginnerTier: 'Inicial (A1 – A2)',
      beginnerDesc: 'Gramática básica y frases cotidianas de supervivencia',
      intermediateTier: 'Intermedio (B1 – B2)',
      intermediateDesc: 'Oraciones complejas, modismos y medios de comunicación',
      advancedTier: 'Avanzado (C1 – C2)',
      advancedDesc: 'Inversión, modo subjuntivo y matices sutiles',
      realityTitle: 'Teacher Alex Reality Check: Comprensión pasiva vs. Fluidez activa',
      realityP1:
        'Las pruebas de opción múltiple evalúan <strong>habilidades receptivas</strong> (reconocimiento gramatical y comprensión lectora). En la vida real, la <strong>fluidez oral activa</strong> suele situarse entre <strong>0.5 y 1.0 nivel por debajo</strong> de la puntuación en el examen.',
      realityP2:
        'Si obtuviste un B2, es probable que en una conversación espontánea te desenvuelvas con comodidad en un B1. ¡Para superar esta brecha, entrena la expresión oral con un profesor!',
      servicesTitle: 'Aplica tu nivel en los servicios de Teacher Alex',
      simplyNewDesc: 'Lee noticias mundiales actuales adaptadas automáticamente a tu nivel MCER.',
      simplyNewBtn: 'Leer noticias →',
      smartReaderDesc:
        'Sube cualquier artículo o libro: el lector resalta solo las palabras superiores a tu nivel para guardarlas en tarjetas.',
      smartReaderBtn: 'Abrir Smart Reader →',
      coursesTitle: 'Cursos y Clases con Teacher Alex',
      coursesDesc:
        'Clases individuales para superar la barrera del idioma, perfeccionar la pronunciación y preparar entrevistas.',
      coursesBtn: 'Reservar consulta →',
      reviewShow: 'Ver el desglose de las 18 preguntas y explicaciones',
      reviewHide: 'Ocultar desglose de respuestas',
      questionWord: 'Pregunta',
      correctWord: 'Correcto',
      skippedWord: 'Omitida (0.0)',
      incorrectWord: 'Incorrecto (0.0)',
      explanationWord: 'Explicación:',
      retakeBtn: 'Repetir prueba de diagnóstico',
      bandDesc: {
        C2: {
          title: 'C2 — Maestría (Bilingüe)',
          desc: 'Dominio excepcional de estructuras gramaticales complejas, léxico idiomático avanzado y registros académicos.',
        },
        C1: {
          title: 'C1 — Dominio Operativo Eficaz (Avanzado)',
          desc: 'Fluidez espontánea, dominio seguro del modo subjuntivo, frases idiomáticas complejas y lectura fluida de medios auténticos.',
        },
        B2: {
          title: 'B2 — Avanzado (Intermedio alto)',
          desc: 'Usuario independiente. Comprensión sólida de textos extensos, interacción natural en el entorno laboral y comprensión de medios.',
        },
        B1: {
          title: 'B1 — Umbral (Intermedio)',
          desc: 'Base sólida de estructuras gramaticales comunes, narración de eventos pasados y planes futuros, y autonomía en viajes.',
        },
        A2: {
          title: 'A2 — Plataforma (Elemental)',
          desc: 'Tiempos verbales básicos, diálogos cotidianos y comprensión de información predecible en tiendas, menús y horarios.',
        },
        A1: {
          title: 'A1 — Acceso (Principiante)',
          desc: 'Frases esenciales de presentación, verbos básicos (to be / ser / estar / sein) y vocabulario elemental de supervivencia.',
        },
      },
    },
  }[locale];

  const scoreResults = useMemo(() => {
    let totalScore = 0;
    const levelStats: Record<CEFRLevel, { total: number; correct: number; points: number }> = {
      A1: { total: 0, correct: 0, points: 0 },
      A2: { total: 0, correct: 0, points: 0 },
      B1: { total: 0, correct: 0, points: 0 },
      B2: { total: 0, correct: 0, points: 0 },
      C1: { total: 0, correct: 0, points: 0 },
      C2: { total: 0, correct: 0, points: 0 },
    };

    questions.forEach((q) => {
      levelStats[q.level].total += 1;
      const ans = answers[q.id];
      if (ans && !ans.isSkipped && ans.selectedOption === q.correctIndex) {
        levelStats[q.level].correct += 1;
        const pts = ans.isConfident ? 1.0 : 0.5;
        levelStats[q.level].points += pts;
        totalScore += pts;
      }
    });

    let estimatedBand: CEFRLevel = 'A1';

    if (totalScore >= 16.5) {
      estimatedBand = 'C2';
    } else if (totalScore >= 14.5) {
      estimatedBand = 'C1';
    } else if (totalScore >= 11.5) {
      estimatedBand = 'B2';
    } else if (totalScore >= 7.5) {
      estimatedBand = 'B1';
    } else if (totalScore >= 4.0) {
      estimatedBand = 'A2';
    } else {
      estimatedBand = 'A1';
    }

    const bandInfo = t.bandDesc[estimatedBand];

    const beginnerPoints = levelStats.A1.points + levelStats.A2.points;
    const intermediatePoints = levelStats.B1.points + levelStats.B2.points;
    const advancedPoints = levelStats.C1.points + levelStats.C2.points;

    return {
      totalScore,
      maxScore: questions.length,
      percentage: Math.round((totalScore / questions.length) * 100),
      estimatedBand,
      bandTitle: bandInfo.title,
      bandDesc: bandInfo.desc,
      levelStats,
      tierBreakdown: {
        beginner: { points: beginnerPoints, max: 6, percent: Math.round((beginnerPoints / 6) * 100) },
        intermediate: { points: intermediatePoints, max: 6, percent: Math.round((intermediatePoints / 6) * 100) },
        advanced: { points: advancedPoints, max: 6, percent: Math.round((advancedPoints / 6) * 100) },
      },
    };
  }, [questions, answers, t]);

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-[color:var(--color-neutral-300)] shadow-md overflow-hidden transition-all">
      {/* Quiz Header Bar in Teacher Alex Brand Palette */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-700 px-6 sm:px-8 py-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-brand-500/40 border border-brand-400/50 text-brand-100 text-xs font-bold uppercase tracking-wider">
                {t.badge}
              </span>
              <span className="text-xs text-brand-200 font-medium inline-flex items-center gap-1.5">
                <FlagIcon country={language} size="sm" />
                {language === 'pt' && <FlagIcon country="br" size="sm" />}
                <span>{t.langLabel[language]}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-100/90 mt-1 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {!isCompleted && (
            <div className="text-right shrink-0">
              <span className="text-xs uppercase font-bold text-brand-200 block mb-1">
                {t.progress}
              </span>
              <span className="text-xl font-extrabold text-white">
                {currentIndex + 1}{' '}
                <span className="text-sm font-semibold text-brand-300">/ {questions.length}</span>
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="mt-5 w-full bg-brand-950/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-accent-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      {!isCompleted ? (
        <div className="p-6 sm:p-10">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-brand-50 border border-brand-200 text-brand-800 font-extrabold text-xs">
                {t.levelPrefix} {currentQ.level}
              </span>
              <span className="px-3 py-1 rounded-lg bg-neutral-100 text-neutral-700 font-semibold text-xs">
                {currentQ.skill}
              </span>
            </div>

            {/* Confidence Toggle */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-300 text-xs">
              <span className="text-[11px] font-semibold text-neutral-600 pl-2">{t.confidenceLabel}</span>
              <button
                type="button"
                onClick={() => handleToggleConfidence(true)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  currentAnswer.isConfident && !currentAnswer.isSkipped
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title={t.confidentTip}
              >
                {t.confidentBtn}
              </button>
              <button
                type="button"
                onClick={() => handleToggleConfidence(false)}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  !currentAnswer.isConfident && !currentAnswer.isSkipped
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title={t.unsureTip}
              >
                {t.unsureBtn}
              </button>
            </div>
          </div>

          {/* Reading Snippet if present */}
          {currentQ.passage && (
            <div className="my-5 p-4 sm:p-5 rounded-2xl bg-brand-50/70 border border-brand-200/80 text-neutral-900 text-sm sm:text-base leading-relaxed italic font-serif">
              <span className="block not-italic text-[11px] uppercase font-bold text-brand-700 tracking-wider mb-1">
                {t.readingPassage}
              </span>
              {currentQ.passage}
            </div>
          )}

          {/* Prompt */}
          <div className="my-6">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              const isSelected = currentAnswer.selectedOption === idx && !currentAnswer.isSkipped;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-brand-50 border-brand-600 ring-2 ring-brand-500/20 text-brand-900 font-bold shadow-xs'
                      : 'bg-neutral-50 hover:bg-white border-neutral-200 text-neutral-800 hover:border-brand-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-neutral-200 text-neutral-700 group-hover:bg-brand-100'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base">{option}</span>
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Controls */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleSkipQuestion}
              className="text-xs text-neutral-600 hover:text-brand-900 font-semibold underline underline-offset-4 cursor-pointer order-2 sm:order-1"
            >
              {t.skipBtn}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  currentIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-neutral-100 text-neutral-400'
                    : 'hover:bg-neutral-100 text-neutral-800 cursor-pointer'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.backBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentAnswer.selectedOption === null && !currentAnswer.isSkipped}
                className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all ${
                  currentAnswer.selectedOption === null && !currentAnswer.isSkipped
                    ? 'bg-neutral-300 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-700 cursor-pointer active:scale-98'
                }`}
              >
                <span>{currentIndex === questions.length - 1 ? t.finishBtn : t.nextBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Diagnostic Results View */
        <div className="p-6 sm:p-10 space-y-8 animate-in fade-in duration-300">
          {/* Main Band Result Hero */}
          <div className="bg-gradient-to-br from-brand-50 via-white to-accent-50/60 border border-brand-200 rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-600 text-white font-bold text-xs uppercase tracking-wider mb-4 shadow-2xs">
              <Award className="w-4 h-4" />
              <span>{t.resultBadge}</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-brand-900 tracking-tight mb-2">
              {scoreResults.bandTitle}
            </h3>

            <p className="text-sm sm:text-base text-neutral-700 max-w-2xl mx-auto mb-6 leading-relaxed">
              {scoreResults.bandDesc}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="px-5 py-2.5 rounded-2xl bg-white border border-brand-100 shadow-2xs">
                <span className="text-xs text-neutral-500 block font-semibold uppercase">{t.scoreLabel}</span>
                <span className="text-2xl font-black text-brand-900">
                  {scoreResults.totalScore.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-neutral-500">/ {scoreResults.maxScore}.0</span>
                </span>
              </div>

              <div className="px-5 py-2.5 rounded-2xl bg-white border border-brand-100 shadow-2xs">
                <span className="text-xs text-neutral-500 block font-semibold uppercase">{t.accuracyLabel}</span>
                <span className="text-2xl font-black text-emerald-700">
                  {scoreResults.percentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown by Tiers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3">
              {t.tiersTitle}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-xs text-neutral-800">{t.beginnerTier}</span>
                  <span className="text-xs font-black text-brand-700">
                    {scoreResults.tierBreakdown.beginner.points.toFixed(1)} / 6.0
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${scoreResults.tierBreakdown.beginner.percent}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  {t.beginnerDesc}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-xs text-neutral-800">{t.intermediateTier}</span>
                  <span className="text-xs font-black text-brand-700">
                    {scoreResults.tierBreakdown.intermediate.points.toFixed(1)} / 6.0
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${scoreResults.tierBreakdown.intermediate.percent}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  {t.intermediateDesc}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-xs text-neutral-800">{t.advancedTier}</span>
                  <span className="text-xs font-black text-brand-700">
                    {scoreResults.tierBreakdown.advanced.points.toFixed(1)} / 6.0
                  </span>
                </div>
                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${scoreResults.tierBreakdown.advanced.percent}%` }}
                  />
                </div>
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  {t.advancedDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Reality Check Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-4 text-amber-950 shadow-2xs">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-900 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
              <h5 className="font-bold text-amber-950 text-sm sm:text-base">
                {t.realityTitle}
              </h5>
              <p
                className="text-amber-900 font-normal"
                dangerouslySetInnerHTML={{ __html: t.realityP1 }}
              />
              <p className="text-amber-900 font-normal">
                {t.realityP2}
              </p>
            </div>
          </div>

          {/* "Use Your Level on Teacher Alex" CTA Cards */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>{t.servicesTitle}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href={
                  locale === 'ru'
                    ? 'https://teacher-alex.com/simply_new'
                    : `https://teacher-alex.com/${locale}/simply_new`
                }
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 border border-blue-200 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-neutral-900 group-hover:text-brand-700 transition-colors text-base mb-1">
                    Simply New
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t.simplyNewDesc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-brand-700 group-hover:translate-x-1 transition-transform">
                  <span>{t.simplyNewBtn}</span>
                </div>
              </a>

              <a
                href={
                  locale === 'ru'
                    ? 'https://teacher-alex.com/smart_reader'
                    : `https://teacher-alex.com/${locale}/smart_reader`
                }
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-100 border border-brand-200 text-brand-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-neutral-900 group-hover:text-brand-700 transition-colors text-base mb-1">
                    Smart Reader
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t.smartReaderDesc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-brand-700 group-hover:translate-x-1 transition-transform">
                  <span>{t.smartReaderBtn}</span>
                </div>
              </a>

              <a
                href={
                  locale === 'ru'
                    ? 'https://teacher-alex.com/courses'
                    : `https://teacher-alex.com/${locale}/courses`
                }
                target="_blank"
                rel="noreferrer"
                className="group p-5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-brand-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-neutral-900 group-hover:text-brand-700 transition-colors text-base mb-1">
                    {t.coursesTitle}
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {t.coursesDesc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-brand-700 group-hover:translate-x-1 transition-transform">
                  <span>{t.coursesBtn}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Expandable Answers Key */}
          <div className="pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={() => setShowReview(!showReview)}
              className="w-full py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <span>{showReview ? t.reviewHide : t.reviewShow}</span>
              </div>
              {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showReview && (
              <div className="mt-4 space-y-4 animate-in fade-in">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCorrect = ans && !ans.isSkipped && ans.selectedOption === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                        isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : ans?.isSkipped
                          ? 'bg-neutral-50 border-neutral-200'
                          : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-bold text-xs text-neutral-700">
                          {t.questionWord} {idx + 1} ({q.level} • {q.skill})
                        </span>
                        <span className="flex items-center gap-1 font-bold text-xs">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {t.correctWord} ({ans?.isConfident ? '+1.0' : '+0.5'})
                            </span>
                          ) : ans?.isSkipped ? (
                            <span className="text-neutral-500">{t.skippedWord}</span>
                          ) : (
                            <span className="text-rose-600 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> {t.incorrectWord}
                            </span>
                          )}
                        </span>
                      </div>

                      <p className="font-semibold text-neutral-900 mb-2">{q.prompt}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const wasSelected = ans?.selectedOption === oIdx;
                          const isTheCorrectOption = oIdx === q.correctIndex;
                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg border ${
                                isTheCorrectOption
                                    ? 'bg-emerald-100 border-emerald-300 font-bold text-emerald-950'
                                    : wasSelected
                                    ? 'bg-rose-100 border-rose-300 text-rose-950 font-medium'
                                    : 'bg-white border-neutral-200 text-neutral-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}{' '}
                              {isTheCorrectOption && '✓'} {wasSelected && !isTheCorrectOption && '✗'}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-2 text-xs text-neutral-700 bg-white/80 p-2.5 rounded-lg border border-neutral-200">
                        <strong className="text-neutral-900">{t.explanationWord} </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Retake Button */}
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.retakeBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickEstimator;
