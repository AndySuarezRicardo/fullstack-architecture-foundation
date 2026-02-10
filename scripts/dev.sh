#!/bin/bash

# Development startup script
echo "🚀 Starting Fullstack Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Function to check if dependencies are installed
check_deps() {
    if [ ! -d "$1/node_modules" ]; then
        echo "📦 Installing dependencies in $1..."
        cd $1
        npm install
        cd ..
    else
        echo "✅ Dependencies already installed in $1"
    fi
}

# Check and install dependencies
check_deps "backend"
check_deps "frontend"

# Start backend in background
echo "🔧 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=========================================="
echo "✨ Development servers are running!"
echo "=========================================="
echo "Backend:  http://localhost:3001"
echo "Frontend: http://localhost:5173"
echo "API:      http://localhost:3001/api/v1"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop all servers"

# Handle Ctrl+C
trap "echo '\n🛑 Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Wait for both processes
wait
