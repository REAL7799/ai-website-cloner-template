"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { defaultOrderMessage, whatsappLink } from "@/lib/site";
import { Sprinkles } from "@/components/site/sprinkles";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    // Com reduced-motion o vídeo fica parado no poster/primeiro frame.
    const video = section.querySelector("video");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (video && reduceMotion.matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        section.querySelectorAll("[data-hero-item]"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, delay: 0.15 },
      ).fromTo(
        section.querySelector("[data-hero-badge]"),
        { opacity: 0, scale: 0.4, rotate: -30 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.5",
      );

      // Ao fazer scroll, o vídeo aproxima-se e o texto sobe — o bolo
      // "entrega" a página à secção seguinte.
      gsap.to(videoWrapRef.current, {
        scale: 1.08,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(contentRef.current, {
        yPercent: -14,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "75% top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Boas-vindas à Fátima Cake"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* React 19 iça este link para o <head>: pré-carrega o poster (LCP). */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-cake.webp"
        type="image/webp"
      />
      <div ref={videoWrapRef} className="absolute inset-0" aria-hidden="true">
        <video
          className="size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-cake.webp"
        >
          <source src="/videos/hero-bolo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45 sm:via-background/55 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Sprinkles variant="hero" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 pt-32 sm:px-6"
      >
        <div className="max-w-xl">
          <p
            data-hero-item
            className="font-handwriting text-2xl text-primary sm:text-3xl"
          >
            Bem-vindo à nossa pastelaria artesanal ♥
          </p>
          <h1
            data-hero-item
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Bolos feitos à mão,
            <span className="block font-handwriting text-5xl font-semibold leading-tight text-primary sm:text-7xl">
              com amor no centro
            </span>
          </h1>
          <p
            data-hero-item
            className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg"
          >
            Na Fátima Cake, cada bolo e tarte nasce de receitas de família e
            ingredientes escolhidos a dedo. Encomende pelo WhatsApp e receba
            fresquinho, feito no próprio dia.
          </p>
          <div data-hero-item className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              className="h-12 rounded-full px-7 text-base shadow-lg shadow-primary/25"
              render={<a href="#vitrine" />}
            >
              Ver a vitrine
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full bg-background/70 px-6 text-base backdrop-blur"
              render={
                <a
                  href={whatsappLink(defaultOrderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <WhatsAppIcon className="size-5 text-primary" />
              Encomendar já
            </Button>
          </div>
          <p
            data-hero-item
            className="mt-6 text-sm text-muted-foreground"
          >
            ★★★★★ <span className="font-medium text-foreground">4,9/5</span> por
            mais de 2.000 clientes felizes
          </p>
        </div>
      </div>

      <div
        data-hero-badge
        aria-hidden="true"
        className="absolute bottom-24 right-6 z-10 hidden size-28 lg:bottom-28 lg:right-14 lg:block"
      >
        <div className="relative size-full animate-spin-slow">
          <svg viewBox="0 0 100 100" className="size-full">
            <defs>
              <path
                id="badge-circle"
                d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="fill-primary text-[9px] font-semibold uppercase tracking-[0.18em]">
              <textPath href="#badge-circle" textLength="230">
                Fátima Cake • Feito à mão • 2012 •
              </textPath>
            </text>
          </svg>
        </div>
        <span className="absolute inset-0 flex items-center justify-center font-handwriting text-4xl text-primary">
          ♥
        </span>
      </div>

      <a
        href="#vitrine"
        aria-label="Descer para a vitrine"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-border bg-background/80 p-2.5 text-primary shadow-sm backdrop-blur transition-transform hover:translate-y-1"
      >
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
