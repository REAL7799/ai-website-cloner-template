import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const commitments = [
  "Atendimento personalizado, uma cliente de cada vez",
  "Higiene e esterilização rigorosas",
  "Produtos profissionais de primeira linha",
];

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 translate-x-5 translate-y-5 rounded-3xl border-2 border-gold/40"
                aria-hidden
              />
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src="/images/about-interior2.webp"
                  alt="Interior acolhedor do salão Annelux em Fátima"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-xl shadow-emerald/10 sm:-left-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                  <Sparkles className="size-5 text-gold" aria-hidden />
                </span>
                <div className="font-heading text-lg leading-snug italic">
                  Feito com carinho,
                  <span className="block">em Fátima</span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading align="left" eyebrow="Sobre nós" title="Bem-vinda à Annelux" />
            <Reveal delay={100}>
              <p className="text-muted-foreground leading-relaxed">
                Na Annelux, cada detalhe foi pensado para transformar o seu cuidado pessoal num
                pequeno ritual de bem-estar. Um espaço intimista em Fátima onde entra como cliente
                e sai a sentir-se especial.
              </p>
            </Reveal>
            <Reveal className="mt-5" delay={160}>
              <p className="text-muted-foreground leading-relaxed">
                Das unhas de gel à limpeza de pele, do lifting de pestanas à depilação — tudo
                com produtos profissionais, técnica rigorosa e um atendimento próximo, dedicado a si.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-8 space-y-4">
                {commitments.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm md:text-base">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Check className="size-3.5 text-emerald" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <a
                href="#servicos"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-gold-text transition-all hover:gap-3"
              >
                Conhecer os serviços
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
