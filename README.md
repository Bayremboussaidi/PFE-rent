<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Car Rental Platform — Documentation</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<style>
  body { font-family: 'Source Code Pro', monospace; margin: 20px; }
  .section { display: none; margin-top: 20px; }
  .active { display: block; }
  .nav-btn { margin: 2px; }
  img.screenshot { width: 100%; max-width: 600px; margin-top: 10px; border: 1px solid #ccc; }
</style>
</head>
<body>

<h1 class="mb-4">🚗 Car Rental Platform — Full-Stack Application</h1>
<p>A modern full-stack platform built with <strong>Angular</strong>, <strong>Spring Boot</strong>, <strong>FastAPI chatbot</strong>, and <strong>MySQL</strong>. Integrates JWT, email notifications, PDF+QR confirmations, real-time chat, and follower updates.</p>

<div class="mb-3">
  <button class="btn btn-primary nav-btn" onclick="showSection('overview')">Project Overview</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('features')">Features</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('architecture')">Architecture</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('frontend')">Frontend</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('backend')">Backend</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('chatbot')">Chatbot</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('security')">Security</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('notifications')">Notifications & Email</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('booking')">Booking Flow</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('deployment')">Deployment & CI/CD</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('screenshots')">Screenshots & UI</button>
  <button class="btn btn-primary nav-btn" onclick="showSection('run')">How to Run</button>
</div>

<div id="overview" class="section active">
  <h2>Project Overview</h2>
  <ul>
    <li><strong>Admin:</strong> manages agencies, cars, blogs, customers.</li>
    <li><strong>Agency:</strong> manages cars and rental requests.</li>
    <li><strong>Customer:</strong> books cars, comments, receives notifications.</li>
    <li><strong>Follower:</strong> receives updates via email.</li>
  </ul>
  <p>Ensures <strong>secure authentication</strong>, modular REST API, microservices, and scalability.</p>
</div>

<div id="features" class="section">
  <h2>Features</h2>
  <ul>
    <li>Car Management: CRUD, multiple photos, filtering, availability checks.</li>
    <li>Booking System: Requests, agency approval/rejection, automated emails.</li>
    <li>PDF + QR Generation: Booking confirmations.</li>
    <li>Real-Time Chat: Admin ↔ Agencies.</li>
    <li>Blog Module: CRUD blogs, customer comments.</li>
    <li>Notifications & Follower Updates.</li>
    <li>Chatbot: FastAPI AI integration.</li>
    <li>Role-Based Security: Admin (Keycloak), Agency/Customer/Follower (JWT).</li>
    <li>Dockerized Microservices & CI/CD Pipeline.</li>
  </ul>
</div>

<div id="architecture" class="section">
  <h2>Architecture</h2>
  <pre>
Angular Frontend
      │
HTTP/REST + WebSockets
      │
Spring Boot Backend (modular microservices)
  ├─ Car & Booking
  ├─ Chat & Notifications
  ├─ PDF + QR
Security Layer: Keycloak (Admin) | JWT (Other Roles)
      │
MySQL Database
      │
FastAPI Chatbot (AI)
  </pre>
</div>

<div id="frontend" class="section">
  <h2>Frontend</h2>
  <p>Angular 16 + Bootstrap 5 + FontAwesome + Remix Icons + Ionicons. Responsive and modular architecture.</p>
  <ul>
    <li>Car listing & filtering</li>
    <li>Booking modal</li>
    <li>Real-time chat</li>
    <li>Notifications panel</li>
    <li>Blog commenting</li>
  </ul>
  <p>Sample libraries:</p>
  <pre>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/ionicons/ionicons.esm.js"></script>
  </pre>
</div>

<div id="backend" class="section">
  <h2>Backend</h2>
  <ul>
    <li>Spring Boot REST API with modular services (CarService, BookingService, ChatService, NotificationService, EmailService, PDFService)</li>
    <li>DTO pattern for clean entity/API separation</li>
    <li>MySQL tables: users, agencies, bookings, cars, blogs</li>
    <li>JWT security for Agency, Customer, Follower</li>
  </ul>
</div>

<div id="chatbot" class="section">
  <h2>Chatbot</h2>
  <ul>
    <li>FastAPI backend in Python</li>
    <li>OpenAI GPT integration</li>
    <li>Accessible by logged-in customers & visitors</li>
    <li>Deployed as a microservice</li>
  </ul>
</div>

<div id="security" class="section">
  <h2>Security</h2>
  <ul>
    <li>Admin: Keycloak authentication</li>
    <li>Agency/Customer/Follower: JWT-secured REST APIs</li>
    <li>Angular AuthGuard: Protects routes based on roles</li>
  </ul>
</div>

<div id="notifications" class="section">
  <h2>Notifications & Email System</h2>
  <ul>
    <li>Notifications: Booking requests, agency decisions, chat messages, blog updates</li>
    <li>Email: Booking confirmations, PDF + QR documents, follower updates, customer contacts</li>
  </ul>
</div>

<div id="booking" class="section">
  <h2>Booking Flow with PDF & QR</h2>
  <ol>
    <li>Customer requests booking via frontend</li>
    <li>Agency receives notification + email</li>
    <li>Agency accepts/rejects booking</li>
    <li>On acceptance: payment link sent, PDF + QR generated and emailed</li>
    <li>Real-time customer notifications updated</li>
  </ol>
</div>

<div id="deployment" class="section">
  <h2>Deployment & CI/CD</h2>
  <ul>
    <li>Docker Compose: Frontend, backend, MySQL, FastAPI chatbot</li>
    <li>Kubernetes: Minikube manifests for each service</li>
    <li>CI/CD GitLab pipeline: build images, run tests, deploy microservices</li>
  </ul>
</div>

<div id="screenshots" class="section">
  <h2>Screenshots & UI</h2>
  <p>Placeholder for screenshots:</p>
  <img class="screenshot" src="screenshots/keycloak.png" alt="Keycloak Admin Panel">
  <img class="screenshot" src="screenshots/car_listing.png" alt="Car Listing">
  <img class="screenshot" src="screenshots/booking_modal.png" alt="Booking Modal">
  <img class="screenshot" src="screenshots/chat_interface.png" alt="Chat Interface">
  <img class="screenshot" src="screenshots/pdf_booking.png" alt="PDF Booking">
</div>

<div id="run" class="section">
  <h2>How to Run</h2>
  <h4>Frontend</h4>
  <pre>
cd frontend
npm install
ng serve
  </pre>
  <h4>Backend</h4>
  <pre>
cd backend
mvn spring-boot:run
  </pre>
  <h4>FastAPI Chatbot</h4>
  <pre>
cd chatbot
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
  </pre>
  <h4>Keycloak (Admin)</h4>
  <pre>
docker run -d --name keycloak \
  -p 9090:8080 \
  -e KEYCLOAK_ADMIN=bayrem \
  -e KEYCLOAK_ADMIN_PASSWORD=YourPassword \
  quay.io/keycloak/keycloak:21.1.1 start-dev
  </pre>
</div>

<div class="mt-4">
  <h3>Author</h3>
  <p>Bayrem Boussaidi — Software Engineer (Angular | Spring Boot | Docker | Kubernetes | FastAPI | Microservices)</p>
</div>

<script>
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
</script>

</body>
</html>
