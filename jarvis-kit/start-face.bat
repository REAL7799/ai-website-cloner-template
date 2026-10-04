@echo off
REM Starts the Jarvis Face: the bridge in the background + a frameless browser window.
setlocal
set "KIT=%~dp0"
set "JHOME=%JARVIS_INSTALL_DIR%"
if "%JHOME%"=="" set "JHOME=%USERPROFILE%\.personal-jarvis"
set "PY=%JHOME%\.venv\Scripts\pythonw.exe"
if not exist "%PY%" set "PY=%JHOME%\.venv\Scripts\python.exe"
if not exist "%PY%" (
  echo [Jarvis Face] Nao encontrei o Python do Personal Jarvis em "%JHOME%\.venv".
  echo Instala primeiro o Jarvis com install-windows.ps1.
  pause
  exit /b 1
)

REM Only one bridge: if the port answers, reuse it.
powershell -NoProfile -Command "try{(Invoke-WebRequest -UseBasicParsing http://127.0.0.1:47900/ -TimeoutSec 1)|Out-Null;exit 0}catch{exit 1}"
if errorlevel 1 (
  start "" /b "%PY%" "%KIT%face\face_bridge.py"
  timeout /t 2 /nobreak >nul
)

set "URL=http://127.0.0.1:47900/"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%EDGE%" (
  start "" "%EDGE%" --app=%URL% --start-maximized
) else if exist "%CHROME%" (
  start "" "%CHROME%" --app=%URL% --start-maximized
) else (
  start "" %URL%
)
endlocal
