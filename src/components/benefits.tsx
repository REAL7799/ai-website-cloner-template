import { BadgeCheck, HeartHandshake, Truck, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Entrega em todo o país",
    description: "Maputo e Matola em 24h, restantes províncias em 48–72h.",
  },
  {
    icon: BadgeCheck,
    title: "Qualidade garantida",
    description: "Cada peça é verificada uma a uma antes do envio.",
  },
  {
    icon: Wallet,
    title: "Pagamento flexível",
    description: "M-Pesa, e-Mola ou numerário na entrega.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento VIP",
    description: "Ajudamos a escolher o look certo, sem compromisso.",
  },
];

export function Benefits() {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold">
              <benefit.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">{benefit.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
