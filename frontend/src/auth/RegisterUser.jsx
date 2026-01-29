import React, { useState } from "react";
import { registerUserApi } from "../api/authApi";
import { Link } from "react-router-dom";

const RegisterUser = ({ onBack }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "MALE",
    role: "ROLE_USER"
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Full name validation with regex (only letters and spaces)
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!nameRegex.test(form.fullName.trim())) {
      newErrors.fullName = "Name must contain only letters and spaces (2-50 characters)";
    }
    
    // Email validation with comprehensive regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation with regex for strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password = "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, and 1 number";
    }
    
    // Phone validation with regex (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
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
      await registerUserApi(form);
      alert("User registered successfully");
    } catch (err) {
      setErrors({ general: "Registration failed. Please try again." });
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
                <option>OTHERS</option>
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