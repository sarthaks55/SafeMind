namespace SafeMind.Core.DTOs.Assessment.Response
{
    public class AssessmentDetailDTO
    {
        public long AssessmentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<AssessmentQuestionDTO> Questions { get; set; } = new List<AssessmentQuestionDTO>();
    }
}
