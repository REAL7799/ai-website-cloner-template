export type FlavorAnimation =
  | "parallax"
  | "falling-lemon"
  | "kenburns"
  | "entrance"
  | "falling-berries";

export interface Flavor {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: [string, string];
  description: string;
  image: string;
  imageAlt: string;
  accent: string;
  cardFocus: string;
  align: "left" | "right";
  offsetClass?: string;
  animation: FlavorAnimation;
}

export const flavors: Flavor[] = [
  {
    slug: "natural",
    name: "Natural",
    eyebrow: "Sabor Natural",
    tagline: ["Pura Como", "a Nascente"],
    description:
      "A pureza de sempre. Água mineral natural gasocarbónica, nascida nas montanhas, sem nada a mais.",
    image: "/images/flavors/natural.jpg",
    imageAlt: "Garrafa Pedras Natural num riacho na floresta",
    accent: "oklch(0.55 0.14 150)",
    cardFocus: "50% 45%",
    align: "left",
    animation: "parallax",
  },
  {
    slug: "limao",
    name: "Limão",
    eyebrow: "Sabor Limão",
    tagline: ["Um Choque", "de Frescura"],
    description:
      "Um mergulho de frescura cítrica. Limões maduros e água a borbulhar em cada gole.",
    image: "/images/flavors/limao.jpg",
    imageAlt: "Garrafa Pedras Limão com splash de limões",
    accent: "oklch(0.8 0.17 95)",
    cardFocus: "18% 55%",
    align: "right",
    animation: "falling-lemon",
  },
  {
    slug: "ananas",
    name: "Ananás",
    eyebrow: "Sabor Ananás",
    tagline: ["Sabe a", "Férias"],
    description:
      "Tropical, doce e solarengo. Como levar a praia contigo em cada gota.",
    image: "/images/flavors/ananas.jpg",
    imageAlt: "Garrafa Pedras Ananás numa praia tropical",
    accent: "oklch(0.75 0.15 75)",
    cardFocus: "80% 75%",
    align: "left",
    animation: "kenburns",
  },
  {
    slug: "maracuja",
    name: "Maracujá",
    eyebrow: "Sabor Maracujá",
    tagline: ["O Sabor Que", "Desperta"],
    description:
      "Exótico e intenso. Uma explosão ácida e perfumada que acorda os sentidos.",
    image: "/images/flavors/maracuja.jpg",
    imageAlt: "Garrafa Pedras Maracujá com splash dourado",
    accent: "oklch(0.5 0.18 330)",
    cardFocus: "50% 55%",
    align: "right",
    animation: "entrance",
  },
  {
    slug: "frutos-vermelhos",
    name: "Frutos Vermelhos",
    eyebrow: "Sabor Frutos Vermelhos",
    tagline: ["Doçura em", "Cada Gota"],
    description:
      "Rico e envolvente. Morango, framboesa, mirtilo e amora numa só bebida.",
    image: "/images/flavors/frutos-vermelhos.jpg",
    imageAlt: "Garrafa Pedras Frutos Vermelhos com frutos silvestres",
    accent: "oklch(0.45 0.18 15)",
    cardFocus: "72% 50%",
    align: "right",
    offsetClass: "lg:justify-start lg:pt-24",
    animation: "falling-berries",
  },
];
