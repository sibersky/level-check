import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, Volume2, Plus, Copy, Check, ArrowLeft, Download, Eye, EyeOff, FileText, Image as ImageIcon, ExternalLink, ShieldCheck } from 'lucide-react';

interface WordAnnotation {
  token: string;
  lemma: string;
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  partOfSpeech: string;
  definitionEn: string;
  translationL1: string;
}

interface AnalyzeResult {
  extractedText: string;
  totalWords: number;
  aboveLevelCount: number;
  percentKnown: number;
  annotations: WordAnnotation[];
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;

const L1_LANGUAGES = [
  { code: 'ru', name: 'Russian', label: 'Русский (Russian)' },
  { code: 'es', name: 'Spanish', label: 'Español (Spanish)' },
  { code: 'de', name: 'German', label: 'Deutsch (German)' },
  { code: 'fr', name: 'French', label: 'Français (French)' },
  { code: 'it', name: 'Italian', label: 'Italiano (Italian)' },
  { code: 'zh', name: 'Chinese', label: '中文 (Chinese)' },
  { code: 'pt', name: 'Portuguese', label: 'Português (Portuguese)' },
];

const PRESET_ARTICLES = [
  {
    title: "Literatura & Lengua Española",
    level: "A2",
    text: `El profesor decidió sugerir una nueva lectura a sus alumnos, pero nadie quiso admitir que el texto era demasiado complejo para ellos. Tras el fallecimiento del autor, surgieron numerosas dudas sobre cómo amparar su legado literario frente a la rápida transformación cultural.`,
  },
  {
    title: 'Technology & Cognitive Autonomy',
    level: 'B1',
    text: `The relentless pace of technological advancement has created an ubiquitous reliance on automated algorithms. While tech proponents herald unprecedented efficiency, skeptics question the gradual erosion of cognitive autonomy and the subtle ramifications of surveillance capitalism. Navigating this labyrinthine digital landscape demands profound intellectual discernment from every citizen. Those who succumb to intellectual complacency risk relinquishing their critical faculties to opaque predictive systems.`,
  },
  {
    title: 'Biodiversity & Ecosystem Resilience',
    level: 'B1',
    text: `Ecological equilibria are inherently delicate. The pervasive degradation of temperate wetlands has triggered cascading ramifications across trophic networks. Conservation biologists emphasize that indigenous habitats are not merely aesthetic sanctuaries; they constitute indispensable buffers against climate volatility. Mitigating anthropogenic impact requires unequivocal multilateral commitments rather than sporadic remediation efforts.`,
  },
];

export const SmartReaderSimulator: React.FC<{
  onBack: () => void;
  isLoggedIn: boolean;
  onOpenLogin: () => void;
}> = ({ onBack, isLoggedIn, onOpenLogin }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [text, setText] = useState(PRESET_ARTICLES[0].text);
  const [targetLanguage, setTargetLanguage] = useState<string>('Spanish');
  const [targetLevel, setTargetLevel] = useState<string>('B1');
  const [l1Language, setL1Language] = useState<string>('Russian');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResult | null>(null);

  // Reader settings
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('serif');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [viewMode, setViewMode] = useState<'reader' | 'vocabList'>('reader');
  const [selectedWord, setSelectedWord] = useState<WordAnnotation | null>(null);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Analyze function
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // High-precision CEFR lexical mapping
      const dictionary: Record<string, WordAnnotation> = {
        sugerir: {
          token: "sugerir",
          lemma: "sugerir",
          cefrLevel: "B1",
          partOfSpeech: "verbo",
          definitionEn: "Proponer o aconsejar una idea o plan para que alguien lo considere.",
          translationL1: l1Language === "Russian" ? "предлагать, советовать" : "to suggest, propose",
        },
        admitir: {
          token: "admitir",
          lemma: "admitir",
          cefrLevel: "B1",
          partOfSpeech: "verbo",
          definitionEn: "Aceptar o reconocer algo como cierto, válido o permitido.",
          translationL1: l1Language === "Russian" ? "признавать, допускать" : "to admit, acknowledge",
        },
        complejo: {
          token: "complejo",
          lemma: "complejo",
          cefrLevel: "B1",
          partOfSpeech: "adj.",
          definitionEn: "Que se compone de múltiples elementos y resulta difícil de comprender.",
          translationL1: l1Language === "Russian" ? "сложный, комплексный" : "complex, intricate",
        },
        fallecimiento: {
          token: "fallecimiento",
          lemma: "fallecimiento",
          cefrLevel: "B2",
          partOfSpeech: "sustantivo",
          definitionEn: "Muerte o desaparición física de una persona.",
          translationL1: l1Language === "Russian" ? "кончина, смерть" : "death, passing",
        },
        amparar: {
          token: "amparar",
          lemma: "amparar",
          cefrLevel: "C1",
          partOfSpeech: "verbo",
          definitionEn: "Proteger, defender o dar cobijo a alguien o algo.",
          translationL1: l1Language === "Russian" ? "защищать, укрывать" : "to protect, shelter",
        },
        relentless: {
          token: 'relentless',
          lemma: 'relentless',
          cefrLevel: 'B2',
          partOfSpeech: 'adj.',
          definitionEn: 'Continuing without stopping, pausing, or diminishing in intensity.',
          translationL1: l1Language === 'Russian' ? 'неумолимый, непрекращающийся' : 'implacable, incesante',
        },
        ubiquitous: {
          token: 'ubiquitous',
          lemma: 'ubiquitous',
          cefrLevel: 'C1',
          partOfSpeech: 'adj.',
          definitionEn: 'Present, appearing, or found everywhere at the same time.',
          translationL1: l1Language === 'Russian' ? 'вездесущий, повсеместный' : 'omnipresente, ubicuo',
        },
        proponents: {
          token: 'proponents',
          lemma: 'proponent',
          cefrLevel: 'B2',
          partOfSpeech: 'noun',
          definitionEn: 'A person who advocates a particular theory, proposal, or course of action.',
          translationL1: l1Language === 'Russian' ? 'сторонники, защитники' : 'defensores, partidarios',
        },
        herald: {
          token: 'herald',
          lemma: 'herald',
          cefrLevel: 'C1',
          partOfSpeech: 'verb',
          definitionEn: 'To be a sign that something is about to happen; to praise or announce enthusiastically.',
          translationL1: l1Language === 'Russian' ? 'предвещать, возвещать' : 'anunciar, proclamar',
        },
        unprecedented: {
          token: 'unprecedented',
          lemma: 'unprecedented',
          cefrLevel: 'B2',
          partOfSpeech: 'adj.',
          definitionEn: 'Never done or known before; extraordinary.',
          translationL1: l1Language === 'Russian' ? 'беспрецедентный, небывалый' : 'sin precedentes',
        },
        erosion: {
          token: 'erosion',
          lemma: 'erosion',
          cefrLevel: 'B2',
          partOfSpeech: 'noun',
          definitionEn: 'The gradual destruction or diminution of something over time.',
          translationL1: l1Language === 'Russian' ? 'размывание, ослабление' : 'erosión, deterioro',
        },
        cognitive: {
          token: 'cognitive',
          lemma: 'cognitive',
          cefrLevel: 'B2',
          partOfSpeech: 'adj.',
          definitionEn: 'Relating to conscious mental processes like thinking, reasoning, and remembering.',
          translationL1: l1Language === 'Russian' ? 'когнитивный, познавательный' : 'cognitivo',
        },
        autonomy: {
          token: 'autonomy',
          lemma: 'autonomy',
          cefrLevel: 'C1',
          partOfSpeech: 'noun',
          definitionEn: 'The right or condition of self-government and independent freedom of choice.',
          translationL1: l1Language === 'Russian' ? 'автономия, независимость' : 'autonomía, independencia',
        },
        ramifications: {
          token: 'ramifications',
          lemma: 'ramification',
          cefrLevel: 'C1',
          partOfSpeech: 'noun',
          definitionEn: 'Unintended, complex consequences or implications of an action or event.',
          translationL1: l1Language === 'Russian' ? 'последствия, скрытые эффекты' : 'ramificaciones, repercusiones',
        },
        labyrinthine: {
          token: 'labyrinthine',
          lemma: 'labyrinthine',
          cefrLevel: 'C2',
          partOfSpeech: 'adj.',
          definitionEn: 'Irregular and twisting; extremely intricate, convoluted, and difficult to decipher.',
          translationL1: l1Language === 'Russian' ? 'лабиринтообразный, запутанный' : 'laberíntico, intrincado',
        },
        discernment: {
          token: 'discernment',
          lemma: 'discernment',
          cefrLevel: 'C1',
          partOfSpeech: 'noun',
          definitionEn: 'The ability to judge well, understand obscure details, and distinguish quality.',
          translationL1: l1Language === 'Russian' ? 'проницательность, разборчивость' : 'discernimiento',
        },
        complacency: {
          token: 'complacency',
          lemma: 'complacency',
          cefrLevel: 'C1',
          partOfSpeech: 'noun',
          definitionEn: 'A feeling of smug or uncritical satisfaction with oneself or achievements.',
          translationL1: l1Language === 'Russian' ? 'самоуспокоенность, беспечность' : 'complacencia',
        },
        relinquishing: {
          token: 'relinquishing',
          lemma: 'relinquish',
          cefrLevel: 'C1',
          partOfSpeech: 'verb',
          definitionEn: 'Voluntarily ceasing to keep or claim; surrendering control or ownership.',
          translationL1: l1Language === 'Russian' ? 'уступка, отказ от чего-либо' : 'renunciar, ceder',
        },
        opaque: {
          token: 'opaque',
          lemma: 'opaque',
          cefrLevel: 'B2',
          partOfSpeech: 'adj.',
          definitionEn: 'Not transparent; hard or impossible to understand, explain, or see through.',
          translationL1: l1Language === 'Russian' ? 'непрозрачный, непонятный' : 'opaco, ininteligible',
        },
      };

      const words = text.split(/\s+/).filter(Boolean);
      const totalWords = words.length;

      // Filter words based on user target level
      const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const userIdx = order.indexOf(targetLevel);

      const annotations: WordAnnotation[] = [];
      const seen = new Set<string>();

      for (const w of words) {
        const clean = w.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, '');
        if (dictionary[clean] && !seen.has(clean)) {
          const item = dictionary[clean];
          const wordIdx = order.indexOf(item.cefrLevel);
          if (wordIdx > userIdx) {
            annotations.push(item);
            seen.add(clean);
          }
        }
      }

      const aboveLevelCount = annotations.length;
      const percentKnown = Math.round(((totalWords - aboveLevelCount) / totalWords) * 100);

      setAnalysisResult({
        extractedText: text,
        totalWords,
        aboveLevelCount,
        percentKnown,
        annotations,
      });

      setIsAnalyzing(false);
    }, 900);
  };

  const handleSpeak = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (item: WordAnnotation) => {
    const flashcard = `${item.lemma} — ${item.translationL1} // ${item.definitionEn} (${item.cefrLevel})`;
    navigator.clipboard.writeText(flashcard);
    setCopiedWord(item.token);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  const handleSaveToDeck = (item: WordAnnotation) => {
    setSavedWords((prev) => ({ ...prev, [item.token]: true }));
  };

  const handleExport = () => {
    if (!analysisResult) return;
    const content = analysisResult.annotations
      .map((item) => `${item.lemma} — ${item.translationL1} // [${item.cefrLevel}] ${item.definitionEn}`)
      .join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `smart-reader-words-${targetLevel}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const annotationLookup = useMemo(() => {
    const map = new Map<string, WordAnnotation>();
    if (!analysisResult) return map;
    for (const ann of analysisResult.annotations) {
      map.set(ann.token.toLowerCase(), ann);
      map.set(ann.lemma.toLowerCase(), ann);
    }
    return map;
  }, [analysisResult]);

  const isBorderline = (wordLevel: string) => {
    const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    return order.indexOf(wordLevel) === order.indexOf(targetLevel) + 1;
  };

  return (
    <div className="max-w-5xl mx-auto py-4 animate-in fade-in duration-300">
      {/* Top Banner & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#7b8bb8] gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27323a] text-white hover:bg-[#1a2328] text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Tools
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <div>
              <h2 className="text-base font-extrabold text-[#1e2942]">
                Smart Reader <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">New App</span>
              </h2>
              <p className="text-xs text-[#2e3b63]">CEFR-Adaptive Graded Reader for authentic texts</p>
            </div>
          </div>
        </div>

        {/* SSO Status Pill */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-xs font-semibold text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Registered Student (Full Access)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#2e3b63]">Preview Mode</span>
              <button
                onClick={onOpenLogin}
                className="px-3 py-1 bg-[#1e2942] hover:bg-[#141c2e] text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>

      {!analysisResult ? (
        /* Input & Configuration Screen */
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-white/70 text-[#1e2942] text-xs font-bold tracking-wide uppercase mb-2 shadow-2xs">
              Personalized Reading Experience
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1e2942] mb-3">
              Read Authentic English at Your Exact Level
            </h1>
            <p className="text-sm text-[#2e3b63] leading-relaxed">
              Upload any dense article or screenshot. Smart Reader calculates words above your CEFR level, highlights them smoothly, and delivers in-context definitions and L1 translations with a single tap.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#7b8bb8] shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
            {/* Input Mode Selector */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 -mb-px transition-colors cursor-pointer ${
                  activeTab === 'text'
                    ? 'border-[#1e2942] text-[#1e2942]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" /> Paste Text
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('image')}
                className={`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 -mb-px transition-colors cursor-pointer ${
                  activeTab === 'image'
                    ? 'border-[#1e2942] text-[#1e2942]'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Upload Screenshot / OCR
              </button>
            </div>

            {/* Mode 1: Textarea */}
            {activeTab === 'text' && (
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">English Text to Read</label>
                  <div className="flex gap-2">
                    {PRESET_ARTICLES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setText(preset.text)}
                        className="text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
                      >
                        Sample {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  rows={7}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste any article, excerpt, or exam paragraph here..."
                  className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2942] leading-relaxed text-slate-900 font-normal"
                />
                <p className="text-[11px] text-slate-500 text-right">{text.length} characters</p>
              </div>
            )}

            {/* Mode 2: Image Drag & Drop */}
            {activeTab === 'image' && (
              <div className="mb-6">
                {!uploadedImagePreview ? (
                  <div
                    onClick={() => {
                      setUploadedImagePreview('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80');
                      setText(PRESET_ARTICLES[0].text);
                    }}
                    className="border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50/50 transition-colors"
                  >
                    <div className="text-4xl mb-3">📸</div>
                    <p className="text-sm font-bold text-slate-900">Drag & drop a screenshot here or click to load sample</p>
                    <p className="text-xs text-slate-500 mt-1">Supports PNG, JPG, or WEBP photos of book pages, Kindle screens, or articles</p>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={uploadedImagePreview} alt="Screenshot" className="w-14 h-14 object-cover rounded-lg border" />
                      <div>
                        <p className="text-xs font-bold text-slate-900">screenshot-page-1.png</p>
                        <p className="text-xs text-emerald-700 font-semibold">✓ Multimodal OCR Ready</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedImagePreview(null)}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Level & Native Language Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-200 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Your Current Mastery Level (CEFR)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {CEFR_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setTargetLevel(lvl)}
                      className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                        targetLevel === lvl
                          ? 'bg-[#1e2942] text-white border-[#1e2942] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Words up to <strong>{targetLevel}</strong> are assumed known. Harder words will be highlighted.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Native Language for Translation (L1)
                </label>
                <select
                  value={l1Language}
                  onChange={(e) => setL1Language(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1e2942]"
                >
                  {L1_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !text.trim()}
              className="w-full py-4 rounded-xl font-extrabold text-sm text-white bg-[#1e2942] hover:bg-[#141c2e] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI Analyzing Lexicon & Level Difficulty...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Analyze Vocabulary & Start Reading</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Reader Canvas */
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          {/* Top Controls Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAnalysisResult(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-800 transition-colors cursor-pointer"
              >
                ← New Text
              </button>

              <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-medium">
                <button
                  onClick={() => setViewMode('reader')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'reader'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  📖 Reader View
                </button>
                <button
                  onClick={() => setViewMode('vocabList')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'vocabList'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  📑 Vocab List ({analysisResult.annotations.length})
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
                <button
                  onClick={() => setFontFamily('sans')}
                  className={`px-2.5 py-1 rounded cursor-pointer ${fontFamily === 'sans' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-500'}`}
                >
                  Sans
                </button>
                <button
                  onClick={() => setFontFamily('serif')}
                  className={`px-2.5 py-1 rounded font-serif cursor-pointer ${fontFamily === 'serif' ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-500'}`}
                >
                  Serif
                </button>
              </div>

              <div className="flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-1 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white font-bold' : 'text-slate-500'}`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-1 rounded text-sm cursor-pointer ${fontSize === 'large' ? 'bg-white font-bold' : 'text-slate-500'}`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-1 rounded text-base cursor-pointer ${fontSize === 'xlarge' ? 'bg-white font-bold' : 'text-slate-500'}`}
                >
                  A++
                </button>
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export Words
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Words</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{analysisResult.totalWords}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Above Level ({targetLevel})</p>
              <p className="text-2xl font-black text-rose-600 mt-0.5">{analysisResult.aboveLevelCount}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Comprehension</p>
              <p className="text-2xl font-black text-emerald-600 mt-0.5">{analysisResult.percentKnown}%</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Reading Time</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">~{Math.max(1, Math.ceil(analysisResult.totalWords / 200))} min</p>
            </div>
          </div>

          {/* Highlighting Legend */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-2.5 bg-white/70 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-800">Highlight Legend:</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-400 inline-block" />
                <strong className="text-amber-950">Borderline (+1 Level)</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-100 border border-rose-400 inline-block" />
                <strong className="text-rose-950">Advanced (+2 Levels and above)</strong>
              </span>
            </div>
          </div>

          {/* Reading Canvas or Vocab List */}
          {viewMode === 'reader' ? (
            <div
              className={`bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-md leading-loose ${
                fontFamily === 'serif' ? 'font-serif' : 'font-sans'
              } ${
                fontSize === 'normal'
                  ? 'text-lg'
                  : fontSize === 'large'
                  ? 'text-xl'
                  : 'text-2xl'
              } text-slate-900`}
              style={{ maxWidth: '78ch', margin: '0 auto' }}
            >
              {analysisResult.extractedText.split(/\n+/).map((para, pIdx) => (
                <p key={pIdx} className="mb-6 leading-loose">
                  {para.split(/(\s+|[.,!?:;"'()—–]+)/g).map((token, tIdx) => {
                    const clean = token.toLowerCase().replace(/^[^\w]+|[^\w]+$/g, '');
                    const ann = annotationLookup.get(clean);
                    if (ann) {
                      const borderline = isBorderline(ann.cefrLevel);
                      const isSelected = selectedWord?.token === ann.token;
                      return (
                        <button
                          key={`${pIdx}-${tIdx}`}
                          type="button"
                          onClick={() => setSelectedWord(ann)}
                          className={`inline-block mx-0.5 px-1.5 py-0.5 rounded transition-all font-medium cursor-pointer ${
                            borderline
                              ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-b-2 border-amber-400'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-b-2 border-rose-400'
                          } ${isSelected ? 'ring-2 ring-[#1e2942] scale-105' : ''}`}
                        >
                          {token}
                          <span className="text-[10px] ml-0.5 font-bold uppercase opacity-75">
                            {ann.cefrLevel}
                          </span>
                        </button>
                      );
                    }
                    return <span key={`${pIdx}-${tIdx}`}>{token}</span>;
                  })}
                </p>
              ))}
            </div>
          ) : (
            /* Vocab List View */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {analysisResult.annotations.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">{item.lemma}</span>
                        <button onClick={() => handleSpeak(item.lemma)} className="text-slate-500 hover:text-slate-800">
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                          isBorderline(item.cefrLevel) ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.cefrLevel}
                        </span>
                        <span className="text-xs text-slate-500 italic">{item.partOfSpeech}</span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">{item.definitionEn}</p>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">L1 ({l1Language}): {item.translationL1}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(item)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium hover:bg-white text-slate-700 cursor-pointer"
                      >
                        {copiedWord === item.token ? '✓ Copied' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleSaveToDeck(item)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          savedWords[item.token] ? 'bg-emerald-600 text-white' : 'bg-[#1e2942] hover:bg-[#141c2e] text-white'
                        }`}
                      >
                        {savedWords[item.token] ? '✓ Saved' : '+ Poke-Me-On'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Word Modal / Gloss Card */}
          {selectedWord && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-2xs animate-in fade-in"
              onClick={() => setSelectedWord(null)}
            >
              <div
                className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-slate-900">{selectedWord.lemma}</h3>
                      <button onClick={() => handleSpeak(selectedWord.lemma)} className="text-slate-500 hover:text-slate-800">
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <span className={`text-xs font-black px-2 py-0.5 rounded uppercase ${
                        isBorderline(selectedWord.cefrLevel) ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {selectedWord.cefrLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 italic mt-0.5">{selectedWord.partOfSpeech}</p>
                  </div>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="py-4 space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      In-Context Definition
                    </label>
                    <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      {selectedWord.definitionEn}
                    </p>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      L1 Translation ({l1Language})
                    </label>
                    {revealedTranslations[selectedWord.token] ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <p className="text-sm font-bold text-emerald-900">{selectedWord.translationL1}</p>
                        <button
                          onClick={() => setRevealedTranslations(prev => ({ ...prev, [selectedWord.token]: false }))}
                          className="text-xs font-semibold text-emerald-700 hover:underline"
                        >
                          Hide
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRevealedTranslations(prev => ({ ...prev, [selectedWord.token]: true }))}
                        className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Reveal Translation
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => handleSaveToDeck(selectedWord)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      savedWords[selectedWord.token] ? 'bg-emerald-600 text-white' : 'bg-[#1e2942] hover:bg-[#141c2e] text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    {savedWords[selectedWord.token] ? 'Saved to Poke-Me-On Deck!' : 'Save to Poke-Me-On Deck'}
                  </button>

                  <button
                    onClick={() => handleCopy(selectedWord)}
                    className="w-full py-2 px-4 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedWord === selectedWord.token ? 'Copied to clipboard!' : 'Copy Flashcard (Word — Translation)'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
