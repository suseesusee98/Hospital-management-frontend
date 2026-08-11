import './AchievementCard.css';

export default function AchievementCard({ achievement }) {
  return (
    <div className="achievement-card">
      <span className="achievement-card__value">{achievement.value}</span>
      <span className="achievement-card__label">{achievement.label}</span>
    </div>
  );
}
