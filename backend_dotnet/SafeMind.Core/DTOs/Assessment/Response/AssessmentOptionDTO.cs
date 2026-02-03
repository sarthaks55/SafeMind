namespace SafeMind.Core.DTOs.Assessment.Response
{
    public class AssessmentOptionDTO
    {
        public long OptionId { get; set; }
        public string OptionText { get; set; } = string.Empty;
        public int OptionValue { get; set; }
    }
}
