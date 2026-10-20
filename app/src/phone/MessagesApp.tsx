import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDate } from '../engine/dates';
import { useSimStore } from '../engine/simStore';
import type { Message } from '../engine/types';

const AVATAR_COLORS = ['#2F7BC8', '#0E6B57', '#E99A2C', '#6450C8', '#DC4E36'];
const avatarColor = (name: string) =>
  AVATAR_COLORS[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_COLORS.length];

function Avatar({ name }: { name: string }) {
  return (
    <span className="msg-avatar" style={{ background: avatarColor(name) }} aria-hidden="true">
      {name.replace(/^[A-Z]{2}-/, '')[0]}
    </span>
  );
}

export function MessagesApp() {
  const messages = useSimStore((s) => s.messages);
  const markThreadRead = useSimStore((s) => s.markThreadRead);
  const [thread, setThread] = useState<string | null>(null);

  useEffect(() => {
    if (thread) markThreadRead(thread);
  }, [thread, messages.length, markThreadRead]);

  const threads = new Map<string, Message[]>();
  for (const m of messages) threads.set(m.thread, [...(threads.get(m.thread) ?? []), m]);

  if (thread) {
    const list = threads.get(thread) ?? [];
    const from = list[0]?.from ?? thread;
    return (
      <div className="msg-thread">
        <div className="msg-thread__head">
          <button className="phone__back" onClick={() => setThread(null)} aria-label="All messages">
            <ChevronLeft size={18} />
          </button>
          <Avatar name={from} />
          <strong>{from}</strong>
        </div>
        <div className="msg-thread__body">
          {list.map((m) => (
            <div key={m.id} className="bubble-row">
              <time>{formatDate(m.date)}</time>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (threads.size === 0) return <p className="phone-empty">No messages yet.</p>;

  return (
    <ul className="msg-list">
      {[...threads.entries()].reverse().map(([id, list]) => {
        const last = list[list.length - 1];
        const unread = list.some((m) => !m.read);
        return (
          <li key={id}>
            <button className={`msg-row ${unread ? 'msg-row--unread' : ''}`} onClick={() => setThread(id)}>
              <Avatar name={last.from} />
              <span className="msg-row__body">
                <span className="msg-row__top">
                  <strong>{last.from}</strong>
                  <time>{formatDate(last.date)}</time>
                </span>
                <span className="msg-row__preview">{last.text}</span>
              </span>
              {unread && <span className="msg-row__dot" aria-label="unread" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
