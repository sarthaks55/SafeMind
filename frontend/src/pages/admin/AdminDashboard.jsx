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
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAF9F7" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
          color: "#fff",
          padding: "20px",
          boxShadow: "2px 0 15px rgba(142, 110, 200, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Decorative Elements */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "100px",
          height: "100px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "-30px",
          width: "80px",
          height: "80px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%"
        }}></div>

        {/* Logo Section */}
        <div className="text-center mb-4" style={{ position: "relative", zIndex: 1 }}>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ 
                   width: "60px", 
                   height: "60px", 
                   backgroundColor: "rgba(255, 255, 255, 0.2)",
                   backdropFilter: "blur(10px)",
                   border: "2px solid rgba(255, 255, 255, 0.3)",
                   overflow: "hidden"
                 }}>
              <img src="https://cdn-icons-png.flaticon.com/512/2784/2784403.png" 
                   alt="SafeMind Logo" 
                   style={{ width: "35px", height: "35px", objectFit: "contain" }} />
            </div>
          </div>
          <h4 className="mb-1" style={{ color: "#FFFFFF", fontWeight: "bold", letterSpacing: "1px" }}>SafeMind</h4>
          <p className="mb-0" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" }}>Admin Control</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <NavLink 
            to="/admin" 
            end
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease"
            })}
          >
            <i className="fas fa-home me-2"></i>
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/profile"
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease"
            })}
          >
            <i className="fas fa-user me-2"></i>
            Profile
          </NavLink>
          <NavLink 
            to="/admin/users"
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease"
            })}
          >
            <i className="fas fa-users me-2"></i>
            Users
          </NavLink>
          <NavLink 
            to="/admin/professionals"
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease"
            })}
          >
            <i className="fas fa-user-md me-2"></i>
            Professionals
          </NavLink>
          <NavLink 
            to="/admin/appointments"
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            })}
          >
            <span><i className="fas fa-calendar-check me-2"></i>Appointments</span>
          </NavLink>
          <NavLink 
            to="/admin/notifications"
            style={({ isActive }) => ({
              color: "#FFFFFF",
              textDecoration: "none",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: isActive ? "#7A5BC7" : "transparent",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            })}
          >
            <span><i className="fas fa-bell me-2"></i>Notifications</span>
            {unreadCount > 0 && (
              <span 
                style={{
                  backgroundColor: "#F3A6A1",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold"
                }}
              >
                {unreadCount}
              </span>
            )}
          </NavLink>
        </nav>

        <button
          onClick={logout}
          style={{
            marginTop: "30px",
            padding: "12px 16px",
            background: "#D9899A",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "500",
            transition: "all 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#E8A1B0"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#D9899A"}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: "#FAF9F7" }}>
        {/* Top Navbar */}
        <header
          style={{
            height: "80px",
            background: "linear-gradient(135deg, #7A5BC7 0%, #6B46C1 100%)",
            borderBottom: "1px solid #8E6EC8",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            boxShadow: "0 4px 20px rgba(122, 91, 199, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Header Decorative Elements */}
          <div style={{
            position: "absolute",
            top: "-20px",
            right: "100px",
            width: "60px",
            height: "60px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%"
          }}></div>
          
          <div className="d-flex align-items-center" style={{ position: "relative", zIndex: 1 }}>
            <div className="me-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center" 
                   style={{ 
                     width: "45px", 
                     height: "45px", 
                     backgroundColor: "rgba(255, 255, 255, 0.2)",
                     backdropFilter: "blur(10px)",
                     border: "2px solid rgba(255, 255, 255, 0.3)"
                   }}>
                <i className="fas fa-tachometer-alt" style={{ color: "#FFFFFF", fontSize: "18px" }}></i>
              </div>
            </div>
            <div>
              <h3 style={{ color: "#FFFFFF", fontWeight: "bold", margin: 0, fontSize: "24px" }}>
                Admin Dashboard
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: 0, fontSize: "12px", opacity: 0.8 }}>System Management Portal</p>
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-3" style={{ position: "relative", zIndex: 1 }}>
            <div className="rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ 
                   width: "40px", 
                   height: "40px", 
                   backgroundColor: "rgba(255, 255, 255, 0.2)",
                   backdropFilter: "blur(10px)",
                   cursor: "pointer"
                 }}>
              <i className="fas fa-bell" style={{ color: "#FFFFFF", fontSize: "16px" }}></i>
            </div>
            <div className="rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ 
                   width: "40px", 
                   height: "40px", 
                   backgroundColor: "rgba(255, 255, 255, 0.2)",
                   backdropFilter: "blur(10px)",
                   cursor: "pointer"
                 }}>
              <i className="fas fa-user-shield" style={{ color: "#FFFFFF", fontSize: "16px" }}></i>
            </div>
          </div>
        </header>

        <section style={{ padding: "30px" }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
