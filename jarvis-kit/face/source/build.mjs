// Bundles src/ (three.js, loaders, post-processing and the embedded head model)
// into ../face3d.js — a single classic script that also works from file://.
import { build } from "esbuild";

await build({
  entryPoints: ["src/face3d.js"],
  bundle: true,
  format: "iife",
  target: "es2020",
  minify: true,
  legalComments: "eof",
  loader: { ".glb": "binary" },
  outfile: "../face3d.js",
  logLevel: "info",
});
