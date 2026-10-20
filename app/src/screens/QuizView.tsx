import { useEffect, useState } from 'react';
import { useSimStore } from '../engine/simStore';
import type { QuizQuestion, QuizScreen } from '../engine/types';
import type { ScreenProps } from './screenProps';

const XP_PER_CORRECT = 10;

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
      <h1>{def.title}</h1>
      {def.intro && <p>{def.intro}</p>}
      {def.questions.map((q, qi) => {
        const answered = answers[q.id];
        const correct = answered !== undefined && q.options[answered].correct;
        return (
          <section key={q.id} className="quiz-q">
            <h2>
              {qi + 1}. {q.q}
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
                    <span className="option__label">{o.label}</span>
                  </button>
                );
              })}
            </div>
            {answered !== undefined && (
              <div className={`outcome outcome--${correct ? 'good' : 'bad'}`} role="status">
                <strong>{correct ? `Correct (+${XP_PER_CORRECT} XP).` : 'Not quite.'}</strong> {q.explain}
              </div>
            )}
          </section>
        );
      })}
    </article>
  );
}
