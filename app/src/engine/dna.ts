import type { DnaResult, DnaType } from './types';

export const DNA_ORDER: DnaType[] = ['P', 'A', 'G', 'S'];

export const DNA_TYPES: Record<DnaType, { name: string; color: string; blurb: string; watchOut: string }> = {
  P: {
    name: 'The Planner',
    color: '#2F6F8F',
    blurb: 'You like money to have a job. You think in goals, lists and "what if".',
    watchOut: 'Plans are great — just leave room for life to happen.',
  },
  A: {
    name: 'The Adventurer',
    color: '#C2603A',
    blurb: 'You spend on experiences and people. Life right now matters to you.',
    watchOut: 'Great stories — but some months end with nothing put away.',
  },
  G: {
    name: 'The Guardian',
    color: '#3D7A4E',
    blurb: 'Safety first. Losing money hurts you more than gaining it pleases you.',
    watchOut: 'Money kept too safe can quietly lose value to inflation.',
  },
  S: {
    name: 'The Steady Hand',
    color: '#8A6D2F',
    blurb: 'You look for the middle path — a bit for now, a bit for later.',
    watchOut: 'Balance is wise; just make sure it is a choice, not a way of avoiding decisions.',
  },
};

export interface DnaQuestion {
  id: string;
  q: string;
  options: { label: string; type: DnaType }[];
}

export const DNA_QUESTIONS: DnaQuestion[] = [
  {
    id: 'gift',
    q: 'You get ₹5,000 as a birthday gift. First instinct?',
    options: [
      { label: 'Put it towards something I am saving up for', type: 'P' },
      { label: 'Plan a day out with friends', type: 'A' },
      { label: 'Keep it untouched, just in case', type: 'G' },
      { label: 'Spend a little, save the rest', type: 'S' },
    ],
  },
  {
    id: 'sale',
    q: 'Your favourite brand has a 40%-off sale ending tonight.',
    options: [
      { label: 'Check my list — buy only what I already planned to', type: 'P' },
      { label: 'Treat myself, deals like this do not come often', type: 'A' },
      { label: 'Skip it — a discount is still spending', type: 'G' },
      { label: 'Buy one thing, close the tab', type: 'S' },
    ],
  },
  {
    id: 'trip',
    q: 'Friends plan a weekend trip that costs a third of your monthly budget.',
    options: [
      { label: 'Go only if I can save for it over the next few weeks', type: 'P' },
      { label: 'I am in — I will figure the money out later', type: 'A' },
      { label: 'Sit this one out', type: 'G' },
      { label: 'Join for one day instead of two', type: 'S' },
    ],
  },
  {
    id: 'tip',
    q: 'A cousin says a new app "doubled his money" in a month.',
    options: [
      { label: 'Ask how it works and research it before anything else', type: 'P' },
      { label: 'Try it with a small amount — what is the harm?', type: 'A' },
      { label: 'Too good to be true. Not touching it.', type: 'G' },
      { label: 'Ask a few more people what they think', type: 'S' },
    ],
  },
  {
    id: 'raise',
    q: 'You start earning ₹3,000 more each month.',
    options: [
      { label: 'Automatically save most of it', type: 'P' },
      { label: 'Finally upgrade my phone', type: 'A' },
      { label: 'Build a bigger emergency fund', type: 'G' },
      { label: 'Half to savings, half to life', type: 'S' },
    ],
  },
  {
    id: 'track',
    q: 'How do you usually know how much money you have left?',
    options: [
      { label: 'I track it in a budget', type: 'P' },
      { label: 'I check when my card gets declined', type: 'A' },
      { label: 'I keep a big buffer so I never have to worry', type: 'G' },
      { label: 'I have a rough idea', type: 'S' },
    ],
  },
];

export function scoreDna(answers: DnaType[]): Omit<DnaResult, 'token'> {
  const scores: Record<DnaType, number> = { P: 0, A: 0, G: 0, S: 0 };
  for (const t of answers) scores[t] += 1;
  const dominant = DNA_ORDER.reduce((best, t) => (scores[t] > scores[best] ? t : best), DNA_ORDER[0]);
  return { dominant, scores };
}

// The share token carries the result itself, so shared links work without a backend
// and without storing anything about the person.
export function encodeDnaToken(r: Omit<DnaResult, 'token'>): string {
  const json = JSON.stringify({ d: r.dominant, s: DNA_ORDER.map((t) => r.scores[t]) });
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeDnaToken(token: string): Omit<DnaResult, 'token'> | null {
  try {
    const b64 = token.replace(/-/g, '+').replace(/_/g, '/');
    const parsed = JSON.parse(atob(b64)) as { d: unknown; s: unknown };
    if (typeof parsed.d !== 'string' || !DNA_ORDER.includes(parsed.d as DnaType)) return null;
    if (!Array.isArray(parsed.s) || parsed.s.length !== 4 || !parsed.s.every((n) => Number.isInteger(n))) return null;
    const values = parsed.s as number[];
    const scores = Object.fromEntries(DNA_ORDER.map((t, i): [DnaType, number] => [t, values[i]])) as Record<DnaType, number>;
    return { dominant: parsed.d as DnaType, scores };
  } catch {
    return null;
  }
}
