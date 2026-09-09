import React from 'react';
import { CorridorSection, MaintenanceRequest, BlockPlan } from '../types';

interface DashboardProps {
  sections: CorridorSection[];
  requests: MaintenanceRequest[];
  blockPlans: BlockPlan[];
  onCreateRequest: () => void;
  onRunPlanner: () => void;
  onViewConflicts: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  sections,
  requests,
  blockPlans,
  onCreateRequest,
  onRunPlanner,
  onViewConflicts,
  onSelectSection
}) => {
  const criticalTasksCount = requests.filter(r => r.priority === 'Critical').length;
  const activeBlocksCount = blockPlans.filter(b => b.status === 'Approved' || b.status === 'Proposed').length;
  const conflictSections = sections.filter(s => s.status === 'Conflict');
  const availableCount = sections.filter(s => s.status === 'Available').length;
  const availabilityPct = Math.round((availableCount / sections.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header with Title and Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-white">Railway Operations Command Center</h2>
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Live Monitoring
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time track availability, maintenance block status, and active train conflict index across NDLS–HWH trunk line.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onCreateRequest}
            className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#FF6B00]/20 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Request</span>
          </button>

          <button
            onClick={onRunPlanner}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-violet-600/20 transition flex items-center space-x-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Run Planner</span>
          </button>

          <button
            onClick={onViewConflicts}
            className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-red-400 border border-red-500/40 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>View Conflicts ({conflictSections.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Asset Availability */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Asset Availability</span>
              <div className="text-3xl font-black font-mono text-[#22C55E] mt-1">{availabilityPct}%</div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {availableCount} of {sections.length} trunk sections clear
              </span>
            </div>
            <div className="p-3 bg-emerald-500/10 text-[#22C55E] rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: `${availabilityPct}%` }}></div>
          </div>
        </div>

        {/* Active Blocks */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Planned Blocks</span>
              <div className="text-3xl font-black font-mono text-[#F59E0B] mt-1">{activeBlocksCount}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Scheduled in current 24h cycle
              </span>
            </div>
            <div className="p-3 bg-amber-500/10 text-[#F59E0B] rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-amber-400">
            <span>PQRS Renewal + OHE Inspection</span>
          </div>
        </div>

        {/* Open Conflicts */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-red-500/40 transition">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Open Conflicts</span>
              <div className="text-3xl font-black font-mono text-[#EF4444] mt-1">{conflictSections.length}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Requires re-plan or diversion
              </span>
            </div>
            <div className="p-3 bg-red-500/10 text-[#EF4444] rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-red-400">
            <span className="font-semibold">Section PRYJ–DDU flagged</span>
          </div>
        </div>

        {/* Critical Maintenance Tasks */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-orange-500/40 transition">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Critical Tasks</span>
              <div className="text-3xl font-black font-mono text-[#F97316] mt-1">{criticalTasksCount}</div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Safety-critical track renewal requests
              </span>
            </div>
            <div className="p-3 bg-orange-500/10 text-[#F97316] rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-[11px] text-orange-400">
            <span>High rail fatigue threshold</span>
          </div>
        </div>
      </div>

      {/* Corridor Visual Status Map & Section List */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">NDLS ⇄ HWH Trunk Corridor Status Map</h3>
            <p className="text-xs text-slate-400">Interactive overview of section capacity, block allocation, and speed ratings</p>
          </div>
          {/* Legend */}
          <div className="flex items-center space-x-4 text-xs mt-3 sm:mt-0 font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
              <span className="text-slate-300">Available</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
              <span className="text-slate-300">Block Planned</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
              <span className="text-slate-300">Conflict Flagged</span>
            </div>
          </div>
        </div>

        {/* Linear Corridor Visualization */}
        <div className="relative py-6 overflow-x-auto">
          <div className="min-w-[800px] flex items-center justify-between relative px-6">
            {/* Background Rail line */}
            <div className="absolute top-1/2 left-8 right-8 h-2 bg-slate-700 -translate-y-1/2 rounded-full z-0"></div>

            {sections.map((section, idx) => {
              const statusBg =
                section.status === 'Available'
                  ? 'bg-[#22C55E] border-emerald-400 shadow-[#22C55E]/40'
                  : section.status === 'Block Planned'
                  ? 'bg-[#F59E0B] border-amber-400 shadow-[#F59E0B]/40 animate-pulse'
                  : 'bg-[#EF4444] border-red-400 shadow-[#EF4444]/40 animate-bounce';

              return (
                <div
                  key={section.id}
                  onClick={() => onSelectSection(section.id)}
                  className="relative z-10 flex flex-col items-center cursor-pointer group"
                >
                  {/* Node Icon */}
                  <div className={`w-8 h-8 rounded-full border-2 ${statusBg} flex items-center justify-center text-white shadow-lg group-hover:scale-125 transition-transform`}>
                    <span className="text-[10px] font-black">{idx + 1}</span>
                  </div>
                  
                  {/* Label */}
                  <div className="mt-3 text-center">
                    <div className="text-xs font-mono font-bold text-white group-hover:text-[#FF6B00] transition-colors">
                      {section.id}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{section.lengthKm} km</div>
                    <span className={`inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                      section.status === 'Available' ? 'bg-emerald-500/20 text-emerald-300' :
                      section.status === 'Block Planned' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {section.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Sections Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 font-normal">
            <thead className="bg-[#0F172A] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
              <tr>
                <th className="py-3 px-4">Section ID</th>
                <th className="py-3 px-4">Section Name</th>
                <th className="py-3 px-4">Route Distance</th>
                <th className="py-3 px-4">Tracks</th>
                <th className="py-3 px-4">Max Speed</th>
                <th className="py-3 px-4">Operating Division</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
              {sections.map((section) => (
                <tr key={section.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{section.id}</td>
                  <td className="py-3 px-4 font-sans font-medium text-slate-200">{section.name}</td>
                  <td className="py-3 px-4">{section.lengthKm} km</td>
                  <td className="py-3 px-4 text-slate-300">{section.tracks} Track Electrified</td>
                  <td className="py-3 px-4 text-amber-400">{section.maxSpeedKmH} km/h</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">{section.division}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      section.status === 'Available' ? 'bg-emerald-500/10 text-[#22C55E] border border-emerald-500/30' :
                      section.status === 'Block Planned' ? 'bg-amber-500/10 text-[#F59E0B] border border-amber-500/30' :
                      'bg-red-500/10 text-[#EF4444] border border-red-500/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        section.status === 'Available' ? 'bg-[#22C55E]' :
                        section.status === 'Block Planned' ? 'bg-[#F59E0B]' :
                        'bg-[#EF4444]'
                      }`}></span>
                      <span>{section.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => onSelectSection(section.id)}
                      className="text-[#FF6B00] hover:text-amber-400 text-xs font-semibold cursor-pointer"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
