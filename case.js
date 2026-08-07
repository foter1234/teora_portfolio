/* ─────────────────────────────────────────────────────────────────────
   PÁGINA DE CASE — monta case.html a partir de ?c=<slug>, lendo os
   dados de cases.js. Cada bloco só é desenhado se tiver conteúdo, então
   a página nunca exibe texto de mentira enquanto o case não está pronto.
   ───────────────────────────────────────────────────────────────────── */
(function () {
  const root = document.getElementById('case-root');
  if (!root || typeof TEORA_CASES === 'undefined') return;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nn  = n => String(n).padStart(2, '0');

  const slug = new URLSearchParams(location.search).get('c');
  const item = caseBySlug(slug);

  if (!item) {
    root.innerHTML = `
      <section class="section case-missing">
        <div class="case-shell">
          <p class="case-eyebrow">404</p>
          <h1 class="case-title">Case não encontrado</h1>
          <p class="case-lead">O endereço acessado não corresponde a nenhum case publicado.</p>
          <ul class="case-missing-list">
            ${TEORA_CASES.map(c => `<li><a href="${caseURL(c.slug)}">${esc(c.name)}</a></li>`).join('')}
          </ul>
          <a class="btn-ghost" href="index.html#cases">Voltar para os cases</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${item.name} — Case Teora Solutions`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', item.summary);

  const idx  = TEORA_CASES.indexOf(item);
  const next = TEORA_CASES[(idx + 1) % TEORA_CASES.length];

  /* ── 1. Abertura ──────────────────────────────────────────────── */
  function heroHTML() {
    const metaCells = [
      ['Cliente',  item.client],
      ['Segmento', item.segment],
      ['Serviços', `${nn(item.services.length)} frentes`],
      ['Peças',    `${nn(casePieceCount(item))} entregues`]
    ];

    const live = item.link
      ? `<a class="case-live" href="${esc(item.link)}" target="_blank" rel="noopener">
           <span>${esc(item.linkLabel || 'Ver no ar')}</span>
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
         </a>`
      : '';

    return `
      <header class="case-hero">
        <div class="case-shell">
          <a class="back-link case-back" href="index.html#cases">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Todos os cases
          </a>

          <div class="case-hero-grid">
            <div class="case-hero-text reveal">
              <p class="case-eyebrow"><span class="case-eyebrow-rule"></span>${esc(item.category)}</p>
              <h1 class="case-title">${esc(item.name)}</h1>
              <p class="case-lead">${esc(item.lead)}</p>
              ${live}
            </div>

            <figure class="case-hero-media reveal reveal-delay-1">
              <img src="${esc(item.cover.src)}" alt="${esc(item.cover.alt)}"
                   style="object-position:${esc(item.cover.position || 'center')}">
            </figure>
          </div>

          <dl class="case-meta reveal reveal-delay-2">
            ${metaCells.map(([k, v]) => `
              <div class="case-meta-cell">
                <dt>${esc(k)}</dt>
                <dd>${esc(v)}</dd>
              </div>`).join('')}
          </dl>
        </div>
      </header>`;
  }

  /* ── 2. Objetivo / Desafio / Solução ──────────────────────────── */
  function briefingHTML() {
    const blocks = [
      ['Objetivo',       item.objective],
      ['O desafio',      item.problem],
      ['Nossa solução',  item.solution]
    ].filter(([, body]) => body && body.trim());

    if (!blocks.length) return '';

    return `
      <section class="section case-block">
        <div class="case-shell">
          <div class="case-briefing">
            ${blocks.map(([title, body], i) => `
              <article class="case-brief reveal" style="--i:${i}">
                <span class="case-brief-num">${nn(i + 1)}</span>
                <h2 class="case-brief-title">${esc(title)}</h2>
                <p class="case-brief-body">${esc(body)}</p>
              </article>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── 3. Serviços executados ───────────────────────────────────── */
  function servicesHTML() {
    if (!item.services.length) return '';
    return `
      <section class="section case-block case-block--tight">
        <div class="case-shell">
          <h2 class="case-h2 reveal">O que entregamos</h2>
          <ul class="case-tags case-tags--lg reveal reveal-delay-1">
            ${caseTagsHTML(item.services, 'case-tag--lg')}
          </ul>
        </div>
      </section>`;
  }

  /* ── 4 e 5. Galeria e vídeos ──────────────────────────────────── */
  function galleryHTML() {
    if (!item.gallery.length) return '';
    return `
      <section class="section case-block">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Galeria</h2>
          <div class="carousel reveal" data-carousel data-carousel-label="Galeria de ${esc(item.name)}">
            <div class="carousel-track" data-carousel-track data-gallery="photos">
            ${item.gallery.map(shot => `
              <button class="case-shot" type="button" style="--ar:${(shot.w / shot.h).toFixed(4)}"
                      aria-label="Ampliar: ${esc(shot.alt)}">
                <img src="${esc(shot.src)}" alt="${esc(shot.alt)}"
                     width="${shot.w}" height="${shot.h}" loading="lazy" decoding="async">
                <span class="case-shot-zoom" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5M11 8v6M8 11h6"/></svg>
                </span>
              </button>`).join('')}
            </div>
          </div>
        </div>
      </section>`;
  }

  function videosHTML() {
    if (!item.videos.length) return '';
    return `
      <section class="section case-block">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Vídeos</h2>
          <div class="carousel reveal" data-carousel data-carousel-label="Vídeos de ${esc(item.name)}">
            <div class="carousel-track" data-carousel-track data-gallery="videos">
            ${item.videos.map(v => `
              <button class="case-shot case-shot--video" type="button" style="--ar:${(v.w / v.h).toFixed(4)}"
                      data-video="${esc(v.src)}" data-label="${esc(v.label || '')}"
                      aria-label="Assistir: ${esc(v.alt)}">
                <img src="${esc(v.poster)}" alt="${esc(v.alt)}"
                     width="${v.w}" height="${v.h}" loading="lazy" decoding="async">
                <span class="case-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </span>
                ${v.label ? `<span class="case-shot-label">${esc(v.label)}</span>` : ''}
              </button>`).join('')}
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ── 6. Antes e depois (comparador arrastável) ────────────────── */
  function beforeAfterHTML() {
    const ba = item.beforeAfter;
    if (!ba || !ba.before || !ba.after) return '';
    return `
      <section class="section case-block">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Antes e depois</h2>
          <div class="case-ba reveal" id="case-ba">
            <img class="case-ba-img" src="${esc(ba.after.src)}"  alt="${esc(ba.after.alt)}">
            <img class="case-ba-img case-ba-top" src="${esc(ba.before.src)}" alt="${esc(ba.before.alt)}">
            <span class="case-ba-handle" aria-hidden="true"></span>
            <span class="case-ba-tag case-ba-tag--l">Antes</span>
            <span class="case-ba-tag case-ba-tag--r">Depois</span>
            <input class="case-ba-range" type="range" min="0" max="100" value="50"
                   aria-label="Comparar antes e depois">
          </div>
          ${ba.label ? `<p class="case-caption reveal">${esc(ba.label)}</p>` : ''}
        </div>
      </section>`;
  }

  /* ── 7 e 8. Resultados e depoimento (placeholder até existirem) ─ */
  function placeholder(text) {
    return `<div class="case-soon"><span class="case-soon-dot"></span>${esc(text)}</div>`;
  }

  function resultsHTML() {
    const has = item.results && item.results.length;
    if (!has && !CASE_PLACEHOLDERS) return '';
    return `
      <section class="section case-block">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Resultados</h2>
          ${has
            ? `<div class="case-results reveal">
                 ${item.results.map((r, i) => `
                   <div class="case-result" style="--i:${i}">
                     <p class="case-result-value">${esc(r.value)}</p>
                     <p class="case-result-label">${esc(r.label)}</p>
                   </div>`).join('')}
               </div>`
            : `<div class="reveal">${placeholder('Números deste case em consolidação.')}</div>`}
        </div>
      </section>`;
  }

  function testimonialHTML() {
    const t = item.testimonial;
    if (!t && !CASE_PLACEHOLDERS) return '';
    return `
      <section class="section case-block">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Depoimento</h2>
          ${t
            ? `<figure class="case-quote reveal">
                 <svg class="case-quote-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H7a3 3 0 0 1 3-3zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3a3 3 0 0 1 3-3z"/></svg>
                 <blockquote>${esc(t.quote)}</blockquote>
                 <figcaption>
                   <span class="case-quote-author">${esc(t.author)}</span>
                   ${t.role ? `<span class="case-quote-role">${esc(t.role)}</span>` : ''}
                 </figcaption>
               </figure>`
            : `<div class="reveal">${placeholder('Depoimento do cliente em breve.')}</div>`}
        </div>
      </section>`;
  }

  /* ── 9. Ferramentas e técnicas ────────────────────────────────── */
  function stackHTML() {
    if (!item.stack || !item.stack.length) return '';
    return `
      <section class="section case-block case-block--tight">
        <div class="case-shell">
          <h2 class="case-h2 reveal">Tecnologias e técnicas</h2>
          <ul class="case-chips reveal reveal-delay-1">
            ${item.stack.map(s => `<li class="case-chip">${esc(s)}</li>`).join('')}
          </ul>
        </div>
      </section>`;
  }

  /* ── 10. Próximo case ─────────────────────────────────────────── */
  function nextHTML() {
    if (next === item) return '';
    return `
      <section class="case-next" style="--case-accent:${esc(next.accent)}">
        <a class="case-next-link" href="${caseURL(next.slug)}">
          <div class="case-shell case-next-inner">
            <div>
              <p class="case-eyebrow"><span class="case-eyebrow-rule"></span>Próximo case</p>
              <p class="case-next-name">${esc(next.name)}</p>
              <p class="case-next-cat">${esc(next.category)}</p>
            </div>
            <span class="case-next-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
          <img class="case-next-bg" src="${esc(next.cover.src)}" alt="" loading="lazy" aria-hidden="true">
        </a>
      </section>`;
  }

  root.style.setProperty('--case-accent', item.accent);
  root.innerHTML =
    heroHTML() + briefingHTML() + servicesHTML() + galleryHTML() + videosHTML() +
    beforeAfterHTML() + resultsHTML() + testimonialHTML() + stackHTML() + nextHTML();

  /* ── comportamento do comparador antes/depois ─────────────────── */
  const ba = document.getElementById('case-ba');
  if (ba) {
    const range = ba.querySelector('.case-ba-range');
    const apply = () => ba.style.setProperty('--split', range.value + '%');
    range.addEventListener('input', apply);
    apply();
  }

  /* liga o lightbox no conteúdo recém-criado e reativa as animações */
  if (window.TeoraCarousel) window.TeoraCarousel.initAll(root);
  if (window.TeoraLightbox) window.TeoraLightbox.bindAll(root);
  if (window.TeoraReveal)   window.TeoraReveal.observe(root);
  if (window.TeoraCursor)   window.TeoraCursor.bind(root);
})();
