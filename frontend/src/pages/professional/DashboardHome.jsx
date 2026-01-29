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
              <div className="mb-4">
                <img src="https://medazhospital.com/storage/2025/10/Mental.webp" 
                     alt="Mental Health Professional" 
                     className="rounded-circle shadow-lg" 
                     style={{ width: "100px", height: "100px", objectFit: "cover", border: "4px solid rgba(255,255,255,0.3)" }} />
              </div>
              <h1 className="display-4 mb-3 fw-bold">Welcome back, Dr. {auth?.fullName || 'Professional'}!</h1>
              <p className="lead opacity-90 mb-0">Your professional practice dashboard</p>
              <div className="mt-3">
                <span className="badge px-3 py-2" style={{ backgroundColor: "rgba(255,255,255,0.2)", fontSize: "14px" }}>Professional Dashboard</span>
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
                  <img src="https://www.eclinicalworks.com/wp-content/uploads/2025/08/eCW-blog-Digital-Scheduling-1024x575.png" 
                       alt="Client Appointments" 
                       className="rounded-3 shadow" 
                       style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3" style={{ background: "linear-gradient(45deg, rgba(243,166,161,0.2) 0%, rgba(232,161,176,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#F3A6A1", color: "white" }}>
                  <i className="fas fa-calendar-check fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Appointments</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Manage client sessions</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="progress" style={{ height: "4px", backgroundColor: "#F3F4F6" }}>
                  <div className="progress-bar" style={{ width: "75%", backgroundColor: "#F3A6A1" }}></div>
                </div>
                <small className="text-muted mt-1 d-block">6 sessions today</small>
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
              <div className="rounded-circle" style={{ width: "60px", height: "60px", background: "linear-gradient(135deg, #B39DDB 0%, #8E6EC8 100%)", opacity: "0.1" }}></div>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img src="https://media.licdn.com/dms/image/v2/D4E12AQFIpR9Jum9WYQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1667657902268?e=2147483647&v=beta&t=oys4Y8WxnC0T9zErFda_JZznYOjavTq8LUfXD3wo8Ek" 
                       alt="Schedule Management" 
                       className="rounded-3 shadow" 
                       style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3" style={{ background: "linear-gradient(45deg, rgba(179,157,219,0.2) 0%, rgba(142,110,200,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#B39DDB", color: "white" }}>
                  <i className="fas fa-clock fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Availability</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Manage your schedule</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge px-3 py-2" style={{ backgroundColor: "#B39DDB", color: "white", fontSize: "12px" }}>32/40 hours</span>
                  <div className="d-flex gap-1">
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#B39DDB" }}></div>
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#8E6EC8" }}></div>
                    <div className="rounded-circle" style={{ width: "8px", height: "8px", backgroundColor: "#7A5BC7" }}></div>
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
                  <img src="https://media.istockphoto.com/id/653832634/photo/portrait-of-male-doctor-standing-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=YKusn_UfkRfMdBWJR1thZOaJtMlZsNNf-cA2jlRbtGQ=" 
                       alt="Professional Profile" 
                       className="rounded-3 shadow" 
                       style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-3" style={{ background: "linear-gradient(45deg, rgba(232,161,176,0.2) 0%, rgba(217,137,154,0.2) 100%)" }}></div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle p-3 me-3 shadow-sm" style={{ backgroundColor: "#E8A1B0", color: "white" }}>
                  <i className="fas fa-user-md fa-lg"></i>
                </div>
                <div>
                  <h5 className="card-title mb-1 fw-bold" style={{ color: "#8E6EC8" }}>Profile</h5>
                  <p className="card-text mb-0" style={{ color: "#CFCFD4", fontSize: "14px" }}>Professional credentials</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">Profile 95% complete</small>
                  <div className="rounded-pill px-2 py-1" style={{ backgroundColor: "rgba(232,161,176,0.1)", color: "#E8A1B0", fontSize: "11px" }}>Verified</div>
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
                  <h5 className="mb-2" style={{ color: "#8E6EC8" }}>Practice Overview</h5>
                  <p className="text-muted mb-0">Your professional practice statistics</p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="d-flex justify-content-end gap-3">
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#F3A6A1", fontSize: "24px" }}>127</div>
                      <small className="text-muted">Total Clients</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#B39DDB", fontSize: "24px" }}>94%</div>
                      <small className="text-muted">Success Rate</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold" style={{ color: "#E8A1B0", fontSize: "24px" }}>4.9</div>
                      <small className="text-muted">Rating</small>
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