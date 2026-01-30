const QuestionCard = ({ question, selected, onSelect }) => {
  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #C6B7E2",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(142, 110, 200, 0.1)"
    }}>
      <p style={{ 
        color: "#7A5BC7", 
        fontSize: "18px", 
        fontWeight: "500", 
        marginBottom: "20px",
        lineHeight: "1.5"
      }}>{question.questionText}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {question.options.map(o => (
          <label key={o.optionValue} style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: selected === o.optionValue ? "#B39DDB" : "#FAF9F7",
            border: `2px solid ${selected === o.optionValue ? "#8E6EC8" : "#C6B7E2"}`,
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            color: selected === o.optionValue ? "white" : "#666"
          }}
          onMouseOver={(e) => {
            if (selected !== o.optionValue) {
              e.currentTarget.style.backgroundColor = "#C6B7E2";
            }
          }}
          onMouseOut={(e) => {
            if (selected !== o.optionValue) {
              e.currentTarget.style.backgroundColor = "#FAF9F7";
            }
          }}>
            <input
              type="radio"
              name={`q-${question.questionId}`}
              checked={selected === o.optionValue}
              onChange={() => onSelect(question.questionId, o.optionValue)}
              style={{ marginRight: "12px", accentColor: "#8E6EC8" }}
            />
            {o.optionText}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
