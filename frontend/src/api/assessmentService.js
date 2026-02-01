import api from "./axios";

export const getAssessments = async () => {
  const res = await api.get("/assessments");
  return res.data;
};

export const getAssessmentById = async (id) => {
  const res = await api.get(`/assessments/${id}`);
  return res.data;
};

export const submitAssessment = async (id, payload) => {
  const res = await api.post(`/assessments/${id}/submit`, payload);
  return res.data;
};
