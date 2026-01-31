// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { getAllUsers, updateUserActivation } from "../../api/adminService";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActivation = async (userId, currentStatus) => {
    try {
      await updateUserActivation(userId, !currentStatus);
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, active: !currentStatus } : u,
        ),
      );
    } catch {
      alert("Failed to update user status");
    }
  };

  const getStatusBadge = (isActive) => {
    return isActive 
      ? { bg: "#F3A6A1", color: "white", text: "Active" }
      : { bg: "#CFCFD4", color: "white", text: "Inactive" };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border" style={{ color: "#8E6EC8" }}></div>
        <span className="ms-2" style={{ color: "#8E6EC8" }}>Loading users...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-users me-2"></i>
                Users Management
              </h3>
              <p className="mb-0 opacity-90">Manage user accounts and permissions</p>
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
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Full Name</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Email</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Phone</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Gender</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Status</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => {
                  const statusStyle = getStatusBadge(u.active);
                  return (
                    <tr key={u.userId} className="border-bottom">
                      <td className="py-3 px-4">
                        <span className="badge" style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}>#{u.userId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                               style={{ width: "32px", height: "32px", fontSize: "12px", backgroundColor: "#8E6EC8", color: "white" }}>
                            {u.fullName?.charAt(0) || 'U'}
                          </div>
                          <span className="fw-medium" style={{ color: "#8E6EC8" }}>{u.fullName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4" style={{ color: "#8E6EC8" }}>{u.email}</td>
                      <td className="py-3 px-4" style={{ color: "#8E6EC8" }}>{u.phone}</td>
                      <td className="py-3 px-4">
                        <span className="badge" style={{ backgroundColor: "#F6C453", color: "white" }}>{u.gender}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge px-3 py-2" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                          {statusStyle.text}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => toggleActivation(u.userId, u.active)}
                            className="btn btn-sm px-3"
                            style={{
                              backgroundColor: u.active ? "#D9899A" : "#F3A6A1",
                              color: "white",
                              border: "none",
                              borderRadius: "8px"
                            }}
                          >
                            <i className={`fas ${u.active ? 'fa-ban' : 'fa-check'} me-1`}></i>
                            {u.active ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => navigate(`/admin/appointments?userId=${u.userId}`)}
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
                {users.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-5" style={{ color: "#CFCFD4" }}>
                      <i className="fas fa-users fa-3x mb-3 opacity-50"></i>
                      <div>No users found</div>
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

export default Users;
