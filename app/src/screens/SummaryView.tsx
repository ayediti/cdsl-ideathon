import { computeFhs } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';
import { render } from '../engine/template';
import type { SummaryScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

export function SummaryView({ def }: ScreenProps<SummaryScreen>) {
  const sim = useSimStore();
  const fhs = computeFhs(sim);
  return (
    <article className="screen">
      <p className="eyebrow">Chapter complete</p>
      <h1>{def.title}</h1>
      <ul className="takeaways">
        {def.points.map((p, i) => (
          <li key={i}>{render(p, sim)}</li>
        ))}
      </ul>
      <div className="stat-row">
        <div className="stat">
          <span className="stat__label">Health score</span>
          <span className="stat__value">
            {fhs.score} <small>{fhs.tier}</small>
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">Total XP</span>
          <span className="stat__value">{sim.xp}</span>
        </div>
      </div>
    </article>
  );
}
