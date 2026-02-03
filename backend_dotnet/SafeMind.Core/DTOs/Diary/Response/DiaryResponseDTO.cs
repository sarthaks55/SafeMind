namespace SafeMind.Core.DTOs.Diary.Response
{
    public class DiaryResponseDTO
    {
        public long DiaryId { get; set; }
        public long UserId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
