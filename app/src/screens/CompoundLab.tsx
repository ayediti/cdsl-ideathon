import { useEffect, useMemo, useState } from 'react';
import { inr } from '../engine/dates';
import type { CustomScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

/** Value after `years` of saving `monthly` at `rate`% a year, compounded monthly (deposit at start of month). */
function futureValue(monthly: number, rate: number, years: number): number {
  const r = rate / 100 / 12;
  const n = years * 12;
  if (n === 0) return 0;
  return r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

const W = 440;
const H = 180;
const PAD = { l: 8, r: 8, t: 10, b: 20 };
const GAP = 2;

/** Sliders for amount, time and rate, with invested vs growth stacked per year. */
export function CompoundLab({ def, setReady }: ScreenProps<CustomScreen>) {
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(7);
  const [touched, setTouched] = useState<string[]>([]);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (touched.length >= 2) setReady(true);
  }, [touched.length, setReady]);

  const touch = (k: string) => setTouched((t) => (t.includes(k) ? t : [...t, k]));

  const rows = useMemo(
    () =>
      Array.from({ length: years }, (_, i) => {
        const y = i + 1;
        const total = futureValue(monthly, rate, y);
        const invested = monthly * 12 * y;
        return { year: y, invested, growth: Math.max(0, total - invested), total };
      }),
    [monthly, rate, years],
  );
  const final = rows[rows.length - 1];
  const late = years > 10 ? futureValue(monthly, rate, years - 10) : 0;

  const max = final.total;
  const bw = (W - PAD.l - PAD.r) / rows.length;
  const yScale = (v: number) => (v / max) * (H - PAD.t - PAD.b);
  const base = H - PAD.b;

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      {def.intro && <p className="lead">{def.intro}</p>}

      <div className="lab">
        <div className="lab__sliders">
          <label>
            <span>
              Save every month <b className="mono">{inr(monthly)}</b>
            </span>
            <input type="range" min={500} max={10000} step={500} value={monthly} onChange={(e) => (setMonthly(+e.target.value), touch('m'))} />
          </label>
          <label>
            <span>
              For <b className="mono">{years} years</b>
            </span>
            <input type="range" min={1} max={40} value={years} onChange={(e) => (setYears(+e.target.value), touch('y'))} />
          </label>
          <label>
            <span>
              Assumed return <b className="mono">{rate}% a year</b>
            </span>
            <input type="range" min={3} max={12} step={0.5} value={rate} onChange={(e) => (setRate(+e.target.value), touch('r'))} />
          </label>
          <p className="hint">For illustration only. Real returns vary, and market returns are never guaranteed.</p>
        </div>

        <div className="lab__stats">
          <div>
            <span className="label">You put in</span>
            <strong className="mono">{inr(final.invested)}</strong>
          </div>
          <div>
            <span className="label">Growth on top</span>
            <strong className="mono">{inr(final.growth)}</strong>
          </div>
          <div>
            <span className="label">You end with</span>
            <strong className="mono">{inr(final.total)}</strong>
          </div>
        </div>

        <div className="lab__legend" aria-hidden="true">
          <span>
            <i className="lab__swatch lab__swatch--1" /> What you put in
          </span>
          <span>
            <i className="lab__swatch lab__swatch--2" /> Growth
          </span>
        </div>
        <div className="lab__chart" onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`After ${years} years: ${inr(final.invested)} put in, ${inr(final.growth)} growth`}>
            {rows.map((r, i) => {
              const x = PAD.l + i * bw + (rows.length > 20 ? 0.5 : 1.5);
              const w = Math.max(1.5, bw - (rows.length > 20 ? 1 : 3));
              const hi = yScale(r.invested);
              const hg = yScale(r.growth);
              return (
                <g key={r.year} onMouseEnter={() => setHover(i)}>
                  <rect className="lab__hit" x={PAD.l + i * bw} y={PAD.t} width={bw} height={H - PAD.t - PAD.b} />
                  <rect className="lab__bar lab__bar--1" x={x} y={base - hi} width={w} height={hi} rx={w > 6 ? 3 : 1} opacity={hover === null || hover === i ? 1 : 0.55} />
                  {hg > GAP && (
                    <rect
                      className="lab__bar lab__bar--2"
                      x={x}
                      y={base - hi - hg}
                      width={w}
                      height={hg - GAP}
                      rx={w > 6 ? 3 : 1}
                      opacity={hover === null || hover === i ? 1 : 0.55}
                    />
                  )}
                </g>
              );
            })}
            <line className="lab__grid" x1={PAD.l} x2={W - PAD.r} y1={base} y2={base} />
            <text className="lab__tick" x={PAD.l} y={H - 4}>
              Year 1
            </text>
            <text className="lab__tick" x={W - PAD.r} y={H - 4} textAnchor="end">
              Year {years}
            </text>
          </svg>
          {hover !== null && (
            <div className="lab__tip" style={{ left: `${((PAD.l + (hover + 0.5) * bw) / W) * 100}%`, top: `${((base - yScale(rows[hover].total)) / H) * 100}%` }}>
              <strong>Year {rows[hover].year}</strong>
              <span>Put in {inr(rows[hover].invested)}</span>
              <span>Growth {inr(rows[hover].growth)}</span>
              <span className="mono">Total {inr(rows[hover].total)}</span>
            </div>
          )}
        </div>

        <p className="lab__why" aria-live="polite">
          {years > 10
            ? `Start 10 years later and you would end with ${inr(late)}, ${inr(final.total - late)} less. Time does more of the work than the amount.`
            : 'Stretch the years beyond 10 and watch the green part take over. That is compounding.'}
        </p>
      </div>
    </article>
  );
}
