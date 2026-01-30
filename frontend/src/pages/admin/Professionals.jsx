// src/pages/admin/Professionals.jsx
import { useEffect, useState } from "react";
import {
  getAllProfessionals,
  updateProfessionalVerification,
} from "../../api/adminService";
import { useNavigate } from "react-router-dom";

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProfessionals = async () => {
    try {
      const res = await getAllProfessionals();
      setProfessionals(res.data);
    } catch {
      alert("Failed to load professionals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const toggleVerification = async (userId, currentStatus) => {
    try {
      await updateProfessionalVerification(userId, !currentStatus);
      setProfessionals((prev) =>
        prev.map((p) =>
          p.userId === userId ? { ...p, isVerified: !currentStatus } : p,
        ),
      );
    } catch {
      alert("Failed to update verification");
    }
  };

  const getVerificationBadge = (isVerified) => {
    return isVerified 
      ? { bg: "#F3A6A1", color: "white", text: "Verified" }
      : { bg: "#F6C453", color: "white", text: "Unverified" };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border" style={{ color: "#8E6EC8" }}></div>
        <span className="ms-2" style={{ color: "#8E6EC8" }}>Loading professionals...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #E8A1B0 0%, #D9899A 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-user-md me-2"></i>
                Professionals Management
              </h3>
              <p className="mb-0 opacity-90">Verify and manage therapists</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "#C6B7E2" }}>
                <tr>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Professional ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>User ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Full Name</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Email</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Verification</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {professionals.map((p) => {
                  const verificationStyle = getVerificationBadge(p.isVerified);
                  return (
                    <tr key={p.professionalId} className="border-bottom">
                      <td className="py-3 px-4">
                        <span className="badge" style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}>#{p.professionalId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge" style={{ backgroundColor: "#B39DDB", color: "white" }}>#{p.userId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                               style={{ width: "32px", height: "32px", fontSize: "12px", backgroundColor: "#8E6EC8", color: "white" }}>
                            Dr
                          </div>
                          <span className="fw-medium" style={{ color: "#8E6EC8" }}>{p.fullName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4" style={{ color: "#8E6EC8" }}>{p.email}</td>
                      <td className="py-3 px-4">
                        <span className="badge px-3 py-2" style={{ backgroundColor: verificationStyle.bg, color: verificationStyle.color }}>
                          <i className={`fas ${p.isVerified ? 'fa-check-circle' : 'fa-clock'} me-1`}></i>
                          {verificationStyle.text}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => toggleVerification(p.userId, p.isVerified)}
                            className="btn btn-sm px-3"
                            style={{
                              backgroundColor: p.isVerified ? "#D9899A" : "#F3A6A1",
                              color: "white",
                              border: "none",
                              borderRadius: "8px"
                            }}
                          >
                            <i className={`fas ${p.isVerified ? 'fa-times' : 'fa-check'} me-1`}></i>
                            {p.isVerified ? "Unverify" : "Verify"}
                          </button>
                          <button
                            onClick={() => navigate(`/admin/appointments?professionalId=${p.professionalId}`)}
                            className="btn btn-sm px-3"
                            style={{
                              backgroundColor: "#8E6EC8",
                              color: "white",
                              border: "none",
                              borderRadius: "8px"
                            }}
                          >
                            <i className="fas fa-calendar-check me-1"></i>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {professionals.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5" style={{ color: "#CFCFD4" }}>
                      <i className="fas fa-user-md fa-3x mb-3 opacity-50"></i>
                      <div>No professionals found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professionals;
