export type SectionStatus = 'Available' | 'Block Planned' | 'Conflict' | 'Maintenance Active';

export interface CorridorSection {
  id: string;
  name: string;
  code: string;
  startKm: number;
  endKm: number;
  lengthKm: number;
  tracks: 'Double' | 'Triple' | 'Quad';
  status: SectionStatus;
  maxSpeedKmH: number;
  division: string;
}

export type TrainType = 'Rajdhani' | 'Vande Bharat' | 'Duronto' | 'Mail/Express' | 'Freight';
export type TrainPriority = 'Super-Priority' | 'High' | 'Normal' | 'Freight';

export interface TrainScheduleStop {
  station: string;
  stationName: string;
  arr: string; // "HH:MM"
  dep: string; // "HH:MM"
  arrMinutes: number; // minutes from 00:00
  depMinutes: number;
  dayOffset: number;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  type: TrainType;
  priority: TrainPriority;
  origin: string;
  destination: string;
  scheduledArrival: string;
  scheduledDeparture: string;
  currentSection: string;
  delayMinutes: number;
  nextStation: string;
  nextStationETA: string;
  direction: 'UP' | 'DOWN';
  color: string;
  stops: TrainScheduleStop[];
  sectionOccupancies: {
    sectionId: string;
    entryMinute: number;
    exitMinute: number;
  }[];
}

export type Department = 'Engineering' | 'Electrical' | 'Signal & Telecom';
export type WorkPriority = 'Critical' | 'High' | 'Normal';

export interface MaintenanceRequest {
  id: string;
  sectionId: string;
  workType: string;
  department: Department;
  priority: WorkPriority;
  minDurationMinutes: number;
  allowedDateRange: {
    start: string;
    end: string;
  };
  requiredTeam: string;
  reason: string;
  status: 'Pending' | 'Planned' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface BlockPlan {
  id: string;
  requestId: string;
  sectionId: string;
  workType: string;
  department: Department;
  proposedStartTime: string;
  proposedEndTime: string;
  startMinute: number;
  endMinute: number;
  durationMinutes: number;
  team: string;
  affectedTrainsCount: number;
  affectedTrainNumbers: string[];
  estimatedDelayMinutes: number;
  priorityTrainImpact: 'None' | 'Low' | 'High';
  riskLevel: 'Low' | 'Medium' | 'High';
  status: 'Proposed' | 'Approved' | 'Rejected' | 'Modified';
  recommendationScore: number;
  recommendationReason: string;
  isRecommended: boolean;
  isAIOptimized: boolean;
}

export interface WhatIfScenario {
  id: string;
  title: string;
  description: string;
  type: 'delay' | 'emergency_block';
  targetTrainNumber?: string;
  delayAdditionMinutes?: number;
  targetSectionId?: string;
  emergencyDurationMinutes?: number;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userRole: 'Chief Controller (Traffic)' | 'Sr. DEN (Co-ord)' | 'TPC (Traction Power)' | 'Safety Officer' | 'AI System';
  action: 'Approve' | 'Reject' | 'Modify' | 'Simulate Scenario' | 'Auto-Replan' | 'Submit Request';
  summary: string;
  planId?: string;
  notes?: string;
}
