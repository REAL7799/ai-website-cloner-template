import Image from "next/image";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button-variants";
import { images } from "@/lib/images";
import { defaultOrderMessage, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function OrderCta() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-4xl bg-foreground text-background shadow-xl">
          <Image
            src={images.bancada}
            alt=""
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30"
          />
          <div className="relative px-7 py-16 sm:px-14 sm:py-20 lg:max-w-2xl">
            <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-4xl">
              O seu próximo bolo de festa começa com uma mensagem
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-background/80">
              Diga-nos a data e o que imagina. Respondemos no próprio dia com
              sugestões e orçamento — sem compromisso.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(defaultOrderMessage)}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 rounded-full bg-[#25D366] px-7 text-base text-white hover:bg-[#1fb457]"
                )}
              >
                <WhatsAppIcon data-icon="inline-start" />
                Encomendar por WhatsApp
              </a>
              <Link
                href="/encomendas"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 rounded-full border-background/40 bg-transparent px-7 text-base text-background hover:bg-background/10 hover:text-background"
                )}
              >
                Preencher pedido online
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
