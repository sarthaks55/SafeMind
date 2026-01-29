import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginApi({ email, password });
      login(token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "ROLE_ADMIN") navigate("/admin");
      else if (payload.role === "ROLE_PROFESSIONAL")
        navigate("/professional");
      else navigate("/user");

    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card shadow p-4">
        <h4 className="text-center mb-3">Login</h4>

        <form onSubmit={submit}>
          <input className="form-control mb-3"
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <input className="form-control mb-3"
            type="password"
            placeholder="Password"
            required
            onChange={e => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
