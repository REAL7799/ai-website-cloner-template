"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";
import { DripDivider } from "@/components/site/drip-divider";
import { useSectionReveal } from "@/hooks/use-section-reveal";

interface Ingrediente {
  src: string;
  alt: string;
  /** Posição final relativa ao centro do palco, em percentagem. */
  x: number;
  y: number;
  size: string;
  rotate: number;
  /** Profundidade 3D (translateZ em px): maior = mais perto do ecrã. */
  z: number;
}

const ingredientes: Ingrediente[] = [
  {
    src: "/images/explosao/chocolate-pedacos.webp",
    alt: "Pedaços de chocolate belga",
    x: -38,
    y: -26,
    size: "w-[26%]",
    rotate: -18,
    z: 60,
  },
  {
    src: "/images/explosao/framboesas.webp",
    alt: "Framboesas frescas",
    x: 38,
    y: -30,
    size: "w-[20%]",
    rotate: 14,
    z: 110,
  },
  {
    src: "/images/explosao/chocolate-caracois.webp",
    alt: "Caracóis de chocolate",
    x: -2,
    y: -44,
    size: "w-[22%]",
    rotate: 8,
    z: 40,
  },
  {
    src: "/images/explosao/avelas.webp",
    alt: "Avelãs inteiras e partidas",
    x: -40,
    y: 26,
    size: "w-[22%]",
    rotate: 20,
    z: 90,
  },
  {
    src: "/images/explosao/chocolate-calda.webp",
    alt: "Calda de chocolate derretido",
    x: 40,
    y: 20,
    size: "w-[26%]",
    rotate: -12,
    z: 130,
  },
];

const chips = [
  "Chocolate belga 54%",
  "Framboesas frescas",
  "Avelãs torradas",
  "Ganache sedosa",
];

export function Explosao() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        motionOk: "(prefers-reduced-motion: no-preference)",
        isMobile: "(max-width: 767px)",
        hoverFine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motionOk, isMobile, hoverFine } = context.conditions as {
          motionOk: boolean;
          isMobile: boolean;
          hoverFine: boolean;
        };

        // No mobile a explosão é mais contida para não sair do ecrã.
        const damp = isMobile ? 0.62 : 1;
        const items = stage.querySelectorAll<HTMLElement>("[data-ingrediente]");

        if (!motionOk) {
          // Sem animação: coloca os ingredientes diretamente na posição final.
          items.forEach((item) => {
            gsap.set(item, {
              xPercent: Number(item.dataset.x) * damp * 4,
              yPercent: Number(item.dataset.y) * damp * 4,
              rotate: Number(item.dataset.rotate),
              z: Number(item.dataset.z) * damp,
            });
          });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 80%",
            end: "center 42%",
            scrub: 1,
          },
        });

        tl.fromTo(
          stage.querySelector("[data-bolo]"),
          { scale: 0.82, y: 40, rotationY: -14, transformPerspective: 900 },
          { scale: 1, y: 0, rotationY: 0, ease: "power1.out" },
          0,
        );

        items.forEach((item) => {
          const x = Number(item.dataset.x) * damp;
          const y = Number(item.dataset.y) * damp;
          const rotate = Number(item.dataset.rotate);
          const z = Number(item.dataset.z) * damp;
          tl.fromTo(
            item,
            {
              xPercent: 0,
              yPercent: 0,
              scale: 0.25,
              opacity: 0,
              rotate: 0,
              z: 0,
            },
            {
              xPercent: x * 4,
              yPercent: y * 4,
              scale: 1,
              opacity: 1,
              rotate,
              z,
              ease: "power2.out",
            },
            0.05,
          );
        });

        // Parallax 3D com o rato (só desktop): quanto mais perto do ecrã
        // (z maior), mais o ingrediente acompanha o cursor.
        if (hoverFine && !isMobile) {
          const movers = Array.from(items).map((item) => ({
            z: Number(item.dataset.z),
            toX: gsap.quickTo(item, "x", { duration: 0.6, ease: "power2.out" }),
            toY: gsap.quickTo(item, "y", { duration: 0.6, ease: "power2.out" }),
          }));
          const onMove = (e: PointerEvent) => {
            const rect = stage.getBoundingClientRect();
            const nx = (e.clientX - rect.left) / rect.width - 0.5;
            const ny = (e.clientY - rect.top) / rect.height - 0.5;
            movers.forEach((m) => {
              m.toX(nx * (m.z / 130) * 26);
              m.toY(ny * (m.z / 130) * 18);
            });
          };
          const onLeave = () => movers.forEach((m) => (m.toX(0), m.toY(0)));
          stage.addEventListener("pointermove", onMove, { passive: true });
          stage.addEventListener("pointerleave", onLeave);
          return () => {
            stage.removeEventListener("pointermove", onMove);
            stage.removeEventListener("pointerleave", onLeave);
          };
        }
      },
    );

    return () => mm.revert();
  }, []);

  const message =
    "Olá, Fátima Cake! 🍫 Gostaria de encomendar o *Bolo de Chocolate Belga* (28,00 €).";

  return (
    <section
      ref={sectionRef}
      id="chocolate"
      aria-label="O nosso bolo de chocolate belga"
      className="relative bg-[oklch(0.95_0.02_250)] pb-28 pt-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p data-reveal className="font-handwriting text-3xl text-primary">
            o nosso best-seller
          </p>
          <h2
            data-reveal
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Chocolate belga que{" "}
            <span className="font-handwriting text-4xl text-primary sm:text-5xl">
              explode de sabor
            </span>
          </h2>
          <p data-reveal className="mt-5 leading-relaxed text-muted-foreground">
            Faça scroll e veja do que é feito: camadas húmidas de chocolate
            belga 54%, ganache sedosa, framboesas frescas e avelãs torradas.
            Sem essências artificiais — só ingredientes que se veem (e provam).
          </p>
          <ul data-reveal className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-primary/25 bg-card px-4 py-1.5 text-sm font-medium text-accent-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              className="h-12 rounded-full px-7 text-base shadow-lg shadow-primary/25"
              render={
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <WhatsAppIcon className="size-5" />
              Encomendar este bolo
            </Button>
            <p className="font-handwriting text-4xl leading-none text-primary">
              28,00 €
            </p>
          </div>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto aspect-square w-full max-w-md [perspective:1100px] [transform-style:preserve-3d] lg:max-w-lg"
        >
          <div
            data-bolo
            className="absolute inset-[14%] drop-shadow-2xl will-change-transform"
          >
            <Image
              src="/images/explosao/bolo-chocolate-cutout.webp"
              alt="Bolo de chocolate belga com ganache a escorrer"
              fill
              sizes="(max-width: 1024px) 90vw, 32rem"
              className="object-contain"
            />
          </div>
          {ingredientes.map((ing) => (
            <div
              key={ing.src}
              data-ingrediente
              data-x={ing.x}
              data-y={ing.y}
              data-rotate={ing.rotate}
              data-z={ing.z}
              className={`absolute left-1/2 top-1/2 ${ing.size} -translate-x-1/2 -translate-y-1/2 will-change-transform`}
            >
              <Image
                src={ing.src}
                alt={ing.alt}
                width={480}
                height={480}
                className="h-auto w-full drop-shadow-xl"
              />
            </div>
          ))}
        </div>
      </div>

      <DripDivider className="text-[oklch(0.95_0.02_250)]" />
    </section>
  );
}
