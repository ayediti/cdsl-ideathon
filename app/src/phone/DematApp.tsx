import { ArrowDownLeft, ArrowUpRight, Flag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DP_NAME } from '../brand';
import { formatDate, inr } from '../engine/dates';
import { sharesValue } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';
import type { DematTxn } from '../engine/types';

/** Demat holdings plus the statement a CAS would show. Tapping an unauthorised line sets `cas_spotted`. */
export function DematApp() {
  const { holdings, dematTxns, flags } = useSimStore();
  const setFlag = useSimStore((s) => s.setFlag);
  const [note, setNote] = useState<{ tone: 'good' | 'neutral'; text: string } | null>(null);

  useEffect(() => {
    setFlag('demat_opened', true);
  }, [setFlag]);

  const check = (t: DematTxn) => {
    if (t.unauthorised) {
      setFlag('cas_spotted', true);
      setNote({ tone: 'good', text: 'Flagged. You did not make this transfer. Time to act fast.' });
    } else {
      setNote({ tone: 'neutral', text: 'That one is yours: it matches a purchase you made.' });
    }
  };

  return (
    <div className="bank demat">
      <div className="bank-card demat-card">
        <div className="bank-card__top">
          <span>Demat account</span>
          <span className="demat-card__dp">{DP_NAME}</span>
        </div>
        <span className="bank-card__label">BO ID ···· ···· 4417 · Depository: CDSL</span>
        <strong className="bank-card__balance">{inr(sharesValue({ holdings }))}</strong>
        <div className="bank-card__foot">
          <span>Holdings value (at cost)</span>
          <b>{holdings.length} {holdings.length === 1 ? 'company' : 'companies'}</b>
        </div>
      </div>

      <section className="bank-section">
        <h4>Holdings</h4>
        {holdings.length === 0 ? (
          <p className="phone-empty">No shares yet.</p>
        ) : (
          <ul className="txn-list">
            {holdings.map((h) => (
              <li key={h.symbol} className="txn">
                <span className="txn__icon holding__sym">{h.symbol.slice(0, 2)}</span>
                <span className="txn__body">
                  <span className="txn__desc">{h.name}</span>
                  <span className="txn__meta">
                    {h.qty} shares · avg {inr(h.price)}
                  </span>
                </span>
                <span className="amount">{inr(h.qty * h.price)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="bank-section">
        <h4>Statement (as in your CAS)</h4>
        {dematTxns.length === 0 ? (
          <p className="phone-empty">No transactions yet.</p>
        ) : (
          <>
            <p className="demat__hint">Tap any line you do not recognise.</p>
            <ul className="txn-list">
              {dematTxns.map((t) => {
                const Icon = t.type === 'credit' ? ArrowDownLeft : ArrowUpRight;
                const spotted = t.unauthorised && !!flags.cas_spotted;
                return (
                  <li key={t.id}>
                    <button className={`txn txn--button ${spotted ? 'txn--flagged' : ''}`} onClick={() => check(t)}>
                      <span className={`txn__icon txn__icon--${t.type}`}>{spotted ? <Flag size={16} /> : <Icon size={16} />}</span>
                      <span className="txn__body">
                        <span className="txn__desc">{t.description}</span>
                        <span className="txn__meta">
                          {formatDate(t.date)} · {t.symbol}
                        </span>
                      </span>
                      <span className={`amount amount--${t.type === 'credit' ? 'in' : 'out'}`}>
                        {t.type === 'credit' ? '+' : '−'}
                        {t.qty}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {note && <p className={`demat__note demat__note--${note.tone}`}>{note.text}</p>}
      </section>
    </div>
  );
}
