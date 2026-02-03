namespace SafeMind.Core.DTOs.Assessment.Response
{
    public class AssessmentListDTO
    {
        public long AssessmentId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
