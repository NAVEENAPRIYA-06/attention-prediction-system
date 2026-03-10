from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from backend.saliency_engine import generate_attention_data
import cv2
from fastapi.staticfiles import StaticFiles

# ... after app = FastAPI() ...

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
# Allow the frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Updated return values
    heatmap, first_focus, score, suggestions = generate_attention_data(file_path)
    
    heatmap_path = os.path.join(UPLOAD_DIR, f"heatmap_{file.filename}")
    cv2.imwrite(heatmap_path, heatmap)
    
    return {
        "score": score,
        "first_focus": {"x": first_focus[0], "y": first_focus[1]},
        "heatmap_url": f"http://127.0.0.1:8000/{heatmap_path}",
        "suggestions": suggestions # New field!
    }
@app.post("/compare")
async def compare_designs(fileA: UploadFile = File(...), fileB: UploadFile = File(...)):
    # 1. Process Image A
    pathA = os.path.join(UPLOAD_DIR, fileA.filename)
    with open(pathA, "wb") as f: shutil.copyfileobj(fileA.file, f)
    hA, fA, sA, sugA = generate_attention_data(pathA)
    
    # 2. Process Image B
    pathB = os.path.join(UPLOAD_DIR, fileB.filename)
    with open(pathB, "wb") as f: shutil.copyfileobj(fileB.file, f)
    hB, fB, sB, sugB = generate_attention_data(pathB)
    
    # 3. Determine Winner
    winner = "Design A" if sA > sB else "Design B"
    
    return {
        "designA": {"score": sA, "heatmap": f"http://127.0.0.1:8000/uploads/heatmap_{fileA.filename}"},
        "designB": {"score": sB, "heatmap": f"http://127.0.0.1:8000/uploads/heatmap_{fileB.filename}"},
        "recommendation": winner
    }

@app.get("/")
def read_root():
    return {"status": "AI Attention API is running"}