import './DepartmentCard.css';

export default function DepartmentCard({ department }) {
  return (
    <div className="department-card">
      <h3>{department.name}</h3>
      <p>{department.description}</p>
      <span className="department-card__count">{department.doctorCount} specialists</span>
    </div>
  );
}
