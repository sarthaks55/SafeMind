import { NavLink } from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Therapist Panel</h3>

      <NavLink to="/professional" end>
        Dashboard
      </NavLink>

      <NavLink to="/professional/profile">
        Profile
      </NavLink>

      <NavLink to="/professional/appointments">
        Appointments
      </NavLink>

      <NavLink to="/professional/availability">
        Availability
      </NavLink>
    </div>
  );
};

export default Sidebar;
