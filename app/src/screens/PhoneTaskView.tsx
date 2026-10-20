import { useEffect } from 'react';
import { useSimStore } from '../engine/simStore';
import type { PhoneTaskScreen } from '../engine/types';
import { APP_META } from '../phone/apps';
import { usePhoneUi } from '../phone/phoneUi';
import type { ScreenProps } from './screenProps';

export function PhoneTaskView({ def, setReady }: ScreenProps<PhoneTaskScreen>) {
  const done = useSimStore((s) => !!s.flags[def.doneFlag]);
  const openTo = usePhoneUi((s) => s.openTo);

  useEffect(() => {
    if (done) setReady(true);
  }, [done, setReady]);

  return (
    <article className="screen">
      <p className="eyebrow">Phone task</p>
      <h1>{def.title}</h1>
      {def.body.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <button className="btn btn--secondary" onClick={() => openTo(def.app)}>
        Open {APP_META[def.app].name}
      </button>
      {done ? (
        <div className="outcome outcome--good" role="status">
          <strong>Done.</strong> {def.doneText}
        </div>
      ) : (
        <p className="hint">Waiting for you to open it…</p>
      )}
    </article>
  );
}
