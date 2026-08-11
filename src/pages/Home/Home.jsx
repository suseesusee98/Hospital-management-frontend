import { useEffect, useState } from 'react';
import Hero from '../../components/Hero/Hero.jsx';
import AchievementCard from '../../components/AchievementCard/AchievementCard.jsx';
import DoctorCard from '../../components/DoctorCard/DoctorCard.jsx';
import DepartmentCard from '../../components/DepartmentCard/DepartmentCard.jsx';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { getAllDoctors } from '../../services/doctorService.js';
import { achievements, departments, features, testimonials } from '../../data/content.js';
import './Home.css';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    getAllDoctors().then((data) => {
      setDoctors(data.slice(0, 3));
      setLoadingDoctors(false);
    });
  }, []);

  return (
    <>
      <Hero />

      <section className="section achievements">
        <div className="container achievements__grid">
          {achievements.map((a) => <AchievementCard key={a.id} achievement={a} />)}
        </div>
      </section>

      <section className="section" id="doctors">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Our Specialists</span>
            <h2>Doctors people trust with their toughest days</h2>
            <p>Board-certified specialists across cardiology, orthopedics, pediatrics and more.</p>
          </div>

          {loadingDoctors ? (
            <Loader full label="Loading doctors" />
          ) : (
            <div className="grid-3">
              {doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section section--tint" id="departments">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Departments</span>
            <h2>Every specialty, one coordinated record</h2>
          </div>
          <div className="grid-3">
            {departments.map((d) => <DepartmentCard key={d.id} department={d} />)}
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why Pulse &amp; Wren</span>
            <h2>Built around how care actually happens</h2>
          </div>
          <div className="grid-2 features">
            {features.map((f) => (
              <div className="feature" key={f.id}>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="appointment">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Book a Visit</span>
            <h2>Reserve your appointment</h2>
            <p>Tell us a bit about you and your visit — our team confirms every booking by phone or email.</p>
          </div>
          <AppointmentForm />
        </div>
      </section>

      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Patient Stories</span>
            <h2>What patients say after their visit</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t) => (
              <blockquote className="testimonial" key={t.id}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
