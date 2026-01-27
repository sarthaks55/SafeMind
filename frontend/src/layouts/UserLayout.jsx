import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const UserLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
