import {
  ArrowRight,
  CircleCheck,
  CircleX,
  Dna,
  Gamepad2,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../brand';
import { Logo } from '../components/Logo';
import { ScoreRing } from '../components/ScoreRing';
import { ALL_CHAPTERS, screenPath } from '../engine/curriculum';
import { useSimStore } from '../engine/simStore';

const FEATURES = [
  {
    Icon: Gamepad2,
    tone: 'brand',
    title: 'Live it',
    text: 'Every choice moves your simulated money, your calendar and your financial health score.',
  },
  {
    Icon: Siren,
    tone: 'coral',
    title: 'Get scammed — safely',
    text: 'Fake KYC texts, "bank fraud team" calls and think-like-a-scammer drills, then a red-flag autopsy.',
  },
  {
    Icon: Dna,
    tone: 'violet',
    title: 'Know your Money DNA',
    text: 'Six everyday situations reveal how you decide about money — and what to watch out for.',
  },
] as const;

const PROMISES = [
  'Simulated money only — never connects to a real bank, broker or demat account',
  'Not investment advice',
  'Never asks for your PAN, Aadhaar, OTP or passwords',
  'No sign-up — your progress stays in your browser',
];

export function Landing() {
  const progress = useSimStore((s) => s.progress);
  const start = progress ? '/home' : screenPath(ALL_CHAPTERS[0]);
  const screens = ALL_CHAPTERS.reduce((n, c) => n + c.screenSequence.length, 0);

  return (
    <div className="landing">
      <header className="topbar topbar--clear">
        <Logo />
        <div className="topbar__meta" />
        <Link to="/library" className="btn btn--ghost btn--sm">
          Library
        </Link>
        <Link to={start} className="btn btn--primary btn--sm">
          {progress ? 'Continue' : 'Start'}
        </Link>
      </header>

      <section className="hero">
        <div className="hero__copy">
          <span className="pill">
            <Sparkles size={14} /> A financial life simulator
          </span>
          <h1 className="hero__title">
            Make your money mistakes <span className="marker">here</span>, not out there.
          </h1>
          <p className="hero__sub">
            Open an account, automate your savings and face real scam tactics — with simulated rupees, a simulated phone
            and zero real risk.
          </p>
          <div className="hero__cta">
            <Link to={start} className="btn btn--primary btn--xl">
              {progress ? 'Continue your journey' : 'Start the simulation'} <ArrowRight size={20} />
            </Link>
            <span className="hero__note">
              <ShieldCheck size={16} /> No sign-up · No real money
            </span>
          </div>
          <ul className="hero__stats">
            <li>
              <strong>{screens}</strong>
              <span>interactive screens</span>
            </li>
            <li>
              <strong>{ALL_CHAPTERS.length}</strong>
              <span>chapters</span>
            </li>
            <li>
              <strong>₹0</strong>
              <span>real money at risk</span>
            </li>
          </ul>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="mock-phone">
            <div className="mock-phone__notch" />
            <div className="mock-phone__screen">
              <span className="mock-time">10:42</span>
              <span className="mock-date">Tuesday, 3 June</span>
              <div className="mock-notif">
                <div className="mock-notif__head">
                  <span className="mock-notif__app">
                    <MessageSquare size={12} />
                  </span>
                  NB-NIMBSS <span>now</span>
                </div>
                <p>
                  Your Nimbus Bank KYC <mark>EXPIRES TODAY</mark>. Account will be <mark>BLOCKED in 2 hrs</mark>. Update
                  now: <mark>nimbus-kyc-verify.co</mark>
                </p>
              </div>
              <div className="mock-choice mock-choice--bad">
                <CircleX size={18} /> Tap the link
              </div>
              <div className="mock-choice mock-choice--good">
                <CircleCheck size={18} /> Check the official app
              </div>
            </div>
          </div>
          <div className="float-card float-card--score">
            <ScoreRing score={82} tier="Strong" size={64} />
            <div>
              <span className="label">Health score</span>
              <strong>Strong</strong>
            </div>
          </div>
          <div className="float-card float-card--loss">
            <span className="float-card__icon tone-coral">
              <ShieldAlert size={18} />
            </span>
            <div>
              <strong className="mono">−₹4,000</strong>
              <span>Lost to phishing</span>
            </div>
          </div>
          <div className="float-card float-card--xp">
            <Zap size={16} /> +40 XP
          </div>
        </div>
      </section>

      <section className="features">
        {FEATURES.map(({ Icon, tone, title, text }) => (
          <div key={title} className="feature">
            <span className={`feature__icon tone-${tone}`}>
              <Icon size={24} />
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="curriculum">
        <div className="curriculum__head">
          <span className="eyebrow">The journey</span>
          <h2 className="display">What you will live through</h2>
        </div>
        <ol className="curriculum__list">
          {ALL_CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <span className="curriculum__num mono">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="trust">
        <div className="trust__inner">
          <div>
            <span className="eyebrow">Safe by design</span>
            <h2 className="display">A practice ground, not a product.</h2>
          </div>
          <ul>
            {PROMISES.map((p) => (
              <li key={p}>
                <ShieldCheck size={20} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer">
        <Logo />
        <span>A simulation for learning. All names, banks and messages are fictional.</span>
        <span>© {new Date().getFullYear()} {BRAND}</span>
      </footer>
    </div>
  );
}
