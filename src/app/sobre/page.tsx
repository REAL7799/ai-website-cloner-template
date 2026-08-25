import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { values } from "@/lib/content";
import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description: `A história da ${siteConfig.name}: ${siteConfig.founded ? `desde ${siteConfig.founded}` : ""} a fazer bolos, tartes e doces à mão em ${siteConfig.address.city}, com receitas de família e ingredientes locais.`,
  alternates: { canonical: "/sobre" },
};

const milestones = [
  {
    year: "2009",
    title: "O primeiro forno",
    text: `O ${siteConfig.founder} abre a ${siteConfig.name} numa loja de esquina com três receitas da avó Alice e um balcão em segunda mão.`,
  },
  {
    year: "2014",
    title: "O bolo que mudou tudo",
    text: "Um bolo de casamento fotografado numa revista enche a agenda de encomendas de festa para o ano inteiro.",
  },
  {
    year: "2019",
    title: "Cozinha nova, mesmo bairro",
    text: "Duplicámos a cozinha para dar resposta às encomendas — sem nunca sair da rua onde tudo começou.",
  },
  {
    year: "Hoje",
    title: "Três gerações à mesa",
    text: "Somos oito pessoas entre forno e balcão, e há netos dos primeiros clientes a pedir o bolo de aniversário.",
  },
];

export default function SobrePage() {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <header className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary">
              Sobre nós
            </p>
            <h1 className="mt-3 text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">
              Uma pastelaria de bairro, com orgulho nisso
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Há um cheiro que define a {siteConfig.name}: manteiga a derreter
              às cinco da manhã. É a essa hora que se estende a massa folhada,
              se acendem os fornos e se decide o que vai estar na vitrine — em
              função da fruta que chegou do mercado.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Não somos uma fábrica nem queremos ser. Cada bolo de festa é
              desenhado com quem o encomenda, cada tarte leva a fruta da época,
              e o pastel de nata sai quente duas vezes por dia. O resto é
              conversa de balcão.
            </p>
          </div>
          <Reveal className="overflow-hidden rounded-4xl border border-border/70 shadow-xl shadow-primary/10">
            <Image
              src={images.interior}
              alt={`Interior da ${siteConfig.name}, com a vitrine e o balcão de madeira`}
              priority
              sizes="(max-width: 1024px) 100vw, 540px"
              className="h-auto w-full object-cover"
            />
          </Reveal>
        </div>
      </header>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="O nosso percurso"
          title="De uma loja de esquina até à sua festa"
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone, i) => (
            <Reveal
              as="li"
              key={milestone.year}
              delay={i * 100}
              className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
            >
              <p className="font-heading text-2xl font-semibold text-primary">
                {milestone.year}
              </p>
              <h2 className="mt-2 font-heading text-lg font-semibold">
                {milestone.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {milestone.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mt-24 border-y border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-4xl border border-border/70 shadow-lg">
              <Image
                src={images.bancada}
                alt="Bancada de trabalho com massa estendida, rolo e uma tarte de maçã em preparação"
                sizes="(max-width: 1024px) 100vw, 540px"
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Em que acreditamos"
              title="Três regras que nunca saem da cozinha"
            />
            <ul className="mt-8 space-y-6">
              {values.map((value) => (
                <li key={value.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-primary"
                  />
                  <div>
                    <h2 className="font-heading text-lg font-semibold">
                      {value.title}
                    </h2>
                    <p className="mt-1 leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Venha provar — a porta está aberta
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {siteConfig.address.street}, {siteConfig.address.city}. Ou comece já a
          sua encomenda sem sair de casa.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/encomendas"
            className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-full px-7 text-base")}
          >
            Fazer encomenda
          </Link>
          <Link
            href="/doces"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full px-7 text-base"
            )}
          >
            Ver a doçaria
          </Link>
        </div>
      </section>
    </div>
  );
}
