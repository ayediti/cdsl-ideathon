import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useSimStore } from '../engine/simStore';
import type { PhoneTaskScreen } from '../engine/types';
import { APP_META } from '../phone/apps';
import { usePhoneUi } from '../phone/phoneUi';
import { Outcome } from './Outcome';
import type { ScreenProps } from './screenProps';

export function PhoneTaskView({ def, setReady }: ScreenProps<PhoneTaskScreen>) {
  const done = useSimStore((s) => !!s.flags[def.doneFlag]);
  const openTo = usePhoneUi((s) => s.openTo);
  const app = APP_META[def.app];

  useEffect(() => {
    if (done) setReady(true);
  }, [done, setReady]);

  return (
    <article className="screen phone-task">
      <div className={`phone-task__tile ${done ? '' : 'phone-task__tile--pulse'}`} style={{ background: app.color }} aria-hidden="true">
        <app.Icon size={40} />
      </div>
      <h1 className="display">{def.title}</h1>
      {def.body.map((p, i) => (
        <p key={i} className="lead">
          {p}
        </p>
      ))}
      <button className="btn btn--primary" onClick={() => openTo(def.app)}>
        Open {app.name} <ArrowRight size={18} />
      </button>
      {done ? (
        <Outcome tone="good" title="Done">
          {def.doneText}
        </Outcome>
      ) : (
        <p className="waiting">
          <span className="waiting__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Waiting for you to open it
        </p>
      )}
    </article>
  );
}
