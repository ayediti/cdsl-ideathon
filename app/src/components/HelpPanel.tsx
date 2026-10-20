import { BookOpen, Lightbulb, Smartphone, X } from 'lucide-react';
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
          <button className="icon-btn" onClick={onClose} aria-label="Close help">
            <X size={18} />
          </button>
        </div>

        <div className="drawer__tip">
          <Lightbulb size={20} />
          <p>{help?.reflection ?? 'Take your time. Every choice here is a safe place to experiment.'}</p>
        </div>

        {help?.links && help.links.length > 0 && (
          <>
            <h3>Read more</h3>
            <ul className="drawer__links">
              {help.links.map((l) => (
                <li key={l.slug}>
                  <Link to={`/library/${l.slug}`}>
                    <BookOpen size={16} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="drawer__note">
          <Smartphone size={16} />
          <span>Your simulated phone is the green button at the bottom right. Everything in it is fictional.</span>
        </div>
      </aside>
    </div>
  );
}
