import React from 'react';
import { BarChart3, Eye, Compass, Lightbulb, CheckCircle2, Zap } from 'lucide-react';

const Insights = () => {
  const cards = [
    {
      title: "The 3-Second Rule",
      desc: "Users decide to stay or leave within 3 seconds. Your heatmap must show a clear 'Entry Point'.",
      icon: <Eye className="text-blue-400" />,
      color: "border-blue-500/20"
    },
    {
      title: "Visual Hierarchy",
      desc: "A successful design guides the eye from the most important element to the least. Scattered heat is a warning.",
      icon: <BarChart3 className="text-emerald-400" />,
      color: "border-emerald-500/20"
    },
    {
      title: "Scanning Patterns",
      desc: "Our AI checks for F and Z patterns. Designs aligned with natural human scanning get higher scores.",
      icon: <Compass className="text-purple-400" />,
      color: "border-purple-500/20"
    }
  ];

  return (
    <div className="p-10 max-w-6xl mx-auto text-white animate-fadeIn">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-3 tracking-tight">Design Intelligence</h2>
        <p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Scientific Gaze Patterns & Metrics</p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {cards.map((card, i) => (
          <div key={i} className={`bg-slate-800/40 p-8 rounded-3xl border ${card.color} hover:bg-slate-800/60 transition-all group`}>
            <div className="mb-6 bg-slate-900 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Optimization Section */}
      <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/10 p-10 rounded-[2.5rem] border border-blue-500/30 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Lightbulb className="text-yellow-400" /> Optimization Strategies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 rounded-2xl">
                <CheckCircle2 className="text-blue-500 shrink-0" />
                <p className="text-sm text-slate-300"><strong>Luminance Contrast:</strong> Bright elements on dark backgrounds snap the human eye faster.</p>
              </div>
              <div className="flex gap-4 p-4 bg-slate-900/50 rounded-2xl">
                <CheckCircle2 className="text-blue-500 shrink-0" />
                <p className="text-sm text-slate-300"><strong>Whitespace:</strong> Empty areas 'push' attention toward your primary CTA.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-slate-900/50 rounded-2xl">
                <CheckCircle2 className="text-blue-500 shrink-0" />
                <p className="text-sm text-slate-300"><strong>F-Pattern:</strong> Place key info on the left side for natural Western reading flow.</p>
              </div>
              <div className="flex gap-4 p-4 bg-slate-900/50 rounded-2xl">
                <Zap className="text-blue-500 shrink-0" />
                <p className="text-sm text-slate-300"><strong>Visual Weight:</strong> Size matters, but high-contrast small objects often win the focus war.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;