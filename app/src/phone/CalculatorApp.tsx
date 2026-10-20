import { useState } from 'react';
import { inr } from '../engine/dates';

/** Monthly-deposit growth calculator (FiAlly installs a calculator in its compounding chapter). */
export function CalculatorApp() {
  const [monthly, setMonthly] = useState(1000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(5);

  const months = Math.max(0, Math.round(years * 12));
  const r = rate / 100 / 12;
  const invested = monthly * months;
  const future = r === 0 ? invested : monthly * ((Math.pow(1 + r, months) - 1) / r);

  return (
    <div className="calc">
      <label>
        Monthly deposit (₹)
        <input type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} />
      </label>
      <label>
        Interest rate (% a year)
        <input type="number" min={0} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} />
      </label>
      <label>
        Years
        <input type="number" min={0} max={50} value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} />
      </label>
      <dl className="calc__out">
        <div>
          <dt>You put in</dt>
          <dd>{inr(invested)}</dd>
        </div>
        <div>
          <dt>You end up with</dt>
          <dd>{inr(future)}</dd>
        </div>
        <div>
          <dt>Growth from interest</dt>
          <dd>{inr(future - invested)}</dd>
        </div>
      </dl>
      <p className="hint">Illustration only — assumes a fixed rate. Real returns vary.</p>
    </div>
  );
}
