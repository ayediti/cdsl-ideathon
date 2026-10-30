import { useCallback, useEffect, useRef } from 'react';
import { HI } from './hi';
import { useSettings, type Lang } from './settings';
import { speak } from './speech';

export type Vars = Record<string, string | number>;

const fill = (s: string, vars?: Vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k: string) => String(vars[k] ?? m)) : s);

/** Translates an English string (the dictionary key) into the given language; falls back to English. */
export function translate(lang: Lang, s: string, vars?: Vars): string {
  return fill(lang === 'hi' ? (HI[s] ?? s) : s, vars);
}

export function useT() {
  const lang = useSettings((s) => s.lang);
  return useCallback((s: string, vars?: Vars) => translate(lang, s, vars), [lang]);
}

/** Speaks `text` whenever it changes, if read-aloud is switched on. `voice` pins the voice for untranslated text. */
export function useReadAloud(text: string | null | undefined, voice?: Lang) {
  const { readAloud, lang } = useSettings();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (!readAloud || !text || last.current === text) return;
    last.current = text;
    speak(text, voice ?? lang);
  }, [readAloud, lang, voice, text]);
}
