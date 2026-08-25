import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-heading text-7xl font-semibold text-primary/30">404</p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
        Esta página já saiu da vitrine
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Ou nunca existiu, ou alguém a comeu. De qualquer forma, o melhor está na
        página inicial.
      </p>
      <Link
        href="/"
        className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 rounded-full px-7 text-base")}
      >
        Voltar ao início
      </Link>
    </div>
  );
}
