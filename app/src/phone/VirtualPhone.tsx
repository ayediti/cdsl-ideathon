import { BatteryFull, ChevronLeft, Signal, Smartphone, Wifi, X } from 'lucide-react';
import { useEffect } from 'react';
import { formatDate, formatWeekday, inr } from '../engine/dates';
import { useSimStore } from '../engine/simStore';
import { APP_META } from './apps';
import { BankApp } from './BankApp';
import { CalculatorApp } from './CalculatorApp';
import { DematApp } from './DematApp';
import { MessagesApp } from './MessagesApp';
import { usePhoneUi } from './phoneUi';
import { VerifyApp } from './VerifyApp';

export function VirtualPhone() {
  const { open, app, openTo, close } = usePhoneUi();
  const unlocked = useSimStore((s) => s.unlockedApps);
  const unread = useSimStore((s) => s.messages.filter((m) => !m.read).length);
  const simDate = useSimStore((s) => s.simDate);
  const savings = useSimStore((s) => s.savings);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const appOpen = app !== null && unlocked.includes(app);

  return (
    <>
      <button
        className={`phone-fab ${unread ? 'phone-fab--ping' : ''}`}
        onClick={() => openTo(null)}
        aria-label={`Open phone${unread ? `, ${unread} unread` : ''}`}
      >
        <Smartphone size={26} />
        {unread > 0 && <span className="badge">{unread}</span>}
      </button>

      {open && (
        <div className="phone-backdrop" onClick={close}>
          <div className="phone-wrap" onClick={(e) => e.stopPropagation()}>
            <button className="phone-close" onClick={close} aria-label="Close phone">
              <X size={18} />
            </button>
            <div className={`phone ${appOpen ? '' : 'phone--home'}`} role="dialog" aria-modal="true" aria-label="Your phone">
              <div className="phone__notch" aria-hidden="true" />
              <div className="phone__status">
                <span>{formatDate(simDate)}</span>
                <span className="phone__status-icons" aria-hidden="true">
                  <Signal size={13} />
                  <Wifi size={13} />
                  <BatteryFull size={16} />
                </span>
              </div>

              {appOpen && (
                <div className="phone__appbar">
                  <button className="phone__back" onClick={() => openTo(null)}>
                    <ChevronLeft size={18} /> Home
                  </button>
                  <strong>{APP_META[app].name}</strong>
                  <span />
                </div>
              )}

              <div className={`phone__screen ${appOpen ? '' : 'phone__screen--home'}`}>
                {!appOpen && (
                  <div className="phone-home">
                    <div className="widget">
                      <span>{formatWeekday(simDate)}</span>
                      <strong>{formatDate(simDate)}</strong>
                      <span className="widget__money">Savings {inr(savings)}</span>
                    </div>
                    {app !== null && <p className="phone-home__note">That app is not installed yet.</p>}
                    <div className="app-grid">
                      {unlocked.map((id) => {
                        const meta = APP_META[id];
                        return (
                          <button key={id} className="app-icon" onClick={() => openTo(id)}>
                            <span className="app-icon__glyph" style={{ background: meta.color }} aria-hidden="true">
                              <meta.Icon size={28} />
                            </span>
                            <span className="app-icon__name">{meta.name}</span>
                            {id === 'messages' && unread > 0 && <span className="badge">{unread}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {appOpen && app === 'messages' && <MessagesApp />}
                {appOpen && app === 'bank' && <BankApp />}
                {appOpen && app === 'calculator' && <CalculatorApp />}
                {appOpen && app === 'demat' && <DematApp />}
                {appOpen && app === 'verify' && <VerifyApp />}
              </div>

              <button className="phone__homebar" onClick={() => openTo(null)} aria-label="Go to home screen" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
