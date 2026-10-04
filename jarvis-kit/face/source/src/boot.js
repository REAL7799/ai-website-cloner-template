// Boot sequence: a short, skippable start-up log whose checks are real — the
// lines report the actual bridge, Jarvis and sensor state as they come up.

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function runBoot(hud, { reduceMotion }) {
  const boot = document.getElementById("boot");
  const log = document.getElementById("boot-log");
  let skipped = false;
  let sysReady = null;
  hud.onSys((m) => { if (sysReady === null) sysReady = m.available ? m.cores.length : 0; });

  const finish = () => {
    if (boot.classList.contains("done")) return;
    boot.classList.add("done");
    document.body.classList.remove("booting");
    setTimeout(() => boot.remove(), 800);
  };
  const skip = () => { skipped = true; finish(); };
  addEventListener("keydown", skip, { once: true });
  boot.addEventListener("click", skip, { once: true });

  if (reduceMotion) { finish(); return; }

  const name = () => document.getElementById("brand-name").textContent || "JARVIS";
  const line = (html) => { log.innerHTML += html + "\n"; };
  const status = (ok, okText, waitText) =>
    ok ? `<span class="ok">${okText}</span>` : `<span class="wait">${waitText}</span>`;

  (async () => {
    line(`<b>${name()} // SISTEMA PESSOAL</b>`);
    await sleep(260); if (skipped) return;
    line("> a iniciar interface holográfica ........ <span class=\"ok\">OK</span>");
    await sleep(320); if (skipped) return;
    const { live } = hud;
    line(`> ponte local ............................ ${status(hud.demo || live.bridge, "OK", "A AGUARDAR")}`);
    await sleep(340); if (skipped) return;
    line(`> ligação ao assistente .................. ${status(hud.demo || live.linked, "OK", "A AGUARDAR")}`);
    await sleep(380); if (skipped) return;
    line(`> sensores do sistema .................... ${status(sysReady > 0, `OK · ${sysReady || 0} núcleos`, "A AGUARDAR")}`);
    await sleep(340); if (skipped) return;
    const state = (document.getElementById("chip-label").textContent || "").toUpperCase();
    line(hud.demo ? "> modo demonstração" : `> estado do assistente ................... <span class="ok">${state}</span>`);
    await sleep(520); if (skipped) return;
    finish();
  })();
}
