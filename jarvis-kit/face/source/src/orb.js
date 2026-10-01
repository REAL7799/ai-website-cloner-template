// Jarvis Orb — a plasma energy sphere: dozens of noise-distorted rings of light
// around a white-hot core, driven by Jarvis' live voice state and audio levels.
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { createHud } from "./hud.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Per-state energy: colour, distortion, turbulence speed, size, brightness.
const LOOK = {
  offline:   { color: 0x1f3d63, amp: 0.05, speed: 0.08, scale: 0.78, glow: 0.35 },
  idle:      { color: 0x1fb8ff, amp: 0.17, speed: 0.22, scale: 1.0,  glow: 1.05 },
  listening: { color: 0x3ce6ff, amp: 0.19, speed: 0.38, scale: 1.04, glow: 1.0 },
  thinking:  { color: 0x6a6cff, amp: 0.24, speed: 0.75, scale: 0.96, glow: 0.95 },
  speaking:  { color: 0x2ecbff, amp: 0.17, speed: 0.45, scale: 0.98, glow: 1.05 },
  paused:    { color: 0x3a5f8a, amp: 0.08, speed: 0.12, scale: 0.9,  glow: 0.55 },
  error:     { color: 0xff4a5a, amp: 0.28, speed: 0.9,  scale: 0.95, glow: 1.0 },
};

const RINGS = 32;
const SEGMENTS = 320;

const hud = createHud();
const canvas = document.getElementById("face");

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
} catch {
  hud.showBanner("Este browser não suporta WebGL — atualiza o Chrome/Edge para ver o orbe.");
  throw new Error("WebGL unavailable");
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
camera.position.set(0, 0, 6.2);

// ------------------------------------------------------------------ shared uniforms
const uniforms = {
  uTime: { value: 0 },
  uAmp: { value: 0.1 },
  uColor: { value: new THREE.Color(LOOK.offline.color) },
  uGlow: { value: 0.4 },
  uLevel: { value: 0 },
  uCamDist: { value: 6.2 },
};

// Ashima 3D simplex noise (MIT) — drives every ring and particle the same way,
// so lines and dust ripple as one body.
const NOISE = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
// Displace a point on the unit shell: broad lobes + fine crackle, growing with level.
vec3 plasma(vec3 p, float seed, out float crest){
  float t = uTime;
  float broad = snoise(p * 1.35 + vec3(0.0, t * 0.6, seed));
  float fine = snoise(p * 6.5 + vec3(t * 1.4, seed * 2.0, -t * 0.9));
  float jag = snoise(p * 19.0 + vec3(-t * 2.5, t * 1.7, seed));       // electrical jaggies
  crest = broad * 0.6 + fine * 0.4;
  float r = 1.0 + uAmp * (broad * 1.3 + fine * 0.4) + 0.009 * jag + uLevel * (0.08 * broad + 0.06 * fine + 0.015 * jag);
  return p * r;
}`;

const ringVertex = /* glsl */ `
uniform float uTime, uAmp, uLevel, uCamDist;
attribute float aSeed;
attribute float aShell;
varying float vBright;
${NOISE}
void main(){
  float crest;
  vec3 p = plasma(position, aSeed, crest) * aShell;
  // Crests glow hotter; rings facing the camera edge-on read as lightning.
  float hot = smoothstep(-0.1, 0.85, crest);
  vBright = 0.14 + 0.86 * hot * hot;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vBright *= smoothstep(-2.2, 0.6, mv.z + uCamDist); // back of the shell recedes
  gl_Position = projectionMatrix * mv;
}`;
const ringFragment = /* glsl */ `
uniform vec3 uColor; uniform float uGlow;
varying float vBright;
void main(){
  vec3 c = mix(uColor, vec3(1.0), 0.12 * vBright);
  gl_FragColor = vec4(c * vBright * uGlow * 1.25, 1.0);
}`;

const dustVertex = /* glsl */ `
uniform float uTime, uAmp, uLevel;
attribute float aSeed;
attribute float aShell;
varying float vBright;
${NOISE}
void main(){
  float crest;
  vec3 p = plasma(position, aSeed, crest) * aShell;
  vBright = 0.25 + 0.75 * smoothstep(0.0, 1.0, crest);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = (1.2 + 1.6 * vBright) * (6.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}`;
const dustFragment = /* glsl */ `
uniform vec3 uColor; uniform float uGlow;
varying float vBright;
void main(){
  vec2 d = gl_PointCoord - 0.5;
  float a = smoothstep(0.5, 0.0, length(d));
  gl_FragColor = vec4(uColor * vBright * uGlow * a * 0.55, 1.0);
}`;

const additive = { transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending };

// ------------------------------------------------------------------ orb body
const orb = new THREE.Group();
scene.add(orb);

function buildRings() {
  // Every ring is a great circle on the unit sphere with its own tilt; together
  // they form the tangled shell. Seeds decorrelate their turbulence.
  const pos = [], seed = [], shell = [], index = [];
  const q = new THREE.Quaternion(), v = new THREE.Vector3(), axis = new THREE.Vector3();
  let base = 0;
  for (let r = 0; r < RINGS; r++) {
    axis.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    q.setFromAxisAngle(axis, Math.random() * Math.PI);
    const s = Math.random() * 100, sh = 0.88 + Math.random() * 0.16;
    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i / SEGMENTS) * Math.PI * 2;
      v.set(Math.cos(a), Math.sin(a), 0).applyQuaternion(q);
      pos.push(v.x, v.y, v.z); seed.push(s); shell.push(sh);
      index.push(base + i, base + ((i + 1) % SEGMENTS));
    }
    base += SEGMENTS;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));
  g.setAttribute("aShell", new THREE.Float32BufferAttribute(shell, 1));
  g.setIndex(index);
  const m = new THREE.ShaderMaterial({ uniforms, vertexShader: ringVertex, fragmentShader: ringFragment, ...additive });
  return new THREE.LineSegments(g, m);
}

function buildDust() {
  // Fine "digital" grain inside the shell, following the same plasma field.
  const N = 9000;
  const pos = new Float32Array(N * 3), seed = new Float32Array(N), shell = new Float32Array(N);
  const v = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    v.randomDirection();
    pos.set([v.x, v.y, v.z], i * 3);
    seed[i] = Math.random() * 100;
    shell[i] = 0.55 + Math.pow(Math.random(), 0.6) * 0.5;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  g.setAttribute("aShell", new THREE.BufferAttribute(shell, 1));
  const m = new THREE.ShaderMaterial({ uniforms, vertexShader: dustVertex, fragmentShader: dustFragment, ...additive });
  return new THREE.Points(g, m);
}

function radialTexture(stops) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d");
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  for (const [o, col] of stops) g.addColorStop(o, col);
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const rings = buildRings();
const dust = buildDust();
orb.add(dust, rings);

const coreTex = radialTexture([[0, "rgba(255,255,255,1)"], [0.12, "rgba(220,245,255,0.95)"], [0.35, "rgba(120,200,255,0.35)"], [1, "rgba(0,0,0,0)"]]);
const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: coreTex, ...additive }));
core.scale.setScalar(1.1);
const halo = new THREE.Sprite(new THREE.SpriteMaterial({
  map: radialTexture([[0, "rgba(255,255,255,0.5)"], [0.4, "rgba(255,255,255,0.12)"], [1, "rgba(0,0,0,0)"]]), ...additive,
}));
halo.scale.setScalar(2.8);
// Anamorphic streak through the core, as in a lens flare.
const streak = new THREE.Sprite(new THREE.SpriteMaterial({
  map: radialTexture([[0, "rgba(255,255,255,0.9)"], [0.25, "rgba(255,255,255,0.18)"], [1, "rgba(0,0,0,0)"]]), ...additive,
}));
streak.scale.set(9, 0.12, 1);
scene.add(halo, core, streak);

// ------------------------------------------------------------------ post
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.9, 0.5, 0.16);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  camera.aspect = w / h;
  // Keep the orb fully visible on narrow (phone) screens.
  camera.position.z = 6.2 * Math.max(1, 0.9 / camera.aspect);
  uniforms.uCamDist.value = camera.position.z;
  camera.updateProjectionMatrix();
}
addEventListener("resize", resize);

// ------------------------------------------------------------------ animation
const anim = {
  color: new THREE.Color(LOOK.offline.color),
  amp: 0.05, speed: 0.08, scale: 0.78, glow: 0.35,
  inL: 0, outL: 0, time: 0, rx: 0, ry: 0,
};
const lerp = THREE.MathUtils.lerp;
const tmp = new THREE.Color();

function update(t, dt) {
  hud.tick(t);
  const { live, pointer } = hud;
  const look = LOOK[live.state] || LOOK.idle;
  const k = 1 - Math.exp(-dt * 3.5);
  anim.color.lerp(tmp.setHex(look.color), k);
  anim.amp = lerp(anim.amp, look.amp, k);
  anim.speed = lerp(anim.speed, look.speed, k);
  anim.scale = lerp(anim.scale, look.scale, k);
  anim.glow = lerp(anim.glow, look.glow, k);
  const att = (cur, tgt) => lerp(cur, tgt, 1 - Math.exp(-dt * (tgt > cur ? 24 : 6)));
  anim.inL = att(anim.inL, Math.min(1, live.inLevel * 1.6));
  anim.outL = att(anim.outL, Math.min(1, live.outLevel * 1.5));

  // The voice that matters right now: Jarvis' own while speaking, yours while listening.
  const level = live.state === "speaking" ? anim.outL : live.state === "listening" ? anim.inL * 0.8 : 0;
  const motion = reduceMotion ? 0.25 : 1;
  anim.time += dt * (anim.speed + level * 0.9) * motion;

  uniforms.uTime.value = anim.time;
  uniforms.uAmp.value = anim.amp * motion + level * 0.05;
  uniforms.uLevel.value = level * motion;
  uniforms.uColor.value.copy(anim.color);
  uniforms.uGlow.value = anim.glow * (1 + level * 0.25);

  // Slow tumble, nudged toward the pointer.
  const near = t - pointer.at < 4;
  anim.ry = lerp(anim.ry, near ? pointer.x * 0.5 : 0, 1 - Math.exp(-dt * 1.5));
  anim.rx = lerp(anim.rx, near ? pointer.y * 0.35 : 0, 1 - Math.exp(-dt * 1.5));
  orb.rotation.set(anim.rx + t * 0.05 * motion, anim.ry + t * 0.11 * motion, t * 0.03 * motion);
  const breathe = reduceMotion ? 0 : Math.sin(t * 1.3) * 0.015;
  orb.scale.setScalar(anim.scale * (1 + breathe + level * 0.05));

  const coreColor = tmp.copy(anim.color).lerp(new THREE.Color(1, 1, 1), 0.55);
  core.material.color.copy(coreColor);
  core.scale.setScalar((0.85 + level * 0.45 + (reduceMotion ? 0 : Math.sin(t * 7) * 0.03 * level)) * anim.scale);
  core.material.opacity = 0.35 + anim.glow * 0.6;
  halo.material.color.copy(anim.color);
  halo.material.opacity = 0.12 * anim.glow + level * 0.08;
  streak.material.color.copy(anim.color).lerp(new THREE.Color(1, 1, 1), 0.3);
  streak.material.opacity = 0.3 * anim.glow + level * 0.2;
  streak.scale.x = 7 + level * 2.5;
  bloom.strength = 0.6 + anim.glow * 0.3 + level * 0.25;
}

let last = performance.now() / 1000;
function frame(ms) {
  const t = ms / 1000;
  const dt = Math.min(0.05, t - last); last = t;
  update(t, dt);
  composer.render();
  requestAnimationFrame(frame);
}

window.__jarvisOrb = { anim, hud };
hud.bindInput(canvas);
hud.start();
resize();
requestAnimationFrame(frame);
