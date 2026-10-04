#!/usr/bin/env bash
# Starts the Jarvis Face: the bridge in the background + a frameless browser window.
set -euo pipefail

KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JHOME="${JARVIS_INSTALL_DIR:-$HOME/.personal-jarvis}"
PY="$JHOME/.venv/bin/python"
URL="http://127.0.0.1:${JARVIS_FACE_PORT:-47900}/"
LOG="${TMPDIR:-/tmp}/jarvis-face.log"

if [ ! -x "$PY" ]; then
  echo "[Jarvis Face] Python do Personal Jarvis não encontrado em $JHOME/.venv."
  echo "Instala primeiro o Jarvis com ./install-mac-linux.sh"
  exit 1
fi

# Only one bridge: reuse it if the port already answers.
if ! curl -fsS -o /dev/null --max-time 1 "$URL" 2>/dev/null; then
  nohup "$PY" "$KIT/face/face_bridge.py" >"$LOG" 2>&1 &
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    curl -fsS -o /dev/null --max-time 1 "$URL" 2>/dev/null && break
    sleep 0.3
  done
fi

open_app_window() {
  case "$(uname -s)" in
    Darwin)
      for app in "Google Chrome" "Microsoft Edge" "Brave Browser"; do
        if [ -d "/Applications/$app.app" ]; then
          open -na "$app" --args --app="$URL" --start-maximized
          return
        fi
      done
      open "$URL" ;;
    *)
      for bin in google-chrome chromium chromium-browser microsoft-edge brave-browser; do
        if command -v "$bin" >/dev/null 2>&1; then
          "$bin" --app="$URL" --start-maximized >/dev/null 2>&1 &
          return
        fi
      done
      xdg-open "$URL" >/dev/null 2>&1 || echo "Abre no browser: $URL" ;;
  esac
}
open_app_window
echo "Jarvis Face: $URL   (registo: $LOG)"
