/**
 * RAILSETU Optimization Engine (Simulation of Google OR-Tools CP-SAT Model)
 * 
 * In a production deployment:
 * This module would make an async REST/gRPC call to a FastAPI backend running
 * Google OR-Tools CP-SAT with constraints:
 * 1. Hard No-Overlap Constraint: Section maintenance block cannot overlap high-priority train paths without speed restriction clearance.
 * 2. Minimum Headway Buffer: Safety separation delta (15-20 min) before and after block.
 * 3. Resource Availability Constraint: Gang crew & OHE tower wagon shift limits.
 * 4. Multi-objective Penalty Function: Min sum(w_i * TrainDelay_i) + w_m * MaintenanceUrgencyDelay.
 */

import { Train, MaintenanceRequest, BlockPlan } from '../types';

export interface EvaluationResult {
  startMinute: number;
  endMinute: number;
  conflictingTrains: Train[];
  conflictCount: number;
  superPriorityCount: number;
  highPriorityCount: number;
  normalPriorityCount: number;
  freightCount: number;
  estimatedDelayMinutes: number;
  priorityTrainImpact: 'None' | 'Low' | 'High';
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendationScore: number;
  isRecommended: boolean;
  recommendationReason: string;
}

// Convert minutes to "HH:MM" format
export function minutesToTimeString(minutes: number): string {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Convert "HH:MM" to minutes from 00:00
export function timeStringToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Evaluate conflict impact for a specific section and time window
 */
export function evaluateBlockSlot(
  sectionId: string,
  startMinute: number,
  durationMinutes: number,
  trains: Train[],
  safetyBufferMinutes: number = 15
): EvaluationResult {
  const endMinute = startMinute + durationMinutes;
  const blockWindowStart = Math.max(0, startMinute - safetyBufferMinutes);
  const blockWindowEnd = startMinute + durationMinutes + safetyBufferMinutes;

  const conflictingTrains: Train[] = [];
  let superPriorityCount = 0;
  let highPriorityCount = 0;
  let normalPriorityCount = 0;
  let freightCount = 0;

  for (const train of trains) {
    const occ = train.sectionOccupancies.find(o => o.sectionId === sectionId);
    if (!occ) continue;

    // Check overlap with safety buffer
    const overlap = Math.max(0, Math.min(blockWindowEnd, occ.exitMinute) - Math.max(blockWindowStart, occ.entryMinute));
    if (overlap > 0) {
      conflictingTrains.push(train);
      if (train.priority === 'Super-Priority') superPriorityCount++;
      else if (train.priority === 'High') highPriorityCount++;
      else if (train.priority === 'Normal') normalPriorityCount++;
      else if (train.priority === 'Freight') freightCount++;
    }
  }

  // Calculate weighted passenger and throughput minutes
  const estimatedDelayMinutes =
    (superPriorityCount * 45) +
    (highPriorityCount * 25) +
    (normalPriorityCount * 15) +
    (freightCount * 10);

  let priorityTrainImpact: 'None' | 'Low' | 'High' = 'None';
  if (superPriorityCount > 0) priorityTrainImpact = 'High';
  else if (highPriorityCount > 0) priorityTrainImpact = 'Low';

  let riskLevel: 'Low' | 'Medium' | 'High' = 'Low';
  if (superPriorityCount > 0 || conflictingTrains.length >= 3) {
    riskLevel = 'High';
  } else if (highPriorityCount > 0 || conflictingTrains.length >= 2) {
    riskLevel = 'Medium';
  }

  // Score from 0 to 100
  let score = 100 - (superPriorityCount * 55) - (highPriorityCount * 25) - (normalPriorityCount * 12) - (freightCount * 5) - Math.floor(estimatedDelayMinutes / 6);
  score = Math.max(5, Math.min(99, score));

  const isRecommended = superPriorityCount === 0 && highPriorityCount === 0 && conflictingTrains.length <= 2;

  let recommendationReason = '';
  if (superPriorityCount > 0) {
    const spNames = conflictingTrains.filter(t => t.priority === 'Super-Priority').map(t => `${t.number} ${t.name}`).join(', ');
    recommendationReason = `Conflict with Super-Priority ${spNames}. Safety regulation strictly prohibits scheduled block without diversion.`;
  } else if (highPriorityCount > 0) {
    recommendationReason = `Caution: Intersects with High-Priority train (${conflictingTrains.map(t => t.number).join(', ')}). Expect +${estimatedDelayMinutes}m cascade delay.`;
  } else if (conflictingTrains.length > 0) {
    recommendationReason = `Feasible window: Regulates ${freightCount} freight / ${normalPriorityCount} mail train(s). Total estimated corridor delay: ${estimatedDelayMinutes} min.`;
  } else {
    recommendationReason = `Optimal natural traffic lull: Zero train conflicts detected within ${safetyBufferMinutes}m safety margins. Highly recommended.`;
  }

  return {
    startMinute,
    endMinute,
    conflictingTrains,
    conflictCount: conflictingTrains.length,
    superPriorityCount,
    highPriorityCount,
    normalPriorityCount,
    freightCount,
    estimatedDelayMinutes,
    priorityTrainImpact,
    riskLevel,
    recommendationScore: score,
    isRecommended,
    recommendationReason
  };
}

/**
 * Simulate finding the best block plan across a 24-hour horizon
 * using candidate evaluation. In production, this maps to OR-Tools CP-SAT.
 */
export function findBestBlockPlans(
  request: MaintenanceRequest,
  trains: Train[],
  priorityObjective: 'Balanced' | 'Minimum Delay' | 'Urgent Maintenance' = 'Balanced'
): BlockPlan[] {
  const duration = request.minDurationMinutes;
  const candidates: EvaluationResult[] = [];

  // Sample every 30 minutes across 24 hours (0 to 1440 - duration)
  for (let minute = 60; minute <= 1440 - duration; minute += 30) {
    const res = evaluateBlockSlot(request.sectionId, minute, duration, trains);
    candidates.push(res);
  }

  // Sort according to objective
  candidates.sort((a, b) => {
    if (priorityObjective === 'Minimum Delay') {
      return a.estimatedDelayMinutes - b.estimatedDelayMinutes || b.recommendationScore - a.recommendationScore;
    }
    if (priorityObjective === 'Urgent Maintenance') {
      // Favor earlier start times while avoiding super-priority conflicts
      const penaltyA = (a.superPriorityCount * 1000) + (a.startMinute * 0.5);
      const penaltyB = (b.superPriorityCount * 1000) + (b.startMinute * 0.5);
      return penaltyA - penaltyB;
    }
    // Default Balanced: Score first
    return b.recommendationScore - a.recommendationScore;
  });

  const bestCandidates = candidates.slice(0, 3);

  return bestCandidates.map((evalRes, idx) => ({
    id: `PLAN-${request.id.slice(-4)}-${idx + 1}`,
    requestId: request.id,
    sectionId: request.sectionId,
    workType: request.workType,
    department: request.department,
    proposedStartTime: minutesToTimeString(evalRes.startMinute),
    proposedEndTime: minutesToTimeString(evalRes.endMinute),
    startMinute: evalRes.startMinute,
    endMinute: evalRes.endMinute,
    durationMinutes: duration,
    team: request.requiredTeam,
    affectedTrainsCount: evalRes.conflictCount,
    affectedTrainNumbers: evalRes.conflictingTrains.map(t => `${t.number} (${t.name})`),
    estimatedDelayMinutes: evalRes.estimatedDelayMinutes,
    priorityTrainImpact: evalRes.priorityTrainImpact,
    riskLevel: evalRes.riskLevel,
    status: 'Proposed',
    recommendationScore: evalRes.recommendationScore,
    recommendationReason: evalRes.recommendationReason,
    isRecommended: idx === 0 && evalRes.isRecommended,
    isAIOptimized: true
  }));
}
