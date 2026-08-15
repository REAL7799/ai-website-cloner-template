"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Flavor } from "@/lib/flavors";

interface FallingItem {
  src: string;
  top: string;
  left: string;
  size: number;
  rotateFrom: number;
  rotateTo: number;
  delay: number;
}

const lemonDrops: FallingItem[] = [
  { src: "/images/cutouts/lemon.png", top: "6%", left: "6%", size: 88, rotateFrom: -25, rotateTo: 10, delay: 0 },
  { src: "/images/cutouts/leaf.png", top: "3%", left: "20%", size: 54, rotateFrom: 15, rotateTo: -20, delay: 0.05 },
  { src: "/images/cutouts/lemon.png", top: "9%", left: "30%", size: 60, rotateFrom: 20, rotateTo: -15, delay: 0.1 },
  { src: "/images/cutouts/leaf.png", top: "5%", left: "0%", size: 42, rotateFrom: -10, rotateTo: 25, delay: 0.15 },
];

const berryDrops: FallingItem[] = [
  { src: "/images/cutouts/strawberry.png", top: "4%", left: "8%", size: 88, rotateFrom: -20, rotateTo: 12, delay: 0 },
  { src: "/images/cutouts/blueberry.png", top: "2%", left: "24%", size: 54, rotateFrom: 10, rotateTo: -18, delay: 0.05 },
  { src: "/images/cutouts/raspberry.png", top: "6%", left: "36%", size: 60, rotateFrom: -15, rotateTo: 20, delay: 0.1 },
  { src: "/images/cutouts/blueberry.png", top: "3%", left: "16%", size: 40, rotateFrom: 18, rotateTo: -10, delay: 0.15 },
];

const drips = [
  { left: "42%", width: 8, maxHeight: 130, delay: 0 },
  { left: "49%", width: 5, maxHeight: 90, delay: 0.08 },
  { left: "56%", width: 7, maxHeight: 160, delay: 0.03 },
  { left: "63%", width: 4, maxHeight: 80, delay: 0.12 },
];

/** Scroll progress for a section: 0 as it enters from below, 1 as it exits above. */
function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return scrollYProgress;
}

function FallingCutout({ item, progress }: { item: FallingItem; progress: MotionValue<number> }) {
  const start = 0.08 + item.delay;
  const end = start + 0.18;
  const y = useTransform(progress, [start, end], [-140, 0]);
  const opacity = useTransform(progress, [start, start + 0.05, end], [0, 1, 1]);
  const rotate = useTransform(progress, [start, end], [item.rotateFrom, item.rotateTo]);
  const rippleScale = useTransform(progress, [end, end + 0.08], [0, 3.2]);
  const rippleOpacity = useTransform(progress, [end, end + 0.02, end + 0.08], [0, 0.7, 0]);

  return (
    <motion.div
      className="absolute"
      style={{ top: item.top, left: item.left, width: item.size, height: item.size, y, opacity, rotate }}
    >
      <img src={item.src} alt="" className="h-full w-full object-contain drop-shadow-xl" />
      <motion.div
        className="absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/70"
        style={{ scale: rippleScale, opacity: rippleOpacity }}
      />
    </motion.div>
  );
}

function FallingCutouts({ items, progress }: { items: FallingItem[]; progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {items.map((item, index) => (
        <FallingCutout key={`${item.src}-${index}`} item={item} progress={progress} />
      ))}
    </div>
  );
}

function Drip({
  left,
  width,
  maxHeight,
  delay,
  progress,
}: {
  left: string;
  width: number;
  maxHeight: number;
  delay: number;
  progress: MotionValue<number>;
}) {
  const start = 0.1 + delay;
  const end = start + 0.4;
  const height = useTransform(progress, [start, end], [0, maxHeight]);
  const trailOpacity = useTransform(progress, [start, start + 0.08], [0, 0.85]);
  const headOpacity = useTransform(progress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const headY = useTransform(progress, [start, end], [0, maxHeight]);

  return (
    <div className="absolute top-[10%]" style={{ left }}>
      <motion.div
        className="rounded-full"
        style={{
          width,
          height,
          opacity: trailOpacity,
          background: "linear-gradient(to bottom, rgba(210,140,220,0.85), rgba(120,50,130,0.25))",
        }}
      />
      <motion.div
        className="absolute top-0 rounded-full"
        style={{
          left: -width * 0.3,
          width: width * 1.6,
          height: width * 1.6,
          y: headY,
          opacity: headOpacity,
          background: "radial-gradient(circle at 35% 30%, rgba(230,180,235,0.95), rgba(160,70,170,0.7))",
        }}
      />
    </div>
  );
}

function DrippingJuice({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {drips.map((drip, index) => (
        <Drip key={index} {...drip} progress={progress} />
      ))}
    </div>
  );
}

function PlantSway({
  src,
  className,
  size,
  progress,
  rotateKeyframes,
  driftKeyframes,
}: {
  src: string;
  className?: string;
  size: { width: number; height: number };
  progress: MotionValue<number>;
  rotateKeyframes: number[];
  driftKeyframes: number[];
}) {
  const rotate = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], rotateKeyframes);
  const x = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], driftKeyframes);

  return (
    <motion.div
      className={cn("pointer-events-none absolute hidden lg:block", className)}
      style={{ ...size, rotate, x }}
    >
      <img src={src} alt="" className="h-full w-full object-contain opacity-95 drop-shadow-lg" />
    </motion.div>
  );
}

function ParallaxImage({ flavor, progress, withShimmer }: { flavor: Flavor; progress: MotionValue<number>; withShimmer?: boolean }) {
  const y = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 scale-[1.15]" style={{ y }}>
        <Image src={flavor.image} alt={flavor.imageAlt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      {withShimmer && <div className="shimmer-sweep absolute inset-0 mix-blend-overlay" />}
    </div>
  );
}

function KenBurnsImage({ flavor }: { flavor: Flavor }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.09, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={flavor.image} alt={flavor.imageAlt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="shimmer-sweep absolute inset-0 mix-blend-overlay" />
    </div>
  );
}

export function FlavorSection({ flavor }: { flavor: Flavor }) {
  const isRight = flavor.align === "right";
  const isWallDrip = flavor.animation === "wall-drip";
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useSectionProgress(sectionRef);

  const textOpacity = useTransform(progress, [0.08, 0.3], [0, 1]);
  const textY = useTransform(progress, [0.08, 0.3], [isWallDrip ? 56 : 24, 0]);
  const textScale = useTransform(progress, [0.08, 0.3], [isWallDrip ? 0.94 : 1, 1]);

  return (
    <section
      ref={sectionRef}
      id={flavor.slug}
      className="relative w-full scroll-mt-16 overflow-hidden bg-neutral-900 text-white lg:min-h-[90svh]"
    >
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        {flavor.animation === "parallax" ? (
          <ParallaxImage flavor={flavor} progress={progress} withShimmer />
        ) : flavor.animation === "kenburns" ? (
          <KenBurnsImage flavor={flavor} />
        ) : (
          <Image src={flavor.image} alt={flavor.imageAlt} fill sizes="100vw" className="object-cover" />
        )}

        {flavor.animation === "falling-lemon" && <FallingCutouts items={lemonDrops} progress={progress} />}
        {flavor.animation === "falling-berries" && <FallingCutouts items={berryDrops} progress={progress} />}
        {isWallDrip && <DrippingJuice progress={progress} />}

        {flavor.slug === "natural" && (
          <>
            <PlantSway
              src="/images/cutouts/fern-frond.png"
              className="top-[6%] left-[-2%]"
              size={{ width: 220, height: 210 }}
              progress={progress}
              rotateKeyframes={[-3, 2, -4, 3, -2]}
              driftKeyframes={[0, 6, -4, 8, 0]}
            />
            <PlantSway
              src="/images/cutouts/fern-frond.png"
              className="top-[10%] right-[4%] -scale-x-100"
              size={{ width: 170, height: 165 }}
              progress={progress}
              rotateKeyframes={[4, -2, 5, -3, 4]}
              driftKeyframes={[0, -5, 4, -7, 0]}
            />
          </>
        )}

        {flavor.slug === "ananas" && (
          <PlantSway
            src="/images/cutouts/palm-frond.png"
            className="top-[-2%] left-[8%]"
            size={{ width: 460, height: 265 }}
            progress={progress}
            rotateKeyframes={[-2, 3, -3, 4, -2]}
            driftKeyframes={[0, 10, -6, 12, 0]}
          />
        )}

        <div
          className={cn(
            "absolute inset-0 hidden bg-gradient-to-b from-black/70 via-black/10 to-black/40 lg:block",
            isRight
              ? "lg:bg-gradient-to-r lg:from-black/10 lg:via-black/45 lg:to-black/75"
              : "lg:bg-gradient-to-l lg:from-black/10 lg:via-black/45 lg:to-black/75"
          )}
        />
      </div>

      <motion.div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col gap-3 px-6 py-10 sm:px-10 lg:absolute lg:inset-0 lg:justify-center lg:py-0",
          !isRight && "max-w-6xl",
          isRight
            ? "items-start text-left lg:items-end lg:text-right"
            : "items-start text-left",
          flavor.offsetClass
        )}
        style={{ opacity: textOpacity, y: textY, scale: textScale }}
      >
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: flavor.accent }}
        >
          {flavor.eyebrow}
        </span>

        <h2 className="font-heading text-6xl leading-[0.9] tracking-wide uppercase sm:text-7xl lg:text-8xl lg:drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          {flavor.tagline[0]}
          <br />
          {flavor.tagline[1]}
        </h2>

        <p
          className={cn(
            "max-w-sm text-base text-white/85 sm:text-lg",
            isRight && "lg:ml-auto lg:max-w-xs"
          )}
        >
          {flavor.description}
        </p>

        <Button
          size="lg"
          variant="outline"
          className="mt-2 h-11 rounded-full border-white/40 bg-transparent px-7 text-sm text-white hover:bg-white hover:text-neutral-900 lg:text-base"
        >
          Experimenta {flavor.name}
        </Button>
      </motion.div>
    </section>
  );
}
