import type { Metadata } from "next";
import { CalendarDays, MessageCircle, Truck } from "lucide-react";

import { OrderForm } from "@/components/order/order-form";
import { Reveal } from "@/components/site/reveal";
import { orderFaqs } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Encomendas",
  description:
    "Encomende bolos de festa, tartes e doces da Doce Alma: peça orçamento por WhatsApp ou e-mail e receba resposta no próprio dia.",
  alternates: { canonical: "/encomendas" },
};

const notes = [
  {
    icon: CalendarDays,
    title: "Antecedência",
    text: "48h para bolos caseiros e tartes; 1 semana para bolos decorados; 4–6 semanas para casamentos.",
  },
  {
    icon: MessageCircle,
    title: "Resposta rápida",
    text: "Orçamentos respondidos no próprio dia útil, por WhatsApp ou e-mail.",
  },
  {
    icon: Truck,
    title: "Entrega e montagem",
    text: "Levantamento na loja ou entrega na Grande Lisboa, com montagem incluída nos bolos de festa.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: orderFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function EncomendasPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <header className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary">
          Encomendas
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
          Vamos fazer o bolo da sua festa?
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Preencha o pedido abaixo — abre o WhatsApp com a mensagem pronta a
          enviar. Se preferir, ligue-nos: {siteConfig.phone}.
        </p>
      </header>

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <OrderForm />
        </Reveal>

        <div className="space-y-6">
          {notes.map((note, i) => (
            <Reveal
              key={note.title}
              delay={i * 100}
              className="flex gap-4 rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <note.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-base font-semibold">
                  {note.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {note.text}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal
            delay={280}
            className="rounded-3xl border border-primary/25 bg-secondary/60 p-6"
          >
            <h2 className="font-heading text-base font-semibold">
              Encomendas de empresa
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Coffee breaks, cabazes de Natal e mesas de evento. Escreva-nos
              para{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-primary underline underline-offset-4"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>

      <section
        aria-labelledby="faq-titulo"
        className="mx-auto mt-24 max-w-3xl px-4 sm:px-6"
      >
        <h2
          id="faq-titulo"
          className="text-center text-3xl font-semibold sm:text-4xl"
        >
          Perguntas frequentes
        </h2>
        <div className="mt-10 space-y-3">
          {orderFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border/70 bg-card px-6 py-4 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold outline-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-primary transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
