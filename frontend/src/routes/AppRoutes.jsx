import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import RegisterUser from "../auth/RegisterUser";
import RegisterProfessional from "../auth/RegisterProfessional";
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
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDashboardHome from "../pages/admin/DashboardHome";
import AdminProfile from "../pages/admin/Profile";
import Users from "../pages/admin/Users";
import Professionals from "../pages/admin/Professionals";
import AdminAppointments from "../pages/admin/Appointments";
import Notifications from "../pages/admin/Notifications";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Services from "../pages/Services";
import AssessmentList from "../pages/assessments/AssessmentList";
import AssessmentDetail from "../pages/assessments/AssessmentDetail";
import AssessmentResult from "../pages/assessments/AssessmentResult";
import Unauthorized from "../pages/Unauthorized";
import VideoSession from "../pages/VideoSession";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} /> {/* Add AboutUs route */}
      <Route path="/services" element={<Services />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/register-professional" element={<RegisterProfessional />} />
      <Route path="/assessments" element={<AssessmentList />} />
      <Route path="/assessments/:id" element={<AssessmentDetail />} />
      <Route path="/assessments/:id/result" element={<AssessmentResult />} />
      <Route path="/video-session/:appointmentId" element={<VideoSession />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/user" element={<UserDashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="moods" element={<MoodDashboard />} />
        <Route path="diary" element={<DiaryDashboard />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route
        path="/professional"
        element={
          <ProtectedRoute role="ROLE_PROFESSIONAL">
            <ProfessionalDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfessionalHome />} />
        <Route path="profile" element={<ProfessionalProfile />} />
        <Route path="appointments" element={<ProfessionalAppointments />} />
        <Route path="availability" element={<ProfessionalAvailability />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardHome />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="users" element={<Users />} />
        <Route path="professionals" element={<Professionals />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
