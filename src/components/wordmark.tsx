import { cn } from "@/lib/utils";
import { site } from "@/content/site";

interface WordmarkProps {
  className?: string;
  /** Mostra "desde 1952" por baixo do nome. */
  withSince?: boolean;
  sinceLabel?: string;
}

/**
 * Assinatura da casa. Ecoa o logótipo manuscrito da carta impressa,
 * com o "desde 1952" em versaletes por baixo.
 */
export function Wordmark({
  className,
  withSince = false,
  sinceLabel,
}: WordmarkProps) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="font-script tracking-wide">{site.name}</span>
      {withSince ? (
        <span className="mt-1 text-[0.32em] font-sans font-medium uppercase tracking-[0.42em] text-muted-foreground">
          {sinceLabel ?? `desde ${site.since}`}
        </span>
      ) : null}
    </span>
  );
}
