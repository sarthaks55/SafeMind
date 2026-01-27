import api from "./axios";

export const getUserAppointments = () =>
  api.get("/appointments/user");

export const bookAppointment = (data) =>
  api.post("/appointments", data);

export const cancelAppointment = (id) =>
  api.put(`/appointments/${id}`);
