from fastapi import FastAPI, File, UploadFile, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os, shutil
import cv2
from backend.saliency_engine import generate_attention_data, calculate_element_score

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Cache to store the saliency map for ROI (Region of Interest) calculations
saliency_cache = {}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get results from engine, including the raw saliency_map for caching
    # Returns: heatmap, maxLoc, quality_score, suggestions, element_scores, saliency_map
    heatmap, first_focus, score, suggestions, element_scores, raw_saliency = generate_attention_data(file_path)
    
    # Store the saliency map in the cache linked to a "latest" key 
    saliency_cache["latest"] = raw_saliency
    
    # Save the heatmap image to disk
    heatmap_name = f"heatmap_{file.filename}"
    heatmap_path = os.path.join(UPLOAD_DIR, heatmap_name)
    cv2.imwrite(heatmap_path, heatmap)
    
    return {
        "score": score,
        "first_focus": {"x": first_focus[0], "y": first_focus[1]},
        "heatmap_url": f"http://127.0.0.1:8000/{heatmap_path}",
        "suggestions": suggestions,
        "element_scores": element_scores
    }

@app.post("/analyze-element")
async def analyze_specific_element(data: dict = Body(...)):
    """
    Receives x, y, w, h from the frontend (0-100 normalized) 
    and returns the attention score, smart label, and AI advice.
    """
    if "latest" not in saliency_cache:
        return {"error": "No image analyzed yet. Please upload an image first."}
    
    raw_saliency = saliency_cache["latest"]
    h, w = raw_saliency.shape
    
    # Unpack the 3 values returned by the updated engine
    element_score, label, advice = calculate_element_score(
        raw_saliency, 
        data['x'], data['y'], data['w'], data['h'], 
        w, h
    )
    
    return {
        "element_score": element_score,
        "label": label,
        "advice": advice
    }