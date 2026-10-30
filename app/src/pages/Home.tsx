import { ArrowRight, BookMarked, Check, Gamepad2, Layers, PartyPopper, Play, RotateCcw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { DnaCard } from '../components/DnaCard';
import { AccessControls } from '../components/AccessControls';
import { Hud } from '../components/Hud';
import { Logo } from '../components/Logo';
import { ALL_CHAPTERS, chapterKey, MODULES, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';
import { VirtualPhone } from '../phone/VirtualPhone';

/** Journey map: every chapter, its status, and a resume button. */
export function Home() {
  const { completed, progress, dna, reset } = useSimStore();
  const state = useLocation().state as { justCompleted?: string; completedKey?: string; nextTitle?: string } | null;

  const doneCount = ALL_CHAPTERS.filter((c) => completed.includes(chapterKey(c))).length;
  const nextUp = ALL_CHAPTERS.find((c) => !completed.includes(chapterKey(c)));
  const inProgress =
    progress && nextUp && progress.moduleId === nextUp.moduleId && progress.chapterId === nextUp.id
      ? `/play/${progress.moduleId}/${progress.chapterId}/${progress.screenId}`
      : null;
  const ctaPath = inProgress ?? (nextUp ? screenPath(nextUp) : null);

  const onReset = () => {
    if (window.confirm('Reset all progress and start the simulation again?')) reset();
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="topbar__meta">
          <span className="topbar__module">The course</span>
        </div>
        <AccessControls />
        <Link to="/" className="icon-btn icon-btn--label">
          <Gamepad2 size={18} />
          <span>Scam games</span>
        </Link>
        <Link to="/library" className="icon-btn icon-btn--label">
          <BookMarked size={18} />
          <span>Library</span>
        </Link>
      </header>

      <div className="layout">
        <main className="stage">
          {state?.justCompleted && (
            <div className="banner" role="status">
              <PartyPopper size={22} />
              <span>
                <strong>
                  Chapter complete: {state.justCompleted}
                  {/[.?!]$/.test(state.justCompleted) ? '' : '.'}
                </strong>
                {state.nextTitle ? ` Next up: ${state.nextTitle}.` : ' You have finished everything available so far.'}
              </span>
            </div>
          )}

          {/* The Money DNA result is shown once, right after the chapter that produces it. */}
          {dna && state?.completedKey === chapterKey(ALL_CHAPTERS[0]) && (
            <section className="module">
              <div className="module__head">
                <span className="module__num mono">★</span>
                <div>
                  <h2>Your Money DNA</h2>
                  <p>How you tend to decide about money.</p>
                </div>
              </div>
              <DnaCard result={dna} />
            </section>
          )}

          <section className="welcome">
            <div className="welcome__text">
              <span className="eyebrow">Learn the markets</span>
              <h1 className="display">{nextUp ? (doneCount ? 'Pick up where you left off' : 'Your investing life starts here') : 'All caught up'}</h1>
              <p className="lead">
                {doneCount} of {ALL_CHAPTERS.length} chapters complete
                {nextUp && (
                  <>
                    {' '}
                    · next: <strong>{nextUp.title}</strong>
                  </>
                )}
              </p>
              <div className="welcome__bar" aria-hidden="true">
                <span style={{ width: `${(doneCount / ALL_CHAPTERS.length) * 100}%` }} />
              </div>
              <div className="welcome__actions">
                {ctaPath && (
                  <Link to={ctaPath} className="btn btn--primary btn--lg">
                    <Play size={18} /> {inProgress ? 'Resume' : doneCount ? 'Start next chapter' : 'Start'}
                  </Link>
                )}
              </div>
            </div>
          </section>

          {MODULES.map((m, mi) => (
            <section key={m.id} className="module">
              <div className="module__head">
                <span className="module__num mono">{String(mi).padStart(2, '0')}</span>
                <div>
                  <h2>{m.title}</h2>
                  <p>{m.tagline}</p>
                </div>
              </div>
              <ol className="path">
                {m.chapters.map((c) => {
                  const n = ALL_CHAPTERS.indexOf(c) + 1;
                  const done = completed.includes(chapterKey(c));
                  const current = !done && c === nextUp;
                  const status = done ? 'done' : current ? 'current' : 'open';
                  const label = { done: 'Completed', current: 'Up next', open: 'Ready' }[status];
                  const to = current && inProgress ? inProgress : screenPath(c);
                  return (
                    <li key={c.id} className={`path__item is-${status}`}>
                      <span className="path__node" aria-hidden="true">
                        {done ? <Check size={18} /> : n}
                      </span>
                      <div className="path__card">
                        <div className="path__text">
                          <span className="path__status">{label}</span>
                          <h3>{c.title}</h3>
                          <p>{c.blurb}</p>
                          <span className="path__meta">
                            <Layers size={14} /> {c.screenSequence.length} screens
                          </span>
                        </div>
                        <Link className={done ? 'btn btn--ghost' : current ? 'btn btn--primary' : 'btn btn--secondary'} to={to}>
                          {done ? (
                            <>
                              <RotateCcw size={16} /> Replay
                            </>
                          ) : (
                            <>
                              {current && inProgress ? 'Continue' : 'Start'} <ArrowRight size={16} />
                            </>
                          )}
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}

          <button className="link-button link-button--danger" onClick={onReset}>
            <RotateCcw size={15} /> Reset simulation
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
