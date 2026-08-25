// Importações estáticas das imagens do site (largura/altura e blur automáticos).
// Para trocar por fotografias reais basta substituir os ficheiros em public/images
// (ver scripts/generate-images.mjs) — os nomes mantêm-se.
import type { StaticImageData } from "next/image";

import bancada from "../../public/images/bancada.png";
import boloAniversario from "../../public/images/bolo-aniversario.png";
import boloChocolate from "../../public/images/bolo-chocolate.png";
import boloFesta from "../../public/images/bolo-festa.png";
import docesFinos from "../../public/images/doces-finos.png";
import hero from "../../public/images/hero.png";
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
