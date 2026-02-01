import { useEffect, useState } from "react";
import { createDiary, updateDiary } from "../../../api/diaryService";
import ErrorMessage from "../../../components/ErrorMessage";
import SuccessMessage from "../../../components/SuccessMessage";

const DiaryEditor = ({ selected, onSaved }) => {
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (selected) setText(selected.text);
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      let response;
      if (selected) {
        response = await updateDiary(selected.diaryId, { text });
        if (response.success) {
          setSuccessMessage(response.message || "Diary updated successfully");
        } else {
          setErrorMessage(response.message || "Failed to update diary");
          return;
        }
      } else {
        response = await createDiary({ text });
        if (response.success) {
          setSuccessMessage(response.message || "Diary saved successfully");
        } else {
          setErrorMessage(response.message || "Failed to save diary");
          return;
        }
      }

      setText("");
      onSaved();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div>
      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
      <SuccessMessage message={successMessage} onClose={() => setSuccessMessage("")} />
      
      <form onSubmit={submit} className="card p-3 mb-4">
      <h5>{selected ? "Edit Entry" : "New Entry"}</h5>

      <textarea
        className="form-control mb-2"
        rows="6"
        placeholder="Write your thoughts..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />

      <button className="btn" style={{ backgroundColor: "#8E6EC8", color: "white", border: "none" }}>
        {selected ? "Update" : "Save"}
      </button>
    </form>
    </div>
  );
};

export default DiaryEditor;
