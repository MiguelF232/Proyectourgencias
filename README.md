# ¿Es una urgencia? — Guía educativa (Colombia)

Aplicación web **educativa** que ayuda a las personas a identificar **cuándo y a dónde acudir ante una urgencia médica** en Colombia. Pensada **mobile-first** para migrar a app móvil.

> ⚠️ **Aviso:** Contenido educativo. No reemplaza la valoración de un profesional de salud. Ante una emergencia real, llame al **123**.

## Qué hace

1. **🔎 Buscar síntoma** — La persona escribe su molestia (ej. *"me duele el ojo"*) y la app le indica:
   - Nivel de orientación (emergencia / urgencia / consulta / autocuidado).
   - A dónde ir y a qué especialidad.
   - Signos de alarma que elevan la urgencia.
2. **🆘 El ABC** — Vía aérea, Respiración y Circulación: las señales de riesgo vital inmediato.
3. **📊 Causas** — Las 10 principales causas de muerte en Colombia (DANE) con sus signos de alarma.
4. **🏥 Especialidades** — A qué especialidad acudir según la molestia.

## Cómo ejecutar

No requiere instalación ni dependencias. Opciones:

```bash
# Opción 1: abrir el archivo directamente
# Abra index.html en el navegador

# Opción 2: servidor local (recomendado)
cd urgencias-co
python3 -m http.server 8000
# luego abra http://localhost:8000
```

## Visor (archivo único para compartir)

Para generar un HTML autocontenido (CSS + JS embebidos), fácil de abrir o compartir:

```bash
node build-visor.js
# genera visor/urgencias-visor.html (abrible con doble clic)
```

## Estructura

```
urgencias-co/
├── index.html         # Interfaz (mobile-first)
├── css/styles.css     # Estilos
├── js/data.js         # Contenido clínico (síntomas, ABC, causas, especialidades)
├── js/hospitales.js   # Sedes de la Subred Norte (urgencias, especialidades, horarios)
├── js/app.js          # Lógica (búsqueda, pestañas, mapeo síntoma→sede)
├── build-visor.js     # Genera el visor autocontenido
├── visor/             # Salida del visor (urgencias-visor.html)
└── README.md
```

## Cómo mapea un síntoma a una sede

1. El usuario toca un recuadro o escribe (ej. *"me fracturé"*).
2. Cada síntoma declara `especialidadesRequeridas` (ej. Ortopedia, Cirugía general, Anestesiología).
3. La app busca en `js/hospitales.js` qué sedes ofrecen esas especialidades y muestra las
   sedes con urgencias (priorizando 24h y mayor complejidad), con la **razón** (especialidades).

> ⚠️ Las especialidades por sede están marcadas con `datosVerificados: true/false`.
> Donde es `false`, confirme en subrednorte.gov.co o al 601 4431790 antes de usar con pacientes reales.

## Fuentes

- **Causas de mortalidad:** DANE — Estadísticas Vitales (reportes 2024–2025).
- **Línea de emergencias:** 123, Número Único Nacional de Seguridad y Emergencias.
- **Signos de alarma y niveles:** criterios generales de educación en salud (orientativos, no diagnósticos).

## Próximos pasos sugeridos

- Añadir un cuestionario guiado (tipo triaje) además de la búsqueda por texto.
- Empaquetar como PWA (instalable en el celular, funciona sin conexión).
- Geolocalización del servicio de urgencias más cercano.
- Ampliar el diccionario de síntomas y las especialidades.
