import { flavors } from "@/components/flavor-section";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 8.5h2V5.5h-2c-1.93 0-3.5 1.57-3.5 3.5v2H8.5v3H10.5V21h3v-7h2.2l.5-3H13.5V9c0-.28.22-.5.5-.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/60 transition-colors hover:text-white"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/60 transition-colors hover:text-white"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
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
