import api from "./axios";

export const createDiary = (data) =>
  api.post("/diary", data);

export const updateDiary = (id, data) =>
  api.put(`/diary/${id}`, data);

export const deleteDiary = (id) =>
  api.delete(`/diary/${id}`);

export const getAllDiaries = () =>
  api.get("/diary");
