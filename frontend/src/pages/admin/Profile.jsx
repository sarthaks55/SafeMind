// src/pages/admin/Profile.jsx
import { useState, useEffect } from "react";
import { getAdminProfile, updateAdminPassword, updateAdminProfile } from "../../api/adminService";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "MALE"
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getAdminProfile();
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
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!nameRegex.test(profile.fullName)) {
      errors.fullName = "Name should contain only letters and be 2-50 characters";
    }
    if (!emailRegex.test(profile.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!phoneRegex.test(profile.phone)) {
      errors.phone = "Phone should be exactly 10 digits";
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    if (profileErrors[e.target.name]) {
      setProfileErrors({ ...profileErrors, [e.target.name]: "" });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({ ...passwordErrors, [e.target.name]: "" });
    }
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    try {
      await updateAdminProfile(profile);
      alert("Profile updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      await updateAdminPassword(password);
      alert("Password updated successfully");
      setPassword({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "20px", overflow: "hidden" }}>
            <div className="card-body text-center py-5 position-relative">
              <h2 className="mb-2 fw-bold">Admin Profile</h2>
              <p className="mb-0 opacity-90">Manage your administrative account settings</p>
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
              <form onSubmit={submitProfile}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-user me-2" style={{ color: "#F3A6A1" }}></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter your full name"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                    required
                  />
                  {profileErrors.fullName && <small className="text-danger">{profileErrors.fullName}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-envelope me-2" style={{ color: "#F3A6A1" }}></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter your email address"
                    value={profile.email}
                    onChange={handleProfileChange}
                    required
                  />
                  {profileErrors.email && <small className="text-danger">{profileErrors.email}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-phone me-2" style={{ color: "#F3A6A1" }}></i>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    placeholder="Enter your phone number"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                  {profileErrors.phone && <small className="text-danger">{profileErrors.phone}</small>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-venus-mars me-2" style={{ color: "#F3A6A1" }}></i>
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="form-select border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    value={profile.gender}
                    onChange={handleProfileChange}
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
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
              <form onSubmit={submitPassword}>
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
                    required
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
                    required
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

export default AdminProfile;
