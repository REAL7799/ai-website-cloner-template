import Image from "next/image";

import { flavors } from "@/components/flavor-section";
import { cn } from "@/lib/utils";

export function FlavorGrid() {
  return (
    <section
      id="sabores"
      className="scroll-mt-16 bg-white px-6 py-16 text-neutral-900 sm:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start gap-2 md:mb-14">
          <span className="text-xs font-semibold tracking-[0.3em] text-neutral-500 uppercase">
            5 Sabores
          </span>
          <h2 className="font-heading text-5xl uppercase tracking-wide sm:text-6xl">
            Escolhe o Teu Sabor
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {flavors.map((flavor, index) => (
            <a
              key={flavor.slug}
              href={`#${flavor.slug}`}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-2xl",
                index === flavors.length - 1 &&
                  "col-span-2 aspect-[16/9] sm:col-span-1 sm:aspect-[3/4]"
              )}
            >
              <Image
                src={flavor.image}
                alt={flavor.imageAlt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                style={{ objectPosition: flavor.cardFocus }}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
                <span
                  className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: flavor.accent }}
                >
                  Pedras
                </span>
                <span className="font-heading text-2xl leading-none uppercase tracking-wide text-white">
                  {flavor.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
