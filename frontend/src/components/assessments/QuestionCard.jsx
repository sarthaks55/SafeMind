const QuestionCard = ({ question, selected, onSelect }) => {
  return (
    <div className="question-card">
      <p>{question.questionText}</p>

      {question.options.map(o => (
        <label key={o.optionValue}>
          <input
            type="radio"
            name={`q-${question.questionId}`}
            checked={selected === o.optionValue}
            onChange={() => onSelect(question.questionId, o.optionValue)}
          />
          {o.optionText}
        </label>
      ))}
    </div>
  );
};

export default QuestionCard;
