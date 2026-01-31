import api from "./axios";

export const joinVideoSession = async (appointmentId) => {
  return await api.post(`/video-sessions/appointments/${appointmentId}/join`);
};

export const endVideoSession = async (videoSessionId) => {
  return await api.post(`/video-sessions/${videoSessionId}/end`);
};