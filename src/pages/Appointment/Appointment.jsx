import AppointmentForm from '../../components/AppointmentForm/AppointmentForm.jsx';
import './Appointment.css';

export default function Appointment() {
  return (
    <section className="section appointment-page">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Book a Visit</span>
          <h1>Schedule your appointment</h1>
          <p>Fill in your details below. Our care team confirms every booking by phone or email within one business day.</p>
        </div>
        <AppointmentForm />
      </div>
    </section>
  );
}
