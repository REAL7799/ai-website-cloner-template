import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

interface Piece {
  image: StaticImageData;
  title: string;
  detail: string;
}

const pieces: Piece[] = [
  { image: images["bolo-chocolate"], title: "Drip cake de chocolate", detail: "Ganache escorrida e frutos vermelhos" },
  { image: images.pasteleiro, title: "O mestre em ação", detail: "Cada rosácea piped à mão" },
  { image: images["tarte-frutos"], title: "Tarte de frutos", detail: "Fruta do mercado, anéis perfeitos" },
  { image: images["pastel-nata"], title: "Pastéis de nata", detail: "Queimados no ponto, duas fornadas por dia" },
  { image: images["bolo-festa"], title: "Bolo de casamento", detail: "Dois andares, rosáceas de chantilly" },
  { image: images.bancada, title: "A bancada às 5 da manhã", detail: "Onde tudo começa" },
  { image: images["doces-finos"], title: "Doces finos", detail: "Macarons, trufas e éclairs" },
  { image: images["tarte-amendoa"], title: "Tarte de amêndoa", detail: "Caramelo de manteiga e amêndoa tostada" },
  { image: images["bolo-aniversario"], title: "Bolo de aniversário", detail: "Buttercream de baunilha, velas acesas" },
];

export function Gallery() {
  return (
    <section className="border-y border-border/70 bg-[oklch(0.145_0.011_55)] py-20 sm:py-28" id="galeria">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="A galeria"
          title="A arte do pasteleiro, peça a peça"
          lead="Sem filtros e sem fotografia de banco — tudo o que vê saiu desta cozinha."
        />
        <div className="mt-14 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {pieces.map((piece, i) => (
            <Reveal key={piece.title} delay={(i % 3) * 90}>
              <figure className="group relative overflow-hidden rounded-2xl border border-border/60 break-inside-avoid">
                <Image
                  src={piece.image}
                  alt={`${piece.title} — ${piece.detail}`}
                  sizes="(max-width: 1024px) 50vw, 384px"
                  className="w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-heading font-semibold text-white">
                    {piece.title}
                  </p>
                  <p className="text-xs text-white/75">{piece.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/doces"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full px-6"
            )}
          >
            Ver a carta completa com preços
          </Link>
        </div>
      </div>
    </section>
  );
}
