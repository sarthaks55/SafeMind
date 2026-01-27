import { Outlet } from "react-router-dom";
import Sidebar from "../../components/professional/Sidebar";
import Navbar from "../../components/professional/Navbar";
import "./ProfessionalDashboard.css";

const ProfessionalDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
