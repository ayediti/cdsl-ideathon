import { formatDate, inr } from './dates';
import { netWorth } from './fhs';
import type { SimData } from './simStore';

/** Fills {{cash}}, {{savings}}, {{rd}}, {{networth}}, {{date}}, {{lost}}, {{xp}} in content strings. */
export function render(text: string, s: SimData): string {
  const values: Record<string, string> = {
    cash: inr(s.cash),
    savings: inr(s.savings),
    rd: inr(s.rd),
    networth: inr(netWorth(s)),
    date: formatDate(s.simDate),
    lost: inr(s.totalLost),
    xp: String(s.xp),
  };
  return text.replace(/\{\{(\w+)\}\}/g, (match, key: string) => values[key] ?? match);
}
