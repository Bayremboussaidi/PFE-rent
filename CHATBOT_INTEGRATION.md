# 🤖 Car Rental Chatbot - API Integration Guide

## 🎯 Overview

Your chatbot is now fully integrated with your backend APIs! It provides real-time, intelligent responses about your car rental system by connecting to your actual backend endpoints.

## 🔗 API Integration

### **Connected Backend APIs:**

| Endpoint | Purpose | Response Format |
|----------|---------|-----------------|
| `GET /api/agence/all` | Get all agencies | `[{id, agencyName, email, phoneNumber, city, photo}]` |
| `GET /api/voitures` | Get all voitures | `{success, message, data: [{id, carName, brand, category, price, agence, local, ...}]}` |
| `GET /api/voitures/agence/{agenceName}` | Get voitures by agency | `{success, message, data: [{...}]}` |
| `GET /api/bookings/{voitureId}/availability` | Check voiture availability | `{unavailableDates: [{startDate, endDate}], voitureId}` |

### **Chatbot Capabilities:**

#### 🚗 **Voitures Management**
- **Intent**: `voitures`
- **Keywords**: "voitures", "cars", "vehicles", "available", "rent", "book", "reserve"
- **Example**: "Show me available voitures"
- **Response**: Fetches all voitures from `/api/voitures` and displays them

#### 🏢 **Agency Information**
- **Intent**: `agencies`
- **Keywords**: "agencies", "agence", "locations", "branches", "offices"
- **Example**: "Show me all agencies"
- **Response**: Fetches all agencies from `/api/agence/all` and displays them

#### 🏢🚗 **Agency-Specific Voitures**
- **Intent**: `agence_voitures`
- **Keywords**: "agence", "agency", "voitures", "cars", "specific"
- **Example**: "Show me voitures from agence test"
- **Response**: Fetches voitures for specific agency from `/api/voitures/agence/{agenceName}`

#### 📅 **Availability Checking**
- **Intent**: `availability`
- **Keywords**: "availability", "available", "check", "dates", "when"
- **Example**: "Check availability for voiture 5"
- **Response**: Checks availability from `/api/bookings/{voitureId}/availability`

#### 💰 **Pricing Information**
- **Intent**: `pricing`
- **Keywords**: "price", "cost", "rate", "fee", "payment", "how much"
- **Example**: "What are your prices?"
- **Response**: Provides pricing information from knowledge base

## 🚀 How to Use

### **1. Start the Services**

```bash
# Option 1: Using Docker Compose (Development)
docker-compose up -d backend ai-chatbot

# Option 2: Using Minikube (Production)
./setup-minikube-deployment.sh
```

### **2. Test the Chatbot**

```bash
# Test the chatbot API directly
python ai/test_chatbot_api.py

# Or use curl
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me available voitures", "user_id": "test_user"}'
```

### **3. Frontend Integration**

Add the chatbot component to any Angular page:

```html
<!-- In your Angular component template -->
<app-chatbot></app-chatbot>
```

```typescript
// In your Angular module
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@NgModule({
  declarations: [
    ChatbotComponent
  ],
  // ...
})
```

## 💬 Example Conversations

### **User**: "Show me available voitures"
**Bot Response**:
```
I found 3 available voitures:
• Toyota Corolla - 150€/day
  Location: Tunis | Agency: myloc
• Renault Clio 4 - 18005€/day
  Location: Sfax | Agency: test
• BMW X3 - 200€/day
  Location: Tunis | Agency: myloc

Would you like to see more details or check availability?

Suggestions: [Show me agencies] [What's the cheapest voiture?] [Show me luxury voitures]
```

### **User**: "Show me all agencies"
**Bot Response**:
```
I found 2 agencies:
• test - ariena
  Phone: 22559645 | Email: test@gmail.com
• myloc - Tunis
  Phone: 12345678 | Email: myloc@example.com

Would you like to see voitures from a specific agency?

Suggestions: [Show me voitures from test agency] [What agencies are in Tunis?] [Show me agency contact info]
```

### **User**: "Show me voitures from agence test"
**Bot Response**:
```
I found 1 voitures at test:
• Renault Clio 4 - 18005€/day
  Category: Hatchback | Transmission: Manual

Would you like to check availability for any of these voitures?

Suggestions: [Check availability for voiture 3] [Show me more voitures] [What are the prices?]
```

### **User**: "Check availability for voiture 5"
**Bot Response**:
```
Voiture 5 is unavailable on these dates:
• 2025-05-09 to 2025-05-17

Would you like to check availability for other dates?

Suggestions: [Check availability for voiture 2] [Show me all voitures] [What agencies have available voitures?]
```

## 🔧 Configuration

### **Environment Variables**

```bash
# Backend URL (default: http://localhost:8084)
BACKEND_URL=http://backend:8084

# Python unbuffered output (default: 1)
PYTHONUNBUFFERED=1
```

### **API Endpoints Configuration**

The chatbot automatically configures these endpoints:

```python
API_ENDPOINTS = {
    "agencies": "http://localhost:8084/api/agence/all",
    "voitures": "http://localhost:8084/api/voitures",
    "voitures_by_agence": "http://localhost:8084/api/voitures/agence",
    "booking_availability": "http://localhost:8084/api/bookings"
}
```

## 🧪 Testing

### **Run Unit Tests**
```bash
cd ai
python -m pytest test_ai_service.py -v
```

### **Run API Integration Tests**
```bash
cd ai
python test_chatbot_api.py
```

### **Test Frontend Component**
```bash
cd frontend
npm test -- --include="**/chatbot/**/*.spec.ts"
```

## 🎨 Frontend Features

### **Modern Chat Interface**
- ✅ **Real-time messaging** with typing indicators
- ✅ **Data visualization** for voitures, agencies, and availability
- ✅ **Smart suggestions** based on context
- ✅ **Responsive design** for mobile and desktop
- ✅ **Professional styling** with animations

### **Data Display**
- **Voitures**: Brand, model, price, location, agency, category, transmission
- **Agencies**: Name, city, phone, email
- **Availability**: Unavailable dates, availability status

## 🔍 Troubleshooting

### **Common Issues**

1. **Backend Connection Failed**
   ```
   Error: Connection refused
   Solution: Ensure backend is running on port 8084
   ```

2. **API Response Format Mismatch**
   ```
   Error: KeyError 'data'
   Solution: Check API response format matches expected structure
   ```

3. **Frontend Chatbot Not Loading**
   ```
   Error: CORS issues
   Solution: Ensure CORS is configured in backend
   ```

### **Debug Mode**

Enable debug logging:

```python
# In ai/main.py
logging.basicConfig(level=logging.DEBUG)
```

### **Health Checks**

```bash
# Check chatbot health
curl http://localhost:8000/health

# Check API info
curl http://localhost:8000/api-info
```

## 🚀 Deployment

### **Docker Build**
```bash
cd ai
docker build -t bayremboussaidi/ai-chatbot:latest .
docker push bayremboussaidi/ai-chatbot:latest
```

### **Kubernetes Deployment**
```bash
# Apply the deployment
kubectl apply -f k8s/ai-deployment.yaml
kubectl apply -f k8s/ai-service.yaml

# Check status
kubectl get pods -n car-rent-app
kubectl logs -f deployment/ai-chatbot -n car-rent-app
```

## 🎉 Success!

Your chatbot is now:
- ✅ **API-Connected**: Real-time data from your backend
- ✅ **RAG-Enabled**: Retrieval-augmented generation
- ✅ **Intelligent**: Intent recognition and contextual responses
- ✅ **User-Friendly**: Modern chat interface
- ✅ **Production-Ready**: Error handling and fallbacks
- ✅ **Tested**: Unit tests and integration tests

**Your chatbot provides real-time, accurate information about your car rental system!** 🚗✨ 