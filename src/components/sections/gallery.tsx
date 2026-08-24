import Image from "next/image";
import { WhatsappIcon } from "@/components/icons";
import { galleryItems, siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

export function Gallery() {
  return (
    <section id="galeria" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Galeria"
          title="O nosso trabalho fala por si"
          subtitle="Um vislumbre dos rituais e resultados que preparamos todos os dias."
        />
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.image} delay={(index % 3) * 100}>
              <figure className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-emerald/70 via-emerald/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <figcaption className="p-4 text-xs leading-snug text-emerald-foreground/90 md:text-sm">
                    {item.alt}
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <a
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:border-gold hover:bg-gold/10"
          >
            <WhatsappIcon className="size-4" aria-hidden />
            Quero um resultado assim — falar connosco
          </a>
        </Reveal>
      </div>
    </section>
  );
}
