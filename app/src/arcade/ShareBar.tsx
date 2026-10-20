import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
  text: string;
  path: string;
}

/** Share a challenge link. The link carries no personal data, only the game to play. */
export function ShareBar({ text, path }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}${path}`;
  const canShare = typeof navigator.share === 'function';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const share = () => {
    navigator.share({ text, url }).catch(() => {});
  };

  return (
    <div className="share-bar">
      <span className="share-bar__label">Challenge someone</span>
      <div className="share-bar__buttons">
        {canShare && (
          <button className="btn btn--primary btn--sm" onClick={share}>
            <Share2 size={16} /> Share
          </button>
        )}
        <a
          className="btn btn--ghost btn--sm"
          href={`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
        <button className="btn btn--ghost btn--sm" onClick={copy}>
          {copied ? <Check size={16} /> : <Link2 size={16} />} {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
