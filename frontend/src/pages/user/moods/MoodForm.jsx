import { useState } from "react";
import { addMood, updateMood } from "../../../api/moodService";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";

const MoodForm = ({ onMoodAdded }) => {
  const [mood, setMood] = useState("HAPPY");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await addMood({ mood, notes });
      if (response.success) {
        setSuccessMessage(response.message || "Mood added");
        onMoodAdded?.();
      } else {
        setErrorMessage(response.message || "Failed to add mood");
      }
    } catch (err) {
      try {
        const response = await updateMood({ mood, notes });
        if (response.success) {
          setSuccessMessage(response.message || "Mood updated");
          onMoodAdded?.();
        } else {
          setErrorMessage(response.message || "Failed to update mood");
        }
      } catch (updateErr) {
        setErrorMessage(updateErr.response?.data?.message || "Failed to save mood");
      }
    }
  };

  return (
    <form onSubmit={submit} className="card p-3 mb-4">
      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
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
