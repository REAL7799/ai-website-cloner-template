// Shared live state for the HUD: bridge connection, state colours, captions,
// input, system readings and the labelled demo mode. Renderers read `live`.

// `accent` drives the whole HUD (panels, rings, chip) through CSS variables;
// it matches the orb's per-state colour in orb.js.
export const STATES = {
  offline:   { label: "desligado", accent: [58, 95, 138] },
  idle:      { label: "em espera", accent: [31, 184, 255] },
  listening: { label: "a ouvir",   accent: [60, 230, 255] },
  thinking:  { label: "a pensar",  accent: [122, 124, 255] },
  speaking:  { label: "a falar",   accent: [46, 203, 255] },
  paused:    { label: "em pausa",  accent: [58, 95, 138] },
  error:     { label: "erro",      accent: [255, 74, 90] },
};

const DEMO_SCRIPT = [
  ["idle", 3.2, null],
  ["listening", 3.4, ["user", "Jarvis, como está o meu dia hoje?"]],
  ["thinking", 2.2, null],
  ["speaking", 5.6, ["jarvis", "Tens duas reuniões esta tarde e o relatório de vendas fica pronto às cinco. Queres que prepare um resumo?"]],
  ["idle", 2.6, null],
];

export function createHud() {
  const $ = (id) => document.getElementById(id);
  const chip = $("chip"), chipLabel = $("chip-label");
  const capUser = $("cap-user"), capJarvis = $("cap-jarvis"), captions = $("captions");
  const banner = $("banner"), linkLabel = $("link-label"), sub = $("sub");
  const root = document.documentElement;

  const params = new URLSearchParams(location.search);
  const demo = params.has("demo") || location.protocol === "file:";
  const wallpaper = params.has("wallpaper");
  if (wallpaper) document.body.classList.add("wallpaper");
  const sysListeners = [];
  const onSys = (fn) => sysListeners.push(fn);
  const emitSys = (m) => sysListeners.forEach((fn) => fn(m));
  const live = { linked: false, bridge: false, state: "offline", inLevel: 0, outLevel: 0 };
  const pointer = { x: 0, y: 0, at: -10 };

  function setState(name) {
    const s = STATES[name] ? name : "idle";
    live.state = s;
    chipLabel.textContent = STATES[s].label;
    const [r, g, b] = STATES[s].accent;
    root.style.setProperty("--accent", `rgb(${r}, ${g}, ${b})`);
    root.style.setProperty("--accent-rgb", `${r}, ${g}, ${b}`);
    document.body.dataset.state = s;
    if (s === "listening") capUser.textContent = "";
  }
  function showBanner(text) {
    banner.textContent = text || "";
    banner.hidden = !text;
  }
  function refreshLink() {
    if (demo) {
      linkLabel.textContent = "modo demonstração";
      sub.textContent = "demonstração · sem ligação ao jarvis";
      showBanner("");
      return;
    }
    if (!live.bridge) {
      linkLabel.textContent = "ponte desligada";
      showBanner("A ponte do HUD não está a correr — inicia face_bridge.py");
    } else if (!live.linked) {
      linkLabel.textContent = "à espera do jarvis";
      showBanner("À espera do Personal Jarvis… abre a app no computador.");
    } else {
      linkLabel.textContent = "ligado ao jarvis";
      showBanner("");
    }
    if (!live.bridge || !live.linked) setState("offline");
  }

  // ---- bridge
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
      if (m.t === "link") {
        live.linked = !!m.jarvis; refreshLink();
        if (live.linked && live.state === "offline") setState("idle");
      } else if (m.t === "state") {
        if (live.linked) setState(m.state);
      } else if (m.t === "level") {
        live.inLevel = +m.in || 0; live.outLevel = +m.out || 0;
      } else if (m.t === "caption") {
        showCaption(m.who, m.text, m.final);
      } else if (m.t === "sys") {
        emitSys(m);
      } else if (m.t === "name" && m.name) {
        $("brand-name").textContent = m.name.toUpperCase();
        document.title = m.name;
      }
    };
  }
  const send = (cmd) => { if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ cmd })); };
  function showCaption(who, text, final) {
    (who === "user" ? capUser : capJarvis).textContent = text;
    clearTimeout(capTimer);
    if (final) capTimer = setTimeout(() => { capUser.textContent = ""; capJarvis.textContent = ""; }, 9000);
  }

  // ---- input
  function toggleCall() {
    if (demo || wallpaper) return;
    if (["idle", "error", "paused"].includes(live.state)) send("call");
    else if (live.state !== "offline") send("hangup");
  }
  function bindInput(target) {
    target.addEventListener("click", toggleCall);
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
      pointer.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.y = (e.clientY / innerHeight) * 2 - 1;
      pointer.at = performance.now() / 1000;
    });
  }

  // ---- demo: a scripted turn with synthetic levels and readings, clearly labelled
  let demoIdx = -1, demoUntil = 0, demoSysAt = 0;
  function demoSys(t) {
    const w = (f, p = 0) => 0.5 + 0.5 * Math.sin(t * f + p);
    const cores = Array.from({ length: 12 }, (_, i) => Math.round(8 + 60 * w(0.7 + i * 0.13, i)));
    const GB = 1024 ** 3;
    emitSys({
      t: "sys", available: true, demo: true,
      cpu: Math.round(cores.reduce((a, b) => a + b, 0) / cores.length), cores, freq: 3600,
      mem: { used: (9 + 3 * w(0.2)) * GB, total: 16 * GB, pct: Math.round(((9 + 3 * w(0.2)) / 16) * 100) },
      disks: [{ name: "C:", used: 312 * GB, total: 476 * GB, pct: 65.5 }, { name: "D:", used: 610 * GB, total: 931 * GB, pct: 65.5 }],
      net: { up: 40e3 + 160e3 * w(1.3), down: 300e3 + 2.4e6 * w(0.9, 1) },
      battery: { pct: 87, plugged: true }, uptime: 3 * 3600 + 1240 + Math.floor(t), procs: 248,
      host: "DEMO-PC", os: "Windows 11",
    });
  }
  function tick(t) {
    if (!demo) return;
    if (t >= demoUntil) {
      demoIdx = (demoIdx + 1) % DEMO_SCRIPT.length;
      const [s, dur, cap] = DEMO_SCRIPT[demoIdx];
      setState(s); demoUntil = t + dur;
      if (cap) showCaption(cap[0], cap[1], s === "speaking");
    }
    if (t >= demoSysAt) { demoSysAt = t + 1; demoSys(t); }
    const n = (f) => 0.5 + 0.5 * Math.sin(t * f);
    live.inLevel = live.state === "listening" ? Math.max(0, n(9.3) * n(2.1) * 0.9 - 0.08) : 0.02;
    live.outLevel = live.state === "speaking"
      ? Math.max(0, n(11.7) * (0.45 + 0.55 * n(3.3)) * n(0.9 + 0.3 * n(0.4)) - 0.05) : 0;
  }

  function start() {
    setState(demo ? "idle" : "offline");
    refreshLink();
    if (!demo) connect();
  }

  return { live, pointer, demo, wallpaper, onSys, bindInput, tick, start, showBanner };
}
