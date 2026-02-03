using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.Appointment.Request
{
    public class AppointmentRequestDTO
    {
        [Required(ErrorMessage = "Professional ID is required")]
        public long ProfessionalId { get; set; }

        [Required(ErrorMessage = "Start time is required")]
        public DateTime StartTime { get; set; }
    }
}
