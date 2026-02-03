using SafeMind.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.Mood.Request
{
    public class MoodRequestDTO
    {
        [Required]
        public SafeMind.Core.Enums.Mood Mood { get; set; }

        public string? Notes { get; set; }
    }
}
