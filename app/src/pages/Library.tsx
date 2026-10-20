import { ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Markdown } from '../components/Markdown';
import { ARTICLES, getArticle } from '../engine/library';

export function Library() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="topbar__meta">
          <span className="topbar__module">Library</span>
        </div>
      </header>
      <main className="page">
        <span className="eyebrow">Library</span>
        <h1 className="display">Read up, in plain language</h1>
        <p className="lead">Short explainers linked from the simulation’s help panel.</p>
        <ul className="article-grid">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link to={`/library/${a.slug}`} className="article-card">
                <span className="article-card__icon">
                  <BookOpen size={20} />
                </span>
                <strong>{a.title}</strong>
                <span className="article-card__more">
                  Read <ArrowRight size={15} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export function LibraryArticle() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const article = getArticle(slug);

  return (
    <div className="app-shell">
      <header className="topbar">
        <Logo />
        <div className="topbar__meta">
          <Link to="/library" className="topbar__module">
            Library
          </Link>
        </div>
        <button className="icon-btn icon-btn--label" onClick={() => navigate(-1)}>
          <ChevronLeft size={18} />
          <span>Back</span>
        </button>
      </header>
      <main className="page">
        {article ? (
          <article className="article">
            <span className="eyebrow">Library</span>
            <h1 className="display">{article.title}</h1>
            <Markdown source={article.body} skipTitle />
          </article>
        ) : (
          <p className="lead">Article not found.</p>
        )}
      </main>
    </div>
  );
}
