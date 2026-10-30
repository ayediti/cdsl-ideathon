import { AlarmClock, Check, Siren } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { inr } from '../engine/dates';
import { useReadAloud, useT } from '../i18n/t';
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
  const t = useT();
  const [clock, setClock] = useState(0);
  const [taken, setTaken] = useState<Taken[]>([]);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    const score = clampScore(taken.reduce((sum, m) => sum + m.points, 0));
    const extraLoss = taken.reduce((sum, m) => sum + (m.action.extraLoss ?? 0), 0);
    const reported = taken.find((m) => m.action.id === '1930');
    onFinish({
      score,
      outcome: score >= 80 ? 'safe' : score >= 45 ? 'shaken' : 'lost',
      title: t(score >= 80 ? 'Golden-hour hero' : score >= 55 ? 'Good instincts' : score >= 30 ? 'Too slow' : 'The money is gone'),
      text: [
        reported ? t('You reported at minute {m}.', { m: reported.at }) : t('You never reported it to 1930.'),
        extraLoss ? t('You also lost another {amount} along the way.', { amount: inr(extraLoss) }) : '',
        t('The ideal order: call 1930 first, then your bank, then save evidence and change passwords.'),
      ]
        .filter(Boolean)
        .join(' '),
      review: {
        title: t('Your moves, in order'),
        items: [...taken].reverse().map((m) => ({
          label: t('Minute {m}: {label}', { m: m.at, label: t(m.action.label) }),
          note: t(m.action.feedback),
          good: m.action.good,
        })),
      },
    });
  }, [taken, onFinish, t]);
  // The clock reads the latest finish through a ref, so actions do not restart the tick.
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    if (clock >= LIMIT) {
      finishRef.current();
      return;
    }
    const timer = setTimeout(() => setClock((c) => c + 1), 1000);
    return () => clearTimeout(timer);
  }, [clock]);

  const take = (a: Action) => {
    if (taken.some((m) => m.action.id === a.id)) return;
    setTaken((list) => [{ action: a, at: clock, points: a.points(clock) }, ...list]);
    setClock((c) => Math.min(LIMIT, c + a.minutes));
  };

  const score = clampScore(taken.reduce((sum, m) => sum + m.points, 0));
  const latest = taken[0]?.action;
  useReadAloud(latest ? t(latest.feedback) : null);

  return (
    <div className="golden">
      <p className="golden__sms">
        <Siren size={15} /> {t('₹40,000 debited from A/c XX4417 via UPI to')} <b>{t('unknown beneficiary')}</b>. {t('Not you?')}
      </p>
      <div className="golden__clock">
        <span className={`mono ${LIMIT - clock <= 15 ? 'golden__time--low' : ''}`}>
          <AlarmClock size={16} /> {t('{clock} / {limit} min', { clock, limit: LIMIT })}
        </span>
        <span className="golden__odds">
          {t('Recovery chances')} <b className="mono">{score}/100</b>
        </span>
      </div>
      <div className="golden__track" aria-hidden="true">
        <span style={{ width: `${(clock / LIMIT) * 100}%` }} />
      </div>

      <div className="golden__log" aria-live="polite">
        {latest ? (
          <p className={latest.good ? 'golden__fb golden__fb--good' : 'golden__fb golden__fb--bad'}>{t(latest.feedback)}</p>
        ) : (
          <p className="golden__fb">{t('Every action takes time. Pick your moves, fast.')}</p>
        )}
      </div>

      <div className="golden__actions-grid">
        {ACTIONS.map((a) => {
          const used = taken.some((m) => m.action.id === a.id);
          return (
            <button key={a.id} className={`golden__action ${used ? 'golden__action--done' : ''}`} onClick={() => take(a)} disabled={used}>
              <span>{t(a.label)}</span>
              <em className="mono">{used ? <Check size={14} /> : t('{n} min', { n: a.minutes })}</em>
            </button>
          );
        })}
      </div>
      <button className="link-button golden__stop" onClick={finish}>
        {t('I have done everything I can')}
      </button>
    </div>
  );
}
