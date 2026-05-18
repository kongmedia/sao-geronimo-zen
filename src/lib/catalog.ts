export type Category = {
  slug: string;
  name: string;
  blurb: string;
  subcategories?: string[];
};

export const categories: Category[] = [
  { slug: "imagens-religiosas", name: "Imagens Religiosas", blurb: "Esculturas que ancoram a devoção.", subcategories: ["Santos","Bruxas","Deuses Gregos","Budas","Magos","Fadas","Duendes","Índios","Xamãs","Egípcios","Hindus"] },
  { slug: "incensos", name: "Incensos", blurb: "Fumaças que abrem caminhos.", subcategories: ["Varetas","Cascata","Cones","Defumação","Porta-incensos"] },
  { slug: "velas", name: "Velas", blurb: "A chama que silencia a mente.", subcategories: ["Perfumadas","Ritualísticas","Consagradas","Decorativas"] },
  { slug: "cristais-e-pedras", name: "Cristais e Pedras", blurb: "Geometrias vivas da terra.", subcategories: ["Roladas","Brutas","Árvores","Lapidadas","Muranos","Pirâmides"] },
  { slug: "difusores", name: "Difusores e Aromatizadores", blurb: "Ambientes em estado de oração." },
  { slug: "livros-espirituais", name: "Livros Espirituais", blurb: "Vozes antigas, leitura nova." },
  { slug: "decoracao-mistica", name: "Decoração Mística", blurb: "Objetos que carregam intenção.", subcategories: ["Espelhos","Caracóis","Adornos","Altares","Fontes"] },
  { slug: "sinos-dos-ventos", name: "Sinos dos Ventos", blurb: "Som suave, energia em movimento." },
  { slug: "fontes", name: "Fontes", blurb: "Água como ritual sensorial." },
  { slug: "baralhos", name: "Baralhos", blurb: "Cartas que dialogam com o invisível.", subcategories: ["Tarot","Cigano","Oráculos"] },
  { slug: "pendulos", name: "Pêndulos", blurb: "Movimento que escuta." },
  { slug: "casticais", name: "Castiçais", blurb: "Esculturas para a luz." },
  { slug: "altares", name: "Altares e Capelas", blurb: "Espaço sagrado em qualquer casa." },
  { slug: "catolicos", name: "Produtos Católicos", blurb: "Tradição em cada detalhe.", subcategories: ["Escapulários","Terços","Medalhas","Crucifixos"] },
  { slug: "esotericos", name: "Produtos Esotéricos", blurb: "Ferramentas para o invisível." },
  { slug: "feng-shui", name: "Feng Shui", blurb: "Equilíbrio em cada canto." },
  { slug: "hindus", name: "Produtos Hindus", blurb: "Cores e símbolos do Oriente." },
  { slug: "budas", name: "Budas", blurb: "Serenidade esculpida." },
  { slug: "bruxas-e-magos", name: "Bruxas e Magos", blurb: "A magia como linguagem." },
  { slug: "oraculos", name: "Oráculos", blurb: "Símbolos como mapas." },
  { slug: "tarot", name: "Tarot", blurb: "Arquétipos em arte." },
  { slug: "umbanda", name: "Umbanda", blurb: "Raízes que iluminam." },
  { slug: "zen", name: "Decoração Zen", blurb: "Menos é mais — e mais sagrado." },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  premium?: boolean;
};

const p = (id: string, name: string, price: number, category: string, description: string, rating = 4.8, premium = false): Product =>
  ({ id, name, price, category, description, rating, premium });

export const products: Product[] = [
  p("inc-cascata-01", "Incensário Cascata Onírico", 189, "incensos", "Cerâmica fosca artesanal para incensos cascata. A fumaça desce em véu sobre montanhas esculpidas.", 4.9, true),
  p("filtro-01", "Filtro dos Sonhos Lua Cheia", 149, "decoracao-mistica", "Anel dourado, penas naturais e cristal central. Suspenso, parece flutuar."),
  p("sino-01", "Sino dos Ventos Latão Polido", 229, "sinos-dos-ventos", "Cinco tubos afinados em escala pentatônica. Som limpo, ressonância longa.", 4.9, true),
  p("olho-01", "Olho Grego em Vidro Soprado", 79, "esotericos", "Proteção tradicional em camadas de azul cobalto e branco gelo."),
  p("arvore-01", "Árvore de Pedras Quartzo Rosa", 269, "cristais-e-pedras", "Galhos de cobre revestido, base em quartzo bruto, copa em pedras roladas.", 4.8, true),
  p("cast-vidro-01", "Castiçal de Vidro Catedral", 159, "casticais", "Vidro maciço fundido com bolhas controladas. Lente para a chama."),
  p("cast-metal-01", "Castiçal Metálico Vertical", 139, "casticais", "Linhas brutalistas em latão envelhecido. Para velas pilar."),
  p("dif-01", "Difusor Sândalo & Mirra", 199, "difusores", "Edição São Gerônimo. Notas amadeiradas e resinas sagradas."),
  p("aro-01", "Aromatizador Elétrico Névoa", 349, "difusores", "Vapor frio ultrassônico, luz quente regulável.", 4.9, true),
  p("buda-01", "Buda Sereno em Resina Pedra", 219, "budas", "Acabamento mineral, postura dhyana mudra."),
  p("indio-01", "Xamã Índio Esculpido", 289, "imagens-religiosas", "Cocar em camadas, pintado à mão.", 4.8, true),
  p("pend-01", "Pêndulo Ametista Facetada", 119, "pendulos", "Corrente em prata 925, ponta lapidada."),
  p("penta-01", "Pentagrama em Aço Escovado", 89, "esotericos", "Para altares ou parede. Aço inoxidável com pátina suave."),
  p("mur-01", "Murano Coleção Aurora", 179, "cristais-e-pedras", "Vidro italiano com infusão de ouro. Peça única."),
  p("vela-rit-01", "Vela Ritualística Trindade Dourada", 99, "velas", "Cera de soja perfumada com olíbano, mirra e benjoim.", 4.9, true),
  p("lotus-01", "Porta-velas Flor de Lótus", 109, "velas", "Pétalas em metal recortado, brilho ambarino na chama."),
  p("dragao-01", "Incensário Dragão Oriental", 169, "incensos", "Liga metálica patinada, fumaça pela boca."),
  p("ele-01", "Incensário Elefante Sagrado", 159, "incensos", "Inspiração indiana, base perfurada."),
  p("coruja-01", "Incensário Coruja Guardiã", 149, "incensos", "Olhos em pedra natural."),
  p("cig-01", "Baralho Cigano Premium", 139, "baralhos", "78 cartas com acabamento dourado nas bordas."),
  p("len-01", "Lenormand Edição Noturna", 159, "baralhos", "Capa em linho preto e dourado a quente.", 4.9, true),
  p("tarot-01", "Tarot Rider Reimaginado", 189, "tarot", "Releitura editorial, papel texturizado."),
  p("orac-01", "Oráculo das Luas", 169, "oraculos", "44 cartas com prata reflexiva."),
  p("taca-01", "Taça Ritualística Lua Negra", 129, "esotericos", "Vidro fumê, pé em metal envelhecido."),
  p("font-01", "Fonte Zen Pedra & Bambu", 419, "fontes", "Circulação silenciosa, luz LED âmbar.", 4.9, true),
  p("cap-01", "Capela Oratório Carvalho", 489, "altares", "Madeira maciça, portas espelhadas internas.", 5.0, true),
  p("esc-01", "Escapulário Veludo & Prata", 89, "catolicos", "Cordão em veludo italiano, medalhas em prata 925."),
  p("ter-01", "Terço Ágata Negra", 139, "catolicos", "Contas naturais, cruz em prata patinada."),
  p("med-01", "Medalha São Bento Ouro Velho", 79, "catolicos", "Banho de ouro 18k sobre prata."),
  p("cru-01", "Crucifixo de Parede Madeira & Latão", 229, "catolicos", "Linhas contemporâneas, 60cm."),
  p("esc-esp-01", "Escultura Espiritual Mãos em Prece", 339, "decoracao-mistica", "Cimento queimado fosco.", 4.8, true),
];

export const getProduct = (id: string) => products.find((x) => x.id === id);
export const productsByCategory = (slug: string) => products.filter((x) => x.category === slug);
export const featured = products.filter((x) => x.premium);
export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
