import React, { useState } from 'react';
import { CORRIDOR_SECTIONS } from './data/corridorData';
import { SAMPLE_TRAINS } from './data/trainData';
import { INITIAL_MAINTENANCE_REQUESTS, INITIAL_BLOCK_PLANS } from './data/maintenanceData';
import { CorridorSection, Train, MaintenanceRequest, BlockPlan, AuditLogEntry } from './types';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { Dashboard } from './components/Dashboard';
import { TrainTracker } from './components/TrainTracker';
import { RequestForm } from './components/RequestForm';
import { BlockPlanner } from './components/BlockPlanner';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { ApprovalAudit } from './components/ApprovalAudit';
import { ArchitectureInfo } from './components/ArchitectureInfo';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [sections, setSections] = useState<CorridorSection[]>(CORRIDOR_SECTIONS);
  const [trains, setTrains] = useState<Train[]>(SAMPLE_TRAINS);
  const [requests, setRequests] = useState<MaintenanceRequest[]>(INITIAL_MAINTENANCE_REQUESTS);
  const [blockPlans, setBlockPlans] = useState<BlockPlan[]>(INITIAL_BLOCK_PLANS);
  const [selectedPlanForAudit, setSelectedPlanForAudit] = useState<BlockPlan | null>(INITIAL_BLOCK_PLANS[0] || null);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('ALL');

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: 'AUDIT-001',
      timestamp: '2026-09-08 07:15:20',
      userRole: 'Chief Controller (Traffic)',
      action: 'Approve',
      summary: 'Sanctioned 180m track renewal block PLAN-7701 on PRYJ-DDU. Freight regulation authorized.'
    },
    {
      id: 'AUDIT-002',
      timestamp: '2026-09-08 08:30:11',
      userRole: 'TPC (Traction Power)',
      action: 'Submit Request',
      summary: 'Logged OHE Catenary Inspection request REQ-2026-082 for NDLS-CNB section.'
    },
    {
      id: 'AUDIT-003',
      timestamp: '2026-09-08 09:05:44',
      userRole: 'AI System',
      action: 'Auto-Replan',
      summary: 'Generated CP-SAT candidate windows for REQ-2026-082. Identified optimal afternoon lull (14:00-16:00).'
    }
  ]);

  // Handler when a new maintenance request is submitted
  const handleNewRequest = (newReq: MaintenanceRequest) => {
    setRequests(prev => [newReq, ...prev]);

    const auditEntry: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userRole: 'Sr. DEN (Co-ord)',
      action: 'Submit Request',
      summary: `Submitted demand ${newReq.id} on section ${newReq.sectionId} (${newReq.workType}, ${newReq.minDurationMinutes}m).`
    };
    setAuditLogs(prev => [auditEntry, ...prev]);

    // Automatically navigate to planner tab so the user can immediately optimize it
    setActiveTab('planner');
  };

  // Handler when a plan is submitted from the timeline for approval
  const handleProceedToApproval = (plan: BlockPlan) => {
    setSelectedPlanForAudit(plan);
    // Update or add to block plans
    setBlockPlans(prev => {
      const idx = prev.findIndex(p => p.id === plan.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = plan;
        return copy;
      }
      return [plan, ...prev];
    });
    setActiveTab('audit');
  };

  // Handler for Approval / Rejection / Modification in Audit
  const handleApproveAction = (planId: string, action: 'Approve' | 'Reject' | 'Modify', role: AuditLogEntry['userRole'], remarks: string) => {
    setBlockPlans(prev => prev.map(p => {
      if (p.id === planId) {
        return {
          ...p,
          status: action === 'Approve' ? 'Approved' : action === 'Reject' ? 'Rejected' : 'Modified'
        };
      }
      return p;
    }));

    const auditEntry: AuditLogEntry = {
      id: `AUDIT-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userRole: role,
      action: action,
      summary: `${action} decision executed for ${planId}. Note: ${remarks}`
    };
    setAuditLogs(prev => [auditEntry, ...prev]);
  };

  // Handler for What-If scenario application
  const handleApplyWhatIf = (simulatedPlan: BlockPlan, newTrains: Train[], auditEntry: AuditLogEntry) => {
    setTrains(newTrains);
    setAuditLogs(prev => [auditEntry, ...prev]);
    // Also mark affected section as Conflict in section map
    setSections(prev => prev.map(s => {
      if (s.id === simulatedPlan.sectionId) {
        return { ...s, status: 'Conflict' };
      }
      return s;
    }));
  };

  // Handler for Auto-Replan approval
  const handleAutoReplan = (replannedPlan: BlockPlan, auditEntry: AuditLogEntry) => {
    setBlockPlans(prev => [replannedPlan, ...prev]);
    setSelectedPlanForAudit(replannedPlan);
    setAuditLogs(prev => [auditEntry, ...prev]);
    // Restore section status
    setSections(prev => prev.map(s => {
      if (s.id === replannedPlan.sectionId) {
        return { ...s, status: 'Block Planned' };
      }
      return s;
    }));
    setActiveTab('planner');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans flex flex-col selection:bg-[#FF6B00] selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTime="09:30"
        pendingRequestsCount={requests.filter(r => r.status === 'Pending').length}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {activeTab === 'overview' && (
          <HeroOverview
            onOpenDemo={() => setActiveTab('dashboard')}
            onSeeHowItWorks={() => {
              const el = document.getElementById('how-it-works-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            sections={sections}
            requests={requests}
            blockPlans={blockPlans}
            onCreateRequest={() => setActiveTab('request')}
            onRunPlanner={() => setActiveTab('planner')}
            onViewConflicts={() => {
              setSelectedSectionId('PRYJ-DDU');
              setActiveTab('tracker');
            }}
            onSelectSection={(secId) => {
              setSelectedSectionId(secId);
              setActiveTab('tracker');
            }}
          />
        )}

        {activeTab === 'tracker' && (
          <TrainTracker
            trains={trains}
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSeeImpactOnBlockPlan={(train) => {
              setActiveTab('planner');
            }}
          />
        )}

        {activeTab === 'request' && (
          <RequestForm
            sections={sections}
            onSubmitRequest={handleNewRequest}
          />
        )}

        {activeTab === 'planner' && (
          <BlockPlanner
            requests={requests}
            trains={trains}
            sections={sections}
            onApprovePlan={handleProceedToApproval}
          />
        )}

        {activeTab === 'whatif' && (
          <WhatIfSimulator
            currentPlan={blockPlans[0] || INITIAL_BLOCK_PLANS[0]}
            trains={trains}
            sections={sections}
            onApplyScenarioToTimeline={handleApplyWhatIf}
            onAutoReplanApprove={handleAutoReplan}
          />
        )}

        {activeTab === 'audit' && (
          <ApprovalAudit
            plans={blockPlans}
            selectedPlan={selectedPlanForAudit}
            auditLogs={auditLogs}
            onApproveAction={handleApproveAction}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureInfo />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
