"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Flavor } from "@/lib/flavors";

interface FallingItem {
  src: string;
  top: string;
  landTop: string;
  left: string;
  size: number;
  rotateFrom: number;
  rotateTo: number;
  delay: number;
}

const lemonDrops: FallingItem[] = [
  { src: "/images/cutouts/lemon.png", top: "6%", landTop: "6%", left: "6%", size: 88, rotateFrom: -25, rotateTo: 10, delay: 0 },
  { src: "/images/cutouts/leaf.png", top: "3%", landTop: "3%", left: "20%", size: 54, rotateFrom: 15, rotateTo: -20, delay: 0.15 },
  { src: "/images/cutouts/lemon.png", top: "9%", landTop: "9%", left: "30%", size: 60, rotateFrom: 20, rotateTo: -15, delay: 0.3 },
  { src: "/images/cutouts/leaf.png", top: "5%", landTop: "5%", left: "0%", size: 42, rotateFrom: -10, rotateTo: 25, delay: 0.45 },
];

const berryDrops: FallingItem[] = [
  { src: "/images/cutouts/strawberry.png", top: "4%", landTop: "62%", left: "8%", size: 92, rotateFrom: -20, rotateTo: 12, delay: 0 },
  { src: "/images/cutouts/blueberry.png", top: "2%", landTop: "70%", left: "24%", size: 56, rotateFrom: 10, rotateTo: -18, delay: 0.08 },
  { src: "/images/cutouts/raspberry.png", top: "6%", landTop: "58%", left: "36%", size: 62, rotateFrom: -15, rotateTo: 20, delay: 0.16 },
  { src: "/images/cutouts/blueberry.png", top: "3%", landTop: "74%", left: "16%", size: 42, rotateFrom: 18, rotateTo: -10, delay: 0.24 },
];

function FallingItemView({
  item,
  progress,
  toGround,
}: {
  item: FallingItem;
  progress: import("motion/react").MotionValue<number>;
  toGround: boolean;
}) {
  const fallRange: [number, number] = toGround ? [0.05, 0.55] : [0.05, 0.4];
  const y = useTransform(progress, fallRange, [-140, 0]);
  const topPercent = useTransform(progress, [0.05, 0.55], ["-12%", item.landTop]);
  const opacity = useTransform(progress, [0, 0.05, 0.15, 0.85, 1], [0, 0, 1, 1, 0]);
  const rotate = useTransform(progress, fallRange, [item.rotateFrom, item.rotateTo]);
  const splashScale = useTransform(progress, [0.5, 0.62], [0, 3.2]);
  const splashOpacity = useTransform(progress, [0.5, 0.58, 0.75], [0, 0.7, 0]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: toGround ? topPercent : item.top,
        left: item.left,
        width: item.size,
        height: item.size,
        y: toGround ? undefined : y,
        opacity,
        rotate,
      }}
    >
      <motion.img
        src={item.src}
        alt=""
        className="h-full w-full object-contain drop-shadow-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + item.delay,
          delay: item.delay + 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={cn(
          "absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border",
          toGround ? "top-full border-black/40" : "top-[85%] border-white/70"
        )}
        style={{ scale: toGround ? splashScale : undefined, opacity: toGround ? splashOpacity : undefined }}
      />
    </motion.div>
  );
}

function FallingCutouts({
  items,
  progress,
  toGround = false,
}: {
  items: FallingItem[];
  progress: import("motion/react").MotionValue<number>;
  toGround?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {items.map((item, index) => (
        <FallingItemView key={`${item.src}-${index}`} item={item} progress={progress} toGround={toGround} />
      ))}
    </div>
  );
}

function WaterRipples({ progress }: { progress: import("motion/react").MotionValue<number> }) {
  const opacity = useTransform(progress, [0.15, 0.35, 0.75, 1], [0, 1, 1, 0]);
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 overflow-hidden lg:block"
      style={{ opacity }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="ripple-ring absolute bottom-[15%] left-[38%] h-24 w-24 rounded-full border border-white/40"
          style={{ animationDelay: `${i * 1.05}s` }}
        />
      ))}
      <div className="sway absolute right-[8%] bottom-0 h-2/3 w-8 rounded-full bg-gradient-to-t from-white/10 to-transparent blur-md" />
    </motion.div>
  );
}

function PalmLightDrift({ progress }: { progress: import("motion/react").MotionValue<number> }) {
  const opacity = useTransform(progress, [0.15, 0.35, 0.75, 1], [0, 0.9, 0.9, 0]);
  return (
    <motion.div
      className="shimmer-sweep pointer-events-none absolute inset-0 hidden mix-blend-soft-light lg:block"
      style={{ opacity }}
    />
  );
}

function DrippingWall({ progress, accent }: { progress: import("motion/react").MotionValue<number>; accent: string }) {
  const opacity = useTransform(progress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const drips = [
    { left: "44%", size: 5, duration: 3.2, delay: 0 },
    { left: "49%", size: 4, duration: 2.6, delay: 0.6 },
    { left: "54%", size: 6, duration: 3.6, delay: 1.1 },
    { left: "59%", size: 4, duration: 2.9, delay: 1.7 },
  ];
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 hidden w-1/3 overflow-hidden lg:block"
      style={{ opacity, left: "20%" }}
    >
      {drips.map((d, i) => (
        <span
          key={i}
          className="drip-fall absolute top-0 rounded-full blur-[1px]"
          style={{
            left: d.left,
            width: d.size,
            height: d.size * 5,
            background: `linear-gradient(to bottom, ${accent}, transparent)`,
            animation: `drip-fall ${d.duration}s ease-in ${d.delay}s infinite`,
          }}
        />
      ))}
    </motion.div>
  );
}

function ParallaxImage({ flavor, progress }: { flavor: Flavor; progress: import("motion/react").MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 scale-[1.22]" style={{ y }}>
        <Image
          src={flavor.image}
          alt={flavor.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <WaterRipples progress={progress} />
    </div>
  );
}

function KenBurnsImage({ flavor, progress }: { flavor: Flavor; progress: import("motion/react").MotionValue<number> }) {
  const drift = useTransform(progress, [0, 1], ["-2%", "2%"]);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ x: drift }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={flavor.image}
          alt={flavor.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <PalmLightDrift progress={progress} />
    </div>
  );
}

export function FlavorSection({ flavor }: { flavor: Flavor }) {
  const isRight = flavor.align === "right";
  const isEntrance = flavor.animation === "entrance";

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [isEntrance ? 56 : 28, 0, 0, isEntrance ? -20 : -14]
  );
  const textScale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [isEntrance ? 0.94 : 1, 1, 1, 1]);

  return (
    <section
      ref={sectionRef}
      id={flavor.slug}
      className="relative w-full scroll-mt-16 overflow-hidden bg-neutral-900 text-white lg:min-h-[92svh]"
    >
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        {flavor.animation === "parallax" ? (
          <ParallaxImage flavor={flavor} progress={scrollYProgress} />
        ) : flavor.animation === "kenburns" ? (
          <KenBurnsImage flavor={flavor} progress={scrollYProgress} />
        ) : (
          <Image
            src={flavor.image}
            alt={flavor.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: flavor.cardFocus }}
          />
        )}

        {flavor.animation === "falling-lemon" && <FallingCutouts items={lemonDrops} progress={scrollYProgress} />}
        {flavor.animation === "falling-berries" && (
          <FallingCutouts items={berryDrops} progress={scrollYProgress} toGround />
        )}
        {flavor.animation === "entrance" && <DrippingWall progress={scrollYProgress} accent={flavor.accent} />}

        <div
          className={cn(
            "absolute inset-0 hidden bg-gradient-to-b from-black/65 via-black/5 to-black/35 lg:block",
            isRight
              ? "lg:bg-gradient-to-r lg:from-black/5 lg:via-black/35 lg:to-black/68"
              : "lg:bg-gradient-to-l lg:from-black/5 lg:via-black/35 lg:to-black/68"
          )}
        />
      </div>

      <motion.div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col gap-4 px-6 py-10 sm:px-10 lg:absolute lg:inset-0 lg:justify-center lg:py-0",
          !isRight && "max-w-6xl",
          isRight
            ? "items-start text-left lg:items-end lg:text-right"
            : "items-start text-left",
          flavor.offsetClass
        )}
        style={{ opacity: textOpacity, y: textY, scale: textScale }}
      >
        <span
          className="text-xs font-bold tracking-[0.35em] uppercase sm:text-sm"
          style={{ color: flavor.accent }}
        >
          {flavor.eyebrow}
        </span>

        <h2 className="font-heading text-7xl leading-[0.88] tracking-wide uppercase sm:text-8xl lg:text-9xl lg:drop-shadow-[0_6px_28px_rgba(0,0,0,0.55)]">
          {flavor.tagline[0]}
          <br />
          {flavor.tagline[1]}
        </h2>

        <p
          className={cn(
            "max-w-sm text-lg text-white/90 sm:text-xl",
            isRight && "lg:ml-auto lg:max-w-sm"
          )}
        >
          {flavor.description}
        </p>

        <Button
          size="lg"
          variant="outline"
          className="mt-3 h-12 rounded-full border-white/50 bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-neutral-900 lg:h-14 lg:px-9 lg:text-lg"
        >
          Experimenta {flavor.name}
        </Button>
      </motion.div>
    </section>
  );
}
