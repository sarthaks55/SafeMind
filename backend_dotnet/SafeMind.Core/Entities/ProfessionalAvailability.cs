using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("professional_availability")]
    public class ProfessionalAvailability
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long AvailabilityId { get; set; }

        [Required]
        [ForeignKey(nameof(Professional))]
        [Column("professional_id")]
        public long ProfessionalId { get; set; }

        public Professional Professional { get; set; } = null!;

        [Required]
        public DayOfWeekEnum DayOfWeek { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }
    }
}
