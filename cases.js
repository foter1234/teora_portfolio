/* ─────────────────────────────────────────────────────────────────────
   CASES — fonte única de dados dos cases de sucesso.

   Este arquivo alimenta as duas telas:
     • a vitrine da home  (#cases, renderizada por script.js)
     • a página de case   (case.html?c=<slug>, renderizada por case.js)

   Para publicar um case novo, basta adicionar um objeto em TEORA_CASES.
   Nenhum HTML precisa ser escrito à mão.

   ▸ Campos ainda sem conteúdo ficam como '' ou [].
     O renderizador simplesmente NÃO desenha a seção correspondente,
     então a página nunca mostra texto de mentira. Preencha e a seção
     aparece sozinha. Veja o guia no fim do arquivo.
   ───────────────────────────────────────────────────────────────────── */

/* Com false, as seções Resultados e Depoimento simplesmente não aparecem
   enquanto estiverem vazias — nada de "em breve" na página publicada.
   Basta preencher `results` / `testimonial` num case e a seção volta
   sozinha, sem precisar mexer aqui. */
const CASE_PLACEHOLDERS = false;

/* accent: triplete RGB (usado como rgb(var(--case-accent) / .3) no CSS).
   O hex vai no comentário só para leitura humana. */
const TEORA_CASES = [
  {
    slug: 'the-killa',
    name: 'The Killa',
    client: 'The Killa',
    category: 'Marca de Roupas',
    segment: 'Streetwear',
    accent: '224 169 58',            /* #E0A93A — âmbar da arte da garrafa */

    summary: 'Marca de streetwear construída do símbolo à peça vestida: identidade, arte autoral em serigrafia e todo o material de lançamento da coleção.',

    lead: 'Camiseta oversized com estampa exclusiva em serigrafia de alta definição. O trocadilho "The Killa" (Killer + Tequila) ganha forma na arte da garrafa com sombrero e no símbolo da faca — tecido premium, modelagem solta.',

    services: [
      'Branding',
      'Identidade Visual',
      'Marketing',
      'Produção de Conteúdo',
      'Materiais Publicitários'
    ],

    cover: {
      src: 'the_killa/the-killa-lifestyle.jpg',
      alt: 'Camiseta The Killa vestida, estampa frontal com o logo da faca',
      position: 'center 35%'
    },

    /* ── Narrativa do case ───────────────────────────────────────── */
    objective: 'Construir a identidade completa de uma marca de streetwear nova — do símbolo à peça vestida — e produzir o material de divulgação necessário para o lançamento da coleção.',
    problem: '',                     /* ← preencher com o contexto do cliente */
    solution: 'Desenvolvemos o símbolo da faca e a arte autoral da garrafa com sombrero, que traduz o trocadilho do nome. A partir daí montamos o brand board com as aplicações, definimos a serigrafia de alta definição para a camiseta oversized e produzimos o ensaio lifestyle que virou a base de todo o material publicitário.',

    gallery: [
      { src: 'the_killa/the-killa-lifestyle.jpg',   alt: 'Camiseta The Killa vestida, estampa frontal com o logo da faca', w: 688, h: 1425 },
      { src: 'the_killa/the-killa-logo.jpg',        alt: 'Logo The Killa', w: 1024, h: 1536 },
      { src: 'the_killa/the-killa-garrafa.jpg',     alt: 'Arte da garrafa The Killa', w: 1536, h: 1024 },
      { src: 'the_killa/the-killa-tequila.jpg',     alt: 'Ilustração da garrafa de tequila com sombrero, referência do nome The Killa', w: 1122, h: 1402 },
      { src: 'the_killa/the-killa-logo-alt.jpg',    alt: 'Variação do logo The Killa', w: 305, h: 500 },
      { src: 'the_killa/the-killa-brandboard.jpg',  alt: 'Brand board The Killa: símbolos, aplicação nas camisetas oversized e lifestyle', w: 1200, h: 960 }
    ],

    videos: [],
    beforeAfter: null,
    results: [],
    testimonial: null,
    stack: ['Serigrafia de alta definição', 'Ilustração autoral', 'Brand board', 'Ensaio lifestyle'],
    link: null
  },

  {
    slug: 'dieguinho-barbershop',
    name: 'Dieguinho Barbershop',
    client: 'Dieguinho Barbershop',
    category: 'Barbearia',
    segment: 'Beleza masculina',
    accent: '192 112 58',            /* #C0703A — cobre das embalagens */

    summary: 'Fotografia e vídeo de produto para a linha El Baron, com conteúdo pensado peça a peça para alimentar as campanhas de redes sociais.',

    lead: 'Produção completa de imagem para a linha de ceras, gel e balms El Baron — do still de estúdio ao vídeo de demonstração que mostra o produto em uso.',

    services: [
      'Fotografia Profissional',
      'Filmagem',
      'Produção de Conteúdo',
      'Marketing',
      'Campanhas para Redes Sociais'
    ],

    cover: {
      src: 'barbebaria/el-baron-ceras.jpg',
      alt: 'Ceras modeladoras El Baron alinhadas em estúdio',
      position: 'center'
    },

    objective: 'Dar à linha de produtos um acervo de imagem próprio — fotografia e vídeo — capaz de sustentar as campanhas de redes sociais sem depender de material genérico de fornecedor.',
    problem: '',                     /* ← preencher com o contexto do cliente */
    solution: 'Montamos um ensaio de produto em estúdio, com iluminação desenhada para as embalagens escuras, cobrindo a linha inteira peça a peça. Em seguida gravamos os vídeos de demonstração em formato vertical, prontos para publicação, mostrando textura e aplicação de cada produto.',

    gallery: [
      { src: 'barbebaria/el-baron-ceras.jpg',         alt: 'Ceras modeladoras El Baron', w: 1000, h: 1778 },
      { src: 'barbebaria/el-baron-balm.jpg',          alt: 'Balm para barba El Baron', w: 1000, h: 1778 },
      { src: 'barbebaria/el-baron-cera-for-men.jpg',  alt: 'Cera modeladora El Baron For Men', w: 1000, h: 1777 },
      { src: 'barbebaria/el-baron-cera-black.jpg',    alt: 'Cera Black El Baron, efeito seco', w: 1000, h: 1778 }
    ],

    videos: [
      { src: 'barbebaria/el-baron-demo-cera.mp4', poster: 'barbebaria/el-baron-demo-cera.jpg', label: 'Cera Modeladora',    alt: 'Demonstração da cera modeladora El Baron', w: 720, h: 1278 },
      { src: 'barbebaria/el-baron-demo-gel.mp4',  poster: 'barbebaria/el-baron-demo-gel.jpg',  label: 'Gel Cera Hidratante', alt: 'Demonstração do gel cera hidratante El Baron', w: 478, h: 850 }
    ],

    beforeAfter: null,
    results: [],
    testimonial: null,
    stack: ['Still de produto', 'Iluminação de estúdio', 'Vídeo vertical 9:16', 'Edição para redes'],
    link: null
  },

  {
    slug: 'eventos',
    name: 'Eventos',
    client: 'Cobertura de eventos',
    category: 'Cobertura de Eventos',
    segment: 'Ativação de marca',
    accent: '0 200 255',             /* #00C8FF — ciano do totem Teora */

    summary: 'Cobertura completa de ativações presenciais: totem interativo, cabine de fotos e o registro em foto e vídeo que alimenta as redes durante e depois do evento.',

    lead: 'Da montagem do totem interativo ao corte final publicado — cobrimos a 36ª Corrida do Trabalhador, ações solidárias e ativações com cabine de fotos personalizada.',

    services: [
      'Fotografia',
      'Filmagem',
      'Edição',
      'Conteúdo para Redes Sociais',
      'Cobertura Completa'
    ],

    cover: {
      src: 'eventos/evento-corrida.jpg',
      alt: 'Totem interativo Teora Solutions na 36ª Corrida do Trabalhador',
      position: 'center 40%'
    },

    objective: 'Transformar a presença física em conteúdo: garantir que cada ativação gere registro suficiente — foto e vídeo — para sustentar a comunicação do evento nas redes.',
    problem: '',                     /* ← preencher com o contexto do cliente */
    solution: 'Levamos o totem interativo e a cabine de fotos com moldura personalizada para o local e cobrimos o evento inteiro em foto e vídeo. O material é editado em formato vertical e entregue pronto para publicação, incluindo os registros do público interagindo com a ativação.',

    gallery: [
      { src: 'eventos/evento-corrida-3.jpg', alt: 'Totem interativo Teora Solutions montado na 36ª Corrida do Trabalhador', w: 719, h: 1600 },
      { src: 'eventos/evento-acao-solidaria-cover.jpg', alt: 'Público usando o totem interativo no 4º Costelão Solidário', w: 719, h: 1600 },
      { src: 'eventos/evento-photobooth.jpg', alt: 'Cabine de fotos com moldura personalizada e logos dos patrocinadores', w: 576, h: 1024 },
      { src: 'eventos/evento-corrida.jpg', alt: 'Participante interagindo com o totem durante a corrida', w: 720, h: 1280 },
      { src: 'eventos/evento-corrida-4.jpg', alt: 'Público reunido ao redor do totem na 36ª Corrida do Trabalhador', w: 610, h: 1084 }
    ],

    videos: [
      { src: 'eventos/evento-corrida.mp4', poster: 'eventos/evento-corrida-capa.jpg', alt: 'Totem interativo na 36ª Corrida do Trabalhador', label: '36ª Corrida do Trabalhador', w: 720, h: 1280 },
      { src: 'eventos/evento-acao-solidaria.mp4', poster: 'eventos/evento-acao-solidaria-capa.jpg', alt: 'Totem interativo no 4º Costelão Solidário', label: 'Ação Solidária', w: 720, h: 1280 },
      { src: 'eventos/evento-photobooth.mp4', poster: 'eventos/evento-photobooth-capa.jpg', alt: 'Cabine de fotos em uso, com moldura personalizada', label: 'Cabine de Fotos', w: 576, h: 1024 }
    ],

    beforeAfter: null,
    results: [],
    testimonial: null,
    stack: ['Totem interativo', 'Cabine de fotos', 'Moldura personalizada', 'Edição vertical'],
    link: 'https://corridadotrabalhador.vercel.app/',
    linkLabel: 'Ver o jogo interativo do evento'
  },

  {
    slug: 'maicon-ambrosim',
    name: 'Maicon Ambrosim',
    client: 'Maicon Ambrosim Advocacia',
    category: 'Advocacia',
    segment: 'Assessoria e consultoria jurídica',
    accent: '203 178 118',           /* #CBB276 — dourado exato do logotipo */

    summary: 'Identidade visual completa para um escritório de advocacia — do logotipo à landing page — somada ao vídeo institucional e ao conteúdo de divulgação.',

    lead: 'Escritório de advocacia, assessoria e consultoria jurídica. Construímos a marca em preto e dourado, aplicamos em toda a comunicação digital e produzimos o retrato institucional e a animação do logotipo.',

    services: [
      'Marketing',
      'Identidade Visual',
      'Materiais Digitais',
      'Conteúdo para Divulgação'
    ],

    cover: {
      src: 'maicon-ambrosim/maicon-lifestyle-1.jpg',
      alt: 'Retrato institucional de Maicon Ambrosim',
      position: 'center 25%'
    },

    objective: 'Dar ao escritório uma marca à altura do posicionamento — sóbria, com autoridade — e levá-la de forma consistente para todos os pontos digitais de contato com o cliente.',
    problem: '',                     /* ← preencher com o contexto do cliente */
    solution: 'Desenhamos o logotipo em preto e dourado com as duas versões de aplicação (fundo claro e fundo escuro), estendemos o sistema para a landing page e produzimos o material de vídeo: o retrato institucional e a animação da marca usada nas aberturas de conteúdo.',

    gallery: [
      { src: 'maicon-ambrosim/maicon-logo-black-gold.jpg', alt: 'Logotipo Maicon Ambrosim Advocacia, versão preta e dourada', w: 1100, h: 799 },
      { src: 'maicon-ambrosim/maicon-logo-gold-black.jpg', alt: 'Logotipo Maicon Ambrosim Advocacia, versão dourada e preta', w: 1100, h: 733 },
      { src: 'maicon-ambrosim/maicon-site.jpg',            alt: 'Landing page Maicon Ambrosim Advocacia, seção inicial', w: 1580, h: 779 }
    ],

    videos: [
      { src: 'maicon-ambrosim/maicon-logo-animacao.mp4', poster: 'maicon-ambrosim/maicon-logo-animacao.jpg', alt: 'Animação do logotipo Maicon Ambrosim',                 label: 'Animação da Marca', w: 1280, h: 720 },
      { src: 'maicon-ambrosim/maicon-lifestyle-1.mp4',   poster: 'maicon-ambrosim/maicon-lifestyle-1.jpg',   alt: 'Retrato institucional Maicon Ambrosim',  label: 'Retrato', w: 784, h: 1116 }
    ],

    beforeAfter: null,
    results: [],
    testimonial: null,
    stack: ['Logotipo e variações', 'Landing page', 'Motion da marca', 'Retrato institucional'],
    link: 'https://site-maicon-ambrosim.vercel.app',
    linkLabel: 'Ver a landing page no ar'
  }
];

/* ─────────────────────────────────────────────────────────────────────
   ÍCONES DE SERVIÇO
   Um registro só, consultado pela vitrine e pela página de case.
   O texto do serviço é normalizado (sem acento, minúsculo) e casado por
   palavra-chave — serviços novos caem no ícone padrão sem quebrar nada.
   ───────────────────────────────────────────────────────────────────── */
const CASE_ICON_PATHS = {
  branding:   '<path d="M12 3l2.1 5.4L19.5 10.5l-5.4 2.1L12 18l-2.1-5.4L4.5 10.5l5.4-2.1z"/>',
  identidade: '<path d="M12 3L3 7.5l9 4.5 9-4.5z"/><path d="M3 16.5l9 4.5 9-4.5"/><path d="M3 12l9 4.5 9-4.5"/>',
  marketing:  '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  conteudo:   '<path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M15 4v5h5"/><path d="M7 13h9M7 17h6"/>',
  impresso:   '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
  foto:       '<path d="M22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-3h6l2 3h3a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="3.5"/>',
  video:      '<path d="M22 8l-6 4 6 4V8z"/><path d="M2 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>',
  edicao:     '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/>',
  social:     '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.4 13.3l7.2 4.2M15.6 6.5L8.4 10.7"/>',
  cobertura:  '<circle cx="12" cy="12" r="3"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 17.7a8 8 0 0 0 0-11.4"/><path d="M3.5 3.5a12 12 0 0 0 0 17M20.5 20.5a12 12 0 0 0 0-17"/>',
  digital:    '<path d="M3 4h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 20h8M12 16v4"/>',
  padrao:     '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>'
};

/* palavra-chave encontrada no nome do serviço → chave do ícone acima */
const CASE_ICON_RULES = [
  ['branding',      'branding'],
  ['identidade',    'identidade'],
  ['marketing',     'marketing'],
  ['publicitario',  'impresso'],
  ['publicitaria',  'impresso'],
  ['material',      'impresso'],
  ['materiais digitais', 'digital'],
  ['digitais',      'digital'],
  ['fotografia',    'foto'],
  ['foto',          'foto'],
  ['filmagem',      'video'],
  ['video',         'video'],
  ['edicao',        'edicao'],
  ['redes sociais', 'social'],
  ['divulgacao',    'marketing'],
  ['cobertura',     'cobertura'],
  ['conteudo',      'conteudo'],
  ['producao',      'conteudo']
];

/* remove acentos e caixa para o casamento por palavra-chave */
function caseNormalize(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function caseIconFor(service) {
  const key = caseNormalize(service);
  const rule = CASE_ICON_RULES.find(([needle]) => key.includes(needle));
  return CASE_ICON_PATHS[rule ? rule[1] : 'padrao'];
}

/* <svg> de um serviço, pronto para injetar */
function caseIconSVG(service) {
  return `<svg class="case-tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${caseIconFor(service)}</svg>`;
}

/* lista de tags de serviço — mesma marcação na vitrine e no case */
function caseTagsHTML(services, extraClass = '') {
  return services
    .map(s => `<li class="case-tag ${extraClass}">${caseIconSVG(s)}<span>${s}</span></li>`)
    .join('');
}

/* quantas peças (fotos + vídeos) o case tem — usado como prova de volume */
function casePieceCount(item) {
  return item.gallery.length + item.videos.length;
}

function caseBySlug(slug) {
  return TEORA_CASES.find(c => c.slug === slug) || null;
}

function caseURL(slug) {
  return `case.html?c=${encodeURIComponent(slug)}`;
}

/* ─────────────────────────────────────────────────────────────────────
   COMO PREENCHER O QUE AINDA ESTÁ VAZIO

   problem:     'texto'                       → abre o bloco "O desafio"
   results:     [{ value: '+120%', label: 'Alcance no Instagram' }, …]
                                              → abre o bloco "Resultados"
   testimonial: { quote: '…', author: 'Nome', role: 'Cargo, Empresa' }
                                              → abre o bloco "Depoimento"
   beforeAfter: { before: { src, alt }, after: { src, alt }, label: '…' }
                                              → abre o comparador arrastável
   link:        'https://…'  +  linkLabel: 'Ver no ar'
                                              → abre o botão secundário

   Enquanto estiverem vazios, results e testimonial mostram um placeholder
   discreto (CASE_PLACEHOLDERS = true no topo) e os demais somem da página.
   ───────────────────────────────────────────────────────────────────── */
