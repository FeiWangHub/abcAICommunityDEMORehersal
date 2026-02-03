from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = FastAPI(title="ABC AI Community API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase setup
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

class FeedbackRequest(BaseModel):
    message: str
    user_email: Optional[str] = None

@app.get("/")
async def root():
    return {"message": "Welcome to ABC AI Community API"}

@app.get("/api/resources/external")
async def get_external_resources():
    try:
        response = supabase.table("external_resources").select("*").eq("is_active", True).order("sort_order").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/resources/internal")
async def get_internal_resources():
    try:
        response = supabase.table("internal_resources").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/feedback")
async def submit_feedback(feedback: FeedbackRequest):
    try:
        data = {
            "message": feedback.message,
            "user_email": feedback.user_email,
            "status": "pending"
        }
        response = supabase.table("user_feedback").insert(data).execute()
        return {"message": "Feedback submitted successfully", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
