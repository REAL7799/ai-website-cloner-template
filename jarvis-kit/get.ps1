# Jarvis Kit - one-line Windows install.
#   irm https://raw.githubusercontent.com/REAL7799/ai-website-cloner-template/claude/trusting-hypatia-mx8m91/jarvis-kit/get.ps1 | iex
#
# Downloads the kit into %USERPROFILE%\jarvis-kit (replacing an older copy of
# the kit only; Jarvis' own data lives elsewhere) and runs install-windows.ps1.

$ErrorActionPreference = "Stop"
$Repo   = if ($env:JARVIS_KIT_REPO)   { $env:JARVIS_KIT_REPO }   else { "REAL7799/ai-website-cloner-template" }
$Branch = if ($env:JARVIS_KIT_BRANCH) { $env:JARVIS_KIT_BRANCH } else { "claude/trusting-hypatia-mx8m91" }
$Dest   = Join-Path $env:USERPROFILE "jarvis-kit"

Write-Host "`n==> A descarregar o Jarvis Kit ($Branch)" -ForegroundColor Cyan
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$Tmp = Join-Path ([IO.Path]::GetTempPath()) ("jarvis-kit-" + [Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $Tmp | Out-Null
try {
  $Zip = Join-Path $Tmp "kit.zip"
  Invoke-WebRequest -UseBasicParsing "https://github.com/$Repo/archive/refs/heads/$Branch.zip" -OutFile $Zip
  Expand-Archive -Path $Zip -DestinationPath $Tmp -Force
  $Src = Get-ChildItem -Path $Tmp -Directory -Recurse -Filter "jarvis-kit" | Select-Object -First 1
  if (-not $Src) { throw "A pasta jarvis-kit nao foi encontrada no download." }
  # An older HUD bridge keeps the kit folder in use, and Windows refuses to delete a
  # folder in use; stop it first (it is restarted by the installer).
  try {
    Get-CimInstance Win32_Process -ErrorAction Stop |
      Where-Object { $_.CommandLine -and $_.CommandLine -like "*face_bridge.py*" } |
      ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
  } catch { }
  Start-Sleep -Milliseconds 700
  $replaced = $false
  if (Test-Path $Dest) {
    try { Remove-Item -Recurse -Force $Dest -ErrorAction Stop }
    catch { Write-Host "A pasta antiga ainda esta em uso; a atualizar os ficheiros por cima." -ForegroundColor Yellow }
  }
  if (Test-Path $Dest) {
    Copy-Item -Path (Join-Path $Src.FullName "*") -Destination $Dest -Recurse -Force
  } else {
    Move-Item -Path $Src.FullName -Destination $Dest
  }
} finally {
  Remove-Item -Recurse -Force $Tmp -ErrorAction SilentlyContinue
}
$Version = (Get-Content (Join-Path $Dest "VERSION") -ErrorAction SilentlyContinue | Select-Object -First 1)
Write-Host "Kit guardado em $Dest (versao $Version)"

& powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $Dest "install-windows.ps1")
