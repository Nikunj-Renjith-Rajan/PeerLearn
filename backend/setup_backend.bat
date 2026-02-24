@echo off
cd /d "%~dp0"
echo Installing backend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing dependencies.
    pause
    exit /b %errorlevel%
)

echo Creating database...
node create_db.js
if %errorlevel% neq 0 (
    echo Error creating database.
    pause
    exit /b %errorlevel%
)

echo Initializing database tables...
node src/initDb.js
if %errorlevel% neq 0 (
    echo Error initializing database tables.
    pause
    exit /b %errorlevel%
)

echo Backend setup complete.
pause
