using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    [Table("assessment_options")]
    public class AssessmentOption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("option_id")]
        public long OptionId { get; set; }

        [Required]
        [ForeignKey(nameof(AssessmentQuestion))]
        [Column("question_id")]
        public long QuestionId { get; set; }

        public AssessmentQuestion Question { get; set; } = null!;

        [Column("option_text")]
        public string? OptionText { get; set; }
        [Column("option_value")]
        public int? OptionValue { get; set; } // 1-5
    }
}
