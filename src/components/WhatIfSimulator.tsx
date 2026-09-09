import React, { useState } from 'react';
import { BlockPlan, Train, CorridorSection, AuditLogEntry } from '../types';
import { evaluateBlockSlot, minutesToTimeString } from '../optimizer/blockOptimizer';

interface WhatIfSimulatorProps {
  currentPlan: BlockPlan;
  trains: Train[];
  sections: CorridorSection[];
  onApplyScenarioToTimeline: (simulatedPlan: BlockPlan, simulatedTrains: Train[], auditEntry: AuditLogEntry) => void;
  onAutoReplanApprove: (replan: BlockPlan, auditEntry: AuditLogEntry) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  currentPlan,
  trains,
  sections,
  onApplyScenarioToTimeline,
  onAutoReplanApprove
}) => {
  const [scenarioType, setScenarioType] = useState<'delay' | 'emergency'>('delay');
  const [selectedTrainNum, setSelectedTrainNum] = useState('12301');
  const [additionalDelay, setAdditionalDelay] = useState(47);
  const [emergencySection, setEmergencySection] = useState('PRYJ-DDU');
  const [appliedScenario, setAppliedScenario] = useState<string | null>(null);
  const [showReplanModal, setShowReplanModal] = useState(false);

  // Generate simulated train dataset based on scenario
  const simulatedTrains: Train[] = trains.map(t => {
    if (scenarioType === 'delay' && t.number === selectedTrainNum) {
      const newDelay = t.delayMinutes + additionalDelay;
      return {
        ...t,
        delayMinutes: newDelay,
        sectionOccupancies: t.sectionOccupancies.map(occ => ({
          ...occ,
          entryMinute: (occ.entryMinute + additionalDelay) % 1440,
          exitMinute: (occ.exitMinute + additionalDelay) % 1440
        }))
      };
    }
    return t;
  });

  // Evaluate current plan under baseline vs simulated conditions
  const baselineEval = evaluateBlockSlot(currentPlan.sectionId, currentPlan.startMinute, currentPlan.durationMinutes, trains);
  const simulatedEval = evaluateBlockSlot(currentPlan.sectionId, currentPlan.startMinute, currentPlan.durationMinutes, simulatedTrains);

  // If conflict occurs in simulated state, calculate AI Re-planned alternative
  // Shift block by +90 mins to find next feasible gap
  const replanStartMinute = (currentPlan.startMinute + 90) % 1440;
  const replanEval = evaluateBlockSlot(currentPlan.sectionId, replanStartMinute, currentPlan.durationMinutes, simulatedTrains);

  const replannedPlan: BlockPlan = {
    ...currentPlan,
    id: `REPLAN-${currentPlan.id.slice(-4)}`,
    startMinute: replanStartMinute,
    endMinute: replanStartMinute + currentPlan.durationMinutes,
    proposedStartTime: minutesToTimeString(replanStartMinute),
    proposedEndTime: minutesToTimeString(replanStartMinute + currentPlan.durationMinutes),
    affectedTrainsCount: replanEval.conflictCount,
    affectedTrainNumbers: replanEval.conflictingTrains.map(t => `${t.number} (${t.name})`),
    estimatedDelayMinutes: replanEval.estimatedDelayMinutes,
    riskLevel: replanEval.riskLevel,
    isRecommended: replanEval.isRecommended,
    recommendationReason: `Auto-shifted +90 mins to bypass delayed train ${selectedTrainNum}. Zero Super-Priority collision.`,
    status: 'Proposed'
  };

  const handleApplyScenario = () => {
    setAppliedScenario(
      scenarioType === 'delay'
        ? `Train ${selectedTrainNum} delayed by +${additionalDelay}m`
        : `Emergency 90m block injected on ${emergencySection}`
    );

    const audit: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userRole: 'Safety Officer',
      action: 'Simulate Scenario',
      summary: `What-If Simulation triggered: ${scenarioType === 'delay' ? `Train ${selectedTrainNum} delayed by +${additionalDelay}m` : `Emergency block on ${emergencySection}`}`
    };

    onApplyScenarioToTimeline(currentPlan, simulatedTrains, audit);
  };

  const handleApproveReplan = () => {
    const audit: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userRole: 'Chief Controller (Traffic)',
      action: 'Auto-Replan',
      summary: `Approved Dynamic Re-Plan for ${replannedPlan.id} due to upstream delay of Train ${selectedTrainNum}. Window shifted to ${replannedPlan.proposedStartTime}-${replannedPlan.proposedEndTime}.`
    };
    onAutoReplanApprove(replannedPlan, audit);
    setShowReplanModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-white">What-If Simulation & Dynamic Re-Planner</h2>
            <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Contingency Modeling
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate operational disturbances (train delays, derailment precautions, emergency rail fractures) and evaluate plan robustness.
          </p>
        </div>

        <button
          onClick={handleApplyScenario}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center space-x-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Run Scenario Simulation</span>
        </button>
      </div>

      {/* Scenario Selector Form */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-4">
          1. Select Contingency Disturbance Scenario
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setScenarioType('delay')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              scenarioType === 'delay'
                ? 'bg-[#0F172A] border-[#FF6B00] shadow-md shadow-[#FF6B00]/10'
                : 'bg-[#0F172A]/50 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Scenario A: Train Delay Cascade</span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">Upstream Lateness</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Simulate a primary train getting delayed upstream (e.g. signal failure, fog, engine snag) pushing its section arrival into a planned block.
            </p>
          </div>

          <div
            onClick={() => setScenarioType('emergency')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              scenarioType === 'emergency'
                ? 'bg-[#0F172A] border-[#FF6B00] shadow-md shadow-[#FF6B00]/10'
                : 'bg-[#0F172A]/50 border-slate-800 opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Scenario B: Emergency Track Fracture</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">Unplanned Block</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Inject an urgent 90-minute rail fracture clamp & fishplate block into a critical section, displacing scheduled train paths.
            </p>
          </div>
        </div>

        {/* Dynamic Controls based on scenario */}
        {scenarioType === 'delay' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0F172A] p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Target Delayed Train</label>
              <select
                value={selectedTrainNum}
                onChange={(e) => setSelectedTrainNum(e.target.value)}
                className="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
              >
                {trains.map(t => (
                  <option key={t.number} value={t.number}>
                    {t.number} — {t.name} ({t.priority})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Additional Upstream Delay: <span className="text-[#FF6B00] font-bold">+{additionalDelay} min</span>
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="5"
                value={additionalDelay}
                onChange={(e) => setAdditionalDelay(Number(e.target.value))}
                className="w-full accent-[#FF6B00] cursor-pointer mt-2"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0F172A] p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Emergency Fracture Section</label>
              <select
                value={emergencySection}
                onChange={(e) => setEmergencySection(e.target.value)}
                className="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
              >
                {sections.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.id} — {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Safety Mandate</label>
              <div className="text-xs text-amber-400 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 font-mono">
                Immediate 90-min clamp fixture; Speed restriction 20 km/h applied.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side-by-Side Comparison Table */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            2. Impact Analysis: Current Baseline vs Simulated Scenario
          </h3>
          {appliedScenario && (
            <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-0.5 rounded-full border border-indigo-500/30">
              Active: {appliedScenario}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0F172A] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
              <tr>
                <th className="py-3 px-4">Evaluation Metric</th>
                <th className="py-3 px-4">Baseline Plan ({currentPlan.id})</th>
                <th className="py-3 px-4 text-amber-400">Simulated Scenario</th>
                <th className="py-3 px-4">Variance / Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans font-semibold text-white">Block Time Window</td>
                <td className="py-3 px-4">{currentPlan.proposedStartTime} – {currentPlan.proposedEndTime} ({currentPlan.durationMinutes}m)</td>
                <td className="py-3 px-4 text-amber-300">{currentPlan.proposedStartTime} – {currentPlan.proposedEndTime}</td>
                <td className="py-3 px-4 text-slate-400">0 min</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-semibold text-white">Estimated Network Delay</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">{baselineEval.estimatedDelayMinutes} min</td>
                <td className="py-3 px-4 text-red-400 font-bold">{simulatedEval.estimatedDelayMinutes} min</td>
                <td className="py-3 px-4 text-red-400 font-bold">+{simulatedEval.estimatedDelayMinutes - baselineEval.estimatedDelayMinutes} min</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-semibold text-white">Conflicting Train Count</td>
                <td className="py-3 px-4">{baselineEval.conflictCount} Trains</td>
                <td className="py-3 px-4 text-amber-400">{simulatedEval.conflictCount} Trains</td>
                <td className="py-3 px-4">{simulatedEval.conflictCount - baselineEval.conflictCount > 0 ? `+${simulatedEval.conflictCount - baselineEval.conflictCount}` : '0'}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-semibold text-white">Super-Priority Impact (Rajdhani)</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">{baselineEval.superPriorityCount > 0 ? 'Conflict' : 'Zero (Clear)'}</td>
                <td className="py-3 px-4 font-semibold text-red-400">
                  {simulatedEval.superPriorityCount > 0 ? 'CRITICAL OVERLAP' : 'Clear'}
                </td>
                <td className="py-3 px-4">
                  {simulatedEval.superPriorityCount > 0 ? (
                    <span className="text-red-400 font-bold">⚠️ Violation</span>
                  ) : (
                    <span className="text-emerald-400">Maintained</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-semibold text-white">Safety & Risk Assessment</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    baselineEval.riskLevel === 'Low' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {baselineEval.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    simulatedEval.riskLevel === 'High' ? 'bg-red-500/20 text-red-300 font-bold' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {simulatedEval.riskLevel}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans text-xs">
                  {simulatedEval.riskLevel !== baselineEval.riskLevel ? 'Risk Elevated' : 'Unchanged'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Re-Plan Trigger Panel */}
      <div className="bg-gradient-to-r from-[#1E293B] via-slate-900 to-[#1E293B] border-2 border-red-500/40 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <h4 className="text-base font-bold text-white">Dynamic Re-Planning Trigger Detected</h4>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/40">
                CRITICAL WARNING
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Train <strong className="text-white">{selectedTrainNum}</strong> delayed by {additionalDelay} minutes causes an unavoidable conflict with current block <strong className="text-white">{currentPlan.id}</strong> on section <strong className="text-[#FF6B00]">{currentPlan.sectionId}</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowReplanModal(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-amber-500 hover:from-[#ff7b1a] hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF6B00]/25 transition flex items-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Review AI Auto-Replan</span>
          </button>
        </div>
      </div>

      {/* AI Re-Plan Modal / Comparison */}
      {showReplanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-scaleIn">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-[#FF6B00] font-bold">Dynamic Re-Plan Recommendation</span>
                <h3 className="text-xl font-bold text-white mt-1">Resolve Conflict on {currentPlan.sectionId}</h3>
              </div>
              <button
                onClick={() => setShowReplanModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Old Plan */}
              <div className="bg-[#0F172A] p-4 rounded-xl border border-red-500/40">
                <span className="text-[10px] font-mono text-red-400 uppercase font-bold">Original Plan (Conflicted)</span>
                <div className="text-lg font-black font-mono text-white mt-1">
                  {currentPlan.proposedStartTime} – {currentPlan.proposedEndTime}
                </div>
                <div className="text-xs text-red-400 mt-2 font-mono">
                  ✕ Overlaps Train {selectedTrainNum}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Est. Delay: <strong className="text-white">{simulatedEval.estimatedDelayMinutes} min</strong>
                </div>
              </div>

              {/* New Re-Planned Window */}
              <div className="bg-[#0F172A] p-4 rounded-xl border border-emerald-500/40">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">AI Recommended Re-Plan</span>
                <div className="text-lg font-black font-mono text-emerald-400 mt-1">
                  {replannedPlan.proposedStartTime} – {replannedPlan.proposedEndTime}
                </div>
                <div className="text-xs text-emerald-400 mt-2 font-mono">
                  ✓ Window shifted by +90 min
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Est. Delay: <strong className="text-emerald-400">{replanEval.estimatedDelayMinutes} min</strong> (Clear)
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <strong className="text-white font-mono uppercase text-[11px]">Solver Rationale:</strong> Shifting the block to {replannedPlan.proposedStartTime} allows Train {selectedTrainNum} to clear the section safely without holding back subsequent Rajdhani services. Crew Gang 14 shift limits remain satisfied.
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowReplanModal(false)}
                className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
              >
                Keep Current (Manual Hold)
              </button>

              <button
                onClick={handleApproveReplan}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Approve & Apply New Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
