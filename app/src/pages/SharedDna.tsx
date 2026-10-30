import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DnaCard } from '../components/DnaCard';
import { Logo } from '../components/Logo';
import { decodeDnaToken } from '../engine/dna';

/** Public share page: /dna/s/:token. */
export function SharedDna() {
  const { token = '' } = useParams();
  const result = decodeDnaToken(token);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
      </header>
      <main className="page page--narrow">
        {result ? (
          <>
            <span className="eyebrow">Someone shared their Money DNA</span>
            <DnaCard result={result} />
          </>
        ) : (
          <p className="lead">This share link is not valid.</p>
        )}
        <Link to="/" className="btn btn--primary btn--lg">
          Discover yours <ArrowRight size={18} />
        </Link>
      </main>
    </div>
  );
}
