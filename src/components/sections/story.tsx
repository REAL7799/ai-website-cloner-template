import { AzulejoPattern } from "@/components/azulejo";
import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function Story({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="historia"
      className="on-ink relative isolate scroll-mt-20 overflow-hidden border-b-2 border-ink"
    >
      <AzulejoPattern
        id="story-azulejo"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 text-label/20"
        tile={96}
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        {/* O ano em tamanho de cartaz, a segurar toda a secção. */}
        <p
          aria-hidden="true"
          className="shout shout-outline text-[clamp(6rem,26vw,20rem)] text-cream/45"
        >
          {site.since}
        </p>

        <div className="mt-4 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 className="shout text-[clamp(2.2rem,6.5vw,5rem)] text-cream">
              {t.story.title}
            </h2>
            <p className="mt-8 max-w-xl font-heading text-xl leading-snug text-label sm:text-2xl">
              {t.story.lead}
            </p>
          </div>

          <div className="space-y-6">
            {t.story.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="max-w-lg text-base leading-relaxed text-cream/70"
              >
                {paragraph}
              </p>
            ))}
            <dl className="grid grid-cols-2 gap-px border-t border-cream/15 pt-8">
              {[
                { term: t.story.statYearsLabel, value: t.story.statYearsValue },
                { term: t.story.statPlaceLabel, value: t.story.statPlaceValue },
              ].map((stat) => (
                <div key={stat.term}>
                  <dt className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-cream/45">
                    {stat.term}
                  </dt>
                  <dd className="shout mt-2 text-3xl text-cream sm:text-4xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
