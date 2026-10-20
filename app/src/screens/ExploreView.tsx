import { Lightbulb, MousePointerClick } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ExploreScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

/** Tap-to-reveal cards. Continue unlocks once every card has been opened. */
export function ExploreView({ def, setReady }: ScreenProps<ExploreScreen>) {
  const [open, setOpen] = useState<string[]>([]);
  const allOpen = open.length === def.cards.length;

  useEffect(() => {
    if (allOpen) setReady(true);
  }, [allOpen, setReady]);

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      <p className="lead">{def.intro}</p>
      <div className="explore">
        {def.cards.map((c, i) => {
          const isOpen = open.includes(c.id);
          return (
            <button
              key={c.id}
              className={`explore__card ${isOpen ? 'explore__card--open' : ''}`}
              onClick={() => setOpen((o) => (o.includes(c.id) ? o : [...o, c.id]))}
              aria-expanded={isOpen}
            >
              <span className="explore__num">{i + 1}</span>
              <strong>{c.label}</strong>
              {isOpen ? <span className="explore__body">{c.body}</span> : <span className="explore__hint">{c.hint ?? 'Tap to find out'}</span>}
            </button>
          );
        })}
      </div>
      {!allOpen ? (
        <p className="hint explore__left">
          <MousePointerClick size={15} /> {def.cards.length - open.length} left to open
        </p>
      ) : (
        def.callout && (
          <div className="callout">
            <Lightbulb size={20} />
            <span>{def.callout}</span>
          </div>
        )
      )}
    </article>
  );
}
