import { Plane, Scale, Shield, Target, TriangleAlert, type LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import { DNA_ORDER, DNA_QUESTIONS, DNA_TYPES } from '../engine/dna';
import type { DnaResult, DnaType } from '../engine/types';

export const DNA_ICON: Record<DnaType, LucideIcon> = { P: Target, A: Plane, G: Shield, S: Scale };

export function DnaCard({ result }: { result: Pick<DnaResult, 'dominant' | 'scores'> }) {
  const type = DNA_TYPES[result.dominant];
  const Icon = DNA_ICON[result.dominant];
  return (
    <div className="dna-card" style={{ '--dna': type.color } as CSSProperties}>
      <div className="dna-card__head">
        <span className="dna-card__icon">
          <Icon size={30} />
        </span>
        <div>
          <span className="eyebrow">Money DNA</span>
          <h2>{type.name}</h2>
        </div>
      </div>
      <p className="dna-card__blurb">{type.blurb}</p>
      <div className="dna-card__watch">
        <TriangleAlert size={18} />
        <span>
          <strong>Watch out:</strong> {type.watchOut}
        </span>
      </div>
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
              <span className="dna-bar__num mono">{result.scores[t]}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
