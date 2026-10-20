import { Link, useParams } from 'react-router-dom';
import { BRAND } from '../brand';
import { DnaCard } from '../components/DnaCard';
import { decodeDnaToken } from '../engine/dna';

/** Public share page: /dna/s/:token (FiAlly: /money-dna/s/:token). */
export function SharedDna() {
  const { token = '' } = useParams();
  const result = decodeDnaToken(token);

  return (
    <div className="page">
      <header className="topbar">
        <Link to="/" className="brand">
          {BRAND}
        </Link>
      </header>
      <main className="page__main">
        {result ? (
          <>
            <p className="eyebrow">Someone shared their Money DNA</p>
            <DnaCard result={result} />
          </>
        ) : (
          <p>This share link is not valid.</p>
        )}
        <Link to="/" className="btn btn--primary">
          Discover yours
        </Link>
      </main>
    </div>
  );
}
