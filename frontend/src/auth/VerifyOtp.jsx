import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../api/authApi";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  


  if (!userId) {
    return (
      <div className="text-center mt-5">
        <h4 style={{ color: "#D9899A" }}>Invalid verification request</h4>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOtp({ userId, otp });

      if (response.success) {
        setSuccessMessage(response.message || "Verification successful. You can now login.");
        navigate("/login");
      } else {
        setErrorMessage(response.message || "Invalid or expired OTP");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF9F7",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            {/* Header */}
            <div className="text-center mb-4">
              <img
                src="https://myemotionalfirstaid.org/wp-content/uploads/2023/10/Creating-Awareness-about-Mental-Health-Concerns.png"
                alt="SafeMind"
                className="rounded-circle mb-3"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                }}
              />
              <h2 className="fw-bold" style={{ color: "#8E6EC8" }}>
                SafeMind
              </h2>
              <p style={{ color: "#CFCFD4" }}>
                Account Verification
              </p>
            </div>

            {/* Card */}
            <div
              className="card border-0 shadow-lg"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <div className="card-body p-0">
                <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
                <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
                {/* Gradient top */}
                <div
                  className="p-4 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #FFFFFF 0%, #C6B7E2 100%)",
                  }}
                >
                  <h4 className="fw-bold" style={{ color: "#8E6EC8" }}>
                    Verify OTP
                  </h4>
                  <p className="mb-0" style={{ color: "#7A5BC7" }}>
                    Enter the 6-digit code sent to you
                  </p>
                </div>

                {/* Form */}
                <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                  {error && (
                    <div
                      className="alert"
                      style={{
                        backgroundColor: "#D9899A",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#FFFFFF",
                            border: "2px solid #C6B7E2",
                            borderRight: "none",
                          }}
                        >
                          <i
                            className="fas fa-key"
                            style={{ color: "#8E6EC8" }}
                          ></i>
                        </span>

                        <input
                          type="text"
                          maxLength="6"
                          className="form-control py-3 text-center fw-bold"
                          placeholder="Enter OTP"
                          style={{
                            letterSpacing: "6px",
                            backgroundColor: "#FFFFFF",
                            color: "#8E6EC8",
                            border: "2px solid #C6B7E2",
                            borderLeft: "none",
                          }}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className="btn w-100 py-3 fw-bold"
                      disabled={loading}
                      style={{
                        background: loading
                          ? "#CFCFD4"
                          : "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "12px",
                      }}
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </form>

                  <div className="text-center mt-3">
                    <small style={{ color: "#CFCFD4" }}>
                      Didn’t receive the code? Check spam or try again later.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            {/* Card end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
