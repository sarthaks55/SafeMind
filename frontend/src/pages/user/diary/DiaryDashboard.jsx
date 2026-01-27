import { useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const DiaryDashboard = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h3>My Private Diary </h3>

      <DiaryEditor
        selected={selected}
        onSaved={() => setSelected(null)}
      />

      <DiaryList onEdit={setSelected} />
    </>
  );
};

export default DiaryDashboard;
