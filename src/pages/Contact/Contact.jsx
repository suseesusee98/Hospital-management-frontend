import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import { useToast } from '../../components/Toast/ToastContext.jsx';
import './Contact.css';

const EMPTY = { name: '', email: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!form.email.trim()) nextErrors.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (!form.message.trim()) nextErrors.message = 'Please enter a message.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // This form is a general inquiry contact form — separate from the
    // Appointments backend. Wire it to your own inbox / helpdesk / Apps
    // Script endpoint of choice.
    showToast("Thanks — we'll get back to you within one business day.", 'success');
    setForm(EMPTY);
  }

  return (
    <section className="section contact-page">
      <div className="container contact-page__grid">
        <div className="contact-page__info">
          <span className="eyebrow">Contact Us</span>
          <h1>We're here to help</h1>
          <p>For emergencies, please call our 24/7 line directly rather than using this form.</p>

          <ul className="contact-page__list">
            <li>
              <strong>Emergency line</strong>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </li>
            <li>
              <strong>General enquiries</strong>
              <a href="mailto:care@pulseandwren.example">care@pulseandwren.example</a>
            </li>
            <li>
              <strong>Address</strong>
              <span>24 Anna Salai, Chennai, Tamil Nadu 600002</span>
            </li>
            <li>
              <strong>Hours</strong>
              <span>Outpatient: Mon–Sat, 8:00 AM – 8:00 PM · Emergency: 24/7</span>
            </li>
          </ul>
        </div>

        <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
          <label className={`contact-field ${errors.name ? 'has-error' : ''}`}>
            <span>Your Name</span>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <em>{errors.name}</em>}
          </label>

          <label className={`contact-field ${errors.email ? 'has-error' : ''}`}>
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            {errors.email && <em>{errors.email}</em>}
          </label>

          <label className={`contact-field ${errors.message ? 'has-error' : ''}`}>
            <span>Message</span>
            <textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} />
            {errors.message && <em>{errors.message}</em>}
          </label>

          <Button type="submit" size="lg">Send Message</Button>
        </form>
      </div>
    </section>
  );
}
