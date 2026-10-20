import { AlarmClock, Check, Siren } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { inr } from '../engine/dates';
import { clampScore } from './meta';
import type { GameResult, GoldenHourGame } from './types';

const LIMIT = 60; // simulated minutes; the clock runs at one minute per real second

interface Action {
  id: string;
  label: string;
  minutes: number;
  /** Points earned when taken at minute `t`. */
  points: (t: number) => number;
  extraLoss?: number;
  feedback: string;
  good: boolean;
}

const fade = (t: number) => Math.max(0.3, 1 - t / 120);

const ACTIONS: Action[] = [
  {
    id: '1930',
    label: 'Call 1930 / report on cybercrime.gov.in',
    minutes: 10,
    points: (t) => 50 * fade(t),
    good: true,
    feedback: 'Reported. The helpline can alert banks along the money trail. The sooner you report, the better the chance of freezing funds.',
  },
  {
    id: 'bank',
    label: 'Call my bank’s official number to block UPI and cards',
    minutes: 8,
    points: (t) => 20 * fade(t),
    good: true,
    feedback: 'Blocked. Nothing else can leave your account.',
  },
  {
    id: 'evidence',
    label: 'Screenshot the messages and note the transaction ID',
    minutes: 3,
    points: () => 10,
    good: true,
    feedback: 'Saved. Your complaint and any refund claim need this evidence.',
  },
  {
    id: 'secure',
    label: 'Change passwords and PINs, log out unknown devices',
    minutes: 5,
    points: () => 10,
    good: true,
    feedback: 'Locked down. The scammer can’t get back in.',
  },
  {
    id: 'family',
    label: 'Tell a family member what happened',
    minutes: 2,
    points: () => 5,
    good: true,
    feedback: 'Good. Support helps you think clearly, and stops them falling for the same trick.',
  },
  {
    id: 'google',
    label: 'Google “bank customer care” and call the top result',
    minutes: 10,
    points: () => -15,
    extraLoss: 10000,
    good: false,
    feedback: 'The top result was a fake helpline. The “agent” asked you to install a screen-sharing app to “reverse” the payment, and took ₹10,000 more.',
  },
  {
    id: 'agent',
    label: 'Pay a “recovery expert” who messaged me offering help',
    minutes: 5,
    points: () => -15,
    extraLoss: 5000,
    good: false,
    feedback: 'Recovery scams target people who have just been scammed. Your ₹5,000 “fee” is gone too.',
  },
  {
    id: 'reply',
    label: 'Message the scammer and beg for the money back',
    minutes: 10,
    points: () => -5,
    good: false,
    feedback: 'They blocked you, after you wasted ten precious minutes.',
  },
  {
    id: 'wait',
    label: 'Wait and see if it comes back by itself',
    minutes: 30,
    points: () => 0,
    good: false,
    feedback: 'Waiting is the costliest move. Every minute, the money moves further along a chain of accounts.',
  },
];

interface Taken {
  action: Action;
  at: number;
  points: number;
}

interface Props {
  game: GoldenHourGame;
  onFinish: (result: GameResult) => void;
}

/** You have just been scammed: spend your golden hour well. Every action costs minutes. */
export function GoldenHourPlayer({ onFinish }: Props) {
  const [clock, setClock] = useState(0);
  const [taken, setTaken] = useState<Taken[]>([]);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    const score = clampScore(taken.reduce((sum, t) => sum + t.points, 0));
    const extraLoss = taken.reduce((sum, t) => sum + (t.action.extraLoss ?? 0), 0);
    const reported = taken.find((t) => t.action.id === '1930');
    onFinish({
      score,
      outcome: score >= 80 ? 'safe' : score >= 45 ? 'shaken' : 'lost',
      title: score >= 80 ? 'Golden-hour hero' : score >= 55 ? 'Good instincts' : score >= 30 ? 'Too slow' : 'The money is gone',
      text:
        (reported ? `You reported at minute ${reported.at}. ` : 'You never reported it to 1930. ') +
        (extraLoss ? `You also lost another ${inr(extraLoss)} along the way. ` : '') +
        'The ideal order: call 1930 first, then your bank, then save evidence and change passwords.',
      review: {
        title: 'Your moves, in order',
        items: [...taken].reverse().map((t) => ({ label: `Minute ${t.at}: ${t.action.label}`, note: t.action.feedback, good: t.action.good })),
      },
    });
  }, [taken, onFinish]);
  // The clock reads the latest finish through a ref, so actions do not restart the tick.
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    if (clock >= LIMIT) {
      finishRef.current();
      return;
    }
    const t = setTimeout(() => setClock((c) => c + 1), 1000);
    return () => clearTimeout(t);
  }, [clock]);

  const take = (a: Action) => {
    if (taken.some((t) => t.action.id === a.id)) return;
    setTaken((list) => [{ action: a, at: clock, points: a.points(clock) }, ...list]);
    setClock((c) => Math.min(LIMIT, c + a.minutes));
  };

  const score = clampScore(taken.reduce((sum, t) => sum + t.points, 0));
  const latest = taken[0]?.action;

  return (
    <div className="golden">
      <p className="golden__sms">
        <Siren size={15} /> ₹40,000 debited from A/c XX4417 via UPI to <b>unknown beneficiary</b>. Not you?
      </p>
      <div className="golden__clock">
        <span className={`mono ${LIMIT - clock <= 15 ? 'golden__time--low' : ''}`}>
          <AlarmClock size={16} /> {clock} / {LIMIT} min
        </span>
        <span className="golden__odds">
          Recovery chances <b className="mono">{score}/100</b>
        </span>
      </div>
      <div className="golden__track" aria-hidden="true">
        <span style={{ width: `${(clock / LIMIT) * 100}%` }} />
      </div>

      <div className="golden__log" aria-live="polite">
        {latest ? (
          <p className={latest.good ? 'golden__fb golden__fb--good' : 'golden__fb golden__fb--bad'}>{latest.feedback}</p>
        ) : (
          <p className="golden__fb">Every action takes time. Pick your moves, fast.</p>
        )}
      </div>

      <div className="golden__actions-grid">
        {ACTIONS.map((a) => {
          const used = taken.some((t) => t.action.id === a.id);
          return (
            <button key={a.id} className={`golden__action ${used ? 'golden__action--done' : ''}`} onClick={() => take(a)} disabled={used}>
              <span>{a.label}</span>
              <em className="mono">{used ? <Check size={14} /> : `${a.minutes} min`}</em>
            </button>
          );
        })}
      </div>
      <button className="link-button golden__stop" onClick={finish}>
        I have done everything I can
      </button>
    </div>
  );
}
