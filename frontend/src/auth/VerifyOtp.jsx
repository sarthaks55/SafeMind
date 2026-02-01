import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../api/authApi";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // userId passed from registration
  const userId = location.state?.userId;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!userId) {
    return <p>Invalid verification request</p>;
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

      const response = await verifyOtp({
        userId,
        otp,
      });

      if (response.success) {
        alert(response.message || "Verification successful. You can now login.");
        navigate("/login");
      } else {
        setError(response.message || "Invalid or expired OTP");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p>
        Enter the OTP sent to your registered email and phone
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
