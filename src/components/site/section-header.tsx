import { RoseFlourishIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  scriptWord?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  scriptWord,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase md:text-sm">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.15]">
        {title}
        {scriptWord ? (
          <span className="font-script block pt-2 text-[2.6rem] leading-none font-normal text-primary md:text-[3.4rem]">
            {scriptWord}
          </span>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
      <RoseFlourishIcon
        aria-hidden="true"
        className="mx-auto mt-5 h-5 w-28 text-primary/50"
      />
    </Reveal>
  );
}
