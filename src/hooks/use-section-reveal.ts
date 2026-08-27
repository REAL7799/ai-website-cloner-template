"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Anima com stagger todos os elementos [data-reveal] dentro da secção
 * quando esta entra no viewport. Respeita prefers-reduced-motion.
 */
export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = section.querySelectorAll("[data-reveal]");
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return ref;
}
