using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("appointments")]
    public class Appointment : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("appointment_id")]
        [JsonPropertyName("appointmentId")]
        public long AppointmentId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Professional))]
        [Column("professional_id")]
        [JsonPropertyName("professionalId")]
        public long ProfessionalId { get; set; }

        [JsonPropertyName("professional")]
        public Professional Professional { get; set; } = null!;

        [Required]
        [Column("start_time")]
        [JsonPropertyName("startTime")]
        public DateTime StartTime { get; set; }

        [Required]
        [Column("end_time")]
        [JsonPropertyName("endTime")]
        public DateTime EndTime { get; set; }

        [Required]
        [Column("status")]
        [JsonPropertyName("status")]
        public AppointmentStatus Status { get; set; } = AppointmentStatus.PENDING;

        [MaxLength(255)]
        [Column("cancellation_reason")]
        [JsonPropertyName("cancellationReason")]
        public string? CancellationReason { get; set; }
    }
}
