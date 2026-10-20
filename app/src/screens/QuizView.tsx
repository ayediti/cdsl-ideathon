import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSimStore } from '../engine/simStore';
import type { QuizQuestion, QuizScreen } from '../engine/types';
import { Outcome } from './Outcome';
import type { ScreenProps } from './screenProps';

const XP_PER_CORRECT = 10;
const LETTERS = 'ABCDEFG';

export function QuizView({ def, screenKey, setReady }: ScreenProps<QuizScreen>) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const done = def.questions.every((q) => answers[q.id] !== undefined);

  useEffect(() => {
    if (done) setReady(true);
  }, [done, setReady]);

  const pick = (q: QuizQuestion, index: number) => {
    if (answers[q.id] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [q.id]: index }));
    if (q.options[index].correct) {
      useSimStore.getState().apply([{ type: 'xp', amount: XP_PER_CORRECT }], `quiz:${screenKey}:${q.id}`);
    }
  };

  return (
    <article className="screen">
      <h1 className="display">{def.title}</h1>
      {def.intro && <p className="lead">{def.intro}</p>}
      {def.questions.map((q, qi) => {
        const answered = answers[q.id];
        const correct = answered !== undefined && !!q.options[answered].correct;
        return (
          <section key={q.id} className="quiz-q">
            <h2>
              <span className="quiz-q__num">Q{qi + 1}</span>
              {q.q}
            </h2>
            <div className="options" role="group" aria-label={`Question ${qi + 1}`}>
              {q.options.map((o, oi) => {
                const state =
                  answered === undefined ? '' : o.correct ? 'option--correct' : answered === oi ? 'option--wrong' : '';
                return (
                  <button
                    key={oi}
                    className={`option ${state}`}
                    onClick={() => pick(q, oi)}
                    disabled={answered !== undefined}
                    aria-pressed={answered === oi}
                  >
                    <span className="option__letter">
                      {state === 'option--correct' ? <Check size={16} /> : state === 'option--wrong' ? <X size={16} /> : LETTERS[oi]}
                    </span>
                    <span className="option__text">
                      <span className="option__label">{o.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {answered !== undefined && (
              <Outcome
                tone={correct ? 'good' : 'bad'}
                title={correct ? 'Correct' : 'Not quite'}
                chips={correct ? [{ text: `+${XP_PER_CORRECT} XP`, tone: 'good' }] : []}
              >
                {q.explain}
              </Outcome>
            )}
          </section>
        );
      })}
    </article>
  );
}
