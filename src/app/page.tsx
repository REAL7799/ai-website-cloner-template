import { FlavorGrid } from "@/components/flavor-grid";
import { FlavorSection } from "@/components/flavor-section";
import { Hero } from "@/components/hero";
import { flavors } from "@/lib/flavors";

export default function Home() {
  return (
    <main>
      <Hero />
      <FlavorGrid />
      {flavors.map((flavor) => (
        <FlavorSection key={flavor.slug} flavor={flavor} />
      ))}
    </main>
  );
}
