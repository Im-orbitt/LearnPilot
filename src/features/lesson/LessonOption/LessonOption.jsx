import "./LessonOption.css";

import { Check, Lock } from "lucide-react";

import Button from "../../../components/ui/Button/Button";

function LessonOption({
  number,
  icon: Icon,
  label,
  title,
  description,
  action,
  completed,
  locked,
  onClick,
  isLast,
}) {
  return (
    <div className={`lesson-step ${locked ? "is-locked" : ""}`}>
      <div className="lesson-step-number">{number}</div>

      {!isLast && <div className="lesson-step-line" />}

      <article className="lesson-option">
        <div className="lesson-option-top">
          <span className="lesson-option-label">{label}</span>

          <div className="lesson-option-icon">
            {completed ? <Check size={20} /> : <Icon size={20} />}
          </div>
        </div>

        <div className="lesson-option-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <Button disabled={locked} onClick={onClick}>
          {locked ? (
            <>
              <Lock size={16} />
              Locked
            </>
          ) : completed ? (
            "Review Again"
          ) : (
            action
          )}
        </Button>
      </article>
    </div>
  );
}

export default LessonOption;
