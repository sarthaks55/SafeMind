import api from "./axios";

export const createDiary = async (data) => {
  const res = await api.post("/diary", data);
  return res.data;
};

export const updateDiary = async (id, data) => {
  const res = await api.put(`/diary/${id}`, data);
  return res.data;
};

export const deleteDiary = async (id) => {
  const res = await api.delete(`/diary/${id}`);
  return res.data;
};

export const getAllDiaries = async () => {
  const res = await api.get("/diary");
  return res.data;
};
