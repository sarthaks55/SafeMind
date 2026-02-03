import { useEffect, useState } from "react";
import { deleteDiary, getAllDiaries } from "../../../api/diaryService";
import { useDiary } from "../../../context/DiaryContext";
import ErrorMessage from "../../../components/ErrorMessage";
//import { deleteDiary, getAllDiaries } from "../../../api/diaryService";

const DiaryList = ({ onEdit }) => {
  const [entries, setEntries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { refreshTrigger } = useDiary();

  const load = async () => {
    try {
      const response = await getAllDiaries();
      if (response.success) {
        setEntries(response.data);
      } else {
        console.error(response.message);
      }
    } catch (err) {
      console.error("Failed to load diaries:", err);
    }
  };

  useEffect(() => {
    load();
  }, [refreshTrigger]);

  const remove = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    try {
      const response = await deleteDiary(id);
      if (response.success) {
        load();
      } else {
        setErrorMessage(response.message || "Failed to delete diary");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to delete diary");
    }
  };

  return (
    <div className="card p-3">
      <ErrorMessage error={errorMessage} onClose={() => setErrorMessage("")} />
      <h5>Past Entries</h5>

      {entries.length === 0 && <p>No entries yet.</p>}

      {entries.map(e => (
        <div key={e.diaryId} className="border p-2 mb-2">
          <small>
            {new Date(e.createdAt).toLocaleString()}
          </small>

          <p className="mt-2">
            {e.text.substring(0, 150)}...
          </p>

          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => onEdit(e)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => remove(e.diaryId)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
