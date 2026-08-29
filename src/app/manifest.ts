import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kitty Flowers — Rosas Eternas",
    short_name: "Kitty Flowers",
    description:
      "Buquês de rosas eternas personalizados, feitos à mão em Lisboa.",
    start_url: "/",
    display: "browser",
    background_color: "#fdf2f7",
    theme_color: "#fdf2f7",
    icons: [
      {
        src: "/images/logo-kitty-flowers.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
