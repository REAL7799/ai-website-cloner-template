"""Make Personal Jarvis reply and speak in Portuguese.

Why this exists: Jarvis' language machinery only knows German, English and
Spanish. Its word-list detector scores Portuguese as Spanish (shared words like
"como", "está", "para"), so a Portuguese speaker gets a MANDATORY "reply in
Spanish" directive and a Spanish TTS pin; short or informal Portuguese scores
as English instead.

Teaching all ~70 language-keyed tables in Jarvis a fourth language is an
upstream change. This patch is deliberately narrow and leaves those tables
alone:

  1. jarvis/core/turn_language.py — a Portuguese guard. Portuguese text is
     never classified as de/en/es: the turn resolves exactly like an
     undetectable one, so the brain gets its "mirror the user's language"
     directive (-> Portuguese reply) and the output-language validator never
     blocks a Portuguese answer as a "mismatch".
  2. jarvis/plugins/tts/gemini_flash_tts.py — Portuguese sentences are sent
     without a foreign language pin, so Gemini speaks them as Portuguese.
     Set JARVIS_KIT_PT_LOCALE (e.g. "pt-BR") to pin an explicit locale.

Known limit: a few canned phrases that Jarvis builds itself (short
acknowledgements, error messages) stay in English, since those tables have no
Portuguese entries.

Every patched file is backed up once as <file>.kit-orig. The patch is
idempotent, verifies itself and rolls back on any failure. Updating Jarvis
(re-running its installer) restores the original files; just run this again.

    python portugues.py            apply (default)
    python portugues.py --check    report status only
    python portugues.py --undo     restore the original files
Run it with Jarvis' own Python while the app is closed.
"""

from __future__ import annotations

import argparse
import importlib.util
import os
import py_compile
import shutil
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path

MARK = "JARVIS-KIT-PT"


@dataclass(frozen=True)
class Edit:
    anchor: str       # must occur exactly once in the original file
    replacement: str  # replaces the anchor; must contain MARK


@dataclass(frozen=True)
class FilePatch:
    rel: str
    edits: tuple[Edit, ...]


PT_GUARD = '''
# --- {mark}: Portuguese guard (added by Jarvis Kit, see portugues.py) ---------
# Portuguese shares function words with Spanish, so the de/en/es scorer below
# would label it Spanish (or English). Portuguese text is reported as
# "unknown" instead, which makes every layer treat the turn as undetectable:
# the brain mirrors the user's language and the output validator stays
# indeterminate instead of blocking a Portuguese reply. Tokens are distinctly
# Portuguese — none collide with the Spanish, English or German sets.
_PT_TOKENS: frozenset[str] = frozenset("""
    não nao você voce vocês voces obrigado obrigada olá ola oi hoje amanhã amanha
    agora meu minha meus minhas teu tua teus tuas isso isto aquilo também tambem
    muito muita muitos muitas bem sim pode podes posso quero queres preciso
    diz diga dizer faz faça faca fazer ao às uma é são sao estou eu ela nós
    lembra lembres pra tá né coisa fala fale falar onde quando porquê
    então entao ainda já depois mãe pai pesquisa pesquisar mostra
    ouvir ouve vou vai estás estão tens tenho temos noite tudo
    em com num numa pelo pela pelos pelas dele dela deles delas seu sua seus suas
""".split())
_PT_SCRIPT_RE = re.compile(r"[ãõçâêôÃÕÇÂÊÔ]")


def looks_portuguese(text: str) -> bool:
    """True when *text* carries clear Portuguese evidence over de/en/es."""
    t = text or ""
    tokens = {{tok.lower() for tok in _TOKEN_RE.findall(t)}}
    pt = len(tokens & _PT_TOKENS) + (2 if _PT_SCRIPT_RE.search(t) else 0)
    if pt < 2:
        return False
    others = max(len(tokens & vocab) for _code, vocab in _SETS)
    return pt > others
# --- end {mark} ----------------------------------------------------------------
'''.format(mark=MARK)

PATCHES: tuple[FilePatch, ...] = (
    FilePatch(
        "jarvis/core/turn_language.py",
        (
            # Helper right after the de/en/es tag table (needs _TOKEN_RE, _SETS).
            Edit(
                anchor='    "espanol": "es", "español": "es", "castellano": "es",\n}\n',
                replacement='    "espanol": "es", "español": "es", "castellano": "es",\n}\n' + PT_GUARD,
            ),
            # Input detection: Portuguese is never de/en/es.
            Edit(
                anchor='    t = (text or "").strip()\n    if not t:\n        return "unknown"\n'
                       '    tokens = {tok.lower() for tok in _TOKEN_RE.findall(t)}\n',
                replacement='    t = (text or "").strip()\n    if not t:\n        return "unknown"\n'
                            f'    if looks_portuguese(t):  # {MARK}\n        return "unknown"\n'
                            '    tokens = {tok.lower() for tok in _TOKEN_RE.findall(t)}\n',
            ),
            # Output validation: never call a Portuguese answer a mismatch.
            Edit(
                anchor='    """Return de/en/es only when multiple independent prose signals agree."""\n'
                       '    if len(tokens) < 4:\n',
                replacement='    """Return de/en/es only when multiple independent prose signals agree."""\n'
                            f'    if looks_portuguese(text):  # {MARK}\n        return "unknown"\n'
                            '    if len(tokens) < 4:\n',
            ),
            # Sticky conversation language must not drag a Portuguese turn
            # back into an earlier (mis)detected de/en/es conversation.
            Edit(
                anchor='    conv = str(conversation_language or "").strip().lower()\n'
                       '    conv = conv if conv in _REPLY_PINS else ""\n',
                replacement=f'    if looks_portuguese(text):  # {MARK}\n'
                            '        return resolve_turn_language(stt_language, text, default=default)\n'
                            '    conv = str(conversation_language or "").strip().lower()\n'
                            '    conv = conv if conv in _REPLY_PINS else ""\n',
            ),
        ),
    ),
    FilePatch(
        "jarvis/plugins/tts/gemini_flash_tts.py",
        (
            Edit(
                anchor="                config=self._build_config(voice, language_code),\n",
                replacement=f"                config=self._build_config(voice, _kit_pt_language(text, language_code)),  # {MARK}\n",
            ),
            Edit(
                anchor="            config=self._build_config(voice, language_code),\n",
                replacement=f"            config=self._build_config(voice, _kit_pt_language(text, language_code)),  # {MARK}\n",
            ),
            Edit(
                anchor="def _sapi5_synthesize(",
                replacement=f'''def _kit_pt_language(text: str, language_code: str | None) -> str | None:
    """{MARK}: drop a foreign (de/en/es) pin for a Portuguese sentence.

    Without a pin Gemini detects the language from the text itself, so the
    sentence is spoken as Portuguese. JARVIS_KIT_PT_LOCALE pins one instead.
    """
    try:
        from jarvis.core.turn_language import looks_portuguese
    except ImportError:
        return language_code
    if looks_portuguese(text):
        return os.environ.get("JARVIS_KIT_PT_LOCALE") or None
    return language_code


def _sapi5_synthesize(''',
            ),
        ),
    ),
)

SELF_TEST = r'''
import importlib.util, sys
spec = importlib.util.spec_from_file_location("kit_tl", sys.argv[1])
tl = importlib.util.module_from_spec(spec); sys.modules["kit_tl"] = tl; spec.loader.exec_module(tl)
r = tl.resolve_output_language
pt = ["Olá Medusa, como está o meu dia hoje?", "Abre o navegador e pesquisa o tempo em Maputo",
      "Podes ler os meus emails e dizer-me o que é importante?", "Você pode abrir o YouTube pra mim?"]
for s in pt:
    assert tl.detect_text_language(s) == "unknown", s
    assert r("auto", "pt", s, default="unknown") == "unknown", s
    assert r("auto", "pt", s, default="unknown", conversation_language="es") == "unknown", s
    assert not tl.validate_output_language(s + " Claro, já trato disso agora mesmo.", resolved_language="en").should_block, s
keep = {"Hola, ¿qué tiempo hace hoy en Madrid?": "es", "Puedes abrir el navegador por favor": "es",
        "What is the weather like today?": "en", "Can you open my email please": "en",
        "Wie ist das Wetter heute?": "de", "Kannst du bitte den Browser öffnen": "de"}
for s, code in keep.items():
    assert tl.detect_text_language(s) == code, (s, tl.detect_text_language(s))
print("ok")
'''


def jarvis_home(arg: str | None) -> Path:
    if arg:
        return Path(arg)
    env = os.environ.get("JARVIS_INSTALL_DIR", "").strip()
    return Path(env) if env else Path.home() / ".personal-jarvis"


def status(path: Path) -> str:
    if not path.exists():
        return "missing"
    return "patched" if MARK in path.read_text(encoding="utf-8") else "original"


def apply_patch(fp: FilePatch, path: Path) -> None:
    src = path.read_text(encoding="utf-8")
    for e in fp.edits:
        if src.count(e.anchor) != 1:
            raise RuntimeError(
                f"{fp.rel}: ponto de inserção não encontrado (o Jarvis mudou nesta versão)."
            )
        src = src.replace(e.anchor, e.replacement)
    if fp.rel.endswith("gemini_flash_tts.py") and "\nimport os\n" not in src:
        src = src.replace("from __future__ import annotations\n", "from __future__ import annotations\n\nimport os\n", 1)
    path.write_text(src, encoding="utf-8")
    py_compile.compile(str(path), doraise=True)


def restore(home: Path) -> list[str]:
    restored = []
    for fp in PATCHES:
        path = home / fp.rel
        orig = path.with_name(path.name + ".kit-orig")
        if orig.exists():
            shutil.copy2(orig, path)
            orig.unlink()
            restored.append(fp.rel)
    return restored


def self_test(home: Path) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as fh:
        fh.write(SELF_TEST)
        script = fh.name
    try:
        out = subprocess.run(
            [sys.executable, script, str(home / PATCHES[0].rel)],
            capture_output=True, text=True, timeout=60,
        )
    finally:
        os.unlink(script)
    if out.returncode != 0 or out.stdout.strip() != "ok":
        raise RuntimeError("auto-teste falhou:\n" + (out.stderr or out.stdout)[-1500:])


def main() -> int:
    ap = argparse.ArgumentParser(description="Português para o Personal Jarvis")
    ap.add_argument("--jarvis-home", help="pasta do Jarvis (por omissão ~/.personal-jarvis)")
    mode = ap.add_mutually_exclusive_group()
    mode.add_argument("--check", action="store_true")
    mode.add_argument("--undo", action="store_true")
    args = ap.parse_args()
    home = jarvis_home(args.jarvis_home)

    if not (home / "jarvis").is_dir():
        print(f"Não encontrei o Jarvis em {home}.")
        return 1

    if args.check:
        for fp in PATCHES:
            print(f"  {status(home / fp.rel):9} {fp.rel}")
        return 0

    if args.undo:
        done = restore(home)
        print("Ficheiros originais repostos: " + (", ".join(done) if done else "nenhum (já estavam originais)"))
        return 0

    states = {fp.rel: status(home / fp.rel) for fp in PATCHES}
    if "missing" in states.values():
        print("Esta versão do Jarvis não tem os ficheiros esperados; nada foi alterado.")
        return 1
    if all(s == "patched" for s in states.values()):
        self_test(home)
        print("Português já está ativo (verificado).")
        return 0

    try:
        for fp in PATCHES:
            path = home / fp.rel
            if states[fp.rel] == "patched":
                continue
            orig = path.with_name(path.name + ".kit-orig")
            if not orig.exists():
                shutil.copy2(path, orig)
            apply_patch(fp, path)
        self_test(home)
    except Exception as exc:  # noqa: BLE001 — any failure rolls everything back
        restore(home)
        print(f"Não foi possível ativar o português: {exc}\nO Jarvis ficou exatamente como estava.")
        return 1

    print("Português ativado:")
    print("  - o Jarvis já não confunde português com espanhol ou inglês;")
    print("  - responde na tua língua e a voz Gemini fala português.")
    print("Reinicia o Personal Jarvis para aplicar. Depois de atualizar o Jarvis, corre isto de novo.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
