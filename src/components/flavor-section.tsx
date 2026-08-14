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
  left: string;
  size: number;
  rotateFrom: number;
  rotateTo: number;
  delay: number;
}

const lemonDrops: FallingItem[] = [
  { src: "/images/cutouts/lemon.png", top: "8%", left: "68%", size: 92, rotateFrom: -25, rotateTo: 10, delay: 0 },
  { src: "/images/cutouts/leaf.png", top: "4%", left: "80%", size: 56, rotateFrom: 15, rotateTo: -20, delay: 0.15 },
  { src: "/images/cutouts/lemon.png", top: "10%", left: "88%", size: 64, rotateFrom: 20, rotateTo: -15, delay: 0.3 },
  { src: "/images/cutouts/leaf.png", top: "6%", left: "60%", size: 44, rotateFrom: -10, rotateTo: 25, delay: 0.45 },
];

const berryDrops: FallingItem[] = [
  { src: "/images/cutouts/strawberry.png", top: "4%", left: "8%", size: 88, rotateFrom: -20, rotateTo: 12, delay: 0 },
  { src: "/images/cutouts/blueberry.png", top: "2%", left: "24%", size: 54, rotateFrom: 10, rotateTo: -18, delay: 0.15 },
  { src: "/images/cutouts/raspberry.png", top: "6%", left: "36%", size: 60, rotateFrom: -15, rotateTo: 20, delay: 0.3 },
  { src: "/images/cutouts/blueberry.png", top: "3%", left: "16%", size: 40, rotateFrom: 18, rotateTo: -10, delay: 0.45 },
];

function FallingCutouts({ items }: { items: FallingItem[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {items.map((item, index) => (
        <motion.div
          key={`${item.src}-${index}`}
          className="absolute"
          style={{ top: item.top, left: item.left, width: item.size, height: item.size }}
          initial={{ y: -140, opacity: 0, rotate: item.rotateFrom }}
          whileInView={{ y: 0, opacity: 1, rotate: item.rotateTo }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.1,
            delay: item.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img
            src={item.src}
            alt=""
            className="h-full w-full object-contain drop-shadow-xl"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3 + index * 0.4,
              delay: item.delay + 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white/70"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: [0, 3.2], opacity: [0.7, 0] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: item.delay + 1 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function ParallaxImage({ flavor }: { flavor: Flavor }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0 scale-[1.15]" style={{ y }}>
        <Image
          src={flavor.image}
          alt={flavor.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
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
        <Image
          src={flavor.image}
          alt={flavor.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="shimmer-sweep absolute inset-0 mix-blend-overlay" />
    </div>
  );
}

export function FlavorSection({ flavor }: { flavor: Flavor }) {
  const isRight = flavor.align === "right";
  const isEntrance = flavor.animation === "entrance";

  return (
    <section
      id={flavor.slug}
      className="relative w-full scroll-mt-16 overflow-hidden bg-neutral-900 text-white lg:min-h-[90svh]"
    >
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:aspect-auto">
        {flavor.animation === "parallax" ? (
          <ParallaxImage flavor={flavor} />
        ) : flavor.animation === "kenburns" ? (
          <KenBurnsImage flavor={flavor} />
        ) : (
          <Image
            src={flavor.image}
            alt={flavor.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}

        {flavor.animation === "falling-lemon" && <FallingCutouts items={lemonDrops} />}
        {flavor.animation === "falling-berries" && <FallingCutouts items={berryDrops} />}

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
        initial={{ opacity: 0, y: isEntrance ? 56 : 24, scale: isEntrance ? 0.94 : 1 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: isEntrance ? 0.85 : 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
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
