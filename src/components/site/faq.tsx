import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { FAQS } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="Tudo o que precisas"
          scriptWord="de saber"
        />

        <div className="mt-12 space-y-3.5 md:mt-16">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delay={i * 80}>
              <details className="group rounded-2xl border border-primary/10 bg-card shadow-sm transition-colors open:border-primary/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden md:px-6 md:py-5">
                  <h3 className="font-display text-base font-semibold tracking-tight md:text-lg">
                    {faq.question}
                  </h3>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-transform duration-300 group-open:rotate-45">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:text-[0.95rem]">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
