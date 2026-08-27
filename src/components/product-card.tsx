import Image from "next/image";
import type { Product } from "@/types";
import { WhatsAppIcon } from "@/components/icons";
import { formatPrice, productWhatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  "Mais Vendido": "bg-gold text-white",
  Novo: "bg-primary text-primary-foreground",
  Promoção: "bg-destructive text-white",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover object-top"
        />
        {product.imageBack ? (
          <Image
            src={product.imageBack}
            alt={`${product.name} — vista de costas`}
            fill
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover object-top opacity-0 group-hover:opacity-100"
          />
        ) : null}
        {product.badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm",
              badgeStyles[product.badge],
            )}
          >
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="flex grow flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 text-[15px] font-medium leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="font-serif text-lg font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </p>
        <a
          href={productWhatsappLink(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp py-2.5 text-sm font-semibold text-white hover:bg-whatsapp-dark"
        >
          <WhatsAppIcon className="size-4" />
          Encomendar
        </a>
      </div>
    </article>
  );
}
