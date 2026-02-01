import { useEffect, useState } from "react";
import { getAssessments } from "../../api/assessmentService";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../../components/PublicNavbar";

const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssessments = async () => {
      try {
        const response = await getAssessments();
        if (response.success) {
          setAssessments(response.data);
        } else {
          console.error(response.message);
        }
      } catch (err) {
        console.error("Failed to load assessments:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAssessments();
  }, []);

  if (loading) {
    return (
      <>
        <PublicNavbar />
        <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px", paddingTop: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#8E6EC8" }}>
            <i className="fas fa-spinner fa-spin fa-3x mb-3"></i>
            <div>Loading assessments...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PublicNavbar />
      <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px", paddingTop: "100px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ color: "#8E6EC8", marginBottom: "30px", fontWeight: "bold", textAlign: "center" }}>Quick Mental Health Assessments</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {assessments.map(a => (
            <div key={a.assessmentId} style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #C6B7E2",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(142, 110, 200, 0.1)",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <h3 style={{ color: "#7A5BC7", marginBottom: "12px", fontSize: "20px" }}>{a.title}</h3>
              <p style={{ color: "#666", lineHeight: "1.5", marginBottom: "20px" }}>{a.description}</p>
              <button 
                onClick={() => navigate(`/assessments/${a.assessmentId}`)}
                style={{
                  backgroundColor: "#8E6EC8",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#7A5BC7"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#8E6EC8"}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default AssessmentList;
