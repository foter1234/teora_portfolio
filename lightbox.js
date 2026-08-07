/* ─────────────────────────────────────────────────────────────────────
   LIGHTBOX — visualizador de foto e vídeo, compartilhado por toda a
   página. Injeta a própria marcação, então nenhum HTML precisa declarar
   o visualizador.

   Uso:
     <div data-gallery="photos">           ← galeria de imagens
       <button class="case-shot"><img src alt></button> …
     </div>

     <div data-gallery="videos">           ← galeria de vídeos
       <button class="case-shot" data-video="x.mp4"><img …></button> …
     </div>

   Cada container vira um grupo independente de navegação (setas ← →).
   Depois de renderizar conteúdo novo, chame TeoraLightbox.bindAll().
   ───────────────────────────────────────────────────────────────────── */
window.TeoraLightbox = (function () {
  const BOUND = 'lbBound';
  let root, media, imgEl, videoEl, captionEl, counterEl, prevBtn, nextBtn, closeBtn;
  let items = [];
  let current = 0;
  let mode = 'photo';
  let lastFocused = null;

  function build() {
    root = document.createElement('div');
    root.className = 'lb';
    root.id = 'teora-lightbox';
    root.setAttribute('aria-hidden', 'true');
    root.innerHTML = `
      <div class="lb-backdrop" data-lb-close></div>
      <div class="lb-stage" role="dialog" aria-modal="true" aria-label="Visualizador de mídia">
        <button class="lb-btn lb-close" type="button" aria-label="Fechar (Esc)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button class="lb-btn lb-prev" type="button" aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div class="lb-media">
          <img alt="" hidden>
          <video controls playsinline preload="none" hidden></video>
        </div>
        <button class="lb-btn lb-next" type="button" aria-label="Próximo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <div class="lb-bar">
          <p class="lb-caption"></p>
          <p class="lb-counter" aria-live="polite"></p>
        </div>
      </div>`;
    document.body.appendChild(root);

    media     = root.querySelector('.lb-media');
    imgEl     = root.querySelector('.lb-media img');
    videoEl   = root.querySelector('.lb-media video');
    captionEl = root.querySelector('.lb-caption');
    counterEl = root.querySelector('.lb-counter');
    prevBtn   = root.querySelector('.lb-prev');
    nextBtn   = root.querySelector('.lb-next');
    closeBtn  = root.querySelector('.lb-close');

    closeBtn.addEventListener('click', close);
    root.querySelector('[data-lb-close]').addEventListener('click', close);
    prevBtn.addEventListener('click', () => show(current - 1));
    nextBtn.addEventListener('click', () => show(current + 1));

    document.addEventListener('keydown', e => {
      if (!root.classList.contains('open')) return;
      if (e.key === 'Escape')     { e.preventDefault(); close(); }
      if (e.key === 'ArrowLeft')  show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    /* arrastar para o lado no touch — navega entre as peças */
    let startX = null;
    media.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    media.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 55) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });
  }

  function show(i) {
    current = (i + items.length) % items.length;
    const item = items[current];

    if (mode === 'video') {
      imgEl.hidden = true;
      videoEl.hidden = false;
      videoEl.pause();
      videoEl.src = item.src;
      videoEl.poster = item.poster || '';
      videoEl.load();
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
      videoEl.removeAttribute('src');
      videoEl.hidden = true;
      imgEl.hidden = false;
      imgEl.src = item.src;
      imgEl.alt = item.alt || '';
    }

    captionEl.textContent = item.label || item.alt || '';
    counterEl.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    const solo = items.length < 2;
    prevBtn.hidden = solo;
    nextBtn.hidden = solo;
  }

  function open(list, index, kind) {
    if (!list.length) return;
    lastFocused = document.activeElement;
    items = list;
    mode = kind;
    root.classList.toggle('lb--video', kind === 'video');
    show(index);
    root.classList.add('open');
    root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lb-locked');
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    videoEl.pause();
    root.classList.remove('open');
    root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lb-locked');
    if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
  }

  /* Liga todas as galerias ainda não ligadas. Seguro chamar quantas
     vezes quiser — containers já processados são ignorados. */
  function bindAll(scope) {
    (scope || document).querySelectorAll('[data-gallery]').forEach(container => {
      if (container.dataset[BOUND]) return;
      container.dataset[BOUND] = '1';

      const kind = container.dataset.gallery === 'videos' ? 'video' : 'photo';
      const tiles = Array.from(container.children).filter(el => el.querySelector('img'));
      if (!tiles.length) return;

      const list = tiles.map(tile => {
        const img = tile.querySelector('img');
        return kind === 'video'
          ? { src: tile.dataset.video, poster: img.getAttribute('src'), label: tile.dataset.label || '', alt: img.alt }
          : { src: img.getAttribute('src'), alt: img.alt, label: tile.dataset.label || '' };
      });

      tiles.forEach((tile, i) => tile.addEventListener('click', () => open(list, i, kind)));
    });
  }

  build();
  document.addEventListener('DOMContentLoaded', () => bindAll());
  bindAll();

  return { bindAll, open, close };
})();
