import { useState } from "react";
import { registerProfessionalApi } from "../api/authApi";

const RegisterProfessional = () => {
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      await registerProfessionalApi(form);
      alert(
        "Professional registered successfully.\nWaiting for admin verification."
      );
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Professional Registration</h4>

        <input className="form-control mb-2"
          placeholder="Full Name"
          onChange={e => setForm({ ...form, fullName: e.target.value })}
        />

        <input className="form-control mb-2"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input type="password" className="form-control mb-2"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input className="form-control mb-2"
          placeholder="Phone"
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />

        <select className="form-control mb-2"
          onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option>MALE</option>
          <option>FEMALE</option>
        </select>

        <select className="form-control mb-2"
          onChange={e => setForm({ ...form, specialization: e.target.value })}>
          <option>THERAPIST</option>
          <option>PSYCHIATRIST</option>
          <option>CHILD_SPECIALIST</option>
          <option>COUPLES_THERAPIST</option>
        </select>

        <select className="form-control mb-2"
          onChange={e => setForm({ ...form, spokenLanguage: e.target.value })}>
          <option>ENGLISH</option>
          <option>HINDI</option>
          <option>MARATHI</option>
        </select>

        <input type="number" className="form-control mb-2"
          placeholder="Experience (Years)"
          onChange={e => setForm({ ...form, experienceYears: e.target.value })}
        />

        <input className="form-control mb-2"
          placeholder="Qualification"
          onChange={e => setForm({ ...form, qualification: e.target.value })}
        />

        <textarea className="form-control mb-2"
          placeholder="Short Bio"
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        <input type="number" className="form-control mb-3"
          placeholder="Consultation Fee"
          onChange={e => setForm({ ...form, consultationFee: e.target.value })}
        />

        <button className="btn btn-warning w-100" onClick={submit}>
          Register as Professional
        </button>
      </div>
    </div>
  );
};

export default RegisterProfessional;
