import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookAppointment, getProfessionals } from "../api/appointmentService";
import { useAuth } from "../context/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import PublicNavbar from "../components/PublicNavbar";

const PublicBookAppointment = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await getProfessionals();
        if (response.success) {
          setProfessionals(response.data);
        }
      } catch (err) {
        console.error("Failed to load professionals:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const submitBooking = async () => {
    if (!auth) {
      navigate("/login");
      return;
    }

    if (!startTime) {
      setErrorMessage("Please select date & time");
      return;
    }

    setBookingLoading(true);
    try {
      setErrorMessage("");
      const response = await bookAppointment({
        professionalId: selectedProfessional.professionalId,
        startTime,
      });
      if (response.success) {
        setSuccessMessage(response.message || "Appointment booked successfully!");
        setSelectedProfessional(null);
        setStartTime("");
      } else {
        setErrorMessage(response.message || "Failed to book appointment");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to book appointment. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px", paddingTop: "100px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm text-center" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body py-4">
              <h3 className="mb-0">Book Appointment</h3>
              <p className="mb-0 opacity-90">Connect with verified mental health professionals</p>
            </div>
          </div>
        </div>
      </div>

      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />

      {!auth && (
        <div className="alert alert-info">
          <i className="fas fa-info-circle me-2"></i>
          Please <button className="btn btn-link p-0" onClick={() => navigate("/login")}>login</button> to book an appointment.
        </div>
      )}

      {loading ? (
        <div className="text-center py-5" style={{ color: "#8E6EC8" }}>
          <i className="fas fa-spinner fa-spin fa-3x mb-3"></i>
          <div>Loading professionals...</div>
        </div>
      ) : (
      <div className="row">
        {professionals.map((p) => (
          <div className="col-md-4 mb-4" key={p.professionalId}>
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "15px", cursor: "pointer", backgroundColor: "#FFFFFF" }} onClick={() => setSelectedProfessional(p)}>
              <div className="card-body">
                <h5 style={{ color: "#8E6EC8" }}>{p.fullName}</h5>
                <p className="mb-1"><strong>Specialization:</strong> {p.specialization}</p>
                <p className="mb-2"><strong>Fee:</strong> ₹{p.consultationFee}</p>
                <button className="btn w-100" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "10px" }}>
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      {selectedProfessional && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0" style={{ borderRadius: "15px" }}>
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "#8E6EC8" }}>{selectedProfessional.fullName}</h5>
                <button className="btn-close" onClick={() => setSelectedProfessional(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Specialization:</strong> {selectedProfessional.specialization}</p>
                <p><strong>Qualification:</strong> {selectedProfessional.qualification}</p>
                <p><strong>Experience:</strong> {selectedProfessional.experienceYears} years</p>
                <p><strong>Consultation Fee:</strong> ₹{selectedProfessional.consultationFee}</p>
                <hr />
                <label className="fw-bold mb-2" style={{ color: "#8E6EC8" }}>Select Date & Time</label>
                <input type="datetime-local" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn" onClick={() => setSelectedProfessional(null)}>Cancel</button>
                <button className="btn" disabled={bookingLoading} onClick={submitBooking} style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white" }}>
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PublicBookAppointment;