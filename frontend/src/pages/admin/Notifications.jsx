import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
} from "../../api/notificationService";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    const res = await getNotifications();
    setNotifications(res.data);
  };

  const handleRead = async (id) => {
  await markAsRead(id);

  // Remove notification from UI instantly
  setNotifications((prev) =>
    prev.filter((n) => n.notificationId !== id)
  );
};

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="admin-card" style={{ padding: "30px", backgroundColor: "#FFFFFF", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#7A5BC7", marginBottom: "25px", fontSize: "28px", fontWeight: "600" }}>Notifications</h2>

      {notifications.length === 0 && (
        <p style={{ textAlign: "center", color: "#666", fontSize: "16px", padding: "40px", backgroundColor: "#F8F9FA", borderRadius: "8px" }}>No notifications</p>
      )}

      {notifications.map((n) => (
  <div
    key={n.notificationId}
    style={{
      border: "1px solid #E8E8E8",
      padding: "20px",
      marginBottom: "15px",
      background: "linear-gradient(135deg, #F8F9FF 0%, #EEF5FF 100%)",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(122, 91, 199, 0.1)",
      transition: "transform 0.2s ease"
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
  >
    <h4 style={{ color: "#333", marginBottom: "10px", fontSize: "18px", fontWeight: "500" }}>{n.title}</h4>
    <p style={{ color: "#555", lineHeight: "1.5", marginBottom: "12px" }}>{n.message}</p>
    <small style={{ color: "#888", fontSize: "13px" }}>
      {new Date(n.created).toLocaleString()}
    </small>

    <div style={{ marginTop: "15px" }}>
      <button
        onClick={() => handleRead(n.notificationId)}
        style={{
          backgroundColor: "#7A5BC7",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#6B46C1"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#7A5BC7"}
      >
        Mark as read
      </button>
    </div>
  </div>
))}

    </div>
  );
};

export default Notifications;
