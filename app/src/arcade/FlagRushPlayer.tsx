import { ArrowRight, Mail, MessageCircle, MessageSquare, Timer } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { useT } from '../i18n/t';
import { segment } from '../screens/segment';
import { clampScore } from './meta';
import type { FlagRushGame, GameResult } from './types';

const CHANNEL_ICON = { SMS: MessageSquare, WhatsApp: MessageCircle, Email: Mail } as const;
const MISS_PENALTY = 4;

interface Props {
  game: FlagRushGame;
  onFinish: (result: GameResult) => void;
}

/** Timed hunt: flags look like plain text; tapping anything else costs points. */
export function FlagRushPlayer({ game, onFinish }: Props) {
  const t = useT();
  const [round, setRound] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [misses, setMisses] = useState(0);
  const [left, setLeft] = useState(game.seconds);
  const [shake, setShake] = useState(0);
  const done = useRef(false);

  const total = game.rounds.reduce((n, r) => n + r.flags.length, 0);
  const current = game.rounds[round];
  // Translated snippets appear verbatim in the translated message (checked when the dictionary changes).
  const flags = current.flags.map((f) => ({ id: f.id, snippet: t(f.snippet) }));
  const key = (r: number, id: string) => `${r}:${id}`;
  const roundComplete = current.flags.every((f) => found.includes(key(round, f.id)));

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    const score = clampScore((found.length / total) * 100 - misses * MISS_PENALTY);
    onFinish({
      score,
      outcome: score >= 80 ? 'safe' : score >= 50 ? 'shaken' : 'lost',
      title: t('{found} of {total} red flags found', { found: found.length, total }),
      text:
        (misses ? `${t('{n} wrong taps (−{p}).', { n: misses, p: misses * MISS_PENALTY })} ` : '') +
        t('Scammers count on you reading fast. Every flag you missed is one they hope you will miss for real.'),
      review: {
        title: t('Every red flag'),
        items: game.rounds.flatMap((r, ri) =>
          r.flags.map((f) => ({ label: `“${t(f.snippet)}”`, note: t(f.why), good: found.includes(key(ri, f.id)) })),
        ),
      },
    });
  }, [found, misses, total, game, onFinish, t]);
  // The timer reads the latest finish through a ref, so taps do not restart the countdown.
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    if (left <= 0) {
      finishRef.current();
      return;
    }
    const timer = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  const advance = useCallback(() => {
    if (round < game.rounds.length - 1) setRound((r) => r + 1);
    else finish();
  }, [round, game.rounds.length, finish]);

  useEffect(() => {
    if (!roundComplete) return;
    const timer = setTimeout(advance, 700);
    return () => clearTimeout(timer);
  }, [roundComplete, advance]);

  const hit = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    setFound((f) => (f.includes(key(round, id)) ? f : [...f, key(round, id)]));
  };

  const miss = () => {
    setMisses((m) => m + 1);
    setShake((s) => s + 1);
  };

  // The sender line can hold a flag too (a lookalike email domain), so both lines are tappable.
  const renderFlags = (text: string) =>
    segment(text, flags).map((seg, i) =>
      seg.flagId ? (
        <button
          key={i}
          className={`rush-flag ${found.includes(key(round, seg.flagId)) ? 'rush-flag--found' : ''}`}
          onClick={(e) => hit(e, seg.flagId!)}
        >
          {seg.text}
        </button>
      ) : (
        <span key={i}>{seg.text}</span>
      ),
    );

  const Icon = CHANNEL_ICON[current.channel];
  const roundFound = current.flags.filter((f) => found.includes(key(round, f.id))).length;

  return (
    <div className="rush">
      <div className="rush__bar">
        <span className={`rush__timer ${left <= 10 ? 'rush__timer--low' : ''}`}>
          <Timer size={16} /> <span className="mono">{left}s</span>
        </span>
        <span className="rush__count">
          {t('Message {r}/{n}', { r: round + 1, n: game.rounds.length })} · <strong>{roundFound}</strong>/{current.flags.length}{' '}
          {t('flags')}
        </span>
        <span className="rush__score mono">
          {found.length * 10 - misses * MISS_PENALTY} {t('pts')}
        </span>
      </div>
      <div className="rush__track" aria-hidden="true">
        <span style={{ width: `${(left / game.seconds) * 100}%` }} />
      </div>

      <div key={`${round}-${shake}`} className={`artifact rush__card ${shake ? 'rush__card--shake' : ''}`} onClick={miss}>
        <div className="artifact__head">
          <span className="artifact__app">
            <Icon size={16} />
          </span>
          <span className="artifact__from">{renderFlags(current.from)}</span>
          <span className="artifact__time">{current.channel}</span>
        </div>
        <div className="artifact__text">{renderFlags(t(current.text))}</div>
      </div>

      <p className="hint center">{t('Tap the suspicious words. Wrong taps cost {n} points.', { n: MISS_PENALTY })}</p>
      <div className="rof__next">
        <button className="btn btn--ghost" onClick={advance}>
          {round < game.rounds.length - 1 ? t('Skip to next message') : t('Finish')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
