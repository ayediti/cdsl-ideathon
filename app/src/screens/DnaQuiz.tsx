import { RotateCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DNA_QUESTIONS, encodeDnaToken, scoreDna } from '../engine/dna';
import { useSimStore } from '../engine/simStore';
import type { CustomScreen, DnaType } from '../engine/types';
import type { ScreenProps } from './screenProps';

const LETTERS = 'ABCD';

export function DnaQuiz({ setReady }: ScreenProps<CustomScreen>) {
  const existing = useSimStore((s) => s.dna);
  const [answers, setAnswers] = useState<DnaType[]>([]);
  const [retaking, setRetaking] = useState(false);
  const finished = !!existing && !retaking;

  useEffect(() => {
    setReady(finished);
  }, [finished, setReady]);

  const answer = (type: DnaType) => {
    const next = [...answers, type];
    setAnswers(next);
    if (next.length === DNA_QUESTIONS.length) {
      const result = scoreDna(next);
      useSimStore.getState().setDna({ ...result, token: encodeDnaToken(result) });
      setRetaking(false);
    }
  };

  if (finished) {
    return (
      <article className="screen center">
        <div className="summary__trophy tone-violet" aria-hidden="true">
          <Sparkles size={32} />
        </div>
        <h1 className="display">All six answered</h1>
        <p className="lead">Your Money DNA is ready. Continue to reveal it.</p>
        <button
          className="link-button"
          onClick={() => {
            setAnswers([]);
            setRetaking(true);
          }}
        >
          <RotateCcw size={15} /> Retake the quiz
        </button>
      </article>
    );
  }

  const q = DNA_QUESTIONS[answers.length];
  return (
    <article className="screen">
      <div className="dna-progress">
        <span className="eyebrow">
          Situation {answers.length + 1} of {DNA_QUESTIONS.length}
        </span>
        <div className="dots" aria-hidden="true">
          {DNA_QUESTIONS.map((_, i) => (
            <span key={i} className={i < answers.length ? 'dot dot--done' : i === answers.length ? 'dot dot--now' : 'dot'} />
          ))}
        </div>
      </div>
      <h1 className="display" key={q.id}>
        {q.q}
      </h1>
      <div className="options options--grid" role="group" aria-label="Your answer">
        {q.options.map((o, i) => (
          <button key={o.label} className="option" onClick={() => answer(o.type)}>
            <span className="option__letter">{LETTERS[i]}</span>
            <span className="option__text">
              <span className="option__label">{o.label}</span>
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}
