using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    [Table("assessments")]
    public class Assessment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("assessment_id")]
        public long AssessmentId { get; set; }

        [Column("title")]
        public string? Title { get; set; }
        [Column("description")]
        public string? Description { get; set; }

        public ICollection<AssessmentQuestion> Questions { get; set; } = new List<AssessmentQuestion>();
    }
}
