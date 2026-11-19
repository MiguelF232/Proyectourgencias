/**
 * hospitales.js — Red pública de la SUBRED INTEGRADA DE SERVICIOS DE SALUD NORTE E.S.E. (Bogotá)
 *
 * Localidades cubiertas con sede de urgencias: Usaquén, Chapinero, Suba, Engativá, Barrios Unidos.
 * (Teusaquillo queda fuera por tener solo sede administrativa — ver REGLA DE INCLUSIÓN.)
 *
 * FUENTES (consultadas 2025–2026):
 * - Subred Norte E.S.E. — subrednorte.gov.co (directorio, portafolio, call center 601 4431790).
 * - Alcaldía de Bogotá — bogota.gov.co (niveles de complejidad, servicios y especialidades).
 * - Capital Salud EPS — capitalsalud.gov.co (red de urgencias zona norte).
 *
 * ⚠️ VERACIDAD DE LAS ESPECIALIDADES:
 * El listado de "especialidades" por sede se basa en notas de prensa y comunicados oficiales,
 * NO en el portafolio detallado (PDF no accesible automáticamente). Cada sede trae
 * "datosVerificados": true/false. Donde es false, CONFIRME en subrednorte.gov.co o al 601 4431790
 * antes de usar con pacientes reales. Ante emergencia, llame al 123.
 *
 * Campos:
 * - urgencias24h: boolean — si tiene servicio de urgencias 24 horas.
 * - horarioUrgencias: texto del horario del servicio de urgencias.
 * - especialidades: array de especialidades de urgencia disponibles (orientativo).
 */

const SUBRED = {
  nombre: 'Subred Integrada de Servicios de Salud Norte E.S.E.',
  callcenter: '601 4431790',
  web: 'https://www.subrednorte.gov.co',
  localidades: ['Usaquén', 'Chapinero', 'Suba', 'Engativá', 'Barrios Unidos'],
};

const HOSPITALES = [
  {
    id: 'simon-bolivar',
    nombre: 'Hospital Simón Bolívar',
    localidad: 'Usaquén',
    nivel: 'III',
    nivelTexto: 'Nivel III — alta complejidad',
    direccion: 'Calle 165 # 7-06',
    urgencias24h: true,
    horarioUrgencias: 'Urgencias 24 horas, todos los días',
    especialidades: [
      'Urgencias adultos',
      'Medicina interna',
      'Cirugía general',
      'Ortopedia y traumatología',
      'Neurocirugía',
      'Neurología',
      'Anestesiología',
      'Cirugía maxilofacial / reconstructiva',
      'Unidad de quemados (referencia nacional)',
      'UCI (incluida UCI neurológica)',
    ],
    datosVerificados: true,
    tel: '601 4431790',
    maps: 'https://www.google.com/maps/search/?api=1&query=Hospital+Sim%C3%B3n+Bol%C3%ADvar+Bogot%C3%A1',
    nota: 'Mayor complejidad de la Subred Norte. Recibe urgencias graves (trauma, quemados, neuro) de toda la zona.',
  },
  {
    id: 'engativa',
    nombre: 'Hospital de Engativá',
    localidad: 'Engativá',
    nivel: 'II',
    nivelTexto: 'Nivel II — mediana complejidad',
    direccion: 'Transversal 100A # 80A-50',
    urgencias24h: true,
    horarioUrgencias: 'Urgencias 24 horas (adultos y pediátricas)',
    // Confirmadas: fuentes oficiales + confirmación del equipo (cirugía general).
    especialidades: [
      'Urgencias adultos',
      'Urgencias pediátricas',
      'Pediatría',
      'Medicina interna',
      'Cirugía general',
      'Hospitalización',
      'UCI',
    ],
    // Por confirmar para el Hospital de Engativá (aparecen en CAPS de la zona, no verificadas en el hospital).
    especialidadesPorConfirmar: [
      'Ortopedia y traumatología',
      'Ginecología y obstetricia',
      'Anestesiología',
    ],
    datosVerificados: true,
    tel: '601 4431790',
    maps: 'https://www.google.com/maps/search/?api=1&query=Hospital+de+Engativ%C3%A1+Bogot%C3%A1',
    nota: 'Urgencias 24h de adultos y pediátricas (noroccidente). Cirugía, ortopedia, gineco y anestesia: por confirmar.',
  },
  {
    id: 'suba',
    nombre: 'Hospital de Suba',
    localidad: 'Suba',
    nivel: 'II',
    nivelTexto: 'Nivel II — mediana complejidad',
    direccion: 'Carrera 90 # 147-60',
    urgencias24h: true,
    horarioUrgencias: 'Urgencias 24 horas (adultos, pediátricas y obstétricas)',
    especialidades: [
      'Urgencias adultos',
      'Urgencias pediátricas',
      'Urgencias gineco-obstétricas',
      'Ginecología y obstetricia',
      'Alta dependencia obstétrica',
      'Medicina interna',
      'Cirugía general',
      'Pediatría',
      'Anestesiología',
    ],
    datosVerificados: false,
    tel: '601 4431790',
    maps: 'https://www.google.com/maps/search/?api=1&query=Hospital+de+Suba+Bogot%C3%A1',
    nota: 'Única Unidad de Alta Dependencia Obstétrica de la red pública. Fuerte en urgencias del embarazo.',
  },
  {
    id: 'chapinero',
    nombre: 'USS San Luis (Chapinero)',
    localidad: 'Chapinero',
    nivel: 'I',
    nivelTexto: 'Nivel I — baja complejidad',
    direccion: 'Km 5 Vía La Calera',
    urgencias24h: false,
    horarioUrgencias: 'Lunes a domingo: 7:00 a. m. – 5:00 p. m.',
    especialidades: ['Consulta prioritaria', 'Medicina general', 'Urgencia de baja complejidad'],
    datosVerificados: false,
    tel: '601 4431790',
    maps: 'https://www.google.com/maps/search/?api=1&query=USS+San+Luis+Km+5+V%C3%ADa+La+Calera+Bogot%C3%A1',
    nota: 'Horario diurno (no 24h). Ante signos de alarma, diríjase a Simón Bolívar o llame al 123.',
  },
  {
    id: 'barrios-unidos',
    nombre: 'USS Barrios Unidos (Sede Rionegro)',
    localidad: 'Barrios Unidos',
    nivel: 'I',
    nivelTexto: 'Nivel I — baja complejidad',
    direccion: 'Calle 94C # 57-40 (Sede Rionegro)',
    urgencias24h: false,
    horarioUrgencias: 'Consulte horario en subrednorte.gov.co',
    especialidades: ['Consulta prioritaria', 'Medicina general', 'Servicios ambulatorios'],
    datosVerificados: false,
    tel: '601 4431790',
    maps: 'https://www.google.com/maps/search/?api=1&query=Subred+Norte+Rionegro+Barrios+Unidos+Bogot%C3%A1',
    nota: 'Baja complejidad. Urgencias graves: Simón Bolívar / Engativá o 123.',
  },
];

/*
 * REGLA DE INCLUSIÓN (Opción B):
 * Solo se listan sedes que atienden ALGÚN tipo de urgencias (incluida baja complejidad).
 * Las sedes puramente administrativas se EXCLUYEN.
 * Excluida: Sede Central / administrativa Teusaquillo (Calle 66 # 15-41) — sin urgencias.
 */

/**
 * Devuelve las sedes que ofrecen una especialidad dada (coincidencia por texto).
 * Ordena primero las de urgencias 24h y mayor nivel.
 */
function hospitalesConEspecialidad(nombreEspecialidad) {
  const needle = (nombreEspecialidad || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const match = (e) =>
    e.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(needle);
  const nivelPeso = { III: 3, II: 2, I: 1 };
  const res = [];
  HOSPITALES.forEach(function (h) {
    if (h.especialidades.some(match)) {
      res.push({ hospital: h, confirmado: true });
    } else if ((h.especialidadesPorConfirmar || []).some(match)) {
      res.push({ hospital: h, confirmado: false });
    }
  });
  // Confirmados primero; luego 24h; luego mayor nivel.
  return res.sort(function (a, b) {
    if (a.confirmado !== b.confirmado) return b.confirmado - a.confirmado;
    if (a.hospital.urgencias24h !== b.hospital.urgencias24h)
      return b.hospital.urgencias24h - a.hospital.urgencias24h;
    return (nivelPeso[b.hospital.nivel] || 0) - (nivelPeso[a.hospital.nivel] || 0);
  });
}
