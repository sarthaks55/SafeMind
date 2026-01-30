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

  useEffect(() => {
    getAssessmentById(id).then(res => setAssessment(res.data));
    return () => setAnswers({}); // 🔥 CLEAR MEMORY ON LEAVE
  }, [id]);

  if (!assessment) return <p>Loading...</p>;

  const total = assessment.questions.length;
  const answered = Object.keys(answers).length;

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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
    <div>
      <h2>{assessment.title}</h2>

      <ProgressBar total={total} answered={answered} />

      {assessment.questions.map(q => (
        <QuestionCard
          key={q.questionId}
          question={q}
          selected={answers[q.questionId]}
          onSelect={handleSelect}
        />
      ))}

      <button
        disabled={answered !== total || submitting}
        onClick={handleSubmit}
      >
        Submit Assessment
      </button>
    </div>
  );
};

export default AssessmentDetail;
