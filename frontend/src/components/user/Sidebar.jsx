import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../api/notificationService";





const Sidebar = () => {

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };


    const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      const res = await getUnreadCount();
      setUnreadCount(res.data);
    };
    loadCount();
  }, []);

  return (
    <aside style={{ width: "220px", background: "#1f2937", color: "#fff" }}>
      <h4 style={{ padding: "20px" }}>User Panel</h4>

      <nav className="d-flex flex-column gap-2 px-3">
        <NavLink to="/user" className="text-white">Dashboard</NavLink>
        <NavLink to="/user/profile" className="text-white">Profile</NavLink>
        <NavLink to="/user/notifications">
            Notifications
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </NavLink>
        <NavLink to="/user/appointments" className="text-white">Appointments</NavLink>
        <NavLink to="/user/book" className="text-white">Book Appointment</NavLink>
        <NavLink to="/user/moods" className="text-white">Mood Tracker</NavLink>
        <NavLink to="/user/diary" className="text-white">Diary</NavLink>
        <NavLink to="/login" className="text-white" onClick={handleLogout}>Logout</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
