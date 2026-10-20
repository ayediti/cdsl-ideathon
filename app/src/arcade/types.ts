// Bite-sized, standalone scam games. Each is pure data, rendered by one of three generic players.

export type Audience = 'Students' | 'First-time investors' | 'Senior citizens';

export interface Lesson {
  title: string;
  why: string;
}

interface GameBase {
  id: string;
  title: string;
  tagline: string;
  audiences: Audience[];
  minutes: number;
  tone: 'coral' | 'violet' | 'sky' | 'sun' | 'brand';
  icon: 'video' | 'phone' | 'deepfake' | 'group' | 'flag' | 'alarm';
  /** Shown in the debrief. Flag-rush games list their own flags instead. */
  redFlags: Lesson[];
  respond: string[];
  learnMore: { label: string; slug: string };
}

// ── Branching chat / call ──────────────────────────────────────────────────

/** `from` is 'me', 'system', or the speaker's display name. */
export interface ChatLine {
  from: string;
  text: string;
}

export interface ChatChoice {
  label: string;
  next: string;
  /** Added to a starting score of 100. Negative for risky choices. */
  points: number;
  /** Shown next to the choice in the debrief. */
  note: string;
}

export interface ChatEnd {
  outcome: 'safe' | 'shaken' | 'lost';
  title: string;
  text: string;
}

export interface ChatNode {
  lines: ChatLine[];
  ticker?: { symbol: string; price: string; change: string };
  choices?: ChatChoice[];
  end?: ChatEnd;
}

export interface ChatGame extends GameBase {
  kind: 'chat';
  channel: 'video' | 'call' | 'group';
  contact: { name: string; detail: string };
  start: string;
  nodes: Record<string, ChatNode>;
}

// ── Real or fake ──────────────────────────────────────────────────────────

export interface RealOrFakeCard {
  id: string;
  format: 'video' | 'voice' | 'sms' | 'email' | 'document' | 'call';
  from: string;
  headline?: string;
  body: string;
  answer: 'real' | 'fake';
  explain: string;
}

export interface RealOrFakeGame extends GameBase {
  kind: 'realOrFake';
  cards: RealOrFakeCard[];
}

// ── Timed red-flag hunt ───────────────────────────────────────────────────

export interface RushFlag {
  id: string;
  /** Exact substring of the round's text. */
  snippet: string;
  why: string;
}

export interface FlagRushRound {
  channel: 'SMS' | 'WhatsApp' | 'Email';
  from: string;
  text: string;
  flags: RushFlag[];
}

export interface FlagRushGame extends GameBase {
  kind: 'flagRush';
  seconds: number;
  rounds: FlagRushRound[];
}

// ── Golden hour (the actions live in GoldenHourPlayer: their scoring is code) ─

export interface GoldenHourGame extends GameBase {
  kind: 'goldenHour';
}

export type ArcadeGame = ChatGame | RealOrFakeGame | FlagRushGame | GoldenHourGame;

export interface GameResult {
  score: number;
  outcome: 'safe' | 'shaken' | 'lost';
  title: string;
  text: string;
  /** Item-by-item debrief: choices made, cards judged, or flags found. */
  review: { title: string; items: { label: string; note: string; good: boolean }[] };
}
