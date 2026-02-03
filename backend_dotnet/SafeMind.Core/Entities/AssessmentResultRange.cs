using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SafeMind.Core.Entities
{
    [Table("assessment_result_ranges")]
    public class AssessmentResultRange
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("result_id")]
        [JsonPropertyName("resultId")]
        public long ResultId { get; set; }

        [Required]
        [ForeignKey(nameof(Assessment))]
        [Column("assessment_id")]
        [JsonPropertyName("assessmentId")]
        public long AssessmentId { get; set; }

        [JsonPropertyName("assessment")]
        public Assessment Assessment { get; set; } = null!;

        [Column("min_score")]
        [JsonPropertyName("minScore")]
        public double? MinScore { get; set; }
        [Column("max_score")]
        [JsonPropertyName("maxScore")]
        public double? MaxScore { get; set; }

        [Column("result_title")]
        [JsonPropertyName("resultTitle")]
        public string? ResultTitle { get; set; }
        [Column("suggestion_text")]
        [JsonPropertyName("suggestionText")]
        public string? SuggestionText { get; set; }
    }
}
