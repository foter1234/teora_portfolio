  /* ─── CURSOR ─── */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  function animRing() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
  document.querySelectorAll('a,button,.plan-card,.port-card,.team-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '.5'; });
    el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '1'; });
  });

  /* ─── NAVBAR SCROLL ─── */
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ─── MOBILE MENU ─── */
  function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
  }
  document.querySelectorAll('#mobile-menu a').forEach(a => a.addEventListener('click', () => document.getElementById('mobile-menu').classList.remove('open')));

  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─── PORTFOLIO DATA ─── */
  const portfolioItems = [
    { id: 1, title: 'Teora Agendamentos', category: 'Sistemas/Apps', tag: 'Sistema', desc: 'Prototipo de agendamentos para sua Barbearia ou salão', bg: 'linear-gradient(135deg,#060D1E,#0A1830)', accent: '#00C8FF' },
    { id: 2, title: 'Inbracon', category: 'Landing Pages', tag: 'Landing', desc: 'Estruturas Inteligentes para Seu Negócio. Projete a colheita e ganhe espaço com engenharia Inbracon', bg: 'linear-gradient(135deg,#0D0A1E,#1A0F2E)', accent: '#8B5CF6' },
    { id: 3, title: 'Solar Tech', category: 'Sites Institucionais', tag: 'Institucional', desc: 'Pare de pagar pela energia. Gere a sua.', bg: 'linear-gradient(135deg,#061A10,#0A2818)', accent: '#10B981' },
    { id: 4, title: 'Zorraq', category: 'E-commerce', tag: 'E-commerce', desc: 'Loja completa com 20+ produtos', bg: 'linear-gradient(135deg,#1A0E05,#2A1808)', accent: '#F59E0B' },
    { id: 5, title: 'Crianças Felizes', category: 'Landing Pages', tag: 'Landing', desc: 'Transformando o futuro das crianças através do amor e da educação', bg: 'linear-gradient(135deg,#1A0508,#280A0C)', accent: '#EF4444' },
    { id: 6, title: 'Danilo Lima Advogados', category: 'Landing Pages', tag: 'Landing', desc: 'Soluções jurídicas seguras para proteger seus direitos e sua família.', bg: 'linear-gradient(135deg,#12100A,#1C180E)', accent: '#D4AF37' },
    { id: 7, title: 'Gmartins Refrigeração', category: 'E-commerce', tag: 'E-commerce', desc: 'Agendamentos + loja virtual integrados', bg: 'linear-gradient(135deg,#061612,#0A201C)', accent: '#10B981' },
  ];

  function buildCard(item) {
    return `
      <div class="port-card reveal" data-cat="${item.category}" style="animation:fadeUp .45s ease both;">
        <div class="port-inner" style="background:${item.bg};">
          <div class="port-top">
            <span class="port-tag" style="background:${item.accent}18;color:${item.accent};border:1px solid ${item.accent}33;">${item.tag}</span>
            <span class="port-num">${String(item.id).padStart(2,'0')}</span>
          </div>
          <div class="port-bottom">
            <div class="port-title">${item.title}</div>
            <div class="port-desc">${item.desc}</div>
          </div>
          <!-- decorative -->
          <div class="port-deco" style="width:120px;height:120px;background:radial-gradient(circle,${item.accent}22,transparent 70%);top:-20px;right:-20px;"></div>
          <div class="port-deco" style="width:60px;height:60px;border:1px solid ${item.accent}22;bottom:40px;right:60px;"></div>
          <div class="port-hover-arrow">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </div>
        </div>
      </div>`;
  }

  function renderPortfolio(filter) {
    const grid = document.getElementById('port-grid');
    const items = filter === 'Todos' ? portfolioItems : portfolioItems.filter(i => i.category === filter);
    grid.style.opacity = '0';
    grid.style.transform = 'translateY(16px)';
    setTimeout(() => {
      grid.innerHTML = items.map(buildCard).join('');
      grid.style.transition = 'opacity .35s ease, transform .35s ease';
      grid.style.opacity = '1';
      grid.style.transform = 'translateY(0)';
      // re-observe new reveal elements
      grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      // re-attach hover cursor listeners
      grid.querySelectorAll('.port-card').forEach(el => {
        el.addEventListener('mouseenter', () => { ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '.5'; });
        el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '1'; });
      });
    }, 200);
  }

  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(cat);
  }

  // initial render
  renderPortfolio('Todos');