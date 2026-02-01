import api from "./axios";

export const getProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/user/profile", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/user/password", data);
  return res.data;
};
