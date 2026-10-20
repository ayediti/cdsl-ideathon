import { Eye, MessageSquare, PhoneIncoming, Siren } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { AutopsyFlag, AutopsyScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

interface Segment {
  text: string;
  flagId?: string;
}

/** Splits text so each flag snippet becomes its own tappable segment. */
function segment(text: string, flags: AutopsyFlag[]): Segment[] {
  const hits = flags
    .map((f) => ({ id: f.id, start: text.indexOf(f.snippet), length: f.snippet.length }))
    .filter((h) => h.start >= 0)
    .sort((a, b) => a.start - b.start);
  const out: Segment[] = [];
  let pos = 0;
  for (const h of hits) {
    if (h.start < pos) continue;
    if (h.start > pos) out.push({ text: text.slice(pos, h.start) });
    out.push({ text: text.slice(h.start, h.start + h.length), flagId: h.id });
    pos = h.start + h.length;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}

export function AutopsyView({ def, setReady }: ScreenProps<AutopsyScreen>) {
  const [found, setFound] = useState<string[]>([]);
  const allFound = found.length === def.flags.length;

  useEffect(() => {
    if (allFound) setReady(true);
  }, [allFound, setReady]);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    for (const f of def.flags) {
      if (!def.artifact.text.includes(f.snippet) && !def.artifact.from.includes(f.snippet)) {
        console.error(`[autopsy] snippet not found: "${f.snippet}"`);
      }
    }
  }, [def]);

  const mark = (id: string) => setFound((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const renderSegments = (text: string) =>
    segment(text, def.flags).map((seg, i) =>
      seg.flagId ? (
        <button
          key={i}
          className={`flag ${found.includes(seg.flagId) ? 'flag--found' : ''}`}
          onClick={() => mark(seg.flagId!)}
        >
          {seg.text}
        </button>
      ) : (
        <span key={i}>{seg.text}</span>
      ),
    );

  const isCall = def.artifact.channel === 'call';

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      <p className="lead">{def.intro}</p>

      <div className={`artifact artifact--${def.artifact.channel}`}>
        <div className="artifact__head">
          <span className="artifact__app">{isCall ? <PhoneIncoming size={16} /> : <MessageSquare size={16} />}</span>
          <span className="artifact__from">{renderSegments(def.artifact.from)}</span>
          <span className="artifact__time">{isCall ? 'Incoming call' : 'now'}</span>
        </div>
        <div className="artifact__text">{renderSegments(def.artifact.text)}</div>
      </div>

      <div className="flag-progress" aria-live="polite">
        <div className="flag-progress__pips" aria-hidden="true">
          {def.flags.map((f) => (
            <span key={f.id} className={found.includes(f.id) ? 'pip pip--on' : 'pip'} />
          ))}
        </div>
        <span>
          <strong>{found.length}</strong> of {def.flags.length} red flags found
        </span>
        {!allFound && (
          <button className="link-button" onClick={() => setFound(def.flags.map((f) => f.id))}>
            <Eye size={15} /> Reveal all
          </button>
        )}
      </div>

      <ul className="flag-cards">
        {def.flags
          .filter((f) => found.includes(f.id))
          .map((f) => (
            <li key={f.id} className="flag-card">
              <span className="flag-card__icon">
                <Siren size={18} />
              </span>
              <div>
                <strong>“{f.snippet}”</strong>
                <p>{f.why}</p>
              </div>
            </li>
          ))}
      </ul>
    </article>
  );
}
