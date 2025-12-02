#!/usr/bin/env python3
"""
Test script to verify chatbot API integration with backend
"""

import asyncio
import httpx
import json

# Test the chatbot endpoints
async def test_chatbot():
    base_url = "http://localhost:8000"
    
    async with httpx.AsyncClient() as client:
        print("🤖 Testing Car Rental Chatbot API")
        print("=" * 50)
        
        # Test 1: Health check
        print("\n1. Testing health check...")
        try:
            response = await client.get(f"{base_url}/health")
            print(f"✅ Health check: {response.status_code} - {response.json()}")
        except Exception as e:
            print(f"❌ Health check failed: {e}")
        
        # Test 2: API info
        print("\n2. Testing API info...")
        try:
            response = await client.get(f"{base_url}/api-info")
            print(f"✅ API info: {response.status_code}")
            print(f"   Backend URL: {response.json().get('backend_url')}")
            print(f"   Endpoints: {list(response.json().get('endpoints', {}).keys())}")
        except Exception as e:
            print(f"❌ API info failed: {e}")
        
        # Test 3: Chat with voitures request
        print("\n3. Testing voitures request...")
        try:
            chat_data = {
                "message": "Show me available voitures",
                "user_id": "test_user"
            }
            response = await client.post(f"{base_url}/chat", json=chat_data)
            print(f"✅ Voitures request: {response.status_code}")
            result = response.json()
            print(f"   Response: {result.get('response', '')[:100]}...")
            print(f"   Confidence: {result.get('confidence')}")
            print(f"   Suggestions: {result.get('suggestions', [])}")
        except Exception as e:
            print(f"❌ Voitures request failed: {e}")
        
        # Test 4: Chat with agencies request
        print("\n4. Testing agencies request...")
        try:
            chat_data = {
                "message": "Show me all agencies",
                "user_id": "test_user"
            }
            response = await client.post(f"{base_url}/chat", json=chat_data)
            print(f"✅ Agencies request: {response.status_code}")
            result = response.json()
            print(f"   Response: {result.get('response', '')[:100]}...")
            print(f"   Confidence: {result.get('confidence')}")
        except Exception as e:
            print(f"❌ Agencies request failed: {e}")
        
        # Test 5: Chat with agence voitures request
        print("\n5. Testing agence voitures request...")
        try:
            chat_data = {
                "message": "Show me voitures from agence test",
                "user_id": "test_user"
            }
            response = await client.post(f"{base_url}/chat", json=chat_data)
            print(f" Agence voitures request: {response.status_code}")
            result = response.json()
            print(f"   Response: {result.get('response', '')[:100]}...")
            print(f"   Confidence: {result.get('confidence')}")
        except Exception as e:
            print(f" Agence voitures request failed: {e}")
        
        # Test 6: Chat with availability request
        print("\n6. Testing availability request...")
        try:
            chat_data = {
                "message": "Check availability for voiture 5",
                "user_id": "test_user"
            }
            response = await client.post(f"{base_url}/chat", json=chat_data)
            print(f" Availability request: {response.status_code}")
            result = response.json()
            print(f"   Response: {result.get('response', '')[:100]}...")
            print(f"   Confidence: {result.get('confidence')}")
        except Exception as e:
            print(f" Availability request failed: {e}")
        
        # Test 7: Chat with pricing request
        print("\n7. Testing pricing request...")
        try:
            chat_data = {
                "message": "What are your prices?",
                "user_id": "test_user"
            }
            response = await client.post(f"{base_url}/chat", json=chat_data)
            print(f" Pricing request: {response.status_code}")
            result = response.json()
            print(f"   Response: {result.get('response', '')[:100]}...")
            print(f"   Confidence: {result.get('confidence')}")
        except Exception as e:
            print(f" Pricing request failed: {e}")
        
        print("\n" + "=" * 50)
        print(" Chatbot API testing completed!")

if __name__ == "__main__":
    asyncio.run(test_chatbot()) 