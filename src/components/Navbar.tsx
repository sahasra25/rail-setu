import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTime: string;
  pendingRequestsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentTime,
  pendingRequestsCount
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview & Flow' },
    { id: 'dashboard', label: 'Command Dashboard' },
    { id: 'tracker', label: 'Live Trains & Timetable' },
    { id: 'request', label: 'Submit Block Request' },
    { id: 'planner', label: 'Auto Planner & Timeline', badge: pendingRequestsCount > 0 ? `${pendingRequestsCount}` : undefined },
    { id: 'whatif', label: 'What-If Simulation' },
    { id: 'audit', label: 'Approval & Audit Trail' },
    { id: 'architecture', label: 'Architecture & Scope' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur border-b border-slate-800 shadow-xl">
      {/* Top Banner */}
      <div className="bg-[#1E293B] px-4 py-1 text-xs text-slate-300 flex justify-between items-center border-b border-slate-700/60">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono text-emerald-400 font-semibold tracking-wider">SYSTEM ONLINE</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">DEMO DIVISION: Prayagraj – Pt. Deen Dayal Upadhyaya Trunk</span>
          <span className="bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border border-[#FF6B00]/40">
            Synthetic Demo Data Only
          </span>
        </div>
        <div className="flex items-center space-x-4 font-mono text-xs text-slate-300">
          <span>CORRIDOR: NDLS ⇄ HWH</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-semibold">SIM TIME: {currentTime} IST</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('overview')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-amber-600 flex items-center justify-center shadow-lg shadow-[#FF6B00]/20 group-hover:scale-105 transition-transform">
              {/* Train Track Bridge SVG */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15h16" />
                <path d="M4 9h16" />
                <path d="M7 6v12" />
                <path d="M17 6v12" />
                <path d="m3 19 18 0" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-wider text-white">RAIL<span className="text-[#FF6B00]">SETU</span></span>
                <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded font-mono">v1.0-PROTOTYPE</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-tight hidden sm:block">
                Bridging Maintenance & Movement — Intelligently
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all relative flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#1E293B] text-white border border-[#FF6B00]/60 shadow-md shadow-[#FF6B00]/10 text-[#FF6B00]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-[#FF6B00] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('planner')}
              className="bg-gradient-to-r from-[#FF6B00] to-amber-500 hover:from-[#ff7b1a] hover:to-amber-400 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-lg shadow-[#FF6B00]/25 transition flex items-center space-x-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Auto Planner</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
