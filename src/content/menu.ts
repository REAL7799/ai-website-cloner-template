import type { AllergenCode, MenuSection } from "@/types/menu";

/**
 * Menu transcrito da carta impressa do Café Fátima (fotografias de 2026).
 * Sempre que um preço estiver marcado com `needsCheck`, a leitura da fotografia
 * era ambígua e deve ser confirmada com o proprietário antes de publicar.
 */

export const allergens: { code: AllergenCode; pt: string; en: string }[] = [
  { code: 1, pt: "Frutos c/ casca rija", en: "Tree nuts" },
  { code: 2, pt: "Aipo", en: "Celery" },
  { code: 3, pt: "Mostarda", en: "Mustard" },
  { code: 4, pt: "Sementes de sésamo", en: "Sesame seeds" },
  { code: 5, pt: "Dióxido de enxofre / sulfitos", en: "Sulphur dioxide / sulphites" },
  { code: 6, pt: "Crustáceos", en: "Crustaceans" },
  { code: 7, pt: "Tremoços", en: "Lupin" },
  { code: 8, pt: "Cereais c/ glúten", en: "Cereals containing gluten" },
  { code: 9, pt: "Moluscos", en: "Molluscs" },
  { code: 10, pt: "Ovos", en: "Eggs" },
  { code: 11, pt: "Peixe", en: "Fish" },
  { code: 12, pt: "Amendoins", en: "Peanuts" },
  { code: 13, pt: "Soja", en: "Soy" },
  { code: 14, pt: "Leite", en: "Milk" },
];

export const menu: MenuSection[] = [
  {
    id: "cafetaria",
    pt: "Cafetaria",
    en: "Coffee Shop",
    items: [
      {
        pt: "Café / Descafeinado",
        en: "Espresso / Decaf",
        prices: [{ value: 1.2 }],
      },
      {
        pt: "Café duplo",
        en: "Double espresso",
        prices: [{ value: 2.4 }],
      },
      {
        pt: "Café c/ leite",
        en: "American coffee",
        prices: [{ value: 2.0 }],
      },
      {
        pt: "Galão / Latte / Macchiato",
        en: "Coffee w/ milk / Latte / Macchiato",
        prices: [{ value: 2.5 }],
      },
      {
        pt: "Cappuccino",
        en: "Cappuccino",
        prices: [
          { value: 2.5, pt: "20 cl", en: "20 cl" },
          { value: 3.0, pt: "25 cl", en: "25 cl" },
        ],
      },
      {
        pt: "Chá",
        en: "English tea",
        prices: [{ value: 2.0 }],
        needsCheck: true,
      },
      {
        pt: "Chá c/ leite",
        en: "Tea w/ milk",
        prices: [{ value: 2.5 }],
        allergens: [14],
        needsCheck: true,
      },
      {
        pt: "Chocolate quente",
        en: "Hot chocolate",
        prices: [
          { value: 3.0, pt: "20 cl", en: "20 cl" },
          { value: 3.5, pt: "25 cl", en: "25 cl" },
        ],
        allergens: [14],
      },
    ],
  },
  {
    id: "sandes",
    pt: "Sandes",
    en: "Sandwiches",
    note: {
      pt: "As sandes especiais incluem queijo, alface e tomate.",
      en: "Special sandwiches include cheese, lettuce and tomato.",
    },
    items: [
      {
        pt: "Sandes de fiambre",
        en: "Ham sandwich",
        prices: [{ value: 2.6 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Sandes de queijo",
        en: "Cheese sandwich",
        prices: [{ value: 2.6 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Sandes mista",
        en: "Cheese + ham sandwich",
        prices: [{ value: 3.2 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Sandes de presunto",
        en: "Salted ham sandwich",
        prices: [{ value: 4.0 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Sandes de presunto especial",
        en: "Special salted ham sandwich",
        prices: [{ value: 5.5 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Tosta mista",
        en: "Cheese + ham toast",
        prices: [
          { value: 5.9, pt: "pão caseiro fatiado", en: "sliced bread" },
          { value: 4.2, pt: "pão d'avó", en: "regular bread" },
        ],
        allergens: [8, 13, 14],
      },
      {
        pt: "Bifana simples",
        en: "Pork steak sandwich",
        prices: [{ value: 4.8 }],
        allergens: [4, 8, 10, 13, 14],
      },
      {
        pt: "Bifana especial",
        en: "Special pork steak sandwich",
        prices: [{ value: 5.8 }],
        allergens: [4, 8, 10, 13, 14],
      },
      {
        pt: "Panado no pão (frango / perú)",
        en: "«Schnitzel» sandwich (chicken / turkey)",
        prices: [
          { value: 5.0, pt: "simples", en: "regular" },
          { value: 6.0, pt: "especial", en: "special" },
        ],
        allergens: [8, 13, 14],
      },
      {
        pt: "Prego no pão",
        en: "Beef steak sandwich",
        prices: [
          { value: 5.8, pt: "simples", en: "regular" },
          { value: 6.8, pt: "especial", en: "special" },
        ],
        allergens: [8, 13, 14],
      },
      {
        pt: "Cachorro especial",
        en: "Special hot dog",
        prices: [{ value: 6.8 }],
        allergens: [8, 13, 14],
      },
    ],
  },
  {
    id: "sandes-vegetarianas",
    pt: "Sandes vegetarianas",
    en: "Vegetarian sandwiches",
    note: {
      pt: "Secção tal como consta da carta impressa — a sandes de atum aparece aqui agrupada.",
      en: "Section as printed on the paper menu — the tuna sandwich is grouped here.",
    },
    items: [
      {
        pt: "Sandes de queijo c/ alface e tomate",
        en: "Cheese, lettuce & tomato sandwich",
        prices: [{ value: 3.5 }],
        allergens: [8, 13, 14],
      },
      {
        pt: "Sandes de atum",
        en: "Tuna sandwich",
        prices: [{ value: 5.5 }],
        allergens: [8, 10, 11, 13, 14],
      },
      {
        pt: "Omelete simples",
        en: "Omelette sandwich",
        prices: [{ value: 5.9 }],
        allergens: [8, 10, 13, 14],
      },
      {
        pt: "Omelete especial",
        en: "Special omelette sandwich",
        prices: [{ value: 6.9 }],
        allergens: [8, 10, 13, 14],
      },
    ],
  },
  {
    id: "sopa-snacks",
    pt: "Sopa & snacks",
    en: "Soup & snacks",
    items: [
      {
        pt: "Sopa de legumes",
        en: "Vegetable soup",
        prices: [{ value: 2.9 }],
        allergens: [8, 10],
      },
      {
        pt: "Pastel de bacalhau",
        en: "Codfish pastel",
        prices: [{ value: 2.0, pt: "unidade", en: "unit" }],
        allergens: [8, 10, 11, 13, 14],
      },
    ],
  },
  {
    id: "burgers",
    pt: "Hambúrgueres",
    en: "Burgers",
    items: [
      {
        pt: "Hambúrguer simples",
        en: "Plain burger",
        prices: [{ value: 5.8 }],
        allergens: [4, 8, 10, 13, 14],
      },
      {
        pt: "Hambúrguer c/ queijo",
        en: "Cheese burger",
        prices: [{ value: 6.2 }],
        allergens: [4, 8, 10, 13, 14],
      },
      {
        pt: "Hambúrguer c/ alface e tomate",
        en: "Burger w/ lettuce and tomato",
        prices: [{ value: 6.2 }],
        allergens: [4, 8, 10, 13, 14],
      },
      {
        pt: "Hambúrguer especial",
        en: "Special burger",
        prices: [{ value: 6.8 }],
        allergens: [4, 8, 10, 13, 14],
      },
    ],
  },
  {
    id: "pratos-combinados",
    pt: "Pratos combinados",
    en: "Mixed dishes",
    items: [
      {
        pt: "Bitoque de porco à portuguesa",
        en: "Portuguese pork steak",
        prices: [{ value: 13.5 }],
        allergens: [2, 3, 5, 8, 10, 13, 14],
      },
      {
        pt: "Bitoque de vaca à portuguesa",
        en: "Portuguese beef steak",
        prices: [{ value: 14.5 }],
        allergens: [2, 3, 5, 8, 10, 13, 14],
      },
      {
        pt: "Escalope de porco no prato",
        en: "Pork steak w/ fries and egg",
        prices: [{ value: 12.5 }],
        allergens: [5, 8, 10, 13, 14],
      },
      {
        pt: "Escalope de vaca no prato",
        en: "Beef steak w/ fries and egg",
        prices: [{ value: 13.5 }],
        allergens: [5, 8, 10, 13, 14],
      },
      {
        pt: "Hambúrguer c/ ovo",
        en: "Hamburger w/ fries and egg",
        prices: [{ value: 13.5 }],
        allergens: [2, 3, 5, 8, 10, 13, 14],
      },
      {
        pt: "Panados de frango no prato",
        en: "«Schnitzel» w/ salad (chicken)",
        prices: [{ value: 13.5 }],
        allergens: [4, 8, 10, 13, 14],
      },
    ],
  },
  {
    id: "omeletes",
    pt: "Omeletes",
    en: "Omelettes",
    items: [
      {
        pt: "Omelete simples",
        en: "Plain omelette",
        prices: [{ value: 12.0 }],
        allergens: [8, 10, 13, 14],
      },
      {
        pt: "Omelete de queijo + fiambre",
        en: "Cheese + ham omelette",
        prices: [{ value: 13.0 }],
        allergens: [8, 10, 13, 14],
      },
    ],
  },
  {
    id: "pratos-tradicionais",
    pt: "Pratos tradicionais",
    en: "Traditional dishes",
    note: {
      pt: "Menu infantil: mini pratos disponíveis a pedido.",
      en: "Children's menu: small portions available on request.",
    },
    items: [
      {
        pt: "Arroz de pato",
        en: "Duck rice",
        prices: [{ value: 12.0 }],
        allergens: [1, 2, 5, 6, 8, 10, 13, 14],
      },
      {
        pt: "Bacalhau à Brás",
        en: "Codfish à Brás",
        prices: [{ value: 12.0 }],
        allergens: [5, 8, 10, 11, 13, 14],
        needsCheck: true,
      },
      {
        pt: "Cachorro no prato",
        en: "Hot dog w/ fries and egg",
        prices: [
          { value: 7.5, pt: "mini prato", en: "small" },
          { value: 12.0, pt: "prato", en: "large" },
        ],
        allergens: [2, 5, 8, 10, 13, 14],
      },
      {
        pt: "Esparguete à bolonhesa",
        en: "Spaghetti bolognese",
        prices: [{ value: 12.0 }],
        allergens: [2, 5, 8, 10, 13, 14],
      },
    ],
  },
  {
    id: "saladas",
    pt: "Saladas",
    en: "Salads",
    items: [
      {
        pt: "Salada mista",
        en: "Mixed salad",
        prices: [
          { value: 4.5, pt: "mini prato", en: "small" },
          { value: 7.5, pt: "prato", en: "large" },
        ],
      },
      {
        pt: "Salada de atum",
        en: "Tuna salad",
        prices: [{ value: 12.0 }],
        allergens: [5, 8, 10, 11],
      },
      {
        pt: "Salada de pota",
        en: "Squid salad",
        prices: [{ value: 12.0 }],
        allergens: [5, 8, 9, 10],
      },
    ],
  },
  {
    id: "extras",
    pt: "Extras",
    en: "Extras",
    items: [
      {
        pt: "Batata frita",
        en: "French fries",
        prices: [
          { value: 4.5, pt: "mini prato", en: "small" },
          { value: 6.5, pt: "prato", en: "large" },
        ],
        allergens: [8],
      },
      {
        pt: "Ovo estrelado",
        en: "Fried egg",
        prices: [{ value: 2.5 }],
        allergens: [8, 10],
      },
    ],
  },
  {
    id: "sobremesas",
    pt: "Sobremesas",
    en: "Desserts",
    items: [
      { pt: "Tarte de maçã", en: "Apple pie", prices: [{ value: 4.2 }] },
      { pt: "Bolo brigadeiro", en: "Traditional chocolate cake", prices: [{ value: 4.2 }] },
      { pt: "Cheesecake de frutos vermelhos", en: "Red fruits cheesecake", prices: [{ value: 4.2 }] },
      { pt: "Bolo de bolacha", en: "Creamy biscuit cake", prices: [{ value: 3.9 }] },
      { pt: "Natas do céu", en: "«Natas do céu»", prices: [{ value: 3.9 }] },
      { pt: "Pudim flan", en: "Portuguese flan", prices: [{ value: 3.9 }] },
      { pt: "Mousse de chocolate", en: "Chocolate mousse", prices: [{ value: 3.9 }] },
      { pt: "Fruta (melão, abacaxi)", en: "Fruit (melon, pineapple)", prices: [{ value: 3.5 }] },
      { pt: "Salada de frutas", en: "Mixed fruit salad", prices: [{ value: 4.5 }] },
    ],
  },
  {
    id: "bebidas-frias",
    pt: "Bebidas frias",
    en: "Cold drinks",
    items: [
      {
        pt: "Água s/ gás",
        en: "Still water",
        prices: [
          { value: 2.0, pt: "50 cl", en: "50 cl" },
          { value: 3.0, pt: "1,5 l", en: "1.5 l" },
        ],
      },
      {
        pt: "Água c/ gás",
        en: "Sparkling water",
        prices: [
          { value: 2.2, pt: "50 cl", en: "50 cl" },
          { value: 4.5, pt: "1,5 l", en: "1.5 l" },
        ],
        allergens: [5],
        needsCheck: true,
      },
      {
        pt: "Cerveja de garrafa",
        en: "Bottled beer",
        prices: [{ value: 2.5, pt: "33 cl", en: "33 cl" }],
        allergens: [8],
      },
      {
        pt: "Cerveja a copo",
        en: "Draft beer",
        prices: [
          { value: 2.0, pt: "20 cl", en: "20 cl" },
          { value: 5.0, pt: "50 cl", en: "50 cl" },
        ],
        allergens: [8],
      },
      { pt: "Refrigerantes", en: "Sodas", prices: [{ value: 2.8 }] },
      { pt: "Cidra e energéticos", en: "Cider and energy drinks", prices: [{ value: 3.5 }], allergens: [5] },
      { pt: "Sumos de fruta naturais", en: "Natural fruit juices", prices: [{ value: 4.0 }] },
    ],
  },
  {
    id: "vinhos",
    pt: "Vinhos",
    en: "Wines",
    items: [
      {
        pt: "Tinto / branco (Pias)",
        en: "Red / white (Pias)",
        prices: [
          { value: 6.5, pt: "25 cl", en: "25 cl" },
          { value: 9.5, pt: "75 cl", en: "75 cl" },
        ],
        allergens: [5],
      },
      {
        pt: "Tinto / branco (Valfor)",
        en: "Red / white (Valfor)",
        prices: [
          { value: 7.5, pt: "25 cl", en: "25 cl" },
          { value: 11.0, pt: "75 cl", en: "75 cl" },
        ],
        allergens: [5],
      },
      {
        pt: "Tinto do Douro",
        en: "Douro red",
        prices: [{ value: 15.0, pt: "75 cl", en: "75 cl" }],
        allergens: [5],
      },
      {
        pt: "Branco do Alentejo",
        en: "Alentejo white",
        prices: [{ value: 15.0, pt: "75 cl", en: "75 cl" }],
        allergens: [5],
        needsCheck: true,
      },
      {
        pt: "Vinho verde (Casal Garcia)",
        en: "Vinho verde (Casal Garcia)",
        prices: [
          { value: 7.5, pt: "25 cl", en: "25 cl" },
          { value: 14.0, pt: "75 cl", en: "75 cl" },
        ],
        allergens: [5],
      },
      {
        pt: "Rosé (Mateus Rosé)",
        en: "Rosé (Mateus Rosé)",
        prices: [{ value: 14.0, pt: "75 cl", en: "75 cl" }],
        allergens: [5],
      },
    ],
  },
];

/**
 * Pratos em destaque na página inicial, por ordem de aparecimento.
 * `blurb` é a frase curta que acompanha o prato no cartaz grande.
 */
export const signatureDishes: {
  sectionId: string;
  itemPt: string;
  blurb: { pt: string; en: string };
}[] = [
  {
    sectionId: "pratos-combinados",
    itemPt: "Bitoque de porco à portuguesa",
    blurb: {
      pt: "Carne, ovo estrelado, batata frita e salada. O prato que sai mais vezes ao almoço.",
      en: "Pork steak, fried egg, chips and salad. The plate that leaves the kitchen most at lunch.",
    },
  },
  {
    sectionId: "pratos-tradicionais",
    itemPt: "Arroz de pato",
    blurb: {
      pt: "Feito como se faz há setenta anos, no forno, com a côdea tostada por cima.",
      en: "Made the way it has been for seventy years, oven-baked, crisp on top.",
    },
  },
  {
    sectionId: "sandes",
    itemPt: "Bifana simples",
    blurb: {
      pt: "No pão d'avó, com o molho a pingar. Cinco minutos, de pé ao balcão.",
      en: "In grandmother's bread, sauce dripping. Five minutes, standing at the counter.",
    },
  },
  {
    sectionId: "pratos-tradicionais",
    itemPt: "Bacalhau à Brás",
    blurb: {
      pt: "Bacalhau desfiado, batata palha e ovo, com azeitonas e salsa.",
      en: "Shredded codfish, straw potatoes and egg, with olives and parsley.",
    },
  },
  {
    sectionId: "sopa-snacks",
    itemPt: "Pastel de bacalhau",
    blurb: {
      pt: "Acabado de fritar, para enganar a fome enquanto o prato não vem.",
      en: "Straight from the fryer, to keep hunger away until the plate arrives.",
    },
  },
  {
    sectionId: "sandes",
    itemPt: "Tosta mista",
    blurb: {
      pt: "Em pão caseiro fatiado ou pão d'avó. O pequeno-almoço de meia Fátima.",
      en: "On sliced homemade bread or a regular roll. Half of Fátima's breakfast.",
    },
  },
];
