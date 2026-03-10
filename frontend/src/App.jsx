import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Comparison from './pages/Comparison';
import Insights from './pages/Insights'; // Added Insights import
import About from './pages/About';       // Added About import

function App() {
  return (
    <Router>
      <div className="flex bg-slate-900 min-h-screen">
        {/* Persistent Sidebar Navigation */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <Routes>
            {/* 1. Dashboard / Intro Page */}
            <Route path="/" element={<Home />} />
            
            {/* 2. Core Feature: Single Image Analysis */}
            <Route path="/analysis" element={<Analysis />} />
            
            {/* 3. Feature: Side-by-Side Design Comparison */}
            <Route path="/comparison" element={<Comparison />} />
            
            {/* 4. Educational: Gaze Patterns & Metrics */}
            <Route path="/insights" element={<Insights />} /> 
            
            {/* 5. Project Information & Mission */}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;