// Textos de interpretación. `camino`, `talento`, `deseo` e `imagen` son fragmentos
// que se combinan en la síntesis personal.
const MEANINGS = {
  1: {
    title: "El Líder", keywords: "Independencia · Iniciativa · Ambición",
    general: "El 1 es el número del inicio, la voluntad y la individualidad. Representa la chispa que pone las cosas en marcha. Las personas con una fuerte energía 1 piensan por sí mismas, deciden con rapidez y se sienten más vivas cuando abren caminos que nadie ha recorrido. Su aprendizaje pasa por confiar en su criterio sin dejar de escuchar a los demás.",
    strengths: ["Iniciativa y valentía", "Originalidad", "Determinación", "Capacidad de liderazgo"],
    challenges: ["Impaciencia", "Terquedad", "Tendencia a imponerse", "Dificultad para pedir ayuda"],
    love: "Necesitas una pareja que respete tu independencia y admire tu empuje. Das lo mejor de ti cuando la relación es un equipo de iguales, no una competición.",
    work: "Destacas al frente de proyectos o en puestos con autonomía: dirección, emprendimiento, deporte, invención, ventas.",
    advice: "Lidera con el ejemplo y deja espacio para que otros también brillen.",
    camino: "aprender a valerte por ti y a abrir tu propio camino",
    talento: "una gran iniciativa y la capacidad de ponerte al frente",
    deseo: "ser independiente y dejar tu propia huella",
    imagen: "alguien seguro, decidido y con carácter",
  },
  2: {
    title: "El Diplomático", keywords: "Cooperación · Sensibilidad · Armonía",
    general: "El 2 es el número de la unión, la sensibilidad y la cooperación. Donde el 1 inicia, el 2 acompaña, equilibra y tiende puentes. Percibe lo que otros sienten antes de que lo digan y tiene un don para la diplomacia. Su aprendizaje consiste en valorar su propia voz tanto como la de los demás.",
    strengths: ["Empatía", "Diplomacia", "Paciencia", "Atención al detalle"],
    challenges: ["Hipersensibilidad", "Indecisión", "Dependencia emocional", "Evitar los conflictos a toda costa"],
    love: "Eres una pareja cariñosa, atenta y leal. Buscas armonía y una conexión profunda; necesitas sentir aprecio y que te expresen afecto con frecuencia.",
    work: "Brillas en mediación, asesoría, terapia, recursos humanos, música, trabajo en equipo y cualquier labor que requiera tacto.",
    advice: "Tu sensibilidad es una fuerza: pon límites sin culpa.",
    camino: "aprender a cooperar y a encontrar el equilibrio en las relaciones",
    talento: "el tacto, la intuición y el don de unir a las personas",
    deseo: "amor, paz y relaciones armoniosas",
    imagen: "una persona amable, discreta y accesible",
  },
  3: {
    title: "El Comunicador", keywords: "Creatividad · Expresión · Alegría",
    general: "El 3 es el número de la expresión, la creatividad y la alegría de vivir. Combina la iniciativa del 1 con la sensibilidad del 2 y la convierte en comunicación. Tiene encanto natural, imaginación y facilidad para entusiasmar. Su aprendizaje es canalizar ese talento con disciplina y profundidad.",
    strengths: ["Creatividad", "Comunicación", "Optimismo", "Sociabilidad"],
    challenges: ["Dispersión", "Superficialidad", "Cambios de ánimo", "Dejar las cosas a medias"],
    love: "Aportas diversión, ternura y conversación. Necesitas una relación con chispa, donde puedas expresarte libremente y compartir planes.",
    work: "Arte, escritura, comunicación, publicidad, enseñanza, espectáculo, diseño, redes sociales.",
    advice: "Termina lo que empiezas: tu talento florece con constancia.",
    camino: "aprender a expresarte y a compartir tu creatividad con alegría",
    talento: "la palabra, la imaginación y el encanto",
    deseo: "expresarte, crear y disfrutar de la vida",
    imagen: "alguien simpático, divertido y comunicativo",
  },
  4: {
    title: "El Constructor", keywords: "Orden · Trabajo · Estabilidad",
    general: "El 4 es el número de la estructura, el trabajo y la estabilidad. Representa los cimientos de una casa: lo que no se ve pero lo sostiene todo. Es metódico, leal y responsable, y alcanza sus metas con esfuerzo sostenido. Su aprendizaje consiste en abrirse al cambio sin perder su solidez.",
    strengths: ["Disciplina", "Fiabilidad", "Organización", "Constancia"],
    challenges: ["Rigidez", "Exceso de control", "Testarudez", "Dificultad para relajarse"],
    love: "Ofreces compromiso, seguridad y lealtad. Demuestras amor con hechos más que con palabras; necesitas una relación estable y honesta.",
    work: "Ingeniería, administración, finanzas, construcción, artesanía, gestión de proyectos y cualquier trabajo que exija precisión.",
    advice: "Planifica, pero deja huecos para lo imprevisto.",
    camino: "aprender a construir bases sólidas con esfuerzo y constancia",
    talento: "la organización, la disciplina y el sentido práctico",
    deseo: "seguridad, orden y estabilidad",
    imagen: "alguien serio, fiable y trabajador",
  },
  5: {
    title: "El Aventurero", keywords: "Libertad · Cambio · Curiosidad",
    general: "El 5 es el número de la libertad, el movimiento y la experiencia. Está en el centro de los nueve dígitos y por eso todo le interesa. Es curioso, versátil, sensual y se adapta a cualquier situación. Su aprendizaje es usar la libertad con responsabilidad y encontrar estabilidad dentro del cambio.",
    strengths: ["Adaptabilidad", "Curiosidad", "Carisma", "Valentía ante lo nuevo"],
    challenges: ["Inquietud", "Excesos", "Falta de compromiso", "Impulsividad"],
    love: "Necesitas una pareja que te dé aire y comparta tu sed de aventura. La rutina te apaga; la complicidad y la novedad te enamoran.",
    work: "Viajes, periodismo, ventas, marketing, turismo, comunicación, emprendimiento y trabajos con variedad y trato con gente.",
    advice: "La libertad real incluye elegir a qué comprometerte.",
    camino: "aprender a vivir la libertad y a crecer a través del cambio",
    talento: "la versatilidad, la curiosidad y la capacidad de adaptación",
    deseo: "libertad, variedad y experiencias nuevas",
    imagen: "alguien dinámico, atractivo y espontáneo",
  },
  6: {
    title: "El Protector", keywords: "Responsabilidad · Amor · Hogar",
    general: "El 6 es el número del amor, la responsabilidad y la armonía. Se asocia al hogar, la familia y la belleza. Tiene un fuerte sentido del deber y una necesidad natural de cuidar, aconsejar y embellecer su entorno. Su aprendizaje es amar sin controlar y cuidar también de sí.",
    strengths: ["Generosidad", "Sentido de la responsabilidad", "Sensibilidad estética", "Capacidad de cuidar"],
    challenges: ["Perfeccionismo", "Sobreprotección", "Sacrificio excesivo", "Querer arreglar la vida ajena"],
    love: "Eres una pareja entregada, protectora y romántica. Buscas compromiso y un hogar compartido; cuida de no olvidarte de tus propias necesidades.",
    work: "Salud, educación, terapia, diseño, decoración, hostelería, trabajo social y cualquier profesión de servicio.",
    advice: "Cuidar de ti también es una forma de cuidar a los demás.",
    camino: "aprender a amar, a cuidar y a asumir responsabilidades con equilibrio",
    talento: "la capacidad de cuidar, aconsejar y crear armonía",
    deseo: "un hogar feliz y relaciones llenas de amor",
    imagen: "alguien cálido, protector y digno de confianza",
  },
  7: {
    title: "El Buscador", keywords: "Introspección · Análisis · Espiritualidad",
    general: "El 7 es el número de la búsqueda interior, el análisis y la sabiduría. Mira más allá de lo evidente y necesita entender el porqué de las cosas. Es reflexivo, intuitivo y selectivo con sus vínculos. Su aprendizaje consiste en confiar en la vida y compartir lo que descubre.",
    strengths: ["Profundidad", "Capacidad de análisis", "Intuición", "Independencia de criterio"],
    challenges: ["Aislamiento", "Desconfianza", "Frialdad aparente", "Exceso de crítica"],
    love: "Necesitas tiempo para abrirte, pero cuando lo haces tu vínculo es profundo y auténtico. Valoras la conexión intelectual y el respeto a tu espacio.",
    work: "Investigación, ciencia, filosofía, tecnología, análisis, escritura, espiritualidad, psicología.",
    advice: "No todo se resuelve pensando: deja espacio a la fe y al disfrute.",
    camino: "aprender a buscar la verdad y a confiar en tu sabiduría interior",
    talento: "una mente analítica, la intuición y la profundidad",
    deseo: "comprender el sentido de la vida y tener paz interior",
    imagen: "alguien reservado, enigmático e inteligente",
  },
  8: {
    title: "El Ejecutivo", keywords: "Poder · Logro · Abundancia",
    general: "El 8 es el número del poder, la ambición y el mundo material. Representa el equilibrio entre lo espiritual y lo terrenal: lo que se da, vuelve. Tiene visión estratégica, autoridad natural y capacidad para generar recursos. Su aprendizaje es usar su poder con justicia y no medir su valor solo por el éxito.",
    strengths: ["Visión estratégica", "Ambición", "Capacidad de gestión", "Resiliencia"],
    challenges: ["Materialismo", "Autoritarismo", "Adicción al trabajo", "Miedo al fracaso"],
    love: "Eres una pareja protectora y comprometida. Admiras la fortaleza y necesitas a alguien que te acompañe en tus metas sin competir contigo.",
    work: "Dirección de empresas, finanzas, derecho, política, sector inmobiliario, emprendimiento a gran escala.",
    advice: "El verdadero éxito incluye tiempo para las personas que quieres.",
    camino: "aprender a manejar el poder, el dinero y la autoridad con equilibrio",
    talento: "la visión estratégica y la capacidad de lograr resultados",
    deseo: "éxito, reconocimiento y abundancia",
    imagen: "alguien poderoso, seguro y competente",
  },
  9: {
    title: "El Humanitario", keywords: "Compasión · Generosidad · Cierre",
    general: "El 9 es el número de la compasión, la universalidad y los finales. Como último dígito, contiene algo de todos los demás. Tiene una visión amplia, idealista y generosa, y siente la llamada de contribuir a algo mayor. Su aprendizaje es soltar, perdonar y dar sin esperar nada a cambio.",
    strengths: ["Compasión", "Generosidad", "Visión amplia", "Creatividad e idealismo"],
    challenges: ["Dificultad para soltar el pasado", "Idealizar a los demás", "Dispersión emocional", "Desilusión"],
    love: "Amas con generosidad y comprensión. Necesitas una pareja que comparta tus ideales y entienda que tu corazón también pertenece al mundo.",
    work: "ONG, salud, enseñanza, arte, cooperación internacional, derechos humanos, terapias, causas sociales.",
    advice: "Cerrar etapas con gratitud te deja libre para lo nuevo.",
    camino: "aprender a servir a los demás y a soltar con generosidad",
    talento: "la compasión, la sabiduría y una visión humanitaria",
    deseo: "un mundo mejor y sentir que tu vida contribuye a él",
    imagen: "alguien sabio, generoso y carismático",
  },
  11: {
    title: "El Iluminador", keywords: "Intuición · Inspiración · Visión",
    general: "El 11 es el primer número maestro. Duplica la energía del 1 y se apoya en la sensibilidad del 2 (1 + 1). Es el canal de la intuición, la inspiración y la visión espiritual. Quien lo lleva suele sentir la misión de inspirar a otros, pero también vive con intensidad nerviosa. Su aprendizaje es confiar en su intuición y anclarla en la vida práctica.",
    strengths: ["Intuición muy desarrollada", "Capacidad de inspirar", "Idealismo", "Sensibilidad artística y espiritual"],
    challenges: ["Ansiedad y tensión nerviosa", "Inseguridad", "Expectativas muy altas", "Sensación de incomprensión"],
    love: "Buscas una conexión del alma. Eres una pareja sensible y entregada que necesita comprensión y calma para no sobrecargarse.",
    work: "Enseñanza, arte, espiritualidad, terapia, orientación, comunicación inspiradora, invención.",
    advice: "Cuando dudes, vuelve a la calma: tu intuición habla bajito.",
    camino: "aprender a confiar en tu intuición e inspirar a los demás",
    talento: "la intuición, la inspiración y una sensibilidad especial",
    deseo: "iluminar, inspirar y encontrar un propósito elevado",
    imagen: "alguien sensible, especial y magnético",
  },
  22: {
    title: "El Maestro Constructor", keywords: "Visión práctica · Gran escala · Legado",
    general: "El 22 es el Maestro Constructor, considerado el número más poderoso. Une la visión del 11 con la capacidad práctica del 4 (2 + 2). Puede convertir grandes sueños en realidades concretas que benefician a muchas personas. Su aprendizaje es no paralizarse ante su propio potencial y avanzar paso a paso.",
    strengths: ["Visión a gran escala", "Pragmatismo", "Liderazgo sólido", "Capacidad de materializar"],
    challenges: ["Presión interna", "Miedo a no estar a la altura", "Rigidez", "Agotamiento"],
    love: "Eres una pareja leal y comprometida, con planes de futuro. Necesitas a alguien que comparta tu visión y te recuerde descansar.",
    work: "Arquitectura, dirección de grandes proyectos, política, diplomacia, ingeniería, organizaciones internacionales.",
    advice: "Los grandes proyectos se construyen ladrillo a ladrillo.",
    camino: "aprender a convertir grandes visiones en obras concretas",
    talento: "la capacidad de materializar grandes proyectos",
    deseo: "construir algo que perdure y beneficie a muchos",
    imagen: "alguien sólido, visionario y capaz",
  },
  33: {
    title: "El Maestro Sanador", keywords: "Servicio · Compasión · Enseñanza",
    general: "El 33 es el Maestro Sanador, el más raro de los números maestros. Combina la expresión del 3 con el amor del 6 (3 + 3). Representa el amor incondicional, la enseñanza a través del ejemplo y el servicio desinteresado. Su aprendizaje es cuidar sin anularse y guiar sin cargar con la vida ajena.",
    strengths: ["Amor incondicional", "Vocación de servicio", "Sabiduría compasiva", "Capacidad de sanar y enseñar"],
    challenges: ["Autosacrificio", "Agotamiento emocional", "Perfeccionismo", "Sentirse responsable de todo"],
    love: "Amas de forma profunda y generosa. Necesitas una relación que te nutra tanto como tú nutres a los demás.",
    work: "Sanación, educación, orientación espiritual, terapia, arte con mensaje, trabajo humanitario.",
    advice: "Tu luz llega más lejos cuando también la diriges hacia ti.",
    camino: "aprender a servir con amor incondicional",
    talento: "la capacidad de sanar, enseñar y guiar con amor",
    deseo: "ayudar a sanar y elevar a quienes te rodean",
    imagen: "alguien cálido, sabio y protector",
  },
};

// Energía de un ciclo (año, mes o día personal y pináculos). Se antepone "Año de", "Mes de"...
const CYCLES = {
  1: "comienzos: siembra, inicia proyectos y toma la iniciativa.",
  2: "paciencia y alianzas: cultiva las relaciones y deja madurar lo sembrado.",
  3: "expresión: creatividad, vida social y disfrute.",
  4: "trabajo: organiza, consolida y construye bases.",
  5: "cambios: movimiento, viajes y nuevas oportunidades.",
  6: "responsabilidades: hogar, familia y compromisos afectivos.",
  7: "introspección: estudio, descanso y crecimiento interior.",
  8: "cosecha material: logros, finanzas y reconocimiento.",
  9: "cierre: suelta lo que ya no sirve y prepárate para un nuevo ciclo.",
  11: "inspiración (maestro): intuición elevada y revelaciones.",
  22: "realización (maestro): oportunidad de construir algo grande.",
  33: "servicio (maestro): entrega y guía hacia los demás.",
};

const CHALLENGES = {
  0: "El desafío de la elección: tienes todas las opciones y debes aprender a decidir por ti, sin bloquearte.",
  1: "Afirmarte: superar la inseguridad o la tendencia a imponerte y encontrar tu voz sin pisar a nadie.",
  2: "La sensibilidad: no tomarte todo como algo personal ni depender de la aprobación ajena.",
  3: "La expresión: vencer la timidez o la dispersión y comunicar lo que sientes.",
  4: "La disciplina: ni rigidez ni desorden; constancia con flexibilidad.",
  5: "La libertad: evitar excesos e impulsos sin tenerle miedo al cambio.",
  6: "La responsabilidad: no exigir perfección ni cargar con los problemas ajenos.",
  7: "La confianza: salir del aislamiento y confiar en los demás y en la vida.",
  8: "El poder y el dinero: construir una relación sana con el éxito, sin obsesión ni rechazo.",
};

const KARMIC_TEXTS = {
  13: "13/4 · Pereza o atajos en el pasado. Ahora el éxito llega con trabajo constante y ordenado; los atajos no funcionan.",
  14: "14/5 · Abuso de la libertad. La lección es la moderación, el compromiso y la responsabilidad ante el cambio.",
  16: "16/7 · Orgullo y ego. Las caídas del orgullo conducen a la humildad y a un despertar interior.",
  19: "19/1 · Abuso del poder. Aprender a ser independiente sin egoísmo y a aceptar ayuda.",
};

const COMPATIBILITY_TEXTS = {
  natural: "Afinidad natural: una forma parecida de ver la vida hace que la relación fluya con facilidad.",
  compatible: "Compatibles: las diferencias se complementan. Con buena comunicación, se enriquecen mutuamente.",
  desafiante: "Desafiante: energías muy distintas. Puede haber fricción, pero también un gran aprendizaje si hay respeto y paciencia.",
};

const HARMONY_TEXTS = {
  natural: "Tu camino y tus talentos van en la misma dirección: lo que haces bien es justo lo que la vida te pide.",
  compatible: "Tus talentos complementan tu camino: te aportan recursos distintos para avanzar.",
  desafiante: "Tu camino y tus talentos tiran en direcciones distintas: integrarlos es parte de tu crecimiento.",
};

// Guía diaria según el número de día personal.
const DAILY = {
  1: {
    title: "Día de nuevos comienzos",
    suggestions: ["Empieza ese proyecto o tarea que vienes posponiendo", "Toma decisiones y actúa por iniciativa propia", "Preséntate, propón ideas, da el primer paso"],
    expect: "Energía alta y ganas de avanzar. Lo que inicies hoy tiene buen impulso; puede que te toque liderar o resolver algo sin ayuda.",
    cautions: ["Evita la impaciencia y las respuestas bruscas", "No impongas tu criterio sin escuchar", "Cuidado con las decisiones impulsivas de dinero"],
  },
  2: {
    title: "Día de cooperación y paciencia",
    suggestions: ["Colabora, pide opinión y trabaja en equipo", "Cuida a tu pareja y tus vínculos cercanos", "Negocia, media o cierra acuerdos con calma"],
    expect: "Un día más lento y sensible. Los resultados llegan a través de otras personas; es posible que tengas que esperar respuestas.",
    cautions: ["No te tomes los comentarios como algo personal", "Evita forzar las cosas o presionar plazos", "No digas que sí a todo por quedar bien"],
  },
  3: {
    title: "Día de expresión y alegría",
    suggestions: ["Comunica: llama, escribe, publica, presenta", "Dedica tiempo a algo creativo", "Queda con amigos o haz vida social"],
    expect: "Ambiente ligero, optimista y social. Surgen buenas ideas y te resulta fácil conectar con la gente.",
    cautions: ["Cuidado con la dispersión: elige una o dos prioridades", "Evita los chismes y hablar de más", "Controla los gastos por capricho"],
  },
  4: {
    title: "Día de trabajo y orden",
    suggestions: ["Organiza tu agenda, tus papeles o tu casa", "Avanza con constancia en las tareas pendientes", "Revisa presupuestos y asuntos prácticos"],
    expect: "Jornada de esfuerzo y concreción. Puede sentirse rutinaria, pero lo que construyas hoy será sólido.",
    cautions: ["No te frustres si todo va más lento", "Evita la rigidez y la terquedad", "Haz pausas: el cansancio se acumula"],
  },
  5: {
    title: "Día de cambios y movimiento",
    suggestions: ["Sal de la rutina y prueba algo nuevo", "Buen momento para viajes, ventas, promoción y trámites ágiles", "Muévete: haz deporte o sal a caminar"],
    expect: "Imprevistos, noticias y oportunidades inesperadas. Un día dinámico en el que conviene ser flexible.",
    cautions: ["Evita los excesos (comida, alcohol, gastos)", "No firmes compromisos a la ligera", "Atención a la impulsividad al volante y en las discusiones"],
  },
  6: {
    title: "Día de hogar y responsabilidades",
    suggestions: ["Dedica tiempo a la familia y a tu casa", "Ayuda a alguien o cumple un compromiso", "Embellece tu entorno y cuida tu salud"],
    expect: "Los temas afectivos y familiares pasan a primer plano. Es probable que te pidan ayuda o consejo.",
    cautions: ["No cargues con problemas que no son tuyos", "Evita el perfeccionismo y la crítica excesiva", "No descuides tus propias necesidades"],
  },
  7: {
    title: "Día de introspección",
    suggestions: ["Reserva tiempo a solas para pensar o descansar", "Estudia, investiga, lee o medita", "Analiza a fondo antes de decidir"],
    expect: "Energía tranquila y reflexiva. Buen día para comprender; menos favorable para la vida social o los grandes negocios.",
    cautions: ["No tomes decisiones de dinero importantes sin analizarlas", "No te aísles del todo ni desconfíes de todo", "Cuidado con el pesimismo"],
  },
  8: {
    title: "Día de logros y poder personal",
    suggestions: ["Ocúpate de dinero, negocios y carrera", "Pide lo que mereces: un aumento, un acuerdo, un pago", "Toma el mando y actúa con visión"],
    expect: "Buen día para obtener resultados concretos y reconocimiento. La energía favorece la ambición y la eficacia.",
    cautions: ["No te obsesiones con el control ni con el trabajo", "Evita la soberbia y las luchas de poder", "Actúa con ética: lo que das, vuelve"],
  },
  9: {
    title: "Día de cierre y generosidad",
    suggestions: ["Termina tareas y cierra asuntos pendientes", "Ordena, regala o suelta lo que ya no necesitas", "Perdona y ayuda a alguien de forma desinteresada"],
    expect: "Final de un pequeño ciclo. Puede haber emociones a flor de piel y despedidas, pero también una sensación de liberación.",
    cautions: ["Evita empezar proyectos nuevos: mejor mañana", "No te aferres a lo que se está yendo", "Cuidado con la susceptibilidad y el drama"],
  },
  11: {
    title: "Día maestro de intuición",
    suggestions: ["Escucha tu intuición y presta atención a las señales", "Inspira, enseña o comparte una idea", "Medita o dedica tiempo a algo artístico o espiritual"],
    expect: "Sensibilidad elevada, ideas reveladoras y coincidencias significativas. Tus nervios también están más a flor de piel.",
    cautions: ["Evita la sobrecarga: baja el ritmo si sientes ansiedad", "No decidas desde la idealización", "Descansa bien y limita los estímulos"],
  },
  22: {
    title: "Día maestro de realización",
    suggestions: ["Trabaja en tu proyecto más importante", "Planifica a largo plazo y da un paso concreto", "Coopera en algo que beneficie a muchas personas"],
    expect: "Gran potencial para materializar. Lo que hagas hoy puede tener un alcance mayor de lo habitual.",
    cautions: ["No te exijas demasiado ni te paralices por la presión", "Evita querer hacerlo todo tú", "Cuida tu cuerpo: el estrés se nota"],
  },
  33: {
    title: "Día maestro de amor y servicio",
    suggestions: ["Acompaña, cuida o enseña a alguien", "Expresa tu cariño sin reservas", "Haz algo por tu comunidad"],
    expect: "Energía compasiva y sanadora. Las personas acuden a ti en busca de apoyo.",
    cautions: ["No te sacrifiques hasta agotarte", "Evita sentirte responsable de todos", "Deja que también te cuiden"],
  },
};

// Guía anual según el número de año personal (ciclo de 9 años).
const YEARLY = {
  1: {
    title: "Año de nuevos comienzos", key: "Empieza",
    suggestions: ["Lanza el proyecto, negocio o cambio que llevas tiempo pensando", "Define metas claras para los próximos nueve años", "Apuesta por ti: formación, imagen, independencia"],
    expect: "Arranca un nuevo ciclo de nueve años. Lo que siembres ahora marcará toda la etapa que viene. Habrá energía y oportunidades, y la necesidad de tomar la iniciativa, a veces en solitario.",
    cautions: ["No esperes a que otros decidan por ti", "Evita la impaciencia: las semillas tardan en brotar", "Cuidado con el exceso de independencia en la pareja"],
  },
  2: {
    title: "Año de paciencia y alianzas", key: "Espera y une",
    suggestions: ["Cultiva tus relaciones: pareja, socios, amistades", "Colabora en lugar de competir", "Cuida los detalles y deja madurar lo que sembraste el año pasado"],
    expect: "Un año más lento y emocional, de gestación. Los avances llegan a través de acuerdos y de otras personas. Favorable para el amor y las asociaciones.",
    cautions: ["No fuerces resultados ni te desesperes por la lentitud", "Evita la dependencia emocional y la indecisión", "No te guardes los conflictos: habla con tacto"],
  },
  3: {
    title: "Año de expresión y creatividad", key: "Exprésate",
    suggestions: ["Exprésate: escribe, crea, comunica, muéstrate", "Amplía tu vida social y tu red de contactos", "Disfruta: viajes cortos, ocio, celebraciones"],
    expect: "Un año luminoso, social y optimista. Lo sembrado empieza a dar sus primeros frutos y tienes ganas de compartir. Muy favorable para los proyectos creativos.",
    cautions: ["Cuidado con la dispersión y los gastos superfluos", "Evita prometer más de lo que puedes cumplir", "Atención a los chismes y los malentendidos"],
  },
  4: {
    title: "Año de trabajo y cimientos", key: "Construye",
    suggestions: ["Ordena tus finanzas, tu casa y tu salud", "Trabaja con constancia en tus metas a largo plazo", "Formaliza: contratos, estudios, estructuras"],
    expect: "Un año de esfuerzo y disciplina. Puede sentirse exigente o rutinario, pero lo que construyas ahora será la base sólida de los próximos años.",
    cautions: ["No te rindas ante la lentitud o los obstáculos", "Evita la rigidez y el exceso de trabajo", "Cuida la salud: descanso, espalda, estrés"],
  },
  5: {
    title: "Año de cambios y libertad", key: "Cambia",
    suggestions: ["Abre la puerta al cambio: mudanzas, viajes, un trabajo nuevo", "Aprende algo distinto y amplía horizontes", "Renueva tu imagen y tu rutina"],
    expect: "El año más dinámico del ciclo. Llegan cambios, imprevistos y oportunidades. Estás en el punto medio del ciclo: es momento de soltar lo que te ata y avanzar.",
    cautions: ["Evita los excesos y las decisiones impulsivas", "No lo abandones todo de golpe: cambia con criterio", "Cuidado con los compromisos tomados a la ligera"],
  },
  6: {
    title: "Año de hogar y responsabilidades", key: "Cuida",
    suggestions: ["Dedica tiempo a la familia, la pareja y el hogar", "Asume compromisos: convivencia, boda, hijos, cuidado de otros", "Embellece tu casa y cuida tu salud"],
    expect: "Un año centrado en el amor y los vínculos. Pueden llegar compromisos afectivos, cambios en casa o responsabilidades hacia otras personas. Favorable para la armonía familiar.",
    cautions: ["No cargues con los problemas de todos", "Evita el perfeccionismo y el control", "No te olvides de ti mientras cuidas a los demás"],
  },
  7: {
    title: "Año de introspección y aprendizaje", key: "Reflexiona",
    suggestions: ["Estudia, investiga, especialízate", "Reserva tiempo a solas: descanso, meditación, naturaleza", "Revisa tu vida y lo que de verdad quieres"],
    expect: "Un año de pausa y crecimiento interior. Lo exterior avanza más despacio y la energía se vuelve hacia dentro. Ideal para estudiar, reflexionar y reencontrarte.",
    cautions: ["Evita grandes inversiones o decisiones apresuradas", "No te aísles ni caigas en el pesimismo", "Cuida tu salud mental y tu descanso"],
  },
  8: {
    title: "Año de cosecha y poder", key: "Cosecha",
    suggestions: ["Impulsa tu carrera, tus negocios y tus finanzas", "Pide reconocimiento: ascensos, aumentos, acuerdos", "Invierte con visión"],
    expect: "Un año de resultados materiales. El esfuerzo de los años anteriores puede traducirse en dinero, reconocimiento y autoridad. Lo que das, vuelve.",
    cautions: ["No descuides a tu familia por el trabajo", "Evita el autoritarismo y las luchas de poder", "Actúa con ética en los asuntos de dinero"],
  },
  9: {
    title: "Año de cierre y liberación", key: "Suelta",
    suggestions: ["Termina lo pendiente y cierra etapas", "Suelta relaciones, objetos y hábitos que ya no te sirven", "Ayuda y comparte: es un año de generosidad"],
    expect: "El último año del ciclo de nueve. Es tiempo de balance, finales y limpieza. Puede haber despedidas, pero dejan espacio para el nuevo comienzo que llega el año próximo.",
    cautions: ["Evita empezar proyectos grandes: espera a tu año 1", "No te aferres a lo que se termina", "Cuida tus emociones: nostalgia y susceptibilidad"],
  },
  11: {
    title: "Año maestro de inspiración", key: "Confía",
    suggestions: ["Escucha tu intuición y sigue tus inspiraciones", "Desarrolla tu lado espiritual o artístico", "Comparte tu visión: enseña, guía, inspira"],
    expect: "Un año 2 elevado: además de paciencia y alianzas, trae revelaciones, una sensibilidad mayor y la posibilidad de un despertar personal.",
    cautions: ["Controla la ansiedad y la tensión nerviosa", "No idealices a las personas ni las situaciones", "Prioriza el descanso y la calma"],
  },
  22: {
    title: "Año maestro de realización", key: "Materializa",
    suggestions: ["Trabaja en tu gran proyecto de vida", "Planifica a largo plazo y da pasos concretos", "Busca alianzas para lograr algo de mayor alcance"],
    expect: "Un año 4 elevado: además de trabajo y cimientos, ofrece la posibilidad de construir algo grande y duradero, con impacto más allá de ti.",
    cautions: ["No te exijas hasta agotarte", "Evita querer controlarlo todo", "Divide la gran meta en pasos pequeños"],
  },
  33: {
    title: "Año maestro de amor y servicio", key: "Ama",
    suggestions: ["Pon tu talento al servicio de los demás", "Enseña, sana, acompaña", "Fortalece los lazos familiares"],
    expect: "Un año 6 elevado: el amor, la familia y el servicio pasan al centro, con la oportunidad de ayudar y sanar de forma profunda.",
    cautions: ["No te sacrifiques en exceso", "Evita sentirte responsable de todos", "Pide ayuda tú también"],
  },
};

// Arcano mayor asociado a cada número (numeración Rider-Waite) y su símbolo astrológico tradicional.
const ARCANA = {
  1: { numeral: "I", name: "El Mago", glyph: "☿" },
  2: { numeral: "II", name: "La Sacerdotisa", glyph: "☽" },
  3: { numeral: "III", name: "La Emperatriz", glyph: "♀" },
  4: { numeral: "IV", name: "El Emperador", glyph: "♈" },
  5: { numeral: "V", name: "El Hierofante", glyph: "♉" },
  6: { numeral: "VI", name: "Los Enamorados", glyph: "♊" },
  7: { numeral: "VII", name: "El Carro", glyph: "♋" },
  8: { numeral: "VIII", name: "La Fuerza", glyph: "♌" },
  9: { numeral: "IX", name: "El Ermitaño", glyph: "♍" },
  11: { numeral: "XI", name: "La Justicia", glyph: "♎" },
  22: { numeral: "0", name: "El Loco", glyph: "✶" },
  33: { numeral: "VI", name: "Los Enamorados", glyph: "♊", note: "El 33 no tiene arcano propio; se asocia a Los Enamorados (3 + 3 = 6)." },
};

// Tabla de expresión: campos profesionales según el número de Expresión (total del nombre).
const CAREERS = {
  1: {
    summary: "Liderazgo, iniciativa e independencia. Rindes mejor donde puedes dirigir, innovar o trabajar por tu cuenta.",
    areas: [
      ["Negocios y dirección", ["Emprendedor/a", "Gerente", "Dirección de proyectos", "Consultoría independiente"]],
      ["Innovación y tecnología", ["Ingeniería", "Diseño de producto", "Invención", "Desarrollo de software"]],
      ["Acción y riesgo", ["Piloto", "Deporte profesional", "Fuerzas armadas", "Ventas"]],
    ],
  },
  2: {
    summary: "Sensibilidad, tacto y cooperación. Destacas acompañando, mediando y trabajando en equipo.",
    areas: [
      ["Cuidado y bienestar", ["Psicología", "Terapia", "Enfermería", "Trabajo social"]],
      ["Mediación y apoyo", ["Diplomacia", "Recursos humanos", "Asistencia de dirección", "Conciliación"]],
      ["Arte sensible", ["Música", "Danza", "Fotografía", "Diseño"]],
    ],
  },
  3: {
    summary: "Expresión, creatividad y carisma. Brillas comunicando, creando y conectando con el público.",
    areas: [
      ["Comunicación", ["Periodismo", "Locución", "Publicidad", "Redes sociales"]],
      ["Arte y espectáculo", ["Actuación", "Música", "Escritura", "Diseño gráfico"]],
      ["Enseñanza y relaciones", ["Docencia", "Relaciones públicas", "Ventas", "Turismo"]],
    ],
  },
  4: {
    summary: "Orden, método y constancia. Eres ideal para construir, organizar y trabajar con precisión.",
    areas: [
      ["Ingeniería y construcción", ["Ingeniería civil", "Arquitectura", "Construcción", "Mecánica"]],
      ["Números y gestión", ["Contaduría", "Finanzas", "Administración", "Logística"]],
      ["Precisión", ["Programación", "Análisis de datos", "Odontología", "Artesanía"]],
    ],
  },
  5: {
    summary: "Versatilidad, movimiento y curiosidad. Necesitas variedad, viajes y trato con la gente.",
    areas: [
      ["Viajes y movimiento", ["Turismo", "Aviación", "Comercio exterior", "Guía"]],
      ["Comunicación y ventas", ["Marketing", "Ventas", "Periodismo", "Publicidad"]],
      ["Libertad", ["Emprendimiento", "Trabajo independiente", "Fotografía", "Deportes de aventura"]],
    ],
  },
  6: {
    summary: "Responsabilidad, servicio y sentido estético. Te realizas cuidando, enseñando y embelleciendo.",
    areas: [
      ["Salud y cuidado", ["Medicina", "Enfermería", "Nutrición", "Veterinaria"]],
      ["Educación y servicio", ["Docencia", "Trabajo social", "Orientación", "Psicología"]],
      ["Belleza y hogar", ["Diseño de interiores", "Moda", "Estética", "Gastronomía"]],
    ],
  },
  7: {
    summary: "Análisis, profundidad e intuición. Te va bien donde se investiga, se piensa y se especializa.",
    areas: [
      ["Ciencia e investigación", ["Investigación científica", "Medicina", "Química", "Biología"]],
      ["Tecnología y análisis", ["Ingeniería de sistemas", "Ciencia de datos", "Matemáticas", "Ciberseguridad"]],
      ["Pensamiento y espíritu", ["Filosofía", "Psicología", "Escritura", "Espiritualidad"]],
    ],
  },
  8: {
    summary: "Visión, autoridad y capacidad de gestión. Estás hecho para dirigir recursos, empresas y grandes metas.",
    areas: [
      ["Negocios y finanzas", ["Dirección de empresas", "Banca", "Inversiones", "Finca raíz"]],
      ["Ley y poder", ["Derecho", "Política", "Administración pública", "Auditoría"]],
      ["Gran escala", ["Ingeniería industrial", "Gerencia de proyectos", "Comercio", "Emprendimiento"]],
    ],
  },
  9: {
    summary: "Compasión, idealismo y visión amplia. Te realizas sirviendo a los demás y a causas mayores.",
    areas: [
      ["Servicio humanitario", ["ONG", "Medicina", "Trabajo social", "Cooperación internacional"]],
      ["Arte y cultura", ["Artes plásticas", "Cine", "Literatura", "Música"]],
      ["Enseñanza y sanación", ["Docencia", "Terapias", "Psicología", "Derechos humanos"]],
    ],
  },
  11: {
    summary: "Inspiración, intuición y sensibilidad elevada. Tu campo es guiar, enseñar e inspirar a otros.",
    areas: [
      ["Inspiración", ["Docencia", "Conferencias", "Coaching", "Orientación espiritual"]],
      ["Arte visionario", ["Música", "Artes plásticas", "Cine", "Poesía"]],
      ["Ayuda", ["Psicología", "Terapias", "Medicina integrativa", "Diplomacia"]],
    ],
  },
  22: {
    summary: "El Maestro Constructor: une visión y pragmatismo para levantar obras que benefician a muchos.",
    areas: [
      ["Grandes obras", ["Arquitectura", "Ingeniería civil", "Urbanismo", "Dirección de megaproyectos"]],
      ["Organización", ["Política", "Diplomacia", "Organismos internacionales", "Gerencia"]],
      ["Visión", ["Emprendimiento a gran escala", "Planeación", "Investigación aplicada", "Fundaciones"]],
    ],
  },
  33: {
    summary: "El Maestro Sanador: tu vocación es sanar, enseñar y servir con amor.",
    areas: [
      ["Sanación", ["Medicina", "Terapias", "Enfermería", "Psicología"]],
      ["Enseñanza", ["Docencia", "Pedagogía", "Orientación", "Formación espiritual"]],
      ["Servicio", ["Trabajo humanitario", "Arte con mensaje", "ONG", "Cuidado de la infancia"]],
    ],
  },
};

// Biorritmo: qué representa cada ciclo y cómo leer su estado del día.
const BIORHYTHM = {
  physical: {
    label: "Físico",
    about: "Energía, fuerza, resistencia y coordinación.",
    states: {
      alto: "Energía a tope: buen día para entrenar, hacer esfuerzos físicos y tareas exigentes.",
      positivo: "Buena energía física; mantén tu ritmo.",
      negativo: "Energía más baja: dosifica el esfuerzo y descansa bien.",
      bajo: "Fase de recarga: evita los sobreesfuerzos y prioriza el descanso.",
      critico: "Día crítico físico: más tendencia al cansancio y a los descuidos; ve con calma.",
    },
  },
  emotional: {
    label: "Emocional",
    about: "Estado de ánimo, sensibilidad y creatividad.",
    states: {
      alto: "Ánimo alto y receptivo: ideal para las relaciones, la creatividad y las conversaciones importantes.",
      positivo: "Buen equilibrio emocional.",
      negativo: "Más sensibilidad: tómate las cosas con calma y no reacciones en caliente.",
      bajo: "Ánimo bajo: cuida tu entorno y rodéate de gente que te haga bien.",
      critico: "Día crítico emocional: emociones inestables; evita discusiones y decisiones afectivas.",
    },
  },
  intellectual: {
    label: "Intelectual",
    about: "Concentración, memoria y razonamiento.",
    states: {
      alto: "Mente clara: buen día para estudiar, planear y resolver problemas.",
      positivo: "Buena capacidad de concentración.",
      negativo: "Concentración más baja: repasa en lugar de aprender cosas nuevas.",
      bajo: "Mente cansada: evita las decisiones complejas y revisa dos veces lo importante.",
      critico: "Día crítico intelectual: más distracciones; no firmes ni decidas nada importante.",
    },
  },
};
