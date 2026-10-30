import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'en' | 'hi';

interface Settings {
  lang: Lang;
  largeText: boolean;
  readAloud: boolean;
  setLang: (lang: Lang) => void;
  toggleLargeText: () => void;
  toggleReadAloud: () => void;
}

/** Per-viewer accessibility preferences, kept in this browser only. */
export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      lang: 'en',
      largeText: false,
      readAloud: false,
      setLang: (lang) => set({ lang }),
      toggleLargeText: () => set((s) => ({ largeText: !s.largeText })),
      toggleReadAloud: () => set((s) => ({ readAloud: !s.readAloud })),
    }),
    { name: 'finsim-settings-v1' },
  ),
);

/** Mirrors the settings onto <html> so CSS and screen readers can follow them. */
export function applySettings({ lang, largeText }: Pick<Settings, 'lang' | 'largeText'>) {
  const root = document.documentElement;
  root.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
  root.dataset.size = largeText ? 'large' : 'normal';
}
