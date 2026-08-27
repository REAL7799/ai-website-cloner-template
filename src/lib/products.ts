import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "bolo-aniversario-azul",
    name: "Bolo Aniversário Azul Céu",
    description:
      "Buttercream azul sedoso, drip de chocolate branco, suspiros e pérolas prateadas.",
    price: "32,00 €",
    category: "bolos",
    image: "/images/bolo-aniversario-azul.webp",
    imageAlt: "Bolo de aniversário azul com drip branco e suspiros",
    badge: "Mais pedido",
  },
  {
    id: "bolo-casamento",
    name: "Bolo de Casamento Elegance",
    description:
      "Três andares em fondant branco com cascata de flores de açúcar em azul empoeirado.",
    price: "desde 150 €",
    category: "bolos",
    image: "/images/bolo-casamento.webp",
    imageAlt: "Bolo de casamento branco de três andares com flores azuis",
  },
  {
    id: "bolo-chocolate",
    name: "Bolo de Chocolate Belga",
    description:
      "Camadas húmidas de chocolate negro, ganache brilhante e raspas belgas.",
    price: "28,00 €",
    category: "bolos",
    image: "/images/bolo-chocolate.webp",
    imageAlt: "Bolo de chocolate belga com ganache e uma fatia cortada",
  },
  {
    id: "naked-cake",
    name: "Naked Cake de Baunilha",
    description:
      "Camadas de pão de ló à vista, mirtilos frescos e flores brancas naturais.",
    price: "30,00 €",
    category: "bolos",
    image: "/images/naked-cake.webp",
    imageAlt: "Naked cake de baunilha com mirtilos e flores brancas",
  },
  {
    id: "bolo-cenoura",
    name: "Bolo de Cenoura & Noz",
    description:
      "Receita da avó com cobertura de queijo creme e nozes caramelizadas.",
    price: "22,00 €",
    category: "bolos",
    image: "/images/bolo-cenoura.webp",
    imageAlt: "Bolo de cenoura com cobertura de queijo creme e nozes",
  },
  {
    id: "tarte-limao",
    name: "Tarte de Limão Merengada",
    description:
      "Curd de limão fresco e picos de merengue tostado sobre massa amanteigada.",
    price: "20,00 €",
    category: "tartes",
    image: "/images/tarte-limao.webp",
    imageAlt: "Tarte de limão com merengue tostado",
    badge: "Favorita",
  },
  {
    id: "tarte-amendoa",
    name: "Tarte de Amêndoa",
    description:
      "Amêndoa laminada caramelizada sobre recheio tradicional português.",
    price: "18,00 €",
    category: "tartes",
    image: "/images/tarte-amendoa.webp",
    imageAlt: "Tarte de amêndoa caramelizada com uma fatia cortada",
  },
  {
    id: "tarte-frutos-silvestres",
    name: "Tarte de Frutos Silvestres",
    description:
      "Creme de baunilha coberto com mirtilos, amoras e groselhas brilhantes.",
    price: "23,00 €",
    category: "tartes",
    image: "/images/tarte-frutos-silvestres.webp",
    imageAlt: "Tarte de frutos silvestres com creme de baunilha",
  },
  {
    id: "cheesecake-mirtilo",
    name: "Cheesecake de Mirtilo",
    description:
      "Cremoso, com compota caseira de mirtilo e base de bolacha crocante.",
    price: "24,00 €",
    category: "especialidades",
    image: "/images/cheesecake-mirtilo.webp",
    imageAlt: "Cheesecake cremoso com compota de mirtilo",
  },
  {
    id: "pasteis-de-nata",
    name: "Pastéis de Nata (cx. 6)",
    description:
      "Massa folhada estaladiça, creme caramelizado e um toque de canela.",
    price: "9,00 €",
    category: "especialidades",
    image: "/images/pasteis-de-nata.webp",
    imageAlt: "Seis pastéis de nata com topo caramelizado",
    badge: "Tradição",
  },
];

export const categories = [
  { id: "todos", label: "Todos" },
  { id: "bolos", label: "Bolos" },
  { id: "tartes", label: "Tartes" },
  { id: "especialidades", label: "Especialidades" },
] as const;
