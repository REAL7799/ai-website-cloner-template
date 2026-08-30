import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { COLLECTIONS, CONTACT } from "@/lib/site";

export function Collections() {
  return (
    <section id="colecoes" className="scroll-mt-20 bg-blush py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Coleções"
          title="Criado à mão, pensado"
          scriptWord="para ti"
          description="Três formas de eternizar um momento — todas personalizáveis nas cores, tamanhos e detalhes."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-16 md:gap-7 lg:grid-cols-3">
          {COLLECTIONS.map((collection, i) => (
            <Reveal
              key={collection.title}
              delay={i * 120}
              className={i === 2 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-card shadow-[0_20px_50px_-25px_oklch(0.45_0.13_5/0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_oklch(0.62_0.17_3/0.45)]">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={collection.src}
                    alt={collection.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-rose-deep/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {collection.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                    {collection.description}
                  </p>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-rose-deep"
                  >
                    Pedir esta coleção
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
