import api from "./axios";

// Admin profile
export const getAdminProfile = async () => {
  const res = await api.get("/admin/profile");
  return res.data;
};

export const updateAdminProfile = async (data) => {
  const res = await api.put("/admin/profile", data);
  return res.data;
};

// Admin password
export const updateAdminPassword = async (data) => {
  const res = await api.put("/admin/password", data);
  return res.data;
};

// USERS
export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const updateUserActivation = async (userId, active) => {
  const res = await api.put(`/admin/users/${userId}/activation`, {
    active,
  });
  return res.data;
};

// PROFESSIONALS
export const getAllProfessionals = async () => {
  const res = await api.get("/admin/professionals");
  return res.data;
};

export const updateProfessionalVerification = async (userId, verified) => {
  const res = await api.put(`/admin/professionals/${userId}/verification`, {
    verified,
  });
  return res.data;
};

export const getAppointmentsByProfessional = async (professionalId) => {
  const res = await api.get(`/admin/appointments/professional/${professionalId}`);
  return res.data;
};

// APPOINTMENTS
export const getAllAppointments = async () => {
  const res = await api.get("/admin/appointments");
  return res.data;
};

export const getAppointmentsByStatus = async (status) => {
  const res = await api.get(`/admin/appointments/status/${status}`);
  return res.data;
};

export const getAppointmentsBetweenDates = async (start, end) => {
  const res = await api.get("/admin/appointments/between", {
    params: { start, end },
  });
  return res.data;
};

export const getAppointmentsByUser = async (userId) => {
  const res = await api.get(`/admin/appointments/user/${userId}`);
  return res.data;
};

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const getUnreadCount = async () => {
  const res = await api.get("/notifications/unread-count");
  return res.data;
};

export const markAsRead = async (id) => {
  const res = await api.put(`/notifications/${id}/read`);
  return res.data;
};