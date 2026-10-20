import type { Module } from '../engine/types';

const MENTOR = 'Kavya, your mentor';

const stipend = {
  type: 'credit',
  account: 'savings',
  amount: 6000,
  description: 'Monthly internship stipend',
  counterparty: 'Brightleaf Studio',
} as const;

const livingCosts = {
  type: 'debit',
  account: 'savings',
  amount: 4500,
  description: 'Rent share, food & travel',
  counterparty: 'Living costs',
} as const;

export const basics: Module = {
  id: 'm1_basics',
  title: 'Market Basics',
  tagline: 'What a share is, where it lives, and why time matters.',
  chapters: [
    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch01_shares',
      moduleId: 'm1_basics',
      title: 'What Is a Share?',
      blurb: 'From a chai stall to the stock exchange: what it really means to own part of a company.',
      screenSequence: ['101_chai', '102_lend_or_own', '103_sort', '104_price_lab', '105_market', '106_quiz', '107_summary'],
      screens: {
        '101_chai': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Your friend’s chai stall',
          body: [
            'Your school friend Arjun runs a chai stall near the station. It is always busy, and he wants ₹1,00,000 to open a second one.',
            'He can raise it in two ways: borrow it, or sell a part of his business. Selling a part of the business is exactly what companies do on the stock market.',
          ],
          help: { reflection: 'Before reading on: would you rather lend to Arjun or own part of his stall? Why?' },
        },
        '102_lend_or_own': {
          kind: 'decision',
          title: 'Lend or own?',
          prompt: 'Arjun asks if you want to put in ₹10,000. Which deal do you take?',
          saveAs: 'm1_lend_or_own',
          options: [
            {
              id: 'lend',
              label: 'Lend it: he repays ₹11,000 in a year',
              tone: 'neutral',
              outcome:
                'You are a lender. You get a fixed amount back whether the stalls boom or struggle, unless Arjun cannot pay at all. Bonds and fixed deposits work like this.',
              effects: [{ type: 'xp', amount: 10 }],
            },
            {
              id: 'own',
              label: 'Buy 10% of the business',
              tone: 'neutral',
              outcome:
                'You are now an owner: a shareholder. If the stalls earn more, your 10% is worth more. If they struggle, it is worth less. Nothing is guaranteed. That is what owning a share means.',
              effects: [{ type: 'xp', amount: 10 }],
            },
            {
              id: 'neither',
              label: 'Keep my money',
              tone: 'neutral',
              outcome:
                'Fair. Walking away is always allowed, and you should never invest money you might need soon.',
              effects: [{ type: 'xp', amount: 10 }],
            },
          ],
          help: { reflection: 'There is no right answer here. Each choice trades safety, control and possible reward differently.' },
        },
        '103_sort': {
          kind: 'sort',
          title: 'Lender or owner?',
          intro: 'Whichever you chose, here is the difference. Who does each of these describe?',
          buckets: [
            { id: 'lender', label: 'Lender' },
            { id: 'owner', label: 'Owner (shareholder)' },
          ],
          items: [
            { id: 'fixed', label: 'Gets back a fixed amount agreed in advance', bucket: 'lender', why: 'A loan has fixed repayments. Bonds and fixed deposits work like this.' },
            { id: 'grows', label: 'Gains when the business grows', bucket: 'owner', why: 'Owners share in the growth. A lender gets the same amount either way.' },
            { id: 'falls', label: 'Their stake is worth less when profits fall', bucket: 'owner', why: 'Share values move with the business, down as well as up.' },
            { id: 'owed', label: 'Is owed money by the business', bucket: 'lender', why: 'A loan is a debt the business must repay.' },
            { id: 'dividend', label: 'May receive part of the profits as dividends', bucket: 'owner', why: 'Companies can pay part of their profits to shareholders. They are not guaranteed.' },
          ],
        },
        '104_price_lab': {
          kind: 'custom',
          component: 'priceLab',
          title: 'Why do prices move?',
          intro: 'Arjun’s business grows into Kettle & Co., listed on a stock exchange. Fire off some news and watch buyers and sellers move the price.',
        },
        '105_market': {
          kind: 'narrative',
          title: 'From chai stall to stock exchange',
          body: [
            'Companies sell small slices of themselves, called shares, to the public. Those shares are then bought and sold on a stock exchange. In India, the main ones are the NSE and the BSE.',
            'As you just saw, prices move because buyers and sellers keep changing their minds: profits, news, the economy, rumours and plain emotion.',
            'SEBI, the Securities and Exchange Board of India, is the regulator. It makes the rules and registers the brokers, advisers and other firms you deal with.',
          ],
          callout: 'Owning a share means owning a tiny part of a company. Its value can rise or fall, and nobody can honestly guarantee which.',
          help: { links: [{ label: 'What is a share?', slug: 'what-is-a-share' }] },
        },
        '106_quiz': {
          kind: 'quiz',
          title: 'Quick check',
          questions: [
            {
              id: 'owner',
              q: 'If you own shares in a company, you are…',
              options: [{ label: 'A part-owner of it', correct: true }, { label: 'A lender to it' }, { label: 'An employee of it' }],
              explain: 'Shares are ownership. Lenders hold loans or bonds; owners hold shares.',
            },
            {
              id: 'price',
              q: 'Why do share prices go up and down?',
              options: [
                { label: 'Buyers and sellers keep changing their view of what the company is worth', correct: true },
                { label: 'SEBI sets the price every morning' },
                { label: 'The company picks a new price each day' },
              ],
              explain: 'Prices come from trading between buyers and sellers. SEBI regulates the market; it does not set prices.',
            },
            {
              id: 'sure',
              q: 'Someone says a share is “sure to double by next month”. That is…',
              options: [
                { label: 'Insider knowledge worth acting on' },
                { label: 'A promise nobody can honestly make', correct: true },
                { label: 'Normal stock market advice' },
              ],
              explain:
                'Nobody can guarantee share prices. “Sure-shot” tips are a warning sign, and giving paid investment advice without SEBI registration is not allowed.',
            },
          ],
        },
        '107_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'A share is a small piece of ownership in a company.',
            'Prices move because buyers and sellers keep changing their minds. Nothing about them is guaranteed.',
            'SEBI regulates the market and registers the firms you deal with.',
            '“Guaranteed” or “sure-shot” returns are a red flag, not an opportunity.',
          ],
        },
      },
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch02_demat',
      moduleId: 'm1_basics',
      title: 'Where Your Shares Live',
      blurb: 'Demat accounts, depositories and DPs, explained without the jargon.',
      screenSequence: ['201_paper', '202_three_accounts', '203_which_account', '204_trade_journey', '205_depository', '206_quiz', '207_summary'],
      screens: {
        '201_paper': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'Remember paper share certificates?',
          body: [
            'Your grandparents may still have a few: thick paper certificates with a company seal. They could be lost, torn, forged or stolen, and selling one took weeks of paperwork.',
            'Since 1996, India has been moving shares into electronic form. Today, the shares you buy are held in a demat (dematerialised) account in your name.',
          ],
          help: { reflection: 'Does anyone in your family still hold paper share certificates? They can be converted into demat form.' },
        },
        '202_three_accounts': {
          kind: 'explore',
          title: 'Three accounts that work together',
          intro: 'To invest in shares, you use three linked accounts. Tap each one to see its job.',
          cards: [
            {
              id: 'bank',
              label: 'Bank account',
              hint: 'Your money',
              body: 'Money to buy shares comes from here. Money from selling, and any dividends, comes back here.',
            },
            {
              id: 'trading',
              label: 'Trading account',
              hint: 'Your orders',
              body: 'Opened with a stockbroker. You use it to place buy and sell orders on the exchange. It does not hold your shares.',
            },
            {
              id: 'demat',
              label: 'Demat account',
              hint: 'Your shares',
              body: 'Holds the shares you own, electronically and in your name, with a depository. You open it through a Depository Participant (DP).',
            },
          ],
          callout: 'Many brokers open the trading and demat accounts together, but they are still two different things.',
        },
        '203_which_account': {
          kind: 'sort',
          title: 'Which account does that?',
          intro: 'Match each job to the account that does it.',
          buckets: [
            { id: 'bank', label: 'Bank' },
            { id: 'trading', label: 'Trading' },
            { id: 'demat', label: 'Demat' },
          ],
          items: [
            { id: 'holds', label: 'Holds your 20 Kettle & Co. shares', bucket: 'demat', why: 'Shares you own sit in your demat account, in your name.' },
            { id: 'buy', label: 'Where you place a “buy” order', bucket: 'trading', why: 'Orders go through your broker’s trading account to the exchange.' },
            { id: 'pays', label: 'Pays for the shares you buy', bucket: 'bank', why: 'The money always starts in your bank account.' },
            { id: 'dividend', label: 'Receives the dividends a company pays you', bucket: 'bank', why: 'Dividends are paid into the bank account linked to your demat account.' },
            { id: 'sell', label: 'Sends your “sell” order to the exchange', bucket: 'trading', why: 'Buying or selling, orders go through the trading account.' },
          ],
        },
        '204_trade_journey': {
          kind: 'order',
          title: 'Follow one purchase',
          intro: 'You buy 20 shares of Kettle & Co. Put the steps in the order they happen.',
          steps: [
            { id: 'order', label: 'You place a buy order in your trading account', detail: 'In your broker’s app, for a quantity and a price.' },
            { id: 'match', label: 'The exchange matches you with a seller', detail: 'Someone selling at that price takes the other side.' },
            { id: 'pay', label: 'You pay for the shares', detail: 'Money you added from your bank goes to the seller through the clearing system.' },
            { id: 'credit', label: 'Shares are credited to your demat account', detail: 'The depository records you as the new owner, usually by the next working day.' },
            { id: 'cas', label: 'The purchase shows up in your CAS', detail: 'Your next statement from the depository lists it.' },
          ],
        },
        '205_depository': {
          kind: 'narrative',
          title: 'Who keeps the record?',
          body: [
            'Your demat account is held with a depository. India has two: CDSL (Central Depository Services (India) Ltd) and NSDL (National Securities Depository Ltd). They keep the official record of who owns which shares.',
            'You do not open an account with the depository directly. You go through a Depository Participant (DP): a SEBI-registered broker, bank or financial firm that acts as the depository’s agent.',
            'The depositories also send you a Consolidated Account Statement (CAS): one statement of all your holdings across demat accounts and mutual funds, linked to your PAN. You get one for every month with transactions, and at least every six months otherwise.',
          ],
          callout: 'Your broker’s app shows you what the broker thinks you hold. Your CAS comes straight from the depository.',
          help: { links: [{ label: 'Demat accounts and depositories', slug: 'demat-and-depositories' }] },
        },
        '206_quiz': {
          kind: 'quiz',
          title: 'Quick check',
          questions: [
            {
              id: 'where',
              q: 'Where are the shares you own actually held?',
              options: [{ label: 'In my demat account', correct: true }, { label: 'In my trading account' }, { label: 'In my bank account' }],
              explain: 'The trading account places orders; the demat account holds the shares; the bank account holds the money.',
            },
            {
              id: 'dp',
              q: 'What does a Depository Participant (DP) do?',
              options: [
                { label: 'It is the SEBI-registered firm through which you open and run your demat account', correct: true },
                { label: 'It picks which shares you should buy' },
                { label: 'It guarantees your returns' },
              ],
              explain: 'A DP is your gateway to the depository. It does not advise you or guarantee anything.',
            },
            {
              id: 'cas',
              q: 'Which document shows all your holdings, straight from the depositories?',
              options: [
                { label: 'The Consolidated Account Statement (CAS)', correct: true },
                { label: 'A screenshot from a tips group' },
                { label: 'My bank passbook' },
              ],
              explain: 'The CAS covers every demat account and mutual fund linked to your PAN. It is your independent check.',
            },
          ],
        },
        '207_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Bank account for money, trading account for orders, demat account for shares.',
            'CDSL and NSDL are India’s depositories; they keep the official ownership record.',
            'You reach them through a SEBI-registered Depository Participant (DP).',
            'Your CAS is the source of truth. Check it whenever it arrives.',
          ],
        },
      },
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch03_compounding',
      moduleId: 'm1_basics',
      title: 'The Quiet Multiplier',
      blurb: 'Before any shares: build a cushion, automate saving and let time do the work.',
      screenSequence: ['301_savings', '302_lab', '303_rd_decision', '304_three_months', '305_compounding', '306_summary'],
      screens: {
        '301_savings': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'You have saved ₹20,000',
          onEnter: [
            { type: 'credit', account: 'savings', amount: 20000, description: 'Savings from internship stipends', counterparty: 'Brightleaf Studio' },
            { type: 'message', thread: 'MOM', from: 'Mom', text: '₹20,000 saved! So proud of you. Keep some aside for emergencies, okay? ❤️' },
          ],
          body: [
            'Six months of internship stipends later, you have {{savings}} in your Nimbus Bank savings account. Open the Bank app on your phone to see it.',
            '“Before you buy a single share,” Kavya says, “build a cushion for emergencies and a saving habit. Then let the most powerful force in personal finance work for you: time.”',
          ],
          help: { reflection: 'Watch the panel on the right. It tracks your money, the date and your financial health score.' },
        },
        '302_lab': {
          kind: 'custom',
          component: 'compoundLab',
          title: 'Play with time',
          intro: 'Compounding means your growth starts earning growth of its own. Move the sliders, especially the years, and watch what happens.',
          help: { links: [{ label: 'How compounding works', slug: 'compounding' }] },
        },
        '303_rd_decision': {
          kind: 'decision',
          title: 'Pay yourself first',
          prompt:
            'Kavya suggests a Recurring Deposit (RD): a fixed amount moves out of savings automatically every month and earns interest (6.5% a year here). How much do you set aside?',
          saveAs: 'm1_rd_choice',
          options: [
            {
              id: 'none',
              label: 'Nothing for now. I will save whatever is left.',
              tone: 'neutral',
              outcome: 'Saving “whatever is left” usually means saving nothing. Life has a way of filling every gap.',
            },
            {
              id: 'small',
              label: '₹1,000 a month for 6 months',
              tone: 'good',
              outcome: 'Small and steady. You will barely feel it, and that is exactly the point.',
              effects: [
                { type: 'startRd', label: 'RD ₹1,000/month', amount: 1000, annualRate: 0.065, months: 6 },
                { type: 'xp', amount: 20 },
              ],
            },
            {
              id: 'big',
              label: '₹4,000 a month for 6 months',
              tone: 'neutral',
              outcome: 'Ambitious! Just make sure your savings can always cover it. A failed auto-debit can mean a bounce charge.',
              effects: [
                { type: 'startRd', label: 'RD ₹4,000/month', amount: 4000, annualRate: 0.065, months: 6 },
                { type: 'xp', amount: 10 },
              ],
            },
          ],
          help: { links: [{ label: 'How compounding works', slug: 'compounding' }] },
        },
        '304_three_months': {
          kind: 'narrative',
          title: 'Three months later',
          onEnter: [
            { type: 'advanceDays', days: 30 },
            stipend,
            livingCosts,
            { type: 'advanceDays', days: 30 },
            stipend,
            livingCosts,
            { type: 'advanceDays', days: 30 },
            stipend,
            livingCosts,
          ],
          body: [
            'It is now {{date}}. Three stipends in, three months of rent, food and travel out.',
            'Savings: {{savings}}. Recurring deposit: {{rd}}. Net worth: {{networth}}.',
            'Open the Bank app to see every auto-debit and interest credit in your statement.',
          ],
        },
        '305_compounding': {
          kind: 'quiz',
          title: 'Time is the secret ingredient',
          onEnter: [{ type: 'unlockApp', app: 'calculator' }],
          intro: 'You have a new Calculator app on your phone. Use it if you like.',
          questions: [
            {
              id: 'fv',
              q: 'You save ₹1,000 a month at 6.5% a year. After 5 years, roughly how much will you have?',
              options: [
                { label: '₹60,000, exactly what I put in' },
                { label: 'About ₹70,000: deposits plus interest on interest', correct: true },
                { label: '₹1,20,000' },
              ],
              explain: 'You put in ₹60,000; compounding adds roughly ₹10,000 more. The longer you leave it, the faster that extra grows.',
            },
            {
              id: 'early',
              q: 'Asha starts saving ₹2,000 a month at 22. Ravi starts the same at 32. Both stop at 60. Who ends up with more?',
              options: [
                { label: 'Ravi, because he will be earning more by then' },
                { label: 'Asha: ten extra years of compounding are very hard to catch up', correct: true },
                { label: 'They end up the same' },
              ],
              explain: 'Time matters more than amount. Starting early beats starting big.',
            },
            {
              id: 'guaranteed',
              q: 'An app promises “guaranteed 5% returns every month”. What should you think?',
              options: [
                { label: 'Great deal, sign up quickly' },
                { label: 'That is 60%+ a year, “guaranteed”. A classic fraud signal.', correct: true },
                { label: 'Normal for the stock market' },
              ],
              explain: 'No legitimate investment guarantees high returns. Promises like this are the hallmark of Ponzi and investment scams.',
            },
          ],
          help: { links: [{ label: 'How compounding works', slug: 'compounding' }] },
        },
        '306_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Build an emergency cushion before you invest.',
            'Pay yourself first: automate saving before you get the chance to spend it. Your RD: {{rd}}.',
            'Compounding needs time more than money. Start early.',
            '“Guaranteed” high returns are a warning sign, not an opportunity.',
          ],
        },
      },
    },
  ],
};
