import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button-variants";
import { categoryImage } from "@/lib/images";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "A Nossa Doçaria",
  description:
    "Bolos de festa, bolos caseiros, tartes, doces tradicionais e doces finos — a carta completa da Doce Alma, com preços.",
  alternates: { canonical: "/doces" },
};

export default function DocesPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary">
          A nossa doçaria
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
          Tudo o que sai do nosso forno
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Preços de balcão — para encomendas de festa, o orçamento é feito à
          medida.{" "}
          <Link
            href="/encomendas"
            className="font-medium text-primary underline underline-offset-4"
          >
            Peça o seu aqui
          </Link>
          .
        </p>
        <nav aria-label="Categorias" className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {category.title}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto mt-16 max-w-6xl space-y-20 px-4 sm:px-6">
        {categories.map((category, index) => (
          <section
            key={category.slug}
            id={category.slug}
            aria-labelledby={`${category.slug}-titulo`}
            className="scroll-mt-28"
          >
            <div
              className={cn(
                "grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]",
                index % 2 === 1 && "lg:[&>*:first-child]:order-2"
              )}
            >
              <Reveal className="lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-4xl border border-border/70 shadow-lg">
                  <Image
                    src={categoryImage(category.image)}
                    alt={category.title}
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  id={`${category.slug}-titulo`}
                  className="text-3xl font-semibold sm:text-4xl"
                >
                  {category.title}
                </h2>
                <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {category.intro}
                </p>
                <ul className="mt-8 divide-y divide-border/70">
                  {category.products.map((product) => (
                    <li key={product.name} className="py-5">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-heading text-lg font-semibold">
                          {product.name}
                          {product.highlight ? (
                            <span className="ml-2.5 inline-block translate-y-[-2px] rounded-full bg-accent/12 px-2.5 py-0.5 align-middle text-[0.65rem] font-sans font-semibold tracking-wide uppercase text-accent">
                              Favorito
                            </span>
                          ) : null}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="hidden flex-1 border-b border-dotted border-border sm:block"
                        />
                        <p className="shrink-0 font-semibold whitespace-nowrap text-primary">
                          {product.price}
                        </p>
                      </div>
                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">
                        {product.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="rounded-4xl border border-primary/25 bg-secondary/60 px-7 py-10 text-center sm:px-14">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Não encontrou o que procura?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Fazemos doces por medida — da mesa de casamento à sobremesa sem
            glúten. Conte-nos o que imagina.
          </p>
          <Link
            href="/encomendas"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-6 h-12 rounded-full px-7 text-base"
            )}
          >
            Pedir orçamento
          </Link>
        </div>
      </div>
    </div>
  );
}
