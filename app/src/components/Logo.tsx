import { Link } from 'react-router-dom';
import { BRAND } from '../brand';

export function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="logo" aria-label={`${BRAND} home`}>
      <span className="logo__mark" aria-hidden="true">
        ₹
      </span>
      <span className="logo__word">{BRAND}</span>
    </Link>
  );
}
