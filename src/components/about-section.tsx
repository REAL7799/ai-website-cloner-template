import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";

const commitments = [
  "Peças selecionadas a dedo, das melhores fornecedoras",
  "Curadoria de moda para todos os estilos e tamanhos",
  "Atendimento próximo e honesto, de mulher para mulher",
];

export function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-full border border-gold/40"
          />
          <Image
            src="/images/logo.jpg"
            alt={`Logótipo ${siteConfig.name} — ${siteConfig.tagline}`}
            width={640}
            height={640}
            className="relative w-full rounded-full border-8 border-card object-cover shadow-xl"
          />
        </div>

        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />A nossa
            marca
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.6rem]">
            Sobre a {siteConfig.name}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            A {siteConfig.name} nasceu de uma paixão: provar que toda a mulher
            moçambicana merece vestir-se bem, sem complicações e sem pesar no
            bolso. Cada peça do nosso clóset é escolhida com carinho, a pensar
            no seu dia-a-dia — do look confortável de fim-de-semana ao vestido
            que rouba olhares na festa.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Mais do que roupa, entregamos confiança: atendimento personalizado
            pelo WhatsApp, entrega rápida em todo o país e a garantia de que a
            peça que chega é exactamente a peça que viu.
          </p>

          <ul className="mt-7 space-y-3">
            {commitments.map((commitment) => (
              <li key={commitment} className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 size-5 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="text-sm font-medium">{commitment}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-serif text-2xl italic text-gold">
            Dayana <span aria-hidden="true">✦</span>{" "}
            <span className="text-lg not-italic uppercase tracking-[0.3em] text-muted-foreground">
              {siteConfig.tagline}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
