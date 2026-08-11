import './Loader.css';

/**
 * Small pulse-line loader — echoes the site's heartbeat motif.
 * `full` centers it in a full-height wrapper for page-level loading states.
 */
export default function Loader({ label = 'Loading', full = false }) {
  const content = (
    <div className="loader" role="status" aria-live="polite">
      <svg className="loader__pulse" viewBox="0 0 120 40" aria-hidden="true">
        <polyline points="0,20 30,20 38,6 48,34 58,20 120,20" />
      </svg>
      <span className="loader__label">{label}…</span>
    </div>
  );

  if (full) {
    return <div className="loader__full">{content}</div>;
  }
  return content;
}
