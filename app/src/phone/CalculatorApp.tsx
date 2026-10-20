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
  const investedPct = future > 0 ? (invested / future) * 100 : 100;

  return (
    <div className="calc">
      <div className="calc__result">
        <span>You end up with</span>
        <strong>{inr(future)}</strong>
        <div className="calc__split" aria-hidden="true">
          <span className="calc__split-in" style={{ width: `${investedPct}%` }} />
          <span className="calc__split-growth" />
        </div>
        <div className="calc__legend">
          <span>
            <i className="calc__key calc__key--in" /> Put in {inr(invested)}
          </span>
          <span>
            <i className="calc__key calc__key--growth" /> Interest {inr(future - invested)}
          </span>
        </div>
      </div>
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
      <p className="phone-empty">Illustration only — assumes a fixed rate. Real returns vary.</p>
    </div>
  );
}
