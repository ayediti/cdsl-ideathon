import { ArrowRight, Clock, Gamepad2, ShieldCheck } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChatPlayer } from '../arcade/ChatPlayer';
import { FlagRushPlayer } from '../arcade/FlagRushPlayer';
import { GameEnd } from '../arcade/GameEnd';
import { GoldenHourPlayer } from '../arcade/GoldenHourPlayer';
import { getGame } from '../arcade/games';
import { GAME_ICON, useArcadeStore } from '../arcade/meta';
import { RealOrFakePlayer } from '../arcade/RealOrFakePlayer';
import type { ArcadeGame, GameResult } from '../arcade/types';
import { AccessControls } from '../components/AccessControls';
import { Logo } from '../components/Logo';
import { useReadAloud, useT } from '../i18n/t';

/** /arcade/:gameId — one bite-sized, shareable scam game. */
export function ArcadePage() {
  const { gameId = '' } = useParams();
  const game = getGame(gameId);
  const record = useArcadeStore((s) => s.record);
  const [phase, setPhase] = useState<'intro' | 'play' | 'end'>('intro');
  const [result, setResult] = useState<GameResult | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setPhase('intro');
    setResult(null);
    window.scrollTo(0, 0);
  }, [gameId]);

  const finish = useCallback(
    (r: GameResult) => {
      setResult(r);
      setPhase('end');
      record(gameId, r.score);
      window.scrollTo(0, 0);
    },
    [gameId, record],
  );

  const t = useT();
  if (!game) return <Navigate to="/" replace />;

  const play = () => {
    setRun((n) => n + 1);
    setPhase('play');
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="topbar__meta">
          <span className="topbar__module">{t('Scam games')}</span>
          <span className="topbar__chapter">{t(game.title)}</span>
        </div>
        <AccessControls />
        <Link to="/" className="icon-btn icon-btn--label">
          <Gamepad2 size={18} />
          <span>{t('All games')}</span>
        </Link>
      </header>

      <main className="page page--game">
        {phase === 'intro' && <GameIntro game={game} onStart={play} />}
        {phase === 'play' && (
          <div className={`game-stage tone-${game.tone}`} key={run}>
            {game.kind === 'chat' && <ChatPlayer game={game} onFinish={finish} />}
            {game.kind === 'realOrFake' && <RealOrFakePlayer game={game} onFinish={finish} />}
            {game.kind === 'flagRush' && <FlagRushPlayer game={game} onFinish={finish} />}
            {game.kind === 'goldenHour' && <GoldenHourPlayer game={game} onFinish={finish} />}
          </div>
        )}
        {phase === 'end' && result && <GameEnd game={game} result={result} onReplay={play} />}
      </main>
    </div>
  );
}

function GameIntro({ game, onStart }: { game: ArcadeGame; onStart: () => void }) {
  const Icon = GAME_ICON[game.icon];
  const best = useArcadeStore((s) => s.best[game.id]);
  const t = useT();
  useReadAloud(`${t(game.title)}. ${t(game.tagline)}`);
  return (
    <div className={`game-intro tone-${game.tone}`}>
      <span className="game-intro__icon">
        <Icon size={34} />
      </span>
      <span className="eyebrow">
        <Clock size={13} /> {t('{n} min · scam game', { n: game.minutes })}
      </span>
      <h1 className="display">{t(game.title)}</h1>
      <p className="lead">{t(game.tagline)}</p>
      <ul className="audience-chips" aria-label="Made for">
        {game.audiences.map((a) => (
          <li key={a}>{t(a)}</li>
        ))}
      </ul>
      <button className="btn btn--primary btn--xl" onClick={onStart}>
        {t('Play')} <ArrowRight size={20} />
      </button>
      {best !== undefined && <p className="hint">{t('Your best: {n}/100', { n: best })}</p>}
      <p className="game-intro__note">
        <ShieldCheck size={16} /> {t('Everything is simulated. No real money, no sign-up, nothing about you is collected.')}
      </p>
    </div>
  );
}
