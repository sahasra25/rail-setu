import React, { useState, useRef, useEffect } from 'react';
import { BlockPlan, Train, CorridorSection } from '../types';
import { evaluateBlockSlot, minutesToTimeString } from '../optimizer/blockOptimizer';

interface InteractiveTimelineProps {
  plan: BlockPlan;
  trains: Train[];
  sections: CorridorSection[];
  onUpdatePlan: (updatedPlan: BlockPlan) => void;
  onProceedToApproval: (plan: BlockPlan) => void;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  plan,
  trains,
  sections,
  onUpdatePlan,
  onProceedToApproval
}) => {
  const [currentStartMinute, setCurrentStartMinute] = useState(plan.startMinute);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartMinute, setDragStartMinute] = useState(plan.startMinute);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Sync when plan changes from external selection
  useEffect(() => {
    setCurrentStartMinute(plan.startMinute);
  }, [plan.id, plan.startMinute]);

  // Re-evaluate on start minute change
  const currentDuration = plan.durationMinutes;
  const evalResult = evaluateBlockSlot(plan.sectionId, currentStartMinute, currentDuration, trains);

  const handleMinuteChange = (newMinute: number) => {
    const clamped = Math.max(0, Math.min(1440 - currentDuration, newMinute));
    setCurrentStartMinute(clamped);

    const res = evaluateBlockSlot(plan.sectionId, clamped, currentDuration, trains);
    const updated: BlockPlan = {
      ...plan,
      startMinute: clamped,
      endMinute: clamped + currentDuration,
      proposedStartTime: minutesToTimeString(clamped),
      proposedEndTime: minutesToTimeString(clamped + currentDuration),
      affectedTrainsCount: res.conflictCount,
      affectedTrainNumbers: res.conflictingTrains.map(t => `${t.number} (${t.name})`),
      estimatedDelayMinutes: res.estimatedDelayMinutes,
      priorityTrainImpact: res.priorityTrainImpact,
      riskLevel: res.riskLevel,
      recommendationScore: res.recommendationScore,
      recommendationReason: res.recommendationReason,
      isRecommended: res.isRecommended,
      status: 'Modified'
    };
    onUpdatePlan(updated);
  };

  // Mouse Drag handlers on the timeline
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartMinute(currentStartMinute);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const pixelDelta = e.clientX - dragStartX;
    const minutesDelta = Math.round((pixelDelta / rect.width) * 1440);
    // Snap to 15-minute increments for clean railway scheduling
    const snappedMinutes = Math.round((dragStartMinute + minutesDelta) / 15) * 15;
    handleMinuteChange(snappedMinutes);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const hours = Array.from({ length: 25 }, (_, i) => i); // 00 to 24

  return (
    <div className="space-y-6 select-none" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      {/* Top Outcome & Evaluation Bar */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black font-mono text-white">PLAN: {plan.id}</span>
              <span className="text-xs bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 px-2 py-0.5 rounded font-mono font-bold">
                {plan.sectionId}
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">
                {plan.workType}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400 font-mono">
              <span>Proposed Window: <strong className="text-white">{minutesToTimeString(currentStartMinute)} – {minutesToTimeString(currentStartMinute + currentDuration)}</strong> ({currentDuration}m)</span>
              <span>•</span>
              <span>Crew: <strong className="text-slate-200">{plan.team}</strong></span>
            </div>
          </div>

          {/* Quick Shift Controls */}
          <div className="flex items-center space-x-2 w-full lg:w-auto">
            <button
              onClick={() => handleMinuteChange(currentStartMinute - 30)}
              className="px-2.5 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700 transition cursor-pointer"
              title="Shift earlier by 30 mins"
            >
              ◀ -30m
            </button>
            <button
              onClick={() => handleMinuteChange(currentStartMinute + 30)}
              className="px-2.5 py-1.5 bg-[#0F172A] hover:bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700 transition cursor-pointer"
              title="Shift later by 30 mins"
            >
              +30m ▶
            </button>

            <button
              onClick={() => onProceedToApproval({
                ...plan,
                startMinute: currentStartMinute,
                endMinute: currentStartMinute + currentDuration,
                proposedStartTime: minutesToTimeString(currentStartMinute),
                proposedEndTime: minutesToTimeString(currentStartMinute + currentDuration),
                affectedTrainsCount: evalResult.conflictCount,
                estimatedDelayMinutes: evalResult.estimatedDelayMinutes,
                riskLevel: evalResult.riskLevel,
                isRecommended: evalResult.isRecommended
              })}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center space-x-1.5 cursor-pointer ml-auto lg:ml-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Submit for Approval</span>
            </button>
          </div>
        </div>

        {/* 3 Outcome Cards & Live Recommendation Rationale */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {/* Card 1: Estimated Delay */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400">Estimated Total Delay</span>
            <div className={`text-2xl font-black font-mono mt-0.5 ${
              evalResult.estimatedDelayMinutes === 0 ? 'text-[#22C55E]' :
              evalResult.estimatedDelayMinutes <= 30 ? 'text-amber-400' : 'text-[#EF4444]'
            }`}>
              {evalResult.estimatedDelayMinutes} min
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Passenger & freight weighted loss
            </div>
          </div>

          {/* Card 2: Priority Conflicts */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400">Priority Train Conflicts</span>
            <div className={`text-2xl font-black font-mono mt-0.5 ${
              evalResult.superPriorityCount > 0 ? 'text-[#EF4444]' :
              evalResult.highPriorityCount > 0 ? 'text-amber-400' : 'text-[#22C55E]'
            }`}>
              {evalResult.superPriorityCount + evalResult.highPriorityCount} Trains
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {evalResult.superPriorityCount > 0 ? 'Super-Priority impacted!' : 'Rajdhani clear'}
            </div>
          </div>

          {/* Card 3: Risk Level */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400">Safety & Execution Risk</span>
            <div className={`text-2xl font-black font-mono mt-0.5 ${
              evalResult.riskLevel === 'Low' ? 'text-[#22C55E]' :
              evalResult.riskLevel === 'Medium' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
            }`}>
              {evalResult.riskLevel} Risk
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Score: {evalResult.recommendationScore} / 100
            </div>
          </div>

          {/* Card 4: AI Recommendation Verdict */}
          <div className={`p-4 rounded-xl border ${
            evalResult.isRecommended
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}>
            <div className="flex items-center space-x-1.5 font-bold text-xs uppercase font-mono">
              <span>{evalResult.isRecommended ? '✓ Recommended Window' : '✕ Not Recommended'}</span>
            </div>
            <p className="text-[11px] mt-1.5 leading-snug">
              {evalResult.recommendationReason}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Gantt Timeline Container */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>Corridor Occupancy Gantt Chart</span>
              <span className="text-[10px] font-mono bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded border border-[#FF6B00]/40">
                DRAG AMBER BLOCK TO TEST SLOTS
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Drag the maintenance window horizontally. Red highlights indicate train head-on conflict or safety buffer overlap.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-2 bg-[#F59E0B] rounded-sm"></span>
              <span className="text-slate-300">Block Slot</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-2 bg-[#EF4444] rounded-sm"></span>
              <span className="text-slate-300">Conflict / Rajdhani</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-2 bg-[#3B82F6] rounded-sm"></span>
              <span className="text-slate-300">Vande Bharat</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-2 bg-[#06B6D4] rounded-sm"></span>
              <span className="text-slate-300">Mail / Express</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="w-3 h-2 bg-[#64748B] rounded-sm"></span>
              <span className="text-slate-300">Freight</span>
            </div>
          </div>
        </div>

        {/* Time Slider for Precise Touch / Click Adjustment */}
        <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-800 flex items-center space-x-4">
          <span className="text-xs font-mono text-slate-400 font-bold whitespace-nowrap">
            Fine Slider (00:00 - 24:00):
          </span>
          <input
            type="range"
            min="0"
            max={1440 - currentDuration}
            step="15"
            value={currentStartMinute}
            onChange={(e) => handleMinuteChange(Number(e.target.value))}
            className="w-full accent-[#FF6B00] cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-amber-400 bg-slate-800 px-2 py-1 rounded">
            {minutesToTimeString(currentStartMinute)}
          </span>
        </div>

        {/* The Gantt Board */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl bg-[#0F172A]">
          <div className="min-w-[960px] p-4">
            {/* Hour Axis Header */}
            <div className="grid grid-cols-24 border-b border-slate-800 pb-2 text-[10px] font-mono text-slate-400 pl-36">
              {hours.slice(0, 24).map((h) => (
                <div key={h} className="text-center border-l border-slate-800/60 first:border-none">
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* Section Rows */}
            <div className="space-y-3 pt-3" ref={timelineRef} onMouseMove={handleMouseMove}>
              {sections.map((section) => {
                const isTargetSection = section.id === plan.sectionId;

                // Find all trains occupying this section
                const sectionOccupancies = trains.flatMap(t =>
                  t.sectionOccupancies
                    .filter(occ => occ.sectionId === section.id)
                    .map(occ => ({ train: t, occ }))
                );

                return (
                  <div key={section.id} className="relative flex items-center h-14 group">
                    {/* Row Header */}
                    <div className="w-36 flex-shrink-0 pr-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-[#FF6B00] transition">
                          {section.id}
                        </span>
                        {isTargetSection && (
                          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" title="Target block section"></span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">{section.name.split('–')[0]}</div>
                    </div>

                    {/* Timeline Canvas Track */}
                    <div className={`relative flex-1 h-10 rounded-lg border transition-colors ${
                      isTargetSection
                        ? 'bg-slate-900/90 border-[#FF6B00]/40'
                        : 'bg-slate-900/40 border-slate-800/80'
                    }`}>
                      {/* Grid vertical lines */}
                      <div className="absolute inset-0 grid grid-cols-24 pointer-events-none">
                        {hours.slice(0, 24).map((h) => (
                          <div key={h} className="border-r border-slate-800/40 h-full"></div>
                        ))}
                      </div>

                      {/* Render Train Movement Bars */}
                      {sectionOccupancies.map(({ train, occ }, idx) => {
                        const leftPct = (occ.entryMinute / 1440) * 100;
                        const widthPct = Math.max(1.5, ((occ.exitMinute - occ.entryMinute) / 1440) * 100);

                        // Check collision with current block on target section
                        const isColliding =
                          isTargetSection &&
                          Math.max(0, Math.min(currentStartMinute + currentDuration + 15, occ.exitMinute) - Math.max(currentStartMinute - 15, occ.entryMinute)) > 0;

                        return (
                          <div
                            key={`${train.id}-${idx}`}
                            style={{
                              left: `${leftPct}%`,
                              width: `${widthPct}%`
                            }}
                            className={`absolute top-1 bottom-1 rounded-md px-1.5 flex items-center justify-between text-[9px] font-mono font-bold text-white shadow transition-all ${
                              isColliding
                                ? 'bg-red-600 border border-red-300 animate-pulse z-20 shadow-red-500/50'
                                : train.type === 'Rajdhani'
                                ? 'bg-red-700/80 border border-red-500/60 z-10'
                                : train.type === 'Vande Bharat'
                                ? 'bg-blue-600/80 border border-blue-400/60 z-10'
                                : train.type === 'Freight'
                                ? 'bg-slate-600/80 border border-slate-400/40'
                                : 'bg-teal-600/80 border border-teal-400/40'
                            }`}
                            title={`${train.number} ${train.name} (${minutesToTimeString(occ.entryMinute)} - ${minutesToTimeString(occ.exitMinute)}) ${isColliding ? '⚠️ CONFLICT!' : ''}`}
                          >
                            <span className="truncate">{train.number}</span>
                            {isColliding && (
                              <span className="text-[10px] font-black text-white ml-1">!</span>
                            )}
                          </div>
                        );
                      })}

                      {/* Render Draggable Block Bar (Only on Target Section) */}
                      {isTargetSection && (
                        <div
                          onMouseDown={handleMouseDown}
                          style={{
                            left: `${(currentStartMinute / 1440) * 100}%`,
                            width: `${(currentDuration / 1440) * 100}%`
                          }}
                          className={`absolute top-0 bottom-0 rounded-lg cursor-grab active:cursor-grabbing border-2 flex flex-col justify-center items-center text-center shadow-xl transition-shadow select-none z-30 ${
                            evalResult.isRecommended
                              ? 'bg-amber-500/90 border-amber-300 text-slate-950 shadow-amber-500/40 hover:shadow-amber-500/60'
                              : 'bg-red-600/90 border-red-300 text-white shadow-red-600/50 hover:shadow-red-600/70'
                          }`}
                        >
                          <div className="text-[10px] font-black tracking-tight leading-none px-1 truncate w-full">
                            {evalResult.isRecommended ? 'BLOCK WINDOW' : 'CONFLICT!'}
                          </div>
                          <div className="text-[9px] font-mono leading-none mt-0.5 opacity-90">
                            {minutesToTimeString(currentStartMinute)}–{minutesToTimeString(currentStartMinute + currentDuration)}
                          </div>
                          {/* Drag Handle Indicator */}
                          <div className="flex space-x-0.5 mt-0.5">
                            <span className="w-1 h-1 rounded-full bg-current opacity-75"></span>
                            <span className="w-1 h-1 rounded-full bg-current opacity-75"></span>
                            <span className="w-1 h-1 rounded-full bg-current opacity-75"></span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Conflicting Trains Details Table */}
        {evalResult.conflictingTrains.length > 0 && (
          <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold text-red-400 uppercase mb-2 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Regulated / Conflicting Trains in this Timeslot ({evalResult.conflictingTrains.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {evalResult.conflictingTrains.map((train) => (
                <div key={train.id} className="bg-[#0F172A] p-2.5 rounded-lg border border-red-900/40 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="font-bold text-white">{train.number}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      train.priority === 'Super-Priority' ? 'bg-red-500/20 text-red-400' :
                      train.priority === 'High' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {train.priority}
                    </span>
                  </div>
                  <div className="text-slate-300 truncate mt-0.5">{train.name}</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-1">
                    Scheduled Pass: {train.sectionOccupancies.find(s => s.sectionId === plan.sectionId) ? `${minutesToTimeString(train.sectionOccupancies.find(s => s.sectionId === plan.sectionId)!.entryMinute)} - ${minutesToTimeString(train.sectionOccupancies.find(s => s.sectionId === plan.sectionId)!.exitMinute)}` : 'En-route'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
