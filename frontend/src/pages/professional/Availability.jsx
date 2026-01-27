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
      const res = await getAvailability();
      setList(res.data);
    } catch {
      alert("Failed to load availability");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.startTime >= form.endTime) {
      alert("Start time must be before end time");
      return;
    }

    try {
      if (editingId) {
        await updateAvailability(editingId, form);
      } else {
        await addAvailability(form);
      }

      setForm({ dayOfWeek: "MONDAY", startTime: "", endTime: "" });
      setEditingId(null);
      loadAvailability();
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
    await deleteAvailability(id);
    loadAvailability();
  };

  return (
    <div>
      <h2>My Availability</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <select
          value={form.dayOfWeek}
          onChange={(e) =>
            setForm({ ...form, dayOfWeek: e.target.value })
          }
        >
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          type="time"
          value={form.startTime}
          onChange={(e) =>
            setForm({ ...form, startTime: e.target.value })
          }
          required
        />

        <input
          type="time"
          value={form.endTime}
          onChange={(e) =>
            setForm({ ...form, endTime: e.target.value })
          }
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                dayOfWeek: "MONDAY",
                startTime: "",
                endTime: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* LIST */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Day</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {list.map((a) => (
            <tr key={a.availabilityId}>
              <td>{a.dayOfWeek}</td>
              <td>{a.startTime}</td>
              <td>{a.endTime}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.availabilityId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {list.length === 0 && (
            <tr>
              <td colSpan="4">No availability added</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
