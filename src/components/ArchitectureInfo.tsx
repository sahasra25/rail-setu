import React from 'react';

export const ArchitectureInfo: React.FC = () => {
  return (
    <div className="space-y-12 pb-12">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-white">Technical Architecture & Engineering Design</h2>
          <span className="bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-xs px-2.5 py-0.5 rounded-full font-mono">
            System Blueprints
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Designed for high-throughput constraint optimization, modular API integration with Indian Railways enterprise IT, and fail-safe human control.
        </p>
      </div>

      {/* Tech Stack Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-2xl text-sky-400 font-mono">⚛️ UI / UX</div>
          <h4 className="text-sm font-bold text-white">React 18 + Tailwind CSS</h4>
          <p className="text-xs text-slate-300">
            Interactive command center interface with responsive Gantt chart, draggable slot manipulation, and zero-latency feedback.
          </p>
          <span className="inline-block text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-0.5 rounded">TypeScript 5.x</span>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-2xl text-emerald-400 font-mono">⚡ Backend API</div>
          <h4 className="text-sm font-bold text-white">FastAPI (Python 3.13)</h4>
          <p className="text-xs text-slate-300">
            High-performance asynchronous microservice orchestrating data feeds from timetable schedules and dispatching optimization jobs.
          </p>
          <span className="inline-block text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-0.5 rounded">Async Pydantic V2</span>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-2xl text-violet-400 font-mono">🧠 Optimizer Engine</div>
          <h4 className="text-sm font-bold text-white">Google OR-Tools CP-SAT</h4>
          <p className="text-xs text-slate-300">
            Constraint Programming solver modeling safety headway buffer intervals, crew shifts, and train delay penalty minimization.
          </p>
          <span className="inline-block text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-0.5 rounded">SAT Constraint Solver</span>
        </div>

        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="text-2xl text-amber-400 font-mono">📊 Data Pipeline</div>
          <h4 className="text-sm font-bold text-white">Synthetic Corridor Data</h4>
          <p className="text-xs text-slate-300">
            Simulated NDLS–HWH Golden Corridor topology, real-world train classifications (Rajdhani, Vande Bharat), and maintenance tasks.
          </p>
          <span className="inline-block text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-0.5 rounded">100% Synthetic Demo</span>
        </div>
      </div>

      {/* Architecture Flow Diagram (SVG) */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">System Architecture & Inter-Process Data Flow</h3>
            <p className="text-xs text-slate-400">Data journey from field maintenance demand to controller-approved railway possession</p>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-[#0F172A] px-2 py-1 rounded border border-slate-700">
            Frontend ↔ API ↔ CP-SAT Optimizer ↔ Mock Data
          </span>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="bg-[#0F172A] rounded-xl p-6 border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center relative">
            {/* Step 1 */}
            <div className="bg-[#1E293B] border border-blue-500/40 rounded-xl p-4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-2">1</div>
              <h5 className="font-bold text-white text-xs">Command Web UI</h5>
              <p className="text-[10px] text-slate-400 mt-1">Interactive Gantt, Request Form & "Where is my train"</p>
              <div className="mt-3 text-[9px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded">React 18 + Tailwind</div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#1E293B] border border-amber-500/40 rounded-xl p-4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-2">2</div>
              <h5 className="font-bold text-white text-xs">FastAPI Gateway</h5>
              <p className="text-[10px] text-slate-400 mt-1">REST / WebSocket dispatch, schema validation & audit state</p>
              <div className="mt-3 text-[9px] font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded">FastAPI + Pydantic</div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#1E293B] border border-violet-500/40 rounded-xl p-4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm mb-2">3</div>
              <h5 className="font-bold text-white text-xs">OR-Tools CP-SAT</h5>
              <p className="text-[10px] text-slate-400 mt-1">Mathematical constraint satisfaction: headway & delay penalty</p>
              <div className="mt-3 text-[9px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded">Google OR-Tools</div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#1E293B] border border-emerald-500/40 rounded-xl p-4 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">4</div>
              <h5 className="font-bold text-white text-xs">Corridor Repository</h5>
              <p className="text-[10px] text-slate-400 mt-1">Train schedules, section limits & machine team rosters</p>
              <div className="mt-3 text-[9px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded">Synthetic Data Store</div>
            </div>
          </div>
        </div>

        {/* OR-Tools CP-SAT Explanation Callout */}
        <div className="bg-[#0F172A] border-l-4 border-violet-500 p-4 rounded-r-xl">
          <h4 className="text-xs font-mono font-bold text-violet-400 uppercase">
            How Google OR-Tools CP-SAT Solves Block Planning
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            The optimization engine models maintenance slots as bounded integer variables <code className="font-mono text-amber-400">IntervalVar(start, duration, end)</code>. It enforces hard safety boundaries:
            <span className="font-mono text-white block mt-1">NoOverlap([Block_Interval, Train_Passage_Interval + Safety_Buffer])</span>
            and solves a multi-attribute penalty objective:
            <span className="font-mono text-white block mt-1">Minimize: ∑ (w_priority × Train_Delay_Minutes) + (w_urgency × Deferred_Days)</span>
          </p>
        </div>
      </div>

      {/* Future Scope Roadmap */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase mb-1">Production Vision</h3>
          <h4 className="text-xl font-bold text-white">Roadmap & Future System Integration</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <span className="text-[#FF6B00]">01.</span>
              <span>Direct Integration with IR Enterprise IT</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bi-directional API links with <strong className="text-white">CRIS (Centre for Railway Information Systems)</strong>, ICMS (Integrated Coaching Management System), COA (Control Office Application), and FOIS (Freight Operations Information System) to pull real-time train updates without manual data entry.
            </p>
          </div>

          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <span className="text-[#FF6B00]">02.</span>
              <span>Live RTIS GPS Tracking Feed</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ingest real-time locomotive positions from ISRO-powered <strong className="text-white">RTIS (Real-Time Train Information System)</strong> units installed on locomotives to continuously recalibrate block conflict horizons with sub-second accuracy.
            </p>
          </div>

          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <span className="text-[#FF6B00]">03.</span>
              <span>Predictive IoT & Asset Health Sensors</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Connect acoustic bearing detectors (HBD), Track Recording Cars (OMS-2000), ultrasonic flaw detectors (USFD), and OHE thermal imaging cameras so maintenance requests are spawned automatically prior to in-service component failures.
            </p>
          </div>

          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-sm">
              <span className="text-[#FF6B00]">04.</span>
              <span>Mobile Field App for P-Way & Gang Mates</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Offline-capable mobile app for gang leaders and Tower Wagon drivers to request block burst extensions, acknowledge line clearance, and report work completion with GPS geotagged photo proofs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
