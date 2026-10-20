import { useEffect, useState } from 'react';
import { formatDate } from '../engine/dates';
import { useSimStore } from '../engine/simStore';
import type { Message } from '../engine/types';

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
    return (
      <div className="msg-thread">
        <button className="link-button" onClick={() => setThread(null)}>
          ‹ All messages
        </button>
        <h3>{list[0]?.from ?? thread}</h3>
        {list.map((m) => (
          <div key={m.id} className="bubble">
            <p>{m.text}</p>
            <time>{formatDate(m.date)}</time>
          </div>
        ))}
      </div>
    );
  }

  if (threads.size === 0) return <p className="hint">No messages yet.</p>;

  const ordered = [...threads.entries()].reverse();
  return (
    <ul className="msg-list">
      {ordered.map(([id, list]) => {
        const last = list[list.length - 1];
        const unread = list.some((m) => !m.read);
        return (
          <li key={id}>
            <button className={`msg-row ${unread ? 'msg-row--unread' : ''}`} onClick={() => setThread(id)}>
              <strong>{last.from}</strong>
              <span className="msg-row__preview">{last.text}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
