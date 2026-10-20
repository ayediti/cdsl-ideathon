import { AppWindow, MessageCircle, ShieldAlert, TrendingDown, TrendingUp, Zap, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { inr } from '../engine/dates';
import { netWorth } from '../engine/fhs';
import { useSimStore } from '../engine/simStore';
import { APP_META } from '../phone/apps';

interface Toast {
  id: number;
  text: string;
  tone: 'good' | 'bad' | 'info' | 'xp';
  Icon: LucideIcon;
}

let nextId = 0;

/** Pops up whenever money, XP, messages or apps change — the game's feedback loop. */
export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(
    () =>
      useSimStore.subscribe((s, prev) => {
        if (s.xp < prev.xp) return; // reset
        const add: Omit<Toast, 'id'>[] = [];
        if (s.totalLost > prev.totalLost) {
          add.push({ text: `${inr(s.totalLost - prev.totalLost)} lost to a scam`, tone: 'bad', Icon: ShieldAlert });
        } else {
          const delta = netWorth(s) - netWorth(prev);
          if (delta >= 1) add.push({ text: `+${inr(delta)} net worth`, tone: 'good', Icon: TrendingUp });
          if (delta <= -1) add.push({ text: `−${inr(-delta)} net worth`, tone: 'bad', Icon: TrendingDown });
        }
        if (s.xp > prev.xp) add.push({ text: `+${s.xp - prev.xp} XP`, tone: 'xp', Icon: Zap });
        if (s.messages.length > prev.messages.length) {
          add.push({ text: `New message from ${s.messages[s.messages.length - 1].from}`, tone: 'info', Icon: MessageCircle });
        }
        for (const app of s.unlockedApps.filter((a) => !prev.unlockedApps.includes(a))) {
          add.push({ text: `New app installed: ${APP_META[app].name}`, tone: 'info', Icon: AppWindow });
        }
        if (!add.length) return;
        const created = add.map((t) => ({ ...t, id: nextId++ }));
        setToasts((cur) => [...cur, ...created].slice(-4));
        const ids = created.map((t) => t.id);
        window.setTimeout(() => setToasts((cur) => cur.filter((t) => !ids.includes(t.id))), 3600);
      }),
    [],
  );

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map(({ id, text, tone, Icon }) => (
        <div key={id} className={`toast toast--${tone}`}>
          <span className="toast__icon">
            <Icon size={16} />
          </span>
          {text}
        </div>
      ))}
    </div>
  );
}
