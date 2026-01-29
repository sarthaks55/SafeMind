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
    <div className="admin-card">
      <h2>Notifications</h2>

      {notifications.length === 0 && (
        <p>No notifications</p>
      )}

      {notifications.map((n) => (
  <div
    key={n.notificationId}
    style={{
      border: "1px solid #ddd",
      padding: "12px",
      marginBottom: "10px",
      background: "#eef5ff",
    }}
  >
    <h4>{n.title}</h4>
    <p>{n.message}</p>
    <small>
      {new Date(n.created).toLocaleString()}
    </small>

    <div>
      <button
        onClick={() => handleRead(n.notificationId)}
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
