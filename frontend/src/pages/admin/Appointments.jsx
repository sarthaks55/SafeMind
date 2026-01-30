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
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const professionalId = searchParams.get("professionalId");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllAppointments();
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
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
      } catch (error) {
        console.error("Failed to load appointments", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, professionalId]);

  const filterByStatus = async () => {
    if (!status) return;
    setLoading(true);
    try {
      const res = await getAppointmentsByStatus(status);
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to filter by status", error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDates = async () => {
    if (!start || !end) return;
    setLoading(true);
    try {
      const res = await getAppointmentsBetweenDates(start, end);
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to filter by dates", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: { bg: "#B39DDB", color: "white" },
      CONFIRMED: { bg: "#8E6EC8", color: "white" },
      BOOKED: { bg: "#C6B7E2", color: "white" },
      COMPLETED: { bg: "#F3A6A1", color: "white" },
      CANCELLED: { bg: "#D9899A", color: "white" },
      NO_SHOW: { bg: "#CFCFD4", color: "white" }
    };
    return badges[status] || { bg: "#CFCFD4", color: "white" };
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
        <div className="spinner-border" style={{ color: "#8E6EC8" }}></div>
        <span className="ms-2" style={{ color: "#8E6EC8" }}>Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #B39DDB 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-calendar-check me-2"></i>
                Appointments Management
              </h3>
              <p className="mb-0 opacity-90">Monitor all therapy sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h5 style={{ color: "#8E6EC8" }} className="mb-3">
            <i className="fas fa-filter me-2"></i>
            Filter Options
          </h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" style={{ color: "#8E6EC8", fontWeight: "500" }}>Status</label>
              <select 
                className="form-select" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                style={{ borderColor: "#C6B7E2" }}
              >
                <option value="">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" style={{ color: "#8E6EC8", fontWeight: "500" }}>Start Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                style={{ borderColor: "#C6B7E2" }}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" style={{ color: "#8E6EC8", fontWeight: "500" }}>End Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                style={{ borderColor: "#C6B7E2" }}
              />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <div className="d-flex gap-2 w-100">
                <button 
                  onClick={filterByStatus} 
                  className="btn btn-sm"
                  style={{ backgroundColor: "#8E6EC8", color: "white", border: "none" }}
                >
                  <i className="fas fa-search me-1"></i>
                  Filter
                </button>
                <button 
                  onClick={filterByDates} 
                  className="btn btn-sm"
                  style={{ backgroundColor: "#B39DDB", color: "white", border: "none" }}
                >
                  <i className="fas fa-calendar me-1"></i>
                  Dates
                </button>
                <button 
                  onClick={fetchAll} 
                  className="btn btn-sm"
                  style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}
                >
                  <i className="fas fa-redo me-1"></i>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: "#C6B7E2" }}>
                <tr>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>User ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Professional ID</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Start Time</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>End Time</th>
                  <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Status</th>
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
                        <span className="badge" style={{ backgroundColor: "#F3A6A1", color: "white" }}>#{a.userId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge" style={{ backgroundColor: "#E8A1B0", color: "white" }}>#{a.professionalId}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="fw-medium" style={{ color: "#8E6EC8" }}>
                            {new Date(a.startTime).toLocaleDateString()}
                          </div>
                          <small style={{ color: "#CFCFD4" }}>
                            {new Date(a.startTime).toLocaleTimeString()}
                          </small>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="fw-medium" style={{ color: "#8E6EC8" }}>
                            {new Date(a.endTime).toLocaleDateString()}
                          </div>
                          <small style={{ color: "#CFCFD4" }}>
                            {new Date(a.endTime).toLocaleTimeString()}
                          </small>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge px-3 py-2" style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {appointments.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-5" style={{ color: "#CFCFD4" }}>
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

export default AdminAppointments;
