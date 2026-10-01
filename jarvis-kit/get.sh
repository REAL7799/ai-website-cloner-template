#!/usr/bin/env bash
# Jarvis Kit — one-line macOS / Linux install.
#   curl -fsSL https://raw.githubusercontent.com/REAL7799/ai-website-cloner-template/claude/trusting-hypatia-mx8m91/jarvis-kit/get.sh | bash
#
# Downloads the kit into ~/jarvis-kit (replacing an older copy of the kit only;
# Jarvis' own data lives elsewhere) and runs install-mac-linux.sh.
set -euo pipefail

REPO="${JARVIS_KIT_REPO:-REAL7799/ai-website-cloner-template}"
BRANCH="${JARVIS_KIT_BRANCH:-claude/trusting-hypatia-mx8m91}"
DEST="$HOME/jarvis-kit"

printf '\n\033[36m==> A descarregar o Jarvis Kit (%s)\033[0m\n' "$BRANCH"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
curl -fsSL "https://github.com/$REPO/archive/refs/heads/$BRANCH.tar.gz" | tar -xz -C "$TMP"
SRC="$(find "$TMP" -maxdepth 2 -type d -name jarvis-kit | head -n 1)"
if [ -z "$SRC" ]; then
  echo "A pasta jarvis-kit não foi encontrada no download." >&2
  exit 1
fi
rm -rf "$DEST"
mv "$SRC" "$DEST"
chmod +x "$DEST"/*.sh
echo "Kit guardado em $DEST"

# stdin is the curl pipe; the installer asks questions, so give it the terminal.
bash "$DEST/install-mac-linux.sh" </dev/tty
