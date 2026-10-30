import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  ChartPie,
  Check,
  ClipboardCheck,
  Compass,
  Dna,
  FileSearch,
  Gauge,
  GraduationCap,
  IndianRupee,
  Play,
  Radar,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sprout,
  Star,
  Vault,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GAMES } from '../arcade/games';
import { GAME_ICON, useArcadeStore } from '../arcade/meta';
import { BRAND } from '../brand';
import { useCheckStore } from '../check/store';
import { AccessControls } from '../components/AccessControls';
import { ConfirmButton } from '../components/ConfirmButton';
import { ALL_CHAPTERS, chapterKey, MODULES, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';
import type { Module } from '../engine/types';
import { useSettings } from '../i18n/settings';
import { useT } from '../i18n/t';

const MODULE_ICON: Record<string, LucideIcon> = { m0_orientation: Compass, m1_basics: BookOpen, m2_demat: Briefcase };
const MODULE_TONE: Record<string, string> = { m0_orientation: 'violet', m1_basics: 'sky', m2_demat: 'brand' };

const LESSON_ICON: Record<string, LucideIcon> = {
  'm0_orientation/ch01_money_dna': Dna,
  'm1_basics/ch01_shares': ChartPie,
  'm1_basics/ch02_demat': Vault,
  'm1_basics/ch03_compounding': Sprout,
  'm2_demat/ch01_open': ClipboardCheck,
  'm2_demat/ch02_cas': FileSearch,
  'm2_demat/ch03_ipo': Building2,
  'm2_demat/ch04_scams': Radar,
};

/** Splits modules into two columns with roughly equal lesson counts, keeping each module whole. */
function balance(modules: Module[]): Module[][] {
  const half = modules.reduce((n, m) => n + m.chapters.length, 0) / 2;
  const left: Module[] = [];
  let count = 0;
  for (const m of modules) {
    if (count >= half) break;
    left.push(m);
    count += m.chapters.length;
  }
  return [left, modules.slice(left.length)];
}

/** One screen: the course (wide, left) and the scam games (right). */
export function Landing() {
  const { progress, completed, reset } = useSimStore();
  const { best, clear } = useArcadeStore();
  const clearChecks = useCheckStore((s) => s.clear);
  const lang = useSettings((s) => s.lang);
  const t = useT();
  const resume = progress ? `/play/${progress.moduleId}/${progress.chapterId}/${progress.screenId}` : null;

  const restart = () => {
    reset();
    clear();
    clearChecks();
  };

  return (
    <div className="home">
      <IndianRupee className="home__watermark" strokeWidth={2.6} aria-hidden="true" />
      <header className="home__top">
        <Link to="/" className="home__wordmark">
          {BRAND}
        </Link>
        <nav className="home__nav" aria-label="Main">
          <Link to="/check">
            <Gauge size={16} /> {t('Self-check')}
          </Link>
          <Link to="/learn">
            <GraduationCap size={16} /> {t('Course')}
          </Link>
          <Link to="/library">
            <BookMarked size={16} /> {t('Library')}
          </Link>
          <AccessControls />
        </nav>
      </header>

      <main className="home__main">
        {lang === 'hi' ? (
          <h1 className="home__title">
            <mark className="home__mark home__mark--brand">बाज़ार</mark> को समझिए, और उन लोगों को भी जो आपको{' '}
            <mark className="home__mark home__mark--coral">ठगना</mark> चाहते हैं।
          </h1>
        ) : (
          <h1 className="home__title">
            Learn <mark className="home__mark home__mark--brand">the market</mark>, and the people trying to{' '}
            <mark className="home__mark home__mark--coral">trick you</mark>.
          </h1>
        )}

        <div className="home__cols">
          <section aria-labelledby="learn-title">
            <div className="home__head">
              <div>
                <h2 id="learn-title">{t('Learn')}</h2>
                <p>
                  {t('From your first share to your first demat account.')}
                  {lang === 'hi' && <em className="home__note"> {t('Course chapters are in English for now; Hindi is coming next.')}</em>}
                </p>
              </div>
              <Link to={resume ?? screenPath(ALL_CHAPTERS[0])} className="home__start">
                {resume ? t('Continue where you left off') : t('Start from the beginning')} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="home__learn-cols">
              {balance(MODULES).map((column, ci) => (
                <div key={ci}>
                  {column.map((m) => {
                    const ModuleIcon = MODULE_ICON[m.id] ?? BookOpen;
                    return (
                      <div key={m.id} className={`home__module tone-${MODULE_TONE[m.id] ?? 'brand'}`}>
                        <h3>
                          <ModuleIcon size={14} strokeWidth={2} aria-hidden="true" /> {t(m.title)}
                        </h3>
                        <ol className="lesson-grid">
                          {m.chapters.map((c) => {
                            const key = chapterKey(c);
                            const Icon = LESSON_ICON[key] ?? BookOpen;
                            const done = completed.includes(key);
                            return (
                              <li key={c.id}>
                                <Link to={screenPath(c)} className="lesson">
                                  <span className={`lesson__icon ${done ? 'lesson__icon--done' : ''}`} aria-hidden="true">
                                    {done ? <Check size={18} /> : <Icon size={18} strokeWidth={1.75} />}
                                  </span>
                                  <span className="lesson__text">
                                    <span className="lesson__title">
                                      <span className="lesson__num mono">{ALL_CHAPTERS.indexOf(c) + 1}</span> {t(c.title)}
                                    </span>
                                    <span className="lesson__blurb">{t(c.blurb)}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="play-title" className="home__games">
            <div className="home__head">
              <div>
                <h2 id="play-title">{t('What would you do?')}</h2>
                <p>{t('Find out how easily digital fraud could fool you, and get better at spotting it.')}</p>
              </div>
            </div>
            <ol className="game-tiles">
              {GAMES.map((g) => {
                const Icon = GAME_ICON[g.icon];
                return (
                  <li key={g.id}>
                    <Link to={`/arcade/${g.id}`} className={`game-tile tone-${g.tone}`} title={t(g.short)}>
                      <span className="game-tile__icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <span className="game-tile__title">{t(g.title)}</span>
                      <span className="sr-only">{t(g.short)}</span>
                      <span className="game-tile__foot">
                        <span className="game-tile__play">
                          <Play size={11} fill="currentColor" /> {t('Play')}
                        </span>
                        {best[g.id] !== undefined && (
                          <span className="game-tile__best">
                            <Star size={12} fill="currentColor" /> {best[g.id]}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </main>

      <footer className="home__foot">
        <p>
          <ShieldCheck size={14} aria-hidden="true" /> {t('Everything here is simulated: no real money, no sign-up, not investment advice.')}
        </p>
        <p className="home__foot-alert">
          <ShieldAlert size={14} aria-hidden="true" /> {t('In a real emergency, call')} <strong>1930</strong>.
        </p>
      </footer>

      <ConfirmButton
        className="home__restart"
        onConfirm={restart}
        confirmLabel={
          <>
            <RotateCcw size={15} /> {t('Click again: delete all progress and scores')}
          </>
        }
      >
        <RotateCcw size={15} /> {t('Restart simulation')}
      </ConfirmButton>
    </div>
  );
}
