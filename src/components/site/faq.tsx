"use client";

import { ChevronDown } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const faqs = [
  {
    question: "Com quanta antecedência devo encomendar?",
    answer:
      "Para bolos simples e tartes, 48 horas chegam. Bolos personalizados e de casamento pedem pelo menos uma semana, para desenharmos tudo consigo ao detalhe.",
  },
  {
    question: "Fazem entregas ao domicílio?",
    answer:
      "Sim! Entregamos em toda a cidade com taxa simbólica consoante a zona. Também pode levantar a sua encomenda na loja, quentinha e pronta a brilhar na festa.",
  },
  {
    question: "Posso personalizar o meu bolo?",
    answer:
      "Claro — é a nossa especialidade. Escolha sabores, recheios, cores e tema; enviamos uma proposta com foto de referência antes de confirmar a encomenda.",
  },
  {
    question: "Têm opções sem glúten ou sem lactose?",
    answer:
      "Temos! Avise-nos na encomenda e preparamos versões sem glúten, sem lactose ou com menos açúcar, sem perder o sabor de bolo caseiro.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Confirmamos a encomenda com um sinal de 30% (MB WAY ou transferência) e o restante na entrega. Simples, como deve ser.",
  },
];

export function Faq() {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-label="Perguntas frequentes"
      className="relative bg-background pb-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p data-reveal className="font-handwriting text-3xl text-primary">
            tira-dúvidas
          </p>
          <h2
            data-reveal
            className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Perguntas Frequentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              data-reveal
              className="group rounded-2xl border border-border/70 bg-card px-6 py-4 shadow-sm open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground sm:text-base [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
