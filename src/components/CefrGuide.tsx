// src/components/CefrGuide.tsx
import React, { useState } from 'react';
import { CEFR_LEVELS } from '../data/cefrData';
import {
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface CefrGuideProps {
  locale: 'ru' | 'en' | 'es';
}

export const CefrGuide: React.FC<CefrGuideProps> = ({ locale }) => {
  const [expandedLevel, setExpandedLevel] = useState<string | null>('B2');

  const toggleLevel = (level: string) => {
    setExpandedLevel((prev) => (prev === level ? null : level));
  };

  const texts = {
    ru: {
      badge: 'Международный стандарт CEFR',
      title: 'Шкала уровней CEFR и как понимать свои результаты',
      subtitle:
        'Общеевропейская шкала языковых компетенций (CEFR / MCER) описывает реальные практические навыки на каждом этапе обучения от A1 до C2.',
      cardBadge: 'Важный методический закон',
      cardTitle: '«Пассивный разрыв»: Рецептивные vs. Продуктивные навыки',
      cardP: (
        <>
          Почти все онлайн-тесты оценивают <strong>пассивные (рецептивные) навыки</strong> — чтение и узнавание грамматики. Человек может понимать тексты уровня B2, но в разговоре испытывать сложности на уровне B1.
        </>
      ),
      receptiveTitle: 'Рецептивные навыки (Чтение / Слух)',
      receptiveP: (
        <>
          Мозг опирается на подсказки и контекст. Пассивный словарный запас обычно в <strong>2–3 раза больше</strong> активного.
        </>
      ),
      productiveTitle: 'Продуктивные навыки (Речь / Письмо)',
      productiveP: (
        <>
          Требуют мгновенного извлечения слов из памяти без вариантов ответа. Обычно на <strong>0.5 – 1.0 ступень ниже</strong> теста по чтению.
        </>
      ),
      ctaText: 'Снять языковой барьер',
      ctaUrl: 'https://teacher-alex.com/courses',
      vocabLabel: 'Объем активного словаря:',
      readingLabel: 'Чтение (Reading)',
      listeningLabel: 'Слух (Listening)',
      speakingLabel: 'Речь (Speaking)',
      writingLabel: 'Письмо (Writing)',
      scenarioLabel: '🌍 Практический ориентир:',
      recLabel: '🎯 Рекомендация Teacher Alex:',
    },
    en: {
      badge: 'International CEFR Framework',
      title: 'CEFR Proficiency Scale & Score Guide',
      subtitle:
        'The Common European Framework of Reference for Languages (CEFR) describes real-world communicative competence across 6 calibrated stages from A1 to C2.',
      cardBadge: 'Key Pedagogical Principle',
      cardTitle: 'The "Passive Gap": Receptive vs. Productive Skills',
      cardP: (
        <>
          Nearly all online placement tests measure <strong>passive (receptive) skills</strong>—reading comprehension and grammar recognition. A learner may comfortably understand B2-level texts while struggling to converse fluently at a B1 level.
        </>
      ),
      receptiveTitle: 'Receptive Skills (Reading / Listening)',
      receptiveP: (
        <>
          The brain relies on contextual cues and multiple-choice prompts. Passive vocabulary is typically <strong>2–3 times larger</strong> than active recall.
        </>
      ),
      productiveTitle: 'Productive Skills (Speaking / Writing)',
      productiveP: (
        <>
          Requires instantaneous recall from long-term memory without hints. Active speaking fluency is typically <strong>0.5 – 1.0 band lower</strong> than reading test scores.
        </>
      ),
      ctaText: 'Close the Speaking Gap',
      ctaUrl: 'https://teacher-alex.com/en/courses',
      vocabLabel: 'Active vocabulary:',
      readingLabel: 'Reading',
      listeningLabel: 'Listening',
      speakingLabel: 'Speaking',
      writingLabel: 'Writing',
      scenarioLabel: '🌍 Real-World Milestone:',
      recLabel: '🎯 Teacher Alex Recommendation:',
    },
    es: {
      badge: 'Marco Común Europeo (MCER)',
      title: 'Escala de Niveles MCER y Cómo Interpretar tus Resultados',
      subtitle:
        'El Marco Común Europeo de Referencia para las Lenguas (MCER / CEFR) describe las competencias comunicativas prácticas en cada etapa de aprendizaje, de A1 a C2.',
      cardBadge: 'Principio Metodológico Clave',
      cardTitle: 'La "Brecha Pasiva": Habilidades Receptivas vs. Productivas',
      cardP: (
        <>
          Casi todas las pruebas en línea evalúan <strong>habilidades pasivas (receptivas)</strong>: comprensión lectora y reconocimiento gramatical. Un estudiante puede comprender textos de nivel B2 pero tener dificultades para hablar en un nivel B1.
        </>
      ),
      receptiveTitle: 'Habilidades receptivas (Lectura / Escucha)',
      receptiveP: (
        <>
          El cerebro se apoya en pistas contextuales y opciones de respuesta. El vocabulario pasivo suele ser de <strong>2 a 3 veces mayor</strong> que el activo.
        </>
      ),
      productiveTitle: 'Habilidades productivas (Habla / Escritura)',
      productiveP: (
        <>
          Requiere evocar palabras al instante sin pistas ni opciones. La fluidez oral activa suele situarse entre <strong>0.5 y 1.0 nivel por debajo</strong> de la lectura.
        </>
      ),
      ctaText: 'Superar la barrera del idioma',
      ctaUrl: 'https://teacher-alex.com/es/courses',
      vocabLabel: 'Vocabulario activo:',
      readingLabel: 'Lectura (Reading)',
      listeningLabel: 'Comprensión auditiva (Listening)',
      speakingLabel: 'Expresión oral (Speaking)',
      writingLabel: 'Expresión escrita (Writing)',
      scenarioLabel: '🌍 Referencia práctica:',
      recLabel: '🎯 Recomendación de Teacher Alex:',
    },
  }[locale];

  return (
    <div className="bg-[color:var(--color-neutral-50)] rounded-3xl border border-[color:var(--color-neutral-300)] shadow-md p-6 sm:p-10 space-y-8">
      {/* Section Header */}
      <div className="border-b border-neutral-200 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5 text-brand-600" />
          <span>{texts.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
          {texts.title}
        </h2>
        <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
          {texts.subtitle}
        </p>
      </div>

      {/* Prominent Tip Box: Receptive vs Productive Skills */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-brand-800/80 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>{texts.cardBadge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {texts.cardTitle}
            </h3>

            <p className="text-xs sm:text-sm text-brand-100 leading-relaxed font-normal">
              {texts.cardP}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
                  <BookOpen className="w-4 h-4" />
                  {texts.receptiveTitle}
                </span>
                <p className="text-brand-100 text-[11px] leading-normal">
                  {texts.receptiveP}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/10 border border-white/10">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                  <Mic className="w-4 h-4" />
                  {texts.productiveTitle}
                </span>
                <p className="text-brand-100 text-[11px] leading-normal">
                  {texts.productiveP}
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <a
              href={texts.ctaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full lg:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-extrabold text-xs transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>{texts.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 6 CEFR Levels Accordion */}
      <div className="space-y-3.5">
        {CEFR_LEVELS.map((levelInfo) => {
          const isExpanded = expandedLevel === levelInfo.level;
          const content = levelInfo.translations[locale];

          return (
            <div
              key={levelInfo.level}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-neutral-50/70 border-brand-400 shadow-xs ring-1 ring-brand-500/20'
                  : 'bg-neutral-50 hover:bg-white border-neutral-200'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleLevel(levelInfo.level)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-700 text-white flex items-center justify-center font-black text-lg shadow-2xs shrink-0">
                    {levelInfo.level}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-0.5">
                      <span className="text-base sm:text-lg font-extrabold text-neutral-900">
                        {levelInfo.level} — {content.title}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-neutral-700 border border-neutral-300 uppercase tracking-wide">
                        {content.category}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500">
                      {texts.vocabLabel} <strong className="text-neutral-800">{content.vocabSize}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-2 border-t border-neutral-200 space-y-4 animate-in fade-in duration-150">
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {content.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                      <div className="flex items-center gap-1.5 font-bold text-neutral-800 mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                        <span>{texts.readingLabel}</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        {content.canDo.reading}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                      <div className="flex items-center gap-1.5 font-bold text-neutral-800 mb-1">
                        <Headphones className="w-3.5 h-3.5 text-blue-600" />
                        <span>{texts.listeningLabel}</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        {content.canDo.listening}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                      <div className="flex items-center gap-1.5 font-bold text-neutral-800 mb-1">
                        <Mic className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{texts.speakingLabel}</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        {content.canDo.speaking}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                      <div className="flex items-center gap-1.5 font-bold text-neutral-800 mb-1">
                        <PenTool className="w-3.5 h-3.5 text-purple-600" />
                        <span>{texts.writingLabel}</span>
                      </div>
                      <p className="text-neutral-600 text-[11px] leading-relaxed">
                        {content.canDo.writing}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200">
                      <span className="font-bold text-brand-900 block mb-1">
                        {texts.scenarioLabel}
                      </span>
                      <p className="text-brand-800 text-[11px] leading-relaxed">
                        {content.realWorldScenario}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="font-bold text-emerald-900 block mb-1">
                        {texts.recLabel}
                      </span>
                      <p className="text-emerald-800 text-[11px] leading-relaxed">
                        {content.nextStepRecommendation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CefrGuide;
