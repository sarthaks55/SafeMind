import { useState } from "react";
import { bookAppointment } from "../../api/appointmentService";

const BookAppointment = () => {
  const [data, setData] = useState({
    professionalId: "",
    startTime: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await bookAppointment({
      professionalId: Number(data.professionalId),
      startTime: data.startTime
    });
    alert("Appointment booked");
  };

  return (
    <>
      <h3>Book Appointment</h3>

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Professional ID"
          value={data.professionalId}
          onChange={e =>
            setData({ ...data, professionalId: e.target.value })
          }
          required
        />

        <input
          type="datetime-local"
          className="form-control mb-2"
          value={data.startTime}
          onChange={e =>
            setData({ ...data, startTime: e.target.value })
          }
          required
        />

        <button className="btn btn-primary">
          Book
        </button>
      </form>
    </>
  );
};

export default BookAppointment;
