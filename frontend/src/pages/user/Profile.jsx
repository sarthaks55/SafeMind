import { useState, useEffect } from "react";
import { getProfile, updateProfile, changePassword } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const [profile, setProfile] = useState({
    fullName: auth?.fullName || "",
    phone: auth?.phone || "",
  });

  const [profileErrors, setProfileErrors] = useState({});

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
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validatePassword = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    
    if (!passwords.oldPassword.trim()) {
      errors.oldPassword = "Old password is required";
    }
    
    if (!passwords.newPassword.trim()) {
      errors.newPassword = "New password is required";
    } else if (passwords.newPassword.length < 6 || passwords.newPassword.length > 64) {
      errors.newPassword = "New password must be between 6 and 64 characters";
    } else if (!passwordRegex.test(passwords.newPassword)) {
      errors.newPassword = "New password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        if (response.success) {
          setProfile(response.data);
        }
      } catch (err) {
        // Silently handle network errors when backend is down
        console.error("Failed to load profile:", err.message);
      }
    };
    loadProfile();
  }, []);

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
    
    if (name === 'email') {
      if (value && !emailRegex.test(value)) {
        errors.email = "Invalid email format";
      } else {
        delete errors.email;
      }
    }
    
    if (name === 'phone') {
      if (value && !phoneRegex.test(value)) {
        errors.phone = "Phone number must be a valid 10-digit Indian mobile number";
      } else {
        delete errors.phone;
      }
    }
    
    setProfileErrors(errors);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
    
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

  const submitProfile = async (e) => {
    e.preventDefault();
    if (!validateProfile()) return;
    
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await updateProfile(profile);
      if (response.success) {
        setSuccessMessage(response.message || "Profile updated successfully");
        setProfileErrors({});
      } else {
        setErrorMessage(response.message || "Profile update failed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Profile update failed");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await changePassword(passwords);
      if (response.success) {
        setSuccessMessage(response.message || "Password changed successfully");
        setPasswords({ oldPassword: "", newPassword: "" });
        setPasswordErrors({});
      } else {
        setErrorMessage(response.message || "Password change failed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h2 className="mb-0">My Profile</h2>
              <p className="mb-0 opacity-90">Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
          <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #F3A6A1" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-user-edit me-2" style={{ color: "#F3A6A1" }}></i>
                Update Information
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={submitProfile}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}
                    value={profile.fullName}
                    onChange={handleProfileChange}
                    required
                  />
                  {profileErrors.fullName && <small className="text-danger">{profileErrors.fullName}</small>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                  {profileErrors.phone && <small className="text-danger">{profileErrors.phone}</small>}
                </div>

                <button className="btn px-4 py-2" style={{ backgroundColor: "#8E6EC8", color: "white", border: "none", borderRadius: "8px" }}>
                  <i className="fas fa-save me-2"></i>
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #F6C453" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-lock me-2" style={{ color: "#F6C453" }}></i>
                Change Password
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={submitPassword}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordErrors.oldPassword && <small className="text-danger">{passwordErrors.oldPassword}</small>}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-control border-0 shadow-sm"
                    style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                  {passwordErrors.newPassword && <small className="text-danger">{passwordErrors.newPassword}</small>}
                  <small className="text-muted mt-2 d-block">
                    <i className="fas fa-info-circle me-1"></i>
                    Use 6-64 characters with uppercase, lowercase, number, and special character
                  </small>
                </div>

                <button className="btn px-4 py-2" style={{ backgroundColor: "#7A5BC7", color: "white", border: "none", borderRadius: "8px" }}>
                  <i className="fas fa-key me-2"></i>
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
