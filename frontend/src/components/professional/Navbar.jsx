import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { auth } = useAuth();

  return (
    <div className="navbar-professional" style={{ 
      background: "linear-gradient(135deg, #6B46C1 0%, #553C9A 100%)", 
      padding: "15px 30px", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      boxShadow: "0 4px 15px rgba(107, 70, 193, 0.3)",
      borderRadius: "0 0 20px 20px",
      marginBottom: "20px"
    }}>
      <div className="welcome-section" style={{ display: "flex", alignItems: "center" }}>
        <div className="professional-avatar" style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "15px",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}>
          {auth?.fullName?.charAt(0) || 'P'}
        </div>
        <div>
          <div style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "2px" }}>
            Welcome back, Dr. {auth?.fullName || 'Professional'}
          </div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>
            <i className="fas fa-stethoscope me-2"></i>
            Mental Health Professional
          </div>
        </div>
      </div>
      
      <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div className="notification-bell" style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}>
          <i className="fas fa-bell"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
