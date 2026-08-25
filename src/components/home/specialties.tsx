import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { categoryImage, images } from "@/lib/images";
import { categories } from "@/lib/products";
import { cn } from "@/lib/utils";

export function Specialties() {
  return (
    <section className="py-20 sm:py-28" id="especialidades">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="As nossas especialidades"
          title="Do bolo de casamento ao pastel de nata"
          lead="Tudo o que sai da nossa cozinha é feito de raiz. Escolha por onde começar — ou peça uma sugestão ao balcão."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal as="li" key={category.slug} delay={(i % 3) * 100}>
              <Link
                href={`/doces#${category.slug}`}
                className="group block overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <div className="overflow-hidden">
                  <Image
                    src={categoryImage(category.image)}
                    alt=""
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-6 py-5">
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {category.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {category.intro}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={200}>
            <Link
              href="/encomendas"
              className="group flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground shadow-sm transition-all outline-none hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={images["bolo-aniversario"]}
                  alt=""
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  className="aspect-[16/9] w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 pt-5">
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    Tem uma festa à vista?
                  </h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Peça um orçamento sem compromisso.
                  </p>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          </Reveal>
        </ul>
        <div className="mt-12 text-center">
          <Link
            href="/doces"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full px-6"
            )}
          >
            Ver a doçaria completa com preços
          </Link>
        </div>
      </div>
    </section>
  );
}
