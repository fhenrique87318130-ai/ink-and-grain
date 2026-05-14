export type Category =
  | "Tecnologia"
  | "Desenvolvimento"
  | "Design"
  | "Marketing"
  | "Produtividade"
  | "Negócios";

export const CATEGORIES: Category[] = [
  "Tecnologia",
  "Desenvolvimento",
  "Design",
  "Marketing",
  "Produtividade",
  "Negócios",
];

export interface Article {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  author: string;
  date: string; // ISO
  readMinutes: number;
  hero: string; // image URL
  body: string[]; // paragraphs
  featured?: boolean;
}

const img = (seed: string, w = 1600, h = 1000) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const ARTICLES: Article[] = [
  {
    slug: "a-era-silenciosa-da-inteligencia-artificial",
    title: "A Era Silenciosa da Inteligência Artificial",
    dek: "Modelos generativos deixaram de ser novidade. Agora são infraestrutura — e isso muda tudo sobre como construímos software.",
    category: "Tecnologia",
    author: "Helena Marques",
    date: "2026-05-12",
    readMinutes: 8,
    hero: img("photo-1677442136019-21780ecad995"),
    featured: true,
    body: [
      "Há um momento curioso em toda revolução tecnológica em que ela se torna invisível. A eletricidade deixou de ser espetáculo quando virou tomada. A internet, quando virou ar. A inteligência artificial, hoje, está atravessando exatamente essa fronteira: deixou de ser manchete para se tornar infraestrutura.",
      "Os modelos generativos que dominaram as conversas em 2023 e 2024 amadureceram. Não há mais o assombro inicial — há contratos, SLAs, latências aceitáveis e custos por token. As empresas que sobreviveram à fase do hype agora resolvem problemas reais: classificação de documentos, atendimento, geração de código auxiliar, síntese de relatórios.",
      "O que isso significa para quem constrói produtos? Significa que o diferencial não está mais em usar IA, mas em saber onde não usar. A maturidade técnica de uma equipe se mede pela disciplina em escolher quando uma regra simples vence um modelo de bilhões de parâmetros.",
      "A próxima década pertencerá a quem dominar essa coreografia silenciosa entre determinismo e probabilidade. E, como toda boa infraestrutura, ninguém vai notar — exceto quando falhar.",
    ],
  },
  {
    slug: "o-renascimento-do-css-puro",
    title: "O Renascimento do CSS Puro",
    dek: "Container queries, cascade layers e :has() reescreveram o que é possível sem JavaScript. Um manifesto para reaprender o navegador.",
    category: "Desenvolvimento",
    author: "Tomás Liu",
    date: "2026-05-09",
    readMinutes: 6,
    hero: img("photo-1517134191118-9d595e4c8c2b"),
    featured: true,
    body: [
      "Por mais de uma década, o CSS foi tratado como um mal necessário — uma camada a ser abstraída por bibliotecas, frameworks, sistemas de design e geradores. Mas algo mudou.",
      "Container queries permitem que componentes respondam ao próprio espaço, não à viewport. Cascade layers oferecem hierarquia explícita sem brigas de especificidade. O seletor :has() trouxe lógica condicional sem JavaScript. Subgrid finalmente permitiu alinhar elementos através de fronteiras de grid.",
      "O resultado: padrões que antes exigiam três bibliotecas e um build step agora cabem em vinte linhas de CSS. A web nativa voltou a ser competitiva — e, em muitos casos, superior.",
      "Reaprender o navegador é o ato técnico mais subversivo de 2026.",
    ],
  },
  {
    slug: "tipografia-como-arquitetura",
    title: "Tipografia como Arquitetura",
    dek: "Por que o jornal impresso continua sendo a melhor aula de design de interface que existe.",
    category: "Design",
    author: "Inês Caldeira",
    date: "2026-05-06",
    readMinutes: 7,
    hero: img("photo-1504711434969-e33886168f5c"),
    featured: true,
    body: [
      "Abra um jornal de domingo. Repare na hierarquia: a manchete domina, o subtítulo orienta, a coluna conduz, a legenda contextualiza. Tudo isso sem um único pixel de animação ou um único pop-up pedindo cookies.",
      "A tipografia jornalística é um sistema operacional inteiro embutido em formas de letra. Ela ensina escala, peso, ritmo, contraste e silêncio. Cada elemento sabe exatamente quanto espaço merece — nada é decorativo por acidente.",
      "Quando projetamos interfaces digitais, esquecemos essa lição. Achamos que precisamos de cores, sombras, gradientes e micro-interações para criar hierarquia. Não precisamos. Precisamos de uma boa serifa, espaço em branco e a coragem de deixar o conteúdo respirar.",
    ],
  },
  {
    slug: "marketing-sem-rastreio",
    title: "Marketing Sem Rastreio",
    dek: "O fim dos cookies de terceiros não é o fim do marketing. É o fim de uma preguiça.",
    category: "Marketing",
    author: "Rafael Soares",
    date: "2026-05-02",
    readMinutes: 5,
    hero: img("photo-1432888622747-4eb9a8efeb07"),
    body: [
      "Por vinte anos, marketing digital significou perseguir usuários pela internet com pixels invisíveis. Era barato, mensurável e moralmente preguiçoso.",
      "Agora, navegadores bloqueiam, regulamentações multam e usuários simplesmente bloqueiam tudo. O modelo quebrou — e isso é a melhor coisa que poderia acontecer.",
      "O retorno ao marketing baseado em conteúdo, comunidade e contexto não é nostalgia. É a única estratégia que ainda funciona quando o rastreamento desaparece.",
    ],
  },
  {
    slug: "a-falsa-promessa-da-produtividade",
    title: "A Falsa Promessa da Produtividade",
    dek: "Aplicativos não te tornam produtivo. Te tornam ocupado. Há uma diferença.",
    category: "Produtividade",
    author: "Clara Veloso",
    date: "2026-04-28",
    readMinutes: 4,
    hero: img("photo-1499750310107-5fef28a66643"),
    body: [
      "Existe uma indústria inteira dedicada a vender a fantasia de que o próximo aplicativo finalmente vai te organizar. Não vai.",
      "Produtividade não é uma ferramenta — é uma decisão sobre o que não fazer. Nenhum app toma essa decisão por você.",
      "O caderno de papel funciona porque tem fricção. A fricção te força a escolher. Esse é o recurso mais subestimado da última década.",
    ],
  },
  {
    slug: "negocios-pequenos-margens-grandes",
    title: "Negócios Pequenos, Margens Grandes",
    dek: "A nova geração de empreendedores rejeita o crescimento a qualquer custo. E está ganhando mais dinheiro.",
    category: "Negócios",
    author: "Diego Ferreira",
    date: "2026-04-24",
    readMinutes: 6,
    hero: img("photo-1454165804606-c3d57bc86b40"),
    body: [
      "Por décadas, ambição foi sinônimo de escala. Quem não queria ser unicórnio era acusado de falta de visão. Esse consenso silencioso ruiu.",
      "Empresas de uma a dez pessoas estão produzindo receitas de sete dígitos com margens que nenhuma startup financiada por venture capital consegue replicar. Sem investidores, sem reuniões, sem demissões em massa.",
      "O segredo é heresia: cobrar caro, atender pouco, escolher bem o cliente. Não é escalável. É lucrativo. E lucro, lembre-se, era o ponto de partida.",
    ],
  },
  {
    slug: "o-codigo-que-ninguem-le",
    title: "O Código Que Ninguém Lê",
    dek: "A maior parte do software do mundo é mantido por pessoas que nunca o escreveram. Boas práticas existem para elas.",
    category: "Desenvolvimento",
    author: "Tomás Liu",
    date: "2026-04-20",
    readMinutes: 5,
    hero: img("photo-1555066931-4365d14bab8c"),
    body: [
      "Escrever código é a parte fácil. Lê-lo, dois anos depois, sob pressão, às três da manhã, sem o autor original disponível — essa é a parte difícil.",
      "Toda decisão de arquitetura, todo padrão, toda convenção existe para servir esse momento. Código clever é código hostil ao próximo humano que vai precisar consertá-lo.",
      "A melhor métrica de qualidade não é cobertura de testes. É o tempo que um desenvolvedor novo leva para fazer sua primeira contribuição útil.",
    ],
  },
  {
    slug: "branding-no-mundo-pos-logo",
    title: "Branding no Mundo Pós-Logo",
    dek: "Marcas deixaram de ser símbolos. Viraram comportamentos.",
    category: "Marketing",
    author: "Inês Caldeira",
    date: "2026-04-15",
    readMinutes: 6,
    hero: img("photo-1611162617474-5b21e879e113"),
    body: [
      "Houve um tempo em que uma marca era um logotipo, uma paleta e um manual de quinhentas páginas. Hoje, uma marca é a soma de cada e-mail de suporte, cada commit de código aberto, cada resposta a uma reclamação no Twitter.",
      "Você não controla mais a sua marca. Você só pode tentar merecê-la, todos os dias.",
    ],
  },
];

export const getArticleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

export const getArticlesByCategory = (category: string) =>
  ARTICLES.filter((a) => a.category.toLowerCase() === category.toLowerCase());

export const getRelated = (slug: string, limit = 3) => {
  const current = getArticleBySlug(slug);
  if (!current) return [];
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category,
  ).slice(0, limit);
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
