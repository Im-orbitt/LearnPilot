import "./LessonOption.css";

import Button from "../../../components/ui/Button/Button";

function LessonOption({
  icon: Icon,
  label,
  title,
  description,
  action,
  onClick,
}) {
  return (
    <article className="lesson-option">
      <div className="lesson-option-top">
        <span className="lesson-option-label">{label}</span>

        <div className="lesson-option-icon">
          <Icon size={20} />
        </div>
      </div>

      <div className="lesson-option-content">
        <h2>{title}</h2>

        <p>{description}</p>
      </div>

      <Button onClick={onClick}>{action}</Button>
    </article>
  );
}

export default LessonOption;
