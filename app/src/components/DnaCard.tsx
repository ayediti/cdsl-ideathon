import { DNA_ORDER, DNA_QUESTIONS, DNA_TYPES } from '../engine/dna';
import type { DnaResult } from '../engine/types';

export function DnaCard({ result }: { result: Pick<DnaResult, 'dominant' | 'scores'> }) {
  const type = DNA_TYPES[result.dominant];
  return (
    <div className="dna-card" style={{ borderColor: type.color }}>
      <h2 style={{ color: type.color }}>{type.name}</h2>
      <p>{type.blurb}</p>
      <p className="dna-card__watch">
        <strong>Watch out:</strong> {type.watchOut}
      </p>
      <dl className="dna-bars">
        {DNA_ORDER.map((t) => (
          <div key={t} className="dna-bar">
            <dt>{DNA_TYPES[t].name.replace('The ', '')}</dt>
            <dd>
              <span className="dna-bar__track" aria-hidden="true">
                <span
                  className="dna-bar__fill"
                  style={{ width: `${(result.scores[t] / DNA_QUESTIONS.length) * 100}%`, background: DNA_TYPES[t].color }}
                />
              </span>
              <span className="dna-bar__num">{result.scores[t]}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
