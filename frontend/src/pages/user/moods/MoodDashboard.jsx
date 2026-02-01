import { useState } from "react";
import MoodForm from "./MoodForm";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";

const MoodDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleMoodAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #9C7FD1 0%, #8E6EC8 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-smile me-2"></i>
                Mood Tracker
              </h3>
              <p className="mb-0 opacity-90">Monitor and understand your emotions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #9C7FD1" }}>
            <div className="card-body p-4">
              <MoodForm onMoodAdded={handleMoodAdded} />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #8E6EC8" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-chart-line me-2"></i>
                Weekly Overview
              </h5>
            </div>
            <div className="card-body">
              <WeeklyChart key={`weekly-${refreshKey}`} />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #E8A1B0" }}>
            <div className="card-header bg-transparent border-0 pt-4">
              <h5 className="mb-0" style={{ color: "#8E6EC8" }}>
                <i className="fas fa-chart-bar me-2"></i>
                Monthly Trends
              </h5>
            </div>
            <div className="card-body">
              <MonthlyChart key={`monthly-${refreshKey}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodDashboard;
