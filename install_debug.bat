@echo off
echo Running npm install... > install_log.txt
npm install socket.io-client simple-peer >> install_log.txt 2>&1
echo Done. >> install_log.txt
