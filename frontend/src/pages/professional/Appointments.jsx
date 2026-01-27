import { useEffect, useState } from "react";
import {
  getProfessionalAppointments,
  updateAppointmentStatus,
} from "../../api/professionalService";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getProfessionalAppointments();
      setAppointments(res.data);
    } catch (err) {
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateAppointmentStatus(id, { status });
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.appointmentId}>
                <td>{a.appointmentId}</td>
                <td>{a.userId}</td>
                <td>{a.startTime.split("T")[0]}</td>
                <td>
                  {a.startTime.split("T")[1]} -{" "}
                  {a.endTime.split("T")[1]}
                </td>
                <td>{a.status}</td>

                <td>
                  {a.status === "PENDING" && (
                    <button
                      onClick={() =>
                        handleStatusChange(a.appointmentId, "CONFIRMED")
                      }
                    >
                      Confirm
                    </button>
                  )}

                  {a.status === "CONFIRMED" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(
                            a.appointmentId,
                            "COMPLETED"
                          )
                        }
                      >
                        Complete
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(
                            a.appointmentId,
                            "NO_SHOW"
                          )
                        }
                      >
                        No Show
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(
                            a.appointmentId,
                            "CANCELLED"
                          )
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
