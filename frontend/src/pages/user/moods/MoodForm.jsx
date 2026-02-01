import { useState } from "react";
import { addMood, updateMood } from "../../../api/moodService";

const MoodForm = () => {
  const [mood, setMood] = useState("HAPPY");
  const [notes, setNotes] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await addMood({ mood, notes });
      if (response.success) {
        alert(response.message || "Mood added");
      } else {
        alert(response.message || "Failed to add mood");
      }
    } catch (err) {
      try {
        const response = await updateMood({ mood, notes });
        if (response.success) {
          alert(response.message || "Mood updated");
        } else {
          alert(response.message || "Failed to update mood");
        }
      } catch (updateErr) {
        alert(updateErr.response?.data?.message || "Failed to save mood");
      }
    }
  };

  return (
    <form onSubmit={submit} className="card p-3 mb-4">
      <h5>Today's Mood</h5>

      <select
        className="form-select mb-2"
        value={mood}
        onChange={e => setMood(e.target.value)}
      >
        <option value="VERY_BAD">VERY BAD</option>
        <option value="BAD">BAD</option>
        <option value="NEUTRAL">NEUTRAL</option>
        <option value="GOOD">GOOD</option>
        <option value="VERY_GOOD">VERY GOOD</option>
      </select>

      <textarea
        className="form-control mb-2"
        placeholder="Optional notes"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />

      <button className="btn" style={{ backgroundColor: "#8E6EC8", color: "white", border: "none" }}>
        Save Mood
      </button>
    </form>
  );
};

export default MoodForm;
