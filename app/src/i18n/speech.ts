import type { Lang } from './settings';

const supported = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Reads text aloud with the browser's built-in voice. Queues behind anything already speaking. */
export function speak(text: string, lang: Lang) {
  if (!supported() || !text.trim()) return;
  const u = new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''));
  u.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith(u.lang.toLowerCase().slice(0, 2)));
  if (voice) u.voice = voice;
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export function stopSpeaking() {
  if (supported()) window.speechSynthesis.cancel();
}
