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

  if (loading) return <p>Loading professionals...</p>;

  return (
    <div>
      <h2>Professionals Management</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Professional ID</th>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Verification</th>
            <th>Actions</th>
            <th>Appointments</th>
          </tr>
        </thead>

        <tbody>
          {professionals.map((p) => (
            <tr key={p.professionalId}>
              <td>{p.professionalId}</td>
              <td>{p.userId}</td>
              <td>{p.fullName}</td>
              <td>{p.email}</td>
              <td>{p.isVerified ? "Verified" : "Unverified"}</td>
              <td>
                <button
                  onClick={() => toggleVerification(p.userId, p.isVerified)}
                  style={{
                    background: p.isVerified ? "red" : "green",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "8px",
                  }}
                >
                  {p.isVerified ? "Unverify" : "Verify"}
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    navigate(
                      `/admin/appointments?professionalId=${p.professionalId}`,
                    )
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Professionals;
