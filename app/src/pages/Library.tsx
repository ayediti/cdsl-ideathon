import { Link, useNavigate, useParams } from 'react-router-dom';
import { BRAND } from '../brand';
import { Markdown } from '../components/Markdown';
import { ARTICLES, getArticle } from '../engine/library';

export function Library() {
  return (
    <div className="page">
      <header className="topbar">
        <Link to="/home" className="brand">
          {BRAND}
        </Link>
        <div className="topbar__meta">
          <span>Library</span>
        </div>
      </header>
      <main className="page__main">
        <h1>Library</h1>
        <ul className="article-list">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link to={`/library/${a.slug}`}>{a.title}</Link>
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
    <div className="page">
      <header className="topbar">
        <Link to="/home" className="brand">
          {BRAND}
        </Link>
        <div className="topbar__meta">
          <Link to="/library">Library</Link>
        </div>
        <button className="btn btn--ghost" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>
      <main className="page__main">
        {article ? (
          <>
            <h1>{article.title}</h1>
            <Markdown source={article.body} skipTitle />
          </>
        ) : (
          <p>Article not found.</p>
        )}
      </main>
    </div>
  );
}
