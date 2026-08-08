import "./TopicCard.css";

import Button from "../../../components/ui/Button/Button";

function TopicCard({ topic, onClick }) {
  return (
    <div className="topic-card">
      <h3>{topic.title}</h3>
      <Button onClick={onClick}>Study Topic</Button>
    </div>
  );
}

export default TopicCard;
