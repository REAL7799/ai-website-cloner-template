import { ArrowRight, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";
import { HeroMedia } from "./hero-media";

const trustItems = ["Marcação simples", "Atendimento personalizado", "Produtos premium"];

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <HeroMedia />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/15"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-28 pb-20 md:px-8">
        <Reveal className="max-w-xl">
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.3em] text-gold-text uppercase">
            <span className="h-px w-8 bg-gold/60" aria-hidden />
            Fátima · Ourém — Portugal
          </p>

          <h1 className="mt-6 font-heading text-5xl leading-[1.05] font-medium text-balance md:text-7xl">
            A arte de realçar a sua beleza natural
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            Unhas perfeitas, olhar de sonho e momentos de puro bem-estar — num espaço pensado para
            si, no coração de Fátima.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground transition-all duration-300 hover:bg-espresso hover:shadow-xl hover:shadow-espresso/20"
            >
              Marcar por WhatsApp
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold/10"
            >
              Explorar serviços
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden>
        <ChevronDown className="size-6 animate-bounce text-gold motion-reduce:animate-none" />
      </div>
    </section>
  );
}
