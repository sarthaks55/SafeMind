import { useEffect, useState } from "react";
import { bookAppointment,getProfessionals } from "../../api/appointmentService";
import {  getAvailability } from "../../api/userService";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";

const BookAppointment = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  /* ================= LOAD PROFESSIONALS ================= */

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const res = await getProfessionals();
        if (res.success) {
          setProfessionals(res.data);
        } else {
          setErrorMessage(res.message || "Failed to load professionals");
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Failed to load professionals");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  /* ================= LOAD AVAILABILITY ================= */

  useEffect(() => {
    if (!selectedProfessional) return;

    const fetchAvailability = async () => {
      setAvailabilityLoading(true);
      try {
        const res = await getAvailability(
  selectedProfessional.professionalId
);

        if (res.success) {
          setAvailability(res.data);
          setStartTime("");
        } else {
          setErrorMessage(res.message || "Failed to load availability");
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Failed to load availability");
      } finally {
        setAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedProfessional]);

  /* ================= BOOK APPOINTMENT ================= */

  const submitBooking = async () => {
    if (!startTime) {
      setErrorMessage("Please select date & time");
      return;
    }

    setBookingLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const res = await bookAppointment({
        professionalId: selectedProfessional.professionalId,
        startTime,
      });

      if (res.success) {
        setSuccessMessage(res.message || "Appointment booked successfully");
        closeModal();
      } else {
        setErrorMessage(res.message || "Failed to book appointment");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const closeModal = () => {
    setSelectedProfessional(null);
    setAvailability([]);
    setStartTime("");
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", backgroundColor: "#FAF9F7" }}
      >
        <div className="text-center" style={{ color: "#8E6EC8" }}>
          <i className="fas fa-spinner fa-spin fa-3x mb-3"></i>
          <div>Loading professionals...</div>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}
    >
      {/* HEADER */}
      <div className="row mb-4">
        <div className="col-12">
          <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
          <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
          <div
            className="card border-0 shadow-sm text-center"
            style={{
              background:
                "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
              color: "white",
              borderRadius: "15px",
            }}
          >
            <div className="card-body py-4">
              <h3 className="mb-0">Book New Appointment</h3>
              <p className="mb-0 opacity-90">
                Choose a verified professional
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PROFESSIONALS */}
      <div className="row">
        {professionals.map((p) => (
          <div className="col-md-4 mb-4" key={p.professionalId}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderRadius: "15px", cursor: "pointer" }}
              onClick={() => setSelectedProfessional(p)}
            >
              <div className="card-body">
                <h5 style={{ color: "#8E6EC8" }}>{p.fullName}</h5>
                <p><strong>Specialization:</strong> {p.specialization}</p>
                <p><strong>Fee:</strong> ₹{p.consultationFee}</p>

                <button
                  className="btn w-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProfessional && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: "15px" }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "#8E6EC8" }}>
                  {selectedProfessional.fullName}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                <p><strong>Specialization:</strong> {selectedProfessional.specialization}</p> 
                <p><strong>Qualification:</strong> {selectedProfessional.qualification}</p> 
                <p><strong>Experience:</strong> {selectedProfessional.experienceYears} years</p> 
                <p><strong>Languages:</strong> {selectedProfessional.spokenLanguage}</p> 
                <p><strong>Consultation Fee:</strong> ₹{selectedProfessional.consultationFee}</p> 
                <p><strong>Bio:</strong> {selectedProfessional.bio}</p>

                <hr />

                
                <label className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>
                  Professional Availability
                </label>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead style={{ backgroundColor: "#C6B7E2" }}>
                      <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      {availabilityLoading ? (
                        <tr>
                          <td colSpan="3" className="text-center py-4">
                            Loading availability...
                          </td>
                        </tr>
                      ) : availability.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-muted">
                            No availability available
                          </td>
                        </tr>
                      ) : (
                        availability.map((a) => (
                          <tr key={a.availabilityId}>
                            <td>{a.dayOfWeek}</td>
                            <td>{a.startTime}</td>
                            <td>{a.endTime}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <label className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control mb-3"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn"
                  disabled={bookingLoading}
                  onClick={submitBooking}
                  style={{
                    background:
                      "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
                    color: "white",
                  }}
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
