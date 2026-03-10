import cv2
import numpy as np

def generate_attention_data(image_path):
    """
    Analyzes the image to generate a saliency map, heatmap, and global metrics.
    """
    image = cv2.imread(image_path)
    if image is None:
        return None
    
    # 1. AI Saliency Calculation (Mimics biological vision)
    saliency = cv2.saliency.StaticSaliencyFineGrained_create()
    success, saliency_map = saliency.computeSaliency(image)
    saliency_map = cv2.normalize(saliency_map, None, 0, 255, cv2.NORM_MINMAX).astype("uint8")
    
    # 2. Visual Heatmap Generation
    heatmap = cv2.applyColorMap(saliency_map, cv2.COLORMAP_JET)
    
    # 3. First Focus Point
    _, _, _, maxLoc = cv2.minMaxLoc(saliency_map)
    
    # 4. Element-Level Zone Scoring
    height, width = saliency_map.shape
    rows = np.array_split(saliency_map, 3, axis=0)
    zones = []
    for r in rows:
        cols = np.array_split(r, 3, axis=1)
        for c in cols:
            zones.append(np.mean(c))
    
    total_heat = sum(zones) + 1
    zone_pcts = [round((z / total_heat) * 100, 1) for z in zones]
    
    # Spatial Balance Calculation
    top_half = np.mean(saliency_map[0:height//2, :])
    bottom_half = np.mean(saliency_map[height//2:, :])
    
    # 5. AI Assistant Suggestions Logic
    avg_heat = np.mean(saliency_map)
    suggestions = []
    
    # Density & Clutter Analysis
    if avg_heat > 135:
        suggestions.append("⚠️ Design is too 'loud'. Reduce decorative elements to prevent cognitive overload.")
    elif avg_heat < 45:
        suggestions.append("💡 Visual impact is low. Use bolder colors or larger typography for key messages.")
    else:
        suggestions.append("✅ Visual density is balanced, allowing for a comfortable user journey.")
    
    # Hierarchy & Flow Analysis
    if top_half > bottom_half * 2:
        suggestions.append("📉 Top-heavy attention detected. Consider adding a 'hook' lower down to encourage scrolling.")
    
    if zone_pcts[4] < 12:
        suggestions.append("🎯 Weak Center: The 'Hero' area is being ignored. Center your primary CTA for better conversion.")
    elif zone_pcts[4] > 25:
        suggestions.append("🌟 Strong focus: Your primary content is dominating attention effectively.")

    # 6. Final Efficiency Score
    std_dev = np.std(saliency_map)
    quality_score = round(min(100, (std_dev / 128) * 100 + (avg_heat / 2)), 1)

    # UI Grid Mapping
    element_scores = [
        {"label": "Top Left (Logo/Nav)", "score": zone_pcts[0]},
        {"label": "Top Center (Header)", "score": zone_pcts[1]},
        {"label": "Top Right (Action)", "score": zone_pcts[2]},
        {"label": "Center Left (Content)", "score": zone_pcts[3]},
        {"label": "Main Center (Hero)", "score": zone_pcts[4]},
        {"label": "Center Right (Sidebar)", "score": zone_pcts[5]},
        {"label": "Bottom Area (Footer)", "score": round(np.mean(zone_pcts[6:]), 1)}
    ]

    return heatmap, maxLoc, quality_score, suggestions, element_scores, saliency_map

def calculate_element_score(heatmap_gray, x, y, w, h, img_w, img_h):
    """
    Calculates score, identifies label, and generates tailored design advice.
    """
    x1 = int((x / 100) * img_w)
    y1 = int((y / 100) * img_h)
    x2 = int(((x + w) / 100) * img_w)
    y2 = int(((y + h) / 100) * img_h)

    element_roi = heatmap_gray[y1:y2, x1:x2]
    
    if element_roi.size == 0:
        return 0, "Unknown", "No data in selected region."
    
    # Intensity calculation
    avg_intensity = np.mean(element_roi)
    score = round((avg_intensity / 255) * 100, 1)
    
    # Smart Labeling & Actionable Advice
    label = "UI Element"
    advice = "Ensure this element has sufficient whitespace to stand out."
    
    if y < 20:
        if x < 30: 
            label = "Brand Logo"
            if score < 25: advice = "Logo visibility is low. Increase contrast or size to boost brand recall."
        elif x > 70: 
            label = "Navigation/Action"
            if score < 30: advice = "Navigation is fading out. Use a high-contrast background for better findability."
        else: 
            label = "Header Content"
    elif y > 75:
        label = "Footer / CTA"
        if score < 40: advice = "This conversion area is being missed. Try using a brighter 'Action' color."
    elif 30 < y < 70 and 30 < x < 70:
        label = "Hero / Product"
        if score < 60: advice = "Main focus is weak. Remove surrounding clutter to 'push' eyes to this center."
    
    return score, label, advice