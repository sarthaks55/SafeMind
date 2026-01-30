import api from "./axios";

export const getAssessments = () =>
  api.get("/assessments");

export const getAssessmentById = (id) =>
  api.get(`/assessments/${id}`);

export const submitAssessment = (id, payload) =>
  api.post(`/assessments/${id}/submit`, payload);
