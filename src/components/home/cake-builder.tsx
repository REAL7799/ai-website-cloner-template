"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const BANDS = 5;

const stages = [
  { title: "Pão-de-ló de cacau 70%", text: "Húmido, alto, assado de madrugada." },
  { title: "Creme de avelã batido", text: "Batido à mão até ficar de espátula em pé." },
  { title: "Ganache de chocolate negro", text: "Vertida quente, escorre onde quer." },
  { title: "O toque do mestre", text: "Caracóis de chocolate, um a um." },
];

// A fotografia do bolo é cortada em 5 bandas horizontais que caem no lugar
// à medida que o utilizador percorre a secção (pinada durante ~3 ecrãs).
// Sem JavaScript — ou com "reduzir movimento" ativo — o bolo aparece montado.
export function CakeBuilder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);
  const finaleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / span));

      bandRefs.current.forEach((band, i) => {
        if (!band) return;
        // A banda de baixo (i = BANDS-1) assenta primeiro.
        const order = BANDS - 1 - i;
        const local = Math.min(
          1,
          Math.max(0, (p - order * 0.14) / 0.24)
        );
        const eased = easeOut(local);
        band.style.transform = `translateY(${(1 - eased) * -58}svh)`;
        band.style.opacity = String(Math.min(1, local * 2.5));
      });

      const stageIndex = Math.min(
        stages.length - 1,
        Math.floor(p / (0.88 / stages.length))
      );
      stageRefs.current.forEach((stage, i) => {
        stage?.toggleAttribute("data-active", i <= stageIndex);
      });
      finaleRef.current?.toggleAttribute("data-active", p > 0.86);
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
      aria-label="A montagem de um bolo de chocolate, camada a camada"
      className="relative h-[320vh] bg-[oklch(0.125_0.01_55)]"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pt-20 sm:px-6 sm:pt-24">
          <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary">
            Camada a camada
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-balance sm:text-4xl">
            Veja um bolo nascer enquanto desce a página
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* etapas — coluna esquerda em desktop */}
          <ol className="hidden space-y-7 lg:block">
            {stages.map((stage) => (
              <li
                key={stage.title}
                ref={(el) => {
                  stageRefs.current[stages.indexOf(stage)] = el;
                }}
                className="group border-l-2 border-border pl-5 opacity-40 transition-all duration-500 data-active:border-primary data-active:opacity-100"
              >
                <h3 className="font-heading text-xl font-semibold">
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stage.text}
                </p>
              </li>
            ))}
          </ol>

          {/* o bolo, em 5 bandas */}
          <div className="relative mx-auto aspect-[4/5] h-[min(48svh,24rem)] lg:h-[min(62svh,32rem)]">
            <div
              aria-hidden="true"
              className="absolute -inset-12 rounded-full bg-primary/10 blur-3xl"
            />
            {Array.from({ length: BANDS }).map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  bandRefs.current[i] = el;
                }}
                className="absolute inset-x-0 overflow-hidden will-change-transform"
                style={{ top: `${i * 20}%`, height: "20.4%" }}
              >
                <Image
                  src={images["bolo-camadas"]}
                  alt=""
                  sizes="(max-width: 1024px) 80vw, 440px"
                  className="absolute left-0 w-full max-w-none"
                  style={{ height: `${BANDS * 100}%`, top: `${i * -100}%` }}
                  placeholder="blur"
                />
              </div>
            ))}
          </div>

          {/* remate — coluna direita em desktop, por baixo em mobile */}
          <div
            ref={finaleRef}
            className="pb-10 text-center opacity-0 transition-all duration-700 data-active:opacity-100 lg:pb-0 lg:text-left"
          >
            <p className="font-heading text-2xl leading-snug font-medium text-balance italic sm:text-3xl">
              “Feito à mão, do primeiro
              <br className="hidden lg:block" /> ao último gesto.”
            </p>
            <Link
              href="/encomendas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-6 h-11 rounded-full px-6"
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
