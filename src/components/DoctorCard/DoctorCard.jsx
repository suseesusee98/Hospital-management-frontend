import { Link } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './DoctorCard.css';

export default function DoctorCard({ doctor }) {
  const { name, qualification, department, experience, availableDays, rating, initials } = doctor;

  return (
    <article className="doctor-card">
      <div className="doctor-card__photo" aria-hidden="true">
        <span>{initials}</span>
      </div>

      <div className="doctor-card__body">
        <span className="doctor-card__department">{department}</span>
        <h3 className="doctor-card__name">{name}</h3>
        <p className="doctor-card__qualification">{qualification}</p>

        <div className="doctor-card__meta">
          <span>{experience}</span>
          <span className="doctor-card__rating">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6z" /></svg>
            {rating}
          </span>
        </div>

        <div className="doctor-card__days">
          {availableDays.map((day) => (
            <span key={day} className="doctor-card__day">{day}</span>
          ))}
        </div>

        <Button href={`/appointment?doctor=${encodeURIComponent(name)}`} size="sm" className="doctor-card__cta">
          Book Appointment
        </Button>
      </div>
    </article>
  );
}
