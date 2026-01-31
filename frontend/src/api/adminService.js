import api from "./axios";

// Admin profile
export const updateAdminProfile = (data) =>
  api.put("/admin/profile", data);

// Admin password
export const updateAdminPassword = (data) =>
  api.put("/admin/password", data);

// USERS
export const getAllUsers = () =>
  api.get("/admin/users");

export const updateUserActivation = (userId, active) =>
  api.put(`/admin/users/${userId}/activation`, {
    active,
  });


  // PROFESSIONALS
export const getAllProfessionals = () =>
  api.get("/admin/professionals");

export const updateProfessionalVerification = (userId, verified) =>
  api.put(`/admin/professionals/${userId}/verification`, {
    verified,
  });


export const getAppointmentsByProfessional = (professionalId) =>
  api.get(`/admin/appointments/professional/${professionalId}`);


// APPOINTMENTS
export const getAllAppointments = () =>
  api.get("/admin/appointments");

export const getAppointmentsByStatus = (status) =>
  api.get(`/admin/appointments/status/${status}`);

export const getAppointmentsBetweenDates = (start, end) =>
  api.get("/admin/appointments/between", {
    params: { start, end },
  });

export const getAppointmentsByUser = (userId) =>
  api.get(`/admin/appointments/user/${userId}`);


export const getNotifications = () =>
  api.get("/notifications");

export const getUnreadCount = () =>
  api.get("/notifications/unread-count");

export const markAsRead = (id) =>
  api.put(`/notifications/${id}/read`);