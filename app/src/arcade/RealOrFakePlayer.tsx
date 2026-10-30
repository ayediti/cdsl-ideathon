import { ArrowRight, FileText, Mail, MessageSquare, Mic, PhoneCall, Play, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useReadAloud, useT } from '../i18n/t';
import { Outcome } from '../screens/Outcome';
import { clampScore } from './meta';
import type { GameResult, RealOrFakeCard, RealOrFakeGame } from './types';

const FORMAT = {
  video: { label: 'Video', Icon: Play },
  voice: { label: 'Voice note', Icon: Mic },
  sms: { label: 'SMS', Icon: MessageSquare },
  email: { label: 'Email', Icon: Mail },
  document: { label: 'Document', Icon: FileText },
  call: { label: 'Phone call', Icon: PhoneCall },
} as const;

interface Props {
  game: RealOrFakeGame;
  onFinish: (result: GameResult) => void;
}

export function RealOrFakePlayer({ game, onFinish }: Props) {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<('real' | 'fake')[]>([]);
  const card = game.cards[index];
  const picked = picks[index];
  const isLast = index === game.cards.length - 1;
  const verdict = picked
    ? t(picked === card.answer ? 'Correct: this one is {answer}' : 'Not quite: this one is {answer}', { answer: t(card.answer) })
    : null;

  useReadAloud(`${card.headline ? `${t(card.headline)}. ` : ''}${t(card.body)}`);
  useReadAloud(verdict ? `${verdict}. ${t(card.explain)}` : null);

  const next = () => {
    if (!isLast) {
      setIndex(index + 1);
      return;
    }
    const correct = game.cards.filter((c, i) => picks[i] === c.answer).length;
    const score = clampScore((correct / game.cards.length) * 100);
    onFinish({
      score,
      outcome: score >= 85 ? 'safe' : score >= 55 ? 'shaken' : 'lost',
      title: t('{correct} of {total} judged right', { correct, total: game.cards.length }),
      text:
        score >= 85
          ? t('Sharp eyes. You checked the request, not just the face or the voice.')
          : t(
              'Deepfakes are built to fool your eyes and ears. Focus on what the message wants from you, and call back on numbers you already have.',
            ),
      review: {
        title: t('Card by card'),
        items: game.cards.map((c, i) => ({
          label: `${t(c.headline ?? c.from)}: ${t(c.answer)}`,
          note: t(c.explain),
          good: picks[i] === c.answer,
        })),
      },
    });
  };

  return (
    <div className="rof">
      <div className="rof__progress" aria-label={`${index + 1} / ${game.cards.length}`}>
        {game.cards.map((c, i) => (
          <span
            key={c.id}
            className={`pip ${picks[i] ? (picks[i] === c.answer ? 'pip--on' : 'pip--miss') : i === index ? 'pip--now' : ''}`}
          />
        ))}
      </div>

      <CardView card={card} key={card.id} />

      {!picked ? (
        <div className="rof__actions">
          <button className="btn btn--xl rof__btn rof__btn--real" onClick={() => setPicks([...picks, 'real'])}>
            <ShieldCheck size={20} /> {t('Real')}
          </button>
          <button className="btn btn--xl rof__btn rof__btn--fake" onClick={() => setPicks([...picks, 'fake'])}>
            <ShieldAlert size={20} /> {t('Fake')}
          </button>
        </div>
      ) : (
        <>
          <Outcome tone={picked === card.answer ? 'good' : 'bad'} title={verdict ?? ''}>
            {t(card.explain)}
          </Outcome>
          <div className="rof__next">
            <button className="btn btn--primary btn--lg" onClick={next}>
              {isLast ? t('See my score') : t('Next')} <ArrowRight size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function CardView({ card }: { card: RealOrFakeCard }) {
  const t = useT();
  const { label, Icon } = FORMAT[card.format];
  return (
    <article className={`rof-card rof-card--${card.format}`}>
      <div className="rof-card__meta">
        <span className="rof-card__format">
          <Icon size={14} /> {t(label)}
        </span>
        <span className="rof-card__from">{t(card.from)}</span>
      </div>
      {card.headline && <h2 className="rof-card__headline">{t(card.headline)}</h2>}
      {card.format === 'video' && (
        <div className="rof-card__video" aria-hidden="true">
          <Play size={34} />
        </div>
      )}
      {card.format === 'voice' && (
        <div className="rof-card__wave" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} style={{ height: `${20 + ((i * 37) % 70)}%` }} />
          ))}
        </div>
      )}
      <p className="rof-card__body">{t(card.body)}</p>
    </article>
  );
}
