import { ArrowRight, CircleCheck, CircleX, Gamepad2, Gauge, RotateCcw, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHECK_SETS, type CheckItem, type CheckPhase } from '../check/items';
import { useCheckStore, type CheckScore } from '../check/store';
import { AccessControls } from '../components/AccessControls';
import { Logo } from '../components/Logo';
import { useReadAloud, useT } from '../i18n/t';

type Answer = CheckItem['answer'];

const pct = (s: CheckScore) => Math.round((s.correct / s.total) * 100);

/** /check — a one-minute scam-spotting test, taken before and after playing. Results stay on this device. */
export function SelfCheck() {
  const t = useT();
  const { before, after, record, clear } = useCheckStore();
  const phase: CheckPhase | 'done' = !before ? 'before' : !after ? 'after' : 'done';
  const [running, setRunning] = useState<CheckPhase | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [finished, setFinished] = useState<{ phase: CheckPhase; answers: Answer[] } | null>(null);

  const items = running ? CHECK_SETS[running] : [];
  const item = items[answers.length];
  useReadAloud(item ? `${t(item.from)}. ${t(item.text)}` : null);

  const start = (p: CheckPhase) => {
    setAnswers([]);
    setFinished(null);
    setRunning(p);
  };

  const answer = (a: Answer) => {
    if (!running) return;
    const next = [...answers, a];
    if (next.length < items.length) {
      setAnswers(next);
      return;
    }
    record(running, items.filter((it, i) => next[i] === it.answer).length, items.length);
    setFinished({ phase: running, answers: next });
    setRunning(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="topbar__meta">
          <span className="topbar__module">{t('Self-check')}</span>
          <span className="topbar__chapter">{t('How scam-proof are you?')}</span>
        </div>
        <AccessControls />
        <Link to="/" className="icon-btn icon-btn--label">
          <Gamepad2 size={18} />
          <span>{t('All games')}</span>
        </Link>
      </header>

      <main className="page page--game">
        {running && item && (
          <div className="game-stage tone-sky">
            <div className="rof__progress" aria-label={t('Message {i} of {n}', { i: answers.length + 1, n: items.length })}>
              {items.map((it, i) => (
                <span key={it.id} className={`pip ${i < answers.length ? 'pip--on' : i === answers.length ? 'pip--now' : ''}`} />
              ))}
            </div>
            <span className="eyebrow">{t('Message {i} of {n}', { i: answers.length + 1, n: items.length })}</span>
            <article className="rof-card" key={item.id}>
              <div className="rof-card__meta">
                <span className="rof-card__format">{t(item.channel)}</span>
                <span className="rof-card__from">{t(item.from)}</span>
              </div>
              <p className="rof-card__body">{t(item.text)}</p>
            </article>
            <div className="rof__actions">
              <button className="btn btn--xl rof__btn rof__btn--real" onClick={() => answer('safe')}>
                <ShieldCheck size={20} /> {t('Safe')}
              </button>
              <button className="btn btn--xl rof__btn rof__btn--fake" onClick={() => answer('scam')}>
                <ShieldAlert size={20} /> {t('Scam')}
              </button>
            </div>
          </div>
        )}

        {!running && (
          <div className="game-intro tone-sky">
            <span className="game-intro__icon">
              <Gauge size={34} />
            </span>
            {phase !== 'done' && !finished && (
              <>
                <span className="eyebrow">{phase === 'before' ? t('Before you play') : t('After you play')}</span>
                <h1 className="display">{t('How scam-proof are you?')}</h1>
                <p className="lead">
                  {t('Six messages, about a minute. Decide whether each one is safe or a scam. Your answers stay on this device.')}
                </p>
                {before && <Scores before={before} after={null} />}
                <button className="btn btn--primary btn--xl" onClick={() => start(phase)}>
                  {t('Start the check')} <ArrowRight size={20} />
                </button>
              </>
            )}

            {finished && (
              <>
                <span className="eyebrow">{finished.phase === 'before' ? t('Before you play') : t('After you play')}</span>
                <h1 className="display">
                  {t('Your score: {correct} of {total}', {
                    correct: CHECK_SETS[finished.phase].filter((it, i) => finished.answers[i] === it.answer).length,
                    total: CHECK_SETS[finished.phase].length,
                  })}
                </h1>
                {finished.phase === 'before' ? (
                  <>
                    <p className="lead">{t('Now play a few scam games, then come back for the after-check.')}</p>
                    <div className="game-end__actions">
                      <Link className="btn btn--primary" to="/">
                        <Gamepad2 size={16} /> {t('Play the scam games')}
                      </Link>
                      <button className="btn btn--ghost" onClick={() => setFinished(null)}>
                        {t('Take the after-check now')} <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <Scores before={before} after={after} />
                )}
              </>
            )}

            {phase === 'done' && !finished && (
              <>
                <h1 className="display">{t('How scam-proof are you?')}</h1>
                <Scores before={before} after={after} />
              </>
            )}

            {phase === 'done' && (
              <button
                className="link-button"
                onClick={() => {
                  clear();
                  setFinished(null);
                }}
              >
                <RotateCcw size={15} /> {t('Retake both checks')}
              </button>
            )}
            <p className="game-intro__note">
              <ShieldCheck size={16} /> {t('Your results never leave this device.')}
            </p>
          </div>
        )}

        {finished && (
          <section className="game-end__section check__answers">
            <h2>{t('Answers explained')}</h2>
            <ul className="review">
              {CHECK_SETS[finished.phase].map((it, i) => {
                const good = finished.answers[i] === it.answer;
                return (
                  <li key={it.id} className={good ? 'review__item review__item--good' : 'review__item review__item--bad'}>
                    {good ? <CircleCheck size={20} /> : <CircleX size={20} />}
                    <div>
                      <strong>
                        {t(it.answer === 'scam' ? 'Scam' : 'Safe')}: {t(it.text)}
                      </strong>
                      <p>{t(it.why)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

function Scores({ before, after }: { before: CheckScore | null; after: CheckScore | null }) {
  const t = useT();
  if (!before) return null;
  const delta = after ? pct(after) - pct(before) : 0;
  return (
    <div className="check__scores">
      <div className="check__score">
        <span className="label">{t('Before you play')}</span>
        <strong className="mono">{pct(before)}%</strong>
        <span>{t('Before: {b} of {n}', { b: before.correct, n: before.total })}</span>
      </div>
      {after && (
        <div className="check__score check__score--after">
          <span className="label">{t('After you play')}</span>
          <strong className="mono">{pct(after)}%</strong>
          <span>{t('After: {a} of {n}', { a: after.correct, n: after.total })}</span>
        </div>
      )}
      {after && (
        <p className="check__delta">
          {delta > 0
            ? t('You improved by {d}.', { d: `+${delta}%` })
            : delta === 0
              ? t('Same score as before. Play a few more games and try again.')
              : t('A little lower this time. Replay the games and try again.')}
        </p>
      )}
    </div>
  );
}
