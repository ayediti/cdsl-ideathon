import { ArrowDownLeft, ArrowUpRight, Ban, Repeat } from 'lucide-react';
import { useEffect } from 'react';
import { BANK_NAME } from '../brand';
import { formatDate, inr } from '../engine/dates';
import { useSimStore } from '../engine/simStore';

export function BankApp() {
  const { savings, rd, mandates, transactions } = useSimStore();
  const setFlag = useSimStore((s) => s.setFlag);

  useEffect(() => {
    setFlag('bank_opened', true);
  }, [setFlag]);

  const bankTxns = transactions.filter((t) => t.account !== 'cash').slice(0, 25);

  return (
    <div className="bank">
      <div className="bank-card">
        <div className="bank-card__top">
          <span>{BANK_NAME}</span>
          <span className="bank-card__chip" aria-hidden="true" />
        </div>
        <span className="bank-card__label">Savings · XX4417</span>
        <strong className="bank-card__balance">{inr(savings)}</strong>
        <div className="bank-card__foot">
          <span>Recurring deposit</span>
          <b>{inr(rd)}</b>
        </div>
      </div>

      {mandates.length > 0 && (
        <section className="bank-section">
          <h4>Auto-debits</h4>
          {mandates.map((m) => (
            <div key={m.id} className="mandate">
              <span className="mandate__icon">
                <Repeat size={16} />
              </span>
              <div>
                <strong>{m.label}</strong>
                <span>
                  {m.runs}/{m.maxRuns} paid{m.runs < m.maxRuns && ` · next ${formatDate(m.nextDate)}`}
                </span>
              </div>
              <span className="mandate__bar" aria-hidden="true">
                <span style={{ width: `${(m.runs / m.maxRuns) * 100}%` }} />
              </span>
            </div>
          ))}
        </section>
      )}

      <section className="bank-section">
        <h4>Statement</h4>
        {bankTxns.length === 0 ? (
          <p className="phone-empty">No transactions yet.</p>
        ) : (
          <ul className="txn-list">
            {bankTxns.map((t) => {
              const Icon = t.status === 'failed' ? Ban : t.type === 'credit' ? ArrowDownLeft : ArrowUpRight;
              return (
                <li key={t.id} className={`txn ${t.status === 'failed' ? 'txn--failed' : ''}`}>
                  <span className={`txn__icon txn__icon--${t.status === 'failed' ? 'failed' : t.type}`}>
                    <Icon size={16} />
                  </span>
                  <span className="txn__body">
                    <span className="txn__desc">{t.description}</span>
                    <span className="txn__meta">
                      {formatDate(t.date)} · {t.counterparty}
                    </span>
                  </span>
                  <span className={`amount amount--${t.type === 'credit' ? 'in' : 'out'}`}>
                    {t.type === 'credit' ? '+' : '−'}
                    {inr(t.amount)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
