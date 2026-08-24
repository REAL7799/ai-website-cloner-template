import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p
        className={cn(
          "mb-4 flex items-center gap-3 text-xs font-medium tracking-[0.3em] uppercase",
          align === "center" && "justify-center",
          dark ? "text-gold-soft" : "text-gold-text",
        )}
      >
        <span className="h-px w-8 bg-gold/60" aria-hidden />
        {eyebrow}
        {align === "center" && <span className="h-px w-8 bg-gold/60" aria-hidden />}
      </p>
      <h2
        className={cn(
          "font-heading text-4xl font-medium text-balance md:text-5xl",
          dark ? "text-espresso-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed md:text-lg",
            dark ? "text-espresso-foreground/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
