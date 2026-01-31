import api from "./axios";

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data; 
};

export const registerUserApi = async (data) => {
  return api.post("/auth/register", data);
};

export const registerProfessionalApi = async (data) => {
  return api.post("/auth/registerProfessional", data);
};
