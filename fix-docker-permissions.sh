#!/bin/bash

# Fix Docker Permissions for Minikube
echo "🔧 Fixing Docker permissions for Minikube..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "Running as root. This script should be run as a regular user."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "📋 Current user: $USER"
echo "📋 Current groups: $(groups)"

# Check if user is already in docker group
if groups $USER | grep -q docker; then
    echo "✅ User is already in docker group"
else
    echo "⚠️  User is not in docker group. Adding user to docker group..."
    
    # Try to add user to docker group
    if command -v sudo &> /dev/null; then
        sudo usermod -aG docker $USER
        echo "✅ User added to docker group"
        echo "🔄 You may need to log out and back in, or run 'newgrp docker'"
    else
        echo "❌ sudo not available. Please run manually: usermod -aG docker $USER"
        exit 1
    fi
fi

# Try to start a new group session
echo "🔄 Starting new group session..."
newgrp docker || {
    echo "⚠️  Could not start new group session. You may need to log out and back in."
    echo "💡 Alternatively, you can run: newgrp docker"
}

# Test Docker access
echo "🧪 Testing Docker access..."
if docker version &> /dev/null; then
    echo "✅ Docker access working!"
else
    echo "❌ Docker access still not working. Please log out and log back in."
    echo "💡 Or run: newgrp docker"
fi

echo "🎯 Now try running: ./setup-minikube-deployment.sh" 