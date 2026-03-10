import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Upload, Activity, Target, Zap, MousePointer2, Download, Lightbulb, XCircle, Crosshair, ImageIcon, ChevronRight } from 'lucide-react';

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customElements, setCustomElements] = useState([]);
  const heatmapRef = useRef(null);

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(URL.createObjectURL(selectedFile));
    setLoading(true);
    setCustomElements([]);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData);
      setResult(response.data);
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHeatmapClick = async (e) => {
    if (!result || !heatmapRef.current) return;
    const rect = heatmapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze-element', { 
        x: x - 7, y: y - 5, w: 14, h: 10 
      });
      
      setCustomElements(prev => [{ 
        label: response.data.label, 
        score: response.data.element_score,
        advice: response.data.advice
      }, ...prev]);
    } catch (error) {
      console.error("Scanning failed", error);
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col text-white bg-[#0a0f18] overflow-hidden font-sans">
      {/* Fixed Header */}
      <header className="flex justify-between items-center mb-6 shrink-0 px-4 bg-slate-900/30 py-4 rounded-3xl border border-slate-800/50">
        <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2 italic">
          <Activity className="text-blue-500" size={28} /> DESIGN ASSISTANT PRO
        </h2>
        {result && (
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end border-r border-slate-700 pr-6">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Global Health Score</span>
              <span className={`text-3xl font-black leading-none ${result.score > 70 ? 'text-emerald-400' : 'text-blue-400'}`}>
                {result.score}%
              </span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 p-3 rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
              <Download size={20} />
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 grid grid-cols-[380px_1fr] gap-6 min-h-0">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5 min-h-0">
          <div className="bg-slate-900/50 p-4 rounded-3xl border border-slate-800 shadow-xl shrink-0">
            <label className="cursor-pointer flex items-center gap-4 group">
              <div className="bg-blue-600 p-3 rounded-2xl group-hover:scale-105 transition-transform">
                <Upload size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-200">Upload New Design</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-tight font-mono">JPG, PNG, WEBP</p>
              </div>
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          </div>

          <div className="bg-slate-900/80 rounded-[2rem] border border-slate-800 flex-1 flex flex-col min-h-0 shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
              <h3 className="font-black text-[11px] uppercase tracking-widest flex items-center gap-2 text-slate-400">
                <MousePointer2 size={16} className="text-emerald-500"/> Element Intelligence
              </h3>
              {customElements.length > 0 && (
                <button onClick={() => setCustomElements([])} className="text-[10px] font-bold text-red-500/60 hover:text-red-500 transition-colors uppercase">Clear</button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {result && (
                <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20 mb-2">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Lightbulb size={12}/> Global Insight
                  </p>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed">"{result.suggestions[0]}"</p>
                </div>
              )}

              {customElements.length > 0 ? (
                customElements.map((el, i) => (
                  <div key={i} className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden animate-slideIn">
                    <div className="p-4 flex justify-between items-center border-b border-slate-700/30">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] font-black text-slate-600 uppercase">Region</span>
                        <span className="text-xs font-bold text-slate-200">{el.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-black text-slate-600 uppercase block">Attention</span>
                        <span className="text-blue-400 font-black font-mono text-xl leading-none">{el.score}%</span>
                      </div>
                    </div>
                    {el.advice && (
                      <div className="p-3 px-4 bg-slate-950/40 flex gap-3 items-center">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${el.score > 50 ? 'bg-blue-500' : 'bg-yellow-500'}`} />
                        <p className="text-[10px] text-slate-400 font-medium italic leading-tight">{el.advice}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center py-20 px-6">
                  <Target size={40} className="mb-4" />
                  <p className="text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                    Click the heatmap to reveal <br/> element-specific AI advice
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-slate-900/50 rounded-[2.5rem] border border-slate-800 p-8 flex flex-col gap-6 min-h-0 shadow-2xl relative">
          {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center">
                <Zap className="animate-pulse text-blue-500" size={56} />
                <p className="mt-6 animate-pulse text-slate-500 font-black text-xs uppercase tracking-[0.3em]">Processing Visual Context</p>
             </div>
          ) : result ? (
            <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
                {/* Original */}
                <div className="flex flex-col min-h-0">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 px-1 flex items-center gap-2">
                    <ImageIcon size={14}/> Original Layout
                  </p>
                  <div className="flex-1 bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800 flex items-center justify-center p-6 shadow-inner relative group">
                    <img src={file} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl opacity-90" alt="Original" />
                    <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-500 text-[8px] font-black px-3 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Source Active</div>
                  </div>
                </div>

                {/* Heatmap - REMOVED BLUR */}
                <div className="flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <Crosshair size={14} className="text-red-500"/> Interactive Heatmap
                    </p>
                    <span className="text-[9px] font-bold text-blue-500/60 animate-pulse uppercase tracking-widest">Click to Analyze</span>
                  </div>
                  <div className="flex-1 bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-800 relative group cursor-crosshair flex items-center justify-center p-6 shadow-inner hover:border-blue-500/30 transition-all duration-500">
                    <img 
                      ref={heatmapRef}
                      src={result.heatmap_url} 
                      onClick={handleHeatmapClick}
                      className="max-w-full max-h-full object-contain relative z-10 transition-transform group-hover:scale-[1.01] duration-500" 
                      alt="Heatmap" 
                    />
                    {/* FIXED: Removed the blur backdrop, just a clear overlay button */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                       <div className="bg-blue-600 text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-2xl tracking-tighter whitespace-nowrap">
                          SCAN ELEMENT MODE
                       </div>
                    </div>
                  </div>
                </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-5 select-none">
              <Target size={120} />
              <p className="text-sm font-black uppercase tracking-[1em] mt-4">Awaiting Signal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;