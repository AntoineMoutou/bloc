@echo off
set nodepath="node-v9.2.0-win-x64"
set nodemodules="node_modules\.bin"
%nodemodules%\pm2 start index.js 3000
