export const SITE_URL = "https://kittyflowers.pt";

export const CONTACT = {
  phoneDisplay: "+351 931 420 039",
  phoneHref: "tel:+351931420039",
  whatsapp: `https://wa.me/351931420039?text=${encodeURIComponent(
    "Olá Kitty Flowers! 🌸 Vi o vosso site e gostava de encomendar um buquê."
  )}`,
  instagram: "https://instagram.com/kittyflowers20",
  instagramHandle: "@kittyflowers20",
  facebook: "https://facebook.com/larissa.cambaza",
  facebookName: "Larissa Cambaza",
  location: "Lisboa — Prior Velho",
} as const;

export const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#criacoes", label: "Criações" },
  { href: "#como-encomendar", label: "Como Encomendar" },
  { href: "#faq", label: "FAQ" },
] as const;

export interface Product {
  src: string;
  name: string;
  alt: string;
  tag: string;
}

export const PRODUCTS: Product[] = [
  {
    src: "/images/bouquet-pink-purple.webp",
    name: "Buquê Rosa & Lilás",
    alt: "Buquê de rosas eternas de cetim em tons de rosa e lilás",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/bouquet-pink-cream.webp",
    name: "Buquê Rosa & Champanhe",
    alt: "Buquê de rosas eternas rosa e champanhe embrulhado em papel branco",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/bouquet-red-glitter-butterfly.webp",
    name: "Rosas Glitter com Borboleta",
    alt: "Buquê de rosas vermelhas com glitter e borboleta dourada",
    tag: "Edição Especial",
  },
  {
    src: "/images/box-ferrero-heart.webp",
    name: "Coração Ferrero & Rosas",
    alt: "Caixa em forma de coração com rosas vermelhas, Ferrero Rocher e borboletas douradas",
    tag: "Caixa Doce",
  },
  {
    src: "/images/bouquet-blue-pearls.webp",
    name: "Rosas Azuis com Pérolas",
    alt: "Buquê de rosas eternas azuis com pérolas em embrulho branco e dourado",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/bouquet-darkred-glitter.webp",
    name: "Bordô Glitter",
    alt: "Buquê de rosas bordô com glitter em embrulho preto e dourado",
    tag: "Edição Especial",
  },
  {
    src: "/images/box-kinder-heart.webp",
    name: "Coração Kinder Bueno",
    alt: "Caixa coração vermelha com rosas e chocolates Kinder Bueno",
    tag: "Caixa Doce",
  },
  {
    src: "/images/bouquet-redwhite-garden.webp",
    name: "Vermelho & Branco",
    alt: "Buquê de rosas eternas vermelhas com rosa branca ao centro",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/box-teddy-balloons.webp",
    name: "Caixa Ursinho & Balões",
    alt: "Caixa coração com rosas, ursinho de peluche vermelho e balões",
    tag: "Edição Especial",
  },
  {
    src: "/images/bouquet-red-glitter.webp",
    name: "Rosas Vermelhas Glitter",
    alt: "Buquê de rosas vermelhas brilhantes em embrulho preto",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/box-gift-twix.webp",
    name: "Caixa Presente Twix",
    alt: "Caixa presente com rosas glitter, chocolates Twix e laço bordô",
    tag: "Caixa Doce",
  },
  {
    src: "/images/bouquet-mini-darkred.webp",
    name: "Mini Bordô com Borboleta",
    alt: "Mini buquê de rosas bordô com borboleta dourada e laço vermelho",
    tag: "Mini Buquê",
  },
  {
    src: "/images/box-heart-kitty.webp",
    name: "Caixa Coração Ferrero",
    alt: "Caixa coração Kitty Flowers com rosas vermelhas e Ferrero Rocher",
    tag: "Caixa Doce",
  },
  {
    src: "/images/bouquet-red-classic.webp",
    name: "Clássico Vermelho",
    alt: "Buquê clássico de rosas vermelhas de cetim em embrulho preto e dourado",
    tag: "Buquê Eterno",
  },
  {
    src: "/images/bouquet-redwhite-mini.webp",
    name: "Mini Vermelho & Branco",
    alt: "Mini buquê de rosas vermelhas com rosa branca em embrulho rosa",
    tag: "Mini Buquê",
  },
  {
    src: "/images/bouquet-duo-black-wrap.webp",
    name: "Dueto Vermelho",
    alt: "Par de buquês de rosas vermelhas em embrulho preto com borboleta dourada",
    tag: "Edição Especial",
  },
  {
    src: "/images/bouquet-pink-mini.webp",
    name: "Mini Buquê Rosa",
    alt: "Mini buquê de rosas eternas rosa e champanhe com fita de cetim",
    tag: "Mini Buquê",
  },
];

export const COLLECTIONS = [
  {
    src: "/images/bouquet-pink-purple.webp",
    title: "Buquês Eternos",
    description:
      "Rosas de cetim dobradas à mão, em qualquer cor, com embrulho premium e laço a condizer. Do mini buquê ao formato XXL.",
    alt: "Buquê de rosas eternas rosa e lilás",
  },
  {
    src: "/images/box-ferrero-heart.webp",
    title: "Caixas Doces",
    description:
      "Corações e caixas presente que juntam rosas eternas a Ferrero Rocher, Kinder Bueno ou Twix. Amor e chocolate na mesma caixa.",
    alt: "Caixa coração com rosas e chocolates Ferrero Rocher",
  },
  {
    src: "/images/bouquet-red-glitter-butterfly.webp",
    title: "Edições Especiais",
    description:
      "Glitter, pérolas, borboletas douradas, ursinhos e balões — detalhes que transformam um presente num momento inesquecível.",
    alt: "Rosas vermelhas com glitter e borboleta dourada",
  },
] as const;

export const STEPS = [
  {
    title: "Escolhe a inspiração",
    description:
      "Espreita as nossas criações e escolhe as cores, o tamanho e os extras que combinam com a ocasião.",
  },
  {
    title: "Fala connosco",
    description:
      "Envia DM no Instagram ou mensagem no WhatsApp com a tua ideia. Personalizamos tudo contigo e enviamos o orçamento.",
  },
  {
    title: "Recebe com amor",
    description:
      "Entregamos em Lisboa e arredores, ou podes levantar em Prior Velho. Pronto a oferecer — e a durar para sempre.",
  },
] as const;

export const BENEFITS = [
  {
    icon: "infinity",
    title: "Nunca murcham",
    description: "Beleza que fica para sempre, sem água nem cuidados.",
  },
  {
    icon: "palette",
    title: "Personalização total",
    description: "Cores, tamanhos, chocolates e dedicatórias à tua medida.",
  },
  {
    icon: "hand-heart",
    title: "Feito à mão",
    description: "Cada pétala dobrada com carinho — cada peça é única.",
  },
  {
    icon: "gift",
    title: "Todas as ocasiões",
    description: "Aniversários, pedidos, datas especiais ou “só porque sim”.",
  },
] as const;

export const FAQS = [
  {
    question: "Quanto tempo duram as rosas eternas?",
    answer:
      "Para sempre! As nossas rosas são feitas de cetim, por isso não murcham nem precisam de água. Basta protegê-las do pó e da humidade para ficarem impecáveis durante anos.",
  },
  {
    question: "Como faço uma encomenda?",
    answer:
      "É simples: envia-nos uma DM no Instagram @kittyflowers20 ou uma mensagem no WhatsApp com a tua ideia. Respondemos com sugestões, prazos e orçamento sem compromisso.",
  },
  {
    question: "Posso personalizar cores e chocolates?",
    answer:
      "Claro! Escolhes as cores das rosas, o embrulho, o laço e os chocolates (Ferrero Rocher, Kinder Bueno, Twix...). Também podes juntar borboletas douradas, pérolas e uma dedicatória.",
  },
  {
    question: "Fazem entregas?",
    answer:
      "Sim, entregamos em Lisboa e arredores. Se preferires, também podes levantar a tua encomenda em Prior Velho.",
  },
  {
    question: "Com quanta antecedência devo encomendar?",
    answer:
      "O ideal são 3 a 5 dias, para criarmos tudo com calma e detalhe. Em datas especiais como o Natal ou o Dia dos Namorados, quanto mais cedo melhor!",
  },
] as const;
