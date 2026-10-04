// HUD panels: clock, live PC readings, history sparklines and the voice strip.
// Everything shown comes from the bridge (or the labelled demo); a reading the
// machine cannot provide is shown as "—" or its panel is hidden.

const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const dateFmt = new Intl.DateTimeFormat("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("pt-PT", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

function bytes(n) {
  if (n == null) return "—";
  const u = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${i >= 3 ? nf1.format(n) : nf0.format(n)} ${u[i]}`;
}
const rate = (n) => (n == null ? "—" : `${bytes(n)}/s`);
function duration(s) {
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60);
  return d ? `${d} d ${h} h` : h ? `${h} h ${m} min` : `${m} min`;
}
// Usage bars warn when high; a battery bar ("charge") warns when low instead.
function setBar(el, pct, { charge = false } = {}) {
  el.querySelector("i").style.width = `${Math.max(0, Math.min(100, pct))}%`;
  el.classList.toggle("hot", charge ? pct <= 30 && pct > 15 : pct >= 75 && pct < 90);
  el.classList.toggle("crit", charge ? pct <= 15 : pct >= 90);
}

// Canvas sparkline with a soft area fill, coloured by the live accent.
function sparkline(canvas, series, { max = null } = {}) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (!w || !h) return;
  if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
  // Grid lines.
  ctx.strokeStyle = `rgba(${rgb}, 0.12)`; ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) { const y = Math.round((h * i) / 4) + 0.5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  series.forEach(({ data, color, fill }) => {
    if (data.length < 2) return;
    const top = max ?? Math.max(1, ...series.flatMap((s) => s.data)) * 1.15;
    const step = w / (HISTORY - 1);
    const x0 = w - (data.length - 1) * step;
    ctx.beginPath();
    data.forEach((v, i) => { const x = x0 + i * step, y = h - (v / top) * (h - 2) - 1; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.strokeStyle = color || `rgb(${rgb})`; ctx.lineWidth = 1.5; ctx.stroke();
    if (fill) {
      ctx.lineTo(w, h); ctx.lineTo(x0, h); ctx.closePath();
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, `rgba(${rgb}, 0.28)`); g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g; ctx.fill();
    }
  });
}

const HISTORY = 60; // one minute at 1 Hz

export function createPanels(hud) {
  const cpuHist = [], downHist = [], upHist = [];
  const push = (arr, v) => { arr.push(v); if (arr.length > HISTORY) arr.shift(); };

  // Clock + date (local time, Portuguese).
  const clock = $("clock"), date = $("date");
  function tickClock() {
    const now = new Date();
    clock.textContent = timeFmt.format(now);
    date.textContent = dateFmt.format(now);
  }
  tickClock();
  setInterval(tickClock, 1000);

  // Tick marks of the outer ring, generated once.
  const ticks = $("ticks");
  if (ticks) {
    const ns = "http://www.w3.org/2000/svg";
    for (let i = 0; i < 120; i++) {
      const a = (i / 120) * Math.PI * 2, long = i % 10 === 0;
      const r1 = 234, r2 = long ? 244 : 239;
      const l = document.createElementNS(ns, "line");
      l.setAttribute("x1", 250 + Math.cos(a) * r1); l.setAttribute("y1", 250 + Math.sin(a) * r1);
      l.setAttribute("x2", 250 + Math.cos(a) * r2); l.setAttribute("y2", 250 + Math.sin(a) * r2);
      l.setAttribute("stroke-width", long ? "1.8" : "0.9");
      ticks.appendChild(l);
    }
  }

  const coresEl = $("cpu-cores");
  hud.onSys((m) => {
    if (!m.available) return;
    // Processor
    $("cpu-pct").textContent = nf0.format(m.cpu);
    $("cpu-freq").textContent = m.freq ? `${nf1.format(m.freq / 1000)} GHz · ${m.cores.length} núcleos` : `${m.cores.length} núcleos`;
    $("s-cpu").textContent = `${nf0.format(m.cpu)}%`;
    if (coresEl.children.length !== m.cores.length) {
      coresEl.replaceChildren(...m.cores.map(() => document.createElement("i")));
    }
    m.cores.forEach((c, i) => { coresEl.children[i].style.height = `${Math.max(6, c)}%`; });
    push(cpuHist, m.cpu);
    sparkline($("cpu-spark"), [{ data: cpuHist, fill: true }], { max: 100 });

    // Memory
    $("mem-pct").textContent = nf0.format(m.mem.pct);
    $("mem-total").textContent = bytes(m.mem.total);
    $("mem-used").textContent = `${bytes(m.mem.used)} de ${bytes(m.mem.total)}`;
    $("s-mem").textContent = `${nf0.format(m.mem.pct)}%`;
    setBar($("mem-bar"), m.mem.pct);

    // Disks
    const disks = $("disks");
    disks.replaceChildren(...m.disks.map((d) => {
      const el = document.createElement("div");
      el.className = "disk";
      el.innerHTML = `<div class="row"><span></span><b></b></div><div class="bar"><i></i></div>`;
      el.querySelector("span").textContent = d.name;
      el.querySelector("b").textContent = `${bytes(d.total - d.used)} livres`;
      setBar(el.querySelector(".bar"), d.pct);
      return el;
    }));

    // Network
    $("net-down").textContent = rate(m.net.down);
    $("net-up").textContent = rate(m.net.up);
    $("s-net").textContent = rate(m.net.down);
    if (m.net.down != null) { push(downHist, m.net.down); push(upHist, m.net.up); }
    sparkline($("net-spark"), [
      { data: downHist, fill: true },
      { data: upHist, color: "rgba(138, 240, 255, 0.9)" },
    ]);

    // Power: a desktop without a battery says so instead of showing a fake gauge.
    if (m.battery) {
      $("bat-pct").textContent = nf0.format(m.battery.pct);
      $("bat-unit").textContent = "%";
      $("power-src").textContent = m.battery.plugged ? "a carregar" : "bateria";
      $("bat-bar").hidden = false;
      setBar($("bat-bar"), m.battery.pct, { charge: true });
    } else {
      $("bat-pct").textContent = "AC";
      $("bat-unit").textContent = "";
      $("power-src").textContent = "corrente";
      $("bat-bar").hidden = true;
    }

    // System
    $("sys-host").textContent = m.host || "—";
    $("sys-os").textContent = m.os || "—";
    $("sys-up").textContent = duration(m.uptime);
    $("sys-procs").textContent = nf0.format(m.procs);
  });

  // Voice strip: a rolling bar graph of the live voice level (yours or Jarvis').
  const wave = $("wave");
  const levels = new Array(64).fill(0);
  let lastPush = 0;
  function drawWave(t, level) {
    if (t - lastPush > 0.05) { levels.push(level); levels.shift(); lastPush = t; }
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = wave.clientWidth, h = wave.clientHeight;
    if (!w) return;
    if (wave.width !== Math.round(w * dpr)) { wave.width = Math.round(w * dpr); wave.height = Math.round(h * dpr); }
    const ctx = wave.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const rgb = getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim();
    const bw = w / levels.length;
    levels.forEach((v, i) => {
      const bh = Math.max(1.5, v * h);
      const fade = 0.25 + 0.75 * (i / levels.length);
      ctx.fillStyle = `rgba(${rgb}, ${fade})`;
      ctx.fillRect(i * bw + bw * 0.25, (h - bh) / 2, bw * 0.5, bh);
    });
  }

  return { drawWave };
}
