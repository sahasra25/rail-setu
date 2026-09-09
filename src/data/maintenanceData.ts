import { MaintenanceRequest, BlockPlan } from '../types';

export const INITIAL_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'REQ-2026-081',
    sectionId: 'PRYJ-DDU',
    workType: 'Track Renewal (PQRS Machine)',
    department: 'Engineering',
    priority: 'Critical',
    minDurationMinutes: 180,
    allowedDateRange: {
      start: '2026-09-08 00:00',
      end: '2026-09-09 23:59'
    },
    requiredTeam: 'Gang-14 (Heavy Track Mechanized Rake)',
    reason: 'Deep screening and sleeper renewal over km 710-713; rail fatigue threshold exceeded.',
    status: 'Planned',
    createdAt: '2026-09-08 06:15'
  },
  {
    id: 'REQ-2026-082',
    sectionId: 'NDLS-CNB',
    workType: 'OHE Catenary Inspection & Dropper Replacement',
    department: 'Electrical',
    priority: 'High',
    minDurationMinutes: 120,
    allowedDateRange: {
      start: '2026-09-08 12:00',
      end: '2026-09-08 22:00'
    },
    requiredTeam: 'OHE Tower Wagon Team Alpha',
    reason: 'Routine 25kV traction line inspection and thermal hotspot clearance near Aligarh.',
    status: 'Planned',
    createdAt: '2026-09-08 07:30'
  },
  {
    id: 'REQ-2026-083',
    sectionId: 'GAYA-DHN',
    workType: 'Electronic Interlocking & Point Machine Overhaul',
    department: 'Signal & Telecom',
    priority: 'High',
    minDurationMinutes: 150,
    allowedDateRange: {
      start: '2026-09-08 02:00',
      end: '2026-09-08 14:00'
    },
    requiredTeam: 'S&T Signal Gang 03',
    reason: 'Dual detection digital axle counter retrofitting at Koderma turnout.',
    status: 'Pending',
    createdAt: '2026-09-08 08:00'
  },
  {
    id: 'REQ-2026-084',
    sectionId: 'CNB-PRYJ',
    workType: 'Rail Grinding Train (RGT) Operation',
    department: 'Engineering',
    priority: 'Normal',
    minDurationMinutes: 240,
    allowedDateRange: {
      start: '2026-09-08 23:00',
      end: '2026-09-09 05:00'
    },
    requiredTeam: 'RGT Specialist Crew 02',
    reason: 'Profile rectification to eliminate rolling contact fatigue and head checks on UP line.',
    status: 'Pending',
    createdAt: '2026-09-08 08:45'
  },
  {
    id: 'REQ-2026-085',
    sectionId: 'DHN-ASN',
    workType: 'Bridge Girder Ultrasonic & Bearing Greasing',
    department: 'Engineering',
    priority: 'Normal',
    minDurationMinutes: 90,
    allowedDateRange: {
      start: '2026-09-08 11:00',
      end: '2026-09-08 17:00'
    },
    requiredTeam: 'Bridges Special Division',
    reason: 'Pre-monsoon scour and bearing alignment verification at Barakar River Bridge.',
    status: 'Pending',
    createdAt: '2026-09-08 09:10'
  }
];

export const INITIAL_BLOCK_PLANS: BlockPlan[] = [
  {
    id: 'PLAN-7701',
    requestId: 'REQ-2026-081',
    sectionId: 'PRYJ-DDU',
    workType: 'Track Renewal (PQRS Machine)',
    department: 'Engineering',
    proposedStartTime: '11:30',
    proposedEndTime: '14:30',
    startMinute: 690,
    endMinute: 870,
    durationMinutes: 180,
    team: 'Gang-14 (Heavy Track Mechanized Rake)',
    affectedTrainsCount: 2,
    affectedTrainNumbers: ['BOXN-8812', 'BCN-4402'],
    estimatedDelayMinutes: 24,
    priorityTrainImpact: 'None',
    riskLevel: 'Low',
    status: 'Proposed',
    recommendationScore: 94,
    recommendationReason: 'Optimal slot inside passenger lull window; zero impact on Rajdhani or Vande Bharat. Only freight regulated.',
    isRecommended: true,
    isAIOptimized: true
  },
  {
    id: 'PLAN-7702',
    requestId: 'REQ-2026-082',
    sectionId: 'NDLS-CNB',
    workType: 'OHE Catenary Inspection & Dropper Replacement',
    department: 'Electrical',
    proposedStartTime: '14:00',
    proposedEndTime: '16:00',
    startMinute: 840,
    endMinute: 960,
    durationMinutes: 120,
    team: 'OHE Tower Wagon Team Alpha',
    affectedTrainsCount: 1,
    affectedTrainNumbers: ['12311 Netaji Exp'],
    estimatedDelayMinutes: 15,
    priorityTrainImpact: 'Low',
    riskLevel: 'Low',
    status: 'Proposed',
    recommendationScore: 88,
    recommendationReason: 'Fits neatly between Vande Bharat (dep 06:00) and evening Rajdhani departures (dep 16:55).',
    isRecommended: true,
    isAIOptimized: true
  }
];
