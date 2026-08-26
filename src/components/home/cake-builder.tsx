"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

// Vista explodida do bolo (public/images/bolo-exploso.png): cada camada é uma
// banda da fotografia, medida sobre os vazios pretos da imagem, para que os
// cortes sejam invisíveis. Ao fazer scroll as camadas fecham-se num bolo;
// os rótulos (estilo póster de anatomia) desvanecem durante a montagem.
// Sem JavaScript — ou com "reduzir movimento" — fica a vista explodida
// rotulada, que funciona como infografia estática.
interface Layer {
  top: number; // % do topo da imagem
  bottom: number;
  label: string;
  side: "left" | "right";
}

const layers: Layer[] = [
  { top: 7.5, bottom: 17.1, label: "Framboesas frescas", side: "right" },
  { top: 20.4, bottom: 34.5, label: "Cobertura de chocolate", side: "left" },
  { top: 34.8, bottom: 42.9, label: "Pão-de-ló de cacau", side: "right" },
  { top: 45.3, bottom: 54.2, label: "Mousse de chocolate", side: "left" },
  { top: 57.9, bottom: 70.2, label: "Confit de framboesa", side: "right" },
  { top: 72.1, bottom: 78.5, label: "Mousse de chocolate", side: "left" },
  { top: 78.6, bottom: 89.1, label: "Pão-de-ló de cacau", side: "right" },
];

// Posições-alvo: camadas contíguas, centradas verticalmente no contentor.
const totalContent = layers.reduce((sum, l) => sum + (l.bottom - l.top), 0);
const offsets: number[] = (() => {
  let cursor = (100 - totalContent) / 2;
  return layers.map((layer) => {
    const offset = cursor - layer.top;
    cursor += layer.bottom - layer.top;
    return offset;
  });
})();

export function CakeBuilder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cakeRef = useRef<HTMLDivElement | null>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cake = cakeRef.current;
    if (!section || !cake) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const easeInOut = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / span));
      const cakeHeight = cake.getBoundingClientRect().height;

      // primeiro quarto: vista explodida parada (momento "póster");
      // depois as camadas fecham-se até aos ~80% do percurso
      const closed = easeInOut(
        Math.min(1, Math.max(0, (p - 0.22) / 0.58))
      );
      bandRefs.current.forEach((band, i) => {
        if (!band) return;
        band.style.transform = `translateY(${(offsets[i] / 100) * closed * cakeHeight}px)`;
      });
      labelRefs.current.forEach((labelEl) => {
        if (!labelEl) return;
        labelEl.style.opacity = String(
          Math.max(0, 1 - Math.max(0, p - 0.24) * 2.6)
        );
      });
      finaleRef.current?.toggleAttribute("data-active", p > 0.82);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="A anatomia do nosso bolo de chocolate e framboesa, camada a camada"
      className="relative h-[320vh] bg-[oklch(0.125_0.01_55)]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* brilho quente atrás do bolo, como num póster */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-0 h-[80svh] w-[80svh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, oklch(0.32 0.09 15 / 0.5), oklch(0.25 0.05 50 / 0.25) 55%, transparent)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary">
            Camada a camada
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-balance sm:text-4xl">
            A anatomia de um bolo de autor
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Continue a descer — as camadas fecham-se num bolo.
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 sm:px-6">
          {/* o bolo explodido */}
          <div
            ref={cakeRef}
            className="relative aspect-[768/1344] h-[min(66svh,34rem)]"
          >
            {layers.map((layer, i) => {
              const h = layer.bottom - layer.top;
              return (
                <div
                  key={`${layer.label}-${i}`}
                  ref={(el) => {
                    bandRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 overflow-hidden will-change-transform"
                  style={{ top: `${layer.top}%`, height: `${h}%` }}
                >
                  <Image
                    src={images["bolo-exploso"]}
                    alt=""
                    sizes="(max-width: 1024px) 60vw, 400px"
                    className="absolute left-0 w-full max-w-none"
                    style={{
                      height: `${(100 / h) * 100}%`,
                      top: `${(-layer.top / h) * 100}%`,
                    }}
                    placeholder="blur"
                  />
                </div>
              );
            })}

            {/* rótulos de anatomia */}
            {layers.map((layer, i) => (
              <div
                key={`label-${layer.label}-${i}`}
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={cn(
                  "absolute flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.14em] uppercase sm:text-xs",
                  layer.side === "left"
                    ? "right-full mr-1 flex-row-reverse text-right sm:mr-2"
                    : "left-full ml-1 sm:ml-2"
                )}
                style={{ top: `calc(${(layer.top + layer.bottom) / 2}% - 0.5em)` }}
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 shrink-0 bg-primary/60 sm:w-10"
                />
                <span className="max-w-28 leading-snug text-foreground/85 sm:max-w-none sm:whitespace-nowrap">
                  {layer.label}
                </span>
              </div>
            ))}
          </div>

          {/* remate */}
          <div
            ref={finaleRef}
            className="absolute right-4 bottom-8 max-w-64 text-right opacity-0 transition-all duration-700 data-active:opacity-100 sm:right-6 sm:bottom-14 sm:max-w-xs"
          >
            <p className="font-heading text-xl leading-snug font-medium text-balance italic sm:text-3xl">
              “Feito à mão, do primeiro ao último gesto.”
            </p>
            <Link
              href="/encomendas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-4 h-11 rounded-full px-6"
              )}
            >
              Encomendar um assim
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
