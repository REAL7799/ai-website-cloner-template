"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso da animação em milissegundos. */
  delay?: number;
  as?: "div" | "section" | "span" | "li";
}

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={setRef}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
