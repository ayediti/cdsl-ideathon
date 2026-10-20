import { useSimStore } from '../engine/simStore';
import { render } from '../engine/template';
import type { NarrativeScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

export function NarrativeView({ def }: ScreenProps<NarrativeScreen>) {
  const sim = useSimStore();
  return (
    <article className="screen">
      {def.speaker && <p className="eyebrow">{def.speaker}</p>}
      <h1>{def.title}</h1>
      {def.body.map((p, i) => (
        <p key={i}>{render(p, sim)}</p>
      ))}
      {def.callout && <div className="callout">{render(def.callout, sim)}</div>}
    </article>
  );
}
