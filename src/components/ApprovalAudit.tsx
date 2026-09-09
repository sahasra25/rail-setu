import React, { useState } from 'react';
import { BlockPlan, AuditLogEntry } from '../types';

interface ApprovalAuditProps {
  plans: BlockPlan[];
  selectedPlan: BlockPlan | null;
  auditLogs: AuditLogEntry[];
  onApproveAction: (planId: string, action: 'Approve' | 'Reject' | 'Modify', role: AuditLogEntry['userRole'], remarks: string) => void;
}

export const ApprovalAudit: React.FC<ApprovalAuditProps> = ({
  plans,
  selectedPlan,
  auditLogs,
  onApproveAction
}) => {
  const [activePlanId, setActivePlanId] = useState<string>(selectedPlan?.id || plans[0]?.id || '');
  const [userRole, setUserRole] = useState<'Chief Controller (Traffic)' | 'Sr. DEN (Co-ord)' | 'TPC (Traction Power)' | 'Safety Officer'>('Chief Controller (Traffic)');
  const [remarks, setRemarks] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const planToReview = plans.find(p => p.id === activePlanId) || selectedPlan || plans[0];

  const handleAction = (action: 'Approve' | 'Reject' | 'Modify') => {
    if (!planToReview) return;
    onApproveAction(planToReview.id, action, userRole, remarks || `Decision recorded by ${userRole}.`);
    setActionSuccess(`Plan ${planToReview.id} marked as ${action}ed by ${userRole}`);
    setRemarks('');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-black text-white">Human-in-the-Loop Approval & Immutable Audit Trail</h2>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
            Command Authorization
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          AI generates optimal block schedules, but safety regulations mandate that only authorized railway operating officers (Traffic, Civil, Traction) can sanction line possessions.
        </p>
      </div>

      {/* Success banner */}
      {actionSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/60 p-4 rounded-xl flex items-center space-x-3 text-emerald-300">
          <span className="text-xl">✅</span>
          <span className="text-xs font-semibold">{actionSuccess}</span>
        </div>
      )}

      {/* Plan Approval Box & Decision Panel */}
      {planToReview ? (
        <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black font-mono text-white">PLAN: {planToReview.id}</span>
                <span className="text-xs font-mono bg-[#FF6B00]/20 text-[#FF6B00] px-2 py-0.5 rounded border border-[#FF6B00]/40">
                  {planToReview.sectionId}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                  planToReview.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' :
                  planToReview.status === 'Rejected' ? 'bg-red-500/20 text-red-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  Status: {planToReview.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{planToReview.workType} • Crew: {planToReview.team}</p>
            </div>

            {/* Plan Selector Dropdown */}
            {plans.length > 1 && (
              <select
                value={activePlanId}
                onChange={(e) => setActivePlanId(e.target.value)}
                className="bg-[#0F172A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B00] font-mono cursor-pointer"
              >
                {plans.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.id} ({p.sectionId} — {p.proposedStartTime})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Plan Summary Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Scheduled Time</span>
              <div className="text-base font-black font-mono text-[#FF6B00] mt-0.5">
                {planToReview.proposedStartTime} – {planToReview.proposedEndTime}
              </div>
              <div className="text-[10px] text-slate-400">{planToReview.durationMinutes} minutes</div>
            </div>

            <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Network Impact</span>
              <div className="text-base font-black font-mono text-white mt-0.5">
                {planToReview.estimatedDelayMinutes} min delay
              </div>
              <div className="text-[10px] text-slate-400">{planToReview.affectedTrainsCount} trains regulated</div>
            </div>

            <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Priority Impact</span>
              <div className="text-base font-black font-mono text-emerald-400 mt-0.5">
                {planToReview.priorityTrainImpact}
              </div>
              <div className="text-[10px] text-slate-400">Rajdhani corridor clear</div>
            </div>

            <div className="bg-[#0F172A] p-3 rounded-xl border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400">Risk Assessment</span>
              <div className={`text-base font-black font-mono mt-0.5 ${
                planToReview.riskLevel === 'Low' ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {planToReview.riskLevel} Risk
              </div>
              <div className="text-[10px] text-slate-400">Score: {planToReview.recommendationScore}/100</div>
            </div>
          </div>

          {/* Action Sign-Off Box */}
          <div className="bg-[#0F172A] p-5 rounded-xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              Authorizing Officer Sign-Off
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Designated Officer Role *
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF6B00] cursor-pointer"
                >
                  <option value="Chief Controller (Traffic)">Chief Controller (Traffic) — Operating Dept</option>
                  <option value="Sr. DEN (Co-ord)">Sr. Divisional Engineer (Co-ord) — Civil P-Way</option>
                  <option value="TPC (Traction Power)">Traction Power Controller (TPC) — Electrical</option>
                  <option value="Safety Officer">Divisional Safety Officer (DSO)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Operational Remarks / Regulatory Justification
                </label>
                <input
                  type="text"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Sanctioned subject to caution order 30 km/h at Km 712."
                  className="w-full bg-[#1E293B] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            {/* Decision Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handleAction('Reject')}
                className="px-5 py-2.5 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800/60 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                ✕ Reject Block Request
              </button>

              <button
                onClick={() => handleAction('Modify')}
                className="px-5 py-2.5 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800/60 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                ✎ Request Slot Modification
              </button>

              <button
                onClick={() => handleAction('Approve')}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition flex items-center space-x-1.5 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Authorize & Approve Block</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Historical Audit Trail Table */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-white">Central Operations Audit Log</h3>
            <p className="text-xs text-slate-400">Timestamped record of all AI plan generations, controller approvals, and scenario tests.</p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            Immutable Chain of Custody
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0F172A] text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Timestamp (IST)</th>
                <th className="py-2.5 px-3">Authorized Role</th>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Summary & Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-sans font-semibold text-white whitespace-nowrap">
                    {log.userRole}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.action === 'Approve' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      log.action === 'Reject' ? 'bg-red-500/20 text-red-300 border border-red-500/40' :
                      log.action === 'Auto-Replan' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' :
                      'bg-slate-700 text-slate-200'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-300 leading-snug">
                    {log.summary}
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
