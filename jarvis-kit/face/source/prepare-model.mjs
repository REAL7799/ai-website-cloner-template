// Strips the Face Cap head down to what the wireframe face needs.
//
// Input:  facecap.source.glb (three.js examples, "Face Cap" model by Bannaflak)
// Output: ../head.glb — geometry + 52 ARKit blendshapes, no textures.
//
// The source ships KTX2 (Basis) textures that would need a WASM transcoder at
// runtime; the face is drawn with its own shader, so they are dropped. Geometry
// stays quantized + meshopt-compressed (decoded by MeshoptDecoder, bundled).
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS, EXTMeshoptCompression } from "@gltf-transform/extensions";
import { prune } from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptEncoder } from "meshoptimizer";

await MeshoptDecoder.ready;
await MeshoptEncoder.ready;

const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ "meshopt.decoder": MeshoptDecoder, "meshopt.encoder": MeshoptEncoder });

const doc = await io.read(new URL("./facecap.source.glb", import.meta.url).pathname);
const root = doc.getRoot();

for (const tex of root.listTextures()) tex.dispose();
for (const ext of root.listExtensionsUsed()) {
  if (ext.extensionName === "KHR_texture_basisu" || ext.extensionName === "KHR_texture_transform") ext.dispose();
}
await doc.transform(prune());

doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: "quantize" });

for (const node of root.listNodes()) {
  const mesh = node.getMesh();
  const t = node.getTranslation().map((v) => +v.toFixed(3));
  console.log(`node ${node.getName() || "(unnamed)"} t=${t} mesh=${mesh ? mesh.listPrimitives()[0].getAttribute("POSITION").getCount() + "v" : "-"}`);
}

const out = new URL("../head.glb", import.meta.url).pathname;
await io.write(out, doc);
const { statSync } = await import("node:fs");
console.log(`wrote ${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
