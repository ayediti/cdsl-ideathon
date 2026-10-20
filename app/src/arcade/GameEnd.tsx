import { ArrowRight, BookOpen, CircleCheck, CircleX, GraduationCap, RotateCcw, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScoreRing } from '../components/ScoreRing';
import { GAMES } from './games';
import { scoreTier } from './meta';
import { ShareBar } from './ShareBar';
import type { ArcadeGame, GameResult } from './types';

interface Props {
  game: ArcadeGame;
  result: GameResult;
  onReplay: () => void;
}

export function GameEnd({ game, result, onReplay }: Props) {
  const { tier, label } = scoreTier(result.score);
  const next = GAMES[(GAMES.indexOf(game) + 1) % GAMES.length];

  return (
    <div className={`game-end game-end--${result.outcome}`}>
      <div className="game-end__top">
        <ScoreRing score={result.score} tier={tier} label={label} />
        <div>
          <span className="eyebrow">{game.title}</span>
          <h1 className="display">{result.title}</h1>
          <p className="lead">{result.text}</p>
        </div>
      </div>

      <ShareBar text={`I scored ${result.score}/100 on “${game.title}”. Could you spot the scam?`} path={`/arcade/${game.id}`} />

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
          <h2>Red flags to remember</h2>
          <ul className="flag-cards">
            {game.redFlags.map((f) => (
              <li key={f.title} className="flag-card">
                <span className="flag-card__icon">
                  <Siren size={18} />
                </span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.why}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="game-end__section">
        <h2>If this happens for real</h2>
        <ol className="steps">
          {game.respond.map((step, i) => (
            <li key={i}>
              <span className="steps__num">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="game-end__actions">
        <button className="btn btn--ghost" onClick={onReplay}>
          <RotateCcw size={16} /> Play again
        </button>
        <Link className="btn btn--ghost" to={`/library/${game.learnMore.slug}`}>
          <BookOpen size={16} /> Read: {game.learnMore.label}
        </Link>
        <Link className="btn btn--ghost" to="/learn">
          <GraduationCap size={16} /> Go deeper in the course
        </Link>
        <Link className="btn btn--primary" to={`/arcade/${next.id}`}>
          Next: {next.title} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
