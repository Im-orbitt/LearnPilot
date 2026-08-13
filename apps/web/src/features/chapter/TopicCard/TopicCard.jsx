import "./TopicCard.css";

import { ArrowRight, BookOpen } from "lucide-react";

import Button from "../../../components/ui/Button/Button";

function TopicCard({ topic, index, onClick }) {
  return (
    <article className="topic-card">
      <div className="topic-card-top">
        <span className="topic-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="topic-card-icon">
          <BookOpen size={20} />
        </div>
      </div>

      <div className="topic-card-content">
        <p className="topic-label">Topic {index + 1}</p>
        <h3>{topic.title}</h3>

        {topic.summary && <p className="topic-summary">{topic.summary}</p>}
      </div>

      <Button onClick={onClick}>
        Study Topic
        <ArrowRight size={16} />
      </Button>
    </article>
  );
}

export default TopicCard;
