@echo off
echo Installing dependencies...
call npm install socket.io-client simple-peer
echo Installing dev dependencies...
call npm install -D @types/socket.io-client @types/simple-peer
echo Done.
pause
