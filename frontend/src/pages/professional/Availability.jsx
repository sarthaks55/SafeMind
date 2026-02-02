import { useEffect, useState } from "react";
import {
  getAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability,
} from "../../api/professionalService";

const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const Availability = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    dayOfWeek: "MONDAY",
    startTime: "",
    endTime: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const response = await getAvailability();
      if (response.success) {
        setList(response.data);
      } else {
        alert(response.message || "Failed to load availability");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load availability");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.startTime >= form.endTime) {
      alert("Start time must be before end time");
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await updateAvailability(editingId, form);
      } else {
        response = await addAvailability(form);
      }

      if (response.success) {
        setForm({ dayOfWeek: "MONDAY", startTime: "", endTime: "" });
        setEditingId(null);
        loadAvailability();
      } else {
        alert(response.message || "Operation failed");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (slot) => {
    setEditingId(slot.availabilityId);
    setForm({
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime.slice(0, 5),
      endTime: slot.endTime.slice(0, 5),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this availability?")) return;
    try {
      const response = await deleteAvailability(id);
      if (response.success) {
        loadAvailability();
      } else {
        alert(response.message || "Failed to delete availability");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete availability");
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #B39DDB 0%, #8E6EC8 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-clock me-2"></i>
                My Availability
              </h3>
              <p className="mb-0 opacity-90">Set your weekly schedule</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #B39DDB" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <div className="d-flex align-items-center">
                <div className="p-2 me-3" style={{ backgroundColor: "#B39DDB", color: "white", borderRadius: "10px" }}>
                  <i className="fas fa-plus-circle"></i>
                </div>
                <h5 className="mb-0 fw-bold" style={{ color: "#8E6EC8" }}>
                  {editingId ? "Update Availability" : "Add Availability"}
                </h5>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>Day of Week</label>
                  <select
                    className="form-select border-0 shadow-sm"
                    style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                    value={form.dayOfWeek}
                    onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>Start Time</label>
                    <input
                      type="time"
                      className="form-control border-0 shadow-sm"
                      style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                      value={form.startTime}
                      onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold" style={{ color: "#8E6EC8" }}>End Time</label>
                    <input
                      type="time"
                      className="form-control border-0 shadow-sm"
                      style={{ backgroundColor: "#F8F6FF", color: "#8E6EC8", borderRadius: "10px", padding: "12px" }}
                      value={form.endTime}
                      onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    type="submit" 
                    className="btn px-4 py-2" 
                    style={{ backgroundColor: "#B39DDB", color: "white", border: "none", borderRadius: "8px" }}
                  >
                    <i className={`fas ${editingId ? 'fa-save' : 'fa-plus'} me-2`}></i>
                    {editingId ? "Update" : "Add"}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="btn px-4 py-2"
                      style={{ backgroundColor: "#CFCFD4", color: "white", border: "none", borderRadius: "8px" }}
                      onClick={() => {
                        setEditingId(null);
                        setForm({ dayOfWeek: "MONDAY", startTime: "", endTime: "" });
                      }}
                    >
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <div className="d-flex align-items-center">
                <div className="p-2 me-3" style={{ backgroundColor: "#E8A1B0", color: "white", borderRadius: "10px" }}>
                  <i className="fas fa-calendar-week"></i>
                </div>
                <h5 className="mb-0 fw-bold" style={{ color: "#8E6EC8" }}>Weekly Schedule</h5>
              </div>
            </div>
            <div className="card-body p-0">
              {list.length === 0 ? (
                <div className="text-center py-5" style={{ color: "#CFCFD4" }}>
                  <i className="fas fa-calendar-times fa-3x mb-3 opacity-50"></i>
                  <div>No availability added</div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ backgroundColor: "#C6B7E2" }}>
                      <tr>
                        <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Day</th>
                        <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Start</th>
                        <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>End</th>
                        <th className="border-0 py-3 px-4 fw-bold" style={{ color: "#8E6EC8" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((a) => (
                        <tr key={a.availabilityId} className="border-bottom">
                          <td className="py-3 px-4">
                            <span className="badge" style={{ backgroundColor: "#8E6EC8", color: "white" }}>
                              {a.dayOfWeek}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="fw-medium" style={{ color: "#8E6EC8" }}>{a.startTime}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="fw-medium" style={{ color: "#8E6EC8" }}>{a.endTime}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="d-flex gap-2">
                              {/* <button 
                                className="btn btn-sm px-3" 
                                style={{ backgroundColor: "#B39DDB", color: "white", border: "none" }}
                                onClick={() => handleEdit(a)}
                              >
                                <i className="fas fa-edit me-1"></i>
                                Edit
                              </button> */}
                              <button 
                                className="btn btn-sm px-3" 
                                style={{ backgroundColor: "#D9899A", color: "white", border: "none" }}
                                onClick={() => handleDelete(a.availabilityId)}
                              >
                                <i className="fas fa-trash me-1"></i>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
