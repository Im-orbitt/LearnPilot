import "./FAQ.css";

function FAQ() {
  return (
    <section className="faq" id="faq">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">
        <div className="faq-item">
          <h3>How does LearnPilot work?</h3>
          <p>
            Upload a chapter and LearnPilot generates notes, quizzes and an AI
            tutor.
          </p>
        </div>

        <div className="faq-item">
          <h3>Which subjects are supported?</h3>
          <p>Any textbook chapter that can be uploaded.</p>
        </div>

        <div className="faq-item">
          <h3>Is LearnPilot free?</h3>
          <p>Yes. A free version will always be available.</p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
