export interface Product {
  name: string;
  description: string;
  price: string;
  highlight?: boolean;
}

export interface Category {
  slug: string;
  title: string;
  intro: string;
  image: CategoryImage;
  products: Product[];
}

export type CategoryImage =
  | "bolo-festa"
  | "bolo-chocolate"
  | "bolo-aniversario"
  | "tarte-frutos"
  | "tarte-amendoa"
  | "pastel-nata"
  | "doces-finos";

export const categories: Category[] = [
  {
    slug: "bolos-de-festa",
    title: "Bolos de Festa",
    intro:
      "Bolos por encomenda para casamentos, batizados e aniversários — desenhados consigo, camada a camada.",
    image: "bolo-festa",
    products: [
      {
        name: "Bolo de casamento (dois andares)",
        description:
          "Recheios à escolha, decoração com flores naturais ou frutos. Prova incluída.",
        price: "desde 120 €",
        highlight: true,
      },
      {
        name: "Bolo de aniversário personalizado",
        description: "Tema, cores e recheio à sua medida. A partir de 10 fatias.",
        price: "desde 38 €",
      },
      {
        name: "Drip cake de chocolate",
        description:
          "Camadas de chocolate húmido, ganache escorrida e frutos vermelhos.",
        price: "desde 42 €",
      },
      {
        name: "Naked cake de frutos",
        description: "Massa amanteigada, chantilly ligeiro e fruta da época.",
        price: "desde 40 €",
      },
    ],
  },
  {
    slug: "bolos-caseiros",
    title: "Bolos Caseiros",
    intro:
      "Os bolos de todos os dias — simples, altos e fofos, como se fazem em casa.",
    image: "bolo-chocolate",
    products: [
      {
        name: "Bolo de chocolate húmido",
        description: "Cacau intenso e cobertura de ganache. O mais pedido.",
        price: "22 €",
        highlight: true,
      },
      {
        name: "Bolo de laranja do Algarve",
        description: "Sumo e raspa de laranja, calda ligeira de citrinos.",
        price: "18 €",
      },
      {
        name: "Bolo de cenoura com noz",
        description: "Especiarias quentes e cobertura de queijo-creme.",
        price: "20 €",
      },
      {
        name: "Bolo mármore",
        description: "Baunilha e cacau em espiral, receita da avó Alice.",
        price: "16 €",
      },
    ],
  },
  {
    slug: "tartes",
    title: "Tartes",
    intro:
      "Massa quebrada estendida à mão e fruta da época — inteiras ou à fatia, todos os dias na vitrine.",
    image: "tarte-frutos",
    products: [
      {
        name: "Tarte de amêndoa",
        description: "Amêndoa laminada tostada sobre caramelo de manteiga.",
        price: "24 € · fatia 3,50 €",
        highlight: true,
      },
      {
        name: "Tarte de frutos vermelhos",
        description: "Creme de pasteleiro e frutos frescos da época.",
        price: "26 € · fatia 3,80 €",
      },
      {
        name: "Tarte de limão merengada",
        description: "Curd de limão de Sintra e merengue maçaricado.",
        price: "24 € · fatia 3,50 €",
      },
      {
        name: "Tarte rústica de maçã",
        description: "Maçã bravo de Esmolfe, canela e massa folhada estaladiça.",
        price: "20 € · fatia 3,20 €",
      },
    ],
  },
  {
    slug: "doces-tradicionais",
    title: "Doces Tradicionais",
    intro:
      "A doçaria portuguesa de sempre, feita com o tempo e o cuidado que ela pede.",
    image: "pastel-nata",
    products: [
      {
        name: "Pastel de nata",
        description: "Massa estaladiça, creme queimado no ponto. Saem quentes às 10h e às 16h.",
        price: "1,40 € · cx. 6 un. 7,80 €",
        highlight: true,
      },
      {
        name: "Toucinho do céu",
        description: "Amêndoa e gema, húmido como manda a tradição conventual.",
        price: "fatia 3,20 €",
      },
      {
        name: "Queijada de requeijão",
        description: "Requeijão fresco de ovelha e um toque de canela.",
        price: "2,20 €",
      },
      {
        name: "Bola de Berlim com creme",
        description: "Massa fofa, açúcar fino e creme de pasteleiro caseiro.",
        price: "2,00 €",
      },
    ],
  },
  {
    slug: "doces-finos",
    title: "Doces Finos & Sobremesas",
    intro:
      "Pequenas doçuras para o café, mesas de festa e presentes com bom gosto.",
    image: "doces-finos",
    products: [
      {
        name: "Macarons (cx. 6)",
        description: "Sabores da semana: framboesa, pistáchio, baunilha e café.",
        price: "12 €",
      },
      {
        name: "Trufas de chocolate negro",
        description: "Chocolate 70%, natas frescas e cacau polvilhado.",
        price: "cx. 9 un. 10 €",
      },
      {
        name: "Éclair de chocolate",
        description: "Massa choux leve, creme de baunilha e cobertura brilhante.",
        price: "3,20 €",
      },
      {
        name: "Semifrio de frutos vermelhos",
        description: "Sobremesa de colher para levar, 6 a 8 pessoas.",
        price: "18 €",
        highlight: true,
      },
    ],
  },
];
