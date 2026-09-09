import React, { useState } from 'react';
import { CorridorSection, MaintenanceRequest, Department, WorkPriority } from '../types';

interface RequestFormProps {
  sections: CorridorSection[];
  onSubmitRequest: (newReq: MaintenanceRequest) => void;
}

export const RequestForm: React.FC<RequestFormProps> = ({ sections, onSubmitRequest }) => {
  const [sectionId, setSectionId] = useState('PRYJ-DDU');
  const [workType, setWorkType] = useState('Track Renewal (PQRS Machine)');
  const [department, setDepartment] = useState<Department>('Engineering');
  const [priority, setPriority] = useState<WorkPriority>('Critical');
  const [durationMinutes, setDurationMinutes] = useState(180);
  const [startDate, setStartDate] = useState('2026-09-08T06:00');
  const [endDate, setEndDate] = useState('2026-09-08T22:00');
  const [requiredTeam, setRequiredTeam] = useState('Gang-14 (Heavy Track Mechanized Rake)');
  const [reason, setReason] = useState('Sleeper renewal and ultrasonic rail flaw elimination at Km 712; GMT load threshold reached.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const workTypeOptions: Record<Department, string[]> = {
    Engineering: [
      'Track Renewal (PQRS Machine)',
      'Rail Grinding Train (RGT) Operation',
      'Ballast Deep Screening Machine (BCM)',
      'Turnout & Switch Renewal',
      'Bridge Girder Ultrasonic & Bearing Greasing'
    ],
    Electrical: [
      'OHE Catenary Inspection & Dropper Replacement',
      '25kV Substation Feeder Circuit Breaker Overhaul',
      'Neutral Section Inspection & Insulator Washing',
      'Traction Return Bond & Earthing Renewal'
    ],
    'Signal & Telecom': [
      'Electronic Interlocking & Point Machine Overhaul',
      'Digital Axle Counter (DAC) Head Calibration',
      'Track Circuit Replacement & Cable Testing',
      'Kavach Automatic Train Protection (ATP) Beacon Calibration'
    ]
  };

  const teamOptions: Record<Department, string[]> = {
    Engineering: [
      'Gang-14 (Heavy Track Mechanized Rake)',
      'RGT Specialist Crew 02',
      'Bridges Special Division',
      'Track Monitoring Mobile Unit'
    ],
    Electrical: [
      'OHE Tower Wagon Team Alpha',
      'Traction Power Distribution Gang 01',
      'Substation Emergency Crew'
    ],
    'Signal & Telecom': [
      'S&T Signal Gang 03',
      'Kavach Radio Calibration Team',
      'Axle Counter Overhaul Squad'
    ]
  };

  const handleDeptChange = (dept: Department) => {
    setDepartment(dept);
    setWorkType(workTypeOptions[dept][0]);
    setRequiredTeam(teamOptions[dept][0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newReq: MaintenanceRequest = {
      id: `REQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      sectionId,
      workType,
      department,
      priority,
      minDurationMinutes: Number(durationMinutes),
      allowedDateRange: {
        start: startDate,
        end: endDate
      },
      requiredTeam,
      reason,
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        onSubmitRequest(newReq);
      }, 1000);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-white">Maintenance Block Demand Request</h2>
          <span className="bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-xs px-2.5 py-0.5 rounded-full font-mono">
            Section Engineer Portal
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Submit official corridor maintenance requisition for track, OHE, or signalling interlocking works. The AI optimizer will search non-disruptive windows automatically.
        </p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-emerald-950/80 border border-emerald-500/60 p-4 rounded-xl flex items-center space-x-3 text-emerald-300 animate-fadeIn">
          <svg className="w-6 h-6 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <div className="font-bold text-sm">Request Submitted Successfully!</div>
            <div className="text-xs text-emerald-400/90">
              Corridor demand logged into centralized block queue. Redirecting to Automatic Block Planner...
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Corridor Section *
            </label>
            <select
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
            >
              {sections.map(s => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.name} ({s.division} Div)
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Department *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Engineering', 'Electrical', 'Signal & Telecom'] as Department[]).map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => handleDeptChange(dept)}
                  className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition text-center cursor-pointer ${
                    department === dept
                      ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-[#FF6B00]/20'
                      : 'bg-[#0F172A] text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {dept === 'Signal & Telecom' ? 'S&T' : dept}
                </button>
              ))}
            </div>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Work Category / Nature of Task *
            </label>
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
            >
              {workTypeOptions[department].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Safety Priority Level *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Critical', 'High', 'Normal'] as WorkPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`py-2 px-2 text-[11px] font-semibold rounded-xl border transition text-center cursor-pointer ${
                    priority === p
                      ? p === 'Critical'
                        ? 'bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20'
                        : p === 'High'
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/20'
                        : 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                      : 'bg-[#0F172A] text-slate-400 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Duration */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Minimum Duration Required (Minutes) *
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="60"
                max="360"
                step="30"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="flex-1 accent-[#FF6B00] cursor-pointer"
              />
              <span className="w-24 px-3 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-center font-mono font-bold text-[#FF6B00] text-sm">
                {durationMinutes} min ({durationMinutes / 60}h)
              </span>
            </div>
          </div>

          {/* Required Team / Resource */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Required Maintenance Crew / Heavy Machine *
            </label>
            <select
              value={requiredTeam}
              onChange={(e) => setRequiredTeam(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
            >
              {teamOptions[department].map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* Allowed Start Range */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Earliest Acceptable Start Time *
            </label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
            />
          </div>

          {/* Allowed End Range */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
              Latest Acceptable Completion Time *
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
            />
          </div>
        </div>

        {/* Reason / Justification */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-2">
            Technical Justification / Asset Health Rationale *
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Specify reason, OMS track recording car defect, rail temperature limit, or IMR weld defect..."
            className="w-full bg-[#0F172A] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
          ></textarea>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-amber-500 hover:from-[#ff7b1a] hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#FF6B00]/25 transition flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Logging Request...</span>
              </>
            ) : (
              <>
                <span>Submit & Auto-Plan Windows</span>
                <span className="font-mono">→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
