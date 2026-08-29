import { Gift, HandHeart, Infinity as InfinityIcon, Palette } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { BENEFITS } from "@/lib/site";

const BENEFIT_ICONS = {
  infinity: InfinityIcon,
  palette: Palette,
  "hand-heart": HandHeart,
  gift: Gift,
} as const;

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Porquê rosas eternas"
          title="Um presente que fica"
          scriptWord="para sempre"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => {
            const Icon = BENEFIT_ICONS[benefit.icon as keyof typeof BENEFIT_ICONS];
            return (
              <Reveal key={benefit.title} delay={i * 100}>
                <article className="group h-full rounded-3xl border border-primary/10 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_25px_50px_-25px_oklch(0.62_0.17_3/0.4)] md:p-7">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight md:text-xl">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
