import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <svg className="footer__mark" viewBox="0 0 32 32" aria-hidden="true">
            <polyline points="2,17 10,17 13,8 18,26 22,17 30,17" />
          </svg>
          <p>
            Pulse &amp; Wren Hospital delivers coordinated, transparent care —
            from your first booking to your last follow-up.
          </p>
        </div>

        <div className="footer__col">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/appointment">Book Appointment</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <Link to="/contact">Contact Us</Link>
          <a href="tel:+911234567890">+91 12345 67890</a>
          <a href="mailto:care@pulseandwren.example">care@pulseandwren.example</a>
        </div>

        <div className="footer__col">
          <h4>Visit</h4>
          <p>24 Anna Salai,<br />Chennai, Tamil Nadu 600002</p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>&copy; {year} Pulse &amp; Wren Hospital. All rights reserved.</span>
      </div>
    </footer>
  );
}
