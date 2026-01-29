// src/pages/admin/AdminDashboard.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../api/notificationService";

const AdminDashboard = () => {
  const { logout } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const res = await getUnreadCount();
      setUnreadCount(res.data);
    };
    loadCount();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "240px",
          background: "#1e293b",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/professionals">Professionals</NavLink>
          <NavLink to="/admin/appointments">Appointments</NavLink>
          <NavLink to="/admin/notifications">
            Notifications
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </NavLink>
        </nav>

        <button
          onClick={logout}
          style={{
            marginTop: "30px",
            padding: "10px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f8fafc" }}>
        {/* Top Navbar */}
        <header
          style={{
            height: "60px",
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <h3>Admin Dashboard</h3>
          {/* Notification Bell will come here */}
        </header>

        <section style={{ padding: "20px" }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
