import api from "./axios";

export const loginApi = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data; 
};

export const registerUserApi = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const registerProfessionalApi = async (data) => {
  const res = await api.post("/auth/register-professional", data);
  return res.data;
};

export const verifyOtp = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};