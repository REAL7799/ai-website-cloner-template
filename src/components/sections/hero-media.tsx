"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// No servidor assume-se movimento reduzido: o vídeo só monta no cliente.
function getServerReducedMotion() {
  return true;
}

/**
 * Fundo do hero: imagem sempre presente; o vídeo (public/videos/hero.mp4)
 * sobrepõe-se com fade quando existir e puder ser reproduzido. Se o ficheiro
 * não existir (onError) ou o utilizador preferir movimento reduzido, o vídeo
 * nunca é montado e a imagem fica como fundo definitivo.
 */
export function HeroMedia() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  const allowVideo = !reducedMotion;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden>
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {allowVideo && !failed && (
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setCanPlay(true)}
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            canPlay ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
