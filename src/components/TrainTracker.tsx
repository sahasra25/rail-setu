import React, { useState } from 'react';
import { Train, CorridorSection } from '../types';

interface TrainTrackerProps {
  trains: Train[];
  sections: CorridorSection[];
  selectedSectionId?: string;
  onSeeImpactOnBlockPlan: (train: Train) => void;
}

export const TrainTracker: React.FC<TrainTrackerProps> = ({
  trains,
  sections,
  selectedSectionId = 'ALL',
  onSeeImpactOnBlockPlan
}) => {
  const [filterSection, setFilterSection] = useState<string>(selectedSectionId);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(trains[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter trains
  const filteredTrains = trains.filter(t => {
    const matchesSection = filterSection === 'ALL' || t.sectionOccupancies.some(s => s.sectionId === filterSection);
    const matchesSearch =
      t.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black text-white">Live Train Tracker & Master Timetable</h2>
            <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
              Where Is My Train (Simulated)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time GPS/Odometer simulated train telemetry and scheduled corridor passage times.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search box */}
          <div className="relative flex-1 sm:w-60">
            <input
              type="text"
              placeholder="Search train #, name, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
            />
          </div>

          {/* Section dropdown */}
          <select
            value={filterSection}
            onChange={(e) => setFilterSection(e.target.value)}
            className="bg-[#0F172A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
          >
            <option value="ALL">All Sections (Entire Corridor)</option>
            {sections.map(s => (
              <option key={s.id} value={s.id}>
                {s.code} ({s.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left = Train List & Live Status, Right = Detailed Route Modal/Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Train Timetable Table (8 cols) */}
        <div className="lg:col-span-7 bg-[#1E293B] border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
              <span>Trains in Selected Window ({filteredTrains.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Click train to inspect route</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0F172A] text-slate-400 font-mono text-[10px] uppercase border-y border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Train # & Name</th>
                  <th className="py-2.5 px-3">Type / Priority</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Sched Dep/Arr</th>
                  <th className="py-2.5 px-3">Current Section</th>
                  <th className="py-2.5 px-3">Delay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredTrains.map((train) => {
                  const isSelected = selectedTrain?.id === train.id;
                  return (
                    <tr
                      key={train.id}
                      onClick={() => setSelectedTrain(train)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-slate-800/90 border-l-4 border-l-[#FF6B00]' : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-white flex items-center space-x-1.5">
                          <span className="text-slate-400">{train.direction === 'UP' ? '▲' : '▼'}</span>
                          <span className="text-[#FF6B00]">{train.number}</span>
                        </div>
                        <div className="text-[11px] text-slate-200 font-medium truncate max-w-[140px]">{train.name}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                          train.priority === 'Super-Priority' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                          train.priority === 'High' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
                          train.priority === 'Normal' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          'bg-slate-600/20 text-slate-400 border border-slate-600/40'
                        }`}>
                          {train.priority}
                        </span>
                        <div className="text-[9px] text-slate-400 mt-0.5">{train.type}</div>
                      </td>

                      <td className="py-3 px-3 text-[11px]">
                        <div className="text-white font-medium">{train.origin}</div>
                        <div className="text-slate-400">→ {train.destination}</div>
                      </td>

                      <td className="py-3 px-3 font-mono text-[11px]">
                        <div className="text-slate-200">Dep: {train.scheduledDeparture}</div>
                        <div className="text-slate-400">Arr: {train.scheduledArrival}</div>
                      </td>

                      <td className="py-3 px-3 font-mono text-xs">
                        <span className="bg-[#0F172A] px-2 py-1 rounded text-slate-200 border border-slate-800">
                          {train.currentSection}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-mono">
                        {train.delayMinutes === 0 ? (
                          <span className="text-emerald-400 font-bold text-[11px]">Right Time (RT)</span>
                        ) : (
                          <span className="text-amber-400 font-bold text-[11px]">+{train.delayMinutes} min</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Selected Train "Where Is My Train" Telemetry (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedTrain ? (
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-black font-mono text-[#FF6B00]">{selectedTrain.number}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {selectedTrain.direction} Bound
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">{selectedTrain.name}</h4>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {selectedTrain.origin} ➔ {selectedTrain.destination}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Current Status</div>
                  {selectedTrain.delayMinutes > 0 ? (
                    <div className="text-lg font-black font-mono text-amber-400">+{selectedTrain.delayMinutes}m Late</div>
                  ) : (
                    <div className="text-lg font-black font-mono text-emerald-400">On Time</div>
                  )}
                </div>
              </div>

              {/* Telemetry Card */}
              <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">Active Block Section:</span>
                  <span className="font-mono font-bold text-white bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                    {selectedTrain.currentSection}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">Next Approaching Station:</span>
                  <span className="font-semibold text-white">{selectedTrain.nextStation}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono">Estimated Arrival (ETA):</span>
                  <span className="font-mono font-bold text-amber-400">{selectedTrain.nextStationETA} IST</span>
                </div>
              </div>

              {/* Full Route Stops Timetable */}
              <div>
                <h5 className="text-xs font-mono font-bold text-slate-400 uppercase mb-3">
                  Corridor Timetable & Scheduled Stoppages
                </h5>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedTrain.stops.map((stop, i) => (
                    <div
                      key={stop.station}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-[#0F172A]/60 border border-slate-800/80"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-white">{stop.stationName}</div>
                          <div className="text-[10px] font-mono text-slate-400">{stop.station}</div>
                        </div>
                      </div>
                      <div className="font-mono text-right text-[11px]">
                        <div className="text-slate-200">Arr: {stop.arr}</div>
                        <div className="text-slate-400">Dep: {stop.dep}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Action Button */}
              <button
                onClick={() => onSeeImpactOnBlockPlan(selectedTrain)}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-amber-500 hover:from-[#ff7b1a] hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF6B00]/20 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>See Impact On Block Plan & Timeline</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              Select a train from the table to view live position telemetry and stops.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
