export const isAppointmentActive = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  return now >= start && now <= end;
};

export const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

export const getTimeUntilAppointment = (startTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const diffMs = start - now;
  
  if (diffMs <= 0) return null;
  
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) return `${diffDays} day(s)`;
  if (diffHours > 0) return `${diffHours} hour(s)`;
  return `${diffMins} minute(s)`;
};