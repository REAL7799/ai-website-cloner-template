import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * Encaminha a raiz do site para a versão certa da língua. Fátima recebe
   * peregrinos de todo o mundo: quem chega com o browser em português vai
   * para /pt, todos os outros para /en.
   *
   * Isto vive aqui, e não num ficheiro `proxy.ts`, de propósito. Em Next 16 o
   * Proxy corre sempre no runtime Node — a opção `runtime` não é aceite lá — e
   * há adaptadores de deploy (o OpenNext para Cloudflare Workers, por exemplo)
   * que não suportam middleware Node. Como redirect de configuração, o
   * comportamento é o mesmo e corre em qualquer alojamento.
   */
  async redirects() {
    return [
      {
        source: "/",
        // Português como primeira preferência do browser: "pt", "pt-PT,...".
        has: [
          {
            type: "header",
            key: "accept-language",
            value: "^pt([-;,].*)?$",
          },
        ],
        destination: "/pt",
        permanent: false,
      },
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
