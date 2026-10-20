import { useEffect, useMemo, useState } from 'react';
import type { OrderScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

/** Stable shuffle (seeded by the step ids) so the order does not jump between renders or reloads. */
function shuffle<T extends { id: string }>(items: T[]): T[] {
  const seed = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 9973, 7);
  const out = [...items].sort((a, b) => seed(a.id) - seed(b.id));
  // Never show the answer as-is.
  return out.every((s, i) => s.id === items[i].id) ? [...out.slice(1), out[0]] : out;
}

/** Tap the steps in the right order. A wrong tap explains nothing yet; it just nudges. */
export function OrderView({ def, setReady }: ScreenProps<OrderScreen>) {
  const pool = useMemo(() => shuffle(def.steps), [def.steps]);
  const [placed, setPlaced] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const done = placed.length === def.steps.length;

  useEffect(() => {
    if (done) setReady(true);
  }, [done, setReady]);

  const tap = (id: string) => {
    if (id === def.steps[placed.length].id) {
      setPlaced((p) => [...p, id]);
      setWrong(null);
    } else {
      setWrong(id);
      setMistakes((m) => m + 1);
    }
  };

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      <p className="lead">{def.intro}</p>

      <ol className="steps order__placed">
        {placed.map((id, i) => {
          const step = def.steps.find((s) => s.id === id)!;
          return (
            <li key={id}>
              <span className="steps__num">{i + 1}</span>
              <span>
                <strong>{step.label}</strong>
                <span className="order__detail">{step.detail}</span>
              </span>
            </li>
          );
        })}
      </ol>

      {!done ? (
        <>
          <p className="order__prompt">
            {placed.length === 0 ? 'What happens first?' : 'What comes next?'}
            {wrong && <span className="order__nudge"> Not yet. Something else has to happen before that.</span>}
          </p>
          <div className="order__pool">
            {pool
              .filter((s) => !placed.includes(s.id))
              .map((s) => (
                <button key={s.id} className={`order__chip ${wrong === s.id ? 'order__chip--wrong' : ''}`} onClick={() => tap(s.id)}>
                  {s.label}
                </button>
              ))}
          </div>
        </>
      ) : (
        <p className="hint">{mistakes === 0 ? 'Perfect order on the first try.' : `Done, with ${mistakes} wrong ${mistakes === 1 ? 'guess' : 'guesses'} along the way.`}</p>
      )}
    </article>
  );
}
