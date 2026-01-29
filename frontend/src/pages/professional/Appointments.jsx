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

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: { bg: "#F6C453", color: "white" },
      CONFIRMED: { bg: "#8E6EC8", color: "white" },
      CANCELLED: { bg: "#D9899A", color: "white" },
      COMPLETED: { bg: "#F3A6A1", color: "white" },
      NO_SHOW: { bg: "#CFCFD4", color: "white" }
    };
    return badges[status] || { bg: "#CFCFD4", color: "white" };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border" style={{ color: "#8E6EC8" }}></div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-calendar-check me-2"></i>
                My Appointments
              </h3>
              <p className="mb-0 opacity-90">Manage client appointments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <div className="card-body p-0">
          {appointments.length === 0 ? (
            <div className="text-center py-5" style={{ color: "#CFCFD4" }}>
              <i className="fas fa-calendar-times fa-3x mb-3 opacity-50"></i>
              <div>No appointments found</div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead style={{ backgroundColor: "#C6B7E2" }}>
                  <tr>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>ID</th>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>User</th>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Date</th>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Time</th>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Status</th>
                    <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((a) => {
                    const statusStyle = getStatusBadge(a.status);
                    return (
                      <tr key={a.appointmentId} className="border-bottom">
                        <td className="py-3 px-4">
                          <span className="badge" style={{ backgroundColor: "#C6B7E2", color: "#8E6EC8" }}>#{a.appointmentId}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-2" 
                                 style={{ width: "32px", height: "32px", fontSize: "12px", backgroundColor: "#8E6EC8", color: "white" }}>
                              U
                            </div>
                            <span className="fw-medium" style={{ color: "#8E6EC8" }}>User #{a.userId}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="fw-medium" style={{ color: "#8E6EC8" }}>{a.startTime.split("T")[0]}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <small style={{ color: "#CFCFD4" }}>{a.startTime.split("T")[1]} - {a.endTime.split("T")[1]}</small>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="badge px-3 py-2" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="d-flex gap-2">
                            {a.status === "PENDING" && (
                              <button
                                className="btn btn-sm px-3"
                                style={{ backgroundColor: "#8E6EC8", color: "white", border: "none" }}
                                onClick={() => handleStatusChange(a.appointmentId, "CONFIRMED")}
                              >
                                <i className="fas fa-check me-1"></i>
                                Confirm
                              </button>
                            )}

                            {a.status === "CONFIRMED" && (
                              <>
                                <button
                                  className="btn btn-sm px-2"
                                  style={{ backgroundColor: "#F3A6A1", color: "white", border: "none" }}
                                  onClick={() => handleStatusChange(a.appointmentId, "COMPLETED")}
                                >
                                  <i className="fas fa-check-circle me-1"></i>
                                  Complete
                                </button>

                                <button
                                  className="btn btn-sm px-2"
                                  style={{ backgroundColor: "#F6C453", color: "white", border: "none" }}
                                  onClick={() => handleStatusChange(a.appointmentId, "NO_SHOW")}
                                >
                                  <i className="fas fa-user-times me-1"></i>
                                  No Show
                                </button>

                                <button
                                  className="btn btn-sm px-2"
                                  style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}
                                  onClick={() => handleStatusChange(a.appointmentId, "CANCELLED")}
                                >
                                  <i className="fas fa-times me-1"></i>
                                  Cancel
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
