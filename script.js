/* ═══════════════════════════════════════════════════════════════
   INVITACIÓN BABY SHOWER MATÍAS - LÓGICA PRINCIPAL
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════
   OSITOS FONDO — distribuidos por toda la página
═══════════════════════════════════════ */
const BODY_BEARS = [
  // columna izquierda (siempre visible en azul)
  { left:2,  top:6,  size:28, color:'#C89860', dur:7.2, delay:0   },
  { left:4,  top:30, size:20, color:'#A9C9E0', dur:8.5, delay:1.3 },
  { left:2,  top:55, size:16, color:'#D98C93', dur:6.8, delay:0.7 },
  { left:5,  top:78, size:22, color:'#A9C9E0', dur:9.0, delay:2.1 },
  { left:7,  top:95, size:14, color:'#C89860', dur:7.6, delay:1.0 },
  // columna derecha (siempre visible en azul)
  { left:92, top:10, size:26, color:'#A9C9E0', dur:7.5, delay:0.4 },
  { left:94, top:35, size:18, color:'#D98C93', dur:8.0, delay:1.8 },
  { left:91, top:60, size:20, color:'#C89860', dur:7.3, delay:0.9 },
  { left:93, top:82, size:14, color:'#A9C9E0', dur:9.5, delay:1.5 },
  { left:95, top:97, size:10, color:'#D98C93', dur:8.8, delay:2.4 },
  // segunda columna izq (visible en pantallas >800px)
  { left:16, top:18, size:16, color:'#D98C93', dur:8.2, delay:2.3 },
  { left:20, top:50, size:12, color:'#C89860', dur:7.8, delay:0.6 },
  { left:14, top:82, size:14, color:'#A9C9E0', dur:9.1, delay:3.0 },
  // segunda columna der (visible en pantallas >800px)
  { left:80, top:14, size:14, color:'#A9C9E0', dur:9.2, delay:1.1 },
  { left:83, top:46, size:18, color:'#D98C93', dur:8.6, delay:2.7 },
  { left:78, top:75, size:12, color:'#C89860', dur:7.4, delay:0.3 }
];

(function initBodyBears() {
  const wrap = document.getElementById('body-bears');
  BODY_BEARS.forEach(b => wrap.appendChild(makeBalloon(b, .22)));
})();

/* ═══════════════════════════════════════
   GLOBOS (datos del design)
═══════════════════════════════════════ */
const OPENING_BALLOONS = [
  {left:8, top:62,size:46,color:'#C89860',dur:6.5,delay:0  },
  {left:78,top:68,size:38,color:'#A9C9E0',dur:5.5,delay:.6 },
  {left:20,top:20,size:30,color:'#D98C93',dur:7,  delay:1.1},
  {left:65,top:15,size:42,color:'#A9C9E0',dur:6,  delay:.3 },
  {left:45,top:75,size:26,color:'#C89860',dur:5,  delay:1.6},
  {left:88,top:30,size:34,color:'#D98C93',dur:6.8,delay:.9 },
  {left:5, top:10,size:24,color:'#A9C9E0',dur:5.8,delay:1.4}
];
const HERO_BALLOONS = [
  {left:8, top:12,size:26,color:'#C89860',dur:8,  delay:0  },
  {left:85,top:10,size:20,color:'#A9C9E0',dur:7,  delay:.8 },
  {left:90,top:55,size:16,color:'#D98C93',dur:9,  delay:1.4},
  {left:5, top:48,size:14,color:'#A9C9E0',dur:6.5,delay:.4 }
];

function makeBalloon(b, opacity) {
  const es   = Math.round(b.size * .34);
  const et   = -Math.round(es * .5);
  const eside = -Math.round(es * .32);
  const w = document.createElement('div');
  w.style.cssText = `position:absolute;left:${b.left}%;top:${b.top}%;width:${b.size}px;height:${b.size}px;animation:balloonFloat ${b.dur}s ease-in-out infinite ${b.delay}s;`;
  const eL = document.createElement('div');
  eL.style.cssText = `position:absolute;top:${et}px;left:${eside}px;width:${es}px;height:${es}px;border-radius:50%;background:${b.color};opacity:${opacity};`;
  const eR = document.createElement('div');
  eR.style.cssText = `position:absolute;top:${et}px;right:${eside}px;width:${es}px;height:${es}px;border-radius:50%;background:${b.color};opacity:${opacity};`;
  const bd = document.createElement('div');
  bd.style.cssText = `position:absolute;inset:0;border-radius:50%;background:${b.color};opacity:${opacity};box-shadow:inset -6px -6px 14px rgba(0,0,0,.14);`;
  w.append(eL, eR, bd);
  return w;
}

/* ═══════════════════════════════════════
   MÁQUINA DE FASES
═══════════════════════════════════════ */
const EL = {
  loader:  document.getElementById('phase-loader'),
  opening: document.getElementById('phase-opening'),
  main:    document.getElementById('phase-main'),
  bear:    document.getElementById('bear-overlay')
};
let phase = 'loader';
let autoTimer;

function goToPhase(next) {
  const curr = EL[phase];

  curr.style.transition = 'opacity .9s ease';
  curr.style.opacity = '0';

  const overlay = EL.bear;
  overlay.classList.add('active');
  const growEl = overlay.querySelector('.bear-grow');
  growEl.style.animation = 'none';
  void growEl.offsetWidth;
  growEl.style.animation = 'bearGrow 1.1s ease-out forwards';
  setTimeout(() => overlay.classList.remove('active'), 1100);

  setTimeout(() => {
    curr.style.display = 'none';
    phase = next;
    const el = EL[next];
    const isMain = next === 'main';

    if (next === 'opening') {
      el.style.display = 'flex';
      const wrap = document.getElementById('opening-balloons');
      if (!wrap.childElementCount)
        OPENING_BALLOONS.forEach(b => wrap.appendChild(makeBalloon(b, .88)));
    } else if (isMain) {
      el.style.display = 'block';
      const hWrap = document.getElementById('hero-balloons');
      if (!hWrap.childElementCount)
        HERO_BALLOONS.forEach(b => hWrap.appendChild(makeBalloon(b, .30)));
      startCountdown();
      setTimeout(() => playAudio(), 500);
    }

    el.style.opacity = '0';
    el.style.transition = 'opacity .9s ease';
    requestAnimationFrame(() => { el.style.opacity = '1'; });

  }, 900);
}

setTimeout(() => goToPhase('opening'), 2200);
autoTimer = setTimeout(() => goToPhase('main'), 8200);

document.getElementById('btn-continue').addEventListener('click', () => {
  clearTimeout(autoTimer);
  goToPhase('main');
});

/* ═══════════════════════════════════════
   COUNTDOWN — componente aislado
═══════════════════════════════════════ */
const EVENT_MS = new Date('2026-08-01T15:00:00-05:00').getTime();

function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

function animNum(el, val) {
  if (el.textContent === val) return;
  el.classList.remove('pulse');
  void el.offsetWidth;
  el.textContent = val;
  el.classList.add('pulse');
}

function startCountdown() {
  const els = ['cd-d','cd-h','cd-m','cd-s'].map(id => document.getElementById(id));
  function tick() {
    let diff = Math.max(0, EVENT_MS - Date.now());
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000;
    const m = Math.floor(diff / 60000);    diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    [d, h, m, s].forEach((v, i) => animNum(els[i], pad(v)));
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════
   MODAL DE FOTOS
═══════════════════════════════════════ */
function openPhotoModal(src) {
  const modal = document.getElementById('photo-modal');
  const img = document.getElementById('modal-photo');
  img.src = src;
  modal.classList.add('active');
}

function closePhotoModal() {
  const modal = document.getElementById('photo-modal');
  modal.classList.remove('active');
}

document.getElementById('photo-modal').addEventListener('click', (e) => {
  if (e.target.id === 'photo-modal') closePhotoModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePhotoModal();
});

/* ═══════════════════════════════════════
   MÚSICA — toggle play/pause
═══════════════════════════════════════ */
const audio    = document.getElementById('audio');
const musicBtn = document.getElementById('music-btn');
let playing = false;

function playAudio() {
  audio.currentTime = 32;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      playing = true;
      musicBtn.textContent = '❚❚';
    }).catch(err => {
      console.log('Error reproduciendo audio:', err);
    });
  }
}

function unmuteAudio() {
  if (!audio.muted) return;
  audio.muted = false;
  if (playing) musicBtn.textContent = '❚❚';
}

musicBtn.addEventListener('click', () => {
  if (playing) {
    audio.pause();
    playing = false;
    musicBtn.textContent = '♪';
  } else {
    unmuteAudio();
    playAudio();
  }
});

// Unmutear con la primera interacción del usuario
['click', 'touchstart', 'scroll'].forEach(event => {
  document.addEventListener(event, unmuteAudio, { once: true });
});

window.playAudio = playAudio;
