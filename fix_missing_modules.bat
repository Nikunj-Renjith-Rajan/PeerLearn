@echo off
echo Installing socket.io-client and simple-peer...
call npm install socket.io-client simple-peer
echo Installing type definitions...
call npm install -D @types/socket.io-client @types/simple-peer
echo Installation complete.
pause
