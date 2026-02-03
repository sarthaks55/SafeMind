using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Professional.Request
{
    public class ProfessionalAvailabilityDTO
    {
        public DayOfWeekEnum DayOfWeek { get; set; }
        // Using string "HH:mm" for input parsing simplicity, or TimeSpan
        // Java used LocalTime with JsonFormat.
        // We'll use string and parse it in Service or Controller, or TimeSpan directly.
        // Let's use string to match "HH:mm" exactly.
        public string StartTime { get; set; } = string.Empty; 
        public string EndTime { get; set; } = string.Empty;
    }
}
