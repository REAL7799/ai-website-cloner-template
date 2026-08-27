"use client";

import { useState } from "react";
import { categories, products } from "@/lib/products";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/site/product-card";
import { Sprinkles } from "@/components/site/sprinkles";
import { DripDivider } from "@/components/site/drip-divider";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { cn } from "@/lib/utils";

type Filter = "todos" | ProductCategory;

export function Vitrine() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const [filter, setFilter] = useState<Filter>("todos");

  const visible =
    filter === "todos"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="vitrine"
      aria-label="Vitrine de bolos e tartes"
      className="relative bg-background pb-24 pt-10 sm:pt-16"
    >
      <Sprinkles />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="font-handwriting text-3xl text-primary">
            fresquinhos todos os dias
          </p>
          <h2
            data-reveal
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            A Nossa Vitrine
          </h2>
          <p data-reveal className="mt-4 text-muted-foreground">
            Bolos e tartes disponíveis por encomenda. Escolha o seu favorito e
            peça diretamente pelo WhatsApp — entregamos com todo o carinho.
          </p>
        </div>

        <div
          data-reveal
          role="tablist"
          aria-label="Filtrar produtos por categoria"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              onClick={() => setFilter(cat.id as Filter)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                filter === cat.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p
          data-reveal
          className="mt-10 text-center text-sm text-muted-foreground"
        >
          Não encontrou o que procura?{" "}
          <span className="font-handwriting text-xl text-primary">
            Fazemos bolos personalizados!
          </span>{" "}
          Fale connosco no WhatsApp.
        </p>
      </div>

      <DripDivider className="text-background" />
    </section>
  );
}
