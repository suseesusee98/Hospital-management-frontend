import { useEffect, useState } from 'react';
import DoctorCard from '../../components/DoctorCard/DoctorCard.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { getAllDoctors } from '../../services/doctorService.js';
import { departments } from '../../data/content.js';
import './Doctors.css';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('All');

  useEffect(() => {
    getAllDoctors().then((data) => {
      setDoctors(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeDept === 'All'
    ? doctors
    : doctors.filter((d) => d.department === activeDept);

  return (
    <section className="section doctors-page">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Our Specialists</span>
          <h1>Meet the doctors</h1>
          <p>Filter by department to find the right specialist for your visit.</p>
        </div>

        <div className="doctors-page__filters">
          {['All', ...departments.map((d) => d.name)].map((dept) => (
            <button
              key={dept}
              className={`doctors-page__filter ${activeDept === dept ? 'is-active' : ''}`}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader full label="Loading doctors" />
        ) : (
          <div className="grid-3">
            {filtered.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
            {filtered.length === 0 && <p>No doctors found in this department yet.</p>}
          </div>
        )}
      </div>
    </section>
  );
}
