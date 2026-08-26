import type * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { heroFrames } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

// Hero 16:9 em flipbook: 6 fotografias trocam a cada 0,5 s (CSS puro,
// ver .hero-flip-frame em globals.css; para em prefers-reduced-motion).
export function Hero() {
  return (
    <section className="relative">
      <div className="relative aspect-video max-h-[88svh] min-h-svh w-full overflow-hidden bg-black sm:min-h-[30rem]">
        {heroFrames.map((frame, i) => (
          <Image
            key={frame.alt}
            src={frame.image}
            alt={i === 0 ? frame.alt : ""}
            aria-hidden={i === 0 ? undefined : true}
            priority={i < 2}
            placeholder="blur"
            fill
            sizes="100vw"
            style={{ "--flip-index": i } as React.CSSProperties}
            data-first={i === 0 ? "" : undefined}
            className="hero-flip-frame object-cover"
          />
        ))}

        {/* véus para legibilidade do texto */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
            <p className="animate-in fade-in slide-in-from-bottom-3 text-sm font-semibold tracking-[0.22em] uppercase text-primary duration-700">
              Pastelaria artesanal · {siteConfig.address.city}
            </p>
            <h1 className="mt-3 max-w-3xl animate-in fade-in slide-in-from-bottom-4 text-5xl leading-[1.02] font-semibold text-balance text-white duration-700 sm:text-6xl lg:text-7xl">
              A arte de fazer
              <span className="text-primary italic"> doce</span>
            </h1>
            <p className="mt-4 max-w-xl animate-in fade-in slide-in-from-bottom-5 text-lg leading-relaxed text-white/85 duration-700 [animation-delay:120ms]">
              Bolos de autor, tartes e doçaria fina — cada peça desenhada,
              montada e acabada à mão pelo mestre {siteConfig.founder}.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 [animation-delay:200ms]">
              <Link
                href="/encomendas"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full px-7 text-base font-semibold"
                )}
              >
                Fazer encomenda
              </Link>
              <Link
                href="/doces"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-white/35 bg-white/5 px-7 text-base text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                )}
              >
                Ver a doçaria
              </Link>
            </div>
          </div>
        </div>

        {/* indicadores de fotograma, sincronizados com o flipbook */}
        <div
          aria-hidden="true"
          className="absolute right-5 bottom-5 hidden gap-1.5 sm:flex"
        >
          {heroFrames.map((frame, i) => (
            <span
              key={frame.alt}
              style={{ "--flip-index": i } as React.CSSProperties}
              className="hero-flip-frame size-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
