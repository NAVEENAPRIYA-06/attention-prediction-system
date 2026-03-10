import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Activity, Target, Zap, Lightbulb } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(URL.createObjectURL(selectedFile));
    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image", error);
      alert("Failed to analyze image. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-3">
          <Activity className="text-blue-500" /> AI Attention Predictor
        </h1>
        <p className="text-slate-400">Upload a design to see where users look first.</p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Upload Section --- */}
        <div className="bg-slate-800 p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-blue-500 transition-all">
          <label className="cursor-pointer flex flex-col items-center justify-center h-64">
            <Upload size={48} className="mb-4 text-slate-500" />
            <span className="text-lg font-medium text-slate-300">Click to upload design</span>
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
          </label>
          {file && (
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Original Preview</p>
              <img src={file} alt="Preview" className="rounded-lg max-h-64 mx-auto shadow-lg" />
            </div>
          )}
        </div>

        {/* --- Results Section --- */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="text-slate-400 animate-pulse">AI is tracking gaze patterns...</p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Score and Focus Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1 text-slate-400 text-sm">
                    <Zap size={16} className="text-yellow-400" />
                    <span>Efficiency</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{result.score}%</span>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 mb-1 text-slate-400 text-sm">
                    <Target size={16} className="text-red-500" />
                    <span>First Focus</span>
                  </div>
                  <span className="text-sm font-mono text-slate-300">
                    X: {result.first_focus.x}, Y: {result.first_focus.y}
                  </span>
                </div>
              </div>

              {/* Heatmap Image */}
              <div className="relative">
                <p className="text-sm text-slate-400 mb-2 font-medium">Attention Heatmap:</p>
                <div className="relative inline-block w-full">
                  <img 
                    src={result.heatmap_url} 
                    alt="Heatmap" 
                    className="rounded-lg shadow-2xl border border-slate-600 w-full" 
                  />
                </div>
              </div>

              {/* --- AI Recommendations Section --- */}
              <div className="mt-6 border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="text-yellow-400" size={20} />
                  AI Design Recommendations
                </h3>
                <div className="space-y-3">
                  {result.suggestions && result.suggestions.length > 0 ? (
                    result.suggestions.map((msg, index) => (
                      <div 
                        key={index} 
                        className="text-sm bg-slate-900/80 p-3 rounded-lg border-l-4 border-blue-500 text-slate-300 leading-relaxed shadow-sm"
                      >
                        {msg}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic text-sm">No specific suggestions for this layout.</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 italic space-y-2">
              <Activity size={40} className="opacity-20" />
              <p>Upload an image to generate insights...</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="mt-12 text-center text-slate-600 text-xs">
        &copy; 2026 AI Human Attention Prediction System • Powered by OpenCV Saliency
      </footer>
    </div>
  );
}

export default App;