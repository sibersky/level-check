export interface CEFRLevelInfo {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  category: 'Basic User' | 'Independent User' | 'Proficient User';
  vocabSize: string;
  badgeColor: string;
  summary: string;
  canDo: {
    reading: string;
    listening: string;
    speaking: string;
    writing: string;
  };
  realWorldScenario: string;
  nextStepRecommendation: string;
}

export const CEFR_LEVELS: CEFRLevelInfo[] = [
  {
    level: 'A1',
    title: 'Breakthrough / Acceso',
    category: 'Basic User',
    vocabSize: '500 – 1,000 words',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    summary: 'Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.',
    canDo: {
      reading: 'Can understand familiar names, words, and very simple notices, posters, or catalog entries.',
      listening: 'Can recognize familiar words and basic phrases concerning yourself and immediate surroundings when spoken slowly and clearly.',
      speaking: 'Can introduce yourself and others, ask and answer simple questions about personal details (where you live, people you know).',
      writing: 'Can write a short, simple postcard or fill in forms with personal details (name, nationality, address).',
    },
    realWorldScenario: 'Ordering a coffee, checking into a hotel with a passport, asking for basic directions on the street.',
    nextStepRecommendation: 'Use Poke-Me-On spaced repetition to lock in core high-frequency nouns, verbs, and question patterns.',
  },
  {
    level: 'A2',
    title: 'Waystage / Plataforma',
    category: 'Basic User',
    vocabSize: '1,500 – 2,500 words',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    summary: 'Can understand sentences and frequently used expressions related to areas of most immediate relevance (personal info, shopping, local geography, employment).',
    canDo: {
      reading: 'Can read very short, simple texts (advertisements, menus, timetables) and locate specific predictable information.',
      listening: 'Can understand phrases and highest frequency vocabulary related to areas of immediate personal concern.',
      speaking: 'Can communicate in simple, routine tasks requiring a direct exchange of information on familiar matters.',
      writing: 'Can write short, simple notes and messages relating to matters in areas of immediate need.',
    },
    realWorldScenario: 'Buying train tickets, discussing hobbies, describing past weekend activities, and understanding supermarket signs.',
    nextStepRecommendation: 'Start reading adapted news in Simply New at the A2 level to expand sentence structures beyond single clauses.',
  },
  {
    level: 'B1',
    title: 'Threshold / Umbral',
    category: 'Independent User',
    vocabSize: '3,000 – 4,500 words',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    summary: 'Can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.',
    canDo: {
      reading: 'Can understand texts consisting mainly of high frequency everyday or job-related language and personal descriptions of events.',
      listening: 'Can understand the main points of clear standard speech on familiar matters and main points of radio/TV programs when delivery is relatively slow.',
      speaking: 'Can enter unprepared into conversations on familiar topics and narrate a story, book, or film plot with personal reactions.',
      writing: 'Can write straightforward connected text on topics that are familiar or of personal interest.',
    },
    realWorldScenario: 'Handling most travel situations in the target country, expressing personal opinions, and participating in team status meetings.',
    nextStepRecommendation: 'Use Smart Reader to consume real-world articles. Click to look up and save unfamiliar B1/B2 phrasal verbs directly into Poke-Me-On.',
  },
  {
    level: 'B2',
    title: 'Vantage / Avanzado',
    category: 'Independent User',
    vocabSize: '5,000 – 7,500 words',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    summary: 'Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.',
    canDo: {
      reading: 'Can read articles and reports concerned with contemporary problems in which writers adopt particular attitudes or viewpoints.',
      listening: 'Can understand extended speech and lectures and follow complex lines of argument provided the topic is reasonably familiar.',
      speaking: 'Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.',
      writing: 'Can write clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving advantages and disadvantages.',
    },
    realWorldScenario: 'Working professionally in an English or Spanish-speaking office, following TV series without subtitles, presenting projects.',
    nextStepRecommendation: 'Read unfiltered native journalism and literature. Bridge the speaking fluency gap through 1-on-1 coaching with Teacher Alex.',
  },
  {
    level: 'C1',
    title: 'Effective Operational Proficiency / Dominio',
    category: 'Proficient User',
    vocabSize: '8,000 – 12,000 words',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    summary: 'Can understand a wide range of demanding, longer texts, and recognize implicit meaning. Can express ideas fluently and spontaneously without much obvious searching for expressions.',
    canDo: {
      reading: 'Can understand long and complex factual and literary texts, appreciating distinctions of style, tone, and subtext.',
      listening: 'Can understand enough to follow extended speech on abstract and complex topics beyond own field with ease.',
      speaking: 'Can formulate ideas and opinions with precision and relate contributions skillfully to those of other speakers in professional or academic contexts.',
      writing: 'Can write clear, well-structured text, expressing points of view at some length with complex synthesis.',
    },
    realWorldScenario: 'Drafting executive proposals, negotiating legal or commercial terms, analyzing nuanced satire and cultural subtext.',
    nextStepRecommendation: 'Fine-tune subtle idiomatic nuance, rhetorical register, and accent polish through Teacher Alex specialized C1/C2 coaching.',
  },
  {
    level: 'C2',
    title: 'Mastery / Maestría',
    category: 'Proficient User',
    vocabSize: '15,000+ words',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    summary: 'Can understand with ease virtually everything heard or read. Can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation.',
    canDo: {
      reading: 'Can read with ease virtually all forms of the written language, including abstract, structurally or linguistically complex texts.',
      listening: 'Has no difficulty understanding any kind of spoken language, whether live or broadcast, even when delivered at fast native speed.',
      speaking: 'Can take part effortlessly in any conversation or discussion and has a good familiarity with idiomatic expressions and colloquialisms.',
      writing: 'Can write clear, smoothly-flowing text in an appropriate style, such as complex letters, reports, or articles which present a case with an effective logical structure.',
    },
    realWorldScenario: 'Keynote public speaking, academic publishing, forensic linguistic interpretation, and high-stakes diplomacy.',
    nextStepRecommendation: 'Mastery maintenance: Deep immersion in dialectal varieties, classical literature, and specialized technical writing.',
  },
];
