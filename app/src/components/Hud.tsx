import { formatDate, inr } from '../engine/dates';
import { computeFhs, netWorth } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';

/** Side panel with date, balances, health score and XP (FiAlly's left/right "HUD"). */
export function Hud() {
  const sim = useSimStore();
  const fhs = computeFhs(sim);
  return (
    <div className="hud-inner">
      <div className="hud-date">
        <span className="stat__label">Simulation date</span>
        <strong>{formatDate(sim.simDate)}</strong>
      </div>

      <div className="fhs" aria-label={`Financial health score ${fhs.score} out of 100, ${fhs.tier}`}>
        <div className="fhs__head">
          <span className="stat__label">Health score</span>
          <strong>
            {fhs.score} <small>{fhs.tier}</small>
          </strong>
        </div>
        <div className="meter" aria-hidden="true">
          <div className={`meter__fill meter__fill--${fhs.tier.toLowerCase()}`} style={{ width: `${fhs.score}%` }} />
        </div>
        <dl className="fhs__parts">
          <div>
            <dt>Cushion</dt>
            <dd>{fhs.parts.cushion}/40</dd>
          </div>
          <div>
            <dt>Habit</dt>
            <dd>{fhs.parts.habit}/20</dd>
          </div>
          <div>
            <dt>Safety</dt>
            <dd>{fhs.parts.safety}/40</dd>
          </div>
        </dl>
      </div>

      <dl className="balances">
        <div>
          <dt>Cash</dt>
          <dd>{inr(sim.cash)}</dd>
        </div>
        <div>
          <dt>Savings</dt>
          <dd>{inr(sim.savings)}</dd>
        </div>
        <div>
          <dt>Recurring deposit</dt>
          <dd>{inr(sim.rd)}</dd>
        </div>
        <div className="balances__total">
          <dt>Net worth</dt>
          <dd>{inr(netWorth(sim))}</dd>
        </div>
        {sim.totalLost > 0 && (
          <div className="balances__lost">
            <dt>Lost to scams</dt>
            <dd>{inr(sim.totalLost)}</dd>
          </div>
        )}
        <div>
          <dt>XP</dt>
          <dd>{sim.xp}</dd>
        </div>
      </dl>
    </div>
  );
}
