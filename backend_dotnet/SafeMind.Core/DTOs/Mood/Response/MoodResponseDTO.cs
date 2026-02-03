namespace SafeMind.Core.DTOs.Mood.Response
{
    public class MoodResponseDTO
    {
        public long MoodId { get; set; }
        public long UserId { get; set; }
        public SafeMind.Core.Enums.Mood Mood { get; set; }
        public string? Notes { get; set; }
        public DateTime Date { get; set; } // Representing the date of the mood
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
