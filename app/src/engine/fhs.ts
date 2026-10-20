import type { SimData } from './simStore';

export type FhsTier = 'Fragile' | 'Building' | 'Steady' | 'Strong';

export function netWorth(s: Pick<SimData, 'cash' | 'savings' | 'rd'>): number {
  return s.cash + s.savings + s.rd;
}

/**
 * Financial Health Score (0–100). FiAlly computes its FHS server-side and the formula is not public,
 * so this is our own: cushion (0–40) + saving habit (0–20) + fraud safety (0–40).
 */
export function computeFhs(s: SimData) {
  const cushion = Math.round(Math.min(1, (s.savings + s.rd) / 20000) * 40);
  const habit = s.mandates.some((m) => m.runs < m.maxRuns) ? 20 : s.rd > 0 ? 10 : 0;
  const safety = Math.round(Math.max(0, 1 - s.totalLost / 8000) * 40);
  const score = cushion + habit + safety;
  const tier: FhsTier = score >= 80 ? 'Strong' : score >= 60 ? 'Steady' : score >= 40 ? 'Building' : 'Fragile';
  return { score, tier, parts: { cushion, habit, safety } };
}
