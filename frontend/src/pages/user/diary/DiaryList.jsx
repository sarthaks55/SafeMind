import { useEffect, useState } from "react";
import { deleteDiary, getAllDiaries } from "../../../api/diaryService";
//import { deleteDiary, getAllDiaries } from "../../../api/diaryService";

const DiaryList = ({ onEdit }) => {
  const [entries, setEntries] = useState([]);

  const load = () => {
    getAllDiaries().then(res => setEntries(res.data));
  };

  useEffect(load, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this entry?")) return;
    await deleteDiary(id);
    load();
  };

  return (
    <div className="card p-3">
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
