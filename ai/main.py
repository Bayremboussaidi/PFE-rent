from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
import os

load_dotenv()

endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
token = os.getenv("GITHUB_TOKEN")

if not token:
    raise ValueError("Missing GITHUB_TOKEN in environment variables")

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- SIMPLE MODEL --------------
class UserRequest(BaseModel):
    prompt: str


class PromptResponse(BaseModel):
    response: str


BIG_INFO_TEXT = (
    "I have developed a car rental app that offers services for admins and agencies to add, edit, "
    "and delete cars, upload photos, and update features (name, model, type, etc.). Admins and "
    "agencies communicate through an instant chat inside the application... (TEXT CONTINUES). "
    "Answer like a customer consultant and do not mention technical details."
)

# ------------ LOG THE RAW BODY ------------
@app.middleware("http")
async def log_body(request: Request, call_next):
    body = await request.body()
    print("\n🔥 RAW BODY RECEIVED:", body.decode())
    response = await call_next(request)
    return response


@app.post("/chat", response_model=PromptResponse)
async def chat(request: UserRequest):

    final_prompt = BIG_INFO_TEXT + "\n\nUser question: " + request.prompt

    response = client.complete(
        messages=[
            SystemMessage(content="You are a helpful assistant."),
            UserMessage(content=final_prompt),
        ],
        temperature=1,
        top_p=1,
        model=model
    )

    return {"response": response.choices[0].message.content}
