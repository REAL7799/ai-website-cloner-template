"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { SectionHeader } from "@/components/site/section-header";
import { CONTACT, PRODUCTS } from "@/lib/site";

const AUTOPLAY_INTERVAL_MS = 3200;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : 300;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    const atEnd = direction === 1 && track.scrollLeft >= maxScroll - step / 2;
    const atStart = direction === -1 && track.scrollLeft <= step / 2;
    if (atEnd) {
      track.scrollTo({ left: 0, behavior });
    } else if (atStart) {
      track.scrollTo({ left: maxScroll, behavior });
    } else {
      track.scrollBy({ left: direction * step, behavior });
    }
  }, []);

  useEffect(() => {
    if (hoverPaused || userPaused) return;
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => scrollByCards(1), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [hoverPaused, userPaused, scrollByCards]);

  return (
    <section id="criacoes" className="scroll-mt-20 overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Galeria"
          title="As nossas"
          scriptWord="criações"
          description="Buquês e caixas reais, feitos para clientes reais. Desliza para te apaixonares — e depois conta-nos qual é o teu favorito."
        />
      </div>

      <div
        className="relative mt-12 md:mt-16"
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onTouchStart={() => setHoverPaused(true)}
        onTouchEnd={() => setHoverPaused(false)}
        onTouchCancel={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
      >
        <div
          ref={trackRef}
          role="region"
          aria-label="Carrossel de criações Kitty Flowers"
          tabIndex={0}
          className="kf-scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-72rem)/2))] scroll-pl-[max(1rem,calc((100vw-72rem)/2))] pb-4"
        >
          {PRODUCTS.map((product) => (
            <figure
              key={product.src + product.name}
              data-card
              className="group w-60 shrink-0 snap-start md:w-72"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl shadow-[0_18px_45px_-20px_oklch(0.45_0.13_5/0.35)]">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 240px, 288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-card/85 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-rose-deep backdrop-blur-sm">
                  {product.tag}
                </span>
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-rose-deep/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <figcaption className="mt-3 px-1 text-center text-sm font-medium text-foreground md:text-[0.95rem]">
                {product.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary/20 bg-card text-rose-deep shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:text-primary"
            aria-label="Ver criação anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Retomar carrossel" : "Pausar carrossel"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary/20 bg-card text-rose-deep shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:text-primary"
          >
            {userPaused ? (
              <Play className="size-4.5" />
            ) : (
              <Pause className="size-4.5" />
            )}
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-primary/20 bg-card text-rose-deep shadow-sm transition-all hover:scale-105 hover:border-primary/50 hover:text-primary"
            aria-label="Ver próxima criação"
          >
            <ChevronRight className="size-5" />
          </button>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-5 py-2.5 text-sm font-semibold text-rose-deep shadow-sm transition-all hover:border-primary/50 hover:text-primary"
          >
            <InstagramIcon className="size-4" />
            Ver mais no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
