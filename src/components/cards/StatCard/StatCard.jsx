import "./StatCard.css";

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <Icon size={28} />

      <div>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
