import Image from "next/image";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";
import { TiltCard } from "@/components/site/tilt-card";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const message = `Olá, Fátima Cake! 🎂 Gostaria de encomendar: *${product.name}* (${product.price}). Ainda está disponível?`;

  return (
    <TiltCard className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 font-handwriting text-lg leading-none text-primary-foreground shadow-md">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">
            {product.name}
          </h3>
          <p className="shrink-0 font-handwriting text-2xl leading-none text-primary">
            {product.price}
          </p>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <Button
          className="mt-3 w-full rounded-full"
          render={
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          Encomendar
        </Button>
      </div>
      </article>
    </TiltCard>
  );
}
