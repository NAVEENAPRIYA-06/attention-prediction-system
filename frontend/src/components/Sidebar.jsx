import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Activity, Layers, Info, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Home', icon: <Home size={20} />, path: '/' },
    { name: 'Attention Analysis', icon: <Activity size={20} />, path: '/analysis' },
    { name: 'Design Comparison', icon: <Layers size={20} />, path: '/comparison' },
    { name: 'Results & Insights', icon: <BarChart3 size={20} />, path: '/insights' },
    { name: 'About Project', icon: <Info size={20} />, path: '/about' },
  ];

  return (
    <div className="w-64 bg-slate-950 h-screen sticky top-0 border-r border-slate-800 p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <Activity className="text-blue-500" size={28} />
        <h1 className="text-xl font-bold text-white tracking-tight">AI Vision</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              location.pathname === item.path 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;