import { useEffect, useState } from "react";
import { createDiary, updateDiary } from "../../../api/diaryService";
//import { createDiary, updateDiary } from "../../../api/diaryService";

const DiaryEditor = ({ selected, onSaved }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (selected) setText(selected.text);
  }, [selected]);

  const submit = async (e) => {
    e.preventDefault();

    if (selected) {
      await updateDiary(selected.diaryId, { text });
      alert("Diary updated");
    } else {
      await createDiary({ text });
      alert("Diary saved");
    }

    setText("");
    onSaved();
  };

  return (
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
  );
};

export default DiaryEditor;
