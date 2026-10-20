import { CircleCheck, Trophy } from 'lucide-react';
import type { CSSProperties } from 'react';
import { ScoreRing } from '../components/ScoreRing';
import { inr } from '../engine/dates';
import { computeFhs, netWorth } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';
import { render } from '../engine/template';
import type { SummaryScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

export function SummaryView({ def }: ScreenProps<SummaryScreen>) {
  const sim = useSimStore();
  const fhs = computeFhs(sim);
  return (
    <article className="screen summary">
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties} />
        ))}
      </div>
      <div className="summary__trophy" aria-hidden="true">
        <Trophy size={34} />
      </div>
      <h1 className="display">{def.title}</h1>
      <ul className="takeaways">
        {def.points.map((p, i) => (
          <li key={i}>
            <CircleCheck size={20} />
            <span>{render(p, sim)}</span>
          </li>
        ))}
      </ul>
      <div className="summary__stats">
        <div className="tile tile--ring">
          <ScoreRing score={fhs.score} tier={fhs.tier} size={76} />
          <span className="label">Health score</span>
        </div>
        <div className="tile">
          <span className="label">Net worth</span>
          <strong className="mono">{inr(netWorth(sim))}</strong>
        </div>
        <div className="tile">
          <span className="label">Total XP</span>
          <strong className="mono">{sim.xp}</strong>
        </div>
      </div>
    </article>
  );
}
