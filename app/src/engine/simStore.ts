import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, addMonths } from './dates';
import type { AccountId, AppId, DnaResult, Effect, FlagValue, Mandate, Message, Txn } from './types';

export interface Progress {
  moduleId: string;
  chapterId: string;
  screenId: string;
}

/** The whole simulation state. Persisted to localStorage (swap for Supabase later). */
export interface SimData {
  simDate: string;
  cash: number;
  savings: number;
  rd: number;
  xp: number;
  totalLost: number;
  unlockedApps: AppId[];
  transactions: Txn[];
  mandates: Mandate[];
  messages: Message[];
  flags: Record<string, FlagValue>;
  completed: string[];
  progress: Progress | null;
  dna: DnaResult | null;
}

interface SimActions {
  /** Apply effects. With onceKey, the batch is applied at most once (survives reloads and replays). */
  apply: (effects: Effect[], onceKey?: string) => void;
  setFlag: (key: string, value: FlagValue) => void;
  markThreadRead: (thread: string) => void;
  setProgress: (progress: Progress) => void;
  completeChapter: (chapterKey: string) => void;
  setDna: (dna: DnaResult | null) => void;
  reset: () => void;
}

export const SIM_START_DATE = '2024-06-03';

const initialData: SimData = {
  simDate: SIM_START_DATE,
  cash: 0,
  savings: 0,
  rd: 0,
  xp: 0,
  totalLost: 0,
  unlockedApps: ['messages'],
  transactions: [],
  mandates: [],
  messages: [],
  flags: {},
  completed: [],
  progress: null,
  dna: null,
};

let counter = 0;
const uid = () =>
  `${Date.now().toString(36)}${(counter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const ACCOUNT_LABEL: Record<AccountId, string> = {
  cash: 'Cash in hand',
  savings: 'Savings account',
  rd: 'Recurring deposit',
};

const SCAM_BENEFICIARY = 'Unknown beneficiary';

function withBalance(s: SimData, account: AccountId, value: number): SimData {
  const next = { ...s };
  next[account] = value;
  return next;
}

function addTxn(s: SimData, t: Omit<Txn, 'id' | 'date'> & { date?: string }): SimData {
  const txn: Txn = { ...t, id: uid(), date: t.date ?? s.simDate };
  return { ...s, transactions: [txn, ...s.transactions] };
}

function addMessage(s: SimData, m: Omit<Message, 'id' | 'date' | 'read'> & { date?: string }): SimData {
  const msg: Message = { ...m, id: uid(), date: m.date ?? s.simDate, read: false };
  return { ...s, messages: [...s.messages, msg] };
}

/** Runs every mandate instalment due on or before `upTo` (FiAlly: process_due_mandates_for_profile). */
function processMandates(s: SimData, upTo: string): SimData {
  let next = s;
  const mandates = s.mandates.map((m) => ({ ...m }));
  for (const m of mandates) {
    while (m.runs < m.maxRuns && m.nextDate <= upTo) {
      if (m.runs > 0 && next.rd > 0) {
        const interest = Math.round((next.rd * m.annualRate) / 12);
        if (interest > 0) {
          next = withBalance(next, 'rd', next.rd + interest);
          next = addTxn(next, {
            type: 'credit',
            account: 'rd',
            amount: interest,
            description: `Interest — ${m.label}`,
            counterparty: 'Bank',
            status: 'success',
            date: m.nextDate,
          });
        }
      }
      if (next.savings >= m.amount) {
        next = withBalance(next, 'savings', next.savings - m.amount);
        next = withBalance(next, 'rd', next.rd + m.amount);
        next = addTxn(next, {
          type: 'debit',
          account: 'savings',
          amount: m.amount,
          description: `Auto-debit — ${m.label}`,
          counterparty: ACCOUNT_LABEL.rd,
          status: 'success',
          date: m.nextDate,
        });
      } else {
        next = addTxn(next, {
          type: 'debit',
          account: 'savings',
          amount: m.amount,
          description: `Auto-debit FAILED (insufficient balance) — ${m.label}`,
          counterparty: ACCOUNT_LABEL.rd,
          status: 'failed',
          date: m.nextDate,
        });
        next = addMessage(next, {
          thread: 'NIMBUS',
          from: 'NB-NIMBUS',
          text: `Your ${m.label} instalment of ₹${m.amount} could not be debited due to insufficient balance.`,
          date: m.nextDate,
        });
      }
      m.runs += 1;
      m.nextDate = addMonths(m.nextDate, 1);
    }
  }
  return { ...next, mandates };
}

export function reduce(s: SimData, e: Effect): SimData {
  switch (e.type) {
    case 'credit':
      return addTxn(withBalance(s, e.account, s[e.account] + e.amount), {
        type: 'credit',
        account: e.account,
        amount: e.amount,
        description: e.description,
        counterparty: e.counterparty,
        status: 'success',
      });
    case 'debit': {
      if (s[e.account] < e.amount) {
        return addTxn(s, { ...e, type: 'debit', status: 'failed' });
      }
      return addTxn(withBalance(s, e.account, s[e.account] - e.amount), {
        type: 'debit',
        account: e.account,
        amount: e.amount,
        description: e.description,
        counterparty: e.counterparty,
        status: 'success',
      });
    }
    case 'transfer': {
      const amount = e.amount === 'all' ? s[e.from] : Math.min(e.amount, s[e.from]);
      if (amount <= 0) return s;
      let next = withBalance(s, e.from, s[e.from] - amount);
      next = withBalance(next, e.to, next[e.to] + amount);
      next = addTxn(next, {
        type: 'debit',
        account: e.from,
        amount,
        description: e.description,
        counterparty: ACCOUNT_LABEL[e.to],
        status: 'success',
      });
      return addTxn(next, {
        type: 'credit',
        account: e.to,
        amount,
        description: e.description,
        counterparty: ACCOUNT_LABEL[e.from],
        status: 'success',
      });
    }
    case 'scamLoss': {
      const amount = Math.min(e.amount, s.savings);
      if (amount <= 0) return s;
      const next = withBalance(s, 'savings', s.savings - amount);
      return addTxn(
        { ...next, totalLost: next.totalLost + amount },
        {
          type: 'debit',
          account: 'savings',
          amount,
          description: e.description,
          counterparty: SCAM_BENEFICIARY,
          status: 'success',
        },
      );
    }
    case 'xp':
      return { ...s, xp: s.xp + e.amount };
    case 'unlockApp':
      return s.unlockedApps.includes(e.app) ? s : { ...s, unlockedApps: [...s.unlockedApps, e.app] };
    case 'message':
      return addMessage(s, { thread: e.thread, from: e.from, text: e.text, suspicious: e.suspicious });
    case 'advanceDays': {
      const target = addDays(s.simDate, e.days);
      return { ...processMandates(s, target), simDate: target };
    }
    case 'startRd': {
      const mandate: Mandate = {
        id: uid(),
        kind: 'rd',
        label: e.label,
        amount: e.amount,
        annualRate: e.annualRate,
        nextDate: s.simDate, // first instalment today
        runs: 0,
        maxRuns: e.months,
      };
      return processMandates({ ...s, mandates: [...s.mandates, mandate] }, s.simDate);
    }
    case 'flag':
      return { ...s, flags: { ...s.flags, [e.key]: e.value } };
  }
}

function pickData(s: SimData): SimData {
  return {
    simDate: s.simDate,
    cash: s.cash,
    savings: s.savings,
    rd: s.rd,
    xp: s.xp,
    totalLost: s.totalLost,
    unlockedApps: s.unlockedApps,
    transactions: s.transactions,
    mandates: s.mandates,
    messages: s.messages,
    flags: s.flags,
    completed: s.completed,
    progress: s.progress,
    dna: s.dna,
  };
}

export const useSimStore = create<SimData & SimActions>()(
  persist(
    (set, get) => ({
      ...initialData,
      apply: (effects, onceKey) => {
        const s = get();
        const guard = onceKey ? `once:${onceKey}` : null;
        if (guard && s.flags[guard]) return;
        let next = pickData(s);
        for (const e of effects) next = reduce(next, e);
        if (guard) next = { ...next, flags: { ...next.flags, [guard]: true } };
        set(next);
      },
      setFlag: (key, value) => set((s) => ({ flags: { ...s.flags, [key]: value } })),
      markThreadRead: (thread) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.thread === thread && !m.read ? { ...m, read: true } : m)),
          flags: { ...s.flags, [`read:${thread}`]: true },
        })),
      setProgress: (progress) => set({ progress }),
      completeChapter: (chapterKey) =>
        set((s) => (s.completed.includes(chapterKey) ? s : { completed: [...s.completed, chapterKey] })),
      setDna: (dna) => set({ dna }),
      reset: () => set({ ...initialData }),
    }),
    { name: 'finsim-state-v1', partialize: (s: SimData & SimActions) => pickData(s) },
  ),
);
