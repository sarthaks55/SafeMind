import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside style={{ width: "250px", background: "linear-gradient(180deg, #8E6EC8 0%, #7A5BC7 100%)", color: "#fff", minHeight: "100vh" }}>
      <div style={{ padding: "25px 20px", borderBottom: "1px solid #B39DDB" }}>
        <h4 className="mb-0" style={{ color: "#FFFFFF" }}>
          <i className="fas fa-user-circle me-2" style={{ color: "#C6B7E2" }}></i>
          SafeMind
        </h4>
      </div>

      <nav className="d-flex flex-column p-3">
        <NavLink 
          to="/user" 
          className="text-decoration-none text-white p-3 mb-2 rounded" 
          style={{ transition: "all 0.3s", backgroundColor: "transparent" }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#B39DDB"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          <i className="fas fa-home me-3" style={{ color: "#F3A6A1" }}></i>
          Dashboard
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
          <i className="fas fa-book me-3" style={{ color: "#D9899A" }}></i>
          Diary
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
