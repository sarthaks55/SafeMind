import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../api/notificationService";


const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


    const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        const res = await getUnreadCount();
        if (res.success) {
          setUnreadCount(res.data);
        }
      } catch (err) {
        // Silently handle network errors
        console.error("Failed to load notification count:", err.message);
      }
    };
    loadCount();
  }, []);

  return (
    <aside style={{ width: "250px", background: "linear-gradient(180deg, #8E6EC8 0%, #7A5BC7 100%)", color: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "25px 20px", borderBottom: "1px solid #B39DDB", textAlign: "center" }}>
        <div className="mb-3">
          <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto" 
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
        <h4 className="mb-0" style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          SafeMind
        </h4>
        <p className="mb-0" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>User Portal</p>
      </div>
      <nav className="d-flex flex-column p-3">
        <NavLink 
          to="/" 
          className="text-decoration-none text-white p-3 mb-2 rounded" 
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-home me-3" style={{ color: "#F3A6A1" }}></i>
          Home
        </NavLink>
        
        <NavLink 
          to="/user/profile" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-user me-3" style={{ color: "#F6C453" }}></i>
          Profile
        </NavLink>

        <NavLink 
          to="/user/notifications" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        > 
          <i className="fas fa-bell me-3" style={{ color: "#F6C453" }}></i>
          Notifications
          {unreadCount > 0 && (
            <span 
              style={{
                backgroundColor: "#F3A6A1",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
                marginLeft: "8px"
              }}
            >
              {unreadCount}
            </span>
          )}
        </NavLink>
        
        <NavLink 
          to="/user/appointments" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-calendar-check me-3" style={{ color: "#E8A1B0" }}></i>
          Appointments
        </NavLink>
        
        <NavLink 
          to="/user/book" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-plus-circle me-3" style={{ color: "#F29C50" }}></i>
          Book Appointment
        </NavLink>
        
        <NavLink 
          to="/user/moods" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-smile me-3" style={{ color: "#F6C453" }}></i>
          Mood Tracker
        </NavLink>
        
        <NavLink 
          to="/user/diary" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-book me-3" style={{ color: "#F6C453" }}></i>
          Diary
        </NavLink>

        <NavLink 
          to="/assessments" 
          className="text-decoration-none text-white p-3 mb-2 rounded"
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-user me-3" style={{ color: "#F6C453" }}></i>
          Assessments
        </NavLink>
        
        <button 
          onClick={handleLogout}
          className="btn text-white p-3 mt-3 rounded border-0 w-100 text-start"
          style={{ backgroundColor: "#D9899A", transition: "all 0.3s" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#E8A1B0"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#D9899A"}
        >
          <i className="fas fa-sign-out-alt me-3"></i>
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
