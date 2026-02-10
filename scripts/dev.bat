@echo off
echo Starting Fullstack Development Environment...

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo Node.js version:
node -v

REM Install dependencies if needed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
) else (
    echo Backend dependencies already installed
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend dependencies already installed
)

REM Start servers
echo Starting backend server...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting frontend server...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo Development servers are running!
echo ==========================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:5173
echo API:      http://localhost:3001/api/v1
echo ==========================================
echo.
echo Close the terminal windows to stop the servers
