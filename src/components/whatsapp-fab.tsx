import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Olá Clóset Dayana! 👗 Preciso de ajuda com uma encomenda.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Clóset Dayana no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-4 ring-whatsapp/20 hover:bg-whatsapp-dark"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
