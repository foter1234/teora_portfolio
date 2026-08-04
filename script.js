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

  /* ─── INTERRUPTOR DE TEMA ─── */
  (function () {
    const THEME_KEY = 'teora-theme';
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function isLight() { return root.getAttribute('data-theme') === 'light'; }
    function syncLabel() {
      const light = isLight();
      toggle.setAttribute('aria-pressed', String(light));
      toggle.setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
    }
    toggle.addEventListener('click', () => {
      if (isLight()) {
        root.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem(THEME_KEY, 'light');
      }
      syncLabel();
    });
    syncLabel();
  })();

  /* ─── SCROLL REVEAL ─── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ─── PORTFOLIO DATA ─── */
  const portfolioItems = [
    { id: 1, title: 'Solar Tech', category: 'Sites Institucionais', tag: 'Institucional', desc: ' Pare de pagar pela energia. Gere a sua.', bg: 'linear-gradient(135deg,#12100A,#1C180E)', accent: '#D4AF37', url: 'https://site-institucional-solar-tech.vercel.app/', image: 'img/portfolio/img11.png' },
    { id: 2, title: 'Crianças Felizes', category: 'Landing Pages', tag: 'Landing', desc: 'Transformando o futuro das crianças através do amor e da educação', bg: 'linear-gradient(135deg,#1A0508,#280A0C)', accent: '#EF4444', url: 'https://associacaocriancasfelizes.netlify.app/', image: 'img/portfolio/img10.png' },
    { id: 3, title: 'Danilo Lima Advogados ', category: 'Sites Institucionais', tag: 'Institucional', desc: 'Soluções jurídicas seguras para proteger seus direitos e sua família.', bg: 'linear-gradient(135deg,#061A10,#0A2818)', accent: '#e28801', url: 'https://site-advogado-kappa.vercel.app/', image: 'img/portfolio/img14.png' },
    { id: 4, title: 'Renova Clinica Odontologica', category: 'Landing Pages', tag: 'Landing', desc: 'Landing page para clinica odontologica com foco em conversao e agendamento.', bg: 'linear-gradient(135deg,#07141A,#0B2630)', accent: '#22D3EE', url: 'https://renovaclinicaodontologica.com', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779391500/imagem_2026-05-21_152457149_p0cyvx.png' },
    { id: 5, title: 'Advogadas da Saude', category: 'Landing Pages', tag: 'Landing', desc: 'Landing page de advocacia com foco em autoridade e captacao de clientes.', bg: 'linear-gradient(135deg,#160C08,#2B1810)', accent: '#F97316', url: 'https://advogadas-da-saude.vercel.app/', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779391427/imagem_2026-05-21_152342485_hku4lr.png' },
    { id: 6, title: 'Descubra Seu Precatorio', category: 'Landing Pages', tag: 'Landing', desc: 'Analise especializada do seu precatorio com seguranca e transparencia.', bg: 'linear-gradient(135deg,#0C1024,#1A2148)', accent: '#60A5FA', url: 'https://descubraseuprecatorio.com/', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779391883/imagem_2026-05-21_153118454_tktcmx.png' },
    { id: 7, title: 'Almeida e Milani', category: 'Landing Pages', tag: 'Landing', desc: 'Advocacia especializada no direito trabalhista.', bg: 'linear-gradient(135deg,#1A100A,#2E1B12)', accent: '#FB923C', url: 'https://almeidaemilani.com', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779391983/imagem_2026-05-21_153259559_islmxb.png' },
    { id: 8, title: 'Maicon Ambrosim', category: 'Landing Pages', tag: 'Landing', desc: 'Advocacia, assessoria e consultoria juridica.', bg: 'linear-gradient(135deg,#0F111B,#1F263A)', accent: '#38BDF8', url: 'https://site-maicon-ambrosim.vercel.app', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779392193/imagem_2026-05-21_153630433_stflhz.png' },
    { id: 9, title: 'Wekson Lima Agro', category: 'Landing Pages', tag: 'Landing', desc: 'Advogado especializado em dividas do produtor rural.', bg: 'linear-gradient(135deg,#13210F,#25421E)', accent: '#84CC16', url: 'https://site-wekson-lima-agro.vercel.app', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779392986/imagem_2026-05-21_154942589_itozms.png' },
    { id: 10, title: 'Inbracon', category: 'Landing Pages', tag: 'Landing', desc: 'Estruturas Inteligentes para Seu Negócio. Projete a colheita e ganhe espaço com engenharia Inbracon', bg: 'linear-gradient(135deg,#0D0A1E,#1A0F2E)', accent: '#8B5CF6', url: 'https://inbracon.com', image: 'img/portfolio/img9.png' },
    { id: 11, title: 'Teora Agendamentos', category: 'Sistemas/Apps', tag: 'Sistema', desc: 'Prototipo de agendamentos para sua Barbearia ou salão', bg: 'linear-gradient(135deg,#060D1E,#0A1830)', accent: '#00C8FF', url: 'https://teor-agendamentos.vercel.app/', image: 'img/portfolio/img8.png' },
    { id: 12, title: 'Gmartins Refrigeração', category: 'E-commerce', tag: 'E-commerce', desc: 'Agendamentos + loja virtual integrados', bg: 'linear-gradient(135deg,#061612,#0A201C)', accent: '#10B981', url: 'https://gmartinsrefrigeracao.netlify.app', image: 'img/portfolio/img6.png' },
    { id: 13, title: 'lawyer J.S', category: 'Landing Pages', tag: 'Landing', desc: 'Landing page para servicos juridicos de advocacia internacional.', bg: 'linear-gradient(135deg,#111827,#1F3A5F)', accent: '#60A5FA', url: 'https://j-smith-esq-site.vercel.app', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779392922/imagem_2026-05-21_154837164_hbfn3h.png' },
    { id: 14, title: '36° Corrida do Trabalhador', category: 'Sistemas/Apps', tag: 'Sistema', desc: 'Jogo da memoria interativo da 36 Corrida do Trabalhador.', bg: 'linear-gradient(135deg,#0A1020,#1A2B55)', accent: '#22C55E', url: 'https://corridadotrabalhador.vercel.app/', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779392405/imagem_2026-05-21_154001727_nzof25.png' },
    { id: 15, title: 'Estetica Premium (EXP)', category: 'Landing Pages', tag: 'Landing', desc: 'Landing page de estetica com foco em autoridade e conversao.', bg: 'linear-gradient(135deg,#20101A,#3A1E31)', accent: '#F472B6', url: 'https://site-exemplo-estetico.netlify.app', image: 'https://res.cloudinary.com/dg9cpkold/image/upload/v1779393804/imagem_2026-05-21_160319201_ps5yn1.png' }
    
  ];

function buildCard(item) {
  return `
    <div class="port-card reveal" data-cat="${item.category}" style="animation:fadeUp .45s ease both;">
      <a class="port-inner" href="${item.url}" target="_blank" rel="noopener" aria-label="Abrir projeto ${item.title}" style="background:${item.bg};">

        <div class="port-bg" style="background-image: url('${item.image}')"></div>
        
        <div class="port-top">
          <span class="port-tag" style="background:${item.accent}18;color:${item.accent};border:1px solid ${item.accent}33;">${item.tag}</span>
          <span class="port-num">${String(item.id).padStart(2,'0')}</span>
        </div>

        <div class="port-bottom">
          <div class="port-title">${item.title}</div>
          <div class="port-desc">${item.desc}</div>
        </div>

        <div class="port-deco" style="width:120px;height:120px;background:radial-gradient(circle,${item.accent}22,transparent 70%);top:-20px;right:-20px;"></div>
        <div class="port-deco" style="width:60px;height:60px;border:1px solid ${item.accent}22;bottom:40px;right:60px;"></div>

        <span class="port-hover-arrow" aria-hidden="true">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </span>
      </a>
    </div>
  `;
}

  const INITIAL_PORTFOLIO_VISIBLE = 6;
  let currentPortfolioFilter = 'Todos';
  let visiblePortfolioCount = INITIAL_PORTFOLIO_VISIBLE;

  function getFilteredPortfolioItems(filter) {
    return filter === 'Todos' ? portfolioItems : portfolioItems.filter(i => i.category === filter);
  }

  function updateShowMoreButton(totalItems) {
    const showMoreBtn = document.getElementById('portfolio-show-more');
    if (!showMoreBtn) return;
    if (totalItems <= INITIAL_PORTFOLIO_VISIBLE) {
      showMoreBtn.style.display = 'none';
      return;
    }
    showMoreBtn.style.display = 'inline-flex';
    const isExpanded = visiblePortfolioCount >= totalItems;
    showMoreBtn.textContent = isExpanded ? 'Ver menos' : 'Ver mais';
  }

  function renderPortfolio(filter) {
    const grid = document.getElementById('port-grid');
    const filteredItems = getFilteredPortfolioItems(filter);
    const items = filteredItems.slice(0, visiblePortfolioCount);
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
      updateShowMoreButton(filteredItems.length);
    }, 200);
  }

  function togglePortfolioVisibility() {
    const totalItems = getFilteredPortfolioItems(currentPortfolioFilter).length;
    const isExpanded = visiblePortfolioCount >= totalItems;
    visiblePortfolioCount = isExpanded ? INITIAL_PORTFOLIO_VISIBLE : totalItems;
    renderPortfolio(currentPortfolioFilter);
    if (isExpanded) {
      document.getElementById('portfolio-show-more').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function filterPortfolio(cat, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPortfolioFilter = cat;
    visiblePortfolioCount = INITIAL_PORTFOLIO_VISIBLE;
    renderPortfolio(cat);
  }

  const showMoreBtn = document.getElementById('portfolio-show-more');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', togglePortfolioVisibility);
  }

  // initial render
  renderPortfolio(currentPortfolioFilter);