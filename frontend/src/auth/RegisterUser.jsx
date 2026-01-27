import React, { useState } from "react";
import { registerUserApi } from "../api/authApi";

const RegisterUser = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "MALE",
    role: "ROLE_USER"
  });

  const submit = async (e) => {
    e.preventDefault();
    await registerUserApi(form);
    alert("User registered successfully");
  };

  return (
    <div className="container col-md-5 mt-5">
      <div className="card p-4 shadow">
        <h4>User Registration</h4>
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          className="form-control mb-3"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option>MALE</option>
          <option>FEMALE</option>
          <option>OTHERS</option>
        </select>

        <button onClick={submit} className="btn btn-success w-100">
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
