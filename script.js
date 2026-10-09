// Menú mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  const close = () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

// Compartir
const share = document.getElementById('share');
if (share) {
  const label = share.innerHTML;
  share.addEventListener('click', async () => {
    try {
      if (navigator.share) { await navigator.share({ title: document.title, url: location.href }); return; }
      await navigator.clipboard.writeText(location.href);
      share.textContent = 'Link copiado';
      setTimeout(() => { share.innerHTML = label; }, 2200);
    } catch (e) { /* canceló */ }
  });
}

// Guía "¿Qué te gustaría mejorar?" — textos tomados de los posteos de la doctora
const GUIA = {
  manchas: {
    t: 'Manchas',
    d: 'La luz pulsada intensa trabaja las manchas, el tono y el brillo. Se hace una sesión por mes, en invierno, y en cada una ajustamos los parámetros.',
    q: '“1 sola sesión de luz pulsada. No hicimos ni un solo tratamiento más.”',
    l: ['Luz pulsada intensa', 'Peelings']
  },
  acne: {
    t: 'Cicatrices de acné',
    d: 'Hay tres tratamientos que valen la pena, y cada uno tiene sus ventajas. Cuál conviene depende de tu piel, por eso primero te veo en consulta.',
    q: '“Para asesorarlas de la mejor forma lo ideal es siempre verlas en el consultorio.”',
    l: ['Láser CO2 fraccionado', 'Láser Erbium', 'Fraxface (radiofrecuencia fraccionada)']
  },
  gallo: {
    t: 'Patas de gallo',
    d: 'Dos opciones con láser. El Erbium tiene menos tiempo de recuperación. La sesión dura unos 20 minutos, con crema anestésica media hora antes: molesta, pero se tolera.',
    q: '“Momento ideal para hacerlo: ¡ya!” (en los meses fríos)',
    l: ['Láser CO2 fraccionado', 'Láser Erbium']
  },
  flacidez: {
    t: 'Flacidez',
    d: 'Cuando la piel se siente más flácida y el contorno se desdibuja, trabajamos con inyectables que mejoran la calidad de la piel. El CO2 también ayuda con la flacidez.',
    q: '“Un tratamiento simple, rápido, seguro e increíblemente efectivo.”',
    l: ['Profhilo', 'Radiesse', 'Láser CO2 fraccionado']
  },
  textura: {
    t: 'Textura y poros',
    d: 'Para piel con textura irregular, poros dilatados o falta de brillo. El CO2 hace una renovación total; el Fraxface y los peelings son opciones más livianas.',
    q: '“Noté un cambio hermoso en la textura y el brillo de mi piel.” (Melisa, en Google)',
    l: ['Láser CO2 fraccionado', 'Fraxface', 'Peelings', 'Luz pulsada']
  }
};
const tabs = document.querySelectorAll('.guia-tabs button');
const panel = document.getElementById('g-panel');
tabs.forEach(btn => btn.addEventListener('click', () => {
  const g = GUIA[btn.dataset.k];
  tabs.forEach(b => b.setAttribute('aria-selected', String(b === btn)));
  document.getElementById('g-title').textContent = g.t;
  document.getElementById('g-desc').textContent = g.d;
  document.getElementById('g-quote').textContent = g.q;
  document.getElementById('g-list').innerHTML = g.l.map(x => `<li>${x}</li>`).join('');
  panel.classList.remove('is-swapping'); void panel.offsetWidth; panel.classList.add('is-swapping');
}));
