// Bundles src/ (three.js + post-processing) into ../orb.js — a single classic
// script, so the page also works when opened straight from file://.
import { build } from "esbuild";

await build({
  entryPoints: ["src/orb.js"],
  bundle: true,
  format: "iife",
  target: "es2020",
  minify: true,
  legalComments: "eof",
  outfile: "../orb.js",
  logLevel: "info",
});
