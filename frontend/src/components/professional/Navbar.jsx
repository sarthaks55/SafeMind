import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="navbar">
      <span>Welcome, {auth?.fullName}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
