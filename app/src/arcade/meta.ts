import { AlarmClock, Flag, PhoneCall, ScanFace, Users, Video, type LucideIcon } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ArcadeGame } from './types';

export const GAME_ICON: Record<ArcadeGame['icon'], LucideIcon> = {
  video: Video,
  phone: PhoneCall,
  deepfake: ScanFace,
  group: Users,
  flag: Flag,
  alarm: AlarmClock,
};

/** Maps a 0–100 score onto the ScoreRing's colour tiers, with a game-flavoured label. */
export function scoreTier(score: number): { tier: string; label: string } {
  if (score >= 80) return { tier: 'Strong', label: 'Scam-proof' };
  if (score >= 60) return { tier: 'Steady', label: 'Sharp' };
  if (score >= 40) return { tier: 'Building', label: 'Shaky' };
  return { tier: 'Fragile', label: 'Hooked' };
}

export const clampScore = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

interface ArcadeStore {
  best: Record<string, number>;
  record: (gameId: string, score: number) => void;
  clear: () => void;
}

/** Best score per game, kept only in this browser (a per-viewer convenience, not a leaderboard). */
export const useArcadeStore = create<ArcadeStore>()(
  persist(
    (set) => ({
      best: {},
      record: (gameId, score) => set((s) => ({ best: { ...s.best, [gameId]: Math.max(score, s.best[gameId] ?? 0) } })),
      clear: () => set({ best: {} }),
    }),
    { name: 'finsim-arcade-v1' },
  ),
);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
