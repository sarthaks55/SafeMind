import { useState, useEffect } from "react";
import {
  getProfessionalProfile,
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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfessionalProfile();
        if (response.success) {
          setProfile(response.data);
        }
      } catch (err) {
        console.error("Failed to load profile:", err.message);
      }
    };
    loadProfile();
  }, []);

  const validateProfile = () => {
    const errors = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (profile.fullName && (profile.fullName.trim().length < 3 || profile.fullName.trim().length > 50)) {
      errors.fullName = "Full name must be between 3 and 50 characters";
    } else if (profile.fullName && !nameRegex.test(profile.fullName)) {
      errors.fullName = "Full name can contain only letters and spaces";
    }
    
    if (profile.email && !emailRegex.test(profile.email)) {
      errors.email = "Invalid email format";
    }
    
    if (profile.phone && !phoneRegex.test(profile.phone)) {
      errors.phone = "Phone number must be a valid 10-digit Indian mobile number";
    }
    
    if (profile.experienceYears < 0) {
      errors.experienceYears = "Experience cannot be negative";
    } else if (profile.experienceYears > 60) {
      errors.experienceYears = "Experience seems invalid";
    }
    
    if (profile.qualification && (profile.qualification.trim().length < 2 || profile.qualification.trim().length > 100)) {
      errors.qualification = "Qualification must be between 2 and 100 characters";
    }
    
    if (profile.bio && profile.bio.length > 500) {
      errors.bio = "Bio must not exceed 500 characters";
    }
    
    if (profile.consultationFee <= 0) {
      errors.consultationFee = "Consultation fee must be greater than 0";
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    
    // Real-time validation
    const errors = { ...profileErrors };
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (name === 'fullName') {
      if (value && (value.trim().length < 3 || value.trim().length > 50)) {
        errors.fullName = "Full name must be between 3 and 50 characters";
      } else if (value && !nameRegex.test(value)) {
        errors.fullName = "Full name can contain only letters and spaces";
      } else {
        delete errors.fullName;
      }
    }
    
    if (name === 'phone') {
      if (value && !phoneRegex.test(value)) {
        errors.phone = "Phone number must be a valid 10-digit Indian mobile number";
      } else {
        delete errors.phone;
      }
    }
    
    if (name === 'qualification') {
      if (value && (value.trim().length < 2 || value.trim().length > 100)) {
        errors.qualification = "Qualification must be between 2 and 100 characters";
      } else {
        delete errors.qualification;
      }
    }
    
    if (name === 'experienceYears') {
      if (value < 0) {
        errors.experienceYears = "Experience cannot be negative";
      } else if (value > 60) {
        errors.experienceYears = "Experience seems invalid";
      } else {
        delete errors.experienceYears;
      }
    }
    
    if (name === 'consultationFee') {
      if (value <= 0) {
        errors.consultationFee = "Consultation fee must be greater than 0";
      } else {
        delete errors.consultationFee;
      }
    }
    
    if (name === 'bio') {
      if (value && value.length > 500) {
        errors.bio = "Bio must not exceed 500 characters";
      } else {
        delete errors.bio;
      }
    }
    
    setProfileErrors(errors);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    try {
      const response = await updateProfessionalProfile(profile);
      if (response.success) {
        alert(response.message || "Profile updated successfully");
      } else {
        alert(response.message || "Profile update failed");
      }
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    
    if (!password.oldPassword.trim()) {
      errors.oldPassword = "Old password is required";
    }
    
    if (!password.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (password.newPassword.length < 6 || password.newPassword.length > 64) {
      errors.newPassword = "New password must be between 6 and 64 characters";
    } else if (!passwordRegex.test(password.newPassword)) {
      errors.newPassword = "New password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    
    // Real-time validation
    const errors = { ...passwordErrors };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    
    if (name === 'oldPassword') {
      if (!value.trim()) {
        errors.oldPassword = "Old password is required";
      } else {
        delete errors.oldPassword;
      }
    }
    
    if (name === 'newPassword') {
      if (!value.trim()) {
        errors.newPassword = "New password is required";
      } else if (value.length < 6 || value.length > 64) {
        errors.newPassword = "New password must be between 6 and 64 characters";
      } else if (!passwordRegex.test(value)) {
        errors.newPassword = "New password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
      } else {
        delete errors.newPassword;
      }
    }
    
    setPasswordErrors(errors);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      const response = await changeProfessionalPassword(password);
      if (response.success) {
        alert(response.message || "Password updated successfully");
        setPassword({ oldPassword: "", newPassword: "" });
      } else {
        alert(response.message || "Password update failed");
      }
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
                  {profileErrors.bio && <small className="text-danger">{profileErrors.bio}</small>}
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
                    Use 6-64 characters with uppercase, lowercase, number, and special character
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