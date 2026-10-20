import type { Module } from '../engine/types';

export const orientation: Module = {
  id: 'm0_orientation',
  title: 'Orientation',
  tagline: 'Find out how you think about money.',
  chapters: [
    {
      id: 'ch01_money_dna',
      moduleId: 'm0_orientation',
      title: 'Money DNA',
      blurb: 'Six everyday situations reveal your money personality.',
      screenSequence: ['01_intro', '02_quiz', '03_result', '04_ground_rules'],
      screens: {
        '01_intro': {
          kind: 'narrative',
          title: 'Before we hand you any money…',
          body: [
            'Everyone carries habits about money — picked up from family, friends and whatever we scroll past online. Most of us never look at them.',
            'Answer six everyday situations. There are no right answers; pick what you would actually do, not what you think you should do.',
          ],
          help: { reflection: 'Answer honestly — this is about noticing your habits, not judging them.' },
        },
        '02_quiz': { kind: 'custom', component: 'dnaQuiz', title: 'Money DNA' },
        '03_result': {
          kind: 'custom',
          component: 'dnaResult',
          title: 'Your Money DNA',
          help: { reflection: 'Which part of the description felt most true? Which part felt unfair?' },
        },
        '04_ground_rules': {
          kind: 'narrative',
          title: 'Ground rules',
          body: [
            'Everything here is simulated. The rupees, the bank, the phone and the people are fictional.',
            'Nothing in this simulation is investment advice, and it never connects to a real bank, broker or demat account.',
            'We never ask for your real PAN, Aadhaar, account numbers, OTPs or passwords. If anything ever asks for them — here or anywhere else — treat it as a red flag.',
          ],
          callout: 'Your progress is stored only in this browser.',
          help: {
            reflection: 'Remember the last rule. You will need it later.',
            links: [{ label: 'Never share an OTP', slug: 'otp-never-share' }],
          },
        },
      },
    },
  ],
};
