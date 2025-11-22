# Car Rental Platform — Full-Stack Application

A modern full-stack car rental platform built with **Angular**, **Spring Boot**, **FastAPI chatbot**, and **MySQL**, featuring **JWT & Keycloak authentication**, **email notifications**, **PDF + QR booking confirmations**, **real-time chat**, and **follower updates**. Future plans include **online payment via PayPal**, with automated payment link delivery.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Frontend](#frontend)
5. [Backend](#backend)
6. [Chatbot](#chatbot)
7. [Security](#security)
8. [Notifications & Email System](#notifications--email-system)
9. [Booking Flow with PDF & QR](#booking-flow-with-pdf--qr)
10. [Deployment & CI/CD](#deployment--cicd)
11. [Screenshots & UI](#screenshots--ui)
12. [How to Run](#how-to-run)
13. [Future Work](#future-work)
14. [Author](#author)

---

## Project Overview

Multi-role platform supporting:
- **Admin:** Manages agencies, cars, blogs, and customers
- **Agency:** Manages cars and rental requests
- **Customer:** Books cars, comments, receives notifications
- **Follower:** Receives email updates about new cars and blogs

---

## Features
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

## Architecture

--- diagram ---

---

## Frontend
- **Framework:** Angular 16
- **Styling:** Bootstrap 5, FontAwesome, Remix Icons, Ionicons
- **Features:** Responsive design, car filtering, booking system, real-time chat

### Dependencies
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"></script>
```

---

## Backend
- **Framework:** Spring Boot (Modular microservices)
- **Database:** MySQL
- **Features:** JWT security, DTO pattern, REST APIs
- **Services:** CarService, BookingService, ChatService, NotificationService, EmailService, PDFService, future PayPalPaymentService (planned)

---

## Chatbot
- **Framework:** FastAPI (Python)
- **AI Integration:** OpenAI GPT
- **Access:** Customers and visitors
- **Deployment:** Microservice architecture

---

## Security
- **Admin:** Keycloak authentication with realm roles
- **Users:** JWT-secured APIs for Agency/Customer/Follower
- **Frontend:** Angular AuthGuard for route protection

---

## Notifications & Email System
- **Real-Time Alerts:** Booking requests, agency decisions, chat messages
- **Email (SMTP):** Booking confirmations, PDF+QR documents, follower updates
- **Automated:** System-triggered notifications

---

## Booking Flow with PDF & QR
1. Customer requests car booking
2. Agency receives notification/email
3. Agency approves/rejects request
4. On approval:
   - Payment link sent to customer (**planned future PayPal integration**)
   - PDF+QR confirmation generated automatically
   - Documents emailed to customer
5. Real-time notifications updated

---

## Deployment & CI/CD
- **Docker Compose:** Frontend, backend, MySQL, chatbot
- **Kubernetes:** Minikube with YAML manifests
- **CI/CD:** GitLab pipeline (build, test, deploy)
- **Microservices:** Domain-based modular architecture

---

## Screenshots & UI

| Feature                                  | Screenshot |
|------------------------------------------|------------|
| Keycloak Admin Panel                     | ![Keycloak](screenshots/clients_key.PNG)   |
| Realm Overview                            | ![Realm](screenshots/comparateur.PNG) |
| Admin Car Listing                         | ![Cars](screenshots/administatorcars.PNG) |
| Edit Car Details (Admin)                  | ![Edit Car](screenshots/editcaradmin.PNG) |
| Car List Interface for Client s Dashboard – Demo                      | ![Car List](screenshots/listecars.PNG) |
| Blog Management (Admin)                    | ![Blogs Admin](screenshots/blogsadmin.PNG) |
| Booking History  - Demo                          | ![Bookings](screenshots/bookings.PNG) |
|      Chatbot Interface       | ![Chat](screenshots/chat.PNG) |
| Chat Interface (Admin ↔ Agency) – Demo with Test Agency                       | ![Message](screenshots/message.PNG) |
| Notifications Table  ( Client )                       | ![Notifications](screenshots/notifications.PNG) |
| Admin – Create Agency Page                 | ![Create Agency](screenshots/createagence.PNG) |
| Login Page  ( Admin , Agency , Client )                               | ![Login](screenshots/login.PNG) |
| Rental PDF Confirmation Example Zahida Aloui – Client Demo | [Download PDF](screenshots/booking-confirmation.pdf) |

---

## How to Run

### Frontend
```bash
cd frontend
npm install
ng serve
```

### Backend
```bash
cd backend
mvn spring-boot:run
```

### FastAPI Chatbot
```bash
cd chatbot
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Keycloak (Admin)
```bash
docker run -d --name keycloak \
  -p 9090:8080 \
  -e KEYCLOAK_ADMIN=bayrem \
  -e KEYCLOAK_ADMIN_PASSWORD=YourPassword \
  quay.io/keycloak/keycloak:21.1.1 start-dev
```

---

## Future Work
- **Online Payment Integration (PayPal Microservice):**
  - Microservice app has already been created
  - Requires a PayPal account and configuration to enable automated payment links to customers
  - Will be integrated into the booking approval flow once ready
  - Currently postponed due to external constraints with employer; implementation planned for next steps


---

## Author

Bayrem Boussaidi  
Software Engineer — Angular | Spring Boot | Docker | Kubernetes | FastAPI | Microservices
