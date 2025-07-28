# Kubernetes Deployment for Car Rent App

This directory contains Kubernetes manifests to deploy the Car Rent application including backend, frontend, and MySQL database.

## Files

- namespace.yaml: Kubernetes namespace for the app.
- mysql-deployment.yaml: Deployment, Service, and PersistentVolumeClaim for MySQL.
- backend-deployment.yaml: Deployment and Service for Spring Boot backend.
- frontend-deployment.yaml: Deployment and Service for Angular frontend.

## Instructions

1. Build Docker images for backend and frontend:

```bash
# Backend
docker build -t your-backend-image:latest ./back

# Frontend
docker build -t your-frontend-image:latest ./frontend
```

2. Push images to your container registry.

3. Apply Kubernetes manifests:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

4. Verify pods and services are running:

```bash
kubectl get pods -n car-rent-app
kubectl get svc -n car-rent-app
```

5. Access the frontend via the LoadBalancer IP or configured ingress.

## Notes

- Update image names in deployment manifests to your actual image repository.
- Configure secrets for database passwords in production.
- Consider adding Ingress for better routing and TLS termination.
