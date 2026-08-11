import { achievements } from '../../data/content.js';
import './About.css';

export default function About() {
  return (
    <>
      <section className="section about-hero">
        <div className="container about-hero__inner">
          <span className="eyebrow">About Us</span>
          <h1>Coordinated care, built around the patient.</h1>
          <p>
            Pulse &amp; Wren Hospital was founded on a simple idea: every
            patient should be met with the same clarity, urgency, and warmth,
            whether they're here for a routine check-up or an emergency.
            Today, our specialists across six departments work from a single
            shared record — so nothing gets lost between visits.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container about-stats">
          {achievements.map((a) => (
            <div className="about-stats__item" key={a.id}>
              <span>{a.value}</span>
              <p>{a.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container about-values">
          <div className="section-head">
            <span className="eyebrow">Our Approach</span>
            <h2>What guides every visit</h2>
          </div>
          <div className="grid-3">
            <div className="about-values__item">
              <h3>Clarity first</h3>
              <p>Every diagnosis and next step is explained in plain language, with time for your questions.</p>
            </div>
            <div className="about-values__item">
              <h3>One record, every visit</h3>
              <p>Your history travels with you across departments, so you never repeat yourself.</p>
            </div>
            <div className="about-values__item">
              <h3>Honest timelines</h3>
              <p>We tell you what to expect — for recovery, for costs, and for follow-up care.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
