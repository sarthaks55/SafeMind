import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { auth } = useAuth();

  return (
    <>
      <h2>Welcome, {auth.fullName}</h2>
      <p className="text-muted">
        
      </p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Appointments</h6>
            <p>View & manage your sessions</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Mood Tracker</h6>
            <p>Track your daily mood</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Diary</h6>
            <p>Write private journal entries</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
