// src/pages/admin/DashboardHome.jsx
const AdminDashboardHome = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #B39DDB 100%)", color: "white", borderRadius: "15px" }}>
            <div className="card-body text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-crown me-2"></i>
                Welcome, Admin
              </h3>
              <p className="mb-0 opacity-90">Manage your platform with ease</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #F3A6A1" }}>
            <div className="card-body text-center p-4">
              <div className="rounded-circle mx-auto mb-3" style={{ width: "80px", height: "80px", backgroundColor: "#F3A6A1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "3px solid #FFFFFF", boxShadow: "0 4px 15px rgba(243, 166, 161, 0.3)" }}>
                <img src="https://cdn.storymd.com/optimized/KAM93pbTLA/thumbnail.webp" alt="Users" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h5 style={{ color: "#8E6EC8" }}>Users</h5>
              <p className="text-muted small mb-0">Manage user accounts and permissions</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #E8A1B0" }}>
            <div className="card-body text-center p-4">
              <div className="rounded-circle mx-auto mb-3" style={{ width: "80px", height: "80px", backgroundColor: "#E8A1B0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "3px solid #FFFFFF", boxShadow: "0 4px 15px rgba(232, 161, 176, 0.3)" }}>
                <img src="https://img.freepik.com/premium-vector/team-mental-health-professionals-including-psychologist-social-worker-psychiatrist-are_216520-179683.jpg?w=360" alt="Professionals" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h5 style={{ color: "#8E6EC8" }}>Professionals</h5>
              <p className="text-muted small mb-0">Verify and manage therapists</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #F6C453" }}>
            <div className="card-body text-center p-4">
              <div className="rounded-circle mx-auto mb-3" style={{ width: "80px", height: "80px", backgroundColor: "#F6C453", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "3px solid #FFFFFF", boxShadow: "0 4px 15px rgba(246, 196, 83, 0.3)" }}>
                <img src="https://static.vecteezy.com/system/resources/previews/002/868/481/non_2x/a-woman-at-an-appointment-with-a-psychologist-a-psychotherapist-the-concept-of-mental-health-solving-psychological-problems-the-psychologist-listens-to-the-patient-vector.jpg" alt="Appointments" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h5 style={{ color: "#8E6EC8" }}>Appointments</h5>
              <p className="text-muted small mb-0">Monitor all therapy sessions</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", borderTop: "4px solid #F29C50" }}>
            <div className="card-body text-center p-4">
              <div className="rounded-circle mx-auto mb-3" style={{ width: "80px", height: "80px", backgroundColor: "#F29C50", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "3px solid #FFFFFF", boxShadow: "0 4px 15px rgba(242, 156, 80, 0.3)" }}>
                <img src="https://www.verywellmind.com/thmb/gYy7Pej7_ffz9ZJBQT1ld7wk7mA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vwm-best-mental-health-apps-tout-04fea5cdb8944a16a88adc8dfe19f5f7.jpg" alt="Notifications" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h5 style={{ color: "#8E6EC8" }}>Notifications</h5>
              <p className="text-muted small mb-0">System alerts and updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
            <div className="card-body p-4">
              <h5 style={{ color: "#8E6EC8" }} className="mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Quick Actions
              </h5>
              <p className="text-muted mb-4">Use the sidebar navigation to manage different aspects of the SafeMind platform:</p>
              <div className="row">
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Monitor user registrations and activity</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Verify professional credentials</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Track appointment statistics</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Send system notifications</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Generate platform reports</li>
                    <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Manage platform settings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
