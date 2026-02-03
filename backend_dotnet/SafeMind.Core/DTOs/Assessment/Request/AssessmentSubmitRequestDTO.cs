using System.ComponentModel.DataAnnotations;

namespace SafeMind.Core.DTOs.Assessment.Request
{
    public class AssessmentSubmitRequestDTO
    {
        [Required]
        public List<AnswerDTO> Answers { get; set; } = new List<AnswerDTO>();

        public class AnswerDTO
        {
            [Required]
            public long QuestionId { get; set; }
            
            [Required]
            public int Value { get; set; }
        }
    }
}
