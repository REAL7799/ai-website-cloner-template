# Jarvis Kit - diagnostic. Read-only: checks each piece and says what to do.
#   irm https://raw.githubusercontent.com/REAL7799/ai-website-cloner-template/claude/trusting-hypatia-mx8m91/jarvis-kit/diagnostico.ps1 | iex

$ErrorActionPreference = "Continue"
$Repo   = if ($env:JARVIS_KIT_REPO)   { $env:JARVIS_KIT_REPO }   else { "REAL7799/ai-website-cloner-template" }
$Branch = if ($env:JARVIS_KIT_BRANCH) { $env:JARVIS_KIT_BRANCH } else { "claude/trusting-hypatia-mx8m91" }
$Kit    = Join-Path $env:USERPROFILE "jarvis-kit"
$JHome  = if ($env:JARVIS_INSTALL_DIR) { $env:JARVIS_INSTALL_DIR } else { Join-Path $env:USERPROFILE ".personal-jarvis" }
$Py     = Join-Path $JHome ".venv\Scripts\python.exe"
$Fixes  = New-Object System.Collections.Generic.List[string]

function Ok($m)   { Write-Host "  [ OK ] $m" -ForegroundColor Green }
function Bad($m, $fix) { Write-Host "  [FALTA] $m" -ForegroundColor Red; if ($fix) { $Fixes.Add($fix) } }
function Info($m) { Write-Host "  [ -- ] $m" -ForegroundColor DarkGray }
function Get-Url($u) {
  try { return (Invoke-WebRequest -UseBasicParsing -TimeoutSec 3 $u).Content } catch { return $null }
}

Write-Host "`n==> Diagnostico do Jarvis Kit" -ForegroundColor Cyan

# 1. Kit files and version
$Latest = Get-Url "https://raw.githubusercontent.com/$Repo/$Branch/jarvis-kit/VERSION"
if ($Latest) { $Latest = $Latest.Trim() }
$Local = $null
if (Test-Path (Join-Path $Kit "VERSION")) { $Local = (Get-Content (Join-Path $Kit "VERSION") | Select-Object -First 1).Trim() }
if (-not (Test-Path $Kit)) {
  Bad "Pasta do kit ($Kit) nao existe" "Corre o comando de instalacao (get.ps1)."
} elseif (-not $Local) {
  Bad "Kit antigo (sem numero de versao, anterior ao HUD)" "Fecha a janela do orbe e corre o comando de instalacao outra vez."
} elseif ($Latest -and $Local -ne $Latest) {
  Bad "Kit desatualizado: tens $Local, a mais recente e $Latest" "Fecha a janela do orbe e corre o comando de instalacao outra vez."
} else {
  Ok "Kit atualizado (versao $Local)"
}

# 2. Personal Jarvis itself
if (Test-Path $Py) { Ok "Personal Jarvis instalado" } else { Bad "Personal Jarvis nao encontrado em $JHome" "Instala o Personal Jarvis (o comando de instalacao trata disso)." }
if (Get-Url "http://127.0.0.1:47821/api/health") { Ok "App do Jarvis aberta" } else { Bad "App do Jarvis fechada" "Abre o Personal Jarvis pelo menu Iniciar." }

# 3. HUD bridge and page
$Served = Get-Url "http://127.0.0.1:47900/version"
$Page   = Get-Url "http://127.0.0.1:47900/"
if (-not $Page) {
  Bad "Ponte do HUD parada" "Faz duplo clique no atalho 'Jarvis HUD' (ou reinicia o PC)."
} elseif ($Page -notmatch "Jarvis HUD") {
  Bad "A ponte esta a servir a versao antiga (orbe sem HUD)" "Fecha a janela do orbe e corre o comando de instalacao outra vez."
} else {
  Ok ("Ponte do HUD a correr" + $(if ($Served) { " (versao $($Served.Trim()))" } else { "" }))
}

# 4. Shortcuts
$Desktop = [Environment]::GetFolderPath("Desktop")
if (Test-Path (Join-Path $Desktop "Jarvis HUD.lnk")) { Ok "Atalho 'Jarvis HUD' no ambiente de trabalho" }
elseif (Test-Path (Join-Path $Desktop "Jarvis Face.lnk")) { Bad "So existe o atalho antigo 'Jarvis Face'" "Corre o comando de instalacao outra vez." }
else { Bad "Atalho 'Jarvis HUD' em falta" "Corre o comando de instalacao outra vez." }
if (Test-Path (Join-Path ([Environment]::GetFolderPath("Startup")) "Jarvis HUD (ponte).lnk")) { Ok "Ponte arranca com o Windows" } else { Info "Ponte nao arranca com o Windows (so precisas disto para o papel de parede)" }

# 5. Portuguese patch
if ((Test-Path $Py) -and (Test-Path (Join-Path $Kit "portugues.py"))) {
  $pt = & $Py (Join-Path $Kit "portugues.py") --check 2>&1 | Out-String
  if ($pt -match "original") { Bad "Portugues desativado (o Jarvis foi atualizado?)" "Corre o comando de instalacao outra vez." } elseif ($pt -match "patched") { Ok "Portugues ativo" } else { Info "Estado do portugues desconhecido" }
}

# 6. Animated wallpaper
$Lively = (Get-AppxPackage -Name "*Lively*" -ErrorAction SilentlyContinue) -or
          (Test-Path "$env:LOCALAPPDATA\Programs\Lively Wallpaper") -or (Test-Path "$env:ProgramFiles\Lively Wallpaper")
if ($Lively) { Ok "Lively Wallpaper instalado (adiciona o URL http://127.0.0.1:47900/?wallpaper)" }
else { Info "Lively Wallpaper nao instalado: o HUD so aparece no atalho, nao no ambiente de trabalho" }

Write-Host ""
if ($Fixes.Count -eq 0) {
  Write-Host "Tudo certo. Abre o atalho 'Jarvis HUD'." -ForegroundColor Green
} else {
  Write-Host "O que fazer:" -ForegroundColor Yellow
  $Fixes | Select-Object -Unique | ForEach-Object { Write-Host "  - $_" }
}
Write-Host "`nCopia este resultado e envia-o se precisares de ajuda.`n"
