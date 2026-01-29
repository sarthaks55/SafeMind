// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { getAllUsers, updateUserActivation } from "../../api/adminService";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleActivation = async (userId, currentStatus) => {
    try {
      await updateUserActivation(userId, !currentStatus);
      setUsers((prev) =>
        prev.map((u) =>
          u.userId === userId ? { ...u, isActive: !currentStatus } : u,
        ),
      );
    } catch {
      alert("Failed to update user status");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users Management</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
            <th>Appointments</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.userId}>
              <td>{u.userId}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.gender}</td>
              <td>{u.isActive ? "Inactive" : "Active"}</td>
              <td>
                <button
                  onClick={() => toggleActivation(u.userId, u.isActive)}
                  style={{
                    background: u.isActive ? "green" : "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {u.isActive ? "Activate" : "Deactivate"}
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/admin/appointments?userId=${u.userId}`)
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
