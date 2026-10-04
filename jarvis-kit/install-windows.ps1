# Jarvis Kit - Windows installer.
# 1) Runs the official Personal Jarvis installer (unchanged, from its GitHub repo)
# 2) Applies the kit's persona/voice (wake phrase "Hey Jarvis", Portuguese, voice Charon)
# 3) Creates a "Jarvis HUD" shortcut on the desktop and starts its bridge at login
#
# Usage (PowerShell, inside the jarvis-kit folder):
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1 -Voice Orus
#   powershell -ExecutionPolicy Bypass -File .\install-windows.ps1 -Reinstall   # force the official installer

param(
  [string]$Voice = "Charon",
  [string]$Wake = "",            # empty = keep the current wake phrase / assistant name
  [switch]$SkipJarvisInstall,
  [switch]$Reinstall,
  [switch]$NoAutostart          # do not start the HUD bridge with Windows
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

function Get-JarvisProcesses {
  # Every process started from Jarvis' own folder (its Python, its window, the orb bridge).
  $root = [IO.Path]::GetFullPath($JHome).TrimEnd('\') + '\'
  Get-CimInstance Win32_Process | Where-Object {
    ($_.ExecutablePath -and $_.ExecutablePath.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) -or
    ($_.CommandLine -and $_.CommandLine.IndexOf($root, [StringComparison]::OrdinalIgnoreCase) -ge 0)
  }
}

function Find-JarvisShortcut {
  $dirs = @([Environment]::GetFolderPath("Programs"), [Environment]::GetFolderPath("CommonPrograms"), [Environment]::GetFolderPath("Desktop"))
  foreach ($d in $dirs) {
    if ($d -and (Test-Path $d)) {
      $lnk = Get-ChildItem -Path $d -Recurse -Filter "*Jarvis*.lnk" -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notlike "*Face*" } | Select-Object -First 1
      if ($lnk) { return $lnk.FullName }
    }
  }
  return $null
}

Step "A fechar o Jarvis para aplicar a configuracao"
$WasRunning = $false
$Procs = @(Get-JarvisProcesses)
if ($Procs.Count -gt 0) {
  $WasRunning = $true
  # Main process = the one whose parent is not itself a Jarvis process; remember how to relaunch it.
  $ids = $Procs.ProcessId
  $Main = $Procs | Where-Object { $ids -notcontains $_.ParentProcessId } | Select-Object -First 1
  # 1) Ask politely: close the windows.
  foreach ($p in $Procs) {
    $gp = Get-Process -Id $p.ProcessId -ErrorAction SilentlyContinue
    if ($gp -and $gp.MainWindowHandle -ne 0) { [void]$gp.CloseMainWindow() }
  }
  for ($i = 0; $i -lt 10 -and @(Get-JarvisProcesses).Count -gt 0; $i++) { Start-Sleep -Milliseconds 500 }
  # 2) Whatever is still running (it may live on in the tray) is stopped.
  foreach ($p in @(Get-JarvisProcesses)) { Stop-Process -Id $p.ProcessId -Force -ErrorAction SilentlyContinue }
  Start-Sleep -Seconds 1
  if (@(Get-JarvisProcesses).Count -gt 0) {
    Write-Host "Nao consegui fechar o Jarvis sozinho. Reinicia o computador e corre o comando de novo." -ForegroundColor Red
    exit 1
  }
  Write-Host "Jarvis fechado."
} else {
  Write-Host "O Jarvis nao estava aberto."
}

Step "A aplicar persona e voz"
$CfgArgs = @((Join-Path $Kit "configure_jarvis.py"), "--voice", $Voice)
if ($Wake) { $CfgArgs += @("--wake", $Wake) }
& $Py @CfgArgs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Step "A ativar o portugues"
& $Py (Join-Path $Kit "portugues.py")
if ($LASTEXITCODE -ne 0) { Write-Host "O portugues nao foi ativado; o resto da instalacao continua." -ForegroundColor Yellow }

Step "A criar o atalho 'Jarvis HUD' no ambiente de trabalho"
$Desktop = [Environment]::GetFolderPath("Desktop")
$Shell = New-Object -ComObject WScript.Shell
Remove-Item (Join-Path $Desktop "Jarvis Face.lnk") -ErrorAction SilentlyContinue  # older kit name
$Lnk = $Shell.CreateShortcut((Join-Path $Desktop "Jarvis HUD.lnk"))
$Lnk.TargetPath = Join-Path $Kit "start-face.bat"
$Lnk.WorkingDirectory = $Kit
$Lnk.WindowStyle = 7  # minimized: the console flashes away, the HUD window stays
$Lnk.Description = "HUD holografico do Personal Jarvis"
$Lnk.Save()

# The HUD bridge at login: needed for the animated wallpaper (Lively), which
# loads the HUD page by itself after a reboot. Runs hidden (pythonw), ~30 MB RAM.
$Startup = Join-Path ([Environment]::GetFolderPath("Startup")) "Jarvis HUD (ponte).lnk"
if ($NoAutostart) {
  Remove-Item $Startup -ErrorAction SilentlyContinue
} else {
  $Pyw = Join-Path $JHome ".venv\Scripts\pythonw.exe"
  if (-not (Test-Path $Pyw)) { $Pyw = $Py }
  $Auto = $Shell.CreateShortcut($Startup)
  $Auto.TargetPath = $Pyw
  $Auto.Arguments = '"' + (Join-Path $Kit "face\face_bridge.py") + '"'
  $Auto.WorkingDirectory = Join-Path $Kit "face"
  $Auto.WindowStyle = 7
  $Auto.Description = "Ponte do Jarvis HUD (dados do sistema e estado da voz)"
  $Auto.Save()
  Write-Host "A ponte do HUD passa a arrancar com o Windows (para o papel de parede animado)."
  # Start it now too, so the wallpaper works without a reboot.
  Start-Process -FilePath $Pyw -ArgumentList $Auto.Arguments -WorkingDirectory $Auto.WorkingDirectory -WindowStyle Hidden
}

Step "A abrir o Jarvis outra vez"
$Shortcut = Find-JarvisShortcut
if ($Shortcut) {
  Start-Process -FilePath $Shortcut
  Write-Host "Jarvis a arrancar."
} elseif ($WasRunning -and $Main -and $Main.ExecutablePath) {
  $cut = $Main.CommandLine.IndexOf($Main.ExecutablePath, [StringComparison]::OrdinalIgnoreCase)
  $argsOnly = if ($cut -ge 0) { $Main.CommandLine.Substring($cut + $Main.ExecutablePath.Length).TrimStart('"', ' ') } else { "" }
  Start-Process -FilePath $Main.ExecutablePath -ArgumentList $argsOnly -WorkingDirectory $JHome
  Write-Host "Jarvis a arrancar."
} else {
  Write-Host "Abre o Personal Jarvis pelo menu Iniciar."
}

Step "Pronto"
Write-Host @"
1. O Jarvis abre sozinho (se nao abrir, procura "Jarvis" no menu Iniciar).
2. Settings > API Keys: cola a tua chave Gemini (gratis em https://aistudio.google.com/apikey).
3. Duplo clique em 'Jarvis HUD' no ambiente de trabalho.
   Papel de parede animado: instala o Lively Wallpaper e adiciona o endereco
   http://127.0.0.1:47900/?wallpaper   (ver README, seccao "Papel de parede").
4. Diz a tua palavra de ativacao - o orbe acorda, ouve-te e fala contigo.
"@
