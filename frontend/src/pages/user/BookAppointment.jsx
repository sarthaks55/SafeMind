import { useState } from "react";
import { bookAppointment } from "../../api/appointmentService";

const BookAppointment = () => {
  const [data, setData] = useState({
    professionalId: "",
    startTime: ""
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookAppointment({
        professionalId: Number(data.professionalId),
        startTime: data.startTime
      });
      alert("Appointment booked successfully!");
      setData({ professionalId: "", startTime: "" });
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>
                Book New Appointment
              </h3>
              <p className="mb-0 opacity-90">Schedule your therapy session</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
            <div className="card-body p-5">
              <form onSubmit={submit}>
                <div className="mb-4">
                  <label className="form-label fw-bold mb-2" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-user-md me-2" style={{ color: "#F3A6A1" }}></i>
                    Professional ID
                  </label>
                  <input
                    className="form-control border-0 shadow-sm py-3"
                    style={{ backgroundColor: "#C6B7E2", fontSize: "16px", color: "#8E6EC8" }}
                    placeholder="Enter professional ID"
                    value={data.professionalId}
                    onChange={e =>
                      setData({ ...data, professionalId: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold mb-2" style={{ color: "#8E6EC8" }}>
                    <i className="fas fa-calendar-alt me-2" style={{ color: "#F6C453" }}></i>
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control border-0 shadow-sm py-3"
                    style={{ backgroundColor: "#C6B7E2", fontSize: "16px", color: "#8E6EC8" }}
                    value={data.startTime}
                    onChange={e =>
                      setData({ ...data, startTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-lg py-3" 
                          type="submit"
                          disabled={loading}
                          style={{ background: loading ? "#CFCFD4" : "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", 
                                   border: "none", 
                                   color: "white", 
                                   borderRadius: "10px" }}>
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Booking...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check-circle me-2"></i>
                        Book Appointment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
