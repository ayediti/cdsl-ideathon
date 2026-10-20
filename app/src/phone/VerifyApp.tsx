import { BadgeCheck, Search, ShieldX, TriangleAlert } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useSimStore } from '../engine/simStore';
import { lookup, lookupFlag, REGISTRY_SUGGESTIONS, type RegistryEntry } from './registry';

/** Simulated SEBI registration check. Sets `verify_done` once two different names have been looked up. */
export function VerifyApp() {
  const flags = useSimStore((s) => s.flags);
  const setFlag = useSimStore((s) => s.setFlag);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ query: string; entry: RegistryEntry | null } | null>(null);

  const run = (q: string) => {
    const trimmed = q.trim();
    if (trimmed.length < 3) return;
    setQuery(trimmed);
    setResult({ query: trimmed, entry: lookup(trimmed) });
    setFlag(lookupFlag(trimmed), true);
    const looked = Object.keys(useSimStore.getState().flags).filter((k) => k.startsWith('verify:'));
    if (looked.length >= 2 && !flags.verify_done) setFlag('verify_done', true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(query);
  };

  return (
    <div className="verify">
      <div className="verify__head">
        <BadgeCheck size={22} />
        <div>
          <strong>Registration check</strong>
          <span>Simulated SEBI intermediary list</span>
        </div>
      </div>

      <form className="verify__form" onSubmit={onSubmit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name of broker, adviser or app"
          aria-label="Search by name"
        />
        <button type="submit" aria-label="Search">
          <Search size={18} />
        </button>
      </form>

      <div className="verify__chips">
        {REGISTRY_SUGGESTIONS.map((s) => (
          <button key={s} className="verify__chip" onClick={() => run(s)}>
            {s}
          </button>
        ))}
      </div>

      {result && result.entry?.status === 'active' && (
        <div className="verify__result verify__result--ok" role="status">
          <BadgeCheck size={20} />
          <div>
            <strong>{result.entry.name}</strong>
            <span>{result.entry.category}</span>
            <span className="mono">Reg. no. {result.entry.regNo}</span>
            <p>Registered and active. Still check that the contact details you were given match the official ones.</p>
          </div>
        </div>
      )}
      {result && result.entry?.status === 'cancelled' && (
        <div className="verify__result verify__result--warn" role="status">
          <TriangleAlert size={20} />
          <div>
            <strong>{result.entry.name}</strong>
            <span>{result.entry.category}</span>
            <p>Registration cancelled. This entity is not allowed to deal with investors any more.</p>
          </div>
        </div>
      )}
      {result && !result.entry && (
        <div className="verify__result verify__result--bad" role="status">
          <ShieldX size={20} />
          <div>
            <strong>“{result.query}”</strong>
            <p>No registered intermediary found. Anyone offering you investment services or tips under this name is not regulated by SEBI.</p>
          </div>
        </div>
      )}

      <p className="verify__foot">In real life, search the official list on sebi.gov.in → Intermediaries.</p>
    </div>
  );
}
