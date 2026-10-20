import { Link, useLocation } from 'react-router-dom';
import { BRAND } from '../brand';
import { DnaCard } from '../components/DnaCard';
import { Hud } from '../components/Hud';
import { chapterKey, isChapterUnlocked, MODULES, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';
import { VirtualPhone } from '../phone/VirtualPhone';

/** Journey map: every chapter, its status, and a resume button. */
export function Home() {
  const { completed, progress, dna, reset } = useSimStore();
  const state = useLocation().state as { justCompleted?: string; nextTitle?: string } | null;

  const resumePath = progress ? `/play/${progress.moduleId}/${progress.chapterId}/${progress.screenId}` : null;

  const onReset = () => {
    if (window.confirm('Reset all progress and start the simulation again?')) reset();
  };

  return (
    <div className="player">
      <header className="topbar">
        <Link to="/" className="brand">
          {BRAND}
        </Link>
        <div className="topbar__meta">
          <span>Your journey</span>
        </div>
        <Link to="/library" className="btn btn--ghost">
          Library
        </Link>
      </header>

      <div className="player__body">
        <main className="stage">
          {state?.justCompleted && (
            <div className="outcome outcome--good" role="status">
              <strong>Chapter complete: {state.justCompleted}.</strong>
              {state.nextTitle ? ` Next up: ${state.nextTitle}.` : ' You have finished everything available so far.'}
            </div>
          )}

          <div className="journey-head">
            <h1>Journey map</h1>
            {resumePath && (
              <Link to={resumePath} className="btn btn--primary">
                Resume
              </Link>
            )}
          </div>

          {MODULES.map((m, mi) => (
            <section key={m.id} className="module">
              <p className="eyebrow">
                Module {String(mi).padStart(2, '0')} · {m.tagline}
              </p>
              <h2>{m.title}</h2>
              <ol className="chapters">
                {m.chapters.map((c) => {
                  const done = completed.includes(chapterKey(c));
                  const unlocked = isChapterUnlocked(c, completed);
                  const current = progress?.moduleId === c.moduleId && progress.chapterId === c.id && !done;
                  const status = done ? 'Completed' : current ? 'In progress' : unlocked ? 'Ready' : 'Locked';
                  return (
                    <li key={c.id} className={`chapter chapter--${status.toLowerCase().replace(' ', '-')}`}>
                      <div>
                        <h3>{c.title}</h3>
                        <p>{c.blurb}</p>
                        <span className="chapter__meta">
                          {c.screenSequence.length} screens · {status}
                        </span>
                      </div>
                      {unlocked ? (
                        <Link
                          className={done ? 'btn btn--ghost' : 'btn btn--secondary'}
                          to={current && resumePath ? resumePath : screenPath(c)}
                        >
                          {done ? 'Replay' : current ? 'Continue' : 'Start'}
                        </Link>
                      ) : (
                        <span className="lock" aria-label="Locked">
                          🔒
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}

          {dna && (
            <section className="module">
              <p className="eyebrow">Your Money DNA</p>
              <DnaCard result={dna} />
            </section>
          )}

          <button className="link-button danger" onClick={onReset}>
            Reset simulation
          </button>
        </main>
        <aside className="hud" aria-label="Your simulation">
          <Hud />
        </aside>
      </div>
      <VirtualPhone />
    </div>
  );
}
