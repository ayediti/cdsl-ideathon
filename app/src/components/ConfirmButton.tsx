import { useEffect, useState, type ReactNode } from 'react';

interface Props {
  className: string;
  /** What the button says normally. */
  children: ReactNode;
  /** What it says once armed, waiting for the second click. */
  confirmLabel: ReactNode;
  onConfirm: () => void;
}

/**
 * Two-click confirmation built into the page. Browser confirm() dialogs are blocked in some
 * embedded frames, and an in-page step is clearer on phones anyway.
 */
export function ConfirmButton({ className, children, confirmLabel, onConfirm }: Props) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  return (
    <button
      className={`${className} ${armed ? 'is-armed' : ''}`}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          return;
        }
        setArmed(false);
        onConfirm();
      }}
      aria-live="polite"
    >
      {armed ? confirmLabel : children}
    </button>
  );
}
