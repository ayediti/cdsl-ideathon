# FinSim (working title)

An entry for the CDSL Reimagine Ideathon: financial awareness and cyber safety for students, first-time investors and senior citizens. Two entry points:

- **Scam games** (`/arcade/:gameId`): five standalone, shareable two-minute games, plus the "golden hour" game on the landing page. They hook people in.
- **The course** (`/learn`, `/play/...`): a story-driven simulation with simulated money and a virtual phone, covering shares, demat accounts, the CAS, IPOs and investor scams. It teaches in depth.

The course engine follows the FiAlly teardown in [`../fially_teardown.md`](../fially_teardown.md). All companies, apps, people and messages are fictional.

## Scam games

Each game is pure data in [`src/arcade/games.ts`](src/arcade/games.ts), played by one of three generic players:

| kind | Player | Used by |
|---|---|---|
| `chat` | [`ChatPlayer`](src/arcade/ChatPlayer.tsx): branching video call, phone call or group chat | The Digital Arrest, The Pension Call, The Tip Group |
| `realOrFake` | [`RealOrFakePlayer`](src/arcade/RealOrFakePlayer.tsx): judge each card | Real or Deepfake? |
| `flagRush` | [`FlagRushPlayer`](src/arcade/FlagRushPlayer.tsx): timed hunt for hidden red flags | Red Flag Rush |

Every game ends in [`GameEnd`](src/arcade/GameEnd.tsx): a score, item-by-item review, red flags, "if this happens for real" steps and a share bar. Share links carry only the game id. The landing page's [`GoldenHour`](src/arcade/GoldenHour.tsx) teaches what to do in the first hour after a scam.

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
| `explore` | Teach: tap cards to reveal each idea | every card opened |
| `sort` | Teach: put items into buckets, with instant feedback | every item sorted |
| `order` | Teach: tap steps in the right sequence | all steps placed |
| `decision` | A choice with consequences (`effects`) | an option is picked (locked after) |
| `autopsy` | Tap the red flags in a scam message/call | all flags found |
| `quiz` | Knowledge checks (+10 XP per correct) | all answered |
| `phoneTask` | "Go do X on your phone" | `doneFlag` is set by a phone app |
| `summary` | Chapter recap | immediately |
| `custom` | Bespoke React screens (`dnaQuiz`, `dnaResult`, `priceLab`, `compoundLab`) | the component calls `setReady` |

Every chapter teaches with `explore` / `sort` / `order` / a lab before its `quiz`.

Text can use `{{cash}} {{savings}} {{rd}} {{shares}} {{networth}} {{date}} {{lost}} {{xp}}`.

## Effects (what a screen can do to the simulation)

`credit`, `debit`, `transfer`, `scamLoss`, `xp`, `unlockApp`, `message`, `advanceDays`, `startRd`, `flag`, `buyShares`, `dematDebit`, `ensureSavings`, `ensureShares`. All are defined in `types.ts` and applied in `reduce()` in `simStore.ts`. `onEnter` effects run once per screen, even across reloads and replays. `dematDebit` marks the line as unauthorised, so the Demat app's CAS view can ask the player to spot it.

Phone apps: Messages, Bank, Calculator, **Demat** (holdings + CAS statement) and **Verify** (a simulated SEBI registration lookup over the fictional entities in [`src/phone/registry.ts`](src/phone/registry.ts)).

## Add a chapter

1. Add a `Chapter` object to a module in `src/content/` (or a new module file, registered in `src/engine/curriculum.ts`).
2. List its screen ids in `screenSequence` and define each one in `screens`.
3. Optional: add library articles as `src/content/library/<slug>.md` and link them via `help.links`.

Every chapter is open, so learners can jump straight to the one they need. If a chapter depends on earlier ones (savings, shares in the demat account), give it an `entry` list of `ensure*` effects: they run once when the chapter is opened and do nothing if the player already has what is needed. In dev mode, a missing screen id or autopsy snippet logs an error in the console.

## GitHub Pages

The live site is served by GitHub Pages from the `gh-pages` branch, at `https://dukenukem1611.github.io/cdsl-ideathon/` once Pages is switched on (repo **Settings → Pages → Deploy from a branch → `gh-pages` / root**).

To update it:

```bash
npm run build:pages     # builds into dist-pages/ with hash routes (see .env.pages)
```

then publish `dist-pages/` to the `gh-pages` branch (it holds only the built site, never source). Pages serves only real files, so routes live after the `#` and shared links never 404.

## Language, read-aloud, large text, self-check

- **Hindi:** `src/i18n/hi.ts` maps each English string to Hindi; `useT()` translates at render and falls back to English. The home page, all games and the self-check are covered. In Red Flag Rush, each translated snippet must appear verbatim in its translated message.
- **Read-aloud:** `useReadAloud(text)` speaks new text with the browser's voice when the switch is on.
- **Large text:** a root font-size switch (`html[data-size='large']`).
- **Self-check** (`/check`): two equivalent six-item sets, taken before and after playing; scores stay in the browser.

The switches live in `AccessControls` and are saved per browser.

## Not built yet

- Hindi for the course chapters and library; more regional languages; lite mode.
- A refreshed Money DNA quiz.
- Server storage (everything is local; swap `persist` storage for a backend adapter).
