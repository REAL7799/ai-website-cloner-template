import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    align: "left",
    offsetClass: "md:pl-[26%]",
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
    cardFocus: "80% 60%",
    align: "left",
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
  },
];

export function FlavorSection({ flavor }: { flavor: Flavor }) {
  const isRight = flavor.align === "right";

  return (
    <section
      id={flavor.slug}
      className="relative w-full scroll-mt-16 overflow-hidden bg-neutral-900 text-white md:min-h-[90svh]"
    >
      <div className="relative aspect-[16/9] w-full md:absolute md:inset-0 md:aspect-auto">
        <Image
          src={flavor.image}
          alt={flavor.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 hidden bg-gradient-to-b from-black/70 via-black/10 to-black/40 md:block",
            isRight
              ? "md:bg-gradient-to-r md:from-black/10 md:via-black/45 md:to-black/75"
              : "md:bg-gradient-to-l md:from-black/10 md:via-black/45 md:to-black/75"
          )}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col gap-3 px-6 py-10 sm:px-10 md:absolute md:inset-0 md:justify-center md:py-0",
          !isRight && "max-w-6xl",
          isRight
            ? "items-start text-left md:items-end md:text-right"
            : "items-start text-left",
          flavor.offsetClass
        )}
      >
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: flavor.accent }}
        >
          {flavor.eyebrow}
        </span>

        <h2 className="font-heading text-6xl leading-[0.9] tracking-wide uppercase sm:text-7xl md:text-8xl md:drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          {flavor.tagline[0]}
          <br />
          {flavor.tagline[1]}
        </h2>

        <p
          className={cn(
            "max-w-sm text-base text-white/85 sm:text-lg",
            isRight && "md:ml-auto"
          )}
        >
          {flavor.description}
        </p>

        <Button
          size="lg"
          variant="outline"
          className="mt-2 h-11 rounded-full border-white/40 bg-transparent px-7 text-sm text-white hover:bg-white hover:text-neutral-900 md:text-base"
        >
          Experimenta {flavor.name}
        </Button>
      </div>
    </section>
  );
}
