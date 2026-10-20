import { useEffect, useState } from 'react';
import { DnaCard } from '../components/DnaCard';
import { useSimStore } from '../engine/simStore';
import type { CustomScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

export function DnaResultView({ setReady }: ScreenProps<CustomScreen>) {
  const dna = useSimStore((s) => s.dna);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [setReady]);

  if (!dna) {
    return (
      <article className="screen">
        <h1>No result yet</h1>
        <p>Go back one screen and answer the six situations.</p>
      </article>
    );
  }

  const shareUrl = `${window.location.origin}/dna/s/${dna.token}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="screen">
      <p className="eyebrow">From the way you chose, you are</p>
      <DnaCard result={dna} />
      <div className="share">
        <label htmlFor="share-url">Share your result</label>
        <div className="share__row">
          <input id="share-url" readOnly value={shareUrl} onFocus={(e) => e.currentTarget.select()} />
          <button className="btn btn--secondary" onClick={copy}>
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
        <p className="hint">The link contains only your type and scores — no name or personal details.</p>
      </div>
    </article>
  );
}
