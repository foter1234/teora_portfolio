/* ─────────────────────────────────────────────────────────────────────
   CARROSSEL — trilho horizontal com scroll-snap nativo.

   Sem biblioteca: o arrasto por toque é o próprio scroll do navegador,
   então o gesto é nativo, roda na thread de composição e não custa nada
   em desempenho. O JS só cuida das setas, dos indicadores e do rótulo
   de acessibilidade.

   Marcação esperada:
     <div class="carousel" data-carousel data-carousel-label="Galeria">
       <div class="carousel-track" data-carousel-track> …itens… </div>
     </div>

   Os controles são criados aqui — o HTML não precisa declará-los.
   Depois de renderizar conteúdo novo, chame TeoraCarousel.initAll().
   ───────────────────────────────────────────────────────────────────── */
window.TeoraCarousel = (function () {
  const suave = () => (window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');

  function init(root) {
    if (root.dataset.carouselReady) return;
    const track = root.querySelector('[data-carousel-track]');
    if (!track) return;
    const itens = Array.from(track.children);
    if (!itens.length) return;

    root.dataset.carouselReady = '1';
    const rotulo = root.dataset.carouselLabel || 'Galeria';
    track.setAttribute('role', 'group');
    track.setAttribute('aria-roledescription', 'carrossel');
    track.setAttribute('aria-label', rotulo);
    /* o trilho rola: precisa ser alcançável e operável pelo teclado */
    track.tabIndex = 0;

    /* Um item só, ou todos cabendo na largura: nada de controles. */
    const cabeTudo = () => track.scrollWidth <= track.clientWidth + 2;

    const ui = document.createElement('div');
    ui.className = 'carousel-ui';
    ui.innerHTML = `
      <div class="carousel-dots" role="tablist" aria-label="Ir para a peça"></div>
      <div class="carousel-arrows">
        <button class="carousel-btn" type="button" data-dir="-1" aria-label="Peça anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button class="carousel-btn" type="button" data-dir="1" aria-label="Próxima peça">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>`;
    root.appendChild(ui);

    const [btnPrev, btnNext] = ui.querySelectorAll('.carousel-btn');
    const dots = ui.querySelector('.carousel-dots');

    itens.forEach((item, i) => {
      const d = document.createElement('button');
      d.type = 'button';
      d.className = 'carousel-dot';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', `Peça ${i + 1} de ${itens.length}`);
      d.addEventListener('click', () => irPara(i));
      dots.appendChild(d);
    });
    const bolinhas = Array.from(dots.children);

    function irPara(i) {
      const alvo = itens[Math.max(0, Math.min(i, itens.length - 1))];
      track.scrollTo({ left: alvo.offsetLeft - track.offsetLeft, behavior: suave() });
    }

    /* item mais próximo da borda esquerda do trilho */
    function indiceAtual() {
      const x = track.scrollLeft + track.offsetLeft;
      let melhor = 0, menor = Infinity;
      itens.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - x);
        if (d < menor) { menor = d; melhor = i; }
      });
      return melhor;
    }

    function sincronizar() {
      const semControles = cabeTudo();
      root.classList.toggle('carousel--estatico', semControles);
      if (semControles) return;

      const i = indiceAtual();
      bolinhas.forEach((d, k) => {
        const ativo = k === i;
        d.classList.toggle('is-active', ativo);
        d.setAttribute('aria-selected', String(ativo));
      });
      const fim = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      btnPrev.disabled = track.scrollLeft <= 2;
      btnNext.disabled = fim;
    }

    /* avança uma "página" inteira, não um item, para não engatinhar
       quando os itens são estreitos */
    function passo(dir) {
      const largura = track.clientWidth * 0.85;
      track.scrollBy({ left: dir * largura, behavior: suave() });
    }
    btnPrev.addEventListener('click', () => passo(-1));
    btnNext.addEventListener('click', () => passo(1));

    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); passo(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); passo(-1); }
    });

    let agendado = false;
    track.addEventListener('scroll', () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(() => { agendado = false; sincronizar(); });
    }, { passive: true });

    /* as imagens têm proporção fixa via --ar, mas a altura do trilho muda
       com o viewport — recalcula quando isso acontecer */
    if (window.ResizeObserver) new ResizeObserver(sincronizar).observe(track);
    sincronizar();
  }

  function initAll(escopo) {
    (escopo || document).querySelectorAll('[data-carousel]').forEach(init);
  }

  document.addEventListener('DOMContentLoaded', () => initAll());
  return { init, initAll };
})();
