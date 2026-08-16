import { Clock, Coffee, MapPin, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getDictionary } from "@/content/dictionary";
import { site } from "@/content/site";
import type { Locale } from "@/types/menu";

export function FactsStrip({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    {
      icon: MapPin,
      label: t.facts.addressLabel,
      value: `${site.address.street}, ${site.address.locality}`,
    },
    { icon: Clock, label: t.facts.hoursLabel, value: t.facts.hoursValue },
    { icon: Wallet, label: t.facts.priceLabel, value: t.facts.priceValue },
    { icon: Coffee, label: t.facts.serviceLabel, value: t.facts.serviceValue },
  ];

  return (
    <section className="border-b border-border bg-background">
      <ul className="mx-auto grid w-full max-w-6xl gap-px px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {facts.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex gap-3.5 px-1 py-3">
            <Icon
              className="mt-0.5 size-5 shrink-0 text-azulejo"
              aria-hidden="true"
            />
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                {value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
