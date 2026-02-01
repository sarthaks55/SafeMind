import api from "./axios";

export const addMood = async (data) => {
  const res = await api.post("/moods", data);
  return res.data;
};

export const updateMood = async (data) => {
  const res = await api.put("/moods", data);
  return res.data;
};

export const getMyMoods = async () => {
  const res = await api.get("/moods");
  return res.data;
};

export const getWeeklyAnalytics = async () => {
  const res = await api.get("/moods/weekly");
  return res.data;
};

export const getMonthlyAnalytics = async (year, month) => {
  const res = await api.get(`/moods/monthly?year=${year}&month=${month}`);
  return res.data;
};
