import type { ReactNode } from 'react';

function inline(text: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
      return part;
    });
}

/** Minimal Markdown: #/##/### headings, paragraphs, - and 1. lists, **bold**, *italic*. No raw HTML. */
export function Markdown({ source, skipTitle = false }: { source: string; skipTitle?: boolean }) {
  const blocks: ReactNode[] = [];
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) blocks.push(<p key={blocks.length}>{inline(para.join(' '))}</p>);
    para = [];
  };
  const flushList = () => {
    if (list) {
      const items = list.items.map((item, i) => <li key={i}>{inline(item)}</li>);
      blocks.push(list.ordered ? <ol key={blocks.length}>{items}</ol> : <ul key={blocks.length}>{items}</ul>);
    }
    list = null;
  };

  for (const raw of source.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.trim();
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    const bullet = line.match(/^[-*]\s+(.*)$/);
    const numbered = line.match(/^\d+\.\s+(.*)$/);
    if (!line) {
      flushPara();
      flushList();
    } else if (heading) {
      flushPara();
      flushList();
      const level = heading[1].length;
      if (level === 1 && skipTitle) continue;
      const Tag = level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3';
      blocks.push(<Tag key={blocks.length}>{inline(heading[2])}</Tag>);
    } else if (bullet || numbered) {
      flushPara();
      const ordered = !!numbered;
      const current = list as { ordered: boolean; items: string[] } | null;
      if (current && current.ordered !== ordered) flushList();
      if (!list) list = { ordered, items: [] };
      (list as { ordered: boolean; items: string[] }).items.push((bullet ?? numbered)![1]);
    } else {
      flushList();
      para.push(line);
    }
  }
  flushPara();
  flushList();
  return <div className="prose">{blocks}</div>;
}
