import { Banknote, Briefcase, CalendarDays, Landmark, PiggyBank, ShieldAlert, Zap } from 'lucide-react';
import { formatDate, inr } from '../engine/dates';
import { computeFhs, netWorth, sharesValue } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';
import { ScoreRing } from './ScoreRing';

/** Side panel with date, health score, balances and XP (FiAlly's "HUD"). */
export function Hud() {
  const sim = useSimStore();
  const fhs = computeFhs(sim);
  const level = Math.floor(sim.xp / 100) + 1;
  const parts = [
    { name: 'Cushion', value: fhs.parts.cushion, max: 40 },
    { name: 'Habit', value: fhs.parts.habit, max: 20 },
    { name: 'Safety', value: fhs.parts.safety, max: 40 },
  ];

  return (
    <div className="hud-inner">
      <div className="hud-date">
        <span className="hud-date__icon">
          <CalendarDays size={18} />
        </span>
        <div>
          <span className="label">Simulation date</span>
          <strong>{formatDate(sim.simDate)}</strong>
        </div>
      </div>

      <div className="hud-score" aria-label={`Financial health score ${fhs.score} out of 100, ${fhs.tier}`}>
        <ScoreRing score={fhs.score} tier={fhs.tier} />
        <div className="hud-score__parts">
          <span className="label">Financial health</span>
          {parts.map((p) => (
            <div key={p.name} className="part">
              <span>{p.name}</span>
              <span className="part__bar">
                <span style={{ width: `${(p.value / p.max) * 100}%` }} />
              </span>
              <span className="mono">
                {p.value}/{p.max}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hud-networth">
        <span className="label">Net worth</span>
        <strong className="mono">{inr(netWorth(sim))}</strong>
      </div>

      <ul className="hud-balances">
        <li>
          <span className="ico tone-sun">
            <Banknote size={16} />
          </span>
          <span>Cash</span>
          <b className="mono">{inr(sim.cash)}</b>
        </li>
        <li>
          <span className="ico tone-brand">
            <Landmark size={16} />
          </span>
          <span>Savings</span>
          <b className="mono">{inr(sim.savings)}</b>
        </li>
        <li>
          <span className="ico tone-sky">
            <PiggyBank size={16} />
          </span>
          <span>Recurring deposit</span>
          <b className="mono">{inr(sim.rd)}</b>
        </li>
        {sim.unlockedApps.includes('demat') && (
          <li>
            <span className="ico tone-violet">
              <Briefcase size={16} />
            </span>
            <span>Shares (at cost)</span>
            <b className="mono">{inr(sharesValue(sim))}</b>
          </li>
        )}
        {sim.totalLost > 0 && (
          <li className="hud-balances__lost">
            <span className="ico tone-coral">
              <ShieldAlert size={16} />
            </span>
            <span>Lost to scams</span>
            <b className="mono">−{inr(sim.totalLost)}</b>
          </li>
        )}
      </ul>

      <div className="hud-xp">
        <div className="hud-xp__head">
          <span className="level">
            <Zap size={14} /> Level {level}
          </span>
          <span className="mono">{sim.xp} XP</span>
        </div>
        <div className="xpbar" aria-hidden="true">
          <span style={{ width: `${sim.xp % 100}%` }} />
        </div>
      </div>
    </div>
  );
}
