import { AboutPreview } from "@/components/home/about-preview";
import { FeatureStrip } from "@/components/home/feature-strip";
import { Hero } from "@/components/home/hero";
import { OrderCta } from "@/components/home/order-cta";
import { Specialties } from "@/components/home/specialties";
import { Steps } from "@/components/home/steps";
import { Testimonials } from "@/components/home/testimonials";
import { Visit } from "@/components/home/visit";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Specialties />
      <AboutPreview />
      <Steps />
      <Testimonials />
      <OrderCta />
      <Visit />
    </>
  );
}
