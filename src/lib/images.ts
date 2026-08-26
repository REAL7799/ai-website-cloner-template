// Importações estáticas das imagens do site (largura/altura e blur automáticos).
// Para trocar por fotografias reais basta substituir os ficheiros em public/images
// (ver scripts/generate-images.mjs) — os nomes mantêm-se.
import type { StaticImageData } from "next/image";

import bancada from "../../public/images/bancada.png";
import boloAniversario from "../../public/images/bolo-aniversario.png";
import boloCamadas from "../../public/images/bolo-camadas.png";
import boloExploso from "../../public/images/bolo-exploso.png";
import boloChocolate from "../../public/images/bolo-chocolate.png";
import boloFesta from "../../public/images/bolo-festa.png";
import docesFinos from "../../public/images/doces-finos.png";
import hero from "../../public/images/hero.png";
import hero1 from "../../public/images/hero-1.png";
import hero2 from "../../public/images/hero-2.png";
import hero3 from "../../public/images/hero-3.png";
import hero4 from "../../public/images/hero-4.png";
import hero5 from "../../public/images/hero-5.png";
import hero6 from "../../public/images/hero-6.png";
import interior from "../../public/images/interior.png";
import pastelNata from "../../public/images/pastel-nata.png";
import pasteleiro from "../../public/images/pasteleiro.png";
import tarteAmendoa from "../../public/images/tarte-amendoa.png";
import tarteFrutos from "../../public/images/tarte-frutos.png";

import type { CategoryImage } from "@/lib/products";

export const images = {
  hero,
  bancada,
  interior,
  pasteleiro,
  "bolo-camadas": boloCamadas,
  "bolo-exploso": boloExploso,
  "bolo-festa": boloFesta,
  "bolo-chocolate": boloChocolate,
  "bolo-aniversario": boloAniversario,
  "tarte-frutos": tarteFrutos,
  "tarte-amendoa": tarteAmendoa,
  "pastel-nata": pastelNata,
  "doces-finos": docesFinos,
} satisfies Record<string, StaticImageData>;

export function categoryImage(key: CategoryImage): StaticImageData {
  return images[key];
}

// Fotogramas do hero, pela ordem de rotação (0,5 s cada)
export const heroFrames: { image: StaticImageData; alt: string }[] = [
  { image: hero1, alt: "Bolo de chocolate com ganache a escorrer, sobre fundo escuro" },
  { image: hero2, alt: "Fatias de bolo de chocolate e creme suspensas no ar com frutos vermelhos" },
  { image: hero3, alt: "Fatia de bolo de baunilha no ar com fio de caramelo e frutos" },
  { image: hero4, alt: "Macarons a cair com nuvem de açúcar em pó" },
  { image: hero5, alt: "Pastéis de nata caramelizados com canela a cair" },
  { image: hero6, alt: "Mãos do pasteleiro a decorar um bolo com saco de pasteleiro" },
];
