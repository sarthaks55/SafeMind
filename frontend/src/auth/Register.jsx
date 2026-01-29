import { useState } from "react";
import { Link } from "react-router-dom";
import RegisterUser from "./RegisterUser";
import RegisterProfessional from "./RegisterProfessional";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  if (selectedRole === "user") {
    return <RegisterUser onBack={() => setSelectedRole(null)} />;
  }

  if (selectedRole === "professional") {
    return <RegisterProfessional onBack={() => setSelectedRole(null)} />;
  }

  return (
    <div style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <img src="https://assets.theinnerhour.com/bloguploads/Busting%20Myths%20About%20Mental%20Health%20Conditions%20Setting%20the%20Record%20Straight1682577919592.jpg" 
                   alt="Mental Health" 
                   className="rounded-circle mb-3" 
                   style={{ width: "80px", height: "80px", objectFit: "cover" }} />
              <h2 className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>Join SafeMind</h2>
              <p style={{ color: "#CFCFD4" }}>Choose how you'd like to get started</p>
            </div>
            
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card border-0 shadow-lg h-100" 
                     style={{ borderRadius: "20px", cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden" }}
                     onClick={() => setSelectedRole("user")}
                     onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                     onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div className="card-body p-0">
                    <div className="p-4 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #C6B7E2 100%)" }}>
                      <h4 className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>I Need Support</h4>
                      <p className="mb-0" style={{ color: "#7A5BC7" }}>Seeking mental health guidance</p>
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                      <ul className="list-unstyled mb-4" style={{ color: "#CFCFD4" }}>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#8E6EC8" }}></i>Connect with professionals</li>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#8E6EC8" }}></i>Track your mood daily</li>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#8E6EC8" }}></i>Private journal space</li>
                      </ul>
                      <button className="btn w-100 py-3 fw-bold" 
                              style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", 
                                       color: "white", border: "none", borderRadius: "12px" }}>
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card border-0 shadow-lg h-100" 
                     style={{ borderRadius: "20px", cursor: "pointer", transition: "all 0.3s ease", overflow: "hidden" }}
                     onClick={() => setSelectedRole("professional")}
                     onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                     onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  <div className="card-body p-0">
                    <div className="p-4 text-center" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F3A6A1 100%)" }}>
                      <h4 className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>I'm a Professional</h4>
                      <p className="mb-0" style={{ color: "#D9899A" }}>Providing mental health services</p>
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#FFFFFF" }}>
                      <ul className="list-unstyled mb-4" style={{ color: "#CFCFD4" }}>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#F3A6A1" }}></i>Manage client appointments</li>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#F3A6A1" }}></i>Set your availability</li>
                        <li className="mb-2"><i className="fas fa-check me-2" style={{ color: "#F3A6A1" }}></i>Professional dashboard</li>
                      </ul>
                      <button className="btn w-100 py-3 fw-bold" 
                              style={{ background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)", 
                                       color: "white", border: "none", borderRadius: "12px" }}>
                        Join as Professional
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <Link to="/login" className="fw-bold" style={{ color: "#8E6EC8", textDecoration: "none" }}>
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;