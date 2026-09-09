import React, { useState } from 'react';
import { MaintenanceRequest, BlockPlan, Train, CorridorSection } from '../types';
import { findBestBlockPlans } from '../optimizer/blockOptimizer';
import { InteractiveTimeline } from './InteractiveTimeline';

interface BlockPlannerProps {
  requests: MaintenanceRequest[];
  trains: Train[];
  sections: CorridorSection[];
  onApprovePlan: (plan: BlockPlan) => void;
  onRequestSelect?: (requestId: string) => void;
}

export const BlockPlanner: React.FC<BlockPlannerProps> = ({
  requests,
  trains,
  sections,
  onApprovePlan,
}) => {
  const [selectedRequestIds, setSelectedRequestIds] = useState<string[]>([requests[0]?.id || 'REQ-2026-081']);
  const [activeRequestId, setActiveRequestId] = useState<string>(requests[0]?.id || 'REQ-2026-081');
  const [planningDate, setPlanningDate] = useState('2026-09-08');
  const [horizonHours, setHorizonHours] = useState('24');
  const [optimizationPriority, setOptimizationPriority] = useState<'Balanced' | 'Minimum Delay' | 'Urgent Maintenance'>('Balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activePlan, setActivePlan] = useState<BlockPlan | null>(null);
  const [candidatePlans, setCandidatePlans] = useState<BlockPlan[]>([]);

  // Find currently active request
  const currentRequest = requests.find(r => r.id === activeRequestId) || requests[0];

  const handleToggleRequest = (reqId: string) => {
    setSelectedRequestIds(prev =>
      prev.includes(reqId) ? prev.filter(id => id !== reqId) : [...prev, reqId]
    );
    setActiveRequestId(reqId);
  };

  const handleRunOptimizer = () => {
    if (!currentRequest) return;
    setIsOptimizing(true);
    setActivePlan(null);

    setTimeout(() => {
      const plans = findBestBlockPlans(currentRequest, trains, optimizationPriority);
      setCandidatePlans(plans);
      setActivePlan(plans[0] || null);
      setIsOptimizing(false);
    }, 750);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-white">Automatic AI Block Planner</h2>
            <span className="bg-violet-500/20 text-violet-400 border border-violet-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Google OR-Tools CP-SAT Heuristics
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate pending maintenance requisitions against scheduled train occupancies to find minimal-disruption windows.
          </p>
        </div>

        <button
          onClick={handleRunOptimizer}
          disabled={isOptimizing || !currentRequest}
          className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/25 transition flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
        >
          {isOptimizing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Optimizing Windows...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Find Best Block Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Top Configuration & Queue Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Requests Queue (7 cols) */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Pending Maintenance Demands ({requests.length})
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Select target to optimize</span>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {requests.map((req) => {
              const isSelected = selectedRequestIds.includes(req.id);
              const isActive = activeRequestId === req.id;

              return (
                <div
                  key={req.id}
                  onClick={() => {
                    setActiveRequestId(req.id);
                    if (!selectedRequestIds.includes(req.id)) {
                      setSelectedRequestIds(prev => [...prev, req.id]);
                    }
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                    isActive
                      ? 'bg-slate-800/90 border-[#FF6B00] shadow-md shadow-[#FF6B00]/10'
                      : isSelected
                      ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                      : 'bg-[#0F172A] border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleRequest(req.id)}
                    className="mt-1 accent-[#FF6B00] rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-white text-xs">{req.id}</span>
                        <span className="text-[10px] font-mono bg-[#0F172A] text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                          {req.sectionId}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          req.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          req.priority === 'High' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {req.priority}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-300 font-bold">{req.minDurationMinutes}m</span>
                    </div>

                    <div className="text-xs text-slate-200 font-medium mt-1">{req.workType}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{req.reason}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Optimizer Objective Settings (5 cols) */}
        <div className="lg:col-span-5 bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Optimization Horizon & Criteria
          </h3>

          <div className="space-y-3 text-xs">
            {/* Planning Date */}
            <div>
              <label className="block font-mono text-slate-400 uppercase text-[10px] mb-1">
                Target Planning Date
              </label>
              <input
                type="date"
                value={planningDate}
                onChange={(e) => setPlanningDate(e.target.value)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            {/* Horizon */}
            <div>
              <label className="block font-mono text-slate-400 uppercase text-[10px] mb-1">
                Lookahead Horizon
              </label>
              <select
                value={horizonHours}
                onChange={(e) => setHorizonHours(e.target.value)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="12">Next 12 Hours (Urgent Shift)</option>
                <option value="24">Next 24 Hours (Standard Day Cycle)</option>
                <option value="48">Next 48 Hours (Weekend Megablock)</option>
              </select>
            </div>

            {/* Objective */}
            <div>
              <label className="block font-mono text-slate-400 uppercase text-[10px] mb-1">
                Optimization Priority Function
              </label>
              <div className="space-y-1.5">
                {(['Balanced', 'Minimum Delay', 'Urgent Maintenance'] as const).map((obj) => (
                  <label
                    key={obj}
                    className={`flex items-center space-x-2 p-2 rounded-xl border cursor-pointer transition ${
                      optimizationPriority === obj
                        ? 'bg-violet-950/40 border-violet-500/60 text-white'
                        : 'bg-[#0F172A] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priorityObjective"
                      value={obj}
                      checked={optimizationPriority === obj}
                      onChange={() => setOptimizationPriority(obj)}
                      className="accent-violet-500"
                    />
                    <div>
                      <span className="font-semibold text-xs text-white">{obj}</span>
                      <span className="text-[10px] text-slate-400 block">
                        {obj === 'Balanced' ? 'Tradeoff passenger delay minutes against maintenance turnaround.' :
                         obj === 'Minimum Delay' ? 'Strictly prioritize high-speed train schedules at all costs.' :
                         'Prioritize asset safety and early slot execution.'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Candidate Plans (When Generated) */}
      {candidatePlans.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">AI-Ranked Alternative Block Windows</h3>
              <p className="text-xs text-slate-400">Click an alternative candidate to load it into the interactive timeline</p>
            </div>
            <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/30">
              Ranked by CP-SAT Objective
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidatePlans.map((cand, idx) => {
              const isSelected = activePlan?.id === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => setActivePlan(cand)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-800 border-[#FF6B00] shadow-lg shadow-[#FF6B00]/15'
                      : 'bg-[#1E293B] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-white">
                      Candidate {idx + 1} {idx === 0 && '★ Optimal'}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      cand.isRecommended ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      Score: {cand.recommendationScore}/100
                    </span>
                  </div>

                  <div className="text-lg font-black font-mono text-[#FF6B00]">
                    {cand.proposedStartTime} – {cand.proposedEndTime}
                  </div>

                  <div className="text-xs text-slate-300 mt-1">
                    Delay: <strong className="font-mono text-white">{cand.estimatedDelayMinutes} min</strong> • Conflicts: <strong className="font-mono text-white">{cand.affectedTrainsCount}</strong>
                  </div>

                  <div className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                    {cand.recommendationReason}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Gantt Timeline with Drag-and-Drop */}
      {activePlan ? (
        <div className="space-y-2">
          <InteractiveTimeline
            plan={activePlan}
            trains={trains}
            sections={sections}
            onUpdatePlan={(updated) => {
              setActivePlan(updated);
            }}
            onProceedToApproval={(finalPlan) => {
              onApprovePlan(finalPlan);
            }}
          />
        </div>
      ) : (
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-[#FF6B00]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-base font-bold text-white">Ready to Optimize Corridor Blocks</h4>
          <p className="text-xs max-w-md mx-auto">
            Click <strong className="text-white">“Find Best Block Plan”</strong> above to run the constraint solver across the 24-hour timetable.
          </p>
          <button
            onClick={handleRunOptimizer}
            className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Run Optimizer Now
          </button>
        </div>
      )}
    </div>
  );
};
