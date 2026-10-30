import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CheckPhase } from './items';

export interface CheckScore {
  correct: number;
  total: number;
  at: string;
}

interface CheckStore {
  before: CheckScore | null;
  after: CheckScore | null;
  record: (phase: CheckPhase, correct: number, total: number) => void;
  clear: () => void;
}

/** Before/after scores, kept only in this browser. Nothing is sent anywhere. */
export const useCheckStore = create<CheckStore>()(
  persist(
    (set) => ({
      before: null,
      after: null,
      record: (phase, correct, total) => set({ [phase]: { correct, total, at: new Date().toISOString() } }),
      clear: () => set({ before: null, after: null }),
    }),
    { name: 'finsim-check-v1' },
  ),
);
