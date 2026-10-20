import { ArrowRight, BookMarked, Check, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GAMES } from '../arcade/games';
import { GAME_ICON, useArcadeStore } from '../arcade/meta';
import { Logo } from '../components/Logo';
import { ALL_CHAPTERS, chapterKey, MODULES, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';

const AUDIENCE_SHORT = { Students: 'Students', 'First-time investors': 'New investors', 'Senior citizens': 'Seniors' } as const;

const PROMISES = ['Simulated money only', 'Not investment advice', 'Never asks for PAN, Aadhaar or OTP', 'No sign-up'];

/** One screen: scam games on the side, the course and its syllabus in the middle. */
export function Landing() {
  const { progress, completed } = useSimStore();
  const best = useArcadeStore((s) => s.best);
  const resume = progress ? `/play/${progress.moduleId}/${progress.chapterId}/${progress.screenId}` : null;

  return (
    <div className="home">
      <header className="topbar topbar--clear">
        <Logo />
        <nav className="topnav" aria-label="Main">
          <Link to="/learn">Course map</Link>
          <Link to="/library">
            <BookMarked size={16} /> Library
          </Link>
        </nav>
      </header>

      <div className="home__grid">
        <aside className="home__games" id="games" aria-labelledby="games-title">
          <div className="home__games-head">
            <span className="eyebrow">Scam games · 2 min each</span>
            <h2 id="games-title">Get scammed here, not out there</h2>
          </div>
          <ul className="game-list">
            {GAMES.map((g, i) => {
              const Icon = GAME_ICON[g.icon];
              return (
                <li key={g.id}>
                  <Link to={`/arcade/${g.id}`} className={`game-row tone-${g.tone}`}>
                    <span className="game-row__icon">
                      <Icon size={20} />
                    </span>
                    <span className="game-row__text">
                      <strong>
                        {g.title}
                        {i === 0 && <em className="game-row__badge">Start here</em>}
                      </strong>
                      <span>{g.audiences.map((a) => AUDIENCE_SHORT[a]).join(' · ')}</span>
                    </span>
                    {best[g.id] !== undefined ? <span className="game-row__best mono">{best[g.id]}</span> : <ArrowRight size={16} className="game-row__go" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="home__learn">
          <div className="home__intro">
            <span className="pill">
              <Sparkles size={14} /> The deeper dive
            </span>
            <h1 className="home__title">Learn about markets, and live them.</h1>
            <p className="lead">
              A story-driven simulation with a virtual phone and simulated rupees: from what a share is to your first demat account,
              your CAS, IPOs and investor scams. Start at the beginning, or jump to any chapter.
            </p>
            <div className="home__cta">
              {resume ? (
                <Link to={resume} className="btn btn--primary btn--lg">
                  Continue where I left off <ArrowRight size={18} />
                </Link>
              ) : (
                <Link to={screenPath(ALL_CHAPTERS[0])} className="btn btn--primary btn--lg">
                  <GraduationCap size={18} /> Start from the beginning
                </Link>
              )}
            </div>
          </div>

          <ol className="syllabus" aria-label="Chapters">
            {MODULES.flatMap((m) =>
              m.chapters.map((c) => {
                const n = ALL_CHAPTERS.indexOf(c) + 1;
                const done = completed.includes(chapterKey(c));
                return (
                  <li key={chapterKey(c)}>
                    <Link to={screenPath(c)} className={`syllabus__item ${done ? 'syllabus__item--done' : ''}`}>
                      <span className="syllabus__num mono">{done ? <Check size={16} /> : String(n).padStart(2, '0')}</span>
                      <span className="syllabus__text">
                        <span className="syllabus__module">{m.title}</span>
                        <strong>{c.title}</strong>
                        <span className="syllabus__blurb">{c.blurb}</span>
                      </span>
                    </Link>
                  </li>
                );
              }),
            )}
          </ol>
        </main>
      </div>

      <footer className="home__strip">
        {PROMISES.map((p) => (
          <span key={p}>
            <ShieldCheck size={15} /> {p}
          </span>
        ))}
        <span className="home__strip-alert">Real emergency? Call 1930.</span>
      </footer>
    </div>
  );
}
