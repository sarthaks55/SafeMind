import api from "./axios";


export const updateProfessionalProfile = (data) =>
  api.put("/professional/profile", data);


export const changeProfessionalPassword = (data) =>
  api.put("/professional/password", data);


export const getProfessionalAppointments = () =>
  api.get("/appointments/professional");

export const updateAppointmentStatus = (id, data) =>
  api.put(`/professional/appointments/${id}/status`, data);



export const getAvailability = () =>
  api.get("/professional/availability");

export const addAvailability = (data) =>
  api.post("/professional/availability", data);

export const updateAvailability = (id, data) =>
  api.put(`/professional/availability/${id}`, data);

export const deleteAvailability = (id) =>
  api.delete(`/professional/availability/${id}`);
