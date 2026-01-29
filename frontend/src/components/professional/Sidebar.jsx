import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../api/notificationService";

  


const Sidebar = () => {


  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const res = await getUnreadCount();
      setUnreadCount(res.data);
    };
    loadCount();
  }, []);

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Therapist Panel</h3>

      <NavLink to="/professional" end>
        Dashboard
      </NavLink>

      <NavLink to="/professional/profile">
        Profile
      </NavLink>
      <NavLink to="/professional/notifications">
            Notifications
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
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
