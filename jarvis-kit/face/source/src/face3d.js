// Jarvis Face 3D — a scanned human head rendered as a glowing quad wireframe,
// animated with ARKit blendshapes from Jarvis' live voice state and levels.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import headGlb from "../../head.glb";
import { createHud } from "./hud.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Per-state look: wire colour, wire strength, skin fill, and the expression
// (blendshape weights) the face settles into.
const LOOK = {
  offline:   { line: 0x5a626c, strength: 0.55, fill: 0.55, expr: { eyeBlink_L: 1, eyeBlink_R: 1 } },
  idle:      { line: 0xcfe6e4, strength: 1.0,  fill: 1.0,  expr: { mouthSmile_L: 0.08, mouthSmile_R: 0.08 } },
  listening: { line: 0x5ce1e6, strength: 1.05, fill: 1.0,  expr: { eyeWide_L: 0.35, eyeWide_R: 0.35, browInnerUp: 0.3, browOuterUp_L: 0.15, browOuterUp_R: 0.15 } },
  thinking:  { line: 0xffb547, strength: 1.1,  fill: 0.95, expr: { browDown_L: 0.35, browDown_R: 0.35, eyeSquint_L: 0.4, eyeSquint_R: 0.4, mouthPress_L: 0.3, mouthPress_R: 0.3, eyeLookUp_L: 0.25, eyeLookUp_R: 0.25 } },
  speaking:  { line: 0xdff8fb, strength: 1.0,  fill: 1.0,  expr: { browInnerUp: 0.12 } },
  paused:    { line: 0x7d858f, strength: 0.7,  fill: 0.8,  expr: { eyeBlink_L: 0.55, eyeBlink_R: 0.55 } },
  error:     { line: 0xff5a5f, strength: 1.2,  fill: 1.0,  expr: { mouthFrown_L: 0.45, mouthFrown_R: 0.45, browDown_L: 0.4, browDown_R: 0.4 } },
};
// Shapes this renderer drives every frame (others stay at 0).
const DRIVEN = [
  "eyeBlink_L", "eyeBlink_R", "eyeWide_L", "eyeWide_R", "eyeSquint_L", "eyeSquint_R",
  "eyeLookUp_L", "eyeLookUp_R", "eyeLookDown_L", "eyeLookDown_R",
  "eyeLookIn_L", "eyeLookIn_R", "eyeLookOut_L", "eyeLookOut_R",
  "browInnerUp", "browDown_L", "browDown_R", "browOuterUp_L", "browOuterUp_R",
  "jawOpen", "mouthFunnel", "mouthPucker", "mouthClose", "mouthStretch_L", "mouthStretch_R",
  "mouthSmile_L", "mouthSmile_R", "mouthFrown_L", "mouthFrown_R", "mouthPress_L", "mouthPress_R",
  "mouthUpperUp_L", "mouthUpperUp_R", "mouthLowerDown_L", "mouthLowerDown_R",
];

const hud = createHud();
const canvas = document.getElementById("face");

// ------------------------------------------------------------------ renderer
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
} catch {
  hud.showBanner("Este browser não suporta WebGL — atualiza o Chrome/Edge para ver o rosto 3D.");
  throw new Error("WebGL unavailable");
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x05070a, 1);
renderer.toneMapping = THREE.NeutralToneMapping;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070a, 0.035);
const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);

scene.add(new THREE.AmbientLight(0x6c8a99, 0.25));
const key = new THREE.DirectionalLight(0xdfeeff, 1.7);
key.position.set(0.7, 1.1, 2.4);
scene.add(key);
const fill = new THREE.DirectionalLight(0x5a7c8c, 0.6);
fill.position.set(-2, 0.2, 1);
scene.add(fill);
const rim = new THREE.DirectionalLight(0x8fd8e0, 0.9);
rim.position.set(0, 1.2, -2.5);
scene.add(rim);

// ------------------------------------------------------------------ wire material
const uniforms = {
  uLine: { value: new THREE.Color(LOOK.offline.line) },
  uStrength: { value: 0.6 },
  uFill: { value: 0.6 },
  uScanY: { value: 0 },
  uScan: { value: 0 },
  uWidth: { value: 1.0 },
};

function makeWireMaterial({ color, widthScale = 1 }) {
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.15 });
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms, { uWidthScale: { value: widthScale } });
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute vec3 aBary;\nvarying vec3 vBary;\nvarying vec3 vLocal;")
      .replace("#include <morphtarget_vertex>", "#include <morphtarget_vertex>\nvBary = aBary;\nvLocal = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        varying vec3 vBary; varying vec3 vLocal;
        uniform vec3 uLine; uniform float uStrength, uFill, uScanY, uScan, uWidth, uWidthScale;`
      )
      .replace(
        "#include <opaque_fragment>",
        `{
          vec3 d = fwidth(vBary) * uWidth * uWidthScale;
          vec3 a = smoothstep(d * 0.35, d * 1.25, vBary);
          float wire = 1.0 - min(min(a.x, a.y), a.z);
          // Lines take the light: bright where the face is lit, fading into shadow.
          // View-space key from upper front-right; independent of the skin albedo.
          float lit = clamp(dot(normalize(normal), normalize(vec3(0.3, 0.75, 0.6))), 0.0, 1.0);
          lit = lit * lit;
          float fres = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.5);
          float scan = exp(-pow((vLocal.y - uScanY) / 0.05, 2.0)) * uScan;
          vec3 lines = uLine * wire * (uStrength * (0.1 + 1.1 * lit) + scan * 1.6);
          outgoingLight = outgoingLight * uFill + lines + uLine * fres * 0.08 * uFill;
        }
        #include <opaque_fragment>`
      );
  };
  return mat;
}

// Barycentric coordinates per triangle with the longest edge hidden, so the
// triangulated scan reads as the quad grid it was modelled with.
function addQuadBarycentrics(geometry) {
  const pos = geometry.attributes.position;
  const n = pos.count;
  const bary = new Float32Array(n * 3);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let i = 0; i < n; i += 3) {
    a.fromBufferAttribute(pos, i); b.fromBufferAttribute(pos, i + 1); c.fromBufferAttribute(pos, i + 2);
    const opp = [b.distanceToSquared(c), a.distanceToSquared(c), a.distanceToSquared(b)]; // edge opposite each vertex
    const hide = opp.indexOf(Math.max(...opp));
    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < 3; j++) bary[(i + k) * 3 + j] = (j === k ? 1 : 0) + (j === hide ? 1 : 0);
    }
  }
  geometry.setAttribute("aBary", new THREE.BufferAttribute(bary, 3));
}

// glTF quantized / meshopt attributes -> plain float, then de-index (morphs included).
function toPlainNonIndexed(geometry) {
  const plain = (attr) => {
    const out = new Float32Array(attr.count * attr.itemSize);
    for (let i = 0; i < attr.count; i++) {
      for (let j = 0; j < attr.itemSize; j++) out[i * attr.itemSize + j] = attr.getComponent(i, j);
    }
    const copy = new THREE.BufferAttribute(out, attr.itemSize);
    copy.name = attr.name; // morph target names feed morphTargetDictionary
    return copy;
  };
  const g = new THREE.BufferGeometry();
  g.setIndex(geometry.index ? Array.from(geometry.index.array) : null);
  for (const name of ["position", "normal"]) if (geometry.attributes[name]) g.setAttribute(name, plain(geometry.attributes[name]));
  for (const name of Object.keys(geometry.morphAttributes)) g.morphAttributes[name] = geometry.morphAttributes[name].map(plain);
  g.morphTargetsRelative = geometry.morphTargetsRelative;
  const flat = g.index ? g.toNonIndexed() : g;
  if (!flat.attributes.normal) flat.computeVertexNormals();
  return flat;
}

// Teeth ship without blendshapes: give the lower row a "jawOpen" target that
// follows the nearest jaw vertex, so the teeth part when the mouth opens.
function rigTeeth(teeth, head, jawIndex) {
  head.updateWorldMatrix(true, false);
  teeth.updateWorldMatrix(true, false);
  const toHead = new THREE.Matrix4().copy(head.matrixWorld).invert().multiply(teeth.matrixWorld);
  const toTeethDir = new THREE.Matrix3().setFromMatrix4(toHead).invert();
  const hp = head.geometry.attributes.position;
  const hj = head.geometry.morphAttributes.position[jawIndex];
  const tp = teeth.geometry.attributes.position;
  const local = [];
  let minY = Infinity, maxY = -Infinity;
  const v = new THREE.Vector3();
  for (let i = 0; i < tp.count; i++) {
    v.fromBufferAttribute(tp, i).applyMatrix4(toHead);
    local.push(v.clone());
    minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
  }
  const split = (minY + maxY) / 2;
  const disp = new Float32Array(tp.count * 3);
  const h = new THREE.Vector3(), d = new THREE.Vector3();
  const cache = new Map();
  for (let i = 0; i < tp.count; i++) {
    const p = local[i];
    if (p.y > split) continue;
    const keyStr = `${p.x.toFixed(4)},${p.y.toFixed(4)},${p.z.toFixed(4)}`;
    let best = cache.get(keyStr);
    if (best === undefined) {
      let bestD = Infinity; best = -1;
      for (let k = 0; k < hp.count; k++) {
        const dist = h.fromBufferAttribute(hp, k).distanceToSquared(p);
        if (dist < bestD && hj.getY(k) < 0) { bestD = dist; best = k; }
      }
      cache.set(keyStr, best);
    }
    if (best < 0) continue;
    d.fromBufferAttribute(hj, best).applyMatrix3(toTeethDir);
    disp.set([d.x, d.y, d.z], i * 3);
  }
  teeth.geometry.morphAttributes.position = [new THREE.BufferAttribute(disp, 3)];
  teeth.geometry.morphTargetsRelative = true;
  teeth.updateMorphTargets();
}

// ------------------------------------------------------------------ dust
function makeDust() {
  const N = 220;
  const pos = new Float32Array(N * 3), seed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pos.set([(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, -Math.random() * 6 + 1.2], i * 3);
    seed[i] = Math.random();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const x = c.getContext("2d");
  const grd = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,0.9)"); grd.addColorStop(0.4, "rgba(255,255,255,0.25)"); grd.addColorStop(1, "rgba(255,255,255,0)");
  x.fillStyle = grd; x.fillRect(0, 0, 64, 64);
  const mat = new THREE.PointsMaterial({
    size: 0.05, map: new THREE.CanvasTexture(c), transparent: true, opacity: 0.35,
    depthWrite: false, blending: THREE.AdditiveBlending, color: 0x9fc4cc,
  });
  const pts = new THREE.Points(g, mat);
  pts.userData.seed = seed;
  return pts;
}
const dust = makeDust();
scene.add(dust);

// ------------------------------------------------------------------ post
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.35, 0.4, 0.38);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ------------------------------------------------------------------ model
const rig = new THREE.Group(); // head motion pivot (neck)
scene.add(rig);
let headMesh = null, teethMesh = null, eyes = [], dict = {}, headHeight = 1;
const eyeBase = [];

function frameCamera() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  bloom.setSize(w, h);
  camera.aspect = w / h;
  // Fit the head (plus some neck) vertically; pull back on narrow screens.
  const fitH = headHeight * 1.12;
  const dist = fitH / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  // Aim slightly below centre so the head sits high and captions clear the chin.
  camera.position.set(0, -headHeight * 0.07, dist * Math.max(1, 0.75 / camera.aspect));
  camera.lookAt(0, -headHeight * 0.07, 0);
  camera.updateProjectionMatrix();
}
addEventListener("resize", frameCamera);

new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parse(
  headGlb.buffer.slice(headGlb.byteOffset, headGlb.byteOffset + headGlb.byteLength),
  "",
  (gltf) => {
    const root = gltf.scene;
    const meshes = [];
    root.traverse((o) => { if (o.isMesh) meshes.push(o); });
    headMesh = meshes.find((m) => m.morphTargetDictionary && "jawOpen" in m.morphTargetDictionary);
    const rest = meshes.filter((m) => m !== headMesh);
    teethMesh = rest.reduce((a, b) => (b.geometry.attributes.position.count > (a?.geometry.attributes.position.count ?? 0) ? b : a), null);
    eyes = rest.filter((m) => m !== teethMesh);

    // Normalise: centre the head at the origin and scale it to ~1 unit tall.
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(headMesh);
    const size = box.getSize(new THREE.Vector3());
    const scale = 1 / size.y;
    const centre = box.getCenter(new THREE.Vector3());
    root.scale.setScalar(scale);
    root.position.copy(centre).multiplyScalar(-scale);
    // Pivot near the neck so nods look anatomical.
    rig.position.set(0, -0.35, 0);
    root.position.y += 0.35;
    rig.add(root);
    headHeight = 1;

    rigTeeth(teethMesh, headMesh, headMesh.morphTargetDictionary.jawOpen);

    for (const [mesh, color, widthScale] of [
      [headMesh, 0x2a3a40, 1.0],
      [teethMesh, 0x2c3a3e, 0.8],
      ...eyes.map((e) => [e, 0x0d1417, 0.7]),
    ]) {
      const names = mesh.morphTargetDictionary; // glTF names live on the mesh, not the attributes
      const geo = toPlainNonIndexed(mesh.geometry);
      addQuadBarycentrics(geo);
      mesh.geometry.dispose();
      mesh.geometry = geo;
      mesh.material = makeWireMaterial({ color, widthScale });
      mesh.updateMorphTargets();
      if (names && Object.keys(names).length) mesh.morphTargetDictionary = names;
      mesh.frustumCulled = false;
    }
    dict = headMesh.morphTargetDictionary;
    // Re-centre each eyeball on its own origin so gaze rotates it in place.
    for (const e of eyes) {
      e.geometry.computeBoundingBox();
      const c = e.geometry.boundingBox.getCenter(new THREE.Vector3());
      e.geometry.translate(-c.x, -c.y, -c.z);
      e.updateMatrix();
      e.position.copy(c.applyMatrix4(e.matrix));
      eyeBase.push(e.quaternion.clone());
    }
    frameCamera();
    // Inspection handle for debugging in DevTools.
    window.__jarvisFace = { headMesh, teethMesh, eyes, anim, hud };
  },
  (err) => {
    console.error(err);
    hud.showBanner("Não foi possível carregar o modelo 3D do rosto.");
  }
);

// ------------------------------------------------------------------ animation
const anim = {
  line: new THREE.Color(LOOK.offline.line), strength: 0.55, fill: 0.55,
  w: {}, inL: 0, outL: 0, gx: 0, gy: 0, yaw: 0, pitch: 0,
  blink: 0, blinkT: -1, nextBlink: 2, scan: 0, sleep: 1,
};
for (const k of DRIVEN) anim.w[k] = 0;
const lerp = THREE.MathUtils.lerp;
const tmpColor = new THREE.Color();
const tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler();

function update(t, dt) {
  hud.tick(t);
  const { live, pointer } = hud;
  const look = LOOK[live.state] || LOOK.idle;
  const k = 1 - Math.exp(-dt * 5);

  anim.line.lerp(tmpColor.setHex(look.line), k);
  anim.strength = lerp(anim.strength, look.strength, k);
  anim.fill = lerp(anim.fill, look.fill, k);
  anim.sleep = lerp(anim.sleep, live.state === "offline" ? 1 : 0, 1 - Math.exp(-dt * 2));
  anim.scan = lerp(anim.scan, live.state === "thinking" ? 1 : live.state === "idle" ? 0.25 : 0, k);
  const att = (cur, tgt) => lerp(cur, tgt, 1 - Math.exp(-dt * (tgt > cur ? 26 : 8)));
  anim.inL = att(anim.inL, Math.min(1, live.inLevel * 1.6));
  anim.outL = att(anim.outL, Math.min(1, live.outLevel * 1.5));

  // Gaze: pointer for a while, otherwise drift; scanning side to side while thinking.
  let gx, gy;
  if (live.state === "thinking" && !reduceMotion) { gx = Math.sin(t * 1.9) * 0.7; gy = -0.35; }
  else if (t - pointer.at < 4) { gx = pointer.x; gy = pointer.y; }
  else { gx = Math.sin(t * 0.33) * 0.4 + Math.sin(t * 0.87) * 0.12; gy = Math.sin(t * 0.51) * 0.18; }
  if (reduceMotion) { gx *= 0.3; gy *= 0.3; }
  anim.gx = lerp(anim.gx, gx, 1 - Math.exp(-dt * 6));
  anim.gy = lerp(anim.gy, gy, 1 - Math.exp(-dt * 6));

  // Blink at a natural, irregular cadence.
  if (anim.blinkT < 0 && t > anim.nextBlink && anim.sleep < 0.5) anim.blinkT = 0;
  let blink = 0;
  if (anim.blinkT >= 0) {
    anim.blinkT += dt;
    blink = Math.sin(Math.min(1, anim.blinkT / 0.17) * Math.PI);
    if (anim.blinkT > 0.17) { anim.blinkT = -1; anim.nextBlink = t + 2 + Math.random() * 4.5; }
  }

  // Target expression = state expression + gaze + blink + speech.
  const target = {};
  for (const n of DRIVEN) target[n] = look.expr[n] || 0;
  const gR = Math.max(0, anim.gx), gL = Math.max(0, -anim.gx);
  target.eyeLookOut_L += gR; target.eyeLookIn_R += gR;
  target.eyeLookIn_L += gL; target.eyeLookOut_R += gL;
  target.eyeLookUp_L += Math.max(0, -anim.gy) * 0.8; target.eyeLookUp_R += Math.max(0, -anim.gy) * 0.8;
  target.eyeLookDown_L += Math.max(0, anim.gy) * 0.8; target.eyeLookDown_R += Math.max(0, anim.gy) * 0.8;
  target.eyeBlink_L = Math.max(target.eyeBlink_L, blink);
  target.eyeBlink_R = Math.max(target.eyeBlink_R, blink);

  const o = anim.outL;
  if (o > 0.01) {
    // Amplitude-driven lip motion with two de-phased oscillators standing in for
    // visemes: the jaw follows loudness, lips alternate rounded / spread.
    const v1 = 0.5 + 0.5 * Math.sin(t * 13.1), v2 = 0.5 + 0.5 * Math.sin(t * 8.3 + 1.7);
    target.jawOpen = Math.min(0.75, o * 0.7);
    target.mouthFunnel += o * 0.35 * v1;
    target.mouthPucker += o * 0.15 * (1 - v1) * v2;
    target.mouthStretch_L += o * 0.25 * v2; target.mouthStretch_R += o * 0.25 * v2;
    target.mouthUpperUp_L += o * 0.25; target.mouthUpperUp_R += o * 0.25;
    target.mouthLowerDown_L += o * 0.3 * v1; target.mouthLowerDown_R += o * 0.3 * v1;
    target.browInnerUp += o * 0.15;
  }
  if (live.state === "listening") {
    target.eyeWide_L += anim.inL * 0.3; target.eyeWide_R += anim.inL * 0.3;
  }
  const kw = 1 - Math.exp(-dt * 14);
  for (const n of DRIVEN) anim.w[n] = lerp(anim.w[n], Math.min(1, target[n]), n.startsWith("eyeBlink") ? 1 - Math.exp(-dt * 40) : kw);

  // Head pose: follow gaze, nod a touch with speech, droop when offline.
  const nod = reduceMotion ? 0 : o * 0.04 * Math.sin(t * 6.5);
  anim.yaw = lerp(anim.yaw, anim.gx * 0.22 * (1 - anim.sleep), 1 - Math.exp(-dt * 2.2));
  anim.pitch = lerp(anim.pitch, anim.gy * 0.1 + anim.sleep * 0.12 + (live.state === "listening" ? -0.04 : 0), 1 - Math.exp(-dt * 2.2));
  const sway = reduceMotion ? 0 : Math.sin(t * 0.6) * 0.015;
  rig.rotation.set(anim.pitch + nod, anim.yaw, sway);

  uniforms.uLine.value.copy(anim.line);
  uniforms.uStrength.value = anim.strength * (1 + anim.outL * 0.12 + (live.state === "listening" ? anim.inL * 0.2 : 0));
  uniforms.uFill.value = anim.fill;
  uniforms.uScan.value = reduceMotion ? 0 : anim.scan;
  uniforms.uScanY.value = -0.55 + ((t * (live.state === "thinking" ? 0.55 : 0.18)) % 1.3);
  bloom.strength = 0.32 + anim.outL * 0.12 + (live.state === "listening" ? anim.inL * 0.1 : 0);

  if (headMesh) {
    const infl = headMesh.morphTargetInfluences;
    for (const n of DRIVEN) if (n in dict) infl[dict[n]] = anim.w[n];
    if (teethMesh?.morphTargetInfluences) teethMesh.morphTargetInfluences[0] = anim.w.jawOpen;
    eyes.forEach((e, i) => {
      tmpQ.setFromEuler(tmpE.set(anim.gy * 0.35, anim.gx * 0.45, 0));
      e.quaternion.copy(eyeBase[i]).multiply(tmpQ);
    });
  }

  // Dust drifts slowly upward and wraps.
  if (!reduceMotion) {
    const p = dust.geometry.attributes.position, s = dust.userData.seed;
    for (let i = 0; i < p.count; i++) {
      let y = p.getY(i) + dt * (0.02 + s[i] * 0.05);
      if (y > 3) y = -3;
      p.setY(i, y);
      p.setX(i, p.getX(i) + Math.sin(t * 0.2 + s[i] * 10) * dt * 0.01);
    }
    p.needsUpdate = true;
  }
}

let last = performance.now() / 1000;
function frame(ms) {
  const t = ms / 1000;
  const dt = Math.min(0.05, t - last); last = t;
  update(t, dt);
  composer.render();
  requestAnimationFrame(frame);
}

hud.bindInput(canvas);
hud.start();
frameCamera();
requestAnimationFrame(frame);
