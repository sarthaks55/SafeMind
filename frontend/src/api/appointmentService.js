import api from "./axios";

export const getUserAppointments = async () => {
  const res = await api.get("/appointments/user");
  return res.data;
};

export const bookAppointment = async (data) => {
  const res = await api.post("/appointments", data);
  return res.data;
};

export const cancelAppointment = async (id) => {
  const res = await api.put(`/appointments/${id}`);
  return res.data;
};

export const getProfessionals = async () => {
  const res = await api.get("/professionals");
  return res.data;
};