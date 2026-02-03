import { useState } from "react";
import { registerProfessionalApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "../components/SuccessMessage";

const RegisterProfessional = ({ onBack }) => {
  const navigate = useNavigate();
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
    
    if (!form.gender) {
      newErrors.gender = "Gender is required";
    }
    
    if (!form.specialization) {
      newErrors.specialization = "Specialization is required";
    }
    
    if (form.experienceYears < 0) {
      newErrors.experienceYears = "Experience cannot be negative";
    } else if (form.experienceYears > 60) {
      newErrors.experienceYears = "Experience seems invalid";
    }
    
    if (!form.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    } else if (form.qualification.trim().length < 2 || form.qualification.trim().length > 100) {
      newErrors.qualification = "Qualification must be between 2 and 100 characters";
    }
    
    if (form.bio && form.bio.length > 500) {
      newErrors.bio = "Bio must not exceed 500 characters";
    }
    
    if (!form.consultationFee || form.consultationFee <= 0) {
      newErrors.consultationFee = "Consultation fee must be greater than 0";
    }
    
    if (!form.spokenLanguage) {
      newErrors.spokenLanguage = "Spoken language is required";
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
      const response = await registerProfessionalApi(form);
      if (response.success) {
        setSuccessMessage(response.message || "Professional registered successfully.\nWaiting for admin verification.");
        setTimeout(() => {
          navigate("/verify-otp", {
            state: { userId: response.data.userId }
          });
        }, 2000);
      } else {
        setErrors({ general: response.message || "Registration failed. Please try again." });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Registration failed. Please try again." });
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
          <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
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
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
                {errors.gender && <small className="text-danger">{errors.gender}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <select className="form-control shadow-sm py-3"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.specialization}
                  onChange={e => setForm({ ...form, specialization: e.target.value })}>
                  <option value="THERAPIST">THERAPIST</option>
                  <option value="PSYCHIATRIST">PSYCHIATRIST</option>
                  <option value="CHILD_SPECIALIST">CHILD_SPECIALIST</option>
                  <option value="COUPLES_THERAPIST">COUPLES_THERAPIST</option>
                </select>
                {errors.specialization && <small className="text-danger">{errors.specialization}</small>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <select className="form-control shadow-sm py-3"
                  style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", borderRadius: "10px", border: "2px solid #F3A6A1" }}
                  value={form.spokenLanguage}
                  onChange={e => setForm({ ...form, spokenLanguage: e.target.value })}>
                  <option value="ENGLISH">ENGLISH</option>
                  <option value="HINDI">HINDI</option>
                  <option value="MARATHI">MARATHI</option>
                </select>
                {errors.spokenLanguage && <small className="text-danger">{errors.spokenLanguage}</small>}
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
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
              />
              {errors.bio && <small className="text-danger">{errors.bio}</small>}
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