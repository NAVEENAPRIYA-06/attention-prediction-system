import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Zap } from 'lucide-react';

const Comparison = () => {
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompare = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setLoading(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/analyze', formData);
      if (type === 'A') setDataA(res.data);
      else setDataB(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Design Comparison</h2>
      <div className="grid grid-cols-2 gap-8">
        {/* Design A */}
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-xl border-2 border-dashed border-slate-700">
            <input type="file" onChange={(e) => handleCompare(e, 'A')} className="w-full text-sm" />
          </div>
          {dataA && (
            <div className="bg-slate-800 p-4 rounded-xl border border-blue-500/30">
              <img src={dataA.heatmap_url} className="rounded-lg mb-2" alt="Heatmap A" />
              <p className="text-center font-bold">Design A Score: {dataA.score}%</p>
            </div>
          )}
        </div>

        {/* Design B */}
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-xl border-2 border-dashed border-slate-700">
            <input type="file" onChange={(e) => handleCompare(e, 'B')} className="w-full text-sm" />
          </div>
          {dataB && (
            <div className="bg-slate-800 p-4 rounded-xl border border-green-500/30">
              <img src={dataB.heatmap_url} className="rounded-lg mb-2" alt="Heatmap B" />
              <p className="text-center font-bold">Design B Score: {dataB.score}%</p>
            </div>
          )}
        </div>
      </div>

      {dataA && dataB && (
        <div className="mt-12 bg-blue-600/20 border border-blue-500 p-6 rounded-2xl text-center">
          <Zap className="inline-block text-yellow-400 mb-2" size={32} />
          <h3 className="text-xl font-bold italic">
            AI Recommendation: {dataA.score > dataB.score ? "Design A is more effective" : "Design B is more effective"}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Comparison;