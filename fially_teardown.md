# FiAlly (fially.com): Teardown & Rebuild Blueprint

> Source: passive analysis of fially.com's public HTML, `llms.txt`, `llms-full.txt`, sitemap, and production JS bundles (2026-10-20).
> No authenticated pages were accessed and no backend APIs were called.
> Confidence tags: **[SEEN]** = read directly in code/HTML · **[INFERRED]** = strong deduction from code · **[UNKNOWN]** = not determinable from public files.

---

## 1. What it is

| | |
|---|---|
| Product | **FiAlly: "Your Financial Ally"**, a *financial life simulator* for India **[SEEN]** |
| Tagline | "Live your money life before it's real" **[SEEN]** |
| Audience | Students 15–25, parents, teachers/schools **[SEEN]** |
| Status | Beta waitlist, price ₹0 **[SEEN]** |
| Core promise | Practise banking, UPI, tax, investing, scams with **simulated money**, no real bank connection **[SEEN]** |
| Format | Narrative story ("Robin's financial journey" + mentor guidance) played screen by screen inside a fake phone/bank UI **[SEEN]** |
| Web presence | Almost none; no press, founder or funding info found online **[SEEN via search]** |

---

## 2. Tech stack

| Layer | Tech | Evidence |
|---|---|---|
| Build | **Vite** SPA (hashed `/assets/*.js`, `__vite__mapDeps`) | **[SEEN]** |
| UI | **React** + **Radix UI** + Tailwind-style classes, Material Symbols icons, ~15 Google Fonts | **[SEEN]** |
| Generator | **Lovable** (AI app builder): placeholder string *"Use the metadata in Lovable to create this screen component"* | **[SEEN]** |
| State | **Zustand**-style stores (`create(e=>({...}))`) for sim state; **TanStack React Query** for server data | **[SEEN]** / **[INFERRED]** |
| 3D | **Three.js** (e.g. `ChaiGlass3D` for the inflation chapter) | **[SEEN]** |
| Backend | **Supabase** (Postgres + Auth + RPC) | **[SEEN]** |
| Hosting | **Cloudflare** in front (`server: cloudflare`, `cf-ray` from DEL) | **[SEEN]** |
| Analytics | Traces of Amplitude/gtag strings only; no obvious tracker loaded | **[UNKNOWN]** |
| SEO/AI-SEO | JSON-LD schema (Organization, SoftwareApplication, ItemList curriculum), `llms.txt` + `llms-full.txt` | **[SEEN]** |

**Takeaway:** a small team (or solo builder) shipped this fast with Lovable + Supabase. You can match the stack in an ideathon timeframe.

---

## 3. Information architecture

### Routes **[SEEN]**
```
/                          landing + #join waitlist
/login, /reset-password    Supabase auth (username → email lookup via RPC)
/home                      dashboard / journey map
/play/:moduleId/:chapterId/:screenId   ← the core simulator player
/money-dna, /money-dna/room, /money-dna/letter, /money-dna/s/:token   personality quiz + shareable result
/library, /library/:slug, /library/acts/:actId,
/library/article/:moduleId/:chapterId/:slug, /library/collections/:id  learn-more articles
/research/school, /feedback/principal     B2B: school principal questionnaire (incl. audio clips)
```

### Content model **[SEEN]**
`Module → Chapter → Screen`. Every screen is its own lazily loaded React component, named `<chapter#><screen#>_<slug>`.

**Marketing curriculum (11 modules):** Banking · Saving · Insurance · Credit · Investing · Diversification · Taxes · Economics · Behaviour · Crisis · Live Mode

**Actually built so far (module IDs in code):** `m0_orientation`, `m1_banking`, `m2_payslip`. The rest are roadmap **[INFERRED]**.

| Chapter (code) | Example screens (≈200 total) |
|---|---|
| Orientation | intro → mythBuster → signup → **moneyDna** quiz → dnaResult → journeyMap → disclaimer |
| m1 ch01 Account opening | cashDecision → banksAsSolution → bankTypes → chooseBank → **kycHub** → PAN / Aadhaar explanation → signature → accountActive → grantCredited → cashDeposit → debitCard |
| m1 ch02 Payment methods | UPI setup → beneficiaries → IMPS/NEFT/RTGS → comparison → decision scenarios → auto-debit → ATM → cheque anatomy → money order |
| m1 ch03 Scams | inbox → **phishing decision + autopsy** → **vishing decision + autopsy** → friend-in-need scam → **QR scam** → "switch sides" (play the scammer) → drill → lock down → if it happens |
| ch04 Inflation | the basket → chai price (3D) → Venezuela → demand-pull / cost-push → RBI → real return → time machine |
| ch05 Compounding | mystery credit → rent analogy → time/risk/opportunity → compounding named → calculator → "two friends" (start early vs late) → Buffett reveal |
| ch06 Statement | anatomy → transaction trail → available balance → **detect fraud** → dispute process |
| m2 Payslip ch01 | offer letter → payslip → deductions → real number → lifestyle audit → housing / transport / food decisions → month settlement |
| m2 ch02 Behavioural | laptop decision → marketplace → **anchoring, pain of paying, loss aversion, social proof, default effect, present bias** labs → FHS reveal |
| m2 ch03 Emergency | dengue hit → damage → emergency fund → where to park it → FHS reveal |
| m2 ch04 Budgeting | the drift → tracking vs budgeting → build the budget (needs/wants) → pick a goal → **RD setup** → FHS reveal |

---

## 4. Core mechanics

### 4.1 Simulation state (global store) **[SEEN]**
```ts
{
  profileId, simOriginDate, simCurrentDate, simElapsedLabel,   // in-game calendar
  activeModuleId, activeChapterId, activeScreenId,             // resume point
  cashBalance, savingsBalance, netWorth,                       // money
  fhsScore, fhsTier,                                           // Financial Health Score
  xpPoints, panelExtras                                        // gamification
}
```
It is hydrated from the `user_simulation_summary` table and shown in a left/right "HUD" panel (date, net worth, XP, health score, goals).

### 4.2 Simulated time + mandates **[SEEN]**
- `simulation_time_config.origin` sets the in-game start date. Chapters "time-jump" forward ("2 months later", "routine jump").
- RPC `process_due_mandates_for_profile(p_profile_id)` runs **due auto-debits / RDs / standing instructions** whenever sim time advances, then the summary is recomputed and upserted.
- In other words, it is a small **ledger + scheduler** on Postgres.

### 4.3 Virtual Phone **[SEEN]**
A lazily loaded `VirtualPhone` component is the in-world device. Apps and flows found:
- **Bank app**: account statement, beneficiaries, IMPS/NEFT/UPI transfers, OTP/PIN authorisation, **FD & RD** creation, auto-debit mandates, standing instructions, transaction limits, alerts, manage devices.
- **UPI**: create UPI ID, set PIN (table `upi_ids`).
- **Messages / "WhatsUp"** (unlocked in the scam chapter) and **Marketplace** (unlocked later), used to deliver scam scenarios.
- **Budget** (needs vs wants), **Calculator** (installed in the compounding chapter), **Journal**.
- NPCs: Mom/Maa, Riya Sharma, Vikram, Kabir, Priya, plus "Clarke/Barry/Arthur" for the two-friends compounding story.
- Shopping catalogue (atta, dal, milk…; laptop, wardrobe tiers, gym, streaming) drives lifestyle trade-offs.

### 4.4 Money DNA (viral hook) **[SEEN]**
A 4-axis personality quiz with scores `score_bld / score_exp / score_pro / score_bal`:

| Type | Colour | One-liner |
|---|---|---|
| **The Builder** | #B3502D | goes for the choice that builds something |
| **The Explorer** | #C8893D | the fun, the people, the now |
| **The Protector** | #3F6B47 | goes for safe; money may sit still |
| **The Balancer** | #5B8A6F | keeps things even |

The result gets a `share_token` and a public `/money-dna/s/:token` page, with extra "room" and "letter" follow-ups. This is the growth loop.

### 4.5 Financial Health Score (FHS) **[SEEN]** / formula **[UNKNOWN]**
`fhs_score` + `fhs_tier`, revealed at the end of each m2 chapter. The formula is not in the client and is likely computed server-side or from the summary.

### 4.6 Pedagogy pattern **[SEEN]**
Each chapter follows **Narrative → Decision → Autopsy/Reveal → Summary → Feedback**. Scam chapters add "switch sides" (you play the fraudster) and a timed "drill".

---

## 5. Data model (Supabase tables seen in client code)

```
profiles(id, first_name, last_name, email_id, username, user_id)
user_onboarding
user_milestones(module_id, chapter_id, last_screen_id, ...)   -- progress/resume
user_simulation_summary(profile_id, sim_*_date, cash_balance, savings_balance,
                        net_worth, fhs_score, fhs_tier, xp_points, panel_extras, active_*_id)
user_wallets(cash_balance, ...)
sim_bank_accounts(balance, ...)
upi_ids
modules, chapters, library_meta, library_act_meta             -- CMS
simulation_time_config(key, value)
money_dna_results(id, profile_id, variant, dominant, climax_key,
                  score_bld, score_exp, score_pro, score_bal, share_token, completed_at)
money_dna_room_answers, money_dna_letter_answers
principal_questionnaire_responses, principal_questionnaire_audio_clips   -- B2B schools research
contact_messages
RPC: get_email_for_username, get_money_dna_share, process_due_mandates_for_profile
```
**[UNKNOWN]**: transactions/mandates table names (handled inside RPCs), RLS policies, scoring logic.

---

## 6. Business model (inferred)
- **B2C free beta** with a viral quiz (Money DNA share links).
- **B2B2C schools**: `/research/school` and principal questionnaires (with voice clips) show they are validating a **school licensing** channel.
- `betaUnlockOffer` / `betaSoftLanding` screens point to gating content after the free chapters (freemium) **[INFERRED]**.

---

## 7. FiAlly vs the CDSL Reimagine Ideathon 2027 brief

How FiAlly measures against the brief's mandatory audiences, values, prohibitions and jury criteria. Each "Gap" row is space your team can claim.

### 7.1 Audiences (all three are mandatory)
| Audience | FiAlly | Gap |
|---|---|---|
| Students | ✅ Core target (15–25) | Covered |
| First-time investors | ⚠️ Investing modules are marketing copy only; no demat, depository or securities content in code | **Large**: nothing on demat, CAS, settlement, DDPI or IPO |
| Senior citizens | ❌ Absent. English-only, dense desktop UI, ~15 web fonts + Three.js, narrative aimed at a young earner | **Large**: no voice, vernacular, large-text, low-bandwidth or family-assisted mode |

### 7.2 Brief values
| Value | FiAlly | Gap |
|---|---|---|
| Empowerment | ✅ Decision → consequence loop, Financial Health Score | Not applied to securities |
| Trust | ⚠️ "Simulated money, no real bank" is good framing | No link to *credible sources* (how to verify a SEBI-registered entity, read official alerts, use CAS as source of truth) |
| Safety | ✅ Strongest area: phishing / vishing / QR / friend scam with **decision → autopsy**, "switch sides", drill, lock-down, "if it happens" | Bank/UPI scams only. **No securities-market scams**: WhatsApp/Telegram stock-tip groups, fake trading apps, pump-and-dump, fake "SEBI-registered" advisers, fake IPO allotment, KYC-update phishing, demat OTP/DDPI misuse, regulator/depository impersonation |
| Inclusion | ❌ English-only, heavy assets | Languages, abilities, low literacy, low bandwidth |

### 7.3 Prohibitions in the brief (design implications)
| Brief says must NOT | Implication for your design |
|---|---|
| Provide investment advice / promote specific securities | Use **fictional** companies and funds in any simulation; teach *how to evaluate*, never *what to buy* |
| Enable trading or transaction execution | Simulation only, no broker/DP integration (FiAlly's "no real bank connection" stance is the right model) |
| Encourage speculative behaviour | Don't reward high-return picks with XP; reward **verification, diversification, patience, reporting fraud** |
| Collect / misuse sensitive personal info | Never ask for real PAN/Aadhaar/demat IDs, even "for realism". FiAlly stores name + email + username; you can do better with guest mode |

### 7.4 Jury criteria (FiAlly as a benchmark)
| Criterion | FiAlly strength to match | Where you can beat it |
|---|---|---|
| Innovation | Narrative life-sim + virtual phone | Securities + cyber safety in one sim; play the scammer to learn the tricks |
| UX/UI | Polished, game-like | Also usable by a 65-year-old on a ₹8k phone |
| Behavioural impact | Decision autopsies, FHS | **Measured** behaviour change: pre/post scam-detection rate, "paused and verified" rate |
| Feasibility / scalability | Built fast on Lovable + Supabase | Distribution via DPs, schools, IEPs, WhatsApp/IVR, and CDSL's existing alert touchpoints |
| Accessibility | Weak | Vernacular, voice-first, large text, offline/lite mode |
| Data protection | Unknown (RLS not visible) | Privacy by design, DPDP Act 2023 consent, data minimisation, no real identifiers |
| End-to-end bonus | Partial | Cover **learn → recognise → avoid → respond** (1930 helpline, cybercrime.gov.in, SEBI SCORES, how to freeze/block an account) |

### 7.5 Brief statistics to anchor your problem section
- Only ~9.5% of households (3.21 cr of 33.72 cr) invest in securities, though 63% know at least one product
- 80% of demat accounts come from Tier II+ cities; only ~20% belong to women
- 18.59 cr CDSL demat accounts and ₹88.2 lakh cr assets under custody (30 Jun 2026)
- <1% participation in SEBI Investor Education Programs, while 91% of past participants rate them highly useful
- 51% of non-investors cite trust as a barrier; ~80% of households (79% of Gen Z) are risk-averse
- NCFE survey: the 18–29 age group scores lowest on financial literacy and attitude

---

## 7b. Engine internals (deep pass over all 247 JS chunks) **[SEEN]**

- **Source layout** (from Vite glob keys): `src/modules/<moduleId>/chapters/<chapterId>/screens/<screenId>.tsx` and `.../library/<slug>.md`. Library titles are parsed from the first `# heading`.
- **Chapter config:** `{ id, title, moduleId, totalScreens, screenSequence: [...] }`. "Next" is simply the next id in `screenSequence`, and the player route is `/play/:moduleId/:chapterId/:screenId`.
- **Full sequence:** 12 chapters, 168 screens. Orientation (Money DNA 6, Myth Buster 2, Sign up 2), Banking Basics 17, Payment Methods 28, Scam Radar 22, The Silent Tax (inflation) 14, The Quiet Multiplier (compounding) 19, The Paper Trail (statements) 9, Payslip Intro 13, Two Months Later (behavioural biases) 14, Months 4–6 Routine 10, Months 7–9 Stability 12.
- **New-user seed:** `sim_origin_date 2018-01-01`, `cash_balance 10000`, start screen `m1_banking/ch01_account_opening/110_disclaimer`, `startUnlockedApps: ["chat"]`.
- **Per-screen help registry:** `{ reflection, steps:[{title,content}], links:[{label, target:{kind:"screen", screenId}}] }` feeds the help drawer and library links.
- **Per-chapter session keys** in `sessionStorage` (e.g. `ch03_phishing_outcome`, `ch03_total_lost`, `ch01-xp-total`) hold choices, XP and "loss applied" guards.
- **Scam losses are real sim debits:** falling for a scam debits savings, inserts a `transactions` row to an NPC "Anonymous Beneficiary" account, and updates `sim_bank_accounts`. A `onceKey` guard prevents double-charging, and the total lost is tallied for the debrief.
- **Transactions table:** `profile_id, amount, transaction_type, description, sender_account_id, receiver_account_id, status, is_cash_transaction, created_at`.
- **Phone integration:** screens call `addMessage / updateMessage / openToolkitToApp` to inject SMS/WhatsApp messages and pop the phone open on a given app.
- **Signup:** username `^[a-z0-9_]{3,24}$`, password ≥ 6 characters, plus `branch, age, answers` stored in onboarding.

---

## 8. Reusable patterns from FiAlly (structure only)

These are **patterns, not your idea**. Pick the ones that fit the concept your team develops.

1. **Simulation with zero real stakes:** directly satisfies "no advice, no trading" while still giving hands-on practice.
2. **Decision → Autopsy:** let the user fall for (or dodge) a scam, then dissect the red flags.
3. **Switch sides:** play the scammer to learn how scams are built.
4. **Virtual phone:** realistic SMS, WhatsApp, alert and app screens without touching real accounts.
5. **Shareable personality result:** a cheap growth loop (Money DNA → share link).
6. **Score that moves:** FHS-style score tied to *safe behaviour*, not returns.
7. **Data-driven screen player:** `/play/:module/:chapter/:screen` fed by JSON, so non-developers can add vernacular content.
8. **Lean stack:** Vite + React + Supabase (+ Lovable/v0 for scaffolding) is enough for a Round 2 prototype.

> Build your own content, art and copy. Use FiAlly for structure and inspiration only, not its assets, text or branding.
> The brief requires the core concept to come from your team; AI-assisted refinement is allowed, but AI-originated ideas risk disqualification.
