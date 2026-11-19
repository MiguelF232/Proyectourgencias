/* app.js — Lógica de la app. Usa los datos de data.js. */

(function () {
  'use strict';

  /* ---------- Utilidades ---------- */

  // Normaliza: minúsculas y sin tildes, para que "visión" ≈ "vision".
  function norm(texto) {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function el(tag, className, html) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function badge(nivel) {
    const b = el('span', 'badge', nivel.titulo);
    b.style.background = nivel.color;
    return b;
  }

  /* ---------- Navegación por pestañas ---------- */

  function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.remove('tab--active'));
        tab.classList.add('tab--active');
        document.querySelectorAll('.panel').forEach(function (p) {
          p.classList.toggle('panel--active', p.id === 'tab-' + target);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  /* ---------- Buscador de síntomas ---------- */

  function buscarSintomas(consulta) {
    const q = norm(consulta);
    if (!q) return [];
    return SINTOMAS.filter(function (s) {
      if (norm(s.nombre).includes(q)) return true;
      return s.claves.some(function (clave) {
        const k = norm(clave);
        return k.includes(q) || q.includes(k);
      });
    });
  }

  function tarjetaSintoma(s) {
    const card = el('article', 'card');
    card.style.borderLeftColor = s.nivel.color;

    const head = el('div', 'card__head');
    head.appendChild(el('h2', 'card__title', s.nombre));
    head.appendChild(badge(s.nivel));
    card.appendChild(head);

    card.appendChild(el('p', 'card__adonde', '➡️ ' + s.adonde));
    card.appendChild(el('p', 'card__meta', 'Especialidad: ' + s.especialidad));
    card.appendChild(el('p', 'card__nivelmsg', s.nivel.mensaje));

    if (s.alarma && s.alarma.length) {
      card.appendChild(el('p', 'alarma-titulo', '⚠️ Signos de alarma — vaya a urgencias / 123:'));
      const ul = el('ul', 'alarma-lista');
      s.alarma.forEach((a) => ul.appendChild(el('li', null, a)));
      card.appendChild(ul);
    }

    // Razón: especialidades que requiere esta urgencia.
    if (s.especialidadesRequeridas && s.especialidadesRequeridas.length) {
      card.appendChild(
        el('p', 'card__meta', '🩺 Por qué: requiere ' + s.especialidadesRequeridas.join(', '))
      );
    }

    // Sedes de la Subred Norte que atienden esta urgencia (con esa especialidad).
    const sedes = sedesParaSintoma(s);
    if (sedes.length) {
      const box = el('div', 'sede-sugerida');
      box.appendChild(el('p', 'sede-sugerida__titulo', '📍 A dónde ir (Subred Norte):'));
      sedes.forEach(function (sede) {
        const row = el('div', 'sede-sugerida__item');
        const txt =
          '<strong>' + sede.nombre + '</strong> — ' + sede.localidad +
          ', ' + sede.direccion +
          (sede.urgencias24h ? ' · 🚨 24h' : ' · 🕐 ' + (sede.horarioUrgencias || 'horario limitado'));
        row.appendChild(el('span', null, txt));
        const link = el('a', 'hosp__link', '🗺️');
        link.href = sede.maps;
        link.target = '_blank';
        link.rel = 'noopener';
        link.title = 'Cómo llegar';
        row.appendChild(link);
        box.appendChild(row);
      });
      card.appendChild(box);
    }
    return card;
  }

  // Devuelve las sedes que ofrecen alguna de las especialidades requeridas por el síntoma.
  // Si ninguna coincide, cae a la sede de mayor complejidad (Simón Bolívar).
  function sedesParaSintoma(s) {
    const reqs = s.especialidadesRequeridas || [];
    const encontradas = [];
    reqs.forEach(function (esp) {
      hospitalesConEspecialidad(esp).forEach(function (h) {
        if (!encontradas.some((e) => e.id === h.id)) encontradas.push(h);
      });
    });
    if (!encontradas.length) {
      const sb = HOSPITALES.find((h) => h.id === 'simon-bolivar');
      return sb ? [sb] : [];
    }
    // Máximo 3 sedes, priorizando 24h y mayor nivel.
    const nivelPeso = { III: 3, II: 2, I: 1 };
    return encontradas
      .sort(function (a, b) {
        if (a.urgencias24h !== b.urgencias24h) return b.urgencias24h - a.urgencias24h;
        return (nivelPeso[b.nivel] || 0) - (nivelPeso[a.nivel] || 0);
      })
      .slice(0, 3);
  }

  function renderResultados(lista, hayConsulta) {
    const cont = document.getElementById('resultados');
    cont.innerHTML = '';

    if (!hayConsulta) {
      cont.appendChild(
        el('p', 'empty', 'Escriba una molestia o toque uno de los síntomas frecuentes de arriba.')
      );
      return;
    }
    if (!lista.length) {
      cont.appendChild(
        el(
          'p',
          'empty',
          'No encontramos ese síntoma en la guía. Si tiene dudas o la molestia es fuerte, acuda a urgencias o llame al 123.'
        )
      );
      return;
    }
    lista.forEach((s) => cont.appendChild(tarjetaSintoma(s)));
  }

  function initBuscador() {
    const input = document.getElementById('search-input');
    const chips = document.getElementById('chips');

    // Recuadros de acceso rápido: todos los motivos de consulta frecuentes.
    SINTOMAS.forEach(function (s) {
      const chip = el('button', 'chip', s.nombre);
      chip.addEventListener('click', function () {
        input.value = s.nombre;
        renderResultados(buscarSintomas(s.nombre), true);
        input.focus();
      });
      chips.appendChild(chip);
    });

    input.addEventListener('input', function () {
      const v = input.value;
      renderResultados(buscarSintomas(v), v.trim().length > 0);
    });

    renderResultados([], false);
  }

  /* ---------- ABC ---------- */

  function initABC() {
    const cont = document.getElementById('abc-list');
    ABC.forEach(function (item) {
      const card = el('div', 'abc-card');
      const head = el('div', 'abc-card__head');
      head.appendChild(el('div', 'abc-letra', item.letra));
      head.appendChild(el('div', 'abc-card__nombre', item.nombre));
      card.appendChild(head);

      card.appendChild(el('p', 'abc-card__pregunta', item.pregunta));

      card.appendChild(el('p', 'alarma-titulo', '⚠️ Signos de peligro:'));
      const ul = el('ul', 'alarma-lista');
      item.alarma.forEach((a) => ul.appendChild(el('li', null, a)));
      card.appendChild(ul);

      card.appendChild(el('p', 'card__nivelmsg', item.accion));
      cont.appendChild(card);
    });
  }

  /* ---------- Causas de mortalidad (acordeón) ---------- */

  function initCausas() {
    const cont = document.getElementById('causas-list');
    CAUSAS_MORTALIDAD.forEach(function (c) {
      const wrap = el('div', 'causa');

      const head = el('div', 'causa__head');
      head.appendChild(el('div', 'causa__puesto', String(c.puesto)));
      head.appendChild(el('div', 'causa__nombre', c.nombre));
      head.appendChild(el('div', 'causa__toggle', '▾'));
      wrap.appendChild(head);

      const body = el('div', 'causa__body');
      body.appendChild(el('p', 'causa__quees', c.quees));

      const bHead = el('div', 'card__head');
      bHead.appendChild(el('span', null, '<strong>¿A dónde?</strong> ' + c.especialidad));
      bHead.appendChild(badge(c.nivel));
      body.appendChild(bHead);

      body.appendChild(el('p', 'alarma-titulo', '⚠️ Signos de alarma:'));
      const ul = el('ul', 'alarma-lista');
      c.alarma.forEach((a) => ul.appendChild(el('li', null, a)));
      body.appendChild(ul);

      if (c.nota) body.appendChild(el('p', 'causa__nota', 'ℹ️ ' + c.nota));

      wrap.appendChild(body);

      head.addEventListener('click', function () {
        wrap.classList.toggle('causa--open');
        head.querySelector('.causa__toggle').textContent =
          wrap.classList.contains('causa--open') ? '▴' : '▾';
      });

      cont.appendChild(wrap);
    });
  }

  /* ---------- Hospitales (Subred Norte) ---------- */

  function tarjetaHospital(h) {
    const card = el('article', 'card hosp');
    card.style.borderLeftColor = h.urgencias24h ? '#c0392b' : '#2980b9';

    const head = el('div', 'card__head');
    head.appendChild(el('h2', 'card__title', h.nombre));
    const tag = el('span', 'badge');
    if (h.urgencias24h) {
      tag.textContent = '🚨 Urgencias 24h';
      tag.style.background = '#c0392b';
    } else {
      tag.textContent = 'Baja complejidad';
      tag.style.background = '#2980b9';
    }
    head.appendChild(tag);
    card.appendChild(head);

    card.appendChild(el('p', 'card__meta', '📍 ' + h.localidad + ' — ' + h.direccion));
    card.appendChild(el('p', 'card__meta', 'Complejidad: ' + h.nivelTexto));
    if (h.horario) card.appendChild(el('p', 'card__meta', '🕐 ' + h.horario));
    card.appendChild(el('p', 'card__meta', 'Atiende: ' + h.urgencias.join(', ')));
    if (h.nota) card.appendChild(el('p', 'causa__nota', 'ℹ️ ' + h.nota));

    const acciones = el('div', 'hosp__acciones');
    const tel = el('a', 'hosp__btn', '📞 ' + h.tel);
    tel.href = 'tel:' + h.tel.replace(/\s/g, '');
    const mapa = el('a', 'hosp__btn hosp__btn--ghost', '🗺️ Cómo llegar');
    mapa.href = h.maps;
    mapa.target = '_blank';
    mapa.rel = 'noopener';
    acciones.appendChild(tel);
    acciones.appendChild(mapa);
    card.appendChild(acciones);

    return card;
  }

  function renderHospitales(localidad) {
    const cont = document.getElementById('hospitales-list');
    cont.innerHTML = '';
    let lista = HOSPITALES;
    if (localidad && localidad !== 'todas') {
      lista = HOSPITALES.filter((h) => h.localidad === localidad);
    }
    // Mostrar primero las sedes con urgencias 24h.
    lista = lista.slice().sort((a, b) => (b.urgencias24h === true) - (a.urgencias24h === true));

    if (!lista.length) {
      cont.appendChild(el('p', 'empty', 'No hay sedes registradas para esa localidad.'));
      return;
    }
    lista.forEach((h) => cont.appendChild(tarjetaHospital(h)));
  }

  function initHospitales() {
    const select = document.getElementById('loc-select');
    // Solo localidades que tienen al menos una sede con atención de urgencias.
    const localidadesConSede = [...new Set(HOSPITALES.map((h) => h.localidad))].sort();
    localidadesConSede.forEach(function (loc) {
      const opt = el('option', null, loc);
      opt.value = loc;
      select.appendChild(opt);
    });
    select.addEventListener('change', function () {
      renderHospitales(select.value);
    });
    renderHospitales('todas');
  }

  /* ---------- Especialidades ---------- */

  function initEspecialidades() {
    const cont = document.getElementById('especialidades-list');
    ESPECIALIDADES.forEach(function (e) {
      const card = el('div', 'esp');
      card.appendChild(el('div', 'esp__nombre', e.nombre));
      card.appendChild(el('div', 'esp__motivo', e.motivo));
      cont.appendChild(card);
    });
  }

  /* ---------- Arranque ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initBuscador();
    initABC();
    initHospitales();
    initCausas();
    initEspecialidades();
  });
})();
