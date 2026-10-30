import { Lightbulb } from 'lucide-react';
import { useSimStore } from '../engine/simStore';
import { render } from '../engine/template';
import type { NarrativeScreen } from '../engine/types';
import { useReadAloud } from '../i18n/t';
import type { ScreenProps } from './screenProps';

type Block = { type: 'p'; text: string } | { type: 'steps'; items: string[] };

/** Consecutive "1. …" paragraphs become a numbered step list. */
function toBlocks(body: string[]): Block[] {
  const out: Block[] = [];
  for (const p of body) {
    const step = p.match(/^\d+\.\s+(.*)$/);
    const last = out[out.length - 1];
    if (step && last?.type === 'steps') last.items.push(step[1]);
    else if (step) out.push({ type: 'steps', items: [step[1]] });
    else out.push({ type: 'p', text: p });
  }
  return out;
}

export function NarrativeView({ def }: ScreenProps<NarrativeScreen>) {
  const sim = useSimStore();
  const [name, role] = def.speaker?.split(', ') ?? [];
  // Course chapters are English for now, so they are read in the English voice.
  useReadAloud([def.title, ...def.body.map((p) => render(p, sim))].join('. '), 'en');
  return (
    <article className="screen">
      {name && (
        <div className="speaker">
          <span className="avatar" aria-hidden="true">
            {name[0]}
          </span>
          <div>
            <strong>{name}</strong>
            {role && <span>{role}</span>}
          </div>
        </div>
      )}
      <h1 className="display">{def.title}</h1>
      {toBlocks(def.body).map((b, i) =>
        b.type === 'p' ? (
          <p key={i} className={i === 0 ? 'lead' : undefined}>
            {render(b.text, sim)}
          </p>
        ) : (
          <ol key={i} className="steps">
            {b.items.map((item, j) => (
              <li key={j}>
                <span className="steps__num">{j + 1}</span>
                <span>{render(item, sim)}</span>
              </li>
            ))}
          </ol>
        ),
      )}
      {def.callout && (
        <div className="callout">
          <Lightbulb size={20} />
          <span>{render(def.callout, sim)}</span>
        </div>
      )}
    </article>
  );
}
