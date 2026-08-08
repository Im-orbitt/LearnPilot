import "./StatCard.css";

function StatCard({ title, value, icon: Icon, color = "var(--primary)" }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon" style={{ color }}>
        <Icon size={26} />
      </div>

      <div className="stat-card-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
