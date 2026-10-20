import { useEffect } from 'react';
import { BANK_NAME } from '../brand';
import { formatDate, inr } from '../engine/dates';
import { ACCOUNT_LABEL, useSimStore } from '../engine/simStore';

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
        <span>{BANK_NAME} · Savings XX4417</span>
        <strong>{inr(savings)}</strong>
        {rd > 0 && <span>Recurring deposit: {inr(rd)}</span>}
      </div>

      {mandates.length > 0 && (
        <section>
          <h4>Auto-debits</h4>
          <ul className="plain-list">
            {mandates.map((m) => (
              <li key={m.id}>
                {m.label} · {m.runs}/{m.maxRuns} paid
                {m.runs < m.maxRuns && <> · next {formatDate(m.nextDate)}</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h4>Statement</h4>
        {bankTxns.length === 0 ? (
          <p className="hint">No transactions yet.</p>
        ) : (
          <ul className="txn-list">
            {bankTxns.map((t) => (
              <li key={t.id} className={t.status === 'failed' ? 'txn txn--failed' : 'txn'}>
                <div>
                  <span className="txn__desc">{t.description}</span>
                  <span className="txn__meta">
                    {formatDate(t.date)} · {ACCOUNT_LABEL[t.account]} · {t.counterparty}
                  </span>
                </div>
                <span className={t.type === 'credit' ? 'amount amount--in' : 'amount amount--out'}>
                  {t.type === 'credit' ? '+' : '−'}
                  {inr(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
