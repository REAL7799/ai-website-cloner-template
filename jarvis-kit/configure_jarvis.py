"""Apply the Jarvis Kit persona and voice to a Personal Jarvis install.

Edits ``jarvis.toml`` in place with tomlkit (comments and the app's own
settings are preserved), after writing a timestamped backup. Run it with
Jarvis' own Python so tomlkit is available, while the app is closed:

    ~/.personal-jarvis/.venv/bin/python configure_jarvis.py
    %USERPROFILE%\\.personal-jarvis\\.venv\\Scripts\\python.exe configure_jarvis.py

What it sets (everything else stays as the app wrote it):
    [trigger.wake_word] phrase   -> kept if already set (the assistant's name, e.g.
                                    "Medusa", derives from it); "Hey Jarvis" only on
                                    a fresh install, or whatever --wake says
    [stt] provider / language     -> Gemini speech recognition, "pt" hint
    [brain] reply_language        -> "auto" (Jarvis has no Portuguese pin; a de/en/es
                                    pin would override Portuguese, auto mirrors it)
    [tts] provider / voice        -> Gemini "Charon" (deep, calm) or ElevenLabs

One free Gemini key therefore covers both hearing (STT) and speaking (TTS).
A Claude/Anthropic key alone cannot: Anthropic has no speech models.
    [ui] orb_style                -> unchanged unless --overlay is given

API keys are NOT handled here: add them in the app (Settings > API Keys),
which stores them in the OS credential manager.
"""

from __future__ import annotations

import argparse
import os
import shutil
import sys
import time
from pathlib import Path

try:
    import tomlkit
    from tomlkit.items import Table
except ImportError:
    sys.exit(
        "configure_jarvis: tomlkit is missing. Run this with Personal Jarvis' own Python\n"
        "(~/.personal-jarvis/.venv) or: python -m pip install tomlkit"
    )

GEMINI_VOICES = {
    # A short, opinionated shortlist of the Gemini prebuilt voices for a butler-style assistant.
    "Charon": "grave, calmo e formal (recomendado)",
    "Orus": "firme e confiante",
    "Iapetus": "claro e articulado",
    "Algenib": "rouco, com textura (estilo vilão)",
    "Kore": "voz feminina firme",
    "Aoede": "voz feminina leve",
}
ELEVENLABS_DEFAULT_VOICE = "onwK4e9ZLuTAKqWW03F9"  # "Daniel" — British, authoritative
OVERLAYS = ("jarvis_bar", "voice_orb", "mascot", "none")


def default_config_path() -> Path:
    override = os.environ.get("JARVIS_CONFIG", "").strip()
    if override:
        return Path(override)
    install = os.environ.get("JARVIS_INSTALL_DIR", "").strip()
    base = Path(install) if install else Path.home() / ".personal-jarvis"
    return base / "jarvis.toml"


def table(doc: tomlkit.TOMLDocument | Table, dotted: str) -> Table:
    """Return the (possibly nested) table, creating missing levels."""
    node = doc
    for key in dotted.split("."):
        if key not in node:
            node[key] = tomlkit.table()
        node = node[key]
    return node


def main() -> int:
    ap = argparse.ArgumentParser(description="Apply the Jarvis Kit persona and voice")
    ap.add_argument("--config", type=Path, default=default_config_path())
    ap.add_argument("--wake", help='wake phrase (default: keep the current one, or "Hey Jarvis" if none)')
    ap.add_argument("--tts", choices=("gemini", "elevenlabs"),
                    help="voice provider (default: keep the current voice; Gemini on a fresh install)")
    ap.add_argument("--voice", help="Gemini voice name or ElevenLabs voice id (default: keep the current one)")
    ap.add_argument("--stt-language", default="pt", help='speech recognition hint (default: "pt")')
    ap.add_argument("--keep-stt", action="store_true", help="leave the speech-recognition provider as it is")
    ap.add_argument("--overlay", choices=OVERLAYS, help="Jarvis' own on-screen overlay")
    ap.add_argument("--dry-run", action="store_true", help="print the result, write nothing")
    ap.add_argument("--list-voices", action="store_true")
    args = ap.parse_args()

    if args.list_voices:
        for name, desc in GEMINI_VOICES.items():
            print(f"  {name:<10} {desc}")
        print("  (ElevenLabs: use --tts elevenlabs --voice <voice_id>)")
        return 0

    path: Path = args.config
    doc = tomlkit.parse(path.read_text(encoding="utf-8-sig")) if path.exists() else tomlkit.document()

    wake_tbl = table(doc, "trigger.wake_word")
    current_wake = str(wake_tbl.get("phrase", "") or "").strip()
    wake = args.wake or current_wake or "Hey Jarvis"
    wake_tbl["phrase"] = wake

    # Voice: an explicit --tts/--voice wins; otherwise a voice the user already
    # chose (e.g. their own ElevenLabs voice) is kept, and only a fresh install
    # gets the kit default (Gemini "Charon").
    tts = table(doc, "tts")
    current_provider = str(tts.get("provider", "") or "")
    keep_voice = args.tts is None and args.voice is None and current_provider != ""
    if args.tts:
        tts_choice = args.tts
    elif args.voice and args.voice not in GEMINI_VOICES and current_provider == "elevenlabs":
        tts_choice = "elevenlabs"  # a new ElevenLabs voice ID for the current provider
    else:
        tts_choice = "gemini"      # Gemini voice names ("Charon", "Algenib", ...) always mean Gemini

    stt = table(doc, "stt")
    stt["language"] = args.stt_language
    if not keep_voice and tts_choice == "gemini" and not args.keep_stt:
        # The same free Gemini key then serves both directions of the voice.
        stt["provider"] = "gemini-api"
        stt["provider_user_selected"] = True

    # Portuguese needs "auto": a de/en/es pin would override the user's language
    # (see portugues.py for why Jarvis cannot pin Portuguese itself).
    brain = table(doc, "brain")
    previous_pin = str(brain.get("reply_language", "auto"))
    brain["reply_language"] = "auto"
    if previous_pin not in ("auto", ""):
        print(f"Aviso: a língua de resposta estava fixada em '{previous_pin}'; passou para 'auto' para o português funcionar.")

    tts["language_code"] = "auto"
    if keep_voice:
        voice = str(tts.get("voice_de", "") or "(atual)")
    elif tts_choice == "gemini":
        voice = args.voice or "Charon"
        if voice not in GEMINI_VOICES:
            print(f"Aviso: '{voice}' não está na lista curta; o Jarvis usa Charon se o nome for inválido.")
        tts["provider"] = "gemini-flash-tts"
    else:
        voice = args.voice or ELEVENLABS_DEFAULT_VOICE
        tts["provider"] = "elevenlabs"
        tts["stability"] = 0.55
        tts["similarity_boost"] = 0.8
    if not keep_voice:
        tts["voice_de"] = voice
        tts["voice_en"] = voice

    if args.overlay:
        table(doc, "ui")["orb_style"] = args.overlay

    rendered = tomlkit.dumps(doc)
    if args.dry_run:
        print(rendered)
        return 0

    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        backup = path.with_name(f"{path.name}.bak-{time.strftime('%Y%m%d-%H%M%S')}")
        shutil.copy2(path, backup)
        print(f"Cópia de segurança: {backup}")
    tmp = path.with_suffix(".toml.tmp")
    tmp.write_text(rendered, encoding="utf-8")
    os.replace(tmp, path)  # atomic: Jarvis never reads a half-written file

    print(f"Configuração aplicada em {path}")
    print(f"  palavra de ativação: {wake}" + ("  (mantida)" if wake == current_wake else ""))
    print(f"  reconhecimento de voz: {stt.get('provider', '(sem alteração)')}")
    print(f"  voz: {tts.get('provider', '?')} / {voice}" + ("  (mantida)" if keep_voice else ""))
    print("Reinicia o Personal Jarvis para aplicar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
