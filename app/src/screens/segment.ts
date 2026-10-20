export interface Segment {
  text: string;
  flagId?: string;
}

/** Splits text so each flag snippet becomes its own tappable segment. */
export function segment(text: string, flags: { id: string; snippet: string }[]): Segment[] {
  const hits = flags
    .map((f) => ({ id: f.id, start: text.indexOf(f.snippet), length: f.snippet.length }))
    .filter((h) => h.start >= 0)
    .sort((a, b) => a.start - b.start);
  const out: Segment[] = [];
  let pos = 0;
  for (const h of hits) {
    if (h.start < pos) continue;
    if (h.start > pos) out.push({ text: text.slice(pos, h.start) });
    out.push({ text: text.slice(h.start, h.start + h.length), flagId: h.id });
    pos = h.start + h.length;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}
