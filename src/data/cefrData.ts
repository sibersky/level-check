export interface CEFRLevelTranslation {
  title: string;
  category: string;
  vocabSize: string;
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

export interface CEFRLevelInfo {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  badgeColor: string;
  translations: {
    ru: CEFRLevelTranslation;
    en: CEFRLevelTranslation;
    es: CEFRLevelTranslation;
  };
}

export const CEFR_LEVELS: CEFRLevelInfo[] = [
  {
    level: 'A1',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    translations: {
      ru: {
        title: 'Breakthrough / Выживание',
        category: 'Начальный пользователь (Basic User)',
        vocabSize: '500 – 1 000 слов',
        summary: 'Понимание и использование знакомых повседневных выражений и самых простых фраз для решения конкретных базовых задач.',
        canDo: {
          reading: 'Понимание знакомых имен, слов и очень простых предложений на вывесках, плакатах или в каталогах.',
          listening: 'Распознавание знакомых слов и базовых фраз о себе и окружении при медленной и четкой речи.',
          speaking: 'Умение представиться, задать и ответить на простые вопросы о месте жительства, знакомых людях и вещах.',
          writing: 'Написание короткой открытки с поздравлением или заполнение простых формуляров с личными данными.',
        },
        realWorldScenario: 'Заказ кофе, регистрация в отеле с паспортом, вопрос о направлении на улице.',
        nextStepRecommendation: 'Используйте интервальное повторение Poke-Me-On для закрепления базовых существительных, глаголов и моделей вопросов.',
      },
      en: {
        title: 'Breakthrough / Beginner',
        category: 'Basic User',
        vocabSize: '500 – 1,000 words',
        summary: 'Can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of concrete needs.',
        canDo: {
          reading: 'Can understand familiar names, words, and very simple notices, posters, or catalog entries.',
          listening: 'Can recognize familiar words and basic phrases concerning yourself and immediate surroundings when spoken slowly and clearly.',
          speaking: 'Can introduce yourself and others, ask and answer simple questions about personal details (where you live, people you know).',
          writing: 'Can write a short, simple postcard or fill in forms with personal details (name, nationality, address).',
        },
        realWorldScenario: 'Ordering a coffee, checking into a hotel with a passport, asking for basic directions on the street.',
        nextStepRecommendation: 'Use Poke-Me-On spaced repetition to lock in core high-frequency nouns, verbs, and question patterns.',
      },
      es: {
        title: 'Acceso / Principiante',
        category: 'Usuario básico (Basic User)',
        vocabSize: '500 – 1.000 palabras',
        summary: 'Comprende y utiliza expresiones cotidianas de uso muy frecuente y frases sencillas destinadas a satisfacer necesidades de tipo inmediato.',
        canDo: {
          reading: 'Comprende palabras y nombres conocidos, así como frases muy sencillas en letreros, carteles o catálogos.',
          listening: 'Reconoce palabras y frases básicas sobre sí mismo y su entorno inmediato cuando se habla despacio y con claridad.',
          speaking: 'Sabe presentarse y presentar a otros, formular y responder preguntas sobre datos personales (dónde vive, personas que conoce).',
          writing: 'Es capaz de escribir una postal corta y sencilla y rellenar formularios con datos personales (nombre, nacionalidad, dirección).',
        },
        realWorldScenario: 'Pedir un café, registrarse en un hotel con pasaporte, pedir indicaciones básicas por la calle.',
        nextStepRecommendation: 'Utiliza Poke-Me-On con repetición espaciada para afianzar sustantivos, verbos y estructuras de preguntas básicas.',
      },
    },
  },
  {
    level: 'A2',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    translations: {
      ru: {
        title: 'Waystage / Элементарный',
        category: 'Базовый пользователь (Basic User)',
        vocabSize: '1 500 – 2 500 слов',
        summary: 'Понимание отдельных предложений и часто встречающихся выражений по ключевым сферам (личная информация, покупки, работа, окружение).',
        canDo: {
          reading: 'Чтение очень коротких простых текстов (объявления, меню, расписания) и нахождение конкретной предсказуемой информации.',
          listening: 'Понимание высказываний и обиходной лексики в ситуациях непосредственного общения.',
          speaking: 'Общение в простых рутинных ситуациях, требующих прямого обмена информацией на знакомые темы.',
          writing: 'Составление коротких простых заметок, сообщений и благодарственных писем.',
        },
        realWorldScenario: 'Покупка билетов на поезд, рассказ о прошедших выходных, понимание указателей в супермаркете.',
        nextStepRecommendation: 'Начните читать адаптированные новости в Simply New на уровне A2, чтобы привыкнуть к сложным предложениям.',
      },
      en: {
        title: 'Waystage / Elementary',
        category: 'Basic User',
        vocabSize: '1,500 – 2,500 words',
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
      es: {
        title: 'Plataforma / Elemental',
        category: 'Usuario básico (Basic User)',
        vocabSize: '1.500 – 2.500 palabras',
        summary: 'Comprende frases y expresiones de uso frecuente relacionadas con áreas de relevancia inmediata (información personal, compras, lugares, empleo).',
        canDo: {
          reading: 'Lee textos muy breves y sencillos (anuncios, menús, horarios) y encuentra información específica y predecible.',
          listening: 'Comprende frases y vocabulario habitual sobre temas de interés personal inmediato.',
          speaking: 'Se comunica en tareas sencillas y rutinarias que requieren un intercambio simple y directo de información sobre temas familiares.',
          writing: 'Escribe notas y mensajes breves y sencillos relativos a necesidades inmediatas.',
        },
        realWorldScenario: 'Comprar billetes de tren, hablar de aficiones, describir actividades del fin de semana y entender carteles en tiendas.',
        nextStepRecommendation: 'Empieza a leer noticias adaptadas en Simply New al nivel A2 para ampliar tus estructuras oracionales.',
      },
    },
  },
  {
    level: 'B1',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    translations: {
      ru: {
        title: 'Threshold / Пороговый',
        category: 'Независимый пользователь (Independent User)',
        vocabSize: '3 000 – 4 500 слов',
        summary: 'Понимание основных положений четких сообщений на знакомые темы, связанные с работой, учебой, досугом и путешествиями.',
        canDo: {
          reading: 'Понимание текстов, состоящих в основном из повседневного или профессионального языка, и личных писем с описанием событий.',
          listening: 'Понимание сути радио- и телепередач о текущих событиях или интересах при умеренно медленной речи.',
          speaking: 'Участие без подготовки в диалогах на знакомые темы; связное описание событий, мечтаний, надежд и планов.',
          writing: 'Написание простого связного текста на темы, которые хорошо знакомы или представляют личный интерес.',
        },
        realWorldScenario: 'Решение большинства ситуаций в поездке, аргументация своего мнения на командных митингах, просмотр видео с субтитрами.',
        nextStepRecommendation: 'Используйте Smart Reader для чтения реальных статей. Сохраняйте незнакомые фразовые глаголы в Poke-Me-On.',
      },
      en: {
        title: 'Threshold / Intermediate',
        category: 'Independent User',
        vocabSize: '3,000 – 4,500 words',
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
      es: {
        title: 'Umbral / Intermedio',
        category: 'Usuario independiente (Independent User)',
        vocabSize: '3.000 – 4.500 palabras',
        summary: 'Comprende los puntos principales de textos claros en lengua estándar sobre temas conocidos en el trabajo, los estudios o el ocio.',
        canDo: {
          reading: 'Comprende textos redactados en un lenguaje de uso habitual y cotidiano o relacionado con el trabajo, así como cartas personales.',
          listening: 'Comprende las ideas principales de programas de radio o televisión sobre temas de actualidad o de interés personal cuando la articulación es clara.',
          speaking: 'Participa sin preparación previa en conversaciones sobre temas familiares y narra historias, libros o películas ofreciendo opiniones.',
          writing: 'Escribe textos sencillos y bien enlazados sobre temas familiares o de interés personal.',
        },
        realWorldScenario: 'Desenvolverse en casi todas las situaciones cotidianas en un viaje, expresar opiniones y participar en reuniones de trabajo.',
        nextStepRecommendation: 'Utiliza Smart Reader para leer artículos reales. Guarda verbos compuestos y expresiones nuevas en Poke-Me-On.',
      },
    },
  },
  {
    level: 'B2',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    translations: {
      ru: {
        title: 'Vantage / Выше среднего',
        category: 'Самостоятельный пользователь (Independent User)',
        vocabSize: '5 000 – 7 500 слов',
        summary: 'Понимание сложного текста как на конкретные, так и на абстрактные темы, включая узкоспециализированные дискуссии в своей области.',
        canDo: {
          reading: 'Чтение статей и докладов по современной проблематике, понимание современной публицистики и авторской позиции.',
          listening: 'Понимание развернутых докладов, лекций и сложной аргументации, просмотр фильмов без субтитров.',
          speaking: 'Достаточно беглое и спонтанное общение с носителями языка без напряжения для обеих сторон.',
          writing: 'Написание понятных подробных текстов по широкому кругу вопросов, изложение аргументов «за» и «против».',
        },
        realWorldScenario: 'Полноценная работа в международной компании, участие в собеседованиях, презентация проектов на иностранном языке.',
        nextStepRecommendation: 'Читайте аутентичные медиа без фильтра. Преодолейте разрыв в беглости устной речи на индивидуальных занятиях с Teacher Alex.',
      },
      en: {
        title: 'Vantage / Upper-Intermediate',
        category: 'Independent User',
        vocabSize: '5,000 – 7,500 words',
        summary: 'Can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.',
        canDo: {
          reading: 'Can read articles and reports concerned with contemporary problems in which writers adopt particular attitudes or viewpoints.',
          listening: 'Can understand extended speech and lectures and follow complex lines of argument provided the topic is reasonably familiar.',
          speaking: 'Can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party.',
          writing: 'Can write clear, detailed text on a wide range of subjects and explain a viewpoint on a topical issue giving advantages and disadvantages.',
        },
        realWorldScenario: 'Working professionally in an English, German or Spanish-speaking office, following TV series without subtitles, presenting projects.',
        nextStepRecommendation: 'Read unfiltered native journalism and literature. Bridge the speaking fluency gap through 1-on-1 coaching with Teacher Alex.',
      },
      es: {
        title: 'Avanzado / Intermedio alto',
        category: 'Usuario independiente (Independent User)',
        vocabSize: '5.000 – 7.500 palabras',
        summary: 'Comprende las ideas principales de textos complejos sobre temas concretos y abstractos, incluidas discusiones técnicas en su especialidad.',
        canDo: {
          reading: 'Lee artículos e informes sobre problemas contemporáneos en los que los autores adoptan posturas o puntos de vista determinados.',
          listening: 'Comprende discursos extensos y conferencias, e incluso sigue líneas argumentales complejas si el tema le es relativamente conocido.',
          speaking: 'Se comunica con suficiente fluidez y naturalidad para mantener una conversación espontánea con hablantes nativos sin esfuerzo.',
          writing: 'Escribe textos claros y detallados sobre una amplia gama de temas, exponiendo ventajas y desventajas de diferentes opciones.',
        },
        realWorldScenario: 'Trabajar en entornos internacionales, seguir series sin subtítulos y realizar presentaciones profesionales.',
        nextStepRecommendation: 'Lee literatura y prensa nativa sin filtros. Cierra la brecha de fluidez oral mediante clases personalizadas con Teacher Alex.',
      },
    },
  },
  {
    level: 'C1',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    translations: {
      ru: {
        title: 'Effective Operational Proficiency / Продвинутый',
        category: 'Опытный пользователь (Proficient User)',
        vocabSize: '8 000 – 12 000 слов',
        summary: 'Понимание широкого спектра сложных длинных текстов, распознавание скрытых подтекстов и иронии. Свободная спонтанная речь без подбора слов.',
        canDo: {
          reading: 'Понимание длинных и сложных научно-популярных и литературных текстов, нюансов стиля и авторской интонации.',
          listening: 'Понимание развернутой речи на абстрактные темы, даже если структура высказывания не очевидна.',
          speaking: 'Точное формулирование мыслей, профессиональное участие в дискуссиях и дебатах на высоком академическом уровне.',
          writing: 'Создание четких, хорошо структурированных подробных текстов по сложным темам с грамотным композиционным оформлением.',
        },
        realWorldScenario: 'Подготовка коммерческих предложений, проведение переговоров, анализ сатиры, юмора и культурного контекста.',
        nextStepRecommendation: 'Оттачивайте идиоматические тонкости, стилистические регистры и произношение на спецкурсах C1/C2 с Teacher Alex.',
      },
      en: {
        title: 'Effective Operational Proficiency / Advanced',
        category: 'Proficient User',
        vocabSize: '8,000 – 12,000 words',
        summary: 'Can understand a wide range of demanding, longer texts, and recognize implicit meaning. Can express ideas fluently and spontaneously without much obvious searching for expressions.',
        canDo: {
          reading: 'Can understand long and complex factual and literary texts, appreciating distinctions of style, tone, and subtext.',
          listening: 'Can understand enough to follow extended speech on abstract and complex topics beyond own field with ease.',
          speaking: 'Can formulate ideas and opinions with precision and relate contributions skillfully to those of other speakers in professional or academic contexts.',
          writing: 'Can write clear, well-structured text, expressing points of view at some length with complex synthesis.',
        },
        realWorldScenario: 'Drafting executive proposals, negotiating commercial terms, analyzing nuanced satire and cultural subtext.',
        nextStepRecommendation: 'Fine-tune subtle idiomatic nuance, rhetorical register, and accent polish through Teacher Alex specialized C1/C2 coaching.',
      },
      es: {
        title: 'Dominio Operativo Eficaz / Avanzado',
        category: 'Usuario competente (Proficient User)',
        vocabSize: '8.000 – 12.000 palabras',
        summary: 'Comprende una amplia variedad de textos extensos y exigentes, reconociendo sentidos implícitos. Se expresa con fluidez y espontaneidad sin buscar palabras.',
        canDo: {
          reading: 'Comprende textos literarios y científicos extensos y complejos, apreciando distinciones de estilo, tono y subtexto.',
          listening: 'Comprende discursos extensos sobre temas abstractos y complejos fuera de su especialidad con total soltura.',
          speaking: 'Formula ideas y opiniones con precisión, enlazando sus intervenciones con las de otros interlocutores de forma experta.',
          writing: 'Escribe textos claros, bien estructurados y detallados sobre temas complejos, mostrando un uso correcto de los mecanismos de organización.',
        },
        realWorldScenario: 'Redactar propuestas corporativas, negociar acuerdos comerciales complejos y captar el humor y los matices culturales.',
        nextStepRecommendation: 'Pule matices idiomáticos sutiles, registros estilísticos y pronunciación con las tutorías avanzadas C1/C2 de Teacher Alex.',
      },
    },
  },
  {
    level: 'C2',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    translations: {
      ru: {
        title: 'Mastery / В совершенстве',
        category: 'Профессиональный уровень (Proficient User)',
        vocabSize: '15 000+ слов',
        summary: 'Свободное понимание практически любого устного или письменного сообщения. Обобщение информации из разных источников в связный аргументированный доклад.',
        canDo: {
          reading: 'Легкое чтение текстов любых стилей и жанров, включая сложные научные, юридические и философские труды.',
          listening: 'Безупречное восприятие на слух живой речи или радио/ТВ, даже при беглом темпе и выраженном диалектном акценте.',
          speaking: 'Естественное владение идиомами, фразеологизмами и разговорными нюансами; точнейшая дифференциация тонких оттенков смысла.',
          writing: 'Написание сложных академических статей, экспертных обзоров и аналитических отчетов в безупречном стиле.',
        },
        realWorldScenario: 'Выступление с программными докладами, публикация научных монографий, синхронный перевод и дипломатия.',
        nextStepRecommendation: 'Поддержание мастерства: регулярное глубокое чтение специализированной литературы и живая практика в академической среде.',
      },
      en: {
        title: 'Mastery / Proficiency',
        category: 'Proficient User',
        vocabSize: '15,000+ words',
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
      es: {
        title: 'Maestría / Bilingüe',
        category: 'Usuario competente (Proficient User)',
        vocabSize: 'más de 15.000 palabras',
        summary: 'Comprende con facilidad prácticamente todo lo que oye o lee. Reconstruye la información y los argumentos procedentes de diversas fuentes orales y escritas.',
        canDo: {
          reading: 'Lee con facilidad prácticamente todas las formas de lengua escrita, incluidos textos abstractos o lingüísticamente complejos.',
          listening: 'No tiene ninguna dificultad para comprender cualquier tipo de lengua hablada, tanto en vivo como en transmisiones, a velocidad de nativo.',
          speaking: 'Participa sin esfuerzo en cualquier conversación o debate con un dominio excelente de giros idiomáticos y expresiones coloquiales.',
          writing: 'Escribe textos claros y fluidos en un estilo adecuado, tales como artículos complejos, informes o cartas formales estructuradas lógicamente.',
        },
        realWorldScenario: 'Conferencias magistrales, publicaciones académicas, traducción jurídica y diplomacia de alto nivel.',
        nextStepRecommendation: 'Mantenimiento del dominio: inmersión continua en literatura clásica, variedades dialectales y redacción especializada.',
      },
    },
  },
];
