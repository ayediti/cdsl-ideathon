# FinSim (working title)

A rebuild of FiAlly's architecture: a narrative financial-life simulator with simulated money, a virtual phone, decisions with consequences, scam "autopsies", a Money DNA quiz and a financial health score.

The mechanics follow the teardown in [`../fially_teardown.md`](../fially_teardown.md). All story text, characters and branding are original placeholders, ready to replace.

## Run

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## How it maps to FiAlly

| FiAlly | Here |
|---|---|
| `/play/:moduleId/:chapterId/:screenId` player | [`src/pages/Player.tsx`](src/pages/Player.tsx) |
| Chapter `{ id, title, moduleId, screenSequence }` | [`src/engine/types.ts`](src/engine/types.ts) `Chapter` |
| One `.tsx` per screen (~170 files) | **Data-driven screens** in [`src/content/`](src/content), rendered by 6 generic views in [`src/screens/`](src/screens) |
| `user_simulation_summary` (sim date, cash, savings, net worth, FHS, XP) | [`src/engine/simStore.ts`](src/engine/simStore.ts) (zustand, persisted to localStorage) |
| `process_due_mandates_for_profile` RPC | `processMandates()` in `simStore.ts`, run on every `advanceDays` |
| Scam loss → debit to "Anonymous Beneficiary" + once-key | `scamLoss` effect + `apply(effects, onceKey)` |
| VirtualPhone + `openToolkitToApp` / `addMessage` | [`src/phone/`](src/phone) + `message` / `unlockApp` effects |
| Money DNA (4 axes, share token) | [`src/engine/dna.ts`](src/engine/dna.ts). The token encodes the result itself, so no server and no personal data |
| FHS (server-side, formula unknown) | [`src/engine/fhs.ts`](src/engine/fhs.ts): cushion 40 + habit 20 + safety 40 |
| Per-screen help (reflection + library links) | `help` field on every screen + [`HelpPanel`](src/components/HelpPanel.tsx) |
| `library/*.md` via Vite glob | [`src/content/library/`](src/content/library) via [`src/engine/library.ts`](src/engine/library.ts) |

## Screen kinds

| kind | Use for | Continue unlocks when |
|---|---|---|
| `narrative` | Story beats, explanations | immediately |
| `decision` | A choice with consequences (`effects`) | an option is picked (locked after) |
| `autopsy` | Tap the red flags in a scam message/call | all flags found |
| `quiz` | Knowledge checks (+10 XP per correct) | all answered |
| `phoneTask` | "Go do X on your phone" | `doneFlag` is set by a phone app |
| `summary` | Chapter recap | immediately |
| `custom` | Bespoke React screens (`dnaQuiz`, `dnaResult`) | the component calls `setReady` |

Text can use `{{cash}} {{savings}} {{rd}} {{networth}} {{date}} {{lost}} {{xp}}`.

## Effects (what a screen can do to the simulation)

`credit`, `debit`, `transfer`, `scamLoss`, `xp`, `unlockApp`, `message`, `advanceDays`, `startRd`, `flag`. All are defined in `types.ts` and applied in `reduce()` in `simStore.ts`. `onEnter` effects run once per screen, even across reloads and replays.

## Add a chapter

1. Add a `Chapter` object to a module in `src/content/` (or a new module file, registered in `src/engine/curriculum.ts`).
2. List its screen ids in `screenSequence` and define each one in `screens`.
3. Optional: add library articles as `src/content/library/<slug>.md` and link them via `help.links`.

Chapters unlock in order. In dev mode, a missing screen id or autopsy snippet logs an error in the console.

## Not replicated (yet)

- Supabase auth and server storage (everything is local; swap `persist` storage for a Supabase adapter).
- FiAlly's remaining chapters (payment methods, inflation, compounding deep-dive, statement fraud, payslip, behavioural biases, budgeting).
- School / principal research flows and the beta waitlist.
