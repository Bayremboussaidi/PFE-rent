#!/bin/bash

# Deploy Car Rent Application to Minikube
echo "🚀 Starting deployment to Minikube..."

# Check if Minikube is running
if ! minikube status | grep -q "Running"; then
    echo "Starting Minikube..."
    minikube start --driver=docker
fi

# Set your Docker Hub username here
DOCKERHUB_USERNAME="bayremboussaidi"

# Update image names in manifests
echo "📝 Updating image names in manifests..."
sed -i "s/bayremboussaidi\/comparateur-backend/bayremboussaidi\/backend/g" k8s/backend-deployment.yaml
sed -i "s/bayremboussaidi\/comparateur-frontend/bayremboussaidi\/front/g" k8s/frontend-deployment.yaml

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f k8s/namespace.yaml

# Deploy MySQL
echo "🗄️  Deploying MySQL..."
kubectl apply -f k8s/mysql-deployment.yaml

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n car-rent-app --timeout=300s

# Deploy Backend
echo "🔧 Deploying Backend..."
kubectl apply -f k8s/backend-deployment.yaml

# Deploy Frontend
echo "🎨 Deploying Frontend..."
kubectl apply -f k8s/frontend-deployment.yaml

# Deploy AI service (if exists)
if [ -f "k8s/ai-deployment.yaml" ]; then
    echo "🤖 Deploying AI service..."
    kubectl apply -f k8s/ai-deployment.yaml
    kubectl apply -f k8s/ai-service.yaml
fi

# Wait for all pods to be ready
echo "⏳ Waiting for all pods to be ready..."
kubectl wait --for=condition=ready pod -l app=backend -n car-rent-app --timeout=300s
kubectl wait --for=condition=ready pod -l app=frontend -n car-rent-app --timeout=300s

# Show deployment status
echo "📊 Deployment Status:"
kubectl get pods -n car-rent-app
kubectl get svc -n car-rent-app

# Get Minikube IP
MINIKUBE_IP=$(minikube ip)
echo "🌐 Minikube IP: $MINIKUBE_IP"

# Show access URLs
echo "🔗 Access URLs:"
echo "Frontend: http://$MINIKUBE_IP:$(kubectl get svc frontend -n car-rent-app -o jsonpath='{.spec.ports[0].nodePort}')"
echo "Backend: http://$MINIKUBE_IP:$(kubectl get svc backend -n car-rent-app -o jsonpath='{.spec.ports[0].nodePort}')"

echo "✅ Deployment completed!"
echo "💡 To access the application, run: minikube service frontend -n car-rent-app" 