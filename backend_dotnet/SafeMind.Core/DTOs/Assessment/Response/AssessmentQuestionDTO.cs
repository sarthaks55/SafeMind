namespace SafeMind.Core.DTOs.Assessment.Response
{
    public class AssessmentQuestionDTO
    {
        public long QuestionId { get; set; }
        public string QuestionText { get; set; } = string.Empty;
        public List<AssessmentOptionDTO> Options { get; set; } = new List<AssessmentOptionDTO>();
    }
}
