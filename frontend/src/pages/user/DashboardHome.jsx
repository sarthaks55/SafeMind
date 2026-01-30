import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { auth } = useAuth();

  return (
    <div className="container-fluid" style={{ backgroundColor: "#FAF9F7", minHeight: "100vh", padding: "20px" }}>
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-lg position-relative overflow-hidden" style={{ background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)", color: "white", borderRadius: "20px" }}>
            <div className="position-absolute" style={{ top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(255,255,255,0.1)", borderRadius: "50%" }}></div>
            <div className="position-absolute" style={{ bottom: "-30px", left: "-30px", width: "150px", height: "150px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>
            <div className="card-body text-center py-5 position-relative">
              <h1 className="display-4 mb-3 fw-bold">Welcome back, {auth.fullName}!</h1>
              <p className="lead opacity-90 mb-0">Your mental wellness journey continues here</p>
              <div className="mt-3">
                <span className="badge px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: "14px" }}>SafeMind Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 position-relative overflow-hidden" 
               style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", transform: "translateY(0)", transition: "all 0.3s ease" }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="position-absolute top-0 end-0 p-3">
              <div className="rounded-circle" style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #F3A6A1 0%, #E8A1B0 100%)", opacity: "0.1" }}></div>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img src="https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5000x3600+0+0/resize/5000x3600!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fc7%2Ff7%2F54a9ca6f41edb98f831ccf9360b8%2Fgettyimages-2178028913.jpg" 
                       alt="Therapy Session" 
                       className="rounded-circle shadow" 
                       style={{ width: "140px", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style={{ background: "linear-gradient(45deg, rgba(243,166,161,0.2) 0%, rgba(232,161,176,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#F3A6A1", color: "white" }}>
                  <i className="fas fa-calendar-check fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Appointments</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Manage your therapy sessions</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="progress" style={{ height: "4px", backgroundColor: "#F3F4F6" }}>
                  <div className="progress-bar" style={{ width: "75%", backgroundColor: "#F3A6A1" }}></div>
                </div>
                <small className="text-muted mt-1 d-block">3 upcoming sessions</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 position-relative overflow-hidden" 
               style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", transform: "translateY(0)", transition: "all 0.3s ease" }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="position-absolute top-0 end-0 p-3">
              <div className="rounded-circle" style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #F6C453 0%, #F29C50 100%)", opacity: "0.1" }}></div>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img src="https://www.solhapp.com/blog/storage/the-science-behind-mood-tracking-how-monitoring-your-emotions-can-improve-mental-well-being.webp" 
                       alt="Mood Tracking" 
          a             className="rounded-circle shadow" 
                       style={{ width: "140px", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style={{ background: "linear-gradient(45deg, rgba(246,196,83,0.2) 0%, rgba(242,156,80,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#F6C453", color: "white" }}>
                  <i className="fas fa-smile fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Mood Tracker</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Monitor your daily emotions</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge px-3 py-2" style={{ backgroundColor: "#F6C453", color: "white", fontSize: "12px" }}>Today: Happy</span>
                  <div className="d-flex gap-1">
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#F6C453" }}></div>
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#F29C50" }}></div>
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#E6B44C" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 position-relative overflow-hidden" 
               style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", transform: "translateY(0)", transition: "all 0.3s ease" }}
               onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
               onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <div className="position-absolute top-0 end-0 p-3">
              <div className="rounded-circle" style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #E8A1B0 0%, #D9899A 100%)", opacity: "0.1" }}></div>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img src="https://www.shutterstock.com/image-vector/black-girl-woman-person-writes-600nw-2458543699.jpg" 
                       alt="Journal Writing" 
                       className="rounded-circle shadow" 
                       style={{ width: "140px", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style={{ background: "linear-gradient(45deg, rgba(232,161,176,0.2) 0%, rgba(217,137,154,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#E8A1B0", color: "white" }}>
                  <i className="fas fa-book fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Personal Diary</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Write private journal entries</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">12 entries this month</small>
                  <div className="rounded-pill px-2 py-1" style={{ backgroundColor: "rgba(232,161,176,0.1)", color: "#E8A1B0", fontSize: "11px" }}>Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ backgroundColor: "#FFFFFF", borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h5 className="mb-2" style={{ color: "#8E6EC8" }}>Quick Stats</h5>
                  <p className="text-muted mb-0">Your mental health journey overview</p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="d-flex justify-content-end gap-3">
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#F3A6A1", fontSize: "24px" }}>7</div>
                      <small className="text-muted">Days Active</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#F6C453", fontSize: "24px" }}>85%</div>
                      <small className="text-muted">Mood Score</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#E8A1B0", fontSize: "24px" }}>12</div>
                      <small className="text-muted">Entries</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
