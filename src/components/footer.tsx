import { flavors } from "@/lib/flavors";

export function Footer() {
  return (
    <footer className="bg-neutral-950 px-6 py-14 text-white sm:px-10 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <a href="#top" className="font-heading text-3xl tracking-wide uppercase">
            Pedras
          </a>
          <p className="mt-3 text-sm text-white/60">
            Água mineral natural gasocarbónica, nascida nas montanhas de
            Trás-os-Montes desde 1871.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">
            Sabores
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-1">
            {flavors.map((flavor) => (
              <li key={flavor.slug}>
                <a
                  href={`#${flavor.slug}`}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {flavor.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>Água das Pedras. Todos os direitos reservados.</span>
        <span>Desde 1871</span>
      </div>
    </footer>
  );
}
