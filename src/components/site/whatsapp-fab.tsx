import { WhatsAppIcon } from "@/components/icons";
import { defaultOrderMessage, whatsappLink } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(defaultOrderMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="fixed right-4 bottom-4 z-40 inline-flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
