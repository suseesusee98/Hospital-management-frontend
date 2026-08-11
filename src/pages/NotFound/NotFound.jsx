import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <svg className="not-found__pulse" viewBox="0 0 200 60" aria-hidden="true">
          <polyline points="0,30 60,30 72,10 90,50 108,30 200,30" />
        </svg>
        <span className="eyebrow">404</span>
        <h1>We couldn't find that page.</h1>
        <p>The page you're looking for may have moved, or the link might be outdated.</p>
        <div className="not-found__actions">
          <Button href="/">Back to Home</Button>
          <Link to="/contact" className="not-found__link">Contact us instead</Link>
        </div>
      </div>
    </section>
  );
}
