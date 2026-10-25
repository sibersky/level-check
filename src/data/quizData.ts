export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface QuizQuestion {
  id: string;
  level: CEFRLevel;
  skill: 'Grammar' | 'Vocabulary' | 'Reading Comprehension';
  prompt: string;
  passage?: string; // Optional short reading snippet
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ENGLISH_QUESTIONS: QuizQuestion[] = [
  // --- A1 (Beginner) ---
  {
    id: 'en-a1-1',
    level: 'A1',
    skill: 'Grammar',
    prompt: 'She _______ two brothers and one sister.',
    options: ['have', 'has', 'having', 'is have'],
    correctIndex: 1,
    explanation: 'In the present simple tense, third-person singular subjects (he, she, it) take "has" instead of "have".',
  },
  {
    id: 'en-a1-2',
    level: 'A1',
    skill: 'Vocabulary',
    prompt: 'My father works in a hospital. He is a _______ .',
    options: ['teacher', 'doctor', 'driver', 'pilot'],
    correctIndex: 1,
    explanation: 'A doctor is a healthcare professional who works in a hospital treating sick people.',
  },
  {
    id: 'en-a1-3',
    level: 'A1',
    skill: 'Reading Comprehension',
    passage: '"Library Notice: Open Monday to Friday from 9:00 AM to 6:00 PM. Closed on weekends and public holidays."',
    prompt: 'When can you visit the library?',
    options: [
      'On Sunday afternoon',
      'On Wednesday at 2:00 PM',
      'On Saturday morning',
      'Every day after 7:00 PM',
    ],
    correctIndex: 1,
    explanation: 'Wednesday is a weekday between Monday and Friday, and 2:00 PM falls between 9:00 AM and 6:00 PM.',
  },

  // --- A2 (Elementary) ---
  {
    id: 'en-a2-1',
    level: 'A2',
    skill: 'Grammar',
    prompt: 'Yesterday evening, we _______ dinner when the electricity suddenly went out.',
    options: ['are having', 'were having', 'have had', 'had had'],
    correctIndex: 1,
    explanation: 'The past continuous ("were having") describes an ongoing action in the past that was interrupted by a single past event ("went out").',
  },
  {
    id: 'en-a2-2',
    level: 'A2',
    skill: 'Vocabulary',
    prompt: 'Could you please _______ me five dollars? I left my wallet in my car.',
    options: ['borrow', 'lend', 'spend', 'earn'],
    correctIndex: 1,
    explanation: '"Lend" means to give something temporarily to someone else. "Borrow" means to receive it ("Can I borrow five dollars from you?").',
  },
  {
    id: 'en-a2-3',
    level: 'A2',
    skill: 'Reading Comprehension',
    passage: '"Dear Guests: Breakfast is served in the courtyard from 7:00 to 10:00 AM. If you require an early checkout before 6:30 AM, please inform the front desk the evening before."',
    prompt: 'What must guests do if leaving early before 6:30 AM?',
    options: [
      'Eat breakfast in their room',
      'Notify reception the night before',
      'Pay an additional fee at 10:00 AM',
      'Leave their keys in the courtyard',
    ],
    correctIndex: 1,
    explanation: 'The notice specifically asks guests departing before 6:30 AM to inform the front desk the previous evening.',
  },

  // --- B1 (Intermediate) ---
  {
    id: 'en-b1-1',
    level: 'B1',
    skill: 'Grammar',
    prompt: 'If I had known you were coming to town, I _______ you at the train station.',
    options: [
      'would meet',
      'will have met',
      'would have met',
      'had met',
    ],
    correctIndex: 2,
    explanation: 'This is a third conditional statement describing an unreal past condition (If + past perfect) and its hypothetical past result (would have + past participle).',
  },
  {
    id: 'en-b1-2',
    level: 'B1',
    skill: 'Vocabulary',
    prompt: 'The manager decided to _______ the meeting until next Friday because three team members were sick.',
    options: ['call off', 'put off', 'take off', 'carry on'],
    correctIndex: 1,
    explanation: 'The phrasal verb "put off" means to postpone or delay to a later date. "Call off" would mean to cancel entirely.',
  },
  {
    id: 'en-b1-3',
    level: 'B1',
    skill: 'Reading Comprehension',
    passage: '"While remote work provides greater flexibility and eliminates daily commutes, studies indicate that without clear boundaries, employees frequently work longer hours and struggle to disconnect mentally."',
    prompt: 'According to the author, what is a primary drawback of remote work?',
    options: [
      'Higher transportation expenses',
      'Strict office schedules and oversight',
      'Difficulty separating work time from personal life',
      'Inability to complete tasks independently',
    ],
    correctIndex: 2,
    explanation: 'The passage highlights that without boundaries, remote workers work longer and "struggle to disconnect mentally".',
  },

  // --- B2 (Upper-Intermediate) ---
  {
    id: 'en-b2-1',
    level: 'B2',
    skill: 'Grammar',
    prompt: 'Scarcely _______ into the house when the phone began to ring incessantly.',
    options: [
      'I stepped',
      'did I step',
      'had I stepped',
      'have I stepped',
    ],
    correctIndex: 2,
    explanation: 'Negative and restrictive adverbs like "Scarcely", "Hardly", or "No sooner" at the start of a clause trigger subject-auxiliary inversion in the past perfect ("Scarcely had I stepped...").',
  },
  {
    id: 'en-b2-2',
    level: 'B2',
    skill: 'Vocabulary',
    prompt: 'The renewable energy report provided _______ evidence that solar installations had exceeded initial quarterly forecasts.',
    options: ['compelling', 'reluctant', 'ambiguous', 'negligible'],
    correctIndex: 0,
    explanation: '"Compelling evidence" is a natural B2/C1 collocation meaning powerful, convincing, and demanding attention.',
  },
  {
    id: 'en-b2-3',
    level: 'B2',
    skill: 'Reading Comprehension',
    passage: '"Urban planners originally touted ride-sharing as an antidote to urban traffic congestion. However, empirical traffic surveys demonstrate that empty "deadheading" miles between passenger pick-ups have in fact exacerbated gridlock in metropolitan centers."',
    prompt: 'What unexpected outcome does the passage highlight?',
    options: [
      'Ride-sharing services lowered carbon emissions significantly.',
      'Unoccupied vehicle travel between rides worsened city traffic.',
      'Urban planners banned commercial taxi services in downtown areas.',
      'Public transit ridership increased due to cheaper ride-share rates.',
    ],
    correctIndex: 1,
    explanation: 'The passage notes that "deadheading" (driving empty between fares) actually worsened ("exacerbated") urban gridlock rather than curing it.',
  },

  // --- C1 (Advanced) ---
  {
    id: 'en-c1-1',
    level: 'C1',
    skill: 'Grammar',
    prompt: 'The committee recommended that the proposal _______ thoroughly reviewed before any public announcements are made.',
    options: [
      'is',
      'be',
      'will be',
      'would be',
    ],
    correctIndex: 1,
    explanation: 'Verbs of recommendation, demand, or urgency (recommend, suggest, insist) followed by a "that" clause require the present subjunctive base form ("be").',
  },
  {
    id: 'en-c1-2',
    level: 'C1',
    skill: 'Vocabulary',
    prompt: 'Her arguments were so _______ that even the most skeptical members of the board were persuaded.',
    options: ['lucid', 'opaque', 'superficial', 'tentative'],
    correctIndex: 0,
    explanation: '"Lucid" means expressed clearly and easy to understand; articulate and luminous in reasoning.',
  },
  {
    id: 'en-c1-3',
    level: 'C1',
    skill: 'Reading Comprehension',
    passage: '"Critics often conflate the author\'s detached narrative persona with moral indifference. Yet a closer reading reveals that this deliberate restraint functions as an aesthetic buffer, forcing the reader to adjudicate the ethical dilemmas rather than passively absorbing prescriptive verdicts."',
    prompt: 'Why does the author employ a restrained narrative tone?',
    options: [
      'To conceal an utter lack of emotional conviction.',
      'To compel readers to actively evaluate moral questions themselves.',
      'To adhere rigidly to conventional stylistic genre constraints.',
      'To discourage critical analysis of the protagonist\'s flaws.',
    ],
    correctIndex: 1,
    explanation: 'The passage explicitly states that restraint functions to "force the reader to adjudicate the ethical dilemmas" rather than providing pre-packaged moral verdicts.',
  },

  // --- C2 (Mastery / Proficiency) ---
  {
    id: 'en-c2-1',
    level: 'C2',
    skill: 'Grammar',
    prompt: '_______ such exorbitant tariffs been imposed, domestic manufacturers would not be facing this acute supply chain bottleneck.',
    options: [
      'Were not',
      'Had not',
      'Should not',
      'Could not',
    ],
    correctIndex: 1,
    explanation: 'Inverted third conditional with negative polarity: "Had not such exorbitant tariffs been imposed..." is the high-register equivalent of "If such exorbitant tariffs had not been imposed...".',
  },
  {
    id: 'en-c2-2',
    level: 'C2',
    skill: 'Vocabulary',
    prompt: 'The diplomat’s speech was marked by subtle _______, allowing both opposing factions to interpret the treaty in their own favor.',
    options: ['equivocation', 'candor', 'dogmatism', 'veracity'],
    correctIndex: 0,
    explanation: '"Equivocation" refers to the deliberate use of ambiguous or evasive language to conceal truth or avoid committing to a single stance.',
  },
  {
    id: 'en-c2-3',
    level: 'C2',
    skill: 'Reading Comprehension',
    passage: '"The prevailing historiography treats the treaty as an immutable watershed. Nevertheless, archival dispatches indicate that signatories regarded it less as a definitive codification of borders than as an ephemeral détente—a stopgap measure designed to buy time for domestic rearmament rather than a durable peace."',
    prompt: 'What does the archival evidence suggest about the signatories\' perception of the treaty?',
    options: [
      'They viewed it as a perpetual guarantee of territorial sovereignty.',
      'They recognized it primarily as a temporary respite to prepare military capacity.',
      'They considered it an insurmountable obstacle to geopolitical dominance.',
      'They believed it represented a groundbreaking triumph of international jurisprudence.',
    ],
    correctIndex: 1,
    explanation: 'The passage clarifies that signatories saw it as an "ephemeral détente" and a "stopgap measure designed to buy time for domestic rearmament".',
  },
];

export const SPANISH_QUESTIONS: QuizQuestion[] = [
  // --- A1 (Beginner / Acceso) ---
  {
    id: 'es-a1-1',
    level: 'A1',
    skill: 'Grammar',
    prompt: 'Hola, me _______ Carlos y vivo en Madrid.',
    options: ['llama', 'llamo', 'llamas', 'llamar'],
    correctIndex: 1,
    explanation: 'El verbo pronominal "llamarse" en primera persona del singular (yo) se conjuga como "me llamo".',
  },
  {
    id: 'es-a1-2',
    level: 'A1',
    skill: 'Vocabulary',
    prompt: 'Para escribir una carta en un cuaderno, necesito un _______ .',
    options: ['bolígrafo', 'tenedor', 'coche', 'zapatos'],
    correctIndex: 0,
    explanation: 'Un "bolígrafo" es el instrumento de escritura común. "Tenedor", "coche" y "zapatos" no sirven para escribir.',
  },
  {
    id: 'es-a1-3',
    level: 'A1',
    skill: 'Reading Comprehension',
    passage: '"Horario de la cafetería: Abierto de martes a domingo de 8:00 a 20:00. Lunes cerrado por descanso del personal."',
    prompt: '¿Qué día está cerrada la cafetería?',
    options: ['El martes', 'El viernes', 'El domingo', 'El lunes'],
    correctIndex: 3,
    explanation: 'El aviso indica explícitamente: "Lunes cerrado por descanso del personal".',
  },

  // --- A2 (Elementary / Plataforma) ---
  {
    id: 'es-a2-1',
    level: 'A2',
    skill: 'Grammar',
    prompt: 'El año pasado mi familia y yo _______ a Barcelona de vacaciones.',
    options: ['vamos', 'fuimos', 'íbamos', 'iríamos'],
    correctIndex: 1,
    explanation: 'Para una acción puntual y completada en un periodo temporal cerrado en el pasado ("el año pasado"), se utiliza el pretérito indefinido: "fuimos".',
  },
  {
    id: 'es-a2-2',
    level: 'A2',
    skill: 'Vocabulary',
    prompt: '¿Puedes _______ la luz, por favor? Ya es de noche y no puedo leer.',
    options: ['encender', 'apagar', 'cerrar', 'limpiar'],
    correctIndex: 0,
    explanation: 'En español se dice "encender la luz" para iluminar una habitación. "Apagar" es lo contrario.',
  },
  {
    id: 'es-a2-3',
    level: 'A2',
    skill: 'Reading Comprehension',
    passage: '"Estimado cliente: Por obras de mantenimiento en la estación central, los trenes con destino a Sevilla saldrán de la vía 4 en lugar de la vía 2 habitual."',
    prompt: '¿De qué vía saldrán los trenes a Sevilla hoy?',
    options: ['De la vía central', 'De la vía 2', 'De la vía 4', 'De ninguna, están cancelados'],
    correctIndex: 2,
    explanation: 'El comunicado especifica que los trenes saldrán de la vía 4 en lugar de la vía 2.',
  },

  // --- B1 (Intermediate / Umbral) ---
  {
    id: 'es-b1-1',
    level: 'B1',
    skill: 'Grammar',
    prompt: 'Espero que mañana _______ buen tiempo para ir a la playa.',
    options: ['hace', 'haga', 'hiciera', 'hará'],
    correctIndex: 1,
    explanation: 'El verbo "esperar" expresa deseo sobre una acción futura, lo cual exige el presente de subjuntivo ("haga").',
  },
  {
    id: 'es-b1-2',
    level: 'B1',
    skill: 'Vocabulary',
    prompt: 'El científico logró un gran _______ en el tratamiento de la enfermedad tras años de investigación.',
    options: ['fracaso', 'avance', 'retraso', 'descuento'],
    correctIndex: 1,
    explanation: '"Avance" significa progreso o descubrimiento significativo. Es el término positivo adecuado en contexto científico.',
  },
  {
    id: 'es-b1-3',
    level: 'B1',
    skill: 'Reading Comprehension',
    passage: '"Aunque el teletrabajo ahorra tiempo de desplazamiento y otorga mayor autonomía, varios estudios psicológicos advierten que el aislamiento prolongado puede reducir la motivación y la cohesión de los equipos."',
    prompt: 'Según el texto, ¿cuál es un riesgo del trabajo a distancia?',
    options: [
      'El aumento en los costes de transporte',
      'La pérdida de motivación por falta de contacto humano',
      'La obligatoriedad de trabajar horas extras los fines de semana',
      'La disminución de la autonomía individual',
    ],
    correctIndex: 1,
    explanation: 'El texto señala que el "aislamiento prolongado" puede disminuir la motivación y la cohesión.',
  },

  // --- B2 (Upper-Intermediate / Avanzado) ---
  {
    id: 'es-b2-1',
    level: 'B2',
    skill: 'Grammar',
    prompt: 'Si hubiera tenido tu número de teléfono, te _______ en cuanto aterrizó el vuelo.',
    options: [
      'habría llamado',
      'llamaría',
      'hubiera llamado',
      'llamo',
    ],
    correctIndex: 0,
    explanation: 'Condicional irreal del pasado: "Si hubiera + participio" va acompañado en la apódosis por el condicional compuesto ("habría llamado") o pluscuamperfecto de subjuntivo.',
  },
  {
    id: 'es-b2-2',
    level: 'B2',
    skill: 'Vocabulary',
    prompt: 'Sus comentarios fueron tan _______ que terminaron ofendiendo a gran parte de los asistentes.',
    options: ['conciliadores', 'hirientes', 'afables', 'discretos'],
    correctIndex: 1,
    explanation: '"Hirientes" describe palabras o actitudes ofensivas y dolorosas que hieren la sensibilidad de otros.',
  },
  {
    id: 'es-b2-3',
    level: 'B2',
    skill: 'Reading Comprehension',
    passage: '"El auge del turismo rural no solo ha revitalizado pueblos en peligro de despoblación, sino que también ha planteado dilemas ecológicos. La masificación estacional ejerce una presión insostenible sobre los recursos hídricos locales."',
    prompt: '¿Qué consecuencia negativa del turismo rural se menciona?',
    options: [
      'La despoblación acelerada de las zonas urbanas',
      'El impacto severo sobre las reservas locales de agua',
      'La desaparición de los negocios gastronómicos tradicionales',
      'El encarecimiento del transporte público entre provincias',
    ],
    correctIndex: 1,
    explanation: 'El texto subraya la "presión insostenible sobre los recursos hídricos locales" provocada por la afluencia estacional.',
  },

  // --- C1 (Dominio Operativo Eficaz) ---
  {
    id: 'es-c1-1',
    level: 'C1',
    skill: 'Grammar',
    prompt: 'Por más que _______ disculparse, su actitud altiva impidió cualquier reconciliación sincera.',
    options: [
      'intentara',
      'intenta',
      'intentó',
      'intentará',
    ],
    correctIndex: 0,
    explanation: 'La estructura concesiva "por más que + imperfecto de subjuntivo" ("intentara / intentase") expresa una acción pasada infructuosa con matiz de esfuerzo continuado.',
  },
  {
    id: 'es-c1-2',
    level: 'C1',
    skill: 'Vocabulary',
    prompt: 'El embajador actuó con suma _______, evitando pronunciarse sobre asuntos que pudieran suscitar roces diplomáticos.',
    options: ['parsimonia', 'cautela', 'vehemencia', 'frivolidad'],
    correctIndex: 1,
    explanation: '"Cautela" denota precaución, reserva y prudencia extrema al actuar o hablar en circunstancias delicadas.',
  },
  {
    id: 'es-c1-3',
    level: 'C1',
    skill: 'Reading Comprehension',
    passage: '"La crítica literaria tiende a desdeñar la autoficción por considerarla un ejercicio narcisista. Sin embargo, en manos de narradores diestros, el yo no opera como pedestal ególatra, sino como un prisma refractario que desmantela las certidumbres colectivas."',
    prompt: 'Según el fragmento, ¿cómo funciona el "yo" en la autoficción bien ejecutada?',
    options: [
      'Como un ensalzamiento indisimulado de la vida íntima del creador.',
      'Como una herramienta para cuestionar verdades asumidas por la sociedad.',
      'Como una renuncia explícita a la experimentación formal.',
      'Como una crónica estrictamente fidedigna de sucesos históricos.',
    ],
    correctIndex: 1,
    explanation: 'El autor argumenta que funciona como "prisma refractario que desmantela las certidumbres colectivas", desmintiendo el mero narcisismo.',
  },

  // --- C2 (Maestría) ---
  {
    id: 'es-c2-1',
    level: 'C2',
    skill: 'Grammar',
    prompt: 'De _______ conocido de antemano el desenlace de los comicios, difícilmente se habrían producido tales vaivenes bursátiles.',
    options: [
      'haberse',
      'habiendo',
      'hayan',
      'hubieran',
    ],
    correctIndex: 0,
    explanation: 'Estructura condicional culta: "De + infinitivo compuesto" ("De haberse conocido...") equivale a la prótasis hipotética irreal "Si se hubiera conocido...".',
  },
  {
    id: 'es-c2-2',
    level: 'C2',
    skill: 'Vocabulary',
    prompt: 'Su discurso, aunque formalmente elegante, carecía de hondura y se reducía a un mero ejercicio de _______ retórica.',
    options: ['prolijidad', 'inane', 'enjundia', 'probidad'],
    correctIndex: 1,
    explanation: '"Inane" significa fútil, vano, sin sustancia ni trascendencia ("inane retórica"). ("Enjundia" significaría sustancia o profundidad).',
  },
  {
    id: 'es-c2-3',
    level: 'C2',
    skill: 'Reading Comprehension',
    passage: '"La historiografía canónica suele postular el armisticio como un punto de inflexión unívoco. Empero, las minutas desclasificadas atestiguan que los plenipotenciarios concebían el pacto no cual hito fundacional de concordia duradera, sino como una tregua precaria destinada a aplazar hostilidades en tanto fraguaba la reorganización castrense interna."',
    prompt: '¿Qué revelan los documentos sobre la intención real de los negociadores?',
    options: [
      'Que ansiaban instaurar un orden pacífico irrevocable entre las naciones beligerantes.',
      'Que utilizaron el acuerdo como un respiro temporal para reorganizar sus fuerzas armadas.',
      'Que desconfiaban de la capacidad de sus tropas para mantener las fronteras coloniales.',
      'Que consideraban el armisticio una capitulación deshonrosa impuesta por terceros.',
    ],
    correctIndex: 1,
    explanation: 'El texto indica que era una "tregua precaria destinada a aplazar hostilidades en tanto fraguaba la reorganización castrense interna".',
  },
];
