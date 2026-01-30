import { useLocation, useNavigate } from "react-router-dom";

const AssessmentResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No result found.</p>;

  return (
    <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
        <div style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #C6B7E2",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 24px rgba(142, 110, 200, 0.15)"
        }}>
          <h2 style={{ color: "#8E6EC8", marginBottom: "16px", fontSize: "28px", fontWeight: "bold" }}>{state.resultTitle}</h2>
          <h3 style={{ color: "#7A5BC7", marginBottom: "24px", fontSize: "24px" }}>Average Score: {state.averageScore}/5</h3>

          <p style={{ color: "#666", lineHeight: "1.6", fontSize: "16px", marginBottom: "30px" }}>{state.suggestion}</p>

          <p style={{ 
            fontStyle: "italic", 
            marginBottom: "30px", 
            color: "#D9899A", 
            fontSize: "14px",
            backgroundColor: "#FAF9F7",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #E8A1B0"
          }}>
            This assessment is not a medical diagnosis and is intended for informational purposes only.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button 
              onClick={() => navigate(-1)}
              style={{
                backgroundColor: "#F3A6A1",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#E8A1B0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#F3A6A1"}
            >
              Retake
            </button>
            <button 
              onClick={() => navigate("/assessments")}
              style={{
                backgroundColor: "#8E6EC8",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#7A5BC7"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#8E6EC8"}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResult;
