"""Set up an ElevenLabs voice for Personal Jarvis in one step.

Asks for the API key (typed hidden, never shown or written to a file), checks
it against ElevenLabs together with the voice ID, stores the key exactly where
the app itself stores it (the OS credential manager, via Jarvis' own
``set_secret``), then switches Jarvis' voice to that ElevenLabs voice.

    python voz_elevenlabs.py                 asks for the key, then lists your voices to pick from
    python voz_elevenlabs.py --voice <id>    asks only for the key

Run it with Jarvis' own Python; restart Jarvis afterwards.
"""

from __future__ import annotations

import argparse
import getpass
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
API = "https://api.elevenlabs.io/v1"


def jarvis_home() -> Path:
    env = os.environ.get("JARVIS_INSTALL_DIR", "").strip()
    return Path(env) if env else Path.home() / ".personal-jarvis"


def check_voice(key: str, voice_id: str) -> tuple[bool, str]:
    """Ask ElevenLabs for the voice with this key: proves both at once."""
    req = urllib.request.Request(f"{API}/voices/{voice_id}", headers={"xi-api-key": key})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read() or b"{}")
            return True, str(data.get("name") or voice_id)
    except urllib.error.HTTPError as exc:
        if exc.code == 401:
            return False, "a chave foi recusada (401). Confirma que copiaste a chave inteira, ou dá-lhe a permissão 'Voices: Read'."
        if exc.code in (400, 404):
            return False, ("a chave funciona, mas esse Voice ID não existe nesta conta. Corre o script outra vez "
                           "e escolhe a voz pelo número na lista. Se criaste a voz no Voice Design, guarda-a "
                           "primeiro na biblioteca ('Save voice').")
        return False, f"o ElevenLabs respondeu com erro {exc.code}."
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        return False, f"sem ligação ao ElevenLabs ({exc})."


# Your own voices first (designed, cloned, professional), then the stock ones.
_CATEGORY_ORDER = {"generated": 0, "cloned": 0, "professional": 0, "premade": 1}
_CATEGORY_LABEL = {"generated": "criada por ti", "cloned": "clonada", "professional": "profissional", "premade": "do ElevenLabs"}


def list_voices(key: str) -> list[dict]:
    """The voices this account can actually use, own voices first."""
    req = urllib.request.Request(f"{API}/voices", headers={"xi-api-key": key})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            voices = json.loads(resp.read() or b"{}").get("voices", [])
    except (urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError):
        return []
    voices.sort(key=lambda v: (_CATEGORY_ORDER.get(v.get("category"), 2), str(v.get("name", "")).lower()))
    return voices


def pick_voice(key: str) -> str:
    """Show the account's voices and let the user choose one by number."""
    voices = list_voices(key)
    if not voices:
        return input("Não consegui listar as tuas vozes. Cola o Voice ID: ").strip()
    print("\nVozes disponíveis na tua conta:")
    for i, v in enumerate(voices, 1):
        label = _CATEGORY_LABEL.get(v.get("category"), v.get("category") or "")
        print(f"  {i:>2}) {v.get('name', '?')}  ({label})")
    print("Não vês a voz que criaste? No Voice Design tens de a guardar na biblioteca ('Save voice').")
    choice = input("Escreve o número da voz (ou cola um Voice ID): ").strip()
    if choice.isdigit() and 1 <= int(choice) <= len(voices):
        chosen = voices[int(choice) - 1]
        print(f"Escolhida: {chosen.get('name')}")
        return str(chosen.get("voice_id", ""))
    return choice


def store_key(key: str) -> bool:
    home = jarvis_home()
    sys.path.insert(0, str(home))
    try:
        from jarvis.core.config import set_secret
    except Exception as exc:  # noqa: BLE001
        print(f"Não consegui carregar o Jarvis em {home}: {exc}")
        return False
    return bool(set_secret("elevenlabs_api_key", key))


def main() -> int:
    ap = argparse.ArgumentParser(description="Voz ElevenLabs para o Personal Jarvis")
    ap.add_argument("--voice", help="Voice ID do ElevenLabs")
    args = ap.parse_args()

    print("Chave do ElevenLabs: em elevenlabs.io > o teu perfil > API Keys.")
    key = getpass.getpass("Cola a chave e carrega em Enter (não aparece no ecrã): ").strip()
    if not key:
        print("Nenhuma chave introduzida; nada foi alterado.")
        return 1
    voice = (args.voice or pick_voice(key)).strip()
    if not voice:
        print("Nenhum Voice ID introduzido; nada foi alterado.")
        return 1

    ok, info = check_voice(key, voice)
    if ok:
        print(f"Chave e voz confirmadas: \"{info}\".")
    elif info.startswith("sem ligação"):
        # Only an unreachable server is uncertain; a refused key or unknown voice is not.
        if input(f"Não consegui confirmar: {info} Guardar mesmo assim? (s/n) ").strip().lower() != "s":
            print("Nada foi alterado.")
            return 1
    else:
        print(f"Não ativei a voz: {info}")
        return 1

    if not store_key(key):
        print("Não consegui guardar a chave no gestor de credenciais; nada mais foi alterado.")
        return 1
    print("Chave guardada no gestor de credenciais do sistema (o mesmo sítio que a app usa).")

    result = subprocess.run(
        [sys.executable, str(HERE / "configure_jarvis.py"), "--tts", "elevenlabs", "--voice", voice],
        check=False,
    )
    if result.returncode != 0:
        return result.returncode
    print("\nPronto. Fecha e volta a abrir o Personal Jarvis para ouvires a nova voz.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
