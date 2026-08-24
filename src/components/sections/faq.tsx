import { ChevronDown } from "lucide-react";
import { faqItems } from "@/lib/site-config";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading eyebrow="Perguntas frequentes" title="Tudo o que precisa de saber" />
        <div className="divide-y divide-border border-y border-border">
          {faqItems.map((item) => (
            <Reveal key={item.question}>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-heading text-xl font-medium md:text-2xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    className="size-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
