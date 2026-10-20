import { TrendingDown, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CustomScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

interface MarketEvent {
  id: string;
  label: string;
  /** Percentage moves, applied one after another (a rumour spikes, then crashes). */
  moves: number[];
  why: string;
}

const EVENTS: MarketEvent[] = [
  {
    id: 'profit',
    label: 'Kettle & Co. reports record profits',
    moves: [8],
    why: 'Good news: more people want to buy than sell, so buyers bid the price up.',
  },
  {
    id: 'rival',
    label: 'A rival opens 50 stalls next door',
    moves: [-6],
    why: 'Future profits look weaker. Owners rush to sell, and buyers only pay less.',
  },
  {
    id: 'panic',
    label: 'Global news sparks a market-wide sell-off',
    moves: [-9],
    why: 'Nothing changed at Kettle & Co. Fear alone made sellers outnumber buyers.',
  },
  {
    id: 'fund',
    label: 'A big fund buys a large stake',
    moves: [5],
    why: 'One large buyer soaking up shares pushes the price up.',
  },
  {
    id: 'rumour',
    label: 'WhatsApp rumour: “price will double!”',
    moves: [12, -15],
    why: 'The rumour pulled in buyers, then the truth came out and they all sold at once. Late buyers were left holding the loss.',
  },
];

const START = 100;
const W = 420;
const H = 170;
const PAD = { l: 40, r: 14, t: 14, b: 22 };

/** Buyers vs sellers: tap news events and watch the share price react. */
export function PriceLab({ def, setReady }: ScreenProps<CustomScreen>) {
  const [points, setPoints] = useState<{ price: number; label: string }[]>([{ price: START, label: 'Start' }]);
  const [used, setUsed] = useState<string[]>([]);
  const [hover, setHover] = useState<number | null>(null);
  const last = used.length ? EVENTS.find((e) => e.id === used[used.length - 1])! : null;

  useEffect(() => {
    if (used.length >= 3) setReady(true);
  }, [used.length, setReady]);

  const fire = (e: MarketEvent) => {
    if (used.includes(e.id)) return;
    setUsed((u) => [...u, e.id]);
    setPoints((p) => {
      const next = [...p];
      e.moves.forEach((m, i) => {
        const price = Math.round(next[next.length - 1].price * (1 + m / 100) * 10) / 10;
        next.push({ price, label: e.moves.length > 1 ? `${e.label} (${i === 0 ? 'spike' : 'crash'})` : e.label });
      });
      return next;
    });
  };

  const prices = points.map((p) => p.price);
  const lo = Math.floor(Math.min(...prices, START) / 10) * 10 - 5;
  const hi = Math.ceil(Math.max(...prices, START) / 10) * 10 + 5;
  const x = (i: number) => PAD.l + (i * (W - PAD.l - PAD.r)) / Math.max(points.length - 1, 1);
  const y = (v: number) => PAD.t + ((hi - v) * (H - PAD.t - PAD.b)) / (hi - lo);
  const current = prices[prices.length - 1];
  const change = ((current - START) / START) * 100;

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      {def.intro && <p className="lead">{def.intro}</p>}

      <div className="lab">
        <div className="lab__head">
          <div>
            <span className="label">Kettle & Co. share price (fictional)</span>
            <strong className="lab__big mono">₹{current.toFixed(1)}</strong>
          </div>
          <span className={`ticker ${change < 0 ? 'ticker--down' : 'ticker--up'}`}>
            {change < 0 ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
            <em>
              {change >= 0 ? '+' : ''}
              {change.toFixed(1)}%
            </em>
          </span>
        </div>

        <div className="lab__chart" onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Share price over ${points.length} moments, now ₹${current.toFixed(1)}`}>
            {[...new Set([lo + 5, START, hi - 5])].map((v) => (
              <g key={v}>
                <line className="lab__grid" x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} />
                <text className="lab__tick" x={PAD.l - 6} y={y(v) + 4} textAnchor="end">
                  ₹{v}
                </text>
              </g>
            ))}
            <polyline className="lab__line" points={points.map((p, i) => `${x(i)},${y(p.price)}`).join(' ')} />
            {points.map((p, i) => (
              <g key={i} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} tabIndex={0}>
                <circle className="lab__hit" cx={x(i)} cy={y(p.price)} r={14} />
                <circle className="lab__dot" cx={x(i)} cy={y(p.price)} r={hover === i ? 6 : 4.5} />
              </g>
            ))}
          </svg>
          {hover !== null && (
            <div className="lab__tip" style={{ left: `${(x(hover) / W) * 100}%`, top: `${(y(points[hover].price) / H) * 100}%` }}>
              <strong className="mono">₹{points[hover].price.toFixed(1)}</strong>
              <span>{points[hover].label}</span>
            </div>
          )}
        </div>

        <div className="lab__events">
          {EVENTS.map((e) => (
            <button key={e.id} className="order__chip" onClick={() => fire(e)} disabled={used.includes(e.id)}>
              {e.label}
            </button>
          ))}
        </div>
        <p className={`lab__why ${last ? '' : 'hint'}`} aria-live="polite">
          {last ? last.why : 'Tap a news event to see how buyers and sellers react. Try at least three.'}
        </p>
      </div>
    </article>
  );
}
