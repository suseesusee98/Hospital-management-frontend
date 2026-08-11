import './Button.css';

/**
 * Reusable button. Renders a real <button> or, when `href` is passed,
 * an <a> styled identically — used for in-page anchor CTAs.
 */
export default function Button({
  children,
  variant = 'primary', // primary | secondary | ghost
  size = 'md', // sm | md | lg
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = ''
}) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
