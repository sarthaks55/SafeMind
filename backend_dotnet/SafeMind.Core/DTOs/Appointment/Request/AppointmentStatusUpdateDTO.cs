using SafeMind.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.Appointment.Request
{
    public class AppointmentStatusUpdateDTO
    {
        [Required]
        public AppointmentStatus Status { get; set; }
    }
}
