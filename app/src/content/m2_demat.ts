import { DP_NAME } from '../brand';
import type { Module } from '../engine/types';

const MENTOR = 'Kavya, your mentor';

const stipend = {
  type: 'credit',
  account: 'savings',
  amount: 6000,
  description: 'Monthly internship stipend',
  counterparty: 'Brightleaf Studio',
} as const;

const IPO_OFFER =
  '🎉 Saffron Rail IPO: GUARANTEED allotment through our HNI quota. Only 20 slots. Pay ₹2,000 booking fee to saffron.ipo@upi to reserve. Offer closes in 1 hour!';

const TRADING_APP_PITCH =
  '📈 SEBI APPROVED trading app. Earn 12% MONTHLY with zero risk. VIP members get an exclusive institutional account with IPO quota. Install now: qtpro-app.apk (only 50 slots left today!)';

export const demat: Module = {
  id: 'm2_demat',
  title: 'Your First Demat Account',
  tagline: 'Open it safely, read it regularly, protect it always.',
  chapters: [
    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch01_open',
      moduleId: 'm2_demat',
      title: 'Opening Your Demat Account',
      blurb: 'Pick a registered DP, finish KYC, add a nominee and understand what you sign.',
      entry: [{ type: 'ensureSavings', amount: 9000 }],
      screenSequence: [
        '101_ready',
        '102_where',
        '103_verify',
        '104_kyc_basics',
        '105_kyc',
        '106_nominee',
        '107_ddpi',
        '108_active',
        '109_check',
        '110_summary',
      ],
      screens: {
        '101_ready': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Ready to start investing?',
          onEnter: [{ type: 'advanceDays', days: 30 }, stipend],
          body: [
            'It is {{date}}. You have an emergency cushion in savings ({{savings}}) and you want to learn investing with a small amount you will not need soon.',
            'Before you can hold a single share, you need a demat account. Your feed is already full of offers.',
          ],
        },
        '102_where': {
          kind: 'decision',
          title: 'Where do you sign up?',
          prompt: 'Three ways to open a demat account show up this week. Which do you go with?',
          saveAs: 'm2_where',
          options: [
            {
              id: 'insta',
              label: 'An Instagram finfluencer’s link: free account + VIP tips group',
              tone: 'bad',
              outcome:
                'The “free tips group” is the real product: they profit when followers trade on their calls or pay for “premium”. Some of these links do not lead to a registered broker at all.',
            },
            {
              id: 'friend',
              label: 'Let a friend open it in his name and “manage it” for me',
              tone: 'bad',
              outcome:
                'Shares in his name are legally his. Handing someone control of your money and logins is how many people lose everything. Your account should be in your name, controlled by you.',
            },
            {
              id: 'verified',
              label: 'Pick a broker, then check it is SEBI-registered before signing up',
              tone: 'good',
              outcome: 'Smart. Anyone can run an ad; only registered intermediaries can open demat accounts. Let us check one.',
              effects: [{ type: 'xp', amount: 30 }],
            },
          ],
          help: { links: [{ label: 'How to check SEBI registration', slug: 'check-sebi-registration' }] },
        },
        '103_verify': {
          kind: 'phoneTask',
          title: 'Check before you trust',
          onEnter: [{ type: 'unlockApp', app: 'verify' }],
          body: [
            'You have a new Verify app on your phone. It works like SEBI’s public list of registered intermediaries.',
            `Look up the broker you are considering, ${DP_NAME}, and the “StockGuru Pro” app from the Instagram ad. Compare what you find.`,
          ],
          app: 'verify',
          doneFlag: 'verify_done',
          doneText: `${DP_NAME} is a registered broker and DP. StockGuru Pro is not registered at all, so it cannot legally offer you investment services or tips.`,
          help: { links: [{ label: 'How to check SEBI registration', slug: 'check-sebi-registration' }] },
        },
        '104_kyc_basics': {
          kind: 'explore',
          title: 'What KYC asks for',
          intro: `You sign up with ${DP_NAME}. First comes KYC (Know Your Customer). Tap each part to see what it is for.`,
          cards: [
            { id: 'pan', label: 'PAN card', hint: 'Mandatory', body: 'PAN is mandatory for investing in the securities market. It links all your investments to you.' },
            { id: 'address', label: 'Proof of address', hint: 'Where you live', body: 'Aadhaar or another officially valid document confirms your address.' },
            {
              id: 'ipv',
              label: 'In-person or video check',
              hint: 'That you are you',
              body: 'A live check, in person or on video. If an OTP is needed, you type it into the official app yourself. You never read it out to anyone.',
            },
            {
              id: 'kra',
              label: 'KYC Registration Agency',
              hint: 'Do it once',
              body: 'Your KYC is stored with a KRA, so other SEBI-registered firms can reuse it. Update it when your address or phone number changes.',
            },
          ],
          callout: 'KYC protects you too: it makes it hard for anyone to open an account in your name.',
          help: { links: [{ label: 'KYC basics', slug: 'kyc-basics' }] },
        },
        '105_kyc': {
          kind: 'quiz',
          title: 'KYC: proving you are you',
          intro: 'Check what you just learned.',
          questions: [
            {
              id: 'pan',
              q: 'Which document is mandatory for KYC when you open a demat account?',
              options: [{ label: 'My PAN card', correct: true }, { label: 'My college ID' }, { label: 'Just a selfie' }],
              explain:
                'PAN is mandatory for investing in the securities market. You also give proof of address (such as Aadhaar) and complete in-person or video verification.',
            },
            {
              id: 'otp',
              q: 'During video KYC, the person on the call asks you to read out the OTP you just received “to finish verification”. You…',
              options: [
                { label: 'Read it out. It is part of KYC.' },
                { label: 'Refuse. I type OTPs into the official app myself and never read them out to anyone.', correct: true },
              ],
              explain:
                'In genuine e-KYC you enter the OTP into the official app or website yourself. Nobody, not even a “KYC officer”, should ask you to read it out.',
            },
            {
              id: 'kra',
              q: 'Your KYC is now recorded with a KYC Registration Agency (KRA). What does that mean?',
              options: [
                { label: 'Other registered firms can reuse it, so I do not start from scratch each time', correct: true },
                { label: 'Anyone who asks can see my details' },
                { label: 'I never need to update it again' },
              ],
              explain: 'KRAs let registered intermediaries reuse your KYC. Keep it updated when your address or phone number changes.',
            },
          ],
          help: { links: [{ label: 'KYC basics', slug: 'kyc-basics' }] },
        },
        '106_nominee': {
          kind: 'decision',
          title: 'Who gets your shares?',
          prompt: 'The form asks you to add a nominee: the person who can claim your shares if something happens to you.',
          saveAs: 'm2_nominee',
          options: [
            {
              id: 'add',
              label: 'Add my mother as nominee',
              tone: 'good',
              outcome: 'A nominee can claim the shares without a long legal process. You can change or add nominees any time.',
              effects: [{ type: 'xp', amount: 20 }],
            },
            {
              id: 'skip',
              label: 'Skip it. I am young, why bother?',
              tone: 'neutral',
              outcome:
                'You can choose not to nominate, but you have to formally opt out, and your family may face a long legal process to claim your shares. Most people should add one.',
            },
          ],
        },
        '107_ddpi': {
          kind: 'decision',
          title: 'The DDPI box',
          prompt:
            'There is an optional section called DDPI (Demat Debit and Pledge Instruction). It lets your broker take shares out of your demat account to settle sales you make, without asking you each time. Then a “relationship manager” calls with another idea: “Just share your TPIN with me and I will handle everything.”',
          saveAs: 'm2_ddpi',
          options: [
            {
              id: 'tpin',
              label: 'Share my TPIN with the relationship manager',
              tone: 'bad',
              outcome:
                'Your TPIN, with an OTP, is how you personally approve shares leaving your account. Anyone who has it can sell or move your shares. Never share it, not even with your broker’s staff.',
            },
            {
              id: 'read',
              label: 'Read what DDPI allows, then decide for myself',
              tone: 'good',
              outcome:
                'Right approach. DDPI is legal and optional, and it only covers specific uses such as settling your own sales. Without it, you approve each sale yourself with your TPIN and an OTP. Either way, nobody else should hold your TPIN.',
              effects: [{ type: 'xp', amount: 30 }],
            },
            {
              id: 'blind',
              label: 'Tick every box without reading. It is just a form.',
              tone: 'neutral',
              outcome: 'It worked out this time, but forms are where you hand out permissions. Always know what you are authorising.',
            },
          ],
        },
        '108_active': {
          kind: 'narrative',
          title: 'Account open, first shares in',
          onEnter: [
            { type: 'unlockApp', app: 'demat' },
            {
              type: 'message',
              thread: 'BANYAN',
              from: 'BANYAN',
              text: `Welcome to ${DP_NAME}! Your demat account (BO ID ····4417) is active. We will NEVER ask for your password, TPIN or OTP.`,
            },
            { type: 'buyShares', symbol: 'KETL', name: 'Kettle & Co. Ltd', qty: 20, price: 180, broker: DP_NAME },
            { type: 'xp', amount: 20 },
          ],
          body: [
            'Your demat account is open. You decide to start small, with an amount you can afford to lose.',
            'You buy 20 shares of Kettle & Co., a (fictional) chai chain you understand well, for ₹3,600. Savings left: {{savings}}.',
            'This is a simulation for learning, not a recommendation to buy any share.',
          ],
        },
        '109_check': {
          kind: 'phoneTask',
          title: 'Look inside your demat account',
          body: ['Open the new Demat app on your phone. Find your Kettle & Co. shares and the statement line for the purchase.'],
          app: 'demat',
          doneFlag: 'demat_opened',
          doneText: 'Your shares are held in your name by the depository, not by the app or the broker.',
        },
        '110_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Open a demat account only through a SEBI-registered DP, and check the registration yourself.',
            'KYC needs your PAN. You type OTPs into official apps yourself and never read them out.',
            'Add a nominee. Read what you authorise, DDPI included.',
            'Your TPIN is yours alone. Nobody genuine will ask for it.',
          ],
        },
      },
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch02_cas',
      moduleId: 'm2_demat',
      title: 'Reading Your CAS',
      blurb: 'The one statement that comes straight from the depository, and the habit that catches fraud early.',
      entry: [
        { type: 'unlockApp', app: 'demat' },
        { type: 'ensureShares', symbol: 'KETL', name: 'Kettle & Co. Ltd', qty: 20, price: 180, broker: DP_NAME },
      ],
      screenSequence: ['201_statement', '202_anatomy', '203_spot', '204_respond', '205_quiz', '206_summary'],
      screens: {
        '201_statement': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Your statement arrives',
          onEnter: [
            { type: 'advanceDays', days: 30 },
            stipend,
            { type: 'dematDebit', symbol: 'KETL', qty: 15, description: 'Off-market transfer to BO ····9032' },
            {
              type: 'message',
              thread: 'CAS',
              from: 'CAS-DEPOSITORY',
              text: 'Your Consolidated Account Statement for this month is ready. It lists all holdings and transactions across demat accounts and mutual funds linked to your PAN. Report anything you do not recognise to your DP.',
            },
          ],
          body: [
            'It is {{date}}. An email arrives from the depository: your Consolidated Account Statement (CAS).',
            '“Most people never open it,” Kavya says. “But it comes straight from the depository. Your broker’s app can be wrong, and your login can be stolen. The CAS is the source of truth.”',
          ],
          help: { links: [{ label: 'Reading your CAS', slug: 'reading-your-cas' }] },
        },
        '202_anatomy': {
          kind: 'explore',
          title: 'Anatomy of a CAS',
          intro: 'Before you read yours, learn its parts. Tap each section.',
          cards: [
            {
              id: 'details',
              label: 'Investor details',
              hint: 'Is this you?',
              body: 'Your name, PAN, and the email and mobile on record. If these are wrong, your alerts may be going to someone else.',
            },
            {
              id: 'holdings',
              label: 'Holdings summary',
              hint: 'What you own',
              body: 'Every security in every demat account linked to your PAN, with its value on the statement date. It should match your broker’s app.',
            },
            {
              id: 'txns',
              label: 'Transactions',
              hint: 'What changed',
              body: 'Every credit and debit in the period: purchases, sales and transfers. Each line should be something you did.',
            },
            { id: 'mf', label: 'Mutual funds', hint: 'The full picture', body: 'Your mutual fund units are included, so you see everything in one place.' },
            {
              id: 'contact',
              label: 'Who to contact',
              hint: 'If something is off',
              body: 'Your DP’s details. Report anything you do not recognise to them immediately, through official channels.',
            },
          ],
          callout: 'The habit: every time a CAS arrives, check the transactions line by line.',
        },
        '203_spot': {
          kind: 'phoneTask',
          title: 'Read it line by line',
          body: ['Open the Demat app and go through the statement.', 'One of these lines is not something you did. Find it and tap it.'],
          app: 'demat',
          doneFlag: 'cas_spotted',
          doneText: '15 of your Kettle & Co. shares were moved out in an “off-market transfer” to an account you have never heard of. You never did that.',
        },
        '204_respond': {
          kind: 'decision',
          title: 'Someone moved your shares',
          prompt: 'What do you do now?',
          saveAs: 'm2_cas_response',
          options: [
            {
              id: 'wait',
              label: 'Probably a glitch. I will check next month’s statement.',
              tone: 'bad',
              outcome:
                'A few days later, the rest of your shares are gone too. Whoever got access is still using it. Unauthorised transfers must be reported immediately.',
              effects: [{ type: 'dematDebit', symbol: 'KETL', qty: 'all', description: 'Off-market transfer to BO ····9032' }],
            },
            {
              id: 'search',
              label: 'Search online for “Banyan customer care” and call the first number',
              tone: 'bad',
              outcome:
                'The “helpline” was fake: scammers post fake numbers and buy search ads. They charged a ₹2,000 “recovery fee”. Always take numbers from the official website or app.',
              effects: [{ type: 'scamLoss', amount: 2000, description: '“Recovery fee” to fake helpline' }],
            },
            {
              id: 'report',
              label: 'Contact my DP through its official app, ask them to freeze my account, and file a complaint',
              tone: 'good',
              outcome:
                'Your DP freezes the account so nothing else can leave it, and opens an investigation. The shares already moved may or may not come back, but you stopped the damage and created a record. If the DP does not resolve it, you can escalate on SEBI’s SCORES portal.',
              effects: [{ type: 'xp', amount: 40 }],
            },
          ],
          help: { links: [{ label: 'Reporting investor fraud', slug: 'report-investor-fraud' }] },
        },
        '205_quiz': {
          kind: 'quiz',
          title: 'Quick check',
          questions: [
            {
              id: 'who',
              q: 'Who sends you the CAS?',
              options: [{ label: 'The depositories (CDSL / NSDL)', correct: true }, { label: 'A tips group' }, { label: 'My employer' }],
              explain: 'The CAS comes from the depositories, so it is independent of your broker’s app.',
            },
            {
              id: 'when',
              q: 'How often should you expect a CAS?',
              options: [
                { label: 'For every month with transactions, and at least every six months otherwise', correct: true },
                { label: 'Only when I ask for one' },
                { label: 'Once every ten years' },
              ],
              explain: 'If a month with activity goes by without a CAS, ask your DP. A missing statement can hide a problem.',
            },
            {
              id: 'habit',
              q: 'What is the best habit?',
              options: [
                { label: 'Match my broker app’s holdings against my CAS every time it arrives', correct: true },
                { label: 'Delete it. The app is enough.' },
                { label: 'Forward it to a tips group admin to check' },
              ],
              explain: 'Two independent records that should match. When they do not, act on it.',
            },
          ],
        },
        '206_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Your CAS comes from the depository and lists everything linked to your PAN.',
            'Read every line. Anything you did not do is an emergency.',
            'Report through official channels only, and ask for your account to be frozen.',
            'Escalate unresolved complaints on SEBI SCORES. Total lost so far in this simulation: {{lost}}.',
          ],
        },
      },
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch03_ipo',
      moduleId: 'm2_demat',
      title: 'Applying for an IPO, the Safe Way',
      blurb: 'How IPO applications really work, and the “guaranteed allotment” trap.',
      screenSequence: ['301_buzz', '302_how', '303_legit_or_scam', '304_offer', '305_allotment', '306_quiz', '307_summary'],
      screens: {
        '301_buzz': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Everyone is talking about an IPO',
          body: [
            'Saffron Rail Ltd (fictional) is going public. Its IPO, or Initial Public Offering, is the first time it sells shares to the public.',
            'Your friends say it is “sure to list at a premium”. Kavya disagrees: “Nobody knows that. Read the offer document filed with SEBI, understand the business and its risks, and only use money you can afford to lose.”',
            'If you decide to apply, there is one safe way to do it, and plenty of unsafe ones.',
          ],
        },
        '302_how': {
          kind: 'order',
          title: 'How applying actually works',
          intro: 'Put the steps of a safe IPO application in order.',
          steps: [
            { id: 'read', label: 'Read the offer document (RHP)', detail: 'Understand the business, its finances and its risks before deciding.' },
            {
              id: 'apply',
              label: 'Apply in your broker app or net banking, using ASBA',
              detail: 'ASBA: Application Supported by Blocked Amount. You choose the IPO and the number of lots.',
            },
            { id: 'mandate', label: 'Approve the UPI mandate in your own UPI app', detail: 'The money is blocked in your account, not paid.' },
            { id: 'lottery', label: 'Allotment by lottery after the issue closes', detail: 'When more people apply than there are shares, a computerised lottery decides. Many get nothing.' },
            {
              id: 'result',
              label: 'Shares credited, or the block released',
              detail: 'Allotted: the amount is debited and shares arrive in your demat. Not allotted: your money is unblocked.',
            },
          ],
          help: { links: [{ label: 'IPOs, the safe way', slug: 'ipo-the-safe-way' }] },
        },
        '303_legit_or_scam': {
          kind: 'sort',
          title: 'Legit or scam?',
          intro: 'There is no “processing fee”, “guaranteed quota” or “insider allotment”. With that in mind, sort these.',
          buckets: [
            { id: 'legit', label: 'Legit' },
            { id: 'scam', label: 'Scam' },
          ],
          items: [
            { id: 'asba', label: 'Apply in your own broker app using ASBA', bucket: 'legit', why: 'The standard, safe route.' },
            { id: 'fee', label: 'Pay a ₹2,000 “booking fee” for an HNI quota', bucket: 'scam', why: 'No fee or quota buys you allotment.' },
            { id: 'mandate', label: 'Approve the UPI mandate in your own UPI app', bucket: 'legit', why: 'The mandate only blocks money in your own account.' },
            { id: 'preipo', label: 'Buy “pre-IPO shares” from a Telegram channel', bucket: 'scam', why: 'Strangers selling unlisted shares with guaranteed gains is a common fraud.' },
            { id: 'status', label: 'Check allotment on the registrar’s website', bucket: 'legit', why: 'Go to official sources yourself.' },
            { id: 'link', label: 'Click an allotment link sent from an unknown number', bucket: 'scam', why: 'Links from strangers lead to phishing pages.' },
          ],
        },
        '304_offer': {
          kind: 'decision',
          title: 'A message about the IPO',
          onEnter: [{ type: 'message', thread: 'IPO-VIP', from: '+91 93XXXXXX44', text: IPO_OFFER, suspicious: true }],
          prompt: `A message arrives (it is in your Messages app too): “${IPO_OFFER}” What do you do?`,
          saveAs: 'm2_ipo',
          options: [
            {
              id: 'pay',
              label: 'Pay the ₹2,000 booking fee',
              tone: 'bad',
              outcome:
                'There is no such quota and no booking fee. The UPI ID belonged to a scammer, and your number is now on a list for the next pitch.',
              effects: [{ type: 'scamLoss', amount: 2000, description: 'IPO “booking fee”' }],
            },
            {
              id: 'asba',
              label: 'Ignore it. Apply for one lot through my own broker app, via ASBA.',
              tone: 'good',
              outcome:
                'You apply in your broker app and approve the UPI mandate in your own UPI app. The money stays in your account, blocked until allotment.',
              effects: [
                { type: 'xp', amount: 30 },
                {
                  type: 'message',
                  thread: 'NB-NIMBUS',
                  from: 'NB-NIMBUS',
                  text: 'Amount BLOCKED in a/c XX4417 for IPO application (Saffron Rail Ltd). It will be debited only if shares are allotted.',
                },
              ],
            },
            {
              id: 'skip',
              label: 'Skip this IPO. I have not read the offer document.',
              tone: 'good',
              outcome: 'Perfectly valid. Skipping something you do not understand is a good investing decision.',
              effects: [{ type: 'xp', amount: 30 }],
            },
          ],
        },
        '305_allotment': {
          kind: 'narrative',
          title: 'Allotment day',
          onEnter: [{ type: 'advanceDays', days: 7 }],
          body: [
            'The IPO was heavily oversubscribed. If you applied, the lottery did not pick you this time. That is normal, and the block on your money is released.',
            'You check the allotment status yourself on the registrar’s or the stock exchange’s website, never through a link someone sends you.',
            'On listing day the price swings wildly. Some people who rushed in on “tips” lose money within days.',
          ],
        },
        '306_quiz': {
          kind: 'quiz',
          title: 'Quick check',
          questions: [
            {
              id: 'asba',
              q: 'What does ASBA mean for your money?',
              options: [
                { label: 'It stays in my account, blocked until allotment', correct: true },
                { label: 'It goes to the company immediately' },
                { label: 'It is paid to the broker as a fee' },
              ],
              explain: 'With ASBA, money leaves your account only if you are allotted shares.',
            },
            {
              id: 'preipo',
              q: 'A Telegram channel sells “pre-IPO shares at a discount, guaranteed listing gains”. This is…',
              options: [{ label: 'A warning sign of a scam', correct: true }, { label: 'A smart shortcut' }, { label: 'How big investors normally buy' }],
              explain: 'Strangers selling unlisted shares with guaranteed gains is a common fraud. Listing gains are never guaranteed.',
            },
            {
              id: 'status',
              q: 'Where do you check whether you got an allotment?',
              options: [
                { label: 'On the registrar’s or exchange’s official website, or in my broker app', correct: true },
                { label: 'Through a link in an SMS from an unknown number' },
                { label: 'By calling the number in the IPO ad' },
              ],
              explain: 'Go to official sources yourself. Never follow links sent by strangers.',
            },
          ],
        },
        '307_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'An IPO is a company’s first sale of shares to the public. Gains are never guaranteed.',
            'Apply only through your own broker or bank using ASBA; your money is blocked, not paid.',
            'Allotment is by lottery. There is no fee, quota or insider route.',
            'Check status on official websites, never through links you were sent.',
          ],
        },
      },
    },

    // ── Chapter 4 ────────────────────────────────────────────────────────────
    {
      id: 'ch04_scams',
      moduleId: 'm2_demat',
      title: 'Investor Scam Radar',
      blurb: 'Fake trading apps, tip groups and fake regulators. Learn their playbook, then flip it.',
      screenSequence: ['401_intro', '402_signals', '403_app_autopsy', '404_too_good', '405_switch_sides', '406_if_it_happens', '407_summary'],
      screens: {
        '401_intro': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Scammers follow the money',
          body: [
            'As more people start investing, investor scams have grown fast: fake tip groups, fake trading apps, fake advisers and fake “regulators”.',
            '“They do not hack the market,” Kavya says. “They hack your greed, your fear of missing out, and your trust in authority. Let us take their playbook apart.”',
          ],
          help: { links: [{ label: 'Common investor scams', slug: 'investor-scams' }] },
        },
        '402_signals': {
          kind: 'sort',
          title: 'Scam signal or safe sign?',
          intro: 'Learn to read the signs. Sort each one.',
          buckets: [
            { id: 'scam', label: 'Scam signal' },
            { id: 'safe', label: 'Safe sign' },
          ],
          items: [
            { id: 'monthly', label: '“Guaranteed 12% every month”', bucket: 'scam', why: 'No honest investment guarantees returns, let alone 12% a month.' },
            { id: 'regno', label: 'The adviser’s registration number and name match on sebi.gov.in', bucket: 'safe', why: 'Registration you checked yourself is the strongest sign.' },
            { id: 'tax', label: 'You must pay 20% “tax” before you can withdraw', bucket: 'scam', why: 'Real brokers never charge you to release your own money.' },
            { id: 'store', label: 'A registered broker’s app, installed from the official app store', bucket: 'safe', why: 'Official apps of registered brokers are the safe route.' },
            { id: 'rush', label: 'The admin says “buy before 10:15!”', bucket: 'scam', why: 'Urgency stops you from checking.' },
            { id: 'cas', label: 'Your CAS matches your broker app', bucket: 'safe', why: 'Two independent records agreeing is what you want to see.' },
          ],
        },
        '403_app_autopsy': {
          kind: 'autopsy',
          title: 'Autopsy: the trading app pitch',
          intro: 'This arrived on WhatsApp. Tap every part that should set off alarms.',
          artifact: { channel: 'sms', from: 'QuantumTrade Pro (WhatsApp)', text: TRADING_APP_PITCH },
          flags: [
            {
              id: 'approved',
              snippet: 'SEBI APPROVED',
              why: 'SEBI registers intermediaries; it does not “approve” apps or the returns they promise. Check the registration yourself.',
            },
            { id: 'monthly', snippet: '12% MONTHLY', why: 'That compounds to nearly 290% a year. No honest investment promises this.' },
            { id: 'risk', snippet: 'zero risk', why: 'Every market investment carries risk. “Zero risk” is a lie.' },
            {
              id: 'institutional',
              snippet: 'institutional account',
              why: 'Fake “institutional” or “VIP” accounts are a known trick: the app shows fake profits, then blocks withdrawals until you pay “tax” or “fees”.',
            },
            { id: 'apk', snippet: 'qtpro-app.apk', why: 'An app file sent over WhatsApp skips the app store. Install only official apps of registered brokers.' },
            { id: 'slots', snippet: 'only 50 slots left today', why: 'Artificial urgency, so you act before you check.' },
          ],
        },
        '404_too_good': {
          kind: 'quiz',
          title: 'Too good to be true?',
          questions: [
            {
              id: 'withdraw',
              q: 'Your “mentor” shows a dashboard with 300% profit, but says you must pay 20% “tax” before you can withdraw. What is going on?',
              options: [
                { label: 'It is a fake app: the profits are just numbers on a screen, and the “tax” is the scam', correct: true },
                { label: 'Normal. Taxes are paid before withdrawing.' },
                { label: 'Pay it quickly before the profits disappear' },
              ],
              explain: 'Real brokers never ask you to pay to release your own money. Stop paying and report it.',
            },
            {
              id: 'tips',
              q: 'An Instagram account gives stock tips for ₹4,999 a month. What should you check first?',
              options: [
                { label: 'Whether they are a SEBI-registered investment adviser or research analyst', correct: true },
                { label: 'How many followers they have' },
                { label: 'Whether their screenshots show profits' },
              ],
              explain: 'Followers and screenshots are easy to fake. Registration is not.',
            },
            {
              id: 'regulator',
              q: 'A “SEBI officer” calls: your demat account is under investigation and you must pay a fine by UPI today.',
              options: [
                { label: 'Hang up. SEBI does not collect fines over calls or UPI. Check sebi.gov.in myself.', correct: true },
                { label: 'Pay quickly to avoid trouble' },
                { label: 'Share my demat details so they can check' },
              ],
              explain: 'Impersonating regulators and the police is a fast-growing scam. Real orders are published on official websites.',
            },
          ],
        },
        '405_switch_sides': {
          kind: 'quiz',
          title: 'Switch sides: build an investment scam',
          intro: 'To spot a scam, learn how one is built. Pick the ingredient a scammer would use.',
          questions: [
            {
              id: 'promise',
              q: 'What do you promise?',
              options: [{ label: '“Guaranteed” high returns with no risk', correct: true }, { label: 'Honest ups and downs' }, { label: 'A long, boring prospectus' }],
              explain: 'Greed switches off caution. Guarantees are the hook.',
            },
            {
              id: 'credible',
              q: 'How do you look credible?',
              options: [
                { label: 'Fake SEBI certificates, celebrity deepfake videos and screenshots of “profits”', correct: true },
                { label: 'Point people to SEBI’s registration list' },
                { label: 'Admit you are not registered' },
              ],
              explain: 'Borrowed authority makes people trust you. That is why you verify on official sites yourself.',
            },
            {
              id: 'rush',
              q: 'How do you stop people asking questions?',
              options: [
                { label: 'Urgency: “only 50 slots”, “offer closes tonight”', correct: true },
                { label: 'Give them a week to think' },
                { label: 'Tell them to ask their family' },
              ],
              explain: 'When you feel rushed, that feeling IS the red flag.',
            },
          ],
        },
        '406_if_it_happens': {
          kind: 'narrative',
          title: 'If it happens to you',
          body: [
            'Act fast. The sooner you report, the better the chance of stopping the money or shares.',
            '1. Stop paying. “Fees” to release your money never end.',
            '2. Call 1930, the national cyber-fraud helpline, or report at cybercrime.gov.in.',
            '3. If someone may have access, ask your broker or DP to freeze your trading or demat account, using the official app or number.',
            '4. If a SEBI-registered broker, DP or adviser is involved, complain to them first, then escalate on SEBI SCORES (scores.sebi.gov.in).',
            '5. Report fake numbers and messages on Sanchar Saathi (Chakshu), and report the group or account on the platform.',
          ],
          callout: 'Being fooled is not foolish. These scams are run by organised groups. Reporting quickly protects you and the next person.',
          help: { links: [{ label: 'Reporting investor fraud', slug: 'report-investor-fraud' }] },
        },
        '407_summary': {
          kind: 'summary',
          title: 'Debrief',
          onEnter: [{ type: 'xp', amount: 40 }],
          points: [
            'Guaranteed returns, “SEBI approved” apps and VIP accounts are scam signatures.',
            'Check registration on SEBI’s site before you pay anyone for advice or tips.',
            'Regulators and police never demand fines or payments over calls, WhatsApp or UPI.',
            'If it happens: stop paying, call 1930, freeze your account, escalate on SCORES. Total lost in this simulation: {{lost}}.',
          ],
        },
      },
    },
  ],
};
