/**
 * data.js — Contenido clínico educativo de la app "¿Es una urgencia?"
 *
 * FUENTES:
 * - Niveles de urgencia y signos de alarma: criterios generales de triaje y
 *   educación en salud (orientativos, NO diagnósticos).
 * - Causas de mortalidad: DANE, Estadísticas Vitales (reportes 2024–2025).
 * - Línea de emergencias: 123, Número Único Nacional de Seguridad y Emergencias.
 *
 * AVISO: Este contenido es EDUCATIVO. No reemplaza la valoración de un
 * profesional de salud. Ante una emergencia real, llame al 123.
 */

/* Niveles de orientación que puede devolver la app */
const NIVELES = {
  EMERGENCIA: {
    id: 'emergencia',
    titulo: 'Emergencia — llame al 123 ya',
    color: '#c0392b',
    mensaje:
      'Estos signos pueden poner en riesgo la vida. No conduzca usted mismo si puede evitarlo. Llame al 123 o vaya de inmediato al servicio de urgencias más cercano.',
  },
  URGENCIA: {
    id: 'urgencia',
    titulo: 'Acuda pronto a urgencias',
    color: '#e67e22',
    mensaje:
      'Conviene que lo valore un profesional hoy mismo en un servicio de urgencias. No espere a que empeore.',
  },
  CONSULTA: {
    id: 'consulta',
    titulo: 'Consulta prioritaria / especialista',
    color: '#2980b9',
    mensaje:
      'Probablemente no es una emergencia vital, pero debe ser valorado pronto. Pida cita prioritaria o acuda a la especialidad indicada. Si empeora o aparecen signos de alarma, vaya a urgencias.',
  },
  AUTOCUIDADO: {
    id: 'autocuidado',
    titulo: 'Observación y autocuidado',
    color: '#27ae60',
    mensaje:
      'Suele poder manejarse con observación y cuidados en casa. Si no mejora en el tiempo esperado o aparecen signos de alarma, consulte.',
  },
};

/**
 * El "ABC" de la valoración inicial de urgencias.
 * A = Airway (vía aérea), B = Breathing (respiración), C = Circulation (circulación).
 * Es la base para reconocer una situación que amenaza la vida.
 */
const ABC = [
  {
    letra: 'A',
    nombre: 'Vía aérea (Airway)',
    pregunta: '¿La persona puede hablar o respirar sin obstrucción?',
    alarma: [
      'No puede hablar, toser ni respirar (posible atragantamiento)',
      'Se lleva las manos al cuello / se pone morada (cianosis) en labios o cara',
      'Ruido agudo al inspirar (estridor) o babeo con imposibilidad de tragar',
    ],
    accion: 'Signo de EMERGENCIA. Llame al 123. Si hay atragantamiento y la persona no puede toser, aplique maniobras de desobstrucción si sabe hacerlas.',
  },
  {
    letra: 'B',
    nombre: 'Respiración (Breathing)',
    pregunta: '¿Respira con normalidad?',
    alarma: [
      'Dificultad para respirar en reposo o al hablar',
      'Respiración muy rápida, muy lenta o pausas',
      'Labios o uñas azulados, hundimiento de las costillas al respirar (en niños)',
    ],
    accion: 'Signo de EMERGENCIA. Llame al 123. Mantenga a la persona sentada y calmada.',
  },
  {
    letra: 'C',
    nombre: 'Circulación (Circulation)',
    pregunta: '¿Hay pulso y buena circulación?',
    alarma: [
      'No responde y no respira: inicie RCP y llame al 123',
      'Sangrado abundante que no se detiene',
      'Piel fría, pálida o sudorosa, pulso muy débil o muy rápido',
      'Dolor en el pecho con sudoración, náuseas o dolor que irradia al brazo/mandíbula',
    ],
    accion: 'Signo de EMERGENCIA. Llame al 123. Controle el sangrado con presión directa. Si no respira, inicie RCP.',
  },
];

/**
 * 10 principales causas de mortalidad en Colombia (DANE, Estadísticas Vitales 2024–2025).
 * Para cada una: qué es (lenguaje sencillo) y SIGNOS DE ALARMA para reconocerla a tiempo.
 * Las causas externas (p. ej. agresiones) se incluyen como contexto, no como autodiagnóstico.
 */
const CAUSAS_MORTALIDAD = [
  {
    puesto: 1,
    nombre: 'Enfermedad isquémica del corazón (infarto)',
    quees: 'Bloqueo del flujo de sangre al corazón. Incluye el infarto agudo de miocardio.',
    alarma: [
      'Dolor u opresión en el pecho que dura más de unos minutos',
      'Dolor que se corre al brazo (sobre todo izquierdo), mandíbula, cuello o espalda',
      'Sudoración fría, náuseas, falta de aire, sensación de muerte inminente',
    ],
    nivel: NIVELES.EMERGENCIA,
    especialidad: 'Cardiología',
  },
  {
    puesto: 2,
    nombre: 'Enfermedad cerebrovascular (ACV / derrame)',
    quees: 'Interrupción del flujo de sangre al cerebro (isquémico) o sangrado (hemorrágico).',
    alarma: [
      'Cara torcida / boca desviada de un lado (pídale sonreír)',
      'Debilidad o adormecimiento de un brazo o una pierna',
      'Dificultad para hablar o entender, habla enredada',
      'Pérdida súbita de visión, mareo intenso o dolor de cabeza repentino y fuerte',
    ],
    nivel: NIVELES.EMERGENCIA,
    especialidad: 'Neurología',
    nota: 'Regla CARA–BRAZO–HABLA–TIEMPO: el tiempo es cerebro. Llame al 123 de inmediato.',
  },
  {
    puesto: 3,
    nombre: 'Enfermedad crónica de las vías respiratorias (EPOC)',
    quees: 'Daño crónico de los pulmones (frecuente en fumadores), que puede descompensarse.',
    alarma: [
      'Falta de aire que empeora de forma marcada',
      'Labios o uñas azulados',
      'Confusión o somnolencia por falta de oxígeno',
      'Fiebre con aumento y cambio de color de las flemas',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Neumología',
  },
  {
    puesto: 4,
    nombre: 'Agresiones / causas externas',
    quees: 'Lesiones por violencia o trauma. Es una de las primeras causas de muerte en Colombia (DANE).',
    alarma: [
      'Heridas con sangrado abundante',
      'Traumatismo de cabeza con pérdida de conocimiento, vómito o confusión',
      'Dificultad para respirar o dolor intenso tras un golpe',
    ],
    nivel: NIVELES.EMERGENCIA,
    especialidad: 'Urgencias / Cirugía',
    nota: 'Contexto incluido con fines educativos. Ante violencia, además del 123, existen líneas de protección.',
  },
  {
    puesto: 5,
    nombre: 'Diabetes mellitus',
    quees: 'Alteración del azúcar en la sangre. Puede descompensarse hacia valores muy altos o muy bajos.',
    alarma: [
      'Azúcar muy baja: temblor, sudor frío, confusión, pérdida de conocimiento',
      'Azúcar muy alta: sed intensa, orinar mucho, aliento afrutado, respiración rápida',
      'Vómito persistente, somnolencia o desorientación en persona diabética',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Medicina interna / Endocrinología',
  },
  {
    puesto: 6,
    nombre: 'Enfermedades hipertensivas',
    quees: 'Complicaciones por presión arterial alta no controlada.',
    alarma: [
      'Dolor de cabeza intenso con visión borrosa',
      'Dolor en el pecho o falta de aire',
      'Presión muy alta con síntomas neurológicos (confusión, debilidad)',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Medicina interna / Cardiología',
  },
  {
    puesto: 7,
    nombre: 'Infecciones respiratorias agudas (neumonía)',
    quees: 'Infección de los pulmones o vías respiratorias.',
    alarma: [
      'Fiebre alta con dificultad para respirar',
      'Dolor en el pecho al respirar',
      'En adultos mayores o niños: respiración rápida, decaimiento marcado',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Medicina general / Neumología',
  },
  {
    puesto: 8,
    nombre: 'Tumores malignos (cáncer)',
    quees: 'Crecimiento anormal de células. Entre los más frecuentes: pulmón, estómago, mama, colon.',
    alarma: [
      'Sangrado inexplicable (al toser, en heces u orina)',
      'Pérdida de peso importante sin causa',
      'Masa o bulto que crece, dolor persistente que no cede',
    ],
    nivel: NIVELES.CONSULTA,
    especialidad: 'Oncología (valoración prioritaria)',
    nota: 'La mayoría no son urgencias del momento, pero requieren estudio pronto. Algunas complicaciones (sangrado, obstrucción) sí son urgencia.',
  },
  {
    puesto: 9,
    nombre: 'Enfermedades del sistema urinario',
    quees: 'Incluye infecciones urinarias complicadas y falla renal.',
    alarma: [
      'Fiebre con dolor intenso en la espalda baja o costado',
      'No poder orinar o dolor fuerte al orinar con fiebre',
      'Hinchazón, confusión o disminución importante de la orina',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Urología / Nefrología',
  },
  {
    puesto: 10,
    nombre: 'Enfermedades del aparato digestivo',
    quees: 'Incluye cirrosis, sangrado digestivo y otras enfermedades del hígado e intestino.',
    alarma: [
      'Vómito con sangre o heces negras',
      'Dolor abdominal intenso que no cede',
      'Piel u ojos amarillos (ictericia) con dolor y fiebre',
    ],
    nivel: NIVELES.URGENCIA,
    especialidad: 'Gastroenterología / Cirugía',
  },
];

/**
 * BUSCADOR DE SÍNTOMAS.
 * Cada entrada: palabras clave (para buscar "me duele el ojo"), a dónde ir,
 * especialidad y signos de alarma que elevan el nivel a urgencia/emergencia.
 */
const SINTOMAS = [
  {
    nombre: 'Dolor en el pecho',
    claves: ['pecho', 'corazon', 'infarto', 'opresion', 'dolor en el pecho'],
    nivel: NIVELES.EMERGENCIA,
    adonde: 'Urgencias de inmediato / llame al 123',
    especialidad: 'Cardiología',
    especialidadesRequeridas: ['Medicina interna', 'Urgencias adultos'],
    alarma: ['Dolor que irradia al brazo o mandíbula', 'Sudoración, náuseas, falta de aire'],
  },
  {
    nombre: 'Dificultad para respirar',
    claves: ['respirar', 'ahogo', 'falta de aire', 'asfixia', 'no puedo respirar'],
    nivel: NIVELES.EMERGENCIA,
    adonde: 'Urgencias de inmediato / llame al 123',
    especialidad: 'Neumología / Urgencias',
    especialidadesRequeridas: ['Urgencias adultos', 'Medicina interna'],
    alarma: ['Labios azulados', 'No puede completar frases por la falta de aire'],
  },
  {
    nombre: 'Me fracturé / hueso roto',
    claves: ['fractura', 'fracture', 'hueso', 'quebre', 'me quebre', 'roto', 'luxacion', 'esguince'],
    nivel: NIVELES.URGENCIA,
    adonde: 'Urgencias con ortopedia',
    especialidad: 'Ortopedia / Traumatología',
    especialidadesRequeridas: ['Ortopedia y traumatología', 'Cirugía general', 'Anestesiología'],
    alarma: [
      'Hueso expuesto o deformidad evidente → EMERGENCIA',
      'Pérdida de sensibilidad, miembro frío o pálido → EMERGENCIA',
      'Sangrado abundante asociado → EMERGENCIA',
    ],
  },
  {
    nombre: 'Dolor / lesión en manos o brazos',
    claves: ['mano', 'manos', 'brazo', 'brazos', 'muneca', 'dedo', 'dedos', 'codo'],
    nivel: NIVELES.URGENCIA,
    adonde: 'Urgencias con ortopedia',
    especialidad: 'Ortopedia / Traumatología',
    especialidadesRequeridas: ['Ortopedia y traumatología', 'Cirugía general'],
    alarma: [
      'Deformidad, no poder mover la mano/brazo → URGENCIA',
      'Herida profunda o amputación → EMERGENCIA (lleve la parte amputada en frío)',
      'Mano fría, pálida o sin sensibilidad → EMERGENCIA',
    ],
  },
  {
    nombre: 'Dolor de ojo / problema de visión',
    claves: ['ojo', 'ojos', 'vista', 'vision', 'ver', 'me duele el ojo'],
    nivel: NIVELES.CONSULTA,
    adonde: 'Consulta / urgencia oftalmológica según gravedad',
    especialidad: 'Oftalmología',
    especialidadesRequeridas: ['Oftalmología'],
    alarma: [
      'Pérdida súbita de visión → URGENCIA',
      'Trauma del ojo o químico en el ojo → URGENCIA (lave con agua y acuda)',
      'Dolor intenso con ojo rojo y visión borrosa → URGENCIA',
    ],
  },
  {
    nombre: 'Dolor de cabeza',
    claves: ['cabeza', 'cefalea', 'migrana', 'jaqueca', 'me duele la cabeza'],
    nivel: NIVELES.CONSULTA,
    adonde: 'Consulta médica; urgencias si hay signos de alarma',
    especialidad: 'Neurología',
    especialidadesRequeridas: ['Neurología', 'Urgencias adultos'],
    alarma: [
      'El peor dolor de cabeza de su vida, de inicio súbito → EMERGENCIA',
      'Con fiebre y rigidez de cuello → URGENCIA',
      'Con debilidad, visión doble o confusión → EMERGENCIA',
    ],
  },
  {
    nombre: 'Dolor abdominal',
    claves: ['abdomen', 'barriga', 'estomago', 'panza', 'vientre', 'me duele el estomago'],
    nivel: NIVELES.CONSULTA,
    adonde: 'Consulta; urgencias si el dolor es intenso o persistente',
    especialidad: 'Medicina general / Cirugía',
    especialidadesRequeridas: ['Cirugía general', 'Medicina interna'],
    alarma: [
      'Dolor intenso y continuo, abdomen duro → URGENCIA',
      'Vómito con sangre o heces negras → URGENCIA',
      'Dolor en parte baja derecha con fiebre (posible apendicitis) → URGENCIA',
    ],
  },
  {
    nombre: 'Fiebre',
    claves: ['fiebre', 'calentura', 'temperatura', 'febril'],
    nivel: NIVELES.AUTOCUIDADO,
    adonde: 'Autocuidado; consulta si persiste o hay signos de alarma',
    especialidad: 'Medicina general',
    especialidadesRequeridas: ['Medicina general', 'Medicina interna'],
    alarma: [
      'Fiebre con dificultad para respirar o confusión → URGENCIA',
      'Bebé menor de 3 meses con fiebre → URGENCIA',
      'Fiebre con manchas en la piel que no desaparecen al presionar → EMERGENCIA',
    ],
  },
  {
    nombre: 'Dolor de muela / boca',
    claves: ['muela', 'diente', 'dientes', 'boca', 'encia', 'odontologia'],
    nivel: NIVELES.CONSULTA,
    adonde: 'Consulta odontológica',
    especialidad: 'Odontología',
    especialidadesRequeridas: ['Cirugía maxilofacial / reconstructiva', 'Urgencias adultos'],
    alarma: ['Hinchazón de cara/cuello con fiebre y dificultad para tragar o respirar → URGENCIA'],
  },
  {
    nombre: 'Dolor de oído',
    claves: ['oido', 'oreja', 'otitis', 'me duele el oido'],
    nivel: NIVELES.CONSULTA,
    adonde: 'Consulta médica',
    especialidad: 'Otorrinolaringología',
    especialidadesRequeridas: ['Urgencias adultos', 'Medicina general'],
    alarma: ['Dolor intenso con fiebre alta, hinchazón detrás de la oreja → URGENCIA'],
  },
  {
    nombre: 'Golpe en la cabeza (trauma)',
    claves: ['golpe', 'trauma', 'cabeza golpe', 'caida', 'accidente'],
    nivel: NIVELES.URGENCIA,
    adonde: 'Urgencias',
    especialidad: 'Urgencias / Neurocirugía',
    especialidadesRequeridas: ['Neurocirugía', 'Urgencias adultos'],
    alarma: [
      'Pérdida de conocimiento, vómito o confusión → EMERGENCIA',
      'Salida de líquido o sangre por nariz/oídos → EMERGENCIA',
    ],
  },
  {
    nombre: 'Síntomas en el embarazo',
    claves: ['embarazo', 'embarazada', 'gestacion', 'bebe', 'parto'],
    nivel: NIVELES.URGENCIA,
    adonde: 'Urgencias de ginecobstetricia',
    especialidad: 'Ginecobstetricia',
    especialidadesRequeridas: ['Urgencias gineco-obstétricas', 'Ginecología y obstetricia'],
    alarma: [
      'Sangrado vaginal abundante → URGENCIA',
      'Dolor de cabeza fuerte, visión borrosa o hinchazón súbita → URGENCIA (preeclampsia)',
      'Disminución de movimientos del bebé → URGENCIA',
    ],
  },
];

/* Especialidades: cuándo acudir a cada una */
const ESPECIALIDADES = [
  { nombre: 'Cardiología', motivo: 'Dolor de pecho, palpitaciones, presión alta descontrolada, falta de aire al esfuerzo.' },
  { nombre: 'Neurología', motivo: 'Signos de ACV, convulsiones, dolor de cabeza con alarma, debilidad o adormecimiento.' },
  { nombre: 'Neumología', motivo: 'Dificultad para respirar, EPOC descompensada, asma severa.' },
  { nombre: 'Ginecobstetricia', motivo: 'Urgencias del embarazo, sangrado vaginal abundante, dolor pélvico intenso.' },
  { nombre: 'Pediatría', motivo: 'Niños con fiebre y mal estado, dificultad para respirar, deshidratación.' },
  { nombre: 'Oftalmología', motivo: 'Pérdida de visión, trauma o químico en el ojo, ojo rojo doloroso.' },
  { nombre: 'Otorrinolaringología', motivo: 'Oído, nariz y garganta: dolor intenso, sangrado nasal que no cede, cuerpos extraños.' },
  { nombre: 'Gastroenterología', motivo: 'Sangrado digestivo, dolor abdominal persistente, enfermedad del hígado.' },
  { nombre: 'Urología / Nefrología', motivo: 'Infección urinaria complicada, no poder orinar, cólico renal, falla renal.' },
  { nombre: 'Ortopedia / Traumatología', motivo: 'Fracturas, luxaciones, trauma de extremidades.' },
];

/* Línea de emergencias de Colombia */
const EMERGENCIA_TEL = '123';
