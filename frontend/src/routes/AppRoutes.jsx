import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import RegisterUser from "../auth/RegisterUser";
import RegisterProfessional from "../auth/RegisterProfessional";
//import UserDashboard from "./pages/user/UserDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/user/Profile";
import UserDashboard from "../pages/user/UserDashboard";
import DashboardHome from "../pages/user/DashboardHome";
import Appointments from "../pages/user/Appointments";
import BookAppointment from "../pages/user/BookAppointment";
import MoodDashboard from "../pages/user/moods/MoodDashboard";
import DiaryDashboard from "../pages/user/diary/DiaryDashboard";
import ProfessionalDashboard from "../pages/professional/ProfessionalDashboard";
import ProfessionalHome from "../pages/professional/DashboardHome";
import ProfessionalProfile from "../pages/professional/Profile";
import ProfessionalAppointments from "../pages/professional/Appointments";
import ProfessionalAvailability from "../pages/professional/Availability";





const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/register-professional" element={<RegisterProfessional />} />
      {/* <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="ROLE_USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route index element={<DashboardHome />} /> */}
        {/* <Route path="user/profile" element={<Profile />} /> */}
        {/* <Route path="appointments" element={<Appointments />} />
        <Route path="mood" element={<Mood />} />
        <Route path="diary" element={<Diary />} /> */}

        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="moods" element={<MoodDashboard />} />
          <Route path="diary" element={<DiaryDashboard />} />
        </Route>

        
        {/* <Route path="/professional" element={
          <ProtectedRoute role="ROLE_PROFESSIONAL">
            <ProfessionalDashboard />
          </ProtectedRoute> } >
        <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="availability" element={<Availability />} />
        </Route> */}
        
        <Route path="/professional" element={
          <ProtectedRoute role="ROLE_PROFESSIONAL">
            <ProfessionalDashboard />
          </ProtectedRoute> } >
  <Route index element={<ProfessionalHome />} />
  <Route path="profile" element={<ProfessionalProfile />} />
  <Route path="appointments" element={<ProfessionalAppointments />} />
  <Route path="availability" element={<ProfessionalAvailability />} />


</Route>



    </Routes>
    
  );
};

export default AppRoutes;
