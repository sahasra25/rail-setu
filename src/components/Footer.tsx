import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0F1D] border-t border-slate-800 text-slate-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono font-black text-white text-base">RAIL<span className="text-[#FF6B00]">SETU</span></span>
              <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                Hackathon Prototype
              </span>
            </div>
            <p className="text-xs text-slate-400">
              “Bridging Maintenance and Movement — Intelligently.” An AI-Powered Automatic Block Planning System.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com/railsetu/railsetu-prototype"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-[#FF6B00] transition flex items-center space-x-1"
            >
              <span>GitHub Repo (Placeholder)</span>
              <span>↗</span>
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Team: <strong className="text-white">SetuAI Innovators</strong></span>
            <span className="text-slate-600">•</span>
            <a
              href="mailto:contact@railsetu.internal"
              className="text-slate-300 hover:text-[#FF6B00] transition"
            >
              contact@railsetu.internal
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
          <p>
            ⚠️ <strong className="text-slate-300">RAILSETU – Hackathon Prototype.</strong> All data is synthetic and for demonstration only. Not connected to real Indian Railways systems or CRIS/FOIS live databases.
          </p>
          <div className="font-mono text-[10px] text-slate-400">
            Engineered with React + Tailwind + CP-SAT Logic
          </div>
        </div>
      </div>
    </footer>
  );
};
