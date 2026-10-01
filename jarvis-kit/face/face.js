/* Jarvis Face — a topographic, audio-reactive face for Personal Jarvis.
 *
 * The head is a height field scanned by horizontal contour lines; eyes, mouth
 * and halo are driven by the live voice state and the real mic/speaker levels
 * relayed by face_bridge.py. Opened without the bridge (file:// or ?demo) it
 * runs a clearly labelled demo cycle instead.
 */
(() => {
  "use strict";

  // ---------------------------------------------------------------- config
  const STATES = {
    offline:   { label: "jarvis offline", accent: [96, 102, 112],  eye: 0.06, dot: "#4a4f57" },
    idle:      { label: "em espera",      accent: [190, 226, 232], eye: 0.82, dot: "#8a8f98" },
    listening: { label: "a ouvir",        accent: [92, 225, 230],  eye: 1.12, dot: "#5ce1e6" },
    thinking:  { label: "a pensar",       accent: [255, 181, 71],  eye: 0.5,  dot: "#ffb547" },
    speaking:  { label: "a falar",        accent: [236, 244, 240], eye: 0.96, dot: "#eef0ea" },
    paused:    { label: "em pausa",       accent: [120, 126, 136], eye: 0.3,  dot: "#8a8f98" },
    error:     { label: "erro",           accent: [255, 90, 95],   eye: 0.7,  dot: "#ff5a5f" },
  };
  const ROWS = 40;
  const COLS = 56;
  const TAU = Math.PI * 2;

  const params = new URLSearchParams(location.search);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const demo = params.has("demo") || location.protocol === "file:";

  // ---------------------------------------------------------------- DOM
  const canvas = document.getElementById("face");
  const ctx = canvas.getContext("2d");
  const chip = document.getElementById("chip");
  const chipLabel = document.getElementById("chip-label");
  const capUser = document.getElementById("cap-user");
  const capJarvis = document.getElementById("cap-jarvis");
  const captions = document.getElementById("captions");
  const banner = document.getElementById("banner");
  const linkLabel = document.getElementById("link-label");
  const sub = document.getElementById("sub");

  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  addEventListener("resize", resize);
  resize();

  // ---------------------------------------------------------------- state
  const live = {
    linked: false,          // bridge <-> Jarvis
    bridge: false,          // page <-> bridge
    state: "offline",
    inLevel: 0, outLevel: 0, // raw targets
  };
  const anim = {
    accent: STATES.offline.accent.slice(),
    eye: STATES.offline.eye,
    inL: 0, outL: 0,
    yaw: 0, pitch: 0,
    gazeX: 0, gazeY: 0,
    blink: 0, nextBlink: 1.5, blinkT: -1,
    think: 0, listen: 0, speak: 0, sleep: 1,
  };
  let pointer = { x: 0, y: 0, at: -10 };

  function setState(name) {
    const s = STATES[name] ? name : "idle";
    live.state = s;
    chipLabel.textContent = STATES[s].label;
    chip.style.setProperty("--chip-dot", STATES[s].dot);
    if (s === "listening") capUser.textContent = "";
  }

  function showBanner(text) {
    banner.textContent = text || "";
    banner.hidden = !text;
  }

  function refreshLink() {
    if (demo) {
      linkLabel.textContent = "modo demonstração";
      sub.textContent = "demo · sem ligação ao jarvis";
      showBanner("");
      return;
    }
    if (!live.bridge) {
      linkLabel.textContent = "ponte desligada";
      showBanner("A ponte do rosto não está a correr — inicia face_bridge.py");
    } else if (!live.linked) {
      linkLabel.textContent = "à espera do jarvis";
      showBanner("À espera do Personal Jarvis… abre a app no computador.");
    } else {
      linkLabel.textContent = "ligado ao jarvis";
      showBanner("");
    }
    if (!live.bridge || !live.linked) setState("offline");
  }

  // ---------------------------------------------------------------- bridge
  let ws = null, retry = 400, capTimer = 0;
  function connect() {
    ws = new WebSocket(`${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/bridge`);
    ws.onopen = () => { live.bridge = true; retry = 400; refreshLink(); };
    ws.onclose = () => {
      live.bridge = false; live.linked = false; refreshLink();
      setTimeout(connect, retry); retry = Math.min(retry * 2, 8000);
    };
    ws.onmessage = (ev) => {
      let m; try { m = JSON.parse(ev.data); } catch { return; }
      switch (m.t) {
        case "link":
          live.linked = !!m.jarvis;
          refreshLink();
          if (live.linked && live.state === "offline") setState("idle");
          break;
        case "state":
          if (live.linked) setState(m.state);
          break;
        case "level":
          live.inLevel = +m.in || 0; live.outLevel = +m.out || 0;
          break;
        case "caption":
          showCaption(m.who, m.text, m.final);
          break;
      }
    };
  }
  function send(cmd) {
    if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ cmd }));
  }
  function showCaption(who, text, final) {
    if (who === "user") capUser.textContent = text;
    else capJarvis.textContent = text;
    clearTimeout(capTimer);
    if (final) capTimer = setTimeout(() => { capUser.textContent = ""; capJarvis.textContent = ""; }, 9000);
  }

  // ---------------------------------------------------------------- input
  function toggleCall() {
    if (demo) return;
    if (live.state === "idle" || live.state === "error" || live.state === "paused") send("call");
    else if (live.state !== "offline") send("hangup");
  }
  canvas.addEventListener("click", toggleCall);
  addEventListener("keydown", (e) => {
    if (e.repeat) return;
    if (e.code === "Space") { e.preventDefault(); toggleCall(); }
    else if (e.code === "Escape") send("hangup");
    else if (e.code === "KeyC") captions.hidden = !captions.hidden;
    else if (e.code === "KeyF") {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.().catch(() => {});
    }
  });
  addEventListener("pointermove", (e) => {
    pointer = { x: (e.clientX / W) * 2 - 1, y: (e.clientY / H) * 2 - 1, at: performance.now() / 1000 };
  });

  // ---------------------------------------------------------------- demo
  const DEMO_SCRIPT = [
    ["idle", 3.2, null],
    ["listening", 3.4, ["user", "Jarvis, como está o meu dia hoje?"]],
    ["thinking", 2.2, null],
    ["speaking", 5.2, ["jarvis", "Tens duas reuniões esta tarde e o relatório de vendas fica pronto às cinco. Queres que prepare um resumo?"]],
    ["idle", 2.6, null],
  ];
  let demoIdx = -1, demoUntil = 0;
  function demoTick(t) {
    if (t >= demoUntil) {
      demoIdx = (demoIdx + 1) % DEMO_SCRIPT.length;
      const [s, dur, cap] = DEMO_SCRIPT[demoIdx];
      setState(s); demoUntil = t + dur;
      if (cap) showCaption(cap[0], cap[1], s === "speaking");
    }
    const s = live.state;
    const n = (f) => 0.5 + 0.5 * Math.sin(t * f);
    live.inLevel = s === "listening" ? Math.max(0, n(9.3) * n(2.1) * 0.9 - 0.08) : 0.02;
    live.outLevel = s === "speaking" ? Math.max(0, n(13.7) * (0.45 + 0.55 * n(3.3)) * n(0.9 + 0.3 * n(0.4))) : 0;
  }

  // ---------------------------------------------------------------- head model
  // u: horizontal [-1, 1]; v: vertical, -1.05 (crown) .. 1.22 (chin).
  const V_TOP = -1.05, V_BOT = 1.22;
  function halfWidth(v) {
    if (v <= 0) return 0.74 * Math.sqrt(Math.max(0, 1 - (v / 1.05) ** 2));
    if (v <= 0.5) return 0.74 * (1 - 0.12 * (v / 0.5) ** 2);
    if (v <= 1.05) {
      // Jawline: cheeks hold, taper, then settle into a defined chin.
      const s = (v - 0.5) / 0.55;
      return 0.651 - (0.651 - 0.24) * s * s * (3 - 2 * s);
    }
    return 0.24 * Math.sqrt(Math.max(0, 1 - ((v - 1.05) / 0.17) ** 2));
  }
  const g = (x, y, sx, sy) => Math.exp(-((x * x) / (sx * sx) + (y * y) / (sy * sy)));
  function heightAt(u, v) {
    const w = halfWidth(v);
    if (w <= 1e-3 || Math.abs(u) >= w) return 0;
    const au = Math.abs(u);
    return (
      Math.sqrt(1 - (u / w) ** 2) * 0.55 +
      0.26 * g(u, v - 0.27, 0.065, 0.24) + 0.12 * g(u, v - 0.45, 0.12, 0.06) +   // nose
      0.1 * g(au - 0.28, v + 0.17, 0.2, 0.06) -                                  // brow
      0.15 * g(au - 0.28, v - 0.0, 0.15, 0.1) +                                  // sockets
      0.08 * g(au - 0.43, v - 0.38, 0.14, 0.14) +                                // cheekbones
      0.06 * g(u, v - 0.69, 0.18, 0.06) +                                        // lips
      0.08 * g(u, v - 1.02, 0.18, 0.1)                                           // chin
    );
  }
  // Precompute the height grid once; per-frame work is projection only.
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const v = V_TOP + 0.04 + (r / (ROWS - 1)) * (V_BOT - V_TOP - 0.08);
    const w = halfWidth(v);
    const pts = [];
    for (let c = 0; c <= COLS; c++) {
      const u = -w + (2 * w * c) / COLS;
      const eyeL = ((u + 0.28) / 0.15) ** 2 + (v / 0.085) ** 2 < 1;
      const eyeR = ((u - 0.28) / 0.15) ** 2 + (v / 0.085) ** 2 < 1;
      const mouth = Math.abs(u) < 0.2 && Math.abs(v - 0.69) < 0.05;
      pts.push({ u, h: heightAt(u, v), facing: Math.sqrt(Math.max(0, 1 - (u / w) ** 2)), gap: eyeL || eyeR || mouth });
    }
    grid.push({ v, w, pts });
  }

  // ---------------------------------------------------------------- render
  const lerp = (a, b, k) => a + (b - a) * k;
  const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;

  let cx = 0, cy = 0, S = 1, cosY = 1, sinY = 0, relief = 0.2;
  function project(u, v, h) {
    const xr = u * cosY + h * sinY;
    const zr = -u * sinY + h * cosY;
    return [cx + xr * S, cy + v * S - zr * S * relief];
  }

  function drawBackground(t) {
    const bg = ctx.createRadialGradient(cx, cy, S * 0.2, cx, cy, Math.max(W, H) * 0.75);
    bg.addColorStop(0, "#0e1116");
    bg.addColorStop(1, "#07080a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    // A quiet dot lattice gives depth without competing with the face.
    const step = 28;
    ctx.fillStyle = "rgba(238,240,234,0.035)";
    const ox = (W / 2) % step, oy = (H / 2) % step;
    for (let x = ox; x < W; x += step) for (let y = oy; y < H; y += step) ctx.fillRect(x, y, 1, 1);
    // Ambient glow behind the head, tinted by the state.
    const glow = ctx.createRadialGradient(cx, cy + S * 0.1, 0, cx, cy + S * 0.1, S * 1.6);
    glow.addColorStop(0, rgba(anim.accent, 0.07 + 0.12 * anim.outL + 0.06 * anim.inL));
    glow.addColorStop(1, rgba(anim.accent, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
  }

  function drawContours(t) {
    const awake = 1 - anim.sleep;
    const scanV = V_TOP + ((t * (0.35 + anim.think * 1.4)) % 1.6) / 1.6 * (V_BOT - V_TOP + 0.6) - 0.3;
    const mouthPt = 0.69;
    ctx.lineWidth = 1.05;
    for (const row of grid) {
      const scan = reduceMotion ? 0 : g(row.v - scanV, 0, 0.09, 1) * (0.25 + anim.think * 0.75) * awake;
      const base = 0.16 + 0.34 * awake + scan * 0.5;
      const speakRipple = anim.outL * anim.speak * g(0, row.v - mouthPt, 1, 0.38);
      ctx.beginPath();
      let pen = false;
      for (let i = 0; i < row.pts.length; i++) {
        const p = row.pts[i];
        if (p.gap) { pen = false; continue; }
        let h = p.h;
        if (speakRipple > 0.001 && !reduceMotion) h += Math.sin(p.u * 11 - t * 14) * speakRipple * 0.05;
        const [x, y] = project(p.u, row.v, h);
        if (!pen) { ctx.moveTo(x, y); pen = true; } else ctx.lineTo(x, y);
      }
      // Fade toward the silhouette so the head reads as a rounded volume.
      const [xl] = project(-row.w, row.v, 0);
      const [xr] = project(row.w, row.v, 0);
      const grad = ctx.createLinearGradient(xl, 0, xr, 0);
      const mid = Math.min(0.98, Math.max(0.02, 0.5 + anim.yaw * 0.6));
      grad.addColorStop(0, rgba(anim.accent, 0));
      grad.addColorStop(Math.max(0.01, mid - 0.32), rgba(anim.accent, base * 0.75));
      grad.addColorStop(mid, rgba(anim.accent, base));
      grad.addColorStop(Math.min(0.99, mid + 0.32), rgba(anim.accent, base * 0.75));
      grad.addColorStop(1, rgba(anim.accent, 0));
      ctx.strokeStyle = grad;
      ctx.stroke();
    }
  }

  function drawEye(side, t) {
    const u0 = 0.28 * side;
    const [ex, ey] = project(u0, 0.0, heightAt(u0, 0.0) + 0.04);
    const open = Math.max(0.04, anim.eye * (1 - anim.blink));
    const ew = 0.15 * S, eh = 0.062 * S * open;
    const a = anim.accent;

    ctx.save();
    ctx.shadowColor = rgba(a, 0.9);
    ctx.shadowBlur = 18 + 26 * (anim.listen * anim.inL + anim.outL * 0.6);
    // Almond aperture.
    ctx.beginPath();
    ctx.moveTo(ex - ew, ey);
    ctx.quadraticCurveTo(ex, ey - eh * 2, ex + ew, ey);
    ctx.quadraticCurveTo(ex, ey + eh * 2, ex - ew, ey);
    ctx.closePath();
    const fill = ctx.createRadialGradient(ex, ey, 0, ex, ey, ew);
    fill.addColorStop(0, rgba(a, 0.32 + 0.25 * (1 - anim.sleep)));
    fill.addColorStop(1, rgba(a, 0.04));
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = rgba(a, 0.85);
    ctx.stroke();
    ctx.restore();

    if (open < 0.12) return;
    // Iris + pupil, clipped to the aperture.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(ex - ew, ey);
    ctx.quadraticCurveTo(ex, ey - eh * 2, ex + ew, ey);
    ctx.quadraticCurveTo(ex, ey + eh * 2, ex - ew, ey);
    ctx.clip();
    const ix = ex + anim.gazeX * ew * 0.45;
    const iy = ey + anim.gazeY * eh * 0.5;
    const ir = 0.045 * S * (1 + 0.12 * anim.listen * anim.inL);
    const iris = ctx.createRadialGradient(ix, iy, 0, ix, iy, ir);
    iris.addColorStop(0, "rgba(255,255,255,0.98)");
    iris.addColorStop(0.35, rgba(a, 0.95));
    iris.addColorStop(1, rgba(a, 0));
    ctx.fillStyle = iris;
    ctx.beginPath(); ctx.arc(ix, iy, ir, 0, TAU); ctx.fill();
    // Iris ring ticks — a small mechanical detail that rotates while thinking.
    ctx.strokeStyle = rgba(a, 0.55);
    ctx.lineWidth = 1;
    const spin = t * (0.4 + anim.think * 3);
    for (let k = 0; k < 12; k++) {
      const ang = spin + (k / 12) * TAU;
      ctx.beginPath();
      ctx.moveTo(ix + Math.cos(ang) * ir * 0.62, iy + Math.sin(ang) * ir * 0.62);
      ctx.lineTo(ix + Math.cos(ang) * ir * 0.82, iy + Math.sin(ang) * ir * 0.82);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawMouth(t) {
    const [mx, my] = project(0, 0.69, heightAt(0, 0.69) + 0.03);
    const mw = 0.17 * S;
    const a = anim.accent;
    const amp = anim.outL * anim.speak * 0.075 * S;
    const smile = (0.012 + 0.006 * (1 - anim.think)) * S * (1 - anim.sleep);
    const N = 40;
    const lip = (dir) => {
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const x = -1 + (2 * i) / N;
        const env = Math.pow(1 - x * x, 1.15);
        const wave = reduceMotion ? 1 :
          0.65 + 0.35 * Math.sin(x * 7 + t * 17) * Math.sin(x * 3 - t * 9);
        const y = my + smile * (1 - x * x) + dir * amp * env * wave;
        const px = mx + x * mw;
        i ? ctx.lineTo(px, y) : ctx.moveTo(px, y);
      }
    };
    ctx.save();
    ctx.shadowColor = rgba(a, 0.8);
    ctx.shadowBlur = 10 + 30 * anim.outL;
    if (amp > 0.6) {
      // Open mouth: fill between the two lips.
      lip(-1);
      for (let i = N; i >= 0; i--) {
        const x = -1 + (2 * i) / N;
        const env = Math.pow(1 - x * x, 1.15);
        const wave = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(x * 7 + t * 17) * Math.sin(x * 3 - t * 9);
        ctx.lineTo(mx + x * mw, my + smile * (1 - x * x) + amp * env * wave * 0.7);
      }
      ctx.closePath();
      ctx.fillStyle = rgba(a, 0.16);
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = rgba(a, 0.9);
      ctx.stroke();
    } else {
      lip(0);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = rgba(a, 0.35 + 0.45 * (1 - anim.sleep));
      ctx.stroke();
      if (anim.think > 0.05 && !reduceMotion) {
        // A pulse travelling along the closed mouth while Jarvis thinks.
        const x = Math.sin(t * 2.4);
        ctx.fillStyle = rgba(a, anim.think);
        ctx.beginPath();
        ctx.arc(mx + x * mw, my + smile * (1 - x * x), 2.2, 0, TAU);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  function drawHalo(t) {
    const hx = cx, hy = cy + S * 0.08, R = S * 1.38;
    const a = anim.accent;
    ctx.save();
    // Base ring, breathing in idle.
    const breathe = reduceMotion ? 0 : Math.sin(t * 1.1) * 0.02;
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(a, 0.08 + 0.06 * (1 - anim.sleep));
    ctx.beginPath(); ctx.arc(hx, hy, R * (1 + breathe), 0, TAU); ctx.stroke();

    // Listening: radial ticks answer the microphone.
    if (anim.listen > 0.01) {
      const n = 120;
      ctx.strokeStyle = rgba(a, 0.55 * anim.listen);
      ctx.lineWidth = 1.4;
      for (let k = 0; k < n; k++) {
        const ang = (k / n) * TAU - Math.PI / 2;
        const jitter = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(k * 1.7 + t * 9) * Math.sin(k * 0.31 - t * 4);
        const len = S * (0.025 + anim.inL * 0.2 * jitter) * anim.listen;
        ctx.beginPath();
        ctx.moveTo(hx + Math.cos(ang) * R, hy + Math.sin(ang) * R);
        ctx.lineTo(hx + Math.cos(ang) * (R + len), hy + Math.sin(ang) * (R + len));
        ctx.stroke();
      }
    }
    // Thinking: counter-rotating arcs.
    if (anim.think > 0.01) {
      ctx.lineWidth = 1.6;
      const arcs = [[1.06, 1.3, 0.9], [1.12, -0.8, 1.6], [1.18, 0.55, 0.5]];
      for (const [rk, speed, len] of arcs) {
        const start = (reduceMotion ? 0 : t * speed) % TAU;
        ctx.strokeStyle = rgba(a, 0.5 * anim.think);
        ctx.beginPath(); ctx.arc(hx, hy, R * rk, start, start + len); ctx.stroke();
        ctx.beginPath(); ctx.arc(hx, hy, R * rk, start + Math.PI, start + Math.PI + len * 0.4); ctx.stroke();
      }
    }
    // Speaking: ripples expanding with the voice.
    if (anim.speak > 0.01 && !reduceMotion) {
      for (let k = 0; k < 3; k++) {
        const ph = (t * 0.55 + k / 3) % 1;
        ctx.strokeStyle = rgba(a, (1 - ph) * 0.28 * anim.speak * (0.3 + anim.outL));
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(hx, hy, R * (1 + ph * 0.32), 0, TAU); ctx.stroke();
      }
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------- loop
  let last = performance.now() / 1000;
  function frame(nowMs) {
    const t = nowMs / 1000;
    const dt = Math.min(0.05, t - last); last = t;
    if (demo) demoTick(t);

    const s = live.state;
    const target = STATES[s];
    const k = 1 - Math.exp(-dt * 6);
    for (let i = 0; i < 3; i++) anim.accent[i] = lerp(anim.accent[i], target.accent[i], k);
    anim.eye = lerp(anim.eye, target.eye + (s === "error" && !reduceMotion ? Math.sin(t * 30) * 0.15 : 0), 1 - Math.exp(-dt * 10));
    anim.think = lerp(anim.think, s === "thinking" ? 1 : 0, k);
    anim.listen = lerp(anim.listen, s === "listening" ? 1 : 0, k);
    anim.speak = lerp(anim.speak, s === "speaking" ? 1 : 0, k);
    anim.sleep = lerp(anim.sleep, s === "offline" ? 1 : s === "paused" ? 0.6 : 0, 1 - Math.exp(-dt * 2.5));
    // Fast attack, slower release: lively without flicker.
    const att = (cur, tgt) => lerp(cur, tgt, 1 - Math.exp(-dt * (tgt > cur ? 28 : 7)));
    anim.inL = att(anim.inL, Math.min(1, live.inLevel * 1.6));
    anim.outL = att(anim.outL, Math.min(1, live.outLevel * 1.5));

    // Gaze: follow the pointer for a while, otherwise drift; scan while thinking.
    let gx, gy;
    if (anim.think > 0.5 && !reduceMotion) { gx = Math.sin(t * 2.2) * 0.9; gy = -0.15; }
    else if (t - pointer.at < 4) { gx = pointer.x; gy = pointer.y * 0.8; }
    else { gx = Math.sin(t * 0.37) * 0.45 + Math.sin(t * 0.91) * 0.15; gy = Math.sin(t * 0.53) * 0.25; }
    if (reduceMotion) { gx *= 0.3; gy *= 0.3; }
    anim.gazeX = lerp(anim.gazeX, gx, 1 - Math.exp(-dt * 5));
    anim.gazeY = lerp(anim.gazeY, gy, 1 - Math.exp(-dt * 5));
    anim.yaw = lerp(anim.yaw, anim.gazeX * 0.16 * (1 - anim.sleep), 1 - Math.exp(-dt * 2.5));
    anim.pitch = lerp(anim.pitch, (anim.listen * 0.04 - anim.sleep * 0.05), k);

    // Blink: random cadence, never while asleep.
    if (anim.blinkT < 0 && t > anim.nextBlink && anim.sleep < 0.5) anim.blinkT = 0;
    if (anim.blinkT >= 0) {
      anim.blinkT += dt;
      const d = 0.16;
      anim.blink = Math.sin(Math.min(1, anim.blinkT / d) * Math.PI);
      if (anim.blinkT > d) { anim.blinkT = -1; anim.blink = 0; anim.nextBlink = t + 2.2 + Math.random() * 4.5; }
    }

    // Layout.
    S = Math.min(W * 0.33, H * 0.3);
    cx = W / 2;
    cy = H * 0.44 + (reduceMotion ? 0 : Math.sin(t * 0.9) * S * 0.008);
    cosY = Math.cos(anim.yaw); sinY = Math.sin(anim.yaw);
    relief = 0.2 + anim.pitch;

    drawBackground(t);
    drawHalo(t);
    drawContours(t);
    drawEye(-1, t);
    drawEye(1, t);
    drawMouth(t);
    requestAnimationFrame(frame);
  }

  // ---------------------------------------------------------------- boot
  setState(demo ? "idle" : "offline");
  refreshLink();
  if (!demo) connect();
  requestAnimationFrame(frame);
})();
