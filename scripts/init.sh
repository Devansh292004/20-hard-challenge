#!/bin/bash

# 20 Hard Challenge - Local Environment Initialization Script
# This script sets up the local development environment

set -e  # Exit on any error

echo "🔥 20 Hard Challenge - Initializing Environment"
echo "================================================"

# Check Node.js version
echo "\n📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required"
    echo "   Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) detected"

# Check npm installation
echo "\n📦 Checking npm installation..."
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed"
    exit 1
fi
echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "\n📥 Installing dependencies..."
if [ -f "package.json" ]; then
    npm install
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Error: package.json not found"
    exit 1
fi

# Create local data directories if they don't exist
echo "\n📁 Creating data directories..."
mkdir -p src/data
mkdir -p backups
echo "✅ Data directories created"

# Initialize challenge data file if it doesn't exist
echo "\n📊 Initializing challenge data..."
if [ ! -f "src/data/challenge-data.json" ]; then
    echo '{"challengeStartDate": null, "currentStreak": 0, "longestStreak": 0, "dailyLogs": [], "failures": []}' > src/data/challenge-data.json
    echo "✅ Challenge data file created"
else
    echo "ℹ️  Challenge data file already exists"
fi

# Check if user profile exists
echo "\n👤 Checking user profile..."
if [ ! -f "src/data/user-profile.json" ]; then
    echo "⚠️  Warning: User profile not found"
    echo "   Please create src/data/user-profile.json with your personal details"
else
    echo "✅ User profile found"
fi

# Run tests to ensure everything works
echo "\n🧪 Running tests..."
if npm test; then
    echo "✅ All tests passed"
else
    echo "⚠️  Some tests failed - check the output above"
fi

echo "\n================================================"
echo "✅ Environment initialization complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Review src/data/user-profile.json"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Open http://localhost:5173 in your browser"
echo ""
echo "🔥 Remember: This app enforces discipline, not convenience."
echo "   No excuses. Start your challenge!"
