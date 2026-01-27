import { useState } from "react";
import { updateProfile, changePassword } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";

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

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(profile);
      alert("Profile updated successfully");
      setAuth((prev) => ({ ...prev, ...res.data }));
    } catch (err) {
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwords);
      alert("Password changed successfully");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">My Profile</h2>

      {/* PROFILE UPDATE */}
      <form onSubmit={submitProfile} className="mb-5">
        <h5>Update Information</h5>

        <div className="mb-3">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={profile.fullName}
            onChange={handleProfileChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={profile.phone}
            onChange={handleProfileChange}
          />
        </div>

        <button className="btn btn-primary">
          Update Profile
        </button>
      </form>

      {/* PASSWORD CHANGE */}
      <form onSubmit={submitPassword}>
        <h5>Change Password</h5>

        <div className="mb-3">
          <label>Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="form-control"
            value={passwords.oldPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button className="btn btn-warning">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Profile;
