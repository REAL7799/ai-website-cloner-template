import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { collections } from "@/lib/products";

export function CollectionsSection() {
  return (
    <section id="colecoes" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Conjuntos por estação"
          title="Coleções para cada momento"
          description="Do calor do verão às noites de gala — encontre o conjunto certo para cada estação e ocasião."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <article
              key={collection.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <span className="absolute left-4 top-4 z-10 rounded-full border border-gold/30 bg-card/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {collection.season}
                </span>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
                  className="object-contain p-6"
                />
              </div>
              <div className="flex grow flex-col p-5">
                <h3 className="font-serif text-xl font-semibold">
                  {collection.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {collection.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {collection.pieces} peças
                  </span>
                  <a
                    href="#novidades"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-foreground"
                  >
                    Ver peças
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
