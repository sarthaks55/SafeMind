import { useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const DiaryDashboard = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #E8A1B0 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-book me-2"></i>
                My Private Diary
              </h3>
              <p className="mb-0 opacity-90">Express your thoughts and feelings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #8E6EC8" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-pen me-2"></i>
                Write Entry
              </h5>
            </div>
            <div className="card-body">
              <DiaryEditor
                selected={selected}
                onSaved={() => setSelected(null)}
              />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #E8A1B0" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-list me-2"></i>
                My Entries
              </h5>
            </div>
            <div className="card-body">
              <DiaryList onEdit={setSelected} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryDashboard;
