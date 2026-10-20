export type AccountId = 'cash' | 'savings' | 'rd';
export type AppId = 'messages' | 'bank' | 'calculator' | 'demat' | 'verify';
export type FlagValue = string | number | boolean;

export interface Txn {
  id: string;
  date: string; // ISO yyyy-mm-dd (simulation calendar)
  type: 'credit' | 'debit';
  account: AccountId;
  amount: number;
  description: string;
  counterparty: string;
  status: 'success' | 'failed';
}

export interface Mandate {
  id: string;
  kind: 'rd';
  label: string;
  amount: number;
  annualRate: number;
  nextDate: string;
  runs: number;
  maxRuns: number;
}

export interface Message {
  id: string;
  thread: string;
  from: string;
  text: string;
  date: string;
  read: boolean;
  suspicious?: boolean;
}

/** Shares of a (fictional) company held in the simulated demat account. */
export interface Holding {
  symbol: string;
  name: string;
  qty: number;
  price: number;
}

/** A line in the demat account's statement (what the CAS shows). */
export interface DematTxn {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  symbol: string;
  qty: number;
  description: string;
  /** Not done by the player: the CAS task asks them to spot it. */
  unauthorised?: boolean;
}

export type DnaType = 'P' | 'A' | 'G' | 'S';

export interface DnaResult {
  dominant: DnaType;
  scores: Record<DnaType, number>;
  token: string;
}

/** Everything a screen can do to the simulation. Applied by simStore.apply(). */
export type Effect =
  | { type: 'credit'; account: AccountId; amount: number; description: string; counterparty: string }
  | { type: 'debit'; account: AccountId; amount: number; description: string; counterparty: string }
  | { type: 'transfer'; from: AccountId; to: AccountId; amount: number | 'all'; description: string }
  | { type: 'scamLoss'; amount: number; description: string }
  | { type: 'xp'; amount: number }
  | { type: 'unlockApp'; app: AppId }
  | { type: 'message'; thread: string; from: string; text: string; suspicious?: boolean }
  | { type: 'advanceDays'; days: number }
  | { type: 'startRd'; label: string; amount: number; annualRate: number; months: number }
  | { type: 'flag'; key: string; value: FlagValue }
  | { type: 'buyShares'; symbol: string; name: string; qty: number; price: number; broker: string }
  | { type: 'dematDebit'; symbol: string; qty: number | 'all'; description: string }
  /** Tops savings up to `amount` if lower: lets a chapter be played directly, out of order. */
  | { type: 'ensureSavings'; amount: number }
  /** Adds the holding (without a bank debit) if the player has never held this symbol. */
  | { type: 'ensureShares'; symbol: string; name: string; qty: number; price: number; broker: string };

export interface LibraryLink {
  label: string;
  slug: string;
}

export interface Help {
  reflection?: string;
  links?: LibraryLink[];
}

interface BaseScreen {
  title: string;
  help?: Help;
  /** Applied once, the first time the screen is shown. */
  onEnter?: Effect[];
}

export interface NarrativeScreen extends BaseScreen {
  kind: 'narrative';
  speaker?: string;
  body: string[];
  callout?: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  detail?: string;
  outcome: string;
  tone: 'good' | 'bad' | 'neutral';
  effects?: Effect[];
}

export interface DecisionScreen extends BaseScreen {
  kind: 'decision';
  prompt: string;
  /** Flag key the chosen option id is stored under. */
  saveAs: string;
  options: DecisionOption[];
}

export interface AutopsyFlag {
  id: string;
  /** Exact substring of artifact.from or artifact.text to make tappable. */
  snippet: string;
  why: string;
}

export interface AutopsyScreen extends BaseScreen {
  kind: 'autopsy';
  intro: string;
  artifact: { channel: 'sms' | 'call'; from: string; text: string };
  flags: AutopsyFlag[];
}

export interface QuizQuestion {
  id: string;
  q: string;
  options: { label: string; correct?: boolean }[];
  explain: string;
}

export interface QuizScreen extends BaseScreen {
  kind: 'quiz';
  intro?: string;
  questions: QuizQuestion[];
}

export interface PhoneTaskScreen extends BaseScreen {
  kind: 'phoneTask';
  body: string[];
  app: AppId;
  /** Screen completes when this flag becomes truthy (set by the phone apps). */
  doneFlag: string;
  doneText: string;
}

export interface SummaryScreen extends BaseScreen {
  kind: 'summary';
  points: string[];
}

export interface CustomScreen extends BaseScreen {
  kind: 'custom';
  component: 'dnaQuiz' | 'dnaResult' | 'priceLab' | 'compoundLab';
  intro?: string;
}

/** Teach: tap each card to reveal it. Continue unlocks once every card has been opened. */
export interface ExploreScreen extends BaseScreen {
  kind: 'explore';
  intro: string;
  cards: { id: string; label: string; hint?: string; body: string }[];
  callout?: string;
}

/** Teach: put each item into the right bucket, with instant feedback. */
export interface SortScreen extends BaseScreen {
  kind: 'sort';
  intro: string;
  buckets: { id: string; label: string }[];
  items: { id: string; label: string; bucket: string; why: string }[];
}

/** Teach: tap steps in the right order. `steps` is the correct order; they are shown shuffled. */
export interface OrderScreen extends BaseScreen {
  kind: 'order';
  intro: string;
  steps: { id: string; label: string; detail: string }[];
}

export type ScreenDef =
  | NarrativeScreen
  | DecisionScreen
  | AutopsyScreen
  | QuizScreen
  | PhoneTaskScreen
  | SummaryScreen
  | CustomScreen
  | ExploreScreen
  | SortScreen
  | OrderScreen;

export interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  blurb: string;
  /** Applied once when the chapter is first opened, so it works even when played out of order. */
  entry?: Effect[];
  screenSequence: string[];
  screens: Record<string, ScreenDef>;
}

export interface Module {
  id: string;
  title: string;
  tagline: string;
  chapters: Chapter[];
}
