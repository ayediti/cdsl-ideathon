import { ArrowRight, ChevronLeft, Flag, LifeBuoy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { HelpPanel } from '../components/HelpPanel';
import { Hud } from '../components/Hud';
import { Logo } from '../components/Logo';
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
import { kindMeta } from '../screens/kindMeta';
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
  const total = chapter.screenSequence.length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo to="/home" />
        <div className="topbar__meta">
          <span className="topbar__module">{mod?.title}</span>
          <span className="topbar__chapter">{chapter.title}</span>
        </div>
        <button className="icon-btn icon-btn--label" onClick={() => setHelpOpen(true)}>
          <LifeBuoy size={18} />
          <span>Help</span>
        </button>
        <div
          className="segments"
          role="progressbar"
          aria-label="Chapter progress"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          {chapter.screenSequence.map((id, i) => (
            <span key={id} className={i < index ? 'seg seg--done' : i === index ? 'seg seg--now' : 'seg'} />
          ))}
        </div>
      </header>

      <div className="layout">
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
  const meta = kindMeta(def);

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
      <div className={`stage-card tone-${meta.tone}`}>
        <div className="kind-banner">
          <span className="kind-banner__icon">
            <meta.Icon size={18} />
          </span>
          <span className="kind-banner__label">{meta.label}</span>
          <span className="kind-banner__count mono">
            {index + 1} / {chapter.screenSequence.length}
          </span>
        </div>
        <div className="stage-card__body">
          <ScreenView def={def} screenKey={screenKey} setReady={setReady} />
        </div>
      </div>
      <nav className="stage__nav" aria-label="Screen navigation">
        {index > 0 ? (
          <button
            className="btn btn--ghost"
            onClick={() => navigate(screenPath(chapter, chapter.screenSequence[index - 1]))}
          >
            <ChevronLeft size={18} /> Back
          </button>
        ) : (
          <span />
        )}
        <button className="btn btn--primary btn--lg" onClick={goNext} disabled={!ready}>
          {isLast ? (
            <>
              Finish chapter <Flag size={18} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={18} />
            </>
          )}
        </button>
      </nav>
    </main>
  );
}
