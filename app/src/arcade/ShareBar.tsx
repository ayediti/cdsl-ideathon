import { Check, Link2, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useT } from '../i18n/t';

interface Props {
  text: string;
  path: string;
}

/** Share a challenge link. The link carries no personal data, only the game to play. */
export function ShareBar({ text, path }: Props) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  // The hosted build cannot deep-link into the frame, so it shares the public page link instead.
  const url = import.meta.env.VITE_PUBLIC_URL || `${window.location.origin}${path}`;
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
      <span className="share-bar__label">{t('Challenge someone')}</span>
      <div className="share-bar__buttons">
        {canShare && (
          <button className="btn btn--primary btn--sm" onClick={share}>
            <Share2 size={16} /> {t('Share')}
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
          {copied ? <Check size={16} /> : <Link2 size={16} />} {copied ? t('Copied') : t('Copy link')}
        </button>
      </div>
    </div>
  );
}
