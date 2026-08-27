import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { WhatsAppIcon } from "@/components/icons";
import { newArrivals } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

export function NewArrivals() {
  return (
    <section id="novidades" className="scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Acabou de chegar"
          title="Novidades do Catálogo"
          description="Passe o rato sobre cada peça para ver o outro ângulo. Todos os preços em Metical, com encomenda directa pelo WhatsApp."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-gold/25 bg-gold-soft/40 px-6 py-10 text-center">
          <p className="max-w-xl font-serif text-2xl font-medium">
            Quer ver o catálogo completo, com todas as cores e tamanhos?
          </p>
          <a
            href={whatsappLink(
              "Olá Clóset Dayana! 👗 Podem enviar-me o catálogo completo, por favor?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <WhatsAppIcon className="size-4" />
            Pedir catálogo no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
