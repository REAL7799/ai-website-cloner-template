import { WhatsappIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsappButton() {
  return (
    <a
      href={siteConfig.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald/25 transition-transform hover:scale-105"
    >
      <span
        className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden"
        aria-hidden
      />
      <WhatsappIcon className="relative size-7" />
    </a>
  );
}
