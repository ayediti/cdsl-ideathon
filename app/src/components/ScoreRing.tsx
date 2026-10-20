interface Props {
  score: number;
  tier: string;
  size?: number;
}

/** Circular gauge for the financial health score. */
export function ScoreRing({ score, tier, size = 112 }: Props) {
  const stroke = size > 80 ? 10 : 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, score)) / 100);
  const mid = size / 2;
  return (
    <div className={`ring ring--${tier.toLowerCase()} ${size < 90 ? 'ring--sm' : ''}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
        <circle className="ring__track" cx={mid} cy={mid} r={r} strokeWidth={stroke} fill="none" />
        <circle
          className="ring__value"
          cx={mid}
          cy={mid}
          r={r}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${mid} ${mid})`}
        />
      </svg>
      <div className="ring__label">
        <strong>{score}</strong>
        <span>{tier}</span>
      </div>
    </div>
  );
}
