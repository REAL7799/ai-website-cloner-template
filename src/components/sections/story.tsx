import { AzulejoPattern } from "@/components/azulejo";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function Story({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="historia"
      className="scroll-mt-24 border-b border-border bg-background"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
            {t.story.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/90">
            {t.story.lead}
          </p>
          {t.story.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-5 leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="relative isolate overflow-hidden rounded-lg border border-border bg-cream">
          <AzulejoPattern
            id="story-azulejo"
            className="pointer-events-none absolute inset-0 size-full text-azulejo/20"
            tile={64}
          />
          <div className="relative flex flex-col items-center px-8 py-16 text-center sm:py-20">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              {t.story.badgeTitle}
            </p>
            <p className="mt-4 font-heading text-7xl font-semibold tabular-nums text-primary sm:text-8xl">
              {site.since}
            </p>
            <div className="mt-6 h-px w-16 bg-border" />
            <p className="mt-6 text-sm text-muted-foreground">
              {t.story.badgeSubtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
