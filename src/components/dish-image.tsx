import Image from "next/image";

import { AzulejoPattern } from "@/components/azulejo";
import { cn } from "@/lib/utils";

interface DishImageProps {
  /** Ficheiro em `public/images/pratos/`, ou undefined enquanto não houver foto. */
  src?: string;
  /** Nome do prato, usado no alt e na inicial do marcador. */
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Fotografia de um prato. Enquanto não houver ficheiro, desenha um marcador
 * gráfico — prato de louça sobre azulejo, com a inicial do prato — em vez de
 * uma imagem partida ou de um retângulo cinzento.
 */
export function DishImage({
  src,
  name,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: DishImageProps) {
  if (src) {
    return (
      <div className={cn("relative isolate overflow-hidden", className)}>
        <AzulejoPattern
          id={`dish-bg-${slugify(name)}`}
          className="pointer-events-none absolute inset-0 size-full text-label/12"
          tile={56}
        />
        <Image
          src={`/images/pratos/${src}`}
          alt={name}
          fill
          sizes={sizes}
          priority={priority}
          // As fotografias vêm recortadas: `contain` mostra o prato inteiro,
          // e a folga evita que encoste às margens.
          className="relative object-contain p-[6%] drop-shadow-[0_18px_28px_rgb(0_0_0/0.22)]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden bg-secondary",
        className
      )}
      role="img"
      aria-label={name}
    >
      <AzulejoPattern
        id={`dish-${slugify(name)}`}
        className="pointer-events-none absolute inset-0 size-full text-label/25"
        tile={56}
      />
      <div className="relative flex aspect-square w-[62%] items-center justify-center rounded-full border border-foreground/10 bg-cream shadow-[0_20px_60px_-20px_rgb(0_0_0/0.35)]">
        <span
          aria-hidden="true"
          className="shout text-[4.5rem] text-foreground/12 sm:text-[6rem]"
        >
          {name.charAt(0)}
        </span>
      </div>
    </div>
  );
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
