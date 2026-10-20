import type { Module } from '../engine/types';

const MENTOR = 'Kavya, your mentor';

const PHISHING_SMS =
  'Dear Customer, your Nimbus Bank KYC EXPIRES TODAY. Account will be BLOCKED in 2 hrs. Update now: nimbus-kyc-verify.co/update or call 98XXXXXX21';

const VISHING_CALL =
  '"Hello, this is Rahul from the Nimbus Bank fraud team. We have stopped a suspicious ₹24,000 transaction on your card. To reverse it, please read back the OTP I am sending you. Hurry, or the money is gone."';

const livingCosts = {
  type: 'debit',
  account: 'savings',
  amount: 4500,
  description: 'Rent share, food & travel',
  counterparty: 'Living costs',
} as const;

const stipend = {
  type: 'credit',
  account: 'savings',
  amount: 6000,
  description: 'Monthly internship stipend',
  counterparty: 'Brightleaf Studio',
} as const;

export const banking: Module = {
  id: 'm1_banking',
  title: 'Banking',
  tagline: 'Hold it, grow it, protect it.',
  chapters: [
    // ── Chapter 1 ────────────────────────────────────────────────────────────
    {
      id: 'ch01_account_opening',
      moduleId: 'm1_banking',
      title: 'Your First Account',
      blurb: 'Turn an envelope of cash into a bank account — and learn what KYC is really for.',
      screenSequence: ['110_start', '111_cash_decision', '112_kyc', '113_account_active', '114_check_app', '115_summary'],
      screens: {
        '110_start': {
          kind: 'narrative',
          speaker: MENTOR,
          title: 'You just got ₹12,000',
          onEnter: [
            { type: 'credit', account: 'cash', amount: 12000, description: 'Scholarship (cash)', counterparty: 'College' },
          ],
          body: [
            'You have won a ₹12,000 college scholarship — paid in cash, in an envelope.',
            'It is the most money you have ever held. Where it goes next is your first real money decision.',
          ],
          callout: 'Cash in hand: {{cash}}',
          help: { reflection: 'Watch the panel on the right. It tracks your money, the date and your health score.' },
        },
        '111_cash_decision': {
          kind: 'decision',
          title: 'The envelope',
          prompt: 'What do you do with the envelope?',
          saveAs: 'ch01_cash_choice',
          options: [
            {
              id: 'home',
              label: 'Keep it at home in a drawer',
              detail: 'Easy to reach, no paperwork.',
              tone: 'bad',
              outcome:
                'Cash at home earns nothing, can be lost or stolen, and is easy to spend on impulse. By the end of the week ₹1,500 of it has quietly gone on snacks and rides.',
              effects: [
                { type: 'debit', account: 'cash', amount: 1500, description: 'Small impulse spends', counterparty: 'Various' },
              ],
            },
            {
              id: 'relative',
              label: 'Give it to a relative to keep safe',
              detail: 'Someone you trust holds it.',
              tone: 'neutral',
              outcome:
                'Your aunt keeps it safe — but you have to ask every time you need it, there is no record, and it still earns nothing. Trust is not the same as a system.',
            },
            {
              id: 'bank',
              label: 'Open a savings account',
              detail: 'Some paperwork, but it is yours.',
              tone: 'good',
              outcome:
                'A bank account keeps money safe, earns a little interest and records every rupee in and out. Kavya offers to take you to the branch.',
              effects: [{ type: 'xp', amount: 20 }],
            },
          ],
          help: { reflection: 'There is no wrong choice here — only consequences.', links: [{ label: 'Why banks exist', slug: 'why-banks-exist' }] },
        },
        '112_kyc': {
          kind: 'quiz',
          title: 'KYC: proving you are you',
          intro:
            'Whatever you chose, Kavya convinces you to open an account. First, the bank must verify who you are. This is KYC — Know Your Customer.',
          questions: [
            {
              id: 'docs',
              q: 'Which documents are commonly used for KYC in India?',
              options: [
                { label: 'PAN card and Aadhaar', correct: true },
                { label: 'Only your college ID' },
                { label: 'A selfie and your phone number' },
              ],
              explain: 'PAN and Aadhaar (or another officially valid document) are the usual pair. A college ID alone is not enough.',
            },
            {
              id: 'why',
              q: 'Why does the bank need KYC at all?',
              options: [
                { label: 'To stop accounts being opened in fake names and used for fraud', correct: true },
                { label: 'To sell your details to advertisers' },
                { label: 'It is optional paperwork' },
              ],
              explain: 'KYC makes it hard to open "mule" accounts in fake names — the accounts scammers use to receive stolen money.',
            },
            {
              id: 'never',
              q: 'Which of these should you NEVER share — even with someone who says they are bank staff?',
              options: [
                { label: 'Your name' },
                { label: 'Your OTP, PIN or password', correct: true },
                { label: 'Which city your branch is in' },
              ],
              explain: 'No genuine bank employee will ever ask for your OTP, PIN or password. Not on the phone, not by SMS, not in person.',
            },
          ],
          help: { links: [{ label: 'KYC basics', slug: 'kyc-basics' }] },
        },
        '113_account_active': {
          kind: 'narrative',
          title: 'Account open',
          onEnter: [
            { type: 'transfer', from: 'cash', to: 'savings', amount: 'all', description: 'Cash deposit at branch' },
            { type: 'unlockApp', app: 'bank' },
            {
              type: 'message',
              thread: 'NB-NIMBUS',
              from: 'NB-NIMBUS',
              text: 'Welcome to Nimbus Bank! Your savings account XX4417 is now active. Nimbus Bank will NEVER ask for your OTP, PIN or password.',
            },
            { type: 'xp', amount: 20 },
          ],
          body: [
            'Twenty minutes of forms later, your savings account is open and your cash is deposited.',
            'Savings balance: {{savings}}. Cash in hand: {{cash}}.',
            'You have a new message — and a banking app on your phone.',
          ],
        },
        '114_check_app': {
          kind: 'phoneTask',
          title: 'Check your balance',
          body: ['Open your phone (bottom-right) and launch the Bank app. Find your balance and your first transaction.'],
          app: 'bank',
          doneFlag: 'bank_opened',
          doneText: 'Every rupee in and out now leaves a record. Your statement is your first defence against fraud.',
        },
        '115_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Cash earns nothing and is easy to lose; a bank account keeps money safe and traceable.',
            'KYC exists to stop fake accounts and fraud — PAN and Aadhaar are the usual documents.',
            'Nobody genuine will ever ask for your OTP, PIN or password.',
            'Savings now: {{savings}}.',
          ],
        },
      },
    },

    // ── Chapter 2 ────────────────────────────────────────────────────────────
    {
      id: 'ch02_first_month',
      moduleId: 'm1_banking',
      title: 'Pay Yourself First',
      blurb: 'Your stipend arrives. Automate saving and watch time do the work.',
      screenSequence: ['201_time_jump', '202_rd_decision', '203_three_months', '204_compounding', '205_summary'],
      screens: {
        '201_time_jump': {
          kind: 'narrative',
          title: 'One month later',
          onEnter: [
            { type: 'advanceDays', days: 30 },
            stipend,
            { type: 'message', thread: 'MOM', from: 'Mom', text: 'First stipend! So proud of you. Put a little aside every month, okay? ❤️' },
          ],
          speaker: MENTOR,
          body: [
            'It is {{date}}. Your internship stipend of ₹6,000 has just landed.',
            'Savings: {{savings}}. Kavya asks: "So what is the plan for the next six months?"',
          ],
        },
        '202_rd_decision': {
          kind: 'decision',
          title: 'Pay yourself first',
          prompt:
            'Kavya suggests a Recurring Deposit (RD): a fixed amount moves out of savings automatically every month and earns interest (6.5% a year here). How much do you set aside?',
          saveAs: 'ch02_rd_choice',
          options: [
            {
              id: 'none',
              label: 'Nothing for now — I will save whatever is left',
              tone: 'neutral',
              outcome: 'Saving "whatever is left" usually means saving nothing. Life has a way of filling every gap.',
            },
            {
              id: 'small',
              label: '₹1,000 a month for 6 months',
              tone: 'good',
              outcome: 'Small and steady. You will barely feel it — and that is exactly the point.',
              effects: [
                { type: 'startRd', label: 'RD ₹1,000/month', amount: 1000, annualRate: 0.065, months: 6 },
                { type: 'xp', amount: 20 },
              ],
            },
            {
              id: 'big',
              label: '₹4,000 a month for 6 months',
              tone: 'neutral',
              outcome:
                'Ambitious! Just make sure your savings can always cover it — a failed auto-debit can mean a bounce charge.',
              effects: [
                { type: 'startRd', label: 'RD ₹4,000/month', amount: 4000, annualRate: 0.065, months: 6 },
                { type: 'xp', amount: 10 },
              ],
            },
          ],
          help: { links: [{ label: 'How compounding works', slug: 'compounding' }] },
        },
        '203_three_months': {
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
        '204_compounding': {
          kind: 'quiz',
          title: 'Time is the secret ingredient',
          onEnter: [{ type: 'unlockApp', app: 'calculator' }],
          intro: 'You have a new Calculator app on your phone. Use it if you like.',
          questions: [
            {
              id: 'fv',
              q: 'You save ₹1,000 a month at 6.5% a year. After 5 years, roughly how much will you have?',
              options: [
                { label: '₹60,000 — exactly what I put in' },
                { label: 'About ₹70,000 — deposits plus interest on interest', correct: true },
                { label: '₹1,20,000' },
              ],
              explain: 'You put in ₹60,000; compounding adds roughly ₹10,000 more. The longer you leave it, the faster that extra grows.',
            },
            {
              id: 'early',
              q: 'Asha starts saving ₹2,000 a month at 22. Ravi starts the same at 32. Both stop at 60. Who ends up with more?',
              options: [
                { label: 'Ravi — he will be earning more by then' },
                { label: 'Asha — ten extra years of compounding are very hard to catch up', correct: true },
                { label: 'They end up the same' },
              ],
              explain: 'Time matters more than amount. Starting early beats starting big.',
            },
            {
              id: 'guaranteed',
              q: 'An app promises "guaranteed 5% returns every month". What should you think?',
              options: [
                { label: 'Great deal — sign up quickly' },
                { label: 'That is 60%+ a year, "guaranteed". Classic fraud signal.', correct: true },
                { label: 'Normal for the stock market' },
              ],
              explain: 'No legitimate investment guarantees high returns. Promises like this are the hallmark of Ponzi and investment scams.',
            },
          ],
          help: { links: [{ label: 'How compounding works', slug: 'compounding' }] },
        },
        '205_summary': {
          kind: 'summary',
          title: 'Chapter recap',
          onEnter: [{ type: 'xp', amount: 30 }],
          points: [
            'Pay yourself first: automate saving before you get the chance to spend it.',
            'A recurring deposit turns a small monthly habit into a growing balance. Yours: {{rd}}.',
            'Compounding needs time more than money — start early.',
            '"Guaranteed" high returns are a warning sign, not an opportunity.',
          ],
        },
      },
    },

    // ── Chapter 3 ────────────────────────────────────────────────────────────
    {
      id: 'ch03_scam_radar',
      moduleId: 'm1_banking',
      title: 'Scam Radar',
      blurb: 'Real scam tactics, zero real losses. Get fooled here so you do not get fooled out there.',
      screenSequence: [
        '301_calm',
        '302_inbox',
        '303_phishing_decision',
        '304_phishing_autopsy',
        '305_vishing_decision',
        '306_vishing_autopsy',
        '307_switch_sides',
        '308_if_it_happens',
        '309_summary',
      ],
      screens: {
        '301_calm': {
          kind: 'narrative',
          title: 'An ordinary Tuesday',
          speaker: MENTOR,
          body: [
            'It is {{date}}. Savings: {{savings}}. Life is calm.',
            '"Fraudsters rarely hack banks," Kavya says. "They hack people — with urgency, fear, authority and greed. This week, they will come for you."',
          ],
          help: { links: [{ label: 'Never share an OTP', slug: 'otp-never-share' }] },
        },
        '302_inbox': {
          kind: 'phoneTask',
          title: 'A new message',
          onEnter: [{ type: 'message', thread: 'NB-NIMBSS', from: 'NB-NIMBSS', text: PHISHING_SMS, suspicious: true }],
          body: ['Your phone buzzes. Open Messages and read what just arrived.'],
          app: 'messages',
          doneFlag: 'read:NB-NIMBSS',
          doneText: 'Read it? Hold that thought.',
        },
        '303_phishing_decision': {
          kind: 'decision',
          title: 'Two hours to act',
          prompt: 'The message says your account will be blocked in 2 hours. What do you do?',
          saveAs: 'ch03_phishing',
          options: [
            {
              id: 'click',
              label: 'Tap the link and update my KYC',
              tone: 'bad',
              outcome:
                'The page looked exactly like Nimbus Bank. You entered your login and the OTP that arrived. Minutes later, ₹4,000 left your account. You have been phished.',
              effects: [{ type: 'scamLoss', amount: 4000, description: 'UPI transfer — unknown payee' }],
            },
            {
              id: 'call',
              label: 'Call the number in the message',
              tone: 'bad',
              outcome:
                'A polite "bank officer" walked you through "verification" and asked for the OTP. You read it out. ₹4,000 gone. A number inside a suspicious message leads straight to the scammer.',
              effects: [{ type: 'scamLoss', amount: 4000, description: 'UPI transfer — unknown payee' }],
            },
            {
              id: 'verify',
              label: 'Ignore it, and check the official app myself',
              tone: 'good',
              outcome:
                'Your official Bank app shows no KYC problem. The message was fake. You report it on the government\'s Sanchar Saathi portal (Chakshu) and delete it. Nothing lost.',
              effects: [{ type: 'xp', amount: 40 }],
            },
          ],
        },
        '304_phishing_autopsy': {
          kind: 'autopsy',
          title: 'Autopsy: the KYC message',
          intro: 'Tap every part of the message that should have set off alarms.',
          artifact: { channel: 'sms', from: 'NB-NIMBSS', text: PHISHING_SMS },
          flags: [
            { id: 'sender', snippet: 'NIMBSS', why: 'The sender ID is one letter off the real "NB-NIMBUS". Lookalike senders are common.' },
            { id: 'urgency', snippet: 'EXPIRES TODAY', why: 'Urgency. Rushing you stops you from thinking or checking.' },
            { id: 'threat', snippet: 'BLOCKED in 2 hrs', why: 'Fear. A threat to your money makes you act before you verify.' },
            {
              id: 'link',
              snippet: 'nimbus-kyc-verify.co/update',
              why: 'A lookalike web address that is not the bank\'s official site. Banks do not send KYC links by SMS.',
            },
            {
              id: 'number',
              snippet: 'call 98XXXXXX21',
              why: 'A personal mobile number. Only ever call the number printed on your card or the bank\'s official website.',
            },
          ],
        },
        '305_vishing_decision': {
          kind: 'decision',
          title: 'The phone call',
          prompt: `Two days later your phone rings. ${VISHING_CALL} An SMS arrives with an OTP that says "Do not share this with anyone".`,
          saveAs: 'ch03_vishing',
          options: [
            {
              id: 'share',
              label: 'Read out the OTP — he already knows my name and card number ending',
              tone: 'bad',
              outcome:
                'Knowing your name and the last four digits proves nothing; that data leaks all the time. The OTP did not reverse anything — it authorised a ₹3,000 payment. Gone.',
              effects: [{ type: 'scamLoss', amount: 3000, description: 'Card payment — unknown merchant' }],
            },
            {
              id: 'ask',
              label: 'Ask him to prove he is from the bank',
              tone: 'neutral',
              outcome:
                'He quotes an "employee ID" and gets impatient. Proof offered by the caller is still only the caller\'s word. Safer: hang up and call the bank yourself.',
            },
            {
              id: 'hangup',
              label: 'Hang up and call the number on the back of my card',
              tone: 'good',
              outcome: 'The real bank confirms there was no suspicious transaction. You just beat a vishing (voice phishing) call.',
              effects: [{ type: 'xp', amount: 40 }],
            },
          ],
        },
        '306_vishing_autopsy': {
          kind: 'autopsy',
          title: 'Autopsy: the call',
          intro: 'Tap every line of the call that was a manipulation tactic.',
          artifact: { channel: 'call', from: 'Unknown number +91 98XXXXXX07', text: VISHING_CALL },
          flags: [
            {
              id: 'caller',
              snippet: '+91 98XXXXXX07',
              why: 'A personal mobile number — and even an official-looking caller ID can be faked. Always call back on a number you looked up yourself.',
            },
            { id: 'authority', snippet: 'Nimbus Bank fraud team', why: 'Authority. Claiming to be the bank\'s fraud team makes you trust them and comply.' },
            { id: 'fear', snippet: 'suspicious ₹24,000 transaction', why: 'Fear. A big scary number pushes you to act fast.' },
            {
              id: 'otp',
              snippet: 'read back the OTP',
              why: 'The real ask. An OTP authorises money LEAVING your account — it never reverses a payment.',
            },
            { id: 'hurry', snippet: 'Hurry', why: 'Urgency again. Genuine banks give you time to call back.' },
          ],
        },
        '307_switch_sides': {
          kind: 'quiz',
          title: 'Switch sides: think like a scammer',
          intro: 'To spot a scam, learn how one is built. You are writing a fraud message. Pick the ingredient that works best.',
          questions: [
            {
              id: 'hook',
              q: 'Which opening gets people to act without thinking?',
              options: [
                { label: '"Your account will be blocked in 1 hour"', correct: true },
                { label: '"Please visit your branch at your convenience"' },
                { label: '"Here is your monthly statement"' },
              ],
              explain: 'Urgency shuts down careful thinking. When a message rushes you, slow down.',
            },
            {
              id: 'who',
              q: 'Who should the message pretend to be from?',
              options: [
                { label: 'A random stranger' },
                { label: 'A bank, a regulator, the police or the tax department', correct: true },
                { label: 'Nobody in particular' },
              ],
              explain: 'Pretending to be an authority makes people obey. Real authorities do not demand OTPs or payments over SMS, WhatsApp or calls.',
            },
            {
              id: 'ask',
              q: 'What do you finally ask the victim for?',
              options: [
                { label: 'Their favourite colour' },
                { label: 'An OTP, a UPI PIN, or to scan a QR code to "receive" money', correct: true },
                { label: 'Feedback on the message' },
              ],
              explain: 'OTPs, PINs and QR scans authorise money LEAVING your account. You never need a PIN or a QR scan to receive money.',
            },
          ],
        },
        '308_if_it_happens': {
          kind: 'narrative',
          title: 'If it happens to you',
          body: [
            'Act fast. The first hour after a fraud — the "golden hour" — gives the best chance of stopping the money.',
            '1. Call 1930, the national cyber-fraud helpline, or report at cybercrime.gov.in.',
            '2. Call your bank on its official number to block your card, UPI and net banking.',
            '3. Change your passwords and PINs, and log out of devices you do not recognise.',
            '4. Report the fake number or message on the Sanchar Saathi portal (Chakshu).',
            '5. Keep evidence: screenshots, transaction IDs and the caller\'s number.',
          ],
          callout:
            'Being scammed is not stupidity — these tactics are designed by professionals. Reporting quickly protects you and the next person.',
          help: { links: [{ label: 'Reporting cyber fraud', slug: 'report-cyber-fraud' }] },
        },
        '309_summary': {
          kind: 'summary',
          title: 'Debrief',
          onEnter: [{ type: 'xp', amount: 40 }],
          points: [
            'Scammers use urgency, fear, authority and greed. The feeling of being rushed IS the red flag.',
            'Never act on links or numbers inside a suspicious message; use the official app or the number on your card.',
            'No genuine bank, regulator or police officer will ever ask for your OTP, PIN or password.',
            'Total lost to scams in this simulation: {{lost}}.',
          ],
        },
      },
    },
  ],
};
