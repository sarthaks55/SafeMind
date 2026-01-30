import { useEffect, useState } from "react";
import { getAssessments } from "../../api/assessmentService";
import { useNavigate } from "react-router-dom";

const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAssessments()
      .then(res => setAssessments(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading assessments...</p>;

  return (
    <div>
      <h2>Quick Mental Health Assessments</h2>

      {assessments.map(a => (
        <div key={a.assessmentId} className="card">
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <button onClick={() => navigate(`/assessments/${a.assessmentId}`)}>
            Start
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssessmentList;
