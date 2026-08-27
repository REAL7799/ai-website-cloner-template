import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { bestSellers } from "@/lib/products";

export function BestSellers() {
  return (
    <section
      id="mais-vendidos"
      className="scroll-mt-24 border-y border-border bg-card py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Os favoritos"
          title="Mais Vendidos"
          description="As peças que as nossas clientas mais amam. Garanta a sua antes que esgotem — os tamanhos voam!"
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
