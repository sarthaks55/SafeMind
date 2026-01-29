import { useState } from "react";
import { registerProfessionalApi } from "../api/authApi";

const RegisterProfessional = ({ onBack }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "MALE",
    role: "ROLE_PROFESSIONAL",
    specialization: "THERAPIST",
    experienceYears: 0,
    qualification: "",
    bio: "",
    consultationFee: 0,
    spokenLanguage: "ENGLISH"
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
    
    // Qualification validation with regex (letters, numbers, spaces, common punctuation)
    const qualificationRegex = /^[a-zA-Z0-9\s.,()-]{2,100}$/;
    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    } else if (!qualificationRegex.test(form.qualification.trim())) {
      newErrors.qualification = "Please enter a valid qualification (2-100 characters)";
    }
    
    // Experience validation with regex (positive numbers only)
    const experienceRegex = /^[0-9]{1,2}$/;
    if (form.experienceYears < 0) {
      newErrors.experienceYears = "Experience cannot be negative";
    } else if (!experienceRegex.test(form.experienceYears.toString()) || form.experienceYears > 50) {
      newErrors.experienceYears = "Please enter valid experience (0-50 years)";
    }
    
    // Consultation fee validation with regex (positive numbers)
    const feeRegex = /^[0-9]{1,6}$/;
    if (form.consultationFee < 0) {
      newErrors.consultationFee = "Fee cannot be negative";
    } else if (!feeRegex.test(form.consultationFee.toString()) || form.consultationFee > 999999) {
      newErrors.consultationFee = "Please enter a valid fee (up to 999999)";
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
      await registerProfessionalApi(form);
      alert(
        "Professional registered successfully.\nWaiting for admin verification."
      );
    } catch (err) {
      setErrors({ general: "Registration failed. Please try again." });
    }
  };

  return (
    <div className="container col-md-6 mt-5" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "40px 0" }}>
      <div className="card shadow-lg border-0" style={{ backgroundColor: "#FFFFFF", borderRadius: "20px" }}>
        <div className="card-header border-0 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F3A6A1 100%)", color: "#8E6EC8", borderRadius: "20px 20px 0 0", padding: "25px" }}>
          <h4 className="mb-2 fw-bold">Professional Registration</h4>
          <p className="mb-0 opacity-90">Join SafeMind as a mental health professional</p>
        </div>
        <div className="card-body p-4">
          <form onSubmit={submit}>
            {errors.general && (
              <div className="alert alert-danger mb-3" style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}>
                {errors.general}
              </div>
            )}
            
            <div className="row">
              <div className="col-md-6 mb-3">
                <input className="form-control shadow-sm py-3"
                  placeholder="Full Name"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                />
                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <input className="form-control shadow-sm py-3"
                  placeholder="Email"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="password" className="form-control shadow-sm py-3"
                  placeholder="Password"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <input className="form-control shadow-sm py-3"
                  placeholder="Phone"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <select className="form-control shadow-sm py-3"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option>MALE</option>
                  <option>FEMALE</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <select className="form-control shadow-sm py-3"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}>
                  <option>THERAPIST</option>
                  <option>PSYCHIATRIST</option>
                  <option>CHILD_SPECIALIST</option>
                  <option>COUPLES_THERAPIST</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <select className="form-control shadow-sm py-3"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  onChange={e => setForm({ ...form, spokenLanguage: e.target.value })}>
                  <option>ENGLISH</option>
                  <option>HINDI</option>
                  <option>MARATHI</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <input type="number" className="form-control shadow-sm py-3"
                  placeholder="Experience (Years)"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.experienceYears}
                  onChange={e => setForm({ ...form, experienceYears: e.target.value })}
                />
                {errors.experienceYears && <small className="text-danger">{errors.experienceYears}</small>}
              </div>
            </div>

            <div className="mb-3">
              <input className="form-control shadow-sm py-3"
                placeholder="Qualification"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                value={form.qualification}
                onChange={e => setForm({ ...form, qualification: e.target.value })}
              />
              {errors.qualification && <small className="text-danger">{errors.qualification}</small>}
            </div>

            <div className="mb-3">
              <textarea className="form-control shadow-sm"
                placeholder="Short Bio"
                rows="3"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                onChange={e => setForm({ ...form, bio: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <input type="number" className="form-control shadow-sm py-3"
                placeholder="Consultation Fee"
                style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                value={form.consultationFee}
                onChange={e => setForm({ ...form, consultationFee: e.target.value })}
              />
              {errors.consultationFee && <small className="text-danger">{errors.consultationFee}</small>}
            </div>

            <button className="btn w-100 py-3 fw-bold mb-3" onClick={submit} style={{ backgroundColor: "#E8A1B0", color: "white", border: "none", borderRadius: "10px" }}>
              Register as Professional
            </button>
          </form>

          {onBack && (
            <div className="text-center">
              <button className="btn btn-link" onClick={onBack} style={{ color: "#E8A1B0", textDecoration: "none", fontWeight: "500" }}>
                ← Back to Role Selection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterProfessional;