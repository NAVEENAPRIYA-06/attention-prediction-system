import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Target, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-12 max-w-5xl mx-auto text-white">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Predict Human Focus with AI
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Stop guessing where your users look. Our AI Human Attention Prediction System uses 
          computer vision to simulate visual heatmaps in seconds.
        </p>
        <button 
          onClick={() => navigate('/analysis')}
          className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
        >
          Start Analysis <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <Zap className="text-yellow-400 mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Instant Heatmaps</h3>
          <p className="text-slate-400 text-sm">Visualize attention distribution with biologically inspired saliency maps.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <Target className="text-red-500 mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">First Focus</h3>
          <p className="text-slate-400 text-sm">Identify the exact entry point where a user's gaze first lands on your design.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <Activity className="text-blue-500 mb-4" size={32} />
          <h3 className="text-lg font-bold mb-2">Design Scores</h3>
          <p className="text-slate-400 text-sm">Get an objective Efficiency Score to compare and improve UI effectiveness.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;