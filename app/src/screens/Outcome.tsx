import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Chip } from './kindMeta';

const ICON = { good: CircleCheck, bad: CircleX, neutral: CircleAlert } as const;

interface Props {
  tone: 'good' | 'bad' | 'neutral';
  title: string;
  children: ReactNode;
  chips?: Chip[];
}

export function Outcome({ tone, title, children, chips = [] }: Props) {
  const Icon = ICON[tone];
  return (
    <div className={`outcome outcome--${tone}`} role="status">
      <span className="outcome__icon">
        <Icon size={22} />
      </span>
      <div>
        <strong className="outcome__title">{title}</strong>
        <p>{children}</p>
        {chips.length > 0 && (
          <div className="chips">
            {chips.map((c, i) => (
              <span key={i} className={`chip chip--${c.tone}`}>
                {c.text}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
