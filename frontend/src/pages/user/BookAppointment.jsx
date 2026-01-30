import { useEffect, useState } from "react";
import { bookAppointment, getProfessionals } from "../../api/appointmentService";
import api from "../../api/axios"; // your axios instance

const BookAppointment = () => {
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch verified professionals
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const res = await getProfessionals();
        setProfessionals(res.data);
      } catch (err) {
        alert("Failed to load professionals");
      }
    };
    fetchProfessionals();
  }, []);

  const submitBooking = async () => {
    if (!startTime) {
      alert("Please select date & time");
      return;
    }

    setLoading(true);
    try {
      await bookAppointment({
        professionalId: selectedProfessional.professionalId,
        startTime,
      });
      alert("Appointment booked successfully!");
      setSelectedProfessional(null);
      setStartTime("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}
    >
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="card border-0 shadow-sm text-center"
            style={{
              background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
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

      {/* Professionals Cards */}
      <div className="row">
        {professionals.map((p) => (
          <div className="col-md-4 mb-4" key={p.professionalId}>
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "15px",
                cursor: "pointer",
                backgroundColor: "#FFFFFF",
              }}
              onClick={() => setSelectedProfessional(p)}
            >
              <div className="card-body">
                <h5 style={{ color: "#8E6EC8" }}>{p.fullName}</h5>
                <p className="mb-1">
                  <strong>Gender:</strong> {p.gender || "Not specified"}
                </p>
                <p className="mb-1">
                  <strong>Specialization:</strong> {p.specialization}
                </p>
                <p className="mb-2">
                  <strong>Fee:</strong> ₹{p.consultationFee}
                </p>

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

      {/* Modal */}
      {selectedProfessional && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div
              className="modal-content border-0"
              style={{ borderRadius: "15px" }}
            >
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "#8E6EC8" }}>
                  {selectedProfessional.fullName}
                </h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedProfessional(null)}
                ></button>
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
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  style={{ backgroundColor: "#C6B7E2" }}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn"
                  onClick={() => setSelectedProfessional(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn"
                  disabled={loading}
                  onClick={submitBooking}
                  style={{
                    background:
                      "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
                    color: "white",
                  }}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
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
