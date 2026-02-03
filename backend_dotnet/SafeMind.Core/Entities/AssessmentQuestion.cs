using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    [Table("assessment_questions")]
    public class AssessmentQuestion
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("question_id")]
        public long QuestionId { get; set; }

        [Required]
        [ForeignKey(nameof(Assessment))]
        [Column("assessment_id")]
        public long AssessmentId { get; set; }

        public Assessment Assessment { get; set; } = null!;

        [Column("question_text")]
        public string? QuestionText { get; set; }
        [Column("order_index")]
        public int? OrderIndex { get; set; }

        public ICollection<AssessmentOption> Options { get; set; } = new List<AssessmentOption>();
    }
}
