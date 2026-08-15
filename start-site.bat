@echo off
chcp 65001 >nul
cd /d "%~dp0"
"C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "%~dp0node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5174 --strictPort
pause
