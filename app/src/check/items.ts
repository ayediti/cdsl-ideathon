// Before/after scam-spotting check. Two parallel sets of equal difficulty (3 scams, 3 safe each),
// so the "after" score measures learning, not memory of the "before" answers.

export type CheckPhase = 'before' | 'after';

export interface CheckItem {
  id: string;
  channel: string;
  from: string;
  text: string;
  answer: 'scam' | 'safe';
  why: string;
}

export const CHECK_SETS: Record<CheckPhase, CheckItem[]> = {
  before: [
    {
      id: 'kyc',
      channel: 'SMS',
      from: 'VK-DMTKYC',
      text: 'Your demat account will be FROZEN today. Update KYC now: dmt-kyc.in/upd',
      answer: 'scam',
      why: 'Urgency plus a link. KYC is done in your DP’s official app, never through an SMS link.',
    },
    {
      id: 'debit',
      channel: 'SMS',
      from: 'AX-NIMBUS',
      text: '₹1,500 debited from A/c XX4417 at Grocery Mart. Not you? Call the number on the back of your card.',
      answer: 'safe',
      why: 'An alert with no link and no request. It points you to a number you already have.',
    },
    {
      id: 'vip',
      channel: 'WhatsApp',
      from: '+91 98XXX XXX01',
      text: 'I am a SEBI-registered expert. Join my VIP group for guaranteed 5% profit every day.',
      answer: 'scam',
      why: 'Guaranteed returns are a lie, and registered advisers do not recruit through WhatsApp groups.',
    },
    {
      id: 'cas',
      channel: 'Email',
      from: 'Your depository',
      text: 'Your Consolidated Account Statement for September is attached. It is protected with your PAN as the password.',
      answer: 'safe',
      why: 'No link, no OTP, no payment request. A real CAS just asks you to check it.',
    },
    {
      id: 'arrest',
      channel: 'Video call',
      from: 'Unknown number',
      text: 'This is the CBI. You are under digital arrest. Stay on camera and tell no one.',
      answer: 'scam',
      why: 'There is no “digital arrest” in Indian law. Disconnect and call 1930.',
    },
    {
      id: 'asba',
      channel: 'SMS',
      from: 'AD-NIMBUS',
      text: 'Amount BLOCKED in a/c XX4417 for your IPO application. It will be debited only if shares are allotted.',
      answer: 'safe',
      why: 'This is how ASBA works: the money stays blocked in your own account until allotment.',
    },
  ],
  after: [
    {
      id: 'pension',
      channel: 'Phone call',
      from: '+91 70XXX XXX12',
      text: 'Your pension will stop next month. Read me the OTP to update your life certificate.',
      answer: 'scam',
      why: 'Life certificates are never updated by reading out an OTP to a caller.',
    },
    {
      id: 'order',
      channel: 'SMS',
      from: 'BANYAN',
      text: 'Your order to buy 10 shares of Kettle & Co. was executed. See the details in the Banyan app.',
      answer: 'safe',
      why: 'A confirmation of something you did, pointing to the official app. No link, no request.',
    },
    {
      id: 'deepfake',
      channel: 'Video ad',
      from: 'Sponsored',
      text: 'Famous businessman: “Triple your money in 30 days with this AI app. Only 100 slots left!”',
      answer: 'scam',
      why: 'Celebrity deepfake ads with huge returns and fake scarcity are a common trap.',
    },
    {
      id: 'registrar',
      channel: 'Email',
      from: 'IPO registrar',
      text: 'Allotment results are out. Check your status on our official website or in your broker app. We never charge fees.',
      answer: 'safe',
      why: 'It sends you to official places yourself and asks for nothing.',
    },
    {
      id: 'preipo',
      channel: 'Telegram',
      from: 'Pre-IPO Deals',
      text: 'Buy Saffron Rail pre-IPO shares at a discount. Guaranteed listing gains. Pay to preipo.deals@upi.',
      answer: 'scam',
      why: 'Strangers selling pre-IPO shares with guaranteed gains is a known fraud.',
    },
    {
      id: 'nominee',
      channel: 'SMS',
      from: 'BANYAN',
      text: 'Your nominee details were updated. If this was not you, contact us through the official Banyan app.',
      answer: 'safe',
      why: 'An alert about a change, with a safe way to report it.',
    },
  ],
};
