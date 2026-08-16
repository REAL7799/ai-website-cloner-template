import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Encaminha a raiz do site para a versão certa da língua. Fátima recebe
 * peregrinos de todo o mundo: quem chega com o browser em português vai
 * para /pt, todos os outros para /en.
 *
 * Sem importações partilhadas de propósito — o proxy corre isolado do render.
 */
export function proxy(request: NextRequest) {
  const accepted = request.headers.get("accept-language") ?? "";
  const prefersPortuguese = accepted
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase() ?? "")
    .some((tag) => tag === "pt" || tag.startsWith("pt-"));

  return NextResponse.redirect(
    new URL(prefersPortuguese ? "/pt" : "/en", request.url)
  );
}

export const config = {
  matcher: "/",
};
