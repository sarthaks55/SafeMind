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

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await updateProfile(profile);
      if (response.success) {
        setSuccessMessage(response.message || "Profile updated successfully");
      } else {
        setErrorMessage(response.message || "Profile update failed");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Profile update failed");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    try {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await changePassword(passwords);
      if (response.success) {
        setSuccessMessage(response.message || "Password changed successfully");
        setPasswords({ oldPassword: "", newPassword: "" });
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
