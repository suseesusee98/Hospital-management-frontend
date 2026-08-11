import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <svg className="navbar__mark" viewBox="0 0 32 32" aria-hidden="true">
            <polyline points="2,17 10,17 13,8 18,26 22,17 30,17" />
          </svg>
          <span>Pulse &amp; Wren</span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="navbar__cta">
            <Button href="/appointment" size="sm">Book Appointment</Button>
          </div>
        </nav>

        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
