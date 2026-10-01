# Jarvis Kit - Windows installer.
# 1) Runs the official Personal Jarvis installer (unchanged, from its GitHub repo)
# 2) Applies the kit's persona/voice (wake phrase "Hey Jarvis", Portuguese, voice Charon)
# 3) Creates a "Jarvis Face" shortcut on the desktop
#
# Usage (PowerShell, inside the jarvis-kit folder):
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1 -Voice Orus
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1 -Reinstall   # force the official installer

param(
  [string]$Voice = "Charon",
  [string]$Wake = "",            # empty = keep the current wake phrase / assistant name
  [switch]$SkipJarvisInstall,
  [switch]$Reinstall
)

$ErrorActionPreference = "Stop"
$Kit = Split-Path -Parent $MyInvocation.MyCommand.Path
$JHome = if ($env:JARVIS_INSTALL_DIR) { $env:JARVIS_INSTALL_DIR } else { Join-Path $env:USERPROFILE ".personal-jarvis" }
$Py = Join-Path $JHome ".venv\Scripts\python.exe"

function Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }

if ((Test-Path $Py) -and -not $Reinstall) {
  Step "Personal Jarvis ja esta instalado - a saltar o instalador oficial"
} elseif (-not $SkipJarvisInstall) {
  Step "A instalar o Personal Jarvis (instalador oficial)"
  # Child process: the official script may call `exit`, which must not end this one.
  powershell -NoProfile -ExecutionPolicy Bypass -Command "irm https://raw.githubusercontent.com/PersonalJarvis/PersonalJarvis/main/install/install.ps1 | iex"
}

if (-not (Test-Path $Py)) {
  Write-Host "Nao encontrei $Py - a instalacao do Jarvis nao terminou. Corre este script de novo." -ForegroundColor Red
  exit 1
}

Step "A fechar o Jarvis para aplicar a configuracao"
Write-Host "Se a app do Jarvis estiver aberta, fecha-a (icone na bandeja > Sair) e carrega em Enter."
Read-Host | Out-Null

Step "A aplicar persona e voz"
$CfgArgs = @((Join-Path $Kit "configure_jarvis.py"), "--voice", $Voice)
if ($Wake) { $CfgArgs += @("--wake", $Wake) }
& $Py @CfgArgs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Step "A criar o atalho 'Jarvis Face' no ambiente de trabalho"
$Desktop = [Environment]::GetFolderPath("Desktop")
$Shell = New-Object -ComObject WScript.Shell
$Lnk = $Shell.CreateShortcut((Join-Path $Desktop "Jarvis Face.lnk"))
$Lnk.TargetPath = Join-Path $Kit "start-face.bat"
$Lnk.WorkingDirectory = $Kit
$Lnk.WindowStyle = 7  # minimized: the console flashes away, the face window stays
$Lnk.Description = "Orbe de energia do Personal Jarvis"
$Lnk.Save()

Step "Pronto"
Write-Host @"
1. Abre o Personal Jarvis (menu Iniciar).
2. Settings > API Keys: cola a tua chave Gemini (gratis em https://aistudio.google.com/apikey).
3. Duplo clique em 'Jarvis Face' no ambiente de trabalho.
4. Diz a tua palavra de ativacao - o orbe acorda, ouve-te e fala contigo.
"@
