import { useEffect, useState } from "react";
import {
  getUserAppointments,
  cancelAppointment
} from "../../api/appointmentService";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const load = async () => {
    const res = await getUserAppointments();
    setAppointments(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id, status) => {
    if (status !== "PENDING") return;
    await cancelAppointment(id);
    load();
  };

  return (
    <>
      <h3>My Appointments</h3>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Professional</th>
            <th>Start</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {appointments.map(a => (
            <tr key={a.appointmentId}>
              <td>{a.appointmentId}</td>
              <td>{a.professionalId}</td>
              <td>{new Date(a.startTime).toLocaleString()}</td>
              <td>{a.status}</td>
              <td>
                {a.status === "PENDING" && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancel(a.appointmentId, a.status)}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Appointments;
