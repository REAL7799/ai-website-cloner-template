import { AboutPreview } from "@/components/home/about-preview";
import { CakeBuilder } from "@/components/home/cake-builder";
import { Gallery } from "@/components/home/gallery";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { OrderCta } from "@/components/home/order-cta";
import { Specialties } from "@/components/home/specialties";
import { Steps } from "@/components/home/steps";
import { Visit } from "@/components/home/visit";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <CakeBuilder />
      <Specialties />
      <Gallery />
      <AboutPreview />
      <Steps />
      <OrderCta />
      <Visit />
    </>
  );
}
