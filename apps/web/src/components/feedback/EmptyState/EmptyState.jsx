import "./EmptyState.css";

function EmptyState({ title, message, action = null }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>

      {action}
    </div>
  );
}

export default EmptyState;
