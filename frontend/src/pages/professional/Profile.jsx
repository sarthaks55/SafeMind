import { useState } from "react";
import {
  updateProfessionalProfile,
  changeProfessionalPassword,
} from "../../api/professionalService";

const Profile = () => {
  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    qualification: "",
    experienceYears: "",
    consultationFee: "",
    bio: "",
  });

  const [profileErrors, setProfileErrors] = useState({});

  const validateProfile = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const qualificationRegex = /^[a-zA-Z\s.,]{2,100}$/;
    
    if (!nameRegex.test(profile.fullName)) {
      errors.fullName = "Name should contain only letters and be 2-50 characters";
    }
    if (!phoneRegex.test(profile.phone)) {
      errors.phone = "Phone should be exactly 10 digits";
    }
    if (!qualificationRegex.test(profile.qualification)) {
      errors.qualification = "Qualification should be 2-100 characters";
    }
    if (profile.experienceYears < 0 || profile.experienceYears > 50) {
      errors.experienceYears = "Experience should be between 0-50 years";
    }
    if (profile.consultationFee < 0) {
      errors.consultationFee = "Fee should be a positive number";
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (profileErrors[e.target.name]) {
      setProfileErrors({ ...profileErrors, [e.target.name]: "" });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    try {
      await updateProfessionalProfile(profile);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  /* ================= PASSWORD ================= */
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const validatePassword = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    
    if (password.oldPassword.length < 6) {
      errors.oldPassword = "Password should be at least 6 characters";
    }
    if (!passwordRegex.test(password.newPassword)) {
      errors.newPassword = "Password should have 8+ chars, uppercase, lowercase, and number";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({ ...passwordErrors, [e.target.name]: "" });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      await changeProfessionalPassword(password);
      alert("Password updated successfully");
      setPassword({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg" style={{ background: "linear-gradient(135deg, #E8A1B0 0%, #D9899A 100%)", color: "white", borderRadius: "20px", overflow: "hidden" }}>
            <div className="card-body text-center py-5 position-relative">
              <h2 className="mb-2 fw-bold">Professional Profile</h2>
              <p className="mb-0 opacity-90">Manage your professional information & credentials</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-lg" 
               style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", borderTop: "5px solid #F3A6A1", transition: "all 0.3s ease" }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-header bg-transparent border-0 pt-4">
              <div className="d-flex align-items-center">
                <div className="p-2 me-3" style={{ backgroundColor: "#F3A6A1", color: "white", borderRadius: "10px" }}>
                  <i className="fas fa-user-edit"></i>
                </div>
                <h5 className="mb-0 fw-bold" style={{ color: "#8E6EC8" }}>Update Profile</h5>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-user me-2" style={{ color: "#F3A6A1" }}></i>
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter your full name"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                  />
                  {profileErrors.fullName && <small className="text-danger">{profileErrors.fullName}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-phone me-2" style={{ color: "#F3A6A1" }}></i>
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                  {profileErrors.phone && <small className="text-danger">{profileErrors.phone}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-graduation-cap me-2" style={{ color: "#F3A6A1" }}></i>
                    Qualification
                  </label>
                  <input
                    name="qualification"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="e.g., Ph.D. in Clinical Psychology"
                    value={profile.qualification}
                    onChange={handleProfileChange}
                  />
                  {profileErrors.qualification && <small className="text-danger">{profileErrors.qualification}</small>}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                      <i className="fas fa-calendar-alt me-2" style={{ color: "#F3A6A1" }}></i>
                      Experience (Years)
                    </label>
                    <input
                      name="experienceYears"
                      type="number"
                      className="form-control border-0 shadow-sm"
                      style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                      placeholder="Years of experience"
                      value={profile.experienceYears}
                      onChange={handleProfileChange}
                    />
                    {profileErrors.experienceYears && <small className="text-danger">{profileErrors.experienceYears}</small>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                      <i className="fas fa-dollar-sign me-2" style={{ color: "#F3A6A1" }}></i>
                      Consultation Fee
                    </label>
                    <input
                      name="consultationFee"
                      type="number"
                      className="form-control border-0 shadow-sm"
                      style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                      placeholder="Fee per session"
                      value={profile.consultationFee}
                      onChange={handleProfileChange}
                    />
                    {profileErrors.consultationFee && <small className="text-danger">{profileErrors.consultationFee}</small>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-file-alt me-2" style={{ color: "#F3A6A1" }}></i>
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Tell clients about your expertise and approach..."
                    rows="4"
                    value={profile.bio}
                    onChange={handleProfileChange}
                  />
                </div>

                <button className="btn px-5 py-3 fw-bold shadow-sm" 
                        style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8", border: "none", borderRadius: "12px" }}>
                  <i className="fas fa-save me-2"></i>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-lg" 
               style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", borderTop: "5px solid #B39DDB", transition: "all 0.3s ease" }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="card-header bg-transparent border-0 pt-4">
              <div className="d-flex align-items-center">
                <div className="p-2 me-3" style={{ backgroundColor: "#B39DDB", color: "white", borderRadius: "10px" }}>
                  <i className="fas fa-lock"></i>
                </div>
                <h5 className="mb-0 fw-bold" style={{ color: "#8E6EC8" }}>Change Password</h5>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-key me-2" style={{ color: "#B39DDB" }}></i>
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter current password"
                    value={password.oldPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordErrors.oldPassword && <small className="text-danger">{passwordErrors.oldPassword}</small>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-lock me-2" style={{ color: "#B39DDB" }}></i>
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter new password"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordErrors.newPassword && <small className="text-danger">{passwordErrors.newPassword}</small>}
                  <small className="text-muted mt-2 d-block">
                    <i className="fas fa-info-circle me-1"></i>
                    Use 8+ characters with uppercase, lowercase, and numbers
                  </small>
                </div>

                <button className="btn px-5 py-3 fw-bold shadow-sm" 
                        style={{ backgroundColor: "#B39DDB", color: "white", border: "none", borderRadius: "12px" }}>
                  <i className="fas fa-shield-alt me-2"></i>
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;