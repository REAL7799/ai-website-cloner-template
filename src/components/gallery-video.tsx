"use client";

import { useEffect, useRef } from "react";

interface GalleryVideoProps {
  webm: string;
  mp4: string;
  poster: string;
  caption: string;
  className?: string;
}

/**
 * Azulejo de vídeo da galeria: renderiza no servidor com poster (funciona sem
 * JavaScript) e, no cliente, toca em loop apenas enquanto está visível.
 * Com `prefers-reduced-motion` fica o poster estático.
 */
export function GalleryVideo({ webm, mp4, poster, caption, className }: GalleryVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={caption}
      className={className}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
