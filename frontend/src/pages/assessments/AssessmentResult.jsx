import { useLocation, useNavigate } from "react-router-dom";

const AssessmentResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No result found.</p>;

  return (
    <div>
      <h2>{state.resultTitle}</h2>
      <h3>Average Score: {state.averageScore}/5</h3>

      <p>{state.suggestion}</p>

      <p style={{ fontStyle: "italic", marginTop: "20px" }}>
        This assessment is not a medical diagnosis and is intended for informational purposes only.
      </p>

      <button onClick={() => navigate(-1)}>Retake</button>
      <button onClick={() => navigate("/assessments")}>Back</button>
    </div>
  );
};

export default AssessmentResult;
