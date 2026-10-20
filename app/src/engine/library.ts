const files = import.meta.glob('../content/library/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Article {
  slug: string;
  title: string;
  body: string;
}

export const ARTICLES: Article[] = Object.entries(files)
  .map(([path, body]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const heading = body.match(/^#\s+(.+)$/m);
    return { slug, title: heading ? heading[1].trim() : slug.replace(/-/g, ' '), body };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
