#!/bin/bash

# Comprehensive Minikube Setup and Deployment Script
echo "🚀 Starting comprehensive Minikube setup and deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_warning "Running as root. This is not recommended for security reasons."
fi

# Step 1: Check and fix Docker permissions
print_status "Checking Docker installation and permissions..."

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if user is in docker group
if ! groups $USER | grep -q docker; then
    print_warning "User is not in docker group. Attempting to add user to docker group..."
    if command -v sudo &> /dev/null; then
        sudo usermod -aG docker $USER
        print_status "User added to docker group. You may need to log out and back in, or run 'newgrp docker'"
        # Try to start a new group session
        newgrp docker || true
    else
        print_error "sudo not available. Please manually add user to docker group: usermod -aG docker $USER"
    fi
fi

# Step 2: Try different Minikube drivers
print_status "Attempting to start Minikube with different drivers..."

# Function to try starting minikube with a specific driver
try_minikube_driver() {
    local driver=$1
    print_status "Trying Minikube with driver: $driver"
    
    if minikube start --driver=$driver --force 2>/dev/null; then
        print_success "Minikube started successfully with $driver driver!"
        return 0
    else
        print_warning "Failed to start Minikube with $driver driver"
        return 1
    fi
}

# Try different drivers in order of preference
drivers=("docker" "none" "podman" "ssh" "kvm2" "virtualbox")

for driver in "${drivers[@]}"; do
    if try_minikube_driver $driver; then
        break
    fi
done

# Check if minikube is running
if ! minikube status | grep -q "Running"; then
    print_error "Failed to start Minikube with any available driver."
    print_status "Available drivers:"
    minikube config defaults driver
    print_status "Please install one of the required drivers or run with sudo for 'none' driver"
    exit 1
fi

print_success "Minikube is running!"

# Step 3: Enable addons
print_status "Enabling Minikube addons..."
minikube addons enable ingress
minikube addons enable dashboard

# Step 4: Update Kubernetes manifests with correct image names
print_status "Updating Kubernetes manifests with your Docker Hub images..."

# Your Docker Hub images
BACKEND_IMAGE="bayremboussaidi/backend:latest"
FRONTEND_IMAGE="bayremboussaidi/front:latest"
AI_IMAGE="bayremboussaidi/ai-chatbot:latest"

# Update backend deployment
if [ -f "k8s/backend-deployment.yaml" ]; then
    sed -i "s|image:.*backend.*|image: $BACKEND_IMAGE|g" k8s/backend-deployment.yaml
    print_success "Updated backend deployment with image: $BACKEND_IMAGE"
fi

# Update frontend deployment
if [ -f "k8s/frontend-deployment.yaml" ]; then
    sed -i "s|image:.*frontend.*|image: $FRONTEND_IMAGE|g" k8s/frontend-deployment.yaml
    print_success "Updated frontend deployment with image: $FRONTEND_IMAGE"
fi

# Update AI deployment
if [ -f "k8s/ai-deployment.yaml" ]; then
    sed -i "s|image:.*ai-chatbot.*|image: $AI_IMAGE|g" k8s/ai-deployment.yaml
    print_success "Updated AI deployment with image: $AI_IMAGE"
fi

# Step 5: Deploy the application
print_status "Starting application deployment..."

# Create namespace
print_status "Creating namespace..."
kubectl apply -f k8s/namespace.yaml

# Deploy MySQL
print_status "Deploying MySQL..."
kubectl apply -f k8s/mysql-deployment.yaml

# Wait for MySQL to be ready
print_status "Waiting for MySQL to be ready..."
if kubectl wait --for=condition=ready pod -l app=mysql -n car-rent-app --timeout=300s 2>/dev/null; then
    print_success "MySQL is ready!"
else
    print_warning "MySQL pod not ready within timeout. Continuing anyway..."
fi

# Deploy Backend
print_status "Deploying Backend..."
kubectl apply -f k8s/backend-deployment.yaml

# Deploy Frontend
print_status "Deploying Frontend..."
kubectl apply -f k8s/frontend-deployment.yaml

# Deploy AI service
if [ -f "k8s/ai-deployment.yaml" ]; then
    print_status "Deploying AI Chatbot..."
    kubectl apply -f k8s/ai-deployment.yaml
    kubectl apply -f k8s/ai-service.yaml
fi

# Wait for all pods to be ready
print_status "Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -l app=backend -n car-rent-app --timeout=300s 2>/dev/null || print_warning "Backend pod not ready within timeout"
kubectl wait --for=condition=ready pod -l app=frontend -n car-rent-app --timeout=300s 2>/dev/null || print_warning "Frontend pod not ready within timeout"
kubectl wait --for=condition=ready pod -l app=ai-chatbot -n car-rent-app --timeout=300s 2>/dev/null || print_warning "AI pod not ready within timeout"

# Step 6: Show deployment status
print_status "Deployment Status:"
echo "----------------------------------------"
kubectl get pods -n car-rent-app
echo "----------------------------------------"
kubectl get svc -n car-rent-app
echo "----------------------------------------"

# Step 7: Get access information
MINIKUBE_IP=$(minikube ip)
print_success "Minikube IP: $MINIKUBE_IP"

print_status "Access URLs:"
echo "Frontend: http://$MINIKUBE_IP:$(kubectl get svc frontend -n car-rent-app -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo 'N/A')"
echo "Backend: http://$MINIKUBE_IP:$(kubectl get svc backend -n car-rent-app -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo 'N/A')"
echo "AI Chatbot: http://$MINIKUBE_IP:$(kubectl get svc ai-chatbot -n car-rent-app -o jsonpath='{.spec.ports[0].nodePort}' 2>/dev/null || echo 'N/A')"

print_success "Deployment completed!"
print_status "Useful commands:"
echo "  - Check pods: kubectl get pods -n car-rent-app"
echo "  - Check services: kubectl get svc -n car-rent-app"
echo "  - View logs: kubectl logs -f deployment/backend -n car-rent-app"
echo "  - Open dashboard: minikube dashboard"
echo "  - Open frontend: minikube service frontend -n car-rent-app" 