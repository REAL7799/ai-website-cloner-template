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
        <path d="M0 0h1440v26c-15 0-22 38-45 38s-25-38-45-38-24 52-46 52-26-52-47-52-23 30-44 30-24-44-46-44-25 60-47 60-24-60-46-60-22 34-44 34-25-48-47-48-24 56-46 56-25-56-46-56-23 28-45 28-24-42-46-42-25 64-47 64-24-64-46-64-22 32-44 32-25-46-47-46-24 54-46 54-25-54-46-54-23 26-45 26-24-40-46-40-25 58-47 58-24-58-46-58-22 36-44 36-25-50-47-50-24 48-46 48-25-48-47-48-22 24-44 24-24-24-46-24H0z" />
      </svg>
    </div>
  );
}
