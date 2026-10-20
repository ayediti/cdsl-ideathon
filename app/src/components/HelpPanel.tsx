import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Help } from '../engine/types';

interface Props {
  help?: Help;
  onClose: () => void;
}

export function HelpPanel({ help, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Help" onClick={(e) => e.stopPropagation()}>
        <div className="drawer__head">
          <h2>Help</h2>
          <button className="link-button" onClick={onClose}>
            Close
          </button>
        </div>
        {help?.reflection ? <p className="reflection">{help.reflection}</p> : <p className="hint">No tips for this screen.</p>}
        {help?.links && help.links.length > 0 && (
          <>
            <h3>Read more</h3>
            <ul className="plain-list">
              {help.links.map((l) => (
                <li key={l.slug}>
                  <Link to={`/library/${l.slug}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="hint">
          Everything here is simulated. Your phone is the 📱 button at the bottom right.
        </p>
      </aside>
    </div>
  );
}
