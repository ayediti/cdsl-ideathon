import { useEffect } from 'react';
import { useSimStore } from '../engine/simStore';
import type { DecisionOption, DecisionScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

const TONE_LABEL = { good: 'Smart move', bad: 'Ouch', neutral: 'Hmm' } as const;

export function DecisionView({ def, screenKey, setReady }: ScreenProps<DecisionScreen>) {
  const chosen = useSimStore((s) => s.flags[def.saveAs]) as string | undefined;
  const picked = def.options.find((o) => o.id === chosen);

  useEffect(() => {
    if (chosen) setReady(true);
  }, [chosen, setReady]);

  const choose = (option: DecisionOption) => {
    if (chosen) return;
    useSimStore
      .getState()
      .apply([{ type: 'flag', key: def.saveAs, value: option.id }, ...(option.effects ?? [])], `decision:${screenKey}`);
  };

  return (
    <article className="screen">
      <h1>{def.title}</h1>
      <p className="prompt">{def.prompt}</p>
      <div className="options" role="group" aria-label="Choices">
        {def.options.map((o) => (
          <button
            key={o.id}
            className={`option ${chosen === o.id ? 'option--picked' : ''}`}
            onClick={() => choose(o)}
            disabled={!!chosen && chosen !== o.id}
            aria-pressed={chosen === o.id}
          >
            <span className="option__label">{o.label}</span>
            {o.detail && <span className="option__detail">{o.detail}</span>}
          </button>
        ))}
      </div>
      {picked && (
        <div className={`outcome outcome--${picked.tone}`} role="status">
          <strong>{TONE_LABEL[picked.tone]}.</strong> {picked.outcome}
        </div>
      )}
    </article>
  );
}
