import type { ScreenDef } from '../engine/types';
import { AutopsyView } from './AutopsyView';
import { DecisionView } from './DecisionView';
import { DnaQuiz } from './DnaQuiz';
import { DnaResultView } from './DnaResultView';
import { NarrativeView } from './NarrativeView';
import { PhoneTaskView } from './PhoneTaskView';
import { QuizView } from './QuizView';
import { SummaryView } from './SummaryView';

interface Props {
  def: ScreenDef;
  screenKey: string;
  setReady: (ready: boolean) => void;
}

export function ScreenView({ def, screenKey, setReady }: Props) {
  const common = { screenKey, setReady };
  switch (def.kind) {
    case 'narrative':
      return <NarrativeView def={def} {...common} />;
    case 'decision':
      return <DecisionView def={def} {...common} />;
    case 'autopsy':
      return <AutopsyView def={def} {...common} />;
    case 'quiz':
      return <QuizView def={def} {...common} />;
    case 'phoneTask':
      return <PhoneTaskView def={def} {...common} />;
    case 'summary':
      return <SummaryView def={def} {...common} />;
    case 'custom':
      return def.component === 'dnaQuiz' ? <DnaQuiz def={def} {...common} /> : <DnaResultView def={def} {...common} />;
  }
}
