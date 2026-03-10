import React from 'react';
import { Target, ShieldCheck, Zap, Heart, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="p-10 max-w-5xl mx-auto text-white">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-xs font-bold mb-6 border border-blue-500/20">
          <Sparkles size={14} /> AI VISION PROJECT
        </div>
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
          Empowering Designers with <br />
          <span className="text-blue-500">Biological Intelligence</span>
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Capturing human attention is the ultimate currency. We provide a bridge between 
          eye-tracking research and rapid iteration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-8">
          <div className="flex gap-6 group">
            <div className="bg-slate-800 p-5 rounded-3xl h-fit group-hover:bg-blue-600 transition-colors">
              <Target size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">The Challenge</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Traditional A/B testing takes weeks. Designers often rely on intuition. 
                Our AI replaces guesswork with instantaneous visual data.
              </p>
            </div>
          </div>

          <div className="flex gap-6 group">
            <div className="bg-slate-800 p-5 rounded-3xl h-fit group-hover:bg-yellow-500 transition-colors">
              <Zap size={28} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">The AI Solution</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                By simulating the human visual cortex, we provide a mathematical 
                prediction of gaze patterns before your design even goes live.
              </p>
            </div>
          </div>
        </div>

        {/* Feature List Glassmorphism */}
        <div className="bg-slate-800/30 border border-slate-700 p-10 rounded-[3rem] backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-8">Core Principles</h3>
          <ul className="space-y-6">
            {[
              "Evidence-Based Decision Making",
              "Biologically Inspired Saliency",
              "Privacy-First Local Processing",
              "Accessibility for All Creators"
            ].map((text, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-200">
                <div className="bg-emerald-500/20 p-1 rounded-full">
                  <ShieldCheck className="text-emerald-500" size={20} />
                </div>
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="text-center py-10 border-t border-slate-800">
        <p className="text-slate-500 flex items-center justify-center gap-2 italic text-sm">
          Built with <Heart size={16} className="text-red-500 fill-red-500" /> for the Creative Community 2026.
        </p>
      </footer>
    </div>
  );
};

export default About;