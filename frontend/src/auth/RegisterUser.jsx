import React, { useState } from "react";
import { registerUserApi } from "../api/authApi";
import { Link,useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";


const RegisterUser = ({ onBack }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "MALE",
    role: "ROLE_USER"
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    const nameRegex = /^[A-Za-z ]+$/;
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 3 || form.fullName.trim().length > 50) {
      newErrors.fullName = "Full name must be between 3 and 50 characters";
    } else if (!nameRegex.test(form.fullName.trim())) {
      newErrors.fullName = "Full name can contain only letters and spaces";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6 || form.password.length > 64) {
      newErrors.password = "Password must be between 6 and 64 characters";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone number must be a valid 10-digit Indian mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setErrorMessage("");
      const response = await registerUserApi(form);
      if (response.success) {
        setSuccessMessage(response.message || "User registered successfully");
        setTimeout(() => {
          navigate("/verify-otp", {
            state: {
              userId: response.data.userId
            }
          });
        }, 1500);
      } else {
        setErrorMessage(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }


  };

  return (
    <div className="container col-md-5 mt-5" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "40px 0" }}>
      <div className="card shadow-lg border-0" style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }}>
        <div className="card-header border-0 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #C6B7E2 100%)", color: "#8E6EC8", borderRadius: "20px 20px 0 0", padding: "25px" }}>
          <h4 className="mb-2 fw-bold">User Registration</h4>
          <p className="mb-0">Join SafeMind as a user</p>
        </div>
        <div className="card-body p-4">
          <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
          <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
          
          <form onSubmit={submit}>
            {errors.general && (
              <div className="alert alert-danger mb-3" style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}>
                {errors.general}
              </div>
            )}
            
            <div className="mb-3">
              <input
                className="form-control shadow-sm py-3"
                placeholder="Full Name"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #C6B7E2" }}
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
            </div>
            <div className="mb-3">
              <input
                className="form-control shadow-sm py-3"
                placeholder="Email"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #C6B7E2" }}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control shadow-sm py-3"
                placeholder="Password"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #C6B7E2" }}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
            <div className="mb-3">
              <input
                className="form-control shadow-sm py-3"
                placeholder="Phone"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #C6B7E2" }}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>

            <div className="mb-4">
              <select
                className="form-control shadow-sm py-3"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #C6B7E2" }}
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option>MALE</option>
                <option>FEMALE</option>
                <option>OTHER</option>
              </select>
            </div>

            <button onClick={submit} className="btn w-100 py-3 fw-bold mb-3" style={{ backgroundColor: "#B39DDB", color: "white", border: "none", borderRadius: "10px" }}>
              Register
            </button>
          </form>

          <div className="text-center">
            {onBack ? (
              <button className="btn btn-link" onClick={onBack} style={{ color: "#B39DDB", textDecoration: "none", fontWeight: "500" }}>
                ← Back to Role Selection
              </button>
            ) : (
              <Link to="/register" style={{ color: "#B39DDB", textDecoration: "none", fontWeight: "500" }}>
                ← Back to Role Selection
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;