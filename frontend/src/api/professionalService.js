import api from "./axios";

export const getProfessionalProfile = async () => {
  const res = await api.get("/professional/profile");
  return res.data;
};

export const updateProfessionalProfile = async (data) => {
  const res = await api.put("/professional/profile", data);
  return res.data;
};

export const changeProfessionalPassword = async (data) => {
  const res = await api.put("/professional/password", data);
  return res.data;
};

export const getProfessionalAppointments = async () => {
  const res = await api.get("/appointments/professional");
  return res.data;
};

export const updateAppointmentStatus = async (id, data) => {
  const res = await api.put(`/professional/appointments/${id}/status`, data);
  return res.data;
};

export const getAvailability = async () => {
  const res = await api.get("/professional/availability");
  return res.data;
};

export const addAvailability = async (data) => {
  const res = await api.post("/professional/availability", data);
  return res.data;
};

export const updateAvailability = async (id, data) => {
  const res = await api.put(`/professional/availability/${id}`, data);
  return res.data;
};

export const deleteAvailability = async (id) => {
  const res = await api.delete(`/professional/availability/${id}`);
  return res.data;
};
