import { BookOpen, CircleHelp, Dna, SearchCheck, Smartphone, Split, Trophy, type LucideIcon } from 'lucide-react';
import { inr } from '../engine/dates';
import type { Effect, ScreenDef } from '../engine/types';

export type Tone = 'sky' | 'sun' | 'coral' | 'violet' | 'brand';

export function kindMeta(def: ScreenDef): { label: string; Icon: LucideIcon; tone: Tone } {
  switch (def.kind) {
    case 'narrative':
      return { label: 'Story', Icon: BookOpen, tone: 'sky' };
    case 'decision':
      return { label: 'Your call', Icon: Split, tone: 'sun' };
    case 'autopsy':
      return { label: 'Scam autopsy', Icon: SearchCheck, tone: 'coral' };
    case 'quiz':
      return { label: 'Quick check', Icon: CircleHelp, tone: 'violet' };
    case 'phoneTask':
      return { label: 'Phone task', Icon: Smartphone, tone: 'brand' };
    case 'summary':
      return { label: 'Chapter recap', Icon: Trophy, tone: 'sun' };
    case 'custom':
      return { label: 'Money DNA', Icon: Dna, tone: 'violet' };
  }
}

export interface Chip {
  text: string;
  tone: 'good' | 'bad' | 'neutral';
}

/** Human-readable consequence chips for a decision's effects. */
export function effectChips(effects: Effect[] = []): Chip[] {
  const chips: Chip[] = [];
  for (const e of effects) {
    if (e.type === 'scamLoss') chips.push({ text: `−${inr(e.amount)} lost`, tone: 'bad' });
    else if (e.type === 'debit') chips.push({ text: `−${inr(e.amount)}`, tone: 'bad' });
    else if (e.type === 'credit') chips.push({ text: `+${inr(e.amount)}`, tone: 'good' });
    else if (e.type === 'xp') chips.push({ text: `+${e.amount} XP`, tone: 'good' });
    else if (e.type === 'startRd') chips.push({ text: `RD ${inr(e.amount)}/month started`, tone: 'neutral' });
  }
  return chips;
}
