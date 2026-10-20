import { useEffect } from 'react';
import { formatDate } from '../engine/dates';
import { useSimStore } from '../engine/simStore';
import { APP_META } from './apps';
import { BankApp } from './BankApp';
import { CalculatorApp } from './CalculatorApp';
import { MessagesApp } from './MessagesApp';
import { usePhoneUi } from './phoneUi';

export function VirtualPhone() {
  const { open, app, openTo, close } = usePhoneUi();
  const unlocked = useSimStore((s) => s.unlockedApps);
  const unread = useSimStore((s) => s.messages.filter((m) => !m.read).length);
  const simDate = useSimStore((s) => s.simDate);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const appOpen = app !== null && unlocked.includes(app);

  return (
    <>
      <button className="phone-fab" onClick={() => openTo(null)} aria-label={`Open phone${unread ? `, ${unread} unread` : ''}`}>
        <span aria-hidden="true">📱</span>
        {unread > 0 && <span className="badge">{unread}</span>}
      </button>
      {open && (
        <div className="phone-backdrop" onClick={close}>
          <div className="phone" role="dialog" aria-modal="true" aria-label="Your phone" onClick={(e) => e.stopPropagation()}>
            <div className="phone__status">
              <span>{formatDate(simDate)}</span>
              <button className="phone__close" onClick={close} aria-label="Close phone">
                ✕
              </button>
            </div>
            <div className="phone__header">
              {appOpen ? (
                <button className="link-button" onClick={() => openTo(null)}>
                  ‹ Home
                </button>
              ) : (
                <span>Home</span>
              )}
              {appOpen && <strong>{APP_META[app].name}</strong>}
            </div>
            <div className="phone__screen">
              {!appOpen && app !== null && <p className="hint">That app is not installed yet.</p>}
              {!appOpen && (
                <div className="app-grid">
                  {unlocked.map((id) => (
                    <button key={id} className="app-icon" onClick={() => openTo(id)}>
                      <span className="app-icon__glyph" style={{ background: APP_META[id].color }} aria-hidden="true">
                        {APP_META[id].icon}
                      </span>
                      <span>{APP_META[id].name}</span>
                      {id === 'messages' && unread > 0 && <span className="badge">{unread}</span>}
                    </button>
                  ))}
                </div>
              )}
              {appOpen && app === 'messages' && <MessagesApp />}
              {appOpen && app === 'bank' && <BankApp />}
              {appOpen && app === 'calculator' && <CalculatorApp />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
