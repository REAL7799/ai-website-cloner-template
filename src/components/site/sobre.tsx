"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CakeSlice, HeartHandshake, Leaf, Truck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/lib/site";
import { Sprinkles } from "@/components/site/sprinkles";
import { DripDivider } from "@/components/site/drip-divider";
import { useSectionReveal } from "@/hooks/use-section-reveal";

const stats = [
  { value: 14, suffix: " anos", label: "de forno aceso" },
  { value: 5000, suffix: "+", label: "bolos entregues" },
  { value: 2000, suffix: "+", label: "clientes felizes" },
];

const valores = [
  {
    icon: Leaf,
    title: "Ingredientes escolhidos a dedo",
    text: "Ovos frescos, manteiga de verdade e fruta da época — nada de misturas prontas.",
  },
  {
    icon: CakeSlice,
    title: "Feito no próprio dia",
    text: "Cada encomenda sai do forno no dia da entrega, para chegar sempre fresquinha.",
  },
  {
    icon: HeartHandshake,
    title: "Personalização total",
    text: "Do sabor à decoração, desenhamos o bolo dos seus sonhos consigo.",
  },
  {
    icon: Truck,
    title: "Entrega com carinho",
    text: "Entregamos em toda a cidade ou prepare-se para levantar quentinho na loja.",
  },
];

export function Sobre() {
  const sectionRef = useSectionReveal<HTMLElement>();
  const statsRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count);
        const counter = { value: 0 };
        // Sem JS ou com reduced-motion o valor final já está no HTML;
        // aqui recomeça do zero apenas quando vamos mesmo animar.
        node.textContent = "0";
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = Math.round(counter.value).toLocaleString("pt-PT");
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      aria-label="Sobre a Fátima Cake"
      className="relative bg-secondary pb-24 pt-24"
    >
      <Sprinkles />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-xl shadow-primary/10">
              <Image
                src="/images/sobre-pasteleira.webp"
                alt="Mãos de pasteleira a decorar um bolo com buttercream"
                width={1024}
                height={768}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl bg-card px-6 py-4 shadow-lg sm:-right-6">
              <p className="font-handwriting text-3xl leading-none text-primary">
                desde {site.foundedYear}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                a adoçar celebrações
              </p>
            </div>
          </div>

          <div>
            <p data-reveal className="font-handwriting text-3xl text-primary">
              a nossa história
            </p>
            <h2
              data-reveal
              className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Da cozinha da Fátima para a sua mesa
            </h2>
            <p data-reveal className="mt-5 leading-relaxed text-muted-foreground">
              O que começou com os bolos de domingo da Fátima para a família
              tornou-se a pastelaria de bairro onde cada celebração ganha vida.
              Aqui não há atalhos: massas batidas à mão, coberturas afinadas ao
              gosto de cada cliente e aquele cuidado que só quem ama o que faz
              consegue pôr num bolo.
            </p>

            <dl
              ref={statsRef}
              data-reveal
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-card p-4 text-center shadow-sm"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-handwriting text-3xl leading-none text-primary sm:text-4xl">
                    <span data-count={stat.value}>
                      {stat.value.toLocaleString("pt-PT")}
                    </span>
                    {stat.suffix}
                  </dd>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor) => (
            <div
              key={valor.title}
              data-reveal
              className="rounded-3xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <valor.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">
                {valor.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {valor.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <DripDivider className="text-secondary" />
    </section>
  );
}
