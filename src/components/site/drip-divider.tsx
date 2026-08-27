import { cn } from "@/lib/utils";

interface DripDividerProps {
  /** Classe de cor do texto que define o fill do drip (cor da secção acima). */
  className?: string;
}

/**
 * Separador em forma de cobertura de bolo a escorrer — liga as secções
 * mantendo a vibe do bolo ao longo do scroll. Colocar DENTRO da secção de
 * cima (position: relative): a cobertura escorre sobre a secção seguinte.
 */
export function DripDivider({ className }: DripDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-full z-10 -mt-px text-background",
        className,
      )}
    >
      <svg
        className="block h-10 w-full sm:h-14"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 0h1440v26c-20 0-25 30-60 30c-35 0-40-30-60-30c-20 0-25 44-60 44c-35 0-40-44-60-44c-20 0-25 26-60 26c-35 0-40-26-60-26c-20 0-25 50-60 50c-35 0-40-50-60-50c-20 0-25 34-60 34c-35 0-40-34-60-34c-20 0-25 46-60 46c-35 0-40-46-60-46c-20 0-25 28-60 28c-35 0-40-28-60-28c-20 0-25 42-60 42c-35 0-40-42-60-42c-20 0-25 36-60 36c-35 0-40-36-60-36c-20 0-25 48-60 48c-35 0-40-48-60-48c-20 0-25 24-60 24c-35 0-40-24-60-24c-20 0-25 40-60 40c-35 0-40-40-60-40V0z" />
      </svg>
    </div>
  );
}
