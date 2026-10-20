import type { ScreenDef } from '../engine/types';
import { AutopsyView } from './AutopsyView';
import { CompoundLab } from './CompoundLab';
import { DecisionView } from './DecisionView';
import { DnaQuiz } from './DnaQuiz';
import { DnaResultView } from './DnaResultView';
import { ExploreView } from './ExploreView';
import { NarrativeView } from './NarrativeView';
import { OrderView } from './OrderView';
import { PhoneTaskView } from './PhoneTaskView';
import { PriceLab } from './PriceLab';
import { QuizView } from './QuizView';
import { SortView } from './SortView';
import { SummaryView } from './SummaryView';

const CUSTOM = { dnaQuiz: DnaQuiz, dnaResult: DnaResultView, priceLab: PriceLab, compoundLab: CompoundLab } as const;

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
    case 'custom': {
      const Custom = CUSTOM[def.component];
      return <Custom def={def} {...common} />;
    }
    case 'explore':
      return <ExploreView def={def} {...common} />;
    case 'sort':
      return <SortView def={def} {...common} />;
    case 'order':
      return <OrderView def={def} {...common} />;
  }
}
