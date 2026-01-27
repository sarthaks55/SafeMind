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

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
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

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await changeProfessionalPassword(password);
      alert("Password updated successfully");
      setPassword({ oldPassword: "", newPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Password update failed");
    }
  };

  return (
    <div>
      <h2>Professional Profile</h2>

      {/* ================= PROFILE FORM ================= */}
      <form onSubmit={handleProfileSubmit} style={{ maxWidth: "500px" }}>
        <h4>Update Profile</h4>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleProfileChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleProfileChange}
        />

        <input
          name="qualification"
          placeholder="Qualification"
          onChange={handleProfileChange}
        />

        <input
          name="experienceYears"
          placeholder="Experience (Years)"
          type="number"
          onChange={handleProfileChange}
        />

        <input
          name="consultationFee"
          placeholder="Consultation Fee"
          type="number"
          onChange={handleProfileChange}
        />

        <textarea
          name="bio"
          placeholder="Short Bio"
          onChange={handleProfileChange}
        />

        <button type="submit">Update Profile</button>
      </form>

      <hr />

      {/* ================= PASSWORD FORM ================= */}
      <form onSubmit={handlePasswordSubmit} style={{ maxWidth: "400px" }}>
        <h4>Change Password</h4>

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={password.oldPassword}
          onChange={handlePasswordChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={password.newPassword}
          onChange={handlePasswordChange}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
