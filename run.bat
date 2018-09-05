@echo off
set path=%path%;"node-v4.9.1-win-x64"
set nodemodules="node_modules\.bin"
%nodemodules%\pm2 start index.js 3000
pause

