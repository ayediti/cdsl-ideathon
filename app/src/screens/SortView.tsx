import { ArrowRight, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSimStore } from '../engine/simStore';
import type { SortScreen } from '../engine/types';
import { Outcome } from './Outcome';
import type { ScreenProps } from './screenProps';

const XP_PER_CORRECT = 5;

/** One item at a time: pick its bucket, see why, move on. Placed items collect under their buckets. */
export function SortView({ def, screenKey, setReady }: ScreenProps<SortScreen>) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const item = def.items[index];
  const picked = item ? answers[item.id] : undefined;
  const done = index >= def.items.length;

  useEffect(() => {
    if (done) setReady(true);
  }, [done, setReady]);

  const pick = (bucket: string) => {
    if (!item || picked) return;
    setAnswers((a) => ({ ...a, [item.id]: bucket }));
    if (bucket === item.bucket) {
      useSimStore.getState().apply([{ type: 'xp', amount: XP_PER_CORRECT }], `sort:${screenKey}:${item.id}`);
    }
  };

  const correct = def.items.filter((i) => answers[i.id] === i.bucket).length;

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      <p className="lead">{def.intro}</p>

      {!done && item && (
        <div className="sort__current">
          <span className="sort__count mono">
            {index + 1} / {def.items.length}
          </span>
          <p className="sort__item">{item.label}</p>
          <div className="sort__buckets" role="group" aria-label="Choose a group">
            {def.buckets.map((b) => {
              const state = !picked ? '' : b.id === item.bucket ? 'sort__bucket--right' : b.id === picked ? 'sort__bucket--wrong' : '';
              return (
                <button key={b.id} className={`sort__bucket ${state}`} onClick={() => pick(b.id)} disabled={!!picked}>
                  {b.label}
                </button>
              );
            })}
          </div>
          {picked && (
            <>
              <Outcome tone={picked === item.bucket ? 'good' : 'bad'} title={picked === item.bucket ? 'Right' : 'Not quite'}>
                {item.why}
              </Outcome>
              <div className="sort__next">
                <button className="btn btn--primary" onClick={() => setIndex(index + 1)}>
                  {index === def.items.length - 1 ? 'See them all' : 'Next'} <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {done && (
        <p className="lead">
          <strong>
            {correct} of {def.items.length}
          </strong>{' '}
          sorted right on the first try.
        </p>
      )}

      <div className="sort__board">
        {def.buckets.map((b) => (
          <div key={b.id} className="sort__column">
            <span className="sort__column-head">{b.label}</span>
            <ul>
              {def.items
                .filter((i) => answers[i.id] && i.bucket === b.id)
                .map((i) => (
                  <li key={i.id} className={answers[i.id] === i.bucket ? 'sort__placed' : 'sort__placed sort__placed--fixed'}>
                    {answers[i.id] === i.bucket ? <Check size={14} /> : <X size={14} />} {i.label}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
}
