import React from 'react';

interface HeroOverviewProps {
  onOpenDemo: () => void;
  onSeeHowItWorks: () => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ onOpenDemo, onSeeHowItWorks }) => {
  const steps = [
    {
      num: '01',
      title: 'Maintenance Request Submission',
      desc: 'Section engineers log track, OHE, or signalling maintenance slots with duration, team requirements, and allowed time windows.',
      tag: 'Demand Intake'
    },
    {
      num: '02',
      title: 'Data Validation & Conflict Pre-Check',
      desc: 'System aggregates real-time train positions, timetable constraints, and conflicting block requirements across adjacent divisions.',
      tag: 'Data Fusion'
    },
    {
      num: '03',
      title: 'Feasible Window Detection',
      desc: 'Constraint satisfaction models identify non-conflicting lull intervals while enforcing hard safety headway rules (15-20 min separation).',
      tag: 'Constraint Filter'
    },
    {
      num: '04',
      title: 'Optimization & Ranking of Plans',
      desc: 'OR-Tools CP-SAT algorithms score windows by minimizing passenger train delays, protecting Rajdhani/Vande Bharat paths, and optimizing gang utilization.',
      tag: 'CP-SAT Solver'
    },
    {
      num: '05',
      title: 'What-If Simulation & Comparison',
      desc: 'Controllers simulate unexpected delays or emergency fractures, interactively dragging blocks to preview knock-on effects before lock-in.',
      tag: 'Interactive Sim'
    },
    {
      num: '06',
      title: 'Approval, Execution & Dynamic Re-Plan',
      desc: 'Chief Controller approves the plan with role-based authentication. If upstream trains delay, RAILSETU dynamically recommends re-plan slots.',
      tag: 'Audit & Closed Loop'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#1E293B] border border-[#FF6B00]/40 px-3.5 py-1.5 rounded-full text-xs text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
            <span className="font-semibold text-white">RAILSETU HACKATHON PROTOTYPE</span>
            <span className="text-slate-500">•</span>
            <span className="text-[#FF6B00] font-mono">Mission: Zero Uncoordinated Blocks</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none mb-6">
            AI-Powered Automatic <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF6B00] via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Block Planning
            </span> for Indian Railways
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            “Bridging Maintenance and Movement — Intelligently.” <br />
            Maximize asset availability while minimizing train disruption across high-density trunk routes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-amber-500 hover:from-[#ff7b1a] hover:to-amber-400 text-white font-bold text-sm shadow-xl shadow-[#FF6B00]/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Launch Interactive Demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <button
              onClick={onSeeHowItWorks}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1E293B] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>See How It Works</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Quick Stats Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-[#1E293B]/80 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black font-mono text-white">1,451 km</div>
              <div className="text-xs text-slate-400">NDLS–HWH Golden Corridor</div>
            </div>
            <div className="bg-[#1E293B]/80 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black font-mono text-emerald-400">&lt; 3 sec</div>
              <div className="text-xs text-slate-400">CP-SAT Window Optimization</div>
            </div>
            <div className="bg-[#1E293B]/80 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black font-mono text-[#FF6B00]">100%</div>
              <div className="text-xs text-slate-400">Hard Safety Rule Compliance</div>
            </div>
            <div className="bg-[#1E293B]/80 border border-slate-800 rounded-xl p-4">
              <div className="text-2xl font-black font-mono text-violet-400">Human+AI</div>
              <div className="text-xs text-slate-400">Decision Support System</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase mb-2">The Operational Challenge</h2>
          <h3 className="text-3xl font-extrabold text-white">Why Indian Railways Needs RAILSETU</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-[#1E293B] border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Current Reality: Fragmented Planning</h4>
                <p className="text-xs text-slate-400">Manual phone/telex coordination between departments</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">Manual, siloed block planning:</strong> Engineering (P-Way), Electrical (OHE), and S&T apply independently on spreadsheets with zero holistic visibility.
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">Train–block conflicts discovered too late:</strong> Blocks frequently cancelled at the last hour or forced to truncate when Rajdhani/Vande Bharat trains approach.
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">No integration of asset health and schedules:</strong> Urgent maintenance is postponed repeatedly, accelerating track wear and risking speed restrictions (PSR).
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">No dynamic re-planning on delays:</strong> When upstream trains run 30+ minutes late, pre-sanctioned blocks become invalid with no instant alternative slot.
                </div>
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-[#1E293B] border border-[#FF6B00]/40 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">RAILSETU Solution: Intelligent Synthesis</h4>
                <p className="text-xs text-slate-400">Constraint satisfaction & dynamic human-in-the-loop control</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Automatic feasible block windows:</strong> CP-SAT mathematical optimization scans corridor traffic schedules in seconds to propose minimal-disruption slots.
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Clear impact on trains, delays & resources:</strong> Real-time estimation of passenger delay minutes, priority protection, and gang machine availability.
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">What-if simulation & dynamic re-planning:</strong> Interactive Gantt timeline with drag-and-drop block shifts and instant re-planning if a train is delayed.
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-300">
                <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Human-in-the-loop approval with full audit trail:</strong> Controllers make the final call with tamper-evident digital sign-offs and regulatory justification logs.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process Flow Diagram */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E293B]/70 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-8">
            <h3 className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase mb-1">End-To-End Architecture Flow</h3>
            <h4 className="text-xl font-bold text-white">Closed-Loop Optimization Pipeline</h4>
          </div>

          {/* Flow Diagram */}
          <div className="grid grid-cols-2 md:grid-cols-7 gap-3 text-center">
            {[
              { title: '1. Request', desc: 'Maintenance demand logged', icon: '📝', color: 'border-blue-500/50 text-blue-400' },
              { title: '2. Optimize', desc: 'CP-SAT constraint search', icon: '⚡', color: 'border-amber-500/50 text-amber-400' },
              { title: '3. Recommend', desc: 'Scored alternative plans', icon: '🎯', color: 'border-violet-500/50 text-violet-400' },
              { title: '4. Simulate', desc: 'What-If & block dragging', icon: '🔄', color: 'border-indigo-500/50 text-indigo-400' },
              { title: '5. Approve', desc: 'Controller digital sign-off', icon: '✅', color: 'border-emerald-500/50 text-emerald-400' },
              { title: '6. Monitor', desc: 'Live train delay tracker', icon: '📡', color: 'border-sky-500/50 text-sky-400' },
              { title: '7. Re-plan', desc: 'Dynamic adjustment', icon: '🔁', color: 'border-[#FF6B00]/50 text-[#FF6B00]' }
            ].map((node, i) => (
              <div key={node.title} className="relative">
                <div className={`bg-[#0F172A] border ${node.color} rounded-xl p-3 h-full flex flex-col items-center justify-center shadow-lg transition-all hover:scale-105`}>
                  <div className="text-2xl mb-1">{node.icon}</div>
                  <div className="font-bold text-xs text-white leading-tight">{node.title}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-snug">{node.desc}</div>
                </div>
                {i < 6 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 font-bold z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono font-bold tracking-widest text-[#FF6B00] uppercase mb-2">Detailed Operational Workflow</h2>
          <h3 className="text-3xl font-extrabold text-white">How RAILSETU Operates in 6 Steps</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
            Governed by the core philosophy: <strong className="text-white">Safety constraints are hard rules; AI recommends, humans decide.</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 hover:border-[#FF6B00]/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-black font-mono text-[#FF6B00] group-hover:text-amber-400 transition-colors">{step.num}</span>
                  <span className="text-[10px] font-mono uppercase bg-[#0F172A] text-slate-400 border border-slate-800 px-2 py-0.5 rounded">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] text-[#FF6B00]">
                <span>Integrated into Command Center</span>
                <span className="ml-1 font-mono text-xs">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Data & Assumptions Disclaimer Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] border-2 border-dashed border-amber-500/40 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-white">Demo Data & Architecture Assumptions</h4>
                <span className="bg-amber-400/20 text-amber-300 text-[11px] px-2 py-0.5 rounded font-mono font-semibold">
                  Synthetic Dataset
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All data, train numbers, block schedules, and delays presented in this prototype are <strong className="text-amber-300">synthetic and for demonstration purposes only</strong>. No live Indian Railways databases (CRIS, FOIS, COA, or ICMS) are connected.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="bg-[#0F172A]/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">Corridor Modeled</div>
                  <div className="text-white font-semibold mt-0.5">NDLS–CNB–MGS–ASN–HWH</div>
                  <div className="text-[11px] text-slate-400">7 Trunk Sections, 1,451 route km</div>
                </div>
                <div className="bg-[#0F172A]/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">Fleet Classes</div>
                  <div className="text-white font-semibold mt-0.5">Rajdhani, Vande Bharat, Mail, Freight</div>
                  <div className="text-[11px] text-slate-400">Tiered priority-weighted dispatching</div>
                </div>
                <div className="bg-[#0F172A]/80 p-3 rounded-lg border border-slate-800">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">Maintenance Tasks</div>
                  <div className="text-white font-semibold mt-0.5">PQRS Renewal, OHE, Signals, RGT</div>
                  <div className="text-[11px] text-slate-400">Duration: 90m to 240m with crew limits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
