from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import SpamDetector
import uvicorn

app = FastAPI(title="SMS Spam Detection API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
spam_detector = SpamDetector()

class MessageRequest(BaseModel):
    message: str

class PredictionResponse(BaseModel):
    is_spam: bool
    confidence: float
    message: str

@app.get("/")
def read_root():
    return {"status": "SMS Spam Detection API is running"}

@app.get("/metrics")
def get_metrics():
    """Return model metrics"""
    return spam_detector.get_metrics()

@app.post("/predict", response_model=PredictionResponse)
def predict_spam(request: MessageRequest):
    """Predict if a message is spam or not"""
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        result = spam_detector.predict(request.message)
        return {
            "is_spam": result["prediction"] == "spam",
            "confidence": result["probability"],
            "message": request.message
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/examples")
def get_examples():
    """Return example messages for testing"""
    # Convert examples from new format to the old format expected by the frontend
    examples = spam_detector.get_examples()
    converted_examples = []
    
    for example in examples:
        converted_examples.append({
            "message": example["message"],
            "type": example["label"]  # Convert "label" to "type"
        })
    
    return converted_examples

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)