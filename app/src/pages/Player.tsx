import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { BRAND } from '../brand';
import { HelpPanel } from '../components/HelpPanel';
import { Hud } from '../components/Hud';
import {
  chapterKey,
  getChapter,
  getModule,
  isChapterUnlocked,
  nextChapter,
  screenPath,
} from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';
import type { Chapter, ScreenDef } from '../engine/types';
import { VirtualPhone } from '../phone/VirtualPhone';
import { ScreenView } from '../screens/ScreenView';

/** /play/:moduleId/:chapterId/:screenId — the core simulator player. */
export function Player() {
  const { moduleId = '', chapterId = '', screenId = '' } = useParams();
  const completed = useSimStore((s) => s.completed);
  const [helpOpen, setHelpOpen] = useState(false);

  const chapter = getChapter(moduleId, chapterId);
  const def = chapter?.screens[screenId];
  const index = chapter ? chapter.screenSequence.indexOf(screenId) : -1;
  const key = `${moduleId}/${chapterId}/${screenId}`;
  const allowed = !!chapter && !!def && index >= 0 && isChapterUnlocked(chapter, completed);

  useEffect(() => {
    if (!allowed || !def) return;
    const sim = useSimStore.getState();
    sim.setProgress({ moduleId, chapterId, screenId });
    if (def.onEnter?.length) sim.apply(def.onEnter, `enter:${key}`);
    setHelpOpen(false);
    window.scrollTo(0, 0);
  }, [key, allowed]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!allowed || !chapter || !def) return <Navigate to="/home" replace />;

  const mod = getModule(moduleId);
  const pct = Math.round(((index + 1) / chapter.screenSequence.length) * 100);

  return (
    <div className="player">
      <header className="topbar">
        <Link to="/home" className="brand">
          {BRAND}
        </Link>
        <div className="topbar__meta">
          <span>
            {mod?.title} · {chapter.title}
          </span>
          <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress__fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button className="btn btn--ghost" onClick={() => setHelpOpen(true)}>
          Help
        </button>
      </header>

      <div className="player__body">
        <Stage key={key} chapter={chapter} def={def} index={index} screenKey={key} />
        <aside className="hud" aria-label="Your simulation">
          <Hud />
        </aside>
      </div>

      {helpOpen && <HelpPanel help={def.help} onClose={() => setHelpOpen(false)} />}
      <VirtualPhone />
    </div>
  );
}

interface StageProps {
  chapter: Chapter;
  def: ScreenDef;
  index: number;
  screenKey: string;
}

/** Keyed per screen, so `ready` starts fresh on every screen. */
function Stage({ chapter, def, index, screenKey }: StageProps) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(def.kind === 'narrative' || def.kind === 'summary');
  const isLast = index === chapter.screenSequence.length - 1;

  const goNext = () => {
    if (!isLast) {
      navigate(screenPath(chapter, chapter.screenSequence[index + 1]));
      return;
    }
    useSimStore.getState().completeChapter(chapterKey(chapter));
    const next = nextChapter(chapter);
    navigate('/home', { state: { justCompleted: chapter.title, nextTitle: next?.title } });
  };

  return (
    <main className="stage">
      <ScreenView def={def} screenKey={screenKey} setReady={setReady} />
      <nav className="stage__nav" aria-label="Screen navigation">
        {index > 0 ? (
          <button className="btn btn--ghost" onClick={() => navigate(screenPath(chapter, chapter.screenSequence[index - 1]))}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button className="btn btn--primary" onClick={goNext} disabled={!ready}>
          {isLast ? 'Finish chapter' : 'Continue'}
        </button>
      </nav>
    </main>
  );
}
