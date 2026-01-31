import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation with comprehensive regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation with regex for strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must contain at least 6 characters, 1 uppercase, 1 lowercase, and 1 number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const resToken = await loginApi({ email, password });
      const token = resToken.token;
      login(token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role === "ROLE_ADMIN") navigate("/admin");
      else if (payload.role === "ROLE_PROFESSIONAL")
        navigate("/professional");
      else navigate("/user");

    } catch (err) {
      console.log(err);
  const msg = err.response?.data?.message;

  if (msg?.includes("not verified")) {
    alert("Please verify OTP before login");
  } else {
    alert("Invalid credentials");
  }
}
  };

  return (
    <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div className="text-center mb-4">
              <img src="https://myemotionalfirstaid.org/wp-content/uploads/2023/10/Creating-Awareness-about-Mental-Health-Concerns.png" 
                   alt="SafeMind" 
                   className="rounded-circle mb-3" 
                   style={{ width: "60px", height: "60px", objectFit: "cover" }} />
              <h2 className="fw-bold" style={{ color: "#8E6EC8" }}>SafeMind</h2>
              <p style={{ color: "#CFCFD4" }}>Mental Health Platform</p>
            </div>
            
            <div className="card border-0 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden" }}>
              <div className="card-body p-0">
                <div className="p-4" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #C6B7E2 100%)" }}>
                  <div className="text-center mb-4">
                    <h4 className="fw-bold" style={{ color: "#8E6EC8" }}>Welcome Back</h4>
                    <p className="mb-0" style={{ color: "#7A5BC7" }}>Sign in to continue</p>
                  </div>
                </div>
                
                <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                  <form onSubmit={submit}>
                    {errors.general && (
                      <div className="alert alert-danger" style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}>
                        {errors.general}
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: "#FFFFFF", border: "2px solid #C6B7E2", borderRight: "none" }}>
                          <i className="fas fa-envelope" style={{ color: "#8E6EC8" }}></i>
                        </span>
                        <input className="form-control py-3"
                          type="email"
                          placeholder="Email Address"
                          style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", border: "2px solid #C6B7E2", borderLeft: "none" }}
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text" style={{ backgroundColor: "#FFFFFF", border: "2px solid #C6B7E2", borderRight: "none" }}>
                          <i className="fas fa-lock" style={{ color: "#8E6EC8" }}></i>
                        </span>
                        <input className="form-control py-3"
                          type="password"
                          placeholder="Password"
                          style={{ backgroundColor: "#FFFFFF", color: "#8E6EC8", border: "2px solid #C6B7E2", borderLeft: "none" }}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <button className="btn w-100 py-3 fw-bold mb-3" 
                            style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", 
                                     color: "white", border: "none", borderRadius: "12px" }}>
                      Sign In
                    </button>
                  </form>

                  <div className="text-center">
                    <span style={{ color: "#CFCFD4" }}>Don't have an account? </span>
                    <Link to="/register" className="fw-bold" style={{ color: "#8E6EC8", textDecoration: "none" }}>
                      Create Account
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
