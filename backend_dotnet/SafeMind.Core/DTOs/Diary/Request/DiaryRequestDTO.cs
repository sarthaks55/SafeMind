using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.Diary.Request
{
    public class DiaryRequestDTO
    {
        [Required(ErrorMessage = "Text is required")]
        public string Text { get; set; } = string.Empty;
    }
}
