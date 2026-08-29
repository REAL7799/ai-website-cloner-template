"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Inclinação 3D que segue o rato, com brilho a deslizar sobre o cartão.
 * Ativa apenas em dispositivos com rato (hover+pointer fine) e sem
 * prefers-reduced-motion; no mobile é um wrapper neutro.
 * Carrega data-reveal para entrar na animação de reveal da secção.
 */
export function TiltCard({ className, children }: TiltCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    const glare = glareRef.current;
    if (!wrap || !inner || !glare) return;

    const canTilt =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTilt) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rx = (0.5 - py) * 9;
        const ry = (px - 0.5) * 9;
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        glare.style.opacity = "1";
        glare.style.background = `radial-gradient(260px circle at ${px * 100}% ${py * 100}%, oklch(1 0 0 / 30%), transparent 62%)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      inner.style.transform = "";
      glare.style.opacity = "0";
    };

    wrap.addEventListener("pointermove", onMove, { passive: true });
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-reveal
      className={cn("[perspective:900px]", className)}
    >
      <div
        ref={innerRef}
        className="relative h-full transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
      >
        {children}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
