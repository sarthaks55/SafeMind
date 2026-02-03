namespace SafeMind.Core.DTOs.Appointment.Response
{
    public class AppointmentResponseDTO
    {
        public long AppointmentId { get; set; }
        public long UserId { get; set; }
        public string? FullName { get; set; }
        public string? ProfessionalName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        // Use string for status to avoid missing enum dependency
        public string Status { get; set; } = string.Empty;
    }
}
