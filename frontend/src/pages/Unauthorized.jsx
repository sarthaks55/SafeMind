import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF9F7",
        padding: "20px",
      }}
    >
      <div className="col-md-6 col-lg-4">
        <div
          className="card border-0 shadow-sm text-center"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg, #8E6EC8 0%, #7A5BC7 100%)",
            color: "white",
          }}
        >
          <div className="card-body p-5">
            <div className="mb-4">
              <i
                className="fas fa-lock"
                style={{ fontSize: "50px", opacity: 0.9 }}
              ></i>
            </div>

            <h2 className="mb-3">403 – Unauthorized</h2>
            <p className="opacity-90 mb-4">
              You don’t have permission to access this page.
            </p>

            <div className="d-grid gap-2">
              <button
                className="btn btn-light fw-bold"
                onClick={() => {
                  if (window.history.length > 1) {
                    navigate(-1);
                  } else {
                    navigate("/", { replace: true });
                  }
                }}
                style={{ borderRadius: "10px" }}
              >
                Go Back
              </button>

              <button
                className="btn btn-outline-light"
                onClick={() => navigate("/")}
                style={{ borderRadius: "10px" }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
