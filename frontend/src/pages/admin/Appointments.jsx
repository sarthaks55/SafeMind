import { useEffect, useState } from "react";
import {
  getAllAppointments,
  getAppointmentsByStatus,
  getAppointmentsBetweenDates,
  getAppointmentsByUser,
  getAppointmentsByProfessional,
} from "../../api/adminService";
import { useSearchParams } from "react-router-dom";


const STATUSES = [
  "PENDING",
  "CONFIRMED",
  "BOOKED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const professionalId = searchParams.get("professionalId");


  const fetchAll = async () => {
    const res = await getAllAppointments();
    setAppointments(res.data);
  };

  useEffect(() => {
  const load = async () => {
    if (userId) {
      const res = await getAppointmentsByUser(userId);
      setAppointments(res.data);
    } else if (professionalId) {
      const res = await getAppointmentsByProfessional(professionalId);
      setAppointments(res.data);
    } else {
      const res = await getAllAppointments();
      setAppointments(res.data);
    }
  };
  load();
}, [userId, professionalId]);


  const filterByStatus = async () => {
    if (!status) return;
    const res = await getAppointmentsByStatus(status);
    setAppointments(res.data);
  };

  const filterByUser = async () => {
    if (!userId) return;
    const res = await getAppointmentsByUser(userId);
    setAppointments(res.data);
  };

  const filterByProfessional = async () => {
    if (!professionalId) return;
    const res = await getAppointmentsByProfessional(professionalId);
    setAppointments(res.data);
  };

  const filterByDates = async () => {
    if (!start || !end) return;
    const res = await getAppointmentsBetweenDates(start, end);
    setAppointments(res.data);
  };

  return (
    <div>
      <h2>Appointments Management</h2>

      {/* FILTER CONTROLS */}
      <div style={{ marginBottom: "20px" }}>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Filter by Status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button onClick={filterByStatus}>Apply</button>

        

        

        <br /><br />

        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={filterByDates}>Between Dates</button>

        <button onClick={fetchAll} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      {/* APPOINTMENTS TABLE */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Professional ID</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.appointmentId}>
              <td>{a.appointmentId}</td>
              <td>{a.userId}</td>
              <td>{a.professionalId}</td>
              <td>{a.startTime}</td>
              <td>{a.endTime}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAppointments;
