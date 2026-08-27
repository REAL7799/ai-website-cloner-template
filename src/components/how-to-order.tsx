import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

const steps = [
  {
    number: "01",
    title: "Escolha as suas peças",
    description:
      "Navegue pelo catálogo e escolha os looks que combinam consigo.",
  },
  {
    number: "02",
    title: "Encomende no WhatsApp",
    description:
      "Clique em “Encomendar” — a mensagem já vai pronta com a peça e o preço.",
  },
  {
    number: "03",
    title: "Receba onde estiver",
    description:
      "Entregamos em todo Moçambique. Pague por M-Pesa, e-Mola ou na entrega.",
  },
];

export function HowToOrder() {
  return (
    <section
      id="como-comprar"
      className="scroll-mt-24 bg-primary py-20 text-primary-foreground lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
            Simples e sem complicações
            <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
          </p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            Como encomendar em 3 passos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/70">
            Sem checkout, sem contas para criar — a sua encomenda acontece numa
            conversa.
          </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="text-center sm:text-left">
              <p className="font-serif text-5xl font-semibold text-gold/90">
                {step.number}
              </p>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <a
            href={whatsappLink(
              "Olá Clóset Dayana! 👗 Quero começar a minha encomenda.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon className="size-5" />
            Começar a minha encomenda
          </a>
        </div>
      </div>
    </section>
  );
}
