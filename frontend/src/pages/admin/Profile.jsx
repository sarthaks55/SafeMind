// src/pages/admin/Profile.jsx
import { useState } from "react";
import { updateAdminPassword, updateAdminProfile } from "../../api/adminService";


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

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const submitProfile = async (e) => {
    e.preventDefault();
    try {
      await updateAdminProfile(profile);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    try {
      await updateAdminPassword(password);
      alert("Password updated successfully");
      setPassword({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert("Failed to update password");
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Admin Profile</h2>

      {/* Profile Update */}
      <form onSubmit={submitProfile}>
        <h3>Update Profile</h3>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={handleProfileChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleProfileChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleProfileChange}
        />

        <select
          name="gender"
          value={profile.gender}
          onChange={handleProfileChange}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button type="submit">Update Profile</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      {/* Password Update */}
      <form onSubmit={submitPassword}>
        <h3>Change Password</h3>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={password.oldPassword}
          onChange={handlePasswordChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={password.newPassword}
          onChange={handlePasswordChange}
          required
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default AdminProfile;
