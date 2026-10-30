import { ArrowRight, BookOpen, CircleCheck, CircleX, Gauge, GraduationCap, RotateCcw, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCheckStore } from '../check/store';
import { ScoreRing } from '../components/ScoreRing';
import { useReadAloud, useT } from '../i18n/t';
import { GAMES } from './games';
import { scoreTier } from './meta';
import { ShareBar } from './ShareBar';
import type { ArcadeGame, GameResult } from './types';

interface Props {
  game: ArcadeGame;
  result: GameResult;
  onReplay: () => void;
}

/** The debrief. The players build `result` already translated; this translates the game's own lists. */
export function GameEnd({ game, result, onReplay }: Props) {
  const t = useT();
  const { tier, label } = scoreTier(result.score);
  const next = GAMES[(GAMES.indexOf(game) + 1) % GAMES.length];
  const awaitingAfterCheck = useCheckStore((s) => !!s.before && !s.after);
  useReadAloud(`${result.title}. ${result.text}`);

  return (
    <div className={`game-end game-end--${result.outcome}`}>
      <div className="game-end__top">
        <ScoreRing score={result.score} tier={tier} label={t(label)} />
        <div>
          <span className="eyebrow">{t(game.title)}</span>
          <h1 className="display">{result.title}</h1>
          <p className="lead">{result.text}</p>
        </div>
      </div>

      <ShareBar
        text={t('I scored {score}/100 on “{title}”. Could you spot the scam?', { score: result.score, title: t(game.title) })}
        path={`/arcade/${game.id}`}
      />

      {awaitingAfterCheck && (
        <Link to="/check" className="check-nudge">
          <Gauge size={18} />
          <span>{t('Played a few games? Take the after-check and see how much you have improved.')}</span>
          <strong>
            {t('Take the after-check')} <ArrowRight size={15} />
          </strong>
        </Link>
      )}

      <section className="game-end__section">
        <h2>{result.review.title}</h2>
        <ul className="review">
          {result.review.items.map((item, i) => (
            <li key={i} className={item.good ? 'review__item review__item--good' : 'review__item review__item--bad'}>
              {item.good ? <CircleCheck size={20} /> : <CircleX size={20} />}
              <div>
                <strong>{item.label}</strong>
                <p>{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {game.redFlags.length > 0 && (
        <section className="game-end__section">
          <h2>{t('Red flags to remember')}</h2>
          <ul className="flag-cards">
            {game.redFlags.map((f) => (
              <li key={f.title} className="flag-card">
                <span className="flag-card__icon">
                  <Siren size={18} />
                </span>
                <div>
                  <strong>{t(f.title)}</strong>
                  <p>{t(f.why)}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="game-end__section">
        <h2>{t('If this happens for real')}</h2>
        <ol className="steps">
          {game.respond.map((step, i) => (
            <li key={i}>
              <span className="steps__num">{i + 1}</span>
              <span>{t(step)}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="game-end__actions">
        <button className="btn btn--ghost" onClick={onReplay}>
          <RotateCcw size={16} /> {t('Play again')}
        </button>
        <Link className="btn btn--ghost" to={`/library/${game.learnMore.slug}`}>
          <BookOpen size={16} /> {t('Read: {label}', { label: t(game.learnMore.label) })}
        </Link>
        <Link className="btn btn--ghost" to="/learn">
          <GraduationCap size={16} /> {t('Go deeper in the course')}
        </Link>
        <Link className="btn btn--primary" to={`/arcade/${next.id}`}>
          {t('Next: {title}', { title: t(next.title) })} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
