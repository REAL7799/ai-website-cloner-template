import Image from "next/image";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full items-start overflow-hidden bg-neutral-900 text-white">
      <Image
        src="/images/hero/hero-verao-pedras.jpg"
        alt="Embalagens Água das Pedras — Natural, Limão, Ananás, Maracujá e Frutos Vermelhos — numa praia tropical ao pôr do sol"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 pt-20 sm:px-10 sm:pt-28">
        <span className="text-xs font-semibold tracking-[0.3em] text-white/80 uppercase sm:text-sm">
          Água das Pedras · Desde 1871
        </span>

        <h1 className="font-heading text-6xl leading-[0.9] tracking-wide uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-8xl md:text-9xl">
          Deixa o Verão
          <br />
          Borbulhar
        </h1>

        <p className="max-w-md text-base text-white/85 sm:text-lg">
          Cinco sabores, uma explosão de frescura. Água mineral natural
          gasocarbónica com ingredientes naturais — Natural, Limão, Ananás,
          Maracujá e Frutos Vermelhos.
        </p>

        <Button size="lg" className="mt-2 h-12 rounded-full px-8 text-base">
          Descobre os Sabores
        </Button>
      </div>
    </section>
  );
}
