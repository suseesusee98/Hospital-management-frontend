import Button from '../Button/Button.jsx';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">
            <span className="eyebrow__dot" />
            Now booking same-day visits
          </span>
          <h1>
            Care that follows <em>your</em> pulse, not a queue number.
          </h1>
          <p className="hero__lede">
            Pulse &amp; Wren brings specialists, records, and follow-ups into
            one coordinated visit — so you spend less time explaining your
            history and more time being heard.
          </p>
          <div className="hero__actions">
            <Button href="/appointment" size="lg">Book an Appointment</Button>
            <Button href="/doctors" variant="ghost" size="lg">Meet Our Doctors</Button>
          </div>
        </div>

        <div className="hero__graphic" aria-hidden="true">
          <svg viewBox="0 0 420 320" className="hero__pulse-art">
            <circle cx="210" cy="160" r="150" className="hero__ring" />
            <polyline
              className="hero__line"
              points="20,180 110,180 130,110 165,240 195,60 225,220 250,150 400,150"
            />
          </svg>
          <div className="hero__stat-card">
            <span className="hero__stat-value">4.9/5</span>
            <span className="hero__stat-label">Average patient rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
