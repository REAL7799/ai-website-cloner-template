// Shared live state for the face: bridge connection, HUD, captions, input, demo.
// The renderer only reads `live` (state + levels) and `pointer`.

export const STATES = {
  offline:   { label: "jarvis offline", dot: "#4a4f57" },
  idle:      { label: "em espera",      dot: "#8a8f98" },
  listening: { label: "a ouvir",        dot: "#5ce1e6" },
  thinking:  { label: "a pensar",       dot: "#ffb547" },
  speaking:  { label: "a falar",        dot: "#eef0ea" },
  paused:    { label: "em pausa",       dot: "#8a8f98" },
  error:     { label: "erro",           dot: "#ff5a5f" },
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

  const params = new URLSearchParams(location.search);
  const demo = params.has("demo") || location.protocol === "file:";
  const live = { linked: false, bridge: false, state: "offline", inLevel: 0, outLevel: 0 };
  const pointer = { x: 0, y: 0, at: -10 };

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
    if (demo) return;
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

  // ---- demo: a scripted turn with synthetic levels, clearly labelled
  let demoIdx = -1, demoUntil = 0;
  function tick(t) {
    if (!demo) return;
    if (t >= demoUntil) {
      demoIdx = (demoIdx + 1) % DEMO_SCRIPT.length;
      const [s, dur, cap] = DEMO_SCRIPT[demoIdx];
      setState(s); demoUntil = t + dur;
      if (cap) showCaption(cap[0], cap[1], s === "speaking");
    }
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

  return { live, pointer, demo, bindInput, tick, start, showBanner };
}
