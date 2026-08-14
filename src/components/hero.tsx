"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const SLIDE_INTERVAL_MS = 5000;

const slides = [
  {
    src: "/images/hero/hero-verao-pedras.jpg",
    alt: "Embalagens Água das Pedras numa praia tropical ao pôr do sol",
  },
  {
    src: "/images/hero/hero-2-splash.jpg",
    alt: "As 5 garrafas Água das Pedras a explodir num splash de água e fruta",
  },
  {
    src: "/images/hero/hero-3-pool.jpg",
    alt: "Garrafas Água das Pedras à beira de uma piscina infinita ao pôr do sol",
  },
  {
    src: "/images/hero/hero-4-poster.jpg",
    alt: "Garrafa Água das Pedras Natural em close-up sobre fundo gráfico",
  },
  {
    src: "/images/hero/hero-5-picnic.jpg",
    alt: "Garrafas Água das Pedras num piquenique de verão ao entardecer",
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-neutral-900 text-white lg:min-h-[100svh]"
    >
      {/* Image: contained banner on mobile/tablet (shows the full pack lineup, no
          cropping even in tablet portrait), full-bleed background from lg up */}
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 hidden bg-gradient-to-b from-black/75 via-black/25 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/60 to-transparent lg:block" />

        <div className="absolute inset-x-0 bottom-4 z-10 hidden justify-center gap-2 lg:flex">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Mostrar imagem ${index + 1} de ${slides.length}`}
              aria-current={index === active}
              className={`h-1.5 rounded-full transition-all ${
                index === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:px-10 lg:absolute lg:inset-0 lg:justify-start lg:py-0 lg:pt-28 lg:pb-0">
        <span className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase sm:text-sm lg:text-white/80">
          Água das Pedras · Desde 1871
        </span>

        <h1 className="font-heading text-6xl leading-[0.9] tracking-wide uppercase sm:text-8xl lg:text-9xl lg:drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          Deixa o Verão
          <br />
          Borbulhar
        </h1>

        <p className="max-w-md text-base text-white/85 sm:text-lg">
          Cinco sabores, uma explosão de frescura. Água mineral natural
          gasocarbónica com ingredientes naturais — Natural, Limão, Ananás,
          Maracujá e Frutos Vermelhos.
        </p>

        <Button
          render={<a href="#sabores" />}
          nativeButton={false}
          size="lg"
          className="mt-2 h-12 rounded-full bg-white px-8 text-base text-neutral-900 hover:bg-white/90 lg:bg-primary lg:text-primary-foreground lg:hover:bg-primary/80"
        >
          Descobre os Sabores
        </Button>
      </div>
    </section>
  );
}
