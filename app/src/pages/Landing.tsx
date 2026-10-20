import { Link } from 'react-router-dom';
import { BRAND, TAGLINE } from '../brand';
import { ALL_CHAPTERS, MODULES, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';

export function Landing() {
  const progress = useSimStore((s) => s.progress);
  const start = progress ? '/home' : screenPath(ALL_CHAPTERS[0]);

  return (
    <div className="landing">
      <header className="topbar">
        <span className="brand">{BRAND}</span>
        <Link to="/library" className="btn btn--ghost">
          Library
        </Link>
      </header>

      <section className="hero">
        <p className="eyebrow">A financial life simulator</p>
        <h1>{TAGLINE}</h1>
        <p className="hero__sub">
          Open a bank account, automate your savings and face real scam tactics — with simulated money, a simulated phone and
          zero real risk.
        </p>
        <Link to={start} className="btn btn--primary btn--lg">
          {progress ? 'Continue your journey' : 'Start the simulation'}
        </Link>
      </section>

      <section className="landing__grid">
        {MODULES.map((m) => (
          <div key={m.id} className="landing__card">
            <h2>{m.title}</h2>
            <p>{m.tagline}</p>
            <ul className="plain-list">
              {m.chapters.map((c) => (
                <li key={c.id}>{c.title}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="landing__card">
          <h2>What this is not</h2>
          <ul className="plain-list">
            <li>Not a bank, wallet or trading app</li>
            <li>Not investment advice</li>
            <li>Never asks for real PAN, Aadhaar, OTPs or passwords</li>
            <li>No sign-up: progress stays in your browser</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
