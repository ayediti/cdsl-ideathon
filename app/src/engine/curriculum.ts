import { orientation } from '../content/m0_orientation';
import { basics } from '../content/m1_basics';
import { demat } from '../content/m2_demat';
import type { Chapter, Module } from './types';

export const MODULES: Module[] = [orientation, basics, demat];
export const ALL_CHAPTERS: Chapter[] = MODULES.flatMap((m) => m.chapters);

export const chapterKey = (c: Pick<Chapter, 'moduleId' | 'id'>) => `${c.moduleId}/${c.id}`;

export function getModule(moduleId: string): Module | undefined {
  return MODULES.find((m) => m.id === moduleId);
}

export function getChapter(moduleId: string, chapterId: string): Chapter | undefined {
  return ALL_CHAPTERS.find((c) => c.moduleId === moduleId && c.id === chapterId);
}

export function screenPath(c: Chapter, screenId: string = c.screenSequence[0]): string {
  return `/play/${c.moduleId}/${c.id}/${screenId}`;
}

export function nextChapter(c: Chapter): Chapter | null {
  return ALL_CHAPTERS[ALL_CHAPTERS.indexOf(c) + 1] ?? null;
}

if (import.meta.env.DEV) {
  for (const c of ALL_CHAPTERS) {
    for (const id of c.screenSequence) {
      if (!c.screens[id]) console.error(`[curriculum] ${chapterKey(c)} lists missing screen "${id}"`);
    }
  }
}
