#!/bin/bash

# Local pipeline test script
# Simulates the GitHub Actions workflow locally

set -e

echo "🔄 Starting local pipeline test..."

# Navigate to project directory
cd /workspaces/MoreThenRobin/fish-catch-leaderboard

echo "📦 Installing dependencies..."
npm ci

echo "🧪 Running tests..."
npm test

echo "🔍 Running linter..."
npm run lint -- --max-warnings 100

echo "📱 Making gradlew executable..."
chmod +x android/gradlew

echo "✅ Pipeline prerequisites completed successfully!"
echo ""
echo "⚠️  Note: Android build skipped locally due to SDK requirements."
echo "   The pipeline will handle this in the CI environment."
echo ""
echo "🎉 Local pipeline test completed successfully!"
