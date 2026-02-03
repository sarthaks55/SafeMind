namespace SafeMind.Core.DTOs.Assessment.Response
{
    public class AssessmentResultDTO
    {
        public double AverageScore { get; set; }
        public string ResultTitle { get; set; } = string.Empty;
        public string Suggestion { get; set; } = string.Empty;
        public string Disclaimer { get; set; } = "This assessment is not a medical diagnosis.";
    }
}
