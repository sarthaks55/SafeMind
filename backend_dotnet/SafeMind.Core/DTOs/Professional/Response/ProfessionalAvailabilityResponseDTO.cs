using SafeMind.Core.Enums;

namespace SafeMind.Core.DTOs.Professional.Response
{
    public class ProfessionalAvailabilityResponseDTO
    {
        public long AvailabilityId { get; set; }
        public DayOfWeekEnum DayOfWeek { get; set; }
        public string StartTime { get; set; } = string.Empty;
        public string EndTime { get; set; } = string.Empty;

        public ProfessionalAvailabilityResponseDTO(long availabilityId, DayOfWeekEnum dayOfWeek, TimeSpan startTime, TimeSpan endTime)
        {
            AvailabilityId = availabilityId;
            DayOfWeek = dayOfWeek;
            StartTime = startTime.ToString(@"hh\:mm");
            EndTime = endTime.ToString(@"hh\:mm");
        }
    }
}
