#!/usr/bin/env bash
# Jarvis Kit — macOS / Linux installer.
# 1) Runs the official Personal Jarvis installer (unchanged, from its GitHub repo)
# 2) Applies the kit's persona/voice (wake phrase "Hey Jarvis", Portuguese, voice Charon)
#
# Usage, inside the jarvis-kit folder:
#   ./install-mac-linux.sh                 # full install
#   VOICE=Orus ./install-mac-linux.sh      # another voice (see: configure_jarvis.py --list-voices)
#   SKIP_JARVIS_INSTALL=1 ./install-mac-linux.sh
set -euo pipefail

KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JHOME="${JARVIS_INSTALL_DIR:-$HOME/.personal-jarvis}"
PY="$JHOME/.venv/bin/python"
VOICE="${VOICE:-Charon}"
WAKE="${WAKE:-}"   # empty = keep the current wake phrase / assistant name

step() { printf '\n\033[36m==> %s\033[0m\n' "$1"; }

if [ -x "$PY" ] && [ -z "${REINSTALL:-}" ]; then
  step "Personal Jarvis já está instalado — a saltar o instalador oficial"
elif [ -z "${SKIP_JARVIS_INSTALL:-}" ]; then
  step "A instalar o Personal Jarvis (instalador oficial)"
  curl -fsSL https://raw.githubusercontent.com/PersonalJarvis/PersonalJarvis/main/install/install.sh | bash
fi

if [ ! -x "$PY" ]; then
  echo "Não encontrei $PY — a instalação do Jarvis não terminou. Corre este script de novo." >&2
  exit 1
fi

step "A fechar o Jarvis para aplicar a configuração"
read -r -p "Se a app do Jarvis estiver aberta, fecha-a e carrega em Enter. " _ </dev/tty || true

step "A aplicar persona e voz"
if [ -n "$WAKE" ]; then
  "$PY" "$KIT/configure_jarvis.py" --wake "$WAKE" --voice "$VOICE"
else
  "$PY" "$KIT/configure_jarvis.py" --voice "$VOICE"
fi

step "A ativar o português"
"$PY" "$KIT/portugues.py" || echo "O português não foi ativado; o resto da instalação continua."
chmod +x "$KIT/start-face.sh"

step "Pronto"
cat <<EOF
1. Abre o Personal Jarvis.
2. Settings > API Keys: cola a tua chave Gemini (grátis em https://aistudio.google.com/apikey).
3. Corre:  $KIT/start-face.sh
4. Diz a tua palavra de ativação — o orbe acorda, ouve-te e fala contigo.
EOF
