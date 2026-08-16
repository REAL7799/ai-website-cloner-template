import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

/** Faixa de factos logo abaixo do marquee: o essencial num relance. */
export function FactsStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const facts = [
    {
      label: t.facts.addressLabel,
      value: `${site.address.street}, ${site.address.locality}`,
    },
    { label: t.facts.hoursLabel, value: t.facts.hoursValue },
    { label: t.facts.priceLabel, value: t.facts.priceValue },
    { label: t.facts.serviceLabel, value: t.facts.serviceValue },
  ];

  return (
    <section className="on-ink border-b-2 border-ink">
      <dl className="mx-auto grid w-full max-w-[110rem] gap-px px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {facts.map((fact) => (
          <div key={fact.label} className="lg:pr-8">
            <dt className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-label">
              {fact.label}
            </dt>
            <dd className="mt-2.5 font-heading text-lg leading-snug text-cream">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
