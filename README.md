#  Car Rental Platform — Full-Stack Application

A modern full-stack car rental platform built with **Angular**, **Spring Boot**, **FastAPI chatbot**, and **MySQL**, featuring **JWT & Keycloak authentication**, **email notifications**, **PDF + QR booking confirmations**, **real-time chat**, and **follower updates**.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Frontend](#frontend)
- [Backend](#backend)
- [Chatbot](#chatbot)
- [Security](#security)
- [Notifications & Email System](#notifications--email-system)
- [Booking Flow with PDF & QR](#booking-flow-with-pdf--qr)
- [Deployment & CI/CD](#deployment--cicd)
- [Screenshots & UI](#screenshots--ui)
- [How to Run](#how-to-run)
- [Author](#author)

---

##  Project Overview

Multi-role platform supporting:
- **Admin:** Manages agencies, cars, blogs, and customers
- **Agency:** Manages cars and rental requests
- **Customer:** Books cars, comments, receives notifications
- **Follower:** Receives email updates about new cars and blogs

---

##  Features
- **Car Management:** CRUD operations, photo uploads, filtering
- **Booking System:** Rental requests with agency approval
- **PDF + QR Generation:** Automated booking confirmations
- **Real-Time Chat:** Admin ↔ Agencies messaging
- **Blog Module:** CRUD operations with customer comments
- **Notifications:** Real-time alerts for bookings and messages
- **Follower System:** Email subscription service
- **AI Chatbot:** FastAPI-powered assistant
- **Role-Based Security:** Keycloak (Admin) + JWT (Others)
- **Dockerized Microservices:** Modular deployment
- **CI/CD Pipeline:** GitLab automation
- **Kubernetes:** Minikube-ready manifests

---

##  Architecture

--- diagram ---




---

##  Frontend
- **Framework:** Angular 16
- **Styling:** Bootstrap 5, FontAwesome, Remix Icons, Ionicons
- **Features:** Responsive design, car filtering, booking modal, real-time chat


<!-- Dependencies -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"></script>




##  Backend
- **Framework:** Spring Boot (Modular microservices)
- **Database:** MySQL
- **Features:** JWT security, DTO pattern, REST APIs
- **Services:** CarService, BookingService, ChatService, NotificationService, EmailService, PDFService

##  Chatbot
- **Framework:** FastAPI (Python)
- **AI Integration:** OpenAI GPT
- **Access:** Customers and visitors
- **Deployment:** Microservice architecture

##  Security
- **Admin:** Keycloak authentication with realm roles
- **Users:** JWT-secured APIs for Agency/Customer/Follower
- **Frontend:** Angular AuthGuard for route protection

##  Notifications & Email System
- **Real-Time Alerts:** Booking requests, agency decisions, chat messages
- **Email (SMTP):** Booking confirmations, PDF+QR documents, follower updates
- **Automated:** System-triggered notifications

##  Booking Flow with PDF & QR
1. Customer requests car booking
2. Agency receives notification/email
3. Agency approves/rejects request
4. On approval:
   - Payment link sent to customer
   - PDF+QR confirmation generated automatically
   - Documents emailed to customer
5. Real-time notifications updated

##  Deployment & CI/CD
- **Docker Compose:** Frontend, backend, MySQL, chatbot
- **Kubernetes:** Minikube with YAML manifests
- **CI/CD:** GitLab pipeline (build, test, deploy)
- **Microservices:** Domain-based modular architecture

##  Screenshots & UI
*(Add your screenshots here)*
- Keycloak Admin Panel
- Car Listing Views
- Booking Modal
- Chat Interface
- PDF Booking Confirmations
- Notification Panel
- Chatbot Window

##  How to Run

### Frontend
bash : 
cd frontend
npm install
ng serve


### Backend

cd backend
mvn spring-boot:run


### FastAPI Chatbot

cd chatbot
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000



### Keycloak (Admin)

docker run -d --name keycloak \
  -p 9090:8080 \
  -e KEYCLOAK_ADMIN=bayrem \
  -e KEYCLOAK_ADMIN_PASSWORD=YourPassword \
  quay.io/keycloak/keycloak:21.1.1 start-dev




### Author

  Bayrem Boussaidi
Software Engineer — Angular | Spring Boot | Docker | Kubernetes | FastAPI | Microservices

