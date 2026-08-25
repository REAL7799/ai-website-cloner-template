import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-secondary/80 to-transparent"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-card px-4 py-1.5 text-sm font-medium text-primary">
            Forno aceso desde {siteConfig.founded}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
            {siteConfig.tagline},
            <br />
            <span className="text-primary">todos os dias</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Bolos de festa por encomenda, tartes de fruta da época e a doçaria
            portuguesa de sempre — tudo preparado de madrugada na nossa cozinha,
            em {siteConfig.address.city}.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/encomendas"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 rounded-full px-7 text-base"
              )}
            >
              Fazer encomenda
            </Link>
            <Link
              href="/doces"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full px-7 text-base"
              )}
            >
              Ver a doçaria
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-primary text-primary"
                />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-foreground">4,9</strong> em
              mais de 400 avaliações de clientes
            </span>
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-bottom-6 duration-700 [animation-delay:150ms]">
          <div className="overflow-hidden rounded-4xl border border-border/70 shadow-xl shadow-primary/10">
            <Image
              src={images.hero}
              alt="Balcão da Doce Alma com bolo de camadas, tarte de frutos e pastéis de nata"
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-2xl border border-border/70 bg-card px-5 py-3.5 shadow-lg sm:left-8">
            <p className="text-sm font-semibold">Pastéis de nata quentes</p>
            <p className="text-xs text-muted-foreground">
              saem do forno às 10h e às 16h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
