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

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: { bg: "#F6C453", color: "white" },
      CONFIRMED: { bg: "#8E6EC8", color: "white" },
      CANCELLED: { bg: "#D9899A", color: "white" },
      COMPLETED: { bg: "#F3A6A1", color: "white" }
    };
    return badges[status] || { bg: "#CFCFD4", color: "white" };
  };

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
              <p className="mb-0 opacity-90">Manage your therapy sessions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "#C6B7E2" }}>
                <tr>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Professional</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Date & Time</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Status</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map(a => {
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
                            Dr
                          </div>
                          <span className="fw-medium" style={{ color: "#8E6EC8" }}>Professional #{a.professionalId}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="fw-medium" style={{ color: "#8E6EC8" }}>{new Date(a.startTime).toLocaleDateString()}</div>
                          <small style={{ color: "#CFCFD4" }}>{new Date(a.startTime).toLocaleTimeString()}</small>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge px-3 py-2" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {a.status === "PENDING" && (
                          <button
                            className="btn btn-sm px-3"
                            style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}
                            onClick={() => cancel(a.appointmentId, a.status)}
                          >
                            <i className="fas fa-times me-1"></i>
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5" style={{ color: "#CFCFD4" }}>
                      <i className="fas fa-calendar-times fa-3x mb-3 opacity-50"></i>
                      <div>No appointments found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
