import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssessmentById, submitAssessment } from "../../api/assessmentService";
import ProgressBar from "../../components/assessments/ProgressBar";
import QuestionCard from "../../components/assessments/QuestionCard";

const AssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    getAssessmentById(id).then(res => setAssessment(res.data));
    return () => setAnswers({}); // 🔥 CLEAR MEMORY ON LEAVE
  }, [id]);

  if (!assessment) return <p>Loading...</p>;

  const total = assessment.questions.length;
  const answered = Object.keys(answers).length;
  const currentQuestion = assessment.questions[currentQuestionIndex];

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    // Auto-advance to next question
    if (currentQuestionIndex < total - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      answers: Object.entries(answers).map(([questionId, value]) => ({
        questionId: Number(questionId),
        value
      }))
    };

    const res = await submitAssessment(id, payload);

    navigate(`/assessments/${id}/result`, {
      state: res.data
    });
  };

  return (
    <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ color: "#8E6EC8", marginBottom: "20px", fontWeight: "bold" }}>{assessment.title}</h2>

        <ProgressBar total={total} answered={answered} />

        <QuestionCard
          question={currentQuestion}
          selected={answers[currentQuestion.questionId]}
          onSelect={handleSelect}
        />

        {currentQuestionIndex === total - 1 && (
          <button
            disabled={answered !== total || submitting}
            onClick={handleSubmit}
            style={{
              backgroundColor: answered !== total || submitting ? "#CFCFD4" : "#8E6EC8",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: answered !== total || submitting ? "not-allowed" : "pointer",
              marginTop: "20px"
            }}
          >
            Submit Assessment
          </button>
        )}
      </div>
    </div>
  );
};

export default AssessmentDetail;
