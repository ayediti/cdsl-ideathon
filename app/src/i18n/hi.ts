// Hindi translations, keyed by the exact English string shown in the UI or content.
// Anything missing falls back to English. Scam-message snippets in Red Flag Rush stay in English where
// real scam texts mix languages; translated snippets must appear verbatim in their translated message.

export const HI: Record<string, string> = {
  // ── Shared UI ─────────────────────────────────────────────────────────────
  Course: 'कोर्स',
  Library: 'लाइब्रेरी',
  'Self-check': 'सेल्फ़-चेक',
  English: 'English',
  'Larger text': 'बड़ा टेक्स्ट',
  'Read aloud': 'पढ़कर सुनाएँ',
  'Switch to Hindi': 'हिंदी में देखें',
  'Switch to English': 'अंग्रेज़ी में देखें',
  Play: 'खेलें',
  Next: 'आगे',
  Finish: 'ख़त्म करें',
  'Scam games': 'स्कैम गेम्स',
  'All games': 'सभी गेम्स',
  'Senior citizens': 'वरिष्ठ नागरिक',
  Students: 'विद्यार्थी',
  'First-time investors': 'नए निवेशक',
  Seniors: 'वरिष्ठ नागरिक',
  'New investors': 'नए निवेशक',
  'Scam-proof': 'स्कैम-प्रूफ़',
  Sharp: 'सतर्क',
  Shaky: 'डगमगाए',
  Hooked: 'फँस गए',

  // ── Home ──────────────────────────────────────────────────────────────────
  Learn: 'सीखें',
  'From your first share to your first demat account.': 'पहले शेयर से पहले डीमैट खाते तक।',
  'Start from the beginning': 'शुरू से शुरू करें',
  'Continue where you left off': 'जहाँ छोड़ा था, वहीं से आगे बढ़ें',
  'Course chapters are in English for now; Hindi is coming next.': '(अध्याय अभी अंग्रेज़ी में)',
  'What would you do?': 'आप क्या करेंगे?',
  'Find out how easily digital fraud could fool you, and get better at spotting it.':
    'जानिए डिजिटल धोखाधड़ी आपको कितनी आसानी से फँसा सकती है, और उसे पहचानना सीखिए।',
  'Everything here is simulated: no real money, no sign-up, not investment advice.':
    'यहाँ सब कुछ सिम्युलेटेड है: कोई असली पैसा नहीं, कोई साइन-अप नहीं, कोई निवेश सलाह नहीं।',
  'In a real emergency, call': 'असली आपात स्थिति में कॉल करें',
  'Restart simulation': 'सिमुलेशन फिर से शुरू करें',
  'Restart everything? Your simulated money, phone, course progress, game scores and self-check results will be deleted from this browser.':
    'सब कुछ फिर से शुरू करें? आपका सिम्युलेटेड पैसा, फ़ोन, कोर्स की प्रगति, गेम स्कोर और सेल्फ़-चेक के नतीजे इस ब्राउज़र से मिट जाएँगे।',
  'How scam-proof are you?': 'आप कितने स्कैम-प्रूफ़ हैं?',
  best: 'सर्वश्रेष्ठ',
  Orientation: 'शुरुआत',
  'Market Basics': 'बाज़ार की बुनियादी बातें',
  'Your First Demat Account': 'आपका पहला डीमैट खाता',
  'Money DNA': 'मनी DNA',
  'Six everyday situations reveal your money personality.': 'रोज़मर्रा की छह स्थितियाँ बताती हैं कि पैसे को लेकर आपका स्वभाव कैसा है।',
  'What Is a Share?': 'शेयर क्या है?',
  'From a chai stall to the stock exchange: what it really means to own part of a company.':
    'चाय की टपरी से स्टॉक एक्सचेंज तक: किसी कंपनी का हिस्सेदार होने का असली मतलब।',
  'Where Your Shares Live': 'आपके शेयर कहाँ रहते हैं',
  'Demat accounts, depositories and DPs, explained without the jargon.': 'डीमैट खाता, डिपॉज़िटरी और DP, बिना भारी शब्दों के।',
  'The Quiet Multiplier': 'चुपचाप बढ़ने वाला पैसा',
  'Before any shares: build a cushion, automate saving and let time do the work.':
    'शेयर से पहले: इमरजेंसी फ़ंड बनाइए, बचत अपने-आप कीजिए और समय को काम करने दीजिए।',
  'Opening Your Demat Account': 'अपना डीमैट खाता खोलना',
  'Pick a registered DP, finish KYC, add a nominee and understand what you sign.':
    'रजिस्टर्ड DP चुनें, KYC पूरा करें, नॉमिनी जोड़ें और समझें कि आप किस पर हस्ताक्षर कर रहे हैं।',
  'Reading Your CAS': 'अपना CAS पढ़ना',
  'The one statement that comes straight from the depository, and the habit that catches fraud early.':
    'वह स्टेटमेंट जो सीधे डिपॉज़िटरी से आता है, और वह आदत जो धोखाधड़ी को जल्दी पकड़ लेती है।',
  'Applying for an IPO, the Safe Way': 'IPO में सुरक्षित तरीके से आवेदन',
  'How IPO applications really work, and the “guaranteed allotment” trap.':
    'IPO आवेदन असल में कैसे होता है, और “गारंटीड अलॉटमेंट” का जाल।',
  'Investor Scam Radar': 'निवेशक स्कैम रडार',
  'Fake trading apps, tip groups and fake regulators. Learn their playbook, then flip it.':
    'नकली ट्रेडिंग ऐप, टिप्स ग्रुप और नकली रेगुलेटर। उनकी चालें समझिए, फिर उन्हें मात दीजिए।',

  // ── Game intro, debrief, sharing ──────────────────────────────────────────
  '{n} min · scam game': '{n} मिनट · स्कैम गेम',
  'Your best: {n}/100': 'आपका सर्वश्रेष्ठ: {n}/100',
  'Everything is simulated. No real money, no sign-up, nothing about you is collected.':
    'सब कुछ सिम्युलेटेड है। कोई असली पैसा नहीं, कोई साइन-अप नहीं, आपकी कोई जानकारी नहीं ली जाती।',
  'Your choices': 'आपके फ़ैसले',
  'Red flags to remember': 'याद रखने लायक रेड फ़्लैग',
  'If this happens for real': 'अगर असल में ऐसा हो',
  'Play again': 'फिर से खेलें',
  'Read: {label}': 'पढ़ें: {label}',
  'Go deeper in the course': 'कोर्स में गहराई से सीखें',
  'Next: {title}': 'अगला: {title}',
  'Challenge someone': 'किसी को चुनौती दें',
  Share: 'शेयर करें',
  'Copy link': 'लिंक कॉपी करें',
  Copied: 'कॉपी हो गया',
  'I scored {score}/100 on “{title}”. Could you spot the scam?': 'मैंने “{title}” में {score}/100 स्कोर किया। क्या आप स्कैम पकड़ पाएँगे?',
  'Played a few games? Take the after-check and see how much you have improved.':
    'कुछ गेम खेल लिए? आफ़्टर-चेक दीजिए और देखिए आप कितना बेहतर हुए।',
  'Take the after-check': 'आफ़्टर-चेक दें',

  // ── Real or Deepfake UI ───────────────────────────────────────────────────
  Video: 'वीडियो',
  'Voice note': 'वॉइस नोट',
  SMS: 'SMS',
  Email: 'ईमेल',
  Document: 'दस्तावेज़',
  'Phone call': 'फ़ोन कॉल',
  Real: 'असली',
  Fake: 'नकली',
  real: 'असली',
  fake: 'नकली',
  'Correct: this one is {answer}': 'सही: यह {answer} है',
  'Not quite: this one is {answer}': 'नहीं: यह {answer} है',
  'See my score': 'मेरा स्कोर देखें',
  '{correct} of {total} judged right': '{total} में से {correct} सही पहचाने',
  'Sharp eyes. You checked the request, not just the face or the voice.':
    'तेज़ नज़र। आपने सिर्फ़ चेहरा या आवाज़ नहीं, माँग को परखा।',
  'Deepfakes are built to fool your eyes and ears. Focus on what the message wants from you, and call back on numbers you already have.':
    'डीपफेक आँखों और कानों को धोखा देने के लिए बनते हैं। देखिए संदेश आपसे क्या माँग रहा है, और अपने पास पहले से मौजूद नंबर पर ही वापस कॉल कीजिए।',
  'Card by card': 'हर कार्ड का हिसाब',

  // ── Red Flag Rush UI ──────────────────────────────────────────────────────
  'Message {r}/{n}': 'संदेश {r}/{n}',
  flags: 'फ़्लैग',
  pts: 'अंक',
  'Tap the suspicious words. Wrong taps cost {n} points.': 'संदिग्ध शब्दों पर टैप करें। ग़लत टैप पर {n} अंक कटेंगे।',
  'Skip to next message': 'अगले संदेश पर जाएँ',
  '{found} of {total} red flags found': '{total} में से {found} रेड फ़्लैग मिले',
  '{n} wrong taps (−{p}).': '{n} ग़लत टैप (−{p})।',
  'Scammers count on you reading fast. Every flag you missed is one they hope you will miss for real.':
    'स्कैमर चाहते हैं कि आप जल्दी-जल्दी पढ़ें। जो भी फ़्लैग छूटा, वही वे असल ज़िंदगी में भी छुड़वाना चाहते हैं।',
  'Every red flag': 'हर रेड फ़्लैग',

  // ── Golden Hour UI ────────────────────────────────────────────────────────
  '₹40,000 debited from A/c XX4417 via UPI to': '₹40,000 आपके खाते XX4417 से UPI द्वारा भेजे गए:',
  'unknown beneficiary': 'अनजान लाभार्थी',
  'Not you?': 'आपने नहीं भेजे?',
  '{clock} / {limit} min': '{clock} / {limit} मिनट',
  '{n} min': '{n} मिनट',
  'Recovery chances': 'पैसे वापस मिलने की संभावना',
  'Every action takes time. Pick your moves, fast.': 'हर क़दम में समय लगता है। जल्दी चुनिए।',
  'I have done everything I can': 'मैंने जो कर सकता था, कर लिया',
  'Your moves, in order': 'आपके क़दम, क्रम से',
  'Minute {m}: {label}': 'मिनट {m}: {label}',
  'Golden-hour hero': 'गोल्डन आवर हीरो',
  'Good instincts': 'अच्छी समझ',
  'Too slow': 'बहुत धीमे',
  'The money is gone': 'पैसा चला गया',
  'You reported at minute {m}.': 'आपने मिनट {m} पर शिकायत की।',
  'You never reported it to 1930.': 'आपने 1930 पर शिकायत ही नहीं की।',
  'You also lost another {amount} along the way.': 'इस बीच आपने {amount} और गँवा दिए।',
  'The ideal order: call 1930 first, then your bank, then save evidence and change passwords.':
    'सही क्रम: पहले 1930 पर कॉल, फिर बैंक, फिर सबूत सहेजें और पासवर्ड बदलें।',
  'Call 1930 / report on cybercrime.gov.in': '1930 पर कॉल करें / cybercrime.gov.in पर शिकायत करें',
  'Reported. The helpline can alert banks along the money trail. The sooner you report, the better the chance of freezing funds.':
    'शिकायत दर्ज। हेल्पलाइन पैसे के रास्ते में आने वाले बैंकों को सतर्क कर सकती है। जितनी जल्दी शिकायत, पैसा रोके जाने की उतनी अच्छी संभावना।',
  'Call my bank’s official number to block UPI and cards': 'UPI और कार्ड ब्लॉक कराने के लिए बैंक के आधिकारिक नंबर पर कॉल करें',
  'Blocked. Nothing else can leave your account.': 'ब्लॉक हो गया। अब खाते से और पैसा नहीं जा सकता।',
  'Screenshot the messages and note the transaction ID': 'संदेशों के स्क्रीनशॉट लें और ट्रांज़ैक्शन ID लिख लें',
  'Saved. Your complaint and any refund claim need this evidence.': 'सहेज लिया। शिकायत और रिफ़ंड के दावे के लिए यही सबूत चाहिए।',
  'Change passwords and PINs, log out unknown devices': 'पासवर्ड और PIN बदलें, अनजान डिवाइस से लॉग-आउट करें',
  'Locked down. The scammer can’t get back in.': 'सब सुरक्षित। स्कैमर अब वापस नहीं घुस सकता।',
  'Tell a family member what happened': 'परिवार के किसी सदस्य को बताएँ',
  'Good. Support helps you think clearly, and stops them falling for the same trick.':
    'अच्छा किया। अपनों का साथ सोचने में मदद करता है, और उन्हें भी इसी चाल से बचाता है।',
  'Google “bank customer care” and call the top result': 'Google पर “बैंक कस्टमर केयर” खोजकर सबसे ऊपर वाले नंबर पर कॉल करें',
  'The top result was a fake helpline. The “agent” asked you to install a screen-sharing app to “reverse” the payment, and took ₹10,000 more.':
    'सबसे ऊपर वाला नंबर नकली हेल्पलाइन थी। “एजेंट” ने पेमेंट “वापस” करने के नाम पर स्क्रीन-शेयरिंग ऐप डलवाया, और ₹10,000 और ले लिए।',
  'Pay a “recovery expert” who messaged me offering help': 'मदद का संदेश भेजने वाले “रिकवरी एक्सपर्ट” को पैसे दें',
  'Recovery scams target people who have just been scammed. Your ₹5,000 “fee” is gone too.':
    'रिकवरी स्कैम ठगी के शिकार लोगों को ही दोबारा निशाना बनाते हैं। आपकी ₹5,000 की “फ़ीस” भी गई।',
  'Message the scammer and beg for the money back': 'स्कैमर को संदेश भेजकर पैसे लौटाने की विनती करें',
  'They blocked you, after you wasted ten precious minutes.': 'उन्होंने आपको ब्लॉक कर दिया, और आपके दस क़ीमती मिनट बर्बाद हुए।',
  'Wait and see if it comes back by itself': 'इंतज़ार करें, शायद पैसा अपने-आप लौट आए',
  'Waiting is the costliest move. Every minute, the money moves further along a chain of accounts.':
    'इंतज़ार सबसे महँगा क़दम है। हर मिनट पैसा खातों की कड़ी में और आगे निकल जाता है।',

  // ── Self-check ────────────────────────────────────────────────────────────
  'Safe or scam?': 'सुरक्षित या स्कैम?',
  Safe: 'सुरक्षित',
  Scam: 'स्कैम',
  'Six messages, about a minute. Decide whether each one is safe or a scam. Your answers stay on this device.':
    'छह संदेश, लगभग एक मिनट। हर संदेश के लिए तय कीजिए: सुरक्षित या स्कैम। आपके जवाब इसी डिवाइस पर रहते हैं।',
  'Before you play': 'खेलने से पहले',
  'After you play': 'खेलने के बाद',
  'Start the check': 'चेक शुरू करें',
  'Message {i} of {n}': 'संदेश {i} / {n}',
  'Your score: {correct} of {total}': 'आपका स्कोर: {total} में से {correct}',
  'Before: {b} of {n}': 'पहले: {n} में से {b}',
  'After: {a} of {n}': 'बाद में: {n} में से {a}',
  'You improved by {d}.': 'आपमें {d} का सुधार हुआ।',
  'Same score as before. Play a few more games and try again.': 'स्कोर पहले जैसा है। कुछ और गेम खेलकर फिर कोशिश कीजिए।',
  'A little lower this time. Replay the games and try again.': 'इस बार स्कोर थोड़ा कम रहा। गेम दोबारा खेलकर फिर कोशिश कीजिए।',
  'Now play a few scam games, then come back for the after-check.': 'अब कुछ स्कैम गेम खेलिए, फिर आफ़्टर-चेक के लिए लौटिए।',
  'Play the scam games': 'स्कैम गेम खेलें',
  'Take the after-check now': 'आफ़्टर-चेक अभी दें',
  'Retake both checks': 'दोनों चेक फिर से दें',
  'Answers explained': 'जवाबों की व्याख्या',
  'Your results never leave this device.': 'आपके नतीजे इस डिवाइस से बाहर नहीं जाते।',
  WhatsApp: 'WhatsApp',
  'Video call': 'वीडियो कॉल',
  'Video ad': 'वीडियो विज्ञापन',
  Telegram: 'Telegram',
  'Your depository': 'आपकी डिपॉज़िटरी',
  'Unknown number': 'अनजान नंबर',
  Sponsored: 'प्रायोजित',
  'IPO registrar': 'IPO रजिस्ट्रार',
  'Pre-IPO Deals': 'प्री-IPO डील्स',
  'Your demat account will be FROZEN today. Update KYC now: dmt-kyc.in/upd':
    'आपका डीमैट खाता आज ही FREEZE हो जाएगा। अभी KYC अपडेट करें: dmt-kyc.in/upd',
  'Urgency plus a link. KYC is done in your DP’s official app, never through an SMS link.':
    'जल्दबाज़ी और साथ में लिंक। KYC आपके DP के आधिकारिक ऐप में होता है, SMS के लिंक से कभी नहीं।',
  '₹1,500 debited from A/c XX4417 at Grocery Mart. Not you? Call the number on the back of your card.':
    'आपके खाते XX4417 से Grocery Mart पर ₹1,500 कटे। आपने नहीं किया? अपने कार्ड के पीछे लिखे नंबर पर कॉल करें।',
  'An alert with no link and no request. It points you to a number you already have.':
    'यह सिर्फ़ सूचना है: न लिंक, न कोई माँग। यह आपको उसी नंबर पर भेजती है जो आपके पास पहले से है।',
  'I am a SEBI-registered expert. Join my VIP group for guaranteed 5% profit every day.':
    'मैं SEBI-रजिस्टर्ड एक्सपर्ट हूँ। हर दिन 5% गारंटीड मुनाफ़े के लिए मेरे VIP ग्रुप से जुड़िए।',
  'Guaranteed returns are a lie, and registered advisers do not recruit through WhatsApp groups.':
    'गारंटीड रिटर्न झूठ है, और रजिस्टर्ड सलाहकार WhatsApp ग्रुप के ज़रिए लोग नहीं जोड़ते।',
  'Your Consolidated Account Statement for September is attached. It is protected with your PAN as the password.':
    'सितंबर का आपका कंसॉलिडेटेड अकाउंट स्टेटमेंट संलग्न है। इसका पासवर्ड आपका PAN है।',
  'No link, no OTP, no payment request. A real CAS just asks you to check it.':
    'न लिंक, न OTP, न पैसे की माँग। असली CAS बस आपसे उसे जाँचने को कहता है।',
  'This is the CBI. You are under digital arrest. Stay on camera and tell no one.':
    'यह CBI है। आप डिजिटल अरेस्ट में हैं। कैमरे के सामने रहिए और किसी को मत बताइए।',
  'There is no “digital arrest” in Indian law. Disconnect and call 1930.':
    'भारतीय क़ानून में “डिजिटल अरेस्ट” जैसा कुछ नहीं है। कॉल काटिए और 1930 पर कॉल कीजिए।',
  'Amount BLOCKED in a/c XX4417 for your IPO application. It will be debited only if shares are allotted.':
    'आपके IPO आवेदन के लिए खाते XX4417 में राशि BLOCK की गई है। शेयर अलॉट होने पर ही पैसे कटेंगे।',
  'This is how ASBA works: the money stays blocked in your own account until allotment.':
    'ASBA ऐसे ही काम करता है: अलॉटमेंट तक पैसा आपके अपने खाते में ही ब्लॉक रहता है।',
  'Your pension will stop next month. Read me the OTP to update your life certificate.':
    'अगले महीने से आपकी पेंशन बंद हो जाएगी। जीवन प्रमाण पत्र अपडेट करने के लिए मुझे OTP बताइए।',
  'Life certificates are never updated by reading out an OTP to a caller.':
    'जीवन प्रमाण पत्र किसी कॉलर को OTP बताकर कभी अपडेट नहीं होता।',
  'Your order to buy 10 shares of Kettle & Co. was executed. See the details in the Banyan app.':
    'Kettle & Co. के 10 शेयर ख़रीदने का आपका ऑर्डर पूरा हुआ। विवरण Banyan ऐप में देखें।',
  'A confirmation of something you did, pointing to the official app. No link, no request.':
    'आपके ही किए काम की पुष्टि, जो आधिकारिक ऐप की ओर इशारा करती है। न लिंक, न कोई माँग।',
  'Famous businessman: “Triple your money in 30 days with this AI app. Only 100 slots left!”':
    'मशहूर उद्योगपति: “इस AI ऐप से 30 दिन में पैसा तीन गुना करें। सिर्फ़ 100 जगहें बाक़ी!”',
  'Celebrity deepfake ads with huge returns and fake scarcity are a common trap.':
    'बड़े रिटर्न और “कुछ ही जगहें बाक़ी” वाले सेलिब्रिटी डीपफेक विज्ञापन एक आम जाल हैं।',
  'Allotment results are out. Check your status on our official website or in your broker app. We never charge fees.':
    'अलॉटमेंट के नतीजे आ गए हैं। अपना स्टेटस हमारी आधिकारिक वेबसाइट या अपने ब्रोकर ऐप में देखें। हम कभी कोई फ़ीस नहीं लेते।',
  'It sends you to official places yourself and asks for nothing.': 'यह आपको ख़ुद आधिकारिक जगहों पर भेजता है और कुछ नहीं माँगता।',
  'Buy Saffron Rail pre-IPO shares at a discount. Guaranteed listing gains. Pay to preipo.deals@upi.':
    'Saffron Rail के pre-IPO शेयर छूट पर ख़रीदें। लिस्टिंग पर मुनाफ़े की गारंटी। भुगतान करें: preipo.deals@upi',
  'Strangers selling pre-IPO shares with guaranteed gains is a known fraud.':
    'अजनबियों का गारंटीड मुनाफ़े के साथ pre-IPO शेयर बेचना एक जानी-पहचानी धोखाधड़ी है।',
  'Your nominee details were updated. If this was not you, contact us through the official Banyan app.':
    'आपके नॉमिनी का विवरण अपडेट हुआ। अगर यह आपने नहीं किया, तो आधिकारिक Banyan ऐप से संपर्क करें।',
  'An alert about a change, with a safe way to report it.': 'बदलाव की सूचना, और उसकी शिकायत का सुरक्षित तरीका।',

  // ── Games content ─────────────────────────────────────────────────────────
  'The Golden Hour': 'गोल्डन आवर',
  'You have just been scammed. The next 60 minutes matter most, and the clock is already ticking. What will you do?':
    'अभी-अभी आपके साथ ठगी हुई है। अगले 60 मिनट सबसे ज़रूरी हैं, और घड़ी चल रही है। आप क्या करेंगे?',
  'You have just been scammed. Spend the next hour well.': 'अभी-अभी आपके साथ ठगी हुई है। अगला एक घंटा समझदारी से बिताइए।',
  '“Customer care” from a search result': 'सर्च रिज़ल्ट वाला “कस्टमर केयर”',
  'Scammers buy ads and post fake helpline numbers. Use the number on your card or the official app.':
    'स्कैमर विज्ञापन ख़रीदकर नकली हेल्पलाइन नंबर डालते हैं। कार्ड पर लिखा नंबर या आधिकारिक ऐप ही इस्तेमाल करें।',
  '“Recovery experts”': '“रिकवरी एक्सपर्ट”',
  'People who just lost money are targeted again by fake recovery agents who charge a fee.':
    'जिनका पैसा अभी-अभी गया है, उन्हें नकली रिकवरी एजेंट फ़ीस लेकर फिर से ठगते हैं।',
  'Waiting it out': 'इंतज़ार करते रहना',
  'Stolen money moves fast through chains of accounts. Every minute makes it harder to freeze.':
    'चोरी का पैसा तेज़ी से कई खातों से होकर निकल जाता है। हर मिनट के साथ उसे रोकना मुश्किल होता है।',
  'Call 1930 or report at cybercrime.gov.in first. Speed gives the best chance of freezing the money.':
    'सबसे पहले 1930 पर कॉल करें या cybercrime.gov.in पर शिकायत करें। जितनी तेज़ी, पैसा रुकने की उतनी अच्छी संभावना।',
  'Call your bank on its official number to block cards, UPI and net banking.':
    'कार्ड, UPI और नेट बैंकिंग ब्लॉक कराने के लिए बैंक के आधिकारिक नंबर पर कॉल करें।',
  'Save evidence: screenshots, transaction IDs, numbers and UPI IDs.': 'सबूत सहेजें: स्क्रीनशॉट, ट्रांज़ैक्शन ID, नंबर और UPI ID।',
  'Change passwords and PINs, and log out of devices you do not recognise.': 'पासवर्ड और PIN बदलें, और अनजान डिवाइस से लॉग-आउट करें।',
  'Reporting cyber fraud': 'साइबर धोखाधड़ी की शिकायत',

  'The Digital Arrest': 'डिजिटल अरेस्ट',
  'A “police officer” on video says you are under arrest. Can you get off the call?':
    'वीडियो कॉल पर एक “पुलिस अफ़सर” कहता है कि आप गिरफ़्तार हैं। क्या आप कॉल से निकल पाएँगे?',
  'A “police officer” on video says you are under arrest.': 'वीडियो कॉल पर एक “पुलिस अफ़सर” कहता है कि आप गिरफ़्तार हैं।',
  'Cyber Crime Branch': 'साइबर क्राइम ब्रांच',
  'WhatsApp video call · unknown number': 'WhatsApp वीडियो कॉल · अनजान नंबर',
  'Incoming WhatsApp video call. A man in police uniform sits in an office with a national emblem on the wall behind him.':
    'WhatsApp पर वीडियो कॉल आती है। पुलिस की वर्दी में एक आदमी दफ़्तर में बैठा है, पीछे दीवार पर राष्ट्रीय चिह्न लगा है।',
  'Insp. Vikram Rathore': 'इंस्पेक्टर विक्रम राठौर',
  'Good afternoon. Inspector Vikram Rathore, Cyber Crime Branch. A parcel booked with your Aadhaar number has been seized at Mumbai airport. It contains fake passports and drugs.':
    'नमस्ते। मैं इंस्पेक्टर विक्रम राठौर, साइबर क्राइम ब्रांच से। आपके आधार नंबर से बुक एक पार्सल मुंबई एयरपोर्ट पर पकड़ा गया है। उसमें नकली पासपोर्ट और ड्रग्स हैं।',
  'Your Aadhaar is also linked to a bank account used for money laundering. A case has been filed against you.':
    'आपका आधार एक ऐसे बैंक खाते से भी जुड़ा है जिससे मनी लॉन्ड्रिंग हुई है। आपके ख़िलाफ़ केस दर्ज हो चुका है।',
  'That is impossible! I never sent any parcel.': 'यह नामुमकिन है! मैंने कोई पार्सल नहीं भेजा।',
  'Arguing keeps you on the call, and staying on the call is what they want.': 'बहस करने से आप कॉल पर बने रहते हैं, और वे यही चाहते हैं।',
  'Which police station? I will come there in person.': 'कौन-सा थाना? मैं ख़ुद वहाँ आ जाऊँगा।',
  'Good instinct: real police work happens at a station, with paperwork, not on WhatsApp.':
    'सही सोच: असली पुलिस का काम थाने में, काग़ज़ी कार्रवाई से होता है, WhatsApp पर नहीं।',
  'Hang up and call 1930 myself.': 'कॉल काटकर ख़ुद 1930 पर कॉल करें।',
  'Best move. There is no such thing as a “digital arrest” in Indian law.': 'सबसे अच्छा क़दम। भारतीय क़ानून में “डिजिटल अरेस्ट” जैसा कुछ नहीं होता।',
  'Everybody says that. Maybe your identity was misused. Then you must cooperate to prove your innocence.':
    'सब यही कहते हैं। हो सकता है आपकी पहचान का ग़लत इस्तेमाल हुआ हो। तब तो बेगुनाही साबित करने के लिए आपको सहयोग करना होगा।',
  'This is a matter of national security. You are under DIGITAL ARREST. Do not disconnect. Do not tell anyone, not even your family. Keep your camera on.':
    'यह राष्ट्रीय सुरक्षा का मामला है। आप डिजिटल अरेस्ट में हैं। कॉल मत काटिए। किसी को मत बताइए, परिवार को भी नहीं। कैमरा चालू रखिए।',
  'Okay. I will stay on the call.': 'ठीक है। मैं कॉल पर रहूँगा।',
  '“Tell no one” isolates you, so nobody can tell you it is a scam.': '“किसी को मत बताना” आपको अकेला कर देता है, ताकि कोई आपको न बता सके कि यह स्कैम है।',
  'Wait, I will call my son first.': 'रुकिए, मैं पहले अपने बेटे को कॉल करता हूँ।',
  'Talking to someone you trust breaks the spell. Scammers fear this most.': 'किसी भरोसेमंद से बात करते ही जादू टूट जाता है। स्कैमर इसी से सबसे ज़्यादा डरते हैं।',
  'Disconnect and call 1930.': 'कॉल काटें और 1930 पर कॉल करें।',
  'Right. You never need permission to end a call.': 'सही। कॉल काटने के लिए किसी की इजाज़त की ज़रूरत नहीं होती।',
  'No time for that. If you disconnect, a non-bailable warrant will be issued and police will reach your home in 2 hours.':
    'इतना समय नहीं है। कॉल काटी तो ग़ैर-ज़मानती वारंट जारी होगा और 2 घंटे में पुलिस आपके घर पहुँच जाएगी।',
  'From this moment you are under DIGITAL ARREST. Stay on camera. Tell no one.': 'इस पल से आप डिजिटल अरेस्ट में हैं। कैमरे के सामने रहिए। किसी को मत बताइए।',
  'Threats of instant arrest are designed to freeze you. Real police do not work this way.':
    'तुरंत गिरफ़्तारी की धमकी आपको डराकर जड़ करने के लिए होती है। असली पुलिस ऐसे काम नहीं करती।',
  'Talking to someone you trust breaks the spell.': 'किसी भरोसेमंद से बात करते ही जादू टूट जाता है।',
  '(shouting) If you tell anyone, they will also be arrested as accomplices! This case is CONFIDENTIAL!':
    '(चिल्लाते हुए) किसी को बताया तो वे भी साथी मानकर गिरफ़्तार होंगे! यह केस गोपनीय है!',
  'I am scared. I will stay quiet.': 'मुझे डर लग रहा है। मैं चुप रहूँगा।',
  'Fear of putting family in danger is a deliberate tactic.': 'परिवार को ख़तरे में डालने का डर जानबूझकर पैदा किया जाता है।',
  'Hang up and call my son anyway.': 'फिर भी कॉल काटकर बेटे को फ़ोन करें।',
  'Exactly. The louder the threat, the more sure you can be it is fake.': 'बिल्कुल। धमकी जितनी तेज़, उतना पक्का कि मामला नकली है।',
  'Two hours pass. A “senior CBI officer” joins the call and shows you an “arrest warrant” with stamps and signatures.':
    'दो घंटे बीत जाते हैं। एक “वरिष्ठ CBI अधिकारी” कॉल में जुड़ता है और मुहर-हस्ताक्षर वाला “गिरफ़्तारी वारंट” दिखाता है।',
  'Senior officer': 'वरिष्ठ अधिकारी',
  'To prove your innocence, transfer your savings to an RBI-verified safe account for checking. It will be returned within 24 hours after clearance.':
    'बेगुनाही साबित करने के लिए अपनी बचत जाँच हेतु RBI-सत्यापित सेफ़ खाते में ट्रांसफ़र कीजिए। क्लियरेंस के बाद 24 घंटे में लौटा दी जाएगी।',
  'Transfer ₹6,50,000 from my fixed deposits.': 'अपनी FD से ₹6,50,000 ट्रांसफ़र करें।',
  'No agency ever asks you to move money to a “safe” or “verification” account.': 'कोई भी एजेंसी पैसा “सेफ़” या “वेरिफ़िकेशन” खाते में भेजने को नहीं कहती।',
  'Ask them to send the warrant to my local police station.': 'कहें कि वारंट मेरे स्थानीय थाने में भेजें।',
  'Good: you are moving things to a channel you control.': 'अच्छा: आप बात को ऐसी जगह ले जा रहे हैं जो आपके नियंत्रण में है।',
  'End the call and dial 1930.': 'कॉल ख़त्म करें और 1930 डायल करें।',
  'Late, but right.': 'देर से, पर सही।',
  'You are refusing to cooperate with the CBI? Your accounts will be frozen and your pension stopped. Last chance.':
    'आप CBI से सहयोग करने से मना कर रहे हैं? आपके खाते फ़्रीज़ होंगे और पेंशन बंद होगी। आख़िरी मौका।',
  'Transfer the money.': 'पैसे ट्रांसफ़र करें।',
  'Escalating threats when you push back are a sure sign of a scam.': 'मना करने पर धमकियों का बढ़ना स्कैम का पक्का संकेत है।',
  'Disconnect. Call 1930 and my bank.': 'कॉल काटें। 1930 और अपने बैंक को कॉल करें।',
  'Right call, even after hours of pressure.': 'घंटों के दबाव के बाद भी सही फ़ैसला।',
  'Call ended. You report the number on 1930.': 'कॉल ख़त्म। आप 1930 पर उस नंबर की शिकायत करते हैं।',
  'Off the call in under a minute': 'एक मिनट से पहले कॉल से बाहर',
  'You did not argue, you did not explain, you just left. Police do not arrest anyone over video calls, and no one can keep you on one.':
    'आपने न बहस की, न सफ़ाई दी, बस कॉल छोड़ दी। पुलिस वीडियो कॉल पर किसी को गिरफ़्तार नहीं करती, और कोई आपको कॉल पर रोक नहीं सकता।',
  'Call ended. Your son confirms it is a well-known scam. You report the number on 1930.':
    'कॉल ख़त्म। आपका बेटा बताता है कि यह जाना-माना स्कैम है। आप 1930 पर नंबर की शिकायत करते हैं।',
  'You broke the spell': 'आपने जादू तोड़ दिया',
  'The moment you stepped outside the call, the pressure fell apart. That is why “tell no one” is the scammer’s most important rule.':
    'कॉल से बाहर क़दम रखते ही दबाव ख़त्म हो गया। इसीलिए “किसी को मत बताना” स्कैमर का सबसे ज़रूरी नियम है।',
  'Call ended. You call 1930 and your bank.': 'कॉल ख़त्म। आप 1930 और अपने बैंक को कॉल करते हैं।',
  'Safe, but it was close': 'बच गए, पर बाल-बाल',
  'You lost nothing, but you spent hours under pressure. Next time, hang up the moment you hear “digital arrest”.':
    'आपका कुछ नहीं गया, पर आप घंटों दबाव में रहे। अगली बार “डिजिटल अरेस्ट” सुनते ही कॉल काट दीजिए।',
  'The transfer goes through. The call ends. The “officers” stop answering.': 'ट्रांसफ़र हो जाता है। कॉल ख़त्म। “अफ़सर” जवाब देना बंद कर देते हैं।',
  '₹6,50,000 gone': '₹6,50,000 गए',
  'The “safe account” was a mule account. Within minutes, the money moved through many other accounts. Calling 1930 straight away gives the best chance of freezing some of it.':
    '“सेफ़ खाता” असल में म्यूल खाता था। कुछ ही मिनटों में पैसा कई खातों से होकर निकल गया। तुरंत 1930 पर कॉल करने से उसका कुछ हिस्सा रुकने की सबसे अच्छी संभावना है।',
  'Police on a video call': 'वीडियो कॉल पर पुलिस',
  'Police, CBI, customs and courts do not question or arrest anyone over WhatsApp or Skype.':
    'पुलिस, CBI, कस्टम या अदालतें WhatsApp या Skype पर किसी से पूछताछ या गिरफ़्तारी नहीं करतीं।',
  '“Digital arrest”': '“डिजिटल अरेस्ट”',
  'It does not exist in Indian law. The phrase alone tells you it is a scam.': 'भारतीय क़ानून में ऐसा कुछ नहीं है। यह शब्द ही बता देता है कि यह स्कैम है।',
  '“Tell no one”': '“किसी को मत बताना”',
  'Real investigations never stop you talking to family or a lawyer. Isolation is the scam.':
    'असली जाँच आपको परिवार या वकील से बात करने से कभी नहीं रोकती। अकेला करना ही स्कैम है।',
  'Money to “prove innocence”': '“बेगुनाही साबित करने” के लिए पैसा',
  'No agency asks you to transfer money to a “safe” or “verification” account.': 'कोई एजेंसी “सेफ़” या “वेरिफ़िकेशन” खाते में पैसा भेजने को नहीं कहती।',
  'Props and paperwork': 'दिखावटी सामान और काग़ज़',
  'Uniforms, emblems, warrants and stamps are cheap to fake on camera.': 'वर्दी, चिह्न, वारंट और मुहरें कैमरे पर आसानी से नकली बनाई जा सकती हैं।',
  'Disconnect. You never need permission to end a call.': 'कॉल काटिए। कॉल ख़त्म करने के लिए किसी की इजाज़त नहीं चाहिए।',
  'Tell a family member or friend straight away.': 'तुरंत परिवार के किसी सदस्य या दोस्त को बताइए।',
  'Call 1930 or report at cybercrime.gov.in. Report the number on Sanchar Saathi (Chakshu).':
    '1930 पर कॉल करें या cybercrime.gov.in पर शिकायत करें। संचार साथी (चक्षु) पर नंबर की शिकायत करें।',
  'If you sent money, call your bank immediately.': 'अगर पैसे भेज दिए हैं, तो तुरंत अपने बैंक को कॉल करें।',
  'Digital arrest scams': 'डिजिटल अरेस्ट स्कैम',

  'Real or Deepfake?': 'असली या डीपफेक?',
  'Seven videos, voice notes and messages. Which ones would you trust?': 'सात वीडियो, वॉइस नोट और संदेश। आप किस पर भरोसा करेंगे?',
  'Seven clips and messages. Which ones are real?': 'सात क्लिप और संदेश। इनमें असली कौन-से हैं?',
  'Sponsored ad · @MarketMasterIndia': 'प्रायोजित विज्ञापन · @MarketMasterIndia',
  'Famous industrialist “R. K. Bansal” on camera': 'कैमरे पर मशहूर उद्योगपति “आर. के. बंसल”',
  '“I personally made 300% in three months with QuantumTrade AI. The government doesn’t want you to know. Register today, only 500 slots left.” (Comments turned off.)':
    '“मैंने ख़ुद QuantumTrade AI से तीन महीने में 300% कमाया। सरकार नहीं चाहती कि आपको पता चले। आज ही रजिस्टर करें, सिर्फ़ 500 जगहें बाक़ी।” (कमेंट बंद हैं।)',
  'A celebrity endorsing a trading app with huge returns is the most common deepfake ad. Scarcity (“500 slots”) and disabled comments are extra tells. Judge the claim, not the video quality.':
    'किसी सेलिब्रिटी का भारी रिटर्न वाले ट्रेडिंग ऐप का प्रचार करना सबसे आम डीपफेक विज्ञापन है। “500 जगहें” जैसी कमी और बंद कमेंट और भी संकेत हैं। वीडियो की क्वालिटी नहीं, दावे को परखिए।',
  'WhatsApp voice note · +44 7XXX XXX210': 'WhatsApp वॉइस नोट · +44 7XXX XXX210',
  'It sounds exactly like your grandson Rohan': 'आवाज़ बिल्कुल आपके पोते रोहन जैसी है',
  '“Dadi, it’s me! I’ve had an accident, I’m at the police station… Please don’t tell Papa. Send ₹50,000 to this UPI ID, I’ll explain later. Please hurry!”':
    '“दादी, मैं हूँ! मेरा एक्सीडेंट हो गया है, मैं थाने में हूँ… प्लीज़ पापा को मत बताना। इस UPI ID पर ₹50,000 भेज दो, बाद में समझाऊँगा। जल्दी करो!”',
  'Unknown number, emergency, secrecy and urgency: the classic family-emergency scam. AI can clone a voice from a few seconds of video. Call Rohan or his parents on the number you already have.':
    'अनजान नंबर, इमरजेंसी, राज़ और जल्दबाज़ी: यह क्लासिक “परिवार पर मुसीबत” वाला स्कैम है। AI कुछ सेकंड के वीडियो से आवाज़ की नकल बना सकता है। रोहन या उसके माता-पिता को उसी नंबर पर कॉल कीजिए जो आपके पास पहले से है।',
  '₹2,000 debited from A/c XX4417 on 12-Nov via UPI to Kirana Store. Not you? Call the number on the back of your card or block it in the Nimbus app.':
    '12-नवंबर को खाते XX4417 से UPI द्वारा Kirana Store को ₹2,000 कटे। आपने नहीं किया? कार्ड के पीछे लिखे नंबर पर कॉल करें या Nimbus ऐप में ब्लॉक करें।',
  'It is an alert, not a request. No link, no OTP, no payment, and it sends you to channels you already trust. If unsure, open your bank app yourself and check.':
    'यह सूचना है, माँग नहीं। न लिंक, न OTP, न भुगतान, और यह आपको उन्हीं रास्तों पर भेजती है जिन पर आप पहले से भरोसा करते हैं। शक हो तो ख़ुद बैंक ऐप खोलकर देखिए।',
  'WhatsApp · +91 9XXXX XXX88': 'WhatsApp · +91 9XXXX XXX88',
  '“SEBI notice” PDF with logo and stamp': 'लोगो और मुहर वाला “SEBI नोटिस” PDF',
  '“Your demat account is under investigation for suspicious trading. Pay a penalty of ₹25,000 within 24 hours to avoid freezing and arrest. Pay to: sebi.penalty@upi”':
    '“संदिग्ध ट्रेडिंग के लिए आपके डीमैट खाते की जाँच चल रही है। फ़्रीज़ और गिरफ़्तारी से बचने के लिए 24 घंटे में ₹25,000 का जुर्माना भरें। भुगतान करें: sebi.penalty@upi”',
  'Regulators do not send notices over WhatsApp or collect penalties through a UPI ID. Logos and legal language are easy to copy. Check real orders on sebi.gov.in.':
    'रेगुलेटर WhatsApp पर नोटिस नहीं भेजते और UPI ID से जुर्माना नहीं लेते। लोगो और क़ानूनी भाषा की नकल आसान है। असली आदेश sebi.gov.in पर देखें।',
  'Your depository · Consolidated Account Statement': 'आपकी डिपॉज़िटरी · कंसॉलिडेटेड अकाउंट स्टेटमेंट',
  'Your CAS for October is attached as a password-protected PDF. It lists holdings and transactions across your demat accounts. If you see any transaction you did not make, contact your DP.':
    'अक्टूबर का आपका CAS पासवर्ड-सुरक्षित PDF के रूप में संलग्न है। इसमें आपके सभी डीमैट खातों की होल्डिंग और लेन-देन हैं। कोई लेन-देन जो आपने नहीं किया, दिखे तो अपने DP से संपर्क करें।',
  'No login link, no OTP, no payment request. It asks you to check and report, which is exactly what a real statement does.':
    'न लॉग-इन लिंक, न OTP, न पैसे की माँग। यह जाँचने और शिकायत करने को कहता है, असली स्टेटमेंट ठीक यही करता है।',
  'Forwarded many times': 'कई बार फ़ॉरवर्ड किया गया',
  'A well-known news anchor announces a “government scheme”': 'एक जाने-माने न्यूज़ एंकर द्वारा “सरकारी योजना” की घोषणा',
  '“Breaking: the Finance Ministry has launched a new AI trading scheme. Invest ₹21,000 and earn ₹1,50,000 every month. Register on the link below.”':
    '“ब्रेकिंग: वित्त मंत्रालय ने नई AI ट्रेडिंग योजना शुरू की है। ₹21,000 लगाइए और हर महीने ₹1,50,000 कमाइए। नीचे दिए लिंक पर रजिस्टर करें।”',
  'No government scheme promises returns like that. Forwarded clips have no source. Check on official sites or PIB Fact Check before believing or forwarding.':
    'कोई सरकारी योजना ऐसे रिटर्न का वादा नहीं करती। फ़ॉरवर्ड की गई क्लिप का कोई स्रोत नहीं होता। भरोसा या फ़ॉरवर्ड करने से पहले आधिकारिक साइट या PIB फ़ैक्ट चेक पर देखें।',
  'Saved contact · Rohan (grandson)': 'सेव किया संपर्क · रोहन (पोता)',
  'You called him back yourself': 'आपने ख़ुद उसे वापस कॉल किया',
  'After the strange voice note, you call Rohan on his usual number. He picks up: “Dadi, that wasn’t me! I’m at college. Someone must have copied my voice from my videos.”':
    'अजीब वॉइस नोट के बाद आप रोहन को उसके रोज़ वाले नंबर पर कॉल करती हैं। वह कहता है: “दादी, वो मैं नहीं था! मैं कॉलेज में हूँ। किसी ने मेरे वीडियो से मेरी आवाज़ की नकल की होगी।”',
  'You started the call, on a number you already had. Calling back is the strongest check against any deepfake.':
    'कॉल आपने की, उस नंबर पर जो आपके पास पहले से था। वापस कॉल करना किसी भी डीपफेक के ख़िलाफ़ सबसे मज़बूत जाँच है।',
  'Judge the request, not the face': 'चेहरा नहीं, माँग को परखिए',
  'Deepfakes are getting too good to spot by eye. Ask what they want: money, OTPs, installs?':
    'डीपफेक इतने अच्छे हो रहे हैं कि आँखों से पकड़ना मुश्किल है। पूछिए, वे चाहते क्या हैं: पैसा, OTP, ऐप इंस्टॉल?',
  'Urgency and secrecy': 'जल्दबाज़ी और राज़',
  '“Hurry” and “don’t tell anyone” are the same in every scam, with or without AI.': '“जल्दी करो” और “किसी को मत बताना” हर स्कैम में होते हैं, AI हो या न हो।',
  'Too good to be true': 'सच होने के लिए बहुत अच्छा',
  'Celebrities and governments do not hand out 300% returns.': 'सेलिब्रिटी और सरकारें 300% रिटर्न नहीं बाँटतीं।',
  'Unknown number, familiar voice': 'अनजान नंबर, जानी-पहचानी आवाज़',
  'A new number plus a known voice is a reason to call back, not to pay.': 'नया नंबर और जानी-पहचानी आवाज़: यह वापस कॉल करने की वजह है, पैसे भेजने की नहीं।',
  'Call back on a number you already have.': 'उसी नंबर पर वापस कॉल करें जो आपके पास पहले से है।',
  'Agree a family safe word for real emergencies.': 'असली इमरजेंसी के लिए परिवार में एक गुप्त कोड-शब्द तय करें।',
  'Check “government schemes” on official sites or PIB Fact Check.': '“सरकारी योजनाओं” को आधिकारिक साइट या PIB फ़ैक्ट चेक पर जाँचें।',
  'Report fake ads on the platform and fraud on cybercrime.gov.in or 1930.': 'नकली विज्ञापन की शिकायत प्लेटफ़ॉर्म पर और धोखाधड़ी की cybercrime.gov.in या 1930 पर करें।',
  'Deepfakes and voice clones': 'डीपफेक और नकली आवाज़ें',

  'The Pension Call': 'पेंशन वाली कॉल',
  'It is life-certificate month. “Your pension will stop unless…”': 'जीवन प्रमाण पत्र का महीना है। “आपकी पेंशन बंद हो जाएगी, अगर…”',
  'Your pension will stop, unless you read out an OTP.': 'आपकी पेंशन बंद हो जाएगी, अगर आपने OTP नहीं बताया।',
  'Pension Department': 'पेंशन विभाग',
  'Incoming call · +91 70XXXXXX12': 'आती हुई कॉल · +91 70XXXXXX12',
  'You are 68, a retired teacher. It is November, when many pensioners submit their annual life certificate. Your phone rings.':
    'आप 68 साल के सेवानिवृत्त शिक्षक हैं। नवंबर का महीना है, जब कई पेंशनभोगी अपना सालाना जीवन प्रमाण पत्र जमा करते हैं। आपका फ़ोन बजता है।',
  Caller: 'कॉलर',
  'Namaste ji. I am calling from the Pension Department, Treasury Office. Your life certificate is not updated in our system. Your pension will stop from next month.':
    'नमस्ते जी। मैं पेंशन विभाग, ट्रेज़री ऑफ़िस से बोल रहा हूँ। हमारे सिस्टम में आपका जीवन प्रमाण पत्र अपडेट नहीं है। अगले महीने से आपकी पेंशन बंद हो जाएगी।',
  'Don’t worry, I can update it for you right now on the phone. No need to go to the bank.':
    'घबराइए मत, मैं अभी फ़ोन पर ही अपडेट कर देता हूँ। बैंक जाने की ज़रूरत नहीं।',
  'Oh no! Please update it. What do you need?': 'अरे नहीं! कृपया अपडेट कर दीजिए। क्या चाहिए?',
  'The threat of losing your pension is designed to make you panic and comply.': 'पेंशन जाने की धमकी आपको घबराकर बात मानने पर मजबूर करने के लिए होती है।',
  'I will go to my bank or use Jeevan Pramaan myself.': 'मैं ख़ुद बैंक जाऊँगा या जीवन प्रमाण का इस्तेमाल करूँगा।',
  'Good: you chose a route you control.': 'अच्छा: आपने वह रास्ता चुना जो आपके नियंत्रण में है।',
  'Which office? What is your name?': 'कौन-सा दफ़्तर? आपका नाम क्या है?',
  'Questions are good, but whatever the caller answers proves nothing.': 'सवाल पूछना अच्छा है, पर कॉलर जो भी जवाब दे, उससे कुछ साबित नहीं होता।',
  'Ramesh Kumar, Senior Clerk, District Treasury. Employee ID TR-4471. I am government staff, you can trust me.':
    'रमेश कुमार, वरिष्ठ लिपिक, ज़िला ट्रेज़री। कर्मचारी ID TR-4471। मैं सरकारी कर्मचारी हूँ, आप मुझ पर भरोसा कर सकते हैं।',
  'I already have your pension number and bank details. I just need to verify one thing.':
    'आपका पेंशन नंबर और बैंक विवरण मेरे पास पहले से है। बस एक चीज़ की पुष्टि करनी है।',
  'Okay. What do you need?': 'ठीक है। क्या चाहिए?',
  'Knowing your details proves nothing. Data leaks all the time.': 'आपकी जानकारी होना कुछ साबित नहीं करता। डेटा लीक होता रहता है।',
  'I will call the treasury office myself, on the number in my pension papers.': 'मैं अपने पेंशन काग़ज़ों में लिखे नंबर पर ख़ुद ट्रेज़री ऑफ़िस को कॉल करूँगा।',
  'Perfect. Call back on a number you found yourself.': 'बढ़िया। उसी नंबर पर कॉल करें जो आपने ख़ुद ढूँढा हो।',
  'Ji, the bank system is down for pensioners this month. Only phone verification is working. It takes just 2 minutes.':
    'जी, इस महीने पेंशनभोगियों के लिए बैंक का सिस्टम बंद है। सिर्फ़ फ़ोन से सत्यापन चल रहा है। बस 2 मिनट लगेंगे।',
  'Alright, quickly then.': 'ठीक है, जल्दी कीजिए।',
  '“The system is down” is a made-up reason to keep you away from real channels.': '“सिस्टम बंद है” आपको असली रास्तों से दूर रखने का गढ़ा हुआ बहाना है।',
  'No. I will go in person.': 'नहीं। मैं ख़ुद जाऊँगा।',
  'Exactly. A genuine office will be there tomorrow.': 'बिल्कुल। असली दफ़्तर कल भी वहीं रहेगा।',
  'Please tell me your Aadhaar number and date of birth for verification.': 'सत्यापन के लिए कृपया अपना आधार नंबर और जन्मतिथि बताइए।',
  'Now you will get an OTP. Read it to me to complete your life certificate.': 'अब आपको एक OTP आएगा। जीवन प्रमाण पत्र पूरा करने के लिए मुझे पढ़कर सुनाइए।',
  'SMS: “OTP 482913 to ADD BENEFICIARY to a/c XX2210. Do not share with anyone. -Your Bank”':
    'SMS: “खाता XX2210 में नया लाभार्थी (ADD BENEFICIARY) जोड़ने के लिए OTP 482913। किसी से साझा न करें। -आपका बैंक”',
  'Read out the OTP.': 'OTP पढ़कर सुना दें।',
  'An OTP authorises an action on your account. Here, adding someone who can receive your money.':
    'OTP आपके खाते पर किसी काम की अनुमति देता है। यहाँ, किसी ऐसे को जोड़ने की जो आपका पैसा पा सके।',
  'Wait, the SMS says “add beneficiary”, not life certificate!': 'रुकिए, SMS में “लाभार्थी जोड़ना” लिखा है, जीवन प्रमाण पत्र नहीं!',
  'Reading what an OTP is for is a superpower. It told you exactly what was happening.': 'OTP किस लिए है, यह पढ़ लेना एक सुपरपावर है। उसने साफ़ बता दिया कि क्या हो रहा था।',
  'That is the bank’s standard message, ji. All pensioners get the same. Quickly, the OTP will expire and your pension will be blocked!':
    'यह तो बैंक का सामान्य संदेश है जी। सब पेंशनभोगियों को यही आता है। जल्दी कीजिए, OTP की मियाद ख़त्म हो जाएगी और पेंशन रुक जाएगी!',
  'More urgency after you spot a problem is a sure sign of a scam.': 'गड़बड़ पकड़ने के बाद और जल्दबाज़ी करवाना स्कैम का पक्का संकेत है।',
  'Hang up and call my bank’s official number.': 'कॉल काटकर बैंक के आधिकारिक नंबर पर कॉल करें।',
  'Right. Trust what the SMS says, not what the caller says about it.': 'सही। SMS जो कहता है उस पर भरोसा करें, कॉलर जो उसके बारे में कहे उस पर नहीं।',
  'You hang up. At the bank the next day, the staff confirm your life certificate is due by 30 November and take it in two minutes.':
    'आप कॉल काट देते हैं। अगले दिन बैंक में कर्मचारी बताते हैं कि जीवन प्रमाण पत्र 30 नवंबर तक जमा होना है, और दो मिनट में ले लेते हैं।',
  'Pension safe, savings safe': 'पेंशन सुरक्षित, बचत सुरक्षित',
  'You chose the route you control: your branch, Jeevan Pramaan, or a number from your own papers. That one habit beats almost every phone scam.':
    'आपने वह रास्ता चुना जो आपके नियंत्रण में है: अपनी शाखा, जीवन प्रमाण, या अपने काग़ज़ों का नंबर। यही एक आदत लगभग हर फ़ोन स्कैम को हरा देती है।',
  'You hang up and call your bank. They block the new-beneficiary request.': 'आप कॉल काटकर बैंक को फ़ोन करते हैं। वे नया लाभार्थी जोड़ने का अनुरोध रोक देते हैं।',
  'Saved at the last step': 'आख़िरी क़दम पर बच गए',
  'Your money is safe, but you shared your Aadhaar number and date of birth. Expect more calls, and tell your bank so they can watch your account.':
    'आपका पैसा सुरक्षित है, पर आपने आधार नंबर और जन्मतिथि बता दी। और कॉल आ सकती हैं, इसलिए बैंक को बताइए ताकि वे आपके खाते पर नज़र रखें।',
  'Ten minutes later: “₹1,80,000 transferred to new beneficiary.” The caller’s number is switched off.':
    'दस मिनट बाद: “₹1,80,000 नए लाभार्थी को ट्रांसफ़र।” कॉलर का नंबर बंद है।',
  '₹1,80,000 gone': '₹1,80,000 गए',
  'The OTP did not update anything. It let the scammer add a beneficiary and move your savings. Call your bank and 1930 immediately: speed improves the chance of freezing the money.':
    'OTP से कुछ अपडेट नहीं हुआ। उससे स्कैमर ने लाभार्थी जोड़कर आपकी बचत निकाल ली। तुरंत बैंक और 1930 को कॉल करें: जितनी जल्दी, पैसा रुकने की उतनी संभावना।',
  '“Your pension will stop”': '“आपकी पेंशन बंद हो जाएगी”',
  'Fear of losing income is used to make you act before you think.': 'आमदनी खोने का डर इसलिए डाला जाता है कि आप सोचने से पहले क़दम उठा लें।',
  '“I can do it on the phone”': '“मैं फ़ोन पर ही कर दूँगा”',
  'Life certificates go through your bank, pension office, doorstep banking or Jeevan Pramaan, never by reading out an OTP.':
    'जीवन प्रमाण पत्र बैंक, पेंशन ऑफ़िस, डोरस्टेप बैंकिंग या जीवन प्रमाण से जमा होता है, OTP बताकर कभी नहीं।',
  'They already knew your details': 'उन्हें आपकी जानकारी पहले से थी',
  'Leaked data is not proof. Anyone can buy it.': 'लीक हुआ डेटा सबूत नहीं है। उसे कोई भी ख़रीद सकता है।',
  '“The system is down”': '“सिस्टम बंद है”',
  'A made-up reason to keep you away from the real channels.': 'आपको असली रास्तों से दूर रखने का गढ़ा हुआ बहाना।',
  'The OTP said “add beneficiary”': 'OTP में “लाभार्थी जोड़ना” लिखा था',
  'OTP messages say what they authorise. Always read them fully.': 'OTP संदेश बताते हैं कि वे किस काम की अनुमति दे रहे हैं। उन्हें हमेशा पूरा पढ़ें।',
  'Hang up. Call your bank or pension office on the number in your passbook or papers.':
    'कॉल काटिए। पासबुक या काग़ज़ों में लिखे नंबर पर बैंक या पेंशन ऑफ़िस को कॉल कीजिए।',
  'Never read out an OTP, PIN or password to anyone.': 'OTP, PIN या पासवर्ड किसी को कभी न बताएँ।',
  'If you shared an OTP, call your bank and 1930 straight away.': 'अगर OTP बता दिया है, तो तुरंत बैंक और 1930 को कॉल करें।',
  'Tell a family member, and warn friends who also draw a pension.': 'परिवार को बताइए, और पेंशन पाने वाले दोस्तों को भी सावधान कीजिए।',
  'Pension and KYC scams': 'पेंशन और KYC स्कैम',

  'The Tip Group': 'टिप्स वाला ग्रुप',
  'You have been added to a “VIP stock tips” group. Can you resist the rocket?': 'आपको एक “VIP स्टॉक टिप्स” ग्रुप में जोड़ा गया है। क्या आप रॉकेट के लालच से बच पाएँगे?',
  'A VIP stock-tips group, and a rocket about to fall.': 'एक VIP स्टॉक-टिप्स ग्रुप, और गिरने वाला एक रॉकेट।',
  'Smart Money Insiders VIP': 'Smart Money Insiders VIP',
  '1,247 members': '1,247 सदस्य',
  'Someone you don’t know added you to a WhatsApp group.': 'किसी अनजान ने आपको एक WhatsApp ग्रुप में जोड़ दिया।',
  'Prof. A. Sharma (Admin)': 'प्रो. ए. शर्मा (एडमिन)',
  'Welcome! I am a SEBI-registered expert with 20 years of experience. Our members made 40% last month. 🔥':
    'स्वागत है! मैं 20 साल के अनुभव वाला SEBI-रजिस्टर्ड एक्सपर्ट हूँ। पिछले महीने हमारे सदस्यों ने 40% कमाया। 🔥',
  'Thank you sir!! Made ₹38,000 profit last week on your tip 🙏🙏': 'धन्यवाद सर!! आपकी टिप से पिछले हफ़्ते ₹38,000 का मुनाफ़ा हुआ 🙏🙏',
  'Tomorrow’s call is FREE for new members. Strictly confidential. 🚀': 'कल की कॉल नए सदस्यों के लिए मुफ़्त है। पूरी तरह गोपनीय। 🚀',
  'Stay and see the free tip.': 'रुककर मुफ़्त टिप देखें।',
  'Nothing lost yet, but you are now inside a sales funnel.': 'अभी कुछ नहीं गया, पर अब आप उनकी बिक्री वाली कीप में हैं।',
  'Check if “Prof. A. Sharma” is really SEBI-registered.': 'जाँचें कि “प्रो. ए. शर्मा” सच में SEBI-रजिस्टर्ड हैं या नहीं।',
  'The best first move. Registration is public and takes two minutes to check.': 'सबसे अच्छा पहला क़दम। रजिस्ट्रेशन सार्वजनिक है और जाँचने में दो मिनट लगते हैं।',
  'Exit and report the group.': 'ग्रुप छोड़ें और शिकायत करें।',
  'Strangers adding you to “VIP” groups is reason enough to leave.': 'अनजान लोगों का आपको “VIP” ग्रुप में जोड़ना ही छोड़ने के लिए काफ़ी वजह है।',
  'You search SEBI’s lists of registered investment advisers and research analysts. The registration number he posted belongs to someone else.':
    'आप SEBI की रजिस्टर्ड निवेश सलाहकारों और रिसर्च एनालिस्ट की सूची में खोजते हैं। उसने जो रजिस्ट्रेशन नंबर डाला, वह किसी और का है।',
  'Many fake people use my name 😊 that’s why I verify only inside the group. Tomorrow ZENTRA target ₹30!':
    'बहुत से नकली लोग मेरे नाम का इस्तेमाल करते हैं 😊 इसीलिए मैं सिर्फ़ ग्रुप के अंदर वेरिफ़ाई करता हूँ। कल ZENTRA का टारगेट ₹30!',
  'He seems confident. I will try a small amount.': 'वह भरोसेमंद लग रहा है। थोड़ी रकम से आज़माता हूँ।',
  'You had proof he was lying, and his confidence still pulled you back in. That is how it works.':
    'आपके पास सबूत था कि वह झूठ बोल रहा है, फिर भी उसके आत्मविश्वास ने आपको खींच लिया। यह ऐसे ही काम करता है।',
  'Exit and report.': 'छोड़ें और शिकायत करें।',
  'You checked, found a lie, and acted on it.': 'आपने जाँचा, झूठ पकड़ा, और उस पर अमल किया।',
  '🚨 BUY ZENTRA AGRO NOW. Target ₹30 in 5 days. Big news coming. Buy before 10:15!':
    '🚨 ZENTRA AGRO अभी ख़रीदें। 5 दिन में टारगेट ₹30। बड़ी ख़बर आने वाली है। 10:15 से पहले ख़रीदें!',
  'Bought 5,000 shares!! 🚀🚀': '5,000 शेयर ख़रीद लिए!! 🚀🚀',
  'Already up 18% 😍': 'अभी से 18% ऊपर 😍',
  'Buy ₹20,000 worth.': '₹20,000 के शेयर ख़रीदें।',
  'Buying on a group’s urgent “call” is exactly how a pump-and-dump works. The early buyers are the operators.':
    'ग्रुप की जल्दबाज़ी वाली “कॉल” पर ख़रीदना ही पंप-एंड-डंप का तरीका है। सबसे पहले ख़रीदने वाले ख़ुद ऑपरेटर होते हैं।',
  'Just watch. Don’t buy.': 'बस देखें। ख़रीदें नहीं।',
  'Watching costs nothing, and it shows you how the trick plays out.': 'देखने में कुछ नहीं जाता, और पता चलता है कि चाल कैसे चलती है।',
  'Leaving before the pitch is the cleanest escape.': 'पिच से पहले निकल जाना सबसे साफ़ बचाव है।',
  'By noon ZENTRA hits ₹21. The group explodes with profit screenshots.': 'दोपहर तक ZENTRA ₹21 पर पहुँचता है। ग्रुप मुनाफ़े के स्क्रीनशॉट से भर जाता है।',
  'Who missed? 😢 Join PREMIUM for ₹9,999 and never miss the next multibagger.': 'किस-किस का छूट गया? 😢 ₹9,999 में PREMIUM जॉइन करें और अगला मल्टीबैगर कभी न छोड़ें।',
  'Ugh, I missed out. Buy now.': 'उफ़, मौका छूट गया। अभी ख़रीदता हूँ।',
  'Fear of missing out is the fuel. Late buyers are who the operators sell to.': 'मौका छूटने का डर ही ईंधन है। ऑपरेटर देर से ख़रीदने वालों को ही बेचते हैं।',
  'Pay ₹9,999 for Premium.': 'Premium के लिए ₹9,999 दें।',
  'Paid tips from an unregistered adviser is not allowed, and the “premium” tips are the same game.':
    'बिना रजिस्ट्रेशन वाले सलाहकार से पैसे देकर टिप्स लेना मना है, और “प्रीमियम” टिप्स भी वही खेल हैं।',
  'Something is off. Exit and report.': 'कुछ गड़बड़ है। छोड़ें और शिकायत करें।',
  'You saw the bait and still walked away.': 'आपने चारा देखा, फिर भी निकल आए।',
  'ZENTRA climbs to ₹21. On screen, your ₹20,000 is worth ₹25,000.': 'ZENTRA ₹21 तक चढ़ता है। स्क्रीन पर आपके ₹20,000 अब ₹25,000 के हैं।',
  'HOLD! Target ₹30. Don’t sell early, weak hands lose! 💎': 'HOLD करें! टारगेट ₹30। जल्दी मत बेचिए, कमज़ोर हाथ हारते हैं! 💎',
  'Hold for ₹30.': '₹30 तक रुकें।',
  '“Hold” keeps buyers in while the operators sell to them.': '“Hold” ख़रीदारों को रोके रखता है, जबकि ऑपरेटर उन्हीं को बेच रहे होते हैं।',
  'Sell now and leave the group.': 'अभी बेचें और ग्रुप छोड़ें।',
  'You got out this time. In many pump-and-dumps, the price crashes so fast that there are no buyers left.':
    'इस बार आप निकल गए। कई पंप-एंड-डंप में दाम इतनी तेज़ी से गिरते हैं कि कोई ख़रीदार ही नहीं बचता।',
  'You left the group and reported it.': 'आपने ग्रुप छोड़ा और शिकायत की।',
  'Out before the hook': 'काँटे से पहले बाहर',
  'Next morning, ZENTRA crashed from ₹21 to ₹7. Everyone who bought on the “call” lost money. You did not, because you never played.':
    'अगली सुबह ZENTRA ₹21 से ₹7 पर आ गिरा। “कॉल” पर ख़रीदने वाले सबका पैसा डूबा। आपका नहीं, क्योंकि आप खेले ही नहीं।',
  'You watched the trick and walked away': 'आपने चाल देखी और निकल आए',
  'Next morning, ZENTRA crashed to ₹7 and the group was deleted. Now you know what a pump-and-dump looks like from the inside.':
    'अगली सुबह ZENTRA ₹7 पर गिरा और ग्रुप डिलीट हो गया। अब आप जानते हैं कि पंप-एंड-डंप अंदर से कैसा दिखता है।',
  'You pay ₹9,999. The “premium” group sends tips for three days, then disappears.': 'आप ₹9,999 देते हैं। “प्रीमियम” ग्रुप तीन दिन टिप्स भेजता है, फिर ग़ायब हो जाता है।',
  '₹9,999 gone': '₹9,999 गए',
  'Selling tips without SEBI registration is not allowed, and the tips were part of the same scheme. ZENTRA crashed to ₹7 the next morning.':
    'SEBI रजिस्ट्रेशन के बिना टिप्स बेचना मना है, और वे टिप्स उसी चाल का हिस्सा थीं। अगली सुबह ZENTRA ₹7 पर गिर गया।',
  'Next morning ZENTRA opens at ₹7. The admin and most “members” have left. The group is deleted.':
    'अगली सुबह ZENTRA ₹7 पर खुलता है। एडमिन और ज़्यादातर “सदस्य” जा चुके हैं। ग्रुप डिलीट हो गया।',
  'Your ₹20,000 is now worth about ₹6,600': 'आपके ₹20,000 अब क़रीब ₹6,600 के रह गए',
  'The operators bought ZENTRA cheap, pumped it with the group, then sold to everyone who followed the “call”. Many of the excited members were their own fake accounts.':
    'ऑपरेटरों ने ZENTRA सस्ते में ख़रीदा, ग्रुप से उसका दाम चढ़ाया, फिर “कॉल” मानने वाले सबको बेच दिया। उत्साहित “सदस्यों” में से कई उन्हीं के नकली खाते थे।',
  'You sold at ₹21. Next morning ZENTRA opened at ₹7.': 'आपने ₹21 पर बेचा। अगली सुबह ZENTRA ₹7 पर खुला।',
  'You got lucky': 'आपकी क़िस्मत अच्छी थी',
  'You made money, but only because someone else bought from you at the top. In real pump-and-dumps, the price can collapse so fast that there are no buyers left. Report the group.':
    'आपने पैसे कमाए, पर सिर्फ़ इसलिए कि किसी और ने ऊँचे दाम पर आपसे ख़रीदा। असली पंप-एंड-डंप में दाम इतनी तेज़ी से गिर सकते हैं कि कोई ख़रीदार न बचे। ग्रुप की शिकायत करें।',
  'Added by a stranger': 'अनजान ने जोड़ा',
  'Legitimate advisers do not add people to WhatsApp groups without asking.': 'असली सलाहकार बिना पूछे लोगों को WhatsApp ग्रुप में नहीं जोड़ते।',
  '“SEBI-registered expert”': '“SEBI-रजिस्टर्ड एक्सपर्ट”',
  'Check the name AND the number on sebi.gov.in. Scammers borrow real numbers.': 'sebi.gov.in पर नाम और नंबर दोनों जाँचें। स्कैमर असली नंबर उधार ले लेते हैं।',
  'Profit screenshots': 'मुनाफ़े के स्क्रीनशॉट',
  'Easy to fake, and many “members” are the operators’ own accounts.': 'नकली बनाना आसान है, और कई “सदस्य” ऑपरेटरों के अपने खाते होते हैं।',
  '“Buy before 10:15!”': '“10:15 से पहले ख़रीदें!”',
  'Urgency stops you from asking why a tiny company is suddenly a rocket.': 'जल्दबाज़ी आपको यह पूछने नहीं देती कि एक छोटी-सी कंपनी अचानक रॉकेट कैसे बन गई।',
  'Small, little-known company': 'छोटी, अनजानी कंपनी',
  'Thinly traded shares are easy to push up and dump.': 'कम ख़रीद-बिक्री वाले शेयरों का दाम चढ़ाकर बेच देना आसान होता है।',
  'Paid “premium” tips': 'पैसे वाली “प्रीमियम” टिप्स',
  'Charging for advice without SEBI registration is not allowed.': 'SEBI रजिस्ट्रेशन के बिना सलाह के पैसे लेना मना है।',
  'Exit the group and report it on the platform.': 'ग्रुप छोड़ें और प्लेटफ़ॉर्म पर उसकी शिकायत करें।',
  'Never trade on tips from people you have not verified on sebi.gov.in.': 'जिन्हें sebi.gov.in पर जाँचा न हो, उनकी टिप्स पर कभी ट्रेड न करें।',
  'If you paid or lost money, report on cybercrime.gov.in or call 1930.': 'अगर पैसे दिए या गँवाए हैं, तो cybercrime.gov.in पर शिकायत करें या 1930 पर कॉल करें।',
  'Warn friends who were in the same group.': 'उसी ग्रुप में मौजूद दोस्तों को सावधान करें।',
  'Common investor scams': 'निवेशकों से होने वाले आम स्कैम',

  'Red Flag Rush': 'रेड फ़्लैग रश',
  'Three investor scams, 75 seconds. Tap every red flag before time runs out.': 'तीन निवेश स्कैम, 75 सेकंड। समय ख़त्म होने से पहले हर रेड फ़्लैग पर टैप करें।',
  'Spot the red flags before the clock runs out.': 'घड़ी रुकने से पहले रेड फ़्लैग पहचानें।',
  'Congrats! You are SELECTED for GUARANTEED allotment in Saffron Rail pre-IPO. Pay ₹9,999 processing fee to ipo.allot@upi before 6 PM to confirm your lot.':
    'बधाई हो! आप Saffron Rail के pre-IPO में GUARANTEED allotment के लिए SELECTED हुए हैं। अपना लॉट पक्का करने के लिए before 6 PM ₹9,999 की processing fee ipo.allot@upi पर भेजें।',
  'Nobody is “selected”. Allotment is by lottery after the issue closes.': 'कोई “सिलेक्ट” नहीं होता। इश्यू बंद होने के बाद अलॉटमेंट लॉटरी से होता है।',
  'IPO allotment is never guaranteed.': 'IPO अलॉटमेंट की कभी गारंटी नहीं होती।',
  '“Pre-IPO” shares sold by strangers are a common scam.': 'अजनबियों द्वारा बेचे जाने वाले “pre-IPO” शेयर एक आम स्कैम हैं।',
  'There is no fee. With ASBA your money is only blocked in your own account.': 'कोई फ़ीस नहीं होती। ASBA में आपका पैसा सिर्फ़ आपके अपने खाते में ब्लॉक होता है।',
  'A random UPI ID. Real IPO applications go through your own broker or bank.': 'कोई भी UPI ID। असली IPO आवेदन आपके अपने ब्रोकर या बैंक से होता है।',
  'Urgency so you pay before you check.': 'जल्दबाज़ी, ताकि आप जाँचने से पहले पैसे दे दें।',
  'SEBI APPROVED app 📈 Earn 12% MONTHLY, zero risk. Get an exclusive institutional account for VIP members. Download from our link: qtpro-app.apk':
    'SEBI APPROVED ऐप 📈 कमाइए 12% MONTHLY, वो भी zero risk. VIP सदस्यों के लिए ख़ास institutional account. हमारे लिंक से डाउनलोड करें: qtpro-app.apk',
  'SEBI registers firms; it does not approve apps or returns.': 'SEBI फ़र्मों को रजिस्टर करता है; वह ऐप या रिटर्न को मंज़ूरी नहीं देता।',
  'Nearly 290% a year. No honest investment promises this.': 'साल का लगभग 290%। कोई ईमानदार निवेश इसका वादा नहीं करता।',
  'Every market investment carries risk.': 'बाज़ार के हर निवेश में जोखिम होता है।',
  'Fake “institutional” accounts show fake profits, then demand fees to withdraw.': 'नकली “institutional” खाते नकली मुनाफ़ा दिखाते हैं, फिर पैसे निकालने के लिए फ़ीस माँगते हैं।',
  'App files from links skip the app store. Use official apps of registered brokers only.': 'लिंक से मिली ऐप फ़ाइलें ऐप स्टोर को दरकिनार करती हैं। सिर्फ़ रजिस्टर्ड ब्रोकरों के आधिकारिक ऐप इस्तेमाल करें।',
  'Dear Investor, your Demat account will be SUSPENDED today due to incomplete KYC. Click here to re-verify and enter the OTP sent to your phone.':
    'प्रिय निवेशक, अधूरे KYC के कारण आपका डीमैट खाता आज ही SUSPENDED हो जाएगा। दोबारा सत्यापन के लिए यहाँ क्लिक करें और फ़ोन पर आया OTP डालें।',
  'Dear Investor': 'प्रिय निवेशक',
  'SUSPENDED today': 'आज ही SUSPENDED',
  'Click here': 'यहाँ क्लिक करें',
  'enter the OTP': 'OTP डालें',
  'Not your DP’s official domain. Anyone can register a name like this.': 'यह आपके DP का आधिकारिक डोमेन नहीं है। ऐसा नाम कोई भी रजिस्टर कर सकता है।',
  'Your DP knows your name. Generic greetings suggest a mass phishing email.': 'आपका DP आपका नाम जानता है। आम-सा संबोधन थोक में भेजे गए फ़िशिंग ईमेल का संकेत है।',
  'Fear plus a deadline: the classic pressure combo.': 'डर और साथ में डेडलाइन: दबाव डालने का पुराना तरीका।',
  'Do KYC in your DP’s official app, never through a link in an email.': 'KYC अपने DP के आधिकारिक ऐप में करें, ईमेल के लिंक से कभी नहीं।',
  'An OTP on a fake page hands the scammer access to your account.': 'नकली पेज पर डाला गया OTP स्कैमर को आपके खाते तक पहुँचा देता है।',
  'Never pay a “fee” for IPO allotment or to withdraw your own money.': 'IPO अलॉटमेंट या अपना ही पैसा निकालने के लिए कभी कोई “फ़ीस” न दें।',
  'Install only official apps of SEBI-registered brokers, from the app store.': 'सिर्फ़ SEBI-रजिस्टर्ड ब्रोकरों के आधिकारिक ऐप, ऐप स्टोर से ही इंस्टॉल करें।',
  'Do KYC only in your DP’s official app or website.': 'KYC सिर्फ़ अपने DP के आधिकारिक ऐप या वेबसाइट पर करें।',
  'Report scam messages on Sanchar Saathi (Chakshu) and money lost on 1930.': 'स्कैम संदेशों की शिकायत संचार साथी (चक्षु) पर और गँवाए पैसे की 1930 पर करें।',
  'IPOs, the safe way': 'IPO, सुरक्षित तरीके से',
};
