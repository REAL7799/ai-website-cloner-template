import Image from "next/image";
import { Sparkles, Star } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { formatPrice, whatsappLink } from "@/lib/site";

const heroHighlights = [
  { value: "+500", label: "Clientas felizes" },
  { value: "24–48h", label: "Entrega rápida" },
  { value: "4.9 ★", label: "Avaliação média" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 -z-10 select-none font-serif text-[11rem] font-semibold italic leading-none text-foreground/[0.04] sm:text-[15rem] lg:text-[19rem]"
      >
        Dayana
      </p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 -z-10 size-96 rounded-full bg-gold-soft/50 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold shadow-sm">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Nova Coleção · 2026
          </p>
          <h1 className="mt-6 font-serif text-[2.6rem] font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            Elegância que se veste,{" "}
            <em className="text-gold">confiança que se sente.</em>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Da Clóset Dayana para o seu guarda-roupa: vestidos, conjuntos e
            peças exclusivas escolhidas a dedo — com entrega em todo Moçambique
            e atendimento personalizado pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#colecoes"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Explorar Coleções
            </a>
            <a
              href={whatsappLink(
                "Olá Clóset Dayana! 👗 Vi o vosso site e quero fazer uma encomenda.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-whatsapp/30 bg-card px-7 py-3.5 text-sm font-semibold text-whatsapp-dark shadow-sm hover:bg-whatsapp hover:text-white"
            >
              <WhatsAppIcon className="size-4" />
              Encomendar no WhatsApp
            </a>
          </div>

          <dl className="mt-10 flex max-w-lg divide-x divide-border border-t border-border pt-6">
            {heroHighlights.map((item) => (
              <div key={item.label} className="flex-1 px-4 first:pl-0 last:pr-0">
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-serif text-2xl font-semibold text-foreground">
                  {item.value}
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-5 translate-y-5 rounded-b-[2rem] rounded-t-[999px] border border-gold/40"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px] border-8 border-card bg-card shadow-xl">
            <Image
              src="/images/products/vestido-longo-dourado.jpg"
              alt="Vestido longo dourado da nova coleção Clóset Dayana"
              fill
              sizes="(min-width: 1024px) 32rem, 90vw"
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="absolute -left-4 bottom-10 hidden items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-lg sm:flex lg:-left-10">
            <Image
              src="/images/products/vestido-corset-rubi.jpg"
              alt="Vestido Corset Rubi"
              width={56}
              height={70}
              className="h-[70px] w-14 rounded-xl border border-border object-cover object-top"
            />
            <div>
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                <Star className="size-3 fill-gold" aria-hidden="true" />
                Mais vendido
              </p>
              <p className="mt-0.5 text-sm font-medium">Vestido Corset Rubi</p>
              <p className="text-sm font-semibold text-foreground">
                {formatPrice(2750)}
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-primary py-3.5 text-primary-foreground">
        <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 text-[11px] font-medium uppercase tracking-[0.28em] sm:text-xs">
          {["Vestidos", "Conjuntos", "Bermudas", "Calções", "Ocasião Especial"].map(
            (category, index) => (
              <span key={category} className="flex items-center gap-5">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-gold">
                    ✦
                  </span>
                ) : null}
                {category}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
