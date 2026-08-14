import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden bg-neutral-900 text-white md:min-h-[100svh]"
    >
      {/* Image: contained banner on mobile (shows the full pack lineup, no cropping),
          full-bleed background from md up */}
      <div className="relative aspect-[16/9] w-full md:absolute md:inset-0 md:aspect-auto">
        <Image
          src="/images/hero/hero-verao-pedras.jpg"
          alt="Embalagens Água das Pedras — Natural, Limão, Ananás, Maracujá e Frutos Vermelhos — numa praia tropical ao pôr do sol"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-black/75 via-black/25 to-transparent md:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/60 to-transparent md:block" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-10 sm:px-10 md:pt-28 md:pb-0 md:absolute md:inset-0 md:justify-start md:py-0">
        <span className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase sm:text-sm md:text-white/80">
          Água das Pedras · Desde 1871
        </span>

        <h1 className="font-heading text-6xl leading-[0.9] tracking-wide uppercase sm:text-8xl md:text-9xl md:drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
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
          className="mt-2 h-12 rounded-full bg-white px-8 text-base text-neutral-900 hover:bg-white/90 md:bg-primary md:text-primary-foreground md:hover:bg-primary/80"
        >
          Descobre os Sabores
        </Button>
      </div>
    </section>
  );
}
