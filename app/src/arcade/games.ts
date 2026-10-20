import type { ArcadeGame } from './types';

// All names, numbers, companies and apps below are fictional.

const OFFICER = 'Insp. Vikram Rathore';
const CALLER = 'Caller';
const ADMIN = 'Prof. A. Sharma (Admin)';

const digitalArrest: ArcadeGame = {
  kind: 'chat',
  id: 'digital-arrest',
  title: 'The Digital Arrest',
  tagline: 'A “police officer” on video says you are under arrest. Can you get off the call?',
  audiences: ['Senior citizens', 'Students', 'First-time investors'],
  minutes: 3,
  tone: 'coral',
  icon: 'video',
  channel: 'video',
  contact: { name: 'Cyber Crime Branch', detail: 'WhatsApp video call · unknown number' },
  start: 'start',
  nodes: {
    start: {
      lines: [
        { from: 'system', text: 'Incoming WhatsApp video call. A man in police uniform sits in an office with a national emblem on the wall behind him.' },
        {
          from: OFFICER,
          text: 'Good afternoon. Inspector Vikram Rathore, Cyber Crime Branch. A parcel booked with your Aadhaar number has been seized at Mumbai airport. It contains fake passports and drugs.',
        },
        { from: OFFICER, text: 'Your Aadhaar is also linked to a bank account used for money laundering. A case has been filed against you.' },
      ],
      choices: [
        {
          label: 'That is impossible! I never sent any parcel.',
          next: 'deny',
          points: -5,
          note: 'Arguing keeps you on the call, and staying on the call is what they want.',
        },
        {
          label: 'Which police station? I will come there in person.',
          next: 'inperson',
          points: 0,
          note: 'Good instinct: real police work happens at a station, with paperwork, not on WhatsApp.',
        },
        {
          label: 'Hang up and call 1930 myself.',
          next: 'safe_early',
          points: 0,
          note: 'Best move. There is no such thing as a “digital arrest” in Indian law.',
        },
      ],
    },
    deny: {
      lines: [
        { from: OFFICER, text: 'Everybody says that. Maybe your identity was misused. Then you must cooperate to prove your innocence.' },
        {
          from: OFFICER,
          text: 'This is a matter of national security. You are under DIGITAL ARREST. Do not disconnect. Do not tell anyone, not even your family. Keep your camera on.',
        },
      ],
      choices: [
        { label: 'Okay. I will stay on the call.', next: 'stay', points: -20, note: '“Tell no one” isolates you, so nobody can tell you it is a scam.' },
        { label: 'Wait, I will call my son first.', next: 'family', points: 0, note: 'Talking to someone you trust breaks the spell. Scammers fear this most.' },
        { label: 'Disconnect and call 1930.', next: 'safe', points: 0, note: 'Right. You never need permission to end a call.' },
      ],
    },
    inperson: {
      lines: [
        { from: OFFICER, text: 'No time for that. If you disconnect, a non-bailable warrant will be issued and police will reach your home in 2 hours.' },
        { from: OFFICER, text: 'From this moment you are under DIGITAL ARREST. Stay on camera. Tell no one.' },
      ],
      choices: [
        { label: 'Okay. I will stay on the call.', next: 'stay', points: -20, note: 'Threats of instant arrest are designed to freeze you. Real police do not work this way.' },
        { label: 'Wait, I will call my son first.', next: 'family', points: 0, note: 'Talking to someone you trust breaks the spell.' },
        { label: 'Disconnect and call 1930.', next: 'safe', points: 0, note: 'Right. You never need permission to end a call.' },
      ],
    },
    family: {
      lines: [{ from: OFFICER, text: '(shouting) If you tell anyone, they will also be arrested as accomplices! This case is CONFIDENTIAL!' }],
      choices: [
        { label: 'I am scared. I will stay quiet.', next: 'stay', points: -15, note: 'Fear of putting family in danger is a deliberate tactic.' },
        { label: 'Hang up and call my son anyway.', next: 'safe', points: 0, note: 'Exactly. The louder the threat, the more sure you can be it is fake.' },
      ],
    },
    stay: {
      lines: [
        { from: 'system', text: 'Two hours pass. A “senior CBI officer” joins the call and shows you an “arrest warrant” with stamps and signatures.' },
        {
          from: 'Senior officer',
          text: 'To prove your innocence, transfer your savings to an RBI-verified safe account for checking. It will be returned within 24 hours after clearance.',
        },
      ],
      choices: [
        { label: 'Transfer ₹6,50,000 from my fixed deposits.', next: 'lost', points: -60, note: 'No agency ever asks you to move money to a “safe” or “verification” account.' },
        { label: 'Ask them to send the warrant to my local police station.', next: 'push', points: 0, note: 'Good: you are moving things to a channel you control.' },
        { label: 'End the call and dial 1930.', next: 'safe_late', points: 0, note: 'Late, but right.' },
      ],
    },
    push: {
      lines: [{ from: 'Senior officer', text: 'You are refusing to cooperate with the CBI? Your accounts will be frozen and your pension stopped. Last chance.' }],
      choices: [
        { label: 'Transfer the money.', next: 'lost', points: -60, note: 'Escalating threats when you push back are a sure sign of a scam.' },
        { label: 'Disconnect. Call 1930 and my bank.', next: 'safe_late', points: 0, note: 'Right call, even after hours of pressure.' },
      ],
    },
    safe_early: {
      lines: [{ from: 'system', text: 'Call ended. You report the number on 1930.' }],
      end: {
        outcome: 'safe',
        title: 'Off the call in under a minute',
        text: 'You did not argue, you did not explain, you just left. Police do not arrest anyone over video calls, and no one can keep you on one.',
      },
    },
    safe: {
      lines: [{ from: 'system', text: 'Call ended. Your son confirms it is a well-known scam. You report the number on 1930.' }],
      end: {
        outcome: 'safe',
        title: 'You broke the spell',
        text: 'The moment you stepped outside the call, the pressure fell apart. That is why “tell no one” is the scammer’s most important rule.',
      },
    },
    safe_late: {
      lines: [{ from: 'system', text: 'Call ended. You call 1930 and your bank.' }],
      end: {
        outcome: 'shaken',
        title: 'Safe, but it was close',
        text: 'You lost nothing, but you spent hours under pressure. Next time, hang up the moment you hear “digital arrest”.',
      },
    },
    lost: {
      lines: [{ from: 'system', text: 'The transfer goes through. The call ends. The “officers” stop answering.' }],
      end: {
        outcome: 'lost',
        title: '₹6,50,000 gone',
        text: 'The “safe account” was a mule account. Within minutes, the money moved through many other accounts. Calling 1930 straight away gives the best chance of freezing some of it.',
      },
    },
  },
  redFlags: [
    { title: 'Police on a video call', why: 'Police, CBI, customs and courts do not question or arrest anyone over WhatsApp or Skype.' },
    { title: '“Digital arrest”', why: 'It does not exist in Indian law. The phrase alone tells you it is a scam.' },
    { title: '“Tell no one”', why: 'Real investigations never stop you talking to family or a lawyer. Isolation is the scam.' },
    { title: 'Money to “prove innocence”', why: 'No agency asks you to transfer money to a “safe” or “verification” account.' },
    { title: 'Props and paperwork', why: 'Uniforms, emblems, warrants and stamps are cheap to fake on camera.' },
  ],
  respond: [
    'Disconnect. You never need permission to end a call.',
    'Tell a family member or friend straight away.',
    'Call 1930 or report at cybercrime.gov.in. Report the number on Sanchar Saathi (Chakshu).',
    'If you sent money, call your bank immediately.',
  ],
  learnMore: { label: 'Digital arrest scams', slug: 'digital-arrest' },
};

const pensionCall: ArcadeGame = {
  kind: 'chat',
  id: 'pension-call',
  title: 'The Pension Call',
  tagline: 'It is life-certificate month. “Your pension will stop unless…”',
  audiences: ['Senior citizens'],
  minutes: 2,
  tone: 'sun',
  icon: 'phone',
  channel: 'call',
  contact: { name: 'Pension Department', detail: 'Incoming call · +91 70XXXXXX12' },
  start: 'start',
  nodes: {
    start: {
      lines: [
        { from: 'system', text: 'You are 68, a retired teacher. It is November, when many pensioners submit their annual life certificate. Your phone rings.' },
        { from: CALLER, text: 'Namaste ji. I am calling from the Pension Department, Treasury Office. Your life certificate is not updated in our system. Your pension will stop from next month.' },
        { from: CALLER, text: 'Don’t worry, I can update it for you right now on the phone. No need to go to the bank.' },
      ],
      choices: [
        { label: 'Oh no! Please update it. What do you need?', next: 'details', points: -10, note: 'The threat of losing your pension is designed to make you panic and comply.' },
        { label: 'I will go to my bank or use Jeevan Pramaan myself.', next: 'push', points: 0, note: 'Good: you chose a route you control.' },
        { label: 'Which office? What is your name?', next: 'name', points: -5, note: 'Questions are good, but whatever the caller answers proves nothing.' },
      ],
    },
    name: {
      lines: [
        { from: CALLER, text: 'Ramesh Kumar, Senior Clerk, District Treasury. Employee ID TR-4471. I am government staff, you can trust me.' },
        { from: CALLER, text: 'I already have your pension number and bank details. I just need to verify one thing.' },
      ],
      choices: [
        { label: 'Okay. What do you need?', next: 'details', points: -10, note: 'Knowing your details proves nothing. Data leaks all the time.' },
        { label: 'I will call the treasury office myself, on the number in my pension papers.', next: 'safe', points: 0, note: 'Perfect. Call back on a number you found yourself.' },
      ],
    },
    push: {
      lines: [{ from: CALLER, text: 'Ji, the bank system is down for pensioners this month. Only phone verification is working. It takes just 2 minutes.' }],
      choices: [
        { label: 'Alright, quickly then.', next: 'details', points: -10, note: '“The system is down” is a made-up reason to keep you away from real channels.' },
        { label: 'No. I will go in person.', next: 'safe', points: 0, note: 'Exactly. A genuine office will be there tomorrow.' },
      ],
    },
    details: {
      lines: [
        { from: CALLER, text: 'Please tell me your Aadhaar number and date of birth for verification.' },
        { from: CALLER, text: 'Now you will get an OTP. Read it to me to complete your life certificate.' },
        { from: 'system', text: 'SMS: “OTP 482913 to ADD BENEFICIARY to a/c XX2210. Do not share with anyone. -Your Bank”' },
      ],
      choices: [
        { label: 'Read out the OTP.', next: 'lost', points: -60, note: 'An OTP authorises an action on your account. Here, adding someone who can receive your money.' },
        {
          label: 'Wait, the SMS says “add beneficiary”, not life certificate!',
          next: 'catch',
          points: 0,
          note: 'Reading what an OTP is for is a superpower. It told you exactly what was happening.',
        },
      ],
    },
    catch: {
      lines: [{ from: CALLER, text: 'That is the bank’s standard message, ji. All pensioners get the same. Quickly, the OTP will expire and your pension will be blocked!' }],
      choices: [
        { label: 'Read out the OTP.', next: 'lost', points: -50, note: 'More urgency after you spot a problem is a sure sign of a scam.' },
        { label: 'Hang up and call my bank’s official number.', next: 'safe_late', points: 0, note: 'Right. Trust what the SMS says, not what the caller says about it.' },
      ],
    },
    safe: {
      lines: [{ from: 'system', text: 'You hang up. At the bank the next day, the staff confirm your life certificate is due by 30 November and take it in two minutes.' }],
      end: {
        outcome: 'safe',
        title: 'Pension safe, savings safe',
        text: 'You chose the route you control: your branch, Jeevan Pramaan, or a number from your own papers. That one habit beats almost every phone scam.',
      },
    },
    safe_late: {
      lines: [{ from: 'system', text: 'You hang up and call your bank. They block the new-beneficiary request.' }],
      end: {
        outcome: 'shaken',
        title: 'Saved at the last step',
        text: 'Your money is safe, but you shared your Aadhaar number and date of birth. Expect more calls, and tell your bank so they can watch your account.',
      },
    },
    lost: {
      lines: [{ from: 'system', text: 'Ten minutes later: “₹1,80,000 transferred to new beneficiary.” The caller’s number is switched off.' }],
      end: {
        outcome: 'lost',
        title: '₹1,80,000 gone',
        text: 'The OTP did not update anything. It let the scammer add a beneficiary and move your savings. Call your bank and 1930 immediately: speed improves the chance of freezing the money.',
      },
    },
  },
  redFlags: [
    { title: '“Your pension will stop”', why: 'Fear of losing income is used to make you act before you think.' },
    { title: '“I can do it on the phone”', why: 'Life certificates go through your bank, pension office, doorstep banking or Jeevan Pramaan, never by reading out an OTP.' },
    { title: 'They already knew your details', why: 'Leaked data is not proof. Anyone can buy it.' },
    { title: '“The system is down”', why: 'A made-up reason to keep you away from the real channels.' },
    { title: 'The OTP said “add beneficiary”', why: 'OTP messages say what they authorise. Always read them fully.' },
  ],
  respond: [
    'Hang up. Call your bank or pension office on the number in your passbook or papers.',
    'Never read out an OTP, PIN or password to anyone.',
    'If you shared an OTP, call your bank and 1930 straight away.',
    'Tell a family member, and warn friends who also draw a pension.',
  ],
  learnMore: { label: 'Pension and KYC scams', slug: 'pension-scams' },
};

const realOrFake: ArcadeGame = {
  kind: 'realOrFake',
  id: 'real-or-fake',
  title: 'Real or Deepfake?',
  tagline: 'Seven videos, voice notes and messages. Which ones would you trust?',
  audiences: ['Senior citizens', 'Students', 'First-time investors'],
  minutes: 3,
  tone: 'violet',
  icon: 'deepfake',
  cards: [
    {
      id: 'celebrity',
      format: 'video',
      from: 'Sponsored ad · @MarketMasterIndia',
      headline: 'Famous industrialist “R. K. Bansal” on camera',
      body: '“I personally made 300% in three months with QuantumTrade AI. The government doesn’t want you to know. Register today, only 500 slots left.” (Comments turned off.)',
      answer: 'fake',
      explain:
        'A celebrity endorsing a trading app with huge returns is the most common deepfake ad. Scarcity (“500 slots”) and disabled comments are extra tells. Judge the claim, not the video quality.',
    },
    {
      id: 'grandson',
      format: 'voice',
      from: 'WhatsApp voice note · +44 7XXX XXX210',
      headline: 'It sounds exactly like your grandson Rohan',
      body: '“Dadi, it’s me! I’ve had an accident, I’m at the police station… Please don’t tell Papa. Send ₹50,000 to this UPI ID, I’ll explain later. Please hurry!”',
      answer: 'fake',
      explain:
        'Unknown number, emergency, secrecy and urgency: the classic family-emergency scam. AI can clone a voice from a few seconds of video. Call Rohan or his parents on the number you already have.',
    },
    {
      id: 'bank-alert',
      format: 'sms',
      from: 'AX-NIMBUS',
      body: '₹2,000 debited from A/c XX4417 on 12-Nov via UPI to Kirana Store. Not you? Call the number on the back of your card or block it in the Nimbus app.',
      answer: 'real',
      explain:
        'It is an alert, not a request. No link, no OTP, no payment, and it sends you to channels you already trust. If unsure, open your bank app yourself and check.',
    },
    {
      id: 'sebi-notice',
      format: 'document',
      from: 'WhatsApp · +91 9XXXX XXX88',
      headline: '“SEBI notice” PDF with logo and stamp',
      body: '“Your demat account is under investigation for suspicious trading. Pay a penalty of ₹25,000 within 24 hours to avoid freezing and arrest. Pay to: sebi.penalty@upi”',
      answer: 'fake',
      explain:
        'Regulators do not send notices over WhatsApp or collect penalties through a UPI ID. Logos and legal language are easy to copy. Check real orders on sebi.gov.in.',
    },
    {
      id: 'cas',
      format: 'email',
      from: 'Your depository · Consolidated Account Statement',
      body: 'Your CAS for October is attached as a password-protected PDF. It lists holdings and transactions across your demat accounts. If you see any transaction you did not make, contact your DP.',
      answer: 'real',
      explain:
        'No login link, no OTP, no payment request. It asks you to check and report, which is exactly what a real statement does.',
    },
    {
      id: 'news',
      format: 'video',
      from: 'Forwarded many times',
      headline: 'A well-known news anchor announces a “government scheme”',
      body: '“Breaking: the Finance Ministry has launched a new AI trading scheme. Invest ₹21,000 and earn ₹1,50,000 every month. Register on the link below.”',
      answer: 'fake',
      explain:
        'No government scheme promises returns like that. Forwarded clips have no source. Check on official sites or PIB Fact Check before believing or forwarding.',
    },
    {
      id: 'callback',
      format: 'call',
      from: 'Saved contact · Rohan (grandson)',
      headline: 'You called him back yourself',
      body: 'After the strange voice note, you call Rohan on his usual number. He picks up: “Dadi, that wasn’t me! I’m at college. Someone must have copied my voice from my videos.”',
      answer: 'real',
      explain: 'You started the call, on a number you already had. Calling back is the strongest check against any deepfake.',
    },
  ],
  redFlags: [
    { title: 'Judge the request, not the face', why: 'Deepfakes are getting too good to spot by eye. Ask what they want: money, OTPs, installs?' },
    { title: 'Urgency and secrecy', why: '“Hurry” and “don’t tell anyone” are the same in every scam, with or without AI.' },
    { title: 'Too good to be true', why: 'Celebrities and governments do not hand out 300% returns.' },
    { title: 'Unknown number, familiar voice', why: 'A new number plus a known voice is a reason to call back, not to pay.' },
  ],
  respond: [
    'Call back on a number you already have.',
    'Agree a family safe word for real emergencies.',
    'Check “government schemes” on official sites or PIB Fact Check.',
    'Report fake ads on the platform and fraud on cybercrime.gov.in or 1930.',
  ],
  learnMore: { label: 'Deepfakes and voice clones', slug: 'deepfakes' },
};

const tipGroup: ArcadeGame = {
  kind: 'chat',
  id: 'tip-group',
  title: 'The Tip Group',
  tagline: 'You have been added to a “VIP stock tips” group. Can you resist the rocket?',
  audiences: ['First-time investors', 'Students'],
  minutes: 3,
  tone: 'sky',
  icon: 'group',
  channel: 'group',
  contact: { name: 'Smart Money Insiders VIP', detail: '1,247 members' },
  start: 'start',
  nodes: {
    start: {
      lines: [
        { from: 'system', text: 'Someone you don’t know added you to a WhatsApp group.' },
        { from: ADMIN, text: 'Welcome! I am a SEBI-registered expert with 20 years of experience. Our members made 40% last month. 🔥' },
        { from: 'Neha_Trader', text: 'Thank you sir!! Made ₹38,000 profit last week on your tip 🙏🙏' },
        { from: ADMIN, text: 'Tomorrow’s call is FREE for new members. Strictly confidential. 🚀' },
      ],
      ticker: { symbol: 'ZENTRA', price: '₹14.20', change: '0.0%' },
      choices: [
        { label: 'Stay and see the free tip.', next: 'tip', points: -5, note: 'Nothing lost yet, but you are now inside a sales funnel.' },
        { label: 'Check if “Prof. A. Sharma” is really SEBI-registered.', next: 'check', points: 0, note: 'The best first move. Registration is public and takes two minutes to check.' },
        { label: 'Exit and report the group.', next: 'exit', points: 0, note: 'Strangers adding you to “VIP” groups is reason enough to leave.' },
      ],
    },
    check: {
      lines: [
        {
          from: 'system',
          text: 'You search SEBI’s lists of registered investment advisers and research analysts. The registration number he posted belongs to someone else.',
        },
        { from: ADMIN, text: 'Many fake people use my name 😊 that’s why I verify only inside the group. Tomorrow ZENTRA target ₹30!' },
      ],
      choices: [
        { label: 'He seems confident. I will try a small amount.', next: 'tip', points: -10, note: 'You had proof he was lying, and his confidence still pulled you back in. That is how it works.' },
        { label: 'Exit and report.', next: 'exit', points: 0, note: 'You checked, found a lie, and acted on it.' },
      ],
    },
    tip: {
      lines: [
        { from: ADMIN, text: '🚨 BUY ZENTRA AGRO NOW. Target ₹30 in 5 days. Big news coming. Buy before 10:15!' },
        { from: 'Rahul_Invests', text: 'Bought 5,000 shares!! 🚀🚀' },
        { from: 'Neha_Trader', text: 'Already up 18% 😍' },
      ],
      ticker: { symbol: 'ZENTRA', price: '₹16.80', change: '+18%' },
      choices: [
        {
          label: 'Buy ₹20,000 worth.',
          next: 'bought',
          points: -25,
          note: 'Buying on a group’s urgent “call” is exactly how a pump-and-dump works. The early buyers are the operators.',
        },
        { label: 'Just watch. Don’t buy.', next: 'watch', points: 0, note: 'Watching costs nothing, and it shows you how the trick plays out.' },
        { label: 'Exit and report.', next: 'exit', points: 0, note: 'Leaving before the pitch is the cleanest escape.' },
      ],
    },
    watch: {
      lines: [
        { from: 'system', text: 'By noon ZENTRA hits ₹21. The group explodes with profit screenshots.' },
        { from: ADMIN, text: 'Who missed? 😢 Join PREMIUM for ₹9,999 and never miss the next multibagger.' },
      ],
      ticker: { symbol: 'ZENTRA', price: '₹21.10', change: '+49%' },
      choices: [
        { label: 'Ugh, I missed out. Buy now.', next: 'dumped', points: -30, note: 'Fear of missing out is the fuel. Late buyers are who the operators sell to.' },
        { label: 'Pay ₹9,999 for Premium.', next: 'premium', points: -30, note: 'Paid tips from an unregistered adviser is not allowed, and the “premium” tips are the same game.' },
        { label: 'Something is off. Exit and report.', next: 'exit_late', points: 0, note: 'You saw the bait and still walked away.' },
      ],
    },
    bought: {
      lines: [
        { from: 'system', text: 'ZENTRA climbs to ₹21. On screen, your ₹20,000 is worth ₹25,000.' },
        { from: ADMIN, text: 'HOLD! Target ₹30. Don’t sell early, weak hands lose! 💎' },
      ],
      ticker: { symbol: 'ZENTRA', price: '₹21.10', change: '+49%' },
      choices: [
        { label: 'Hold for ₹30.', next: 'dumped', points: -20, note: '“Hold” keeps buyers in while the operators sell to them.' },
        {
          label: 'Sell now and leave the group.',
          next: 'lucky',
          points: 0,
          note: 'You got out this time. In many pump-and-dumps, the price crashes so fast that there are no buyers left.',
        },
      ],
    },
    exit: {
      lines: [{ from: 'system', text: 'You left the group and reported it.' }],
      end: {
        outcome: 'safe',
        title: 'Out before the hook',
        text: 'Next morning, ZENTRA crashed from ₹21 to ₹7. Everyone who bought on the “call” lost money. You did not, because you never played.',
      },
    },
    exit_late: {
      lines: [{ from: 'system', text: 'You left the group and reported it.' }],
      end: {
        outcome: 'safe',
        title: 'You watched the trick and walked away',
        text: 'Next morning, ZENTRA crashed to ₹7 and the group was deleted. Now you know what a pump-and-dump looks like from the inside.',
      },
    },
    premium: {
      lines: [{ from: 'system', text: 'You pay ₹9,999. The “premium” group sends tips for three days, then disappears.' }],
      end: {
        outcome: 'lost',
        title: '₹9,999 gone',
        text: 'Selling tips without SEBI registration is not allowed, and the tips were part of the same scheme. ZENTRA crashed to ₹7 the next morning.',
      },
    },
    dumped: {
      lines: [
        { from: 'system', text: 'Next morning ZENTRA opens at ₹7. The admin and most “members” have left. The group is deleted.' },
      ],
      ticker: { symbol: 'ZENTRA', price: '₹7.05', change: '−66%' },
      end: {
        outcome: 'lost',
        title: 'Your ₹20,000 is now worth about ₹6,600',
        text: 'The operators bought ZENTRA cheap, pumped it with the group, then sold to everyone who followed the “call”. Many of the excited members were their own fake accounts.',
      },
    },
    lucky: {
      lines: [{ from: 'system', text: 'You sold at ₹21. Next morning ZENTRA opened at ₹7.' }],
      end: {
        outcome: 'shaken',
        title: 'You got lucky',
        text: 'You made money, but only because someone else bought from you at the top. In real pump-and-dumps, the price can collapse so fast that there are no buyers left. Report the group.',
      },
    },
  },
  redFlags: [
    { title: 'Added by a stranger', why: 'Legitimate advisers do not add people to WhatsApp groups without asking.' },
    { title: '“SEBI-registered expert”', why: 'Check the name AND the number on sebi.gov.in. Scammers borrow real numbers.' },
    { title: 'Profit screenshots', why: 'Easy to fake, and many “members” are the operators’ own accounts.' },
    { title: '“Buy before 10:15!”', why: 'Urgency stops you from asking why a tiny company is suddenly a rocket.' },
    { title: 'Small, little-known company', why: 'Thinly traded shares are easy to push up and dump.' },
    { title: 'Paid “premium” tips', why: 'Charging for advice without SEBI registration is not allowed.' },
  ],
  respond: [
    'Exit the group and report it on the platform.',
    'Never trade on tips from people you have not verified on sebi.gov.in.',
    'If you paid or lost money, report on cybercrime.gov.in or call 1930.',
    'Warn friends who were in the same group.',
  ],
  learnMore: { label: 'Common investor scams', slug: 'investor-scams' },
};

const flagRush: ArcadeGame = {
  kind: 'flagRush',
  id: 'red-flag-rush',
  title: 'Red Flag Rush',
  tagline: 'Three investor scams, 75 seconds. Tap every red flag before time runs out.',
  audiences: ['First-time investors', 'Students'],
  minutes: 2,
  tone: 'brand',
  icon: 'flag',
  seconds: 75,
  rounds: [
    {
      channel: 'SMS',
      from: 'VM-IPOALT',
      text: 'Congrats! You are SELECTED for GUARANTEED allotment in Saffron Rail pre-IPO. Pay ₹9,999 processing fee to ipo.allot@upi before 6 PM to confirm your lot.',
      flags: [
        { id: 'selected', snippet: 'SELECTED', why: 'Nobody is “selected”. Allotment is by lottery after the issue closes.' },
        { id: 'guaranteed', snippet: 'GUARANTEED allotment', why: 'IPO allotment is never guaranteed.' },
        { id: 'preipo', snippet: 'pre-IPO', why: '“Pre-IPO” shares sold by strangers are a common scam.' },
        { id: 'fee', snippet: 'processing fee', why: 'There is no fee. With ASBA your money is only blocked in your own account.' },
        { id: 'upi', snippet: 'ipo.allot@upi', why: 'A random UPI ID. Real IPO applications go through your own broker or bank.' },
        { id: 'deadline', snippet: 'before 6 PM', why: 'Urgency so you pay before you check.' },
      ],
    },
    {
      channel: 'WhatsApp',
      from: 'QuantumTrade Pro',
      text: 'SEBI APPROVED app 📈 Earn 12% MONTHLY, zero risk. Get an exclusive institutional account for VIP members. Download from our link: qtpro-app.apk',
      flags: [
        { id: 'approved', snippet: 'SEBI APPROVED', why: 'SEBI registers firms; it does not approve apps or returns.' },
        { id: 'monthly', snippet: '12% MONTHLY', why: 'Nearly 290% a year. No honest investment promises this.' },
        { id: 'risk', snippet: 'zero risk', why: 'Every market investment carries risk.' },
        { id: 'institutional', snippet: 'institutional account', why: 'Fake “institutional” accounts show fake profits, then demand fees to withdraw.' },
        { id: 'apk', snippet: 'qtpro-app.apk', why: 'App files from links skip the app store. Use official apps of registered brokers only.' },
      ],
    },
    {
      channel: 'Email',
      from: 'kyc-update@demat-services.in',
      text: 'Dear Investor, your Demat account will be SUSPENDED today due to incomplete KYC. Click here to re-verify and enter the OTP sent to your phone.',
      flags: [
        { id: 'domain', snippet: 'demat-services.in', why: 'Not your DP’s official domain. Anyone can register a name like this.' },
        { id: 'dear', snippet: 'Dear Investor', why: 'Your DP knows your name. Generic greetings suggest a mass phishing email.' },
        { id: 'suspended', snippet: 'SUSPENDED today', why: 'Fear plus a deadline: the classic pressure combo.' },
        { id: 'click', snippet: 'Click here', why: 'Do KYC in your DP’s official app, never through a link in an email.' },
        { id: 'otp', snippet: 'enter the OTP', why: 'An OTP on a fake page hands the scammer access to your account.' },
      ],
    },
  ],
  redFlags: [],
  respond: [
    'Never pay a “fee” for IPO allotment or to withdraw your own money.',
    'Install only official apps of SEBI-registered brokers, from the app store.',
    'Do KYC only in your DP’s official app or website.',
    'Report scam messages on Sanchar Saathi (Chakshu) and money lost on 1930.',
  ],
  learnMore: { label: 'IPOs, the safe way', slug: 'ipo-the-safe-way' },
};

const goldenHour: ArcadeGame = {
  kind: 'goldenHour',
  id: 'golden-hour',
  title: 'The Golden Hour',
  tagline: 'You have just been scammed. The next 60 minutes matter most, and the clock is already ticking. What will you do?',
  audiences: ['Senior citizens', 'Students', 'First-time investors'],
  minutes: 2,
  tone: 'coral',
  icon: 'alarm',
  redFlags: [
    { title: '“Customer care” from a search result', why: 'Scammers buy ads and post fake helpline numbers. Use the number on your card or the official app.' },
    { title: '“Recovery experts”', why: 'People who just lost money are targeted again by fake recovery agents who charge a fee.' },
    { title: 'Waiting it out', why: 'Stolen money moves fast through chains of accounts. Every minute makes it harder to freeze.' },
  ],
  respond: [
    'Call 1930 or report at cybercrime.gov.in first. Speed gives the best chance of freezing the money.',
    'Call your bank on its official number to block cards, UPI and net banking.',
    'Save evidence: screenshots, transaction IDs, numbers and UPI IDs.',
    'Change passwords and PINs, and log out of devices you do not recognise.',
  ],
  learnMore: { label: 'Reporting cyber fraud', slug: 'report-cyber-fraud' },
};

export const GAMES: ArcadeGame[] = [goldenHour, digitalArrest, realOrFake, pensionCall, tipGroup, flagRush];

export const getGame = (id: string) => GAMES.find((g) => g.id === id);
