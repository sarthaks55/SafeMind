import api from "./axios";

export const addMood = (data) =>
  api.post("/moods", data);

export const updateMood = (data) =>
  api.put("/moods", data);

export const getMyMoods = () =>
  api.get("/moods");

export const getWeeklyAnalytics = () =>
  api.get("/moods/weekly");

export const getMonthlyAnalytics = (year, month) =>
  api.get(`/moods/monthly?year=${year}&month=${month}`);
