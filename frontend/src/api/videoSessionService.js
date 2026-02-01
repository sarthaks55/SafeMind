import api from "./axios";

export const joinVideoSession = async (appointmentId) => {
  const res = await api.post(`/video-sessions/appointments/${appointmentId}/join`);
  return res.data;
};

export const endVideoSession = async (videoSessionId) => {
  const res = await api.post(`/video-sessions/${videoSessionId}/end`);
  return res.data;
};