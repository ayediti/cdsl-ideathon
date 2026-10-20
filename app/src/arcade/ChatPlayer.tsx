import { PhoneCall, ShieldCheck, TrendingDown, TrendingUp, UserRound, Users, Video } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { clampScore, prefersReducedMotion } from './meta';
import type { ChatChoice, ChatGame, ChatLine, GameResult } from './types';

interface Props {
  game: ChatGame;
  onFinish: (result: GameResult) => void;
}

interface Step {
  node: string;
  choice?: ChatChoice;
}

const LETTERS = 'ABCD';

/** Plays a branching chat, call or group conversation, revealing lines one by one. */
export function ChatPlayer({ game, onFinish }: Props) {
  const [path, setPath] = useState<Step[]>([{ node: game.start }]);
  const [shown, setShown] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const reduced = useMemo(prefersReducedMotion, []);

  const lines = useMemo<ChatLine[]>(
    () =>
      path.flatMap((step) => [
        ...game.nodes[step.node].lines,
        ...(step.choice ? [{ from: 'me', text: step.choice.label }] : []),
      ]),
    [path, game],
  );
  const current = game.nodes[path[path.length - 1].node];
  const settled = shown >= lines.length;
  const ticker = [...path].reverse().map((s) => game.nodes[s.node].ticker).find(Boolean);

  useEffect(() => {
    if (settled) return;
    const next = lines[shown];
    const delay = next.from === 'me' || reduced ? 150 : Math.min(1600, 500 + next.text.length * 12);
    const t = setTimeout(() => setShown((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [shown, settled, lines, reduced]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  }, [shown, reduced]);

  useEffect(() => {
    if (!settled || !current.end) return;
    const choices = path.flatMap((s) => (s.choice ? [s.choice] : []));
    const score = clampScore(100 + choices.reduce((sum, c) => sum + c.points, 0));
    const end = current.end;
    const t = setTimeout(
      () =>
        onFinish({
          score: end.outcome === 'lost' ? Math.min(score, 30) : score,
          outcome: end.outcome,
          title: end.title,
          text: end.text,
          review: {
            title: 'Your choices',
            items: choices.map((c) => ({ label: c.label, note: c.note, good: c.points >= 0 })),
          },
        }),
      reduced ? 300 : 1400,
    );
    return () => clearTimeout(t);
  }, [settled, current, path, onFinish, reduced]);

  const choose = (choice: ChatChoice) => {
    setPath((p) => [...p.slice(0, -1), { ...p[p.length - 1], choice }, { node: choice.next }]);
  };

  const HeadIcon = game.channel === 'video' ? Video : game.channel === 'call' ? PhoneCall : Users;
  const typingFrom = !settled && lines[shown].from !== 'me' && lines[shown].from !== 'system' ? lines[shown].from : null;

  return (
    <div className={`chat chat--${game.channel}`}>
      <div className="chat__head">
        <span className="chat__avatar">
          <HeadIcon size={20} />
        </span>
        <div className="chat__who">
          <strong>{game.contact.name}</strong>
          <span>{game.contact.detail}</span>
        </div>
        {ticker && (
          <span className={`ticker ${ticker.change.startsWith('−') ? 'ticker--down' : 'ticker--up'}`}>
            {ticker.change.startsWith('−') ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
            <b>{ticker.symbol}</b> {ticker.price} <em>{ticker.change}</em>
          </span>
        )}
      </div>

      {game.channel === 'video' && (
        <div className="chat__feed" aria-hidden="true">
          <span className="chat__emblem">
            <ShieldCheck size={22} />
          </span>
          <UserRound size={84} strokeWidth={1.2} />
          <span className="chat__live">● LIVE</span>
        </div>
      )}

      <div className="chat__log" aria-live="polite">
        {lines.slice(0, shown).map((l, i) =>
          l.from === 'system' ? (
            <p key={i} className="chat__system">
              {l.text}
            </p>
          ) : (
            <div key={i} className={`bubble ${l.from === 'me' ? 'bubble--me' : 'bubble--them'}`}>
              {l.from !== 'me' && <span className="bubble__from">{l.from}</span>}
              {l.text}
            </div>
          ),
        )}
        {typingFrom && (
          <div className="bubble bubble--them bubble--typing" aria-label={`${typingFrom} is typing`}>
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {settled && current.choices && (
        <div className="options chat__choices" role="group" aria-label="Your reply">
          {current.choices.map((c, i) => (
            <button key={c.label} className="option" onClick={() => choose(c)}>
              <span className="option__letter">{LETTERS[i]}</span>
              <span className="option__text">
                <span className="option__label">{c.label}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
