using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("video_sessions")]
    public class VideoSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("video_session_id")]
        public long VideoSessionId { get; set; }

        [Required]
        [ForeignKey(nameof(Appointment))]
        [Column("appointment_id")]
        public long AppointmentId { get; set; }

        public Appointment Appointment { get; set; } = null!;

        [Required]
        [Column("room_token")]
        public string RoomToken { get; set; } = string.Empty;

        [Column("allowed_from")]
        public DateTime? AllowedFrom { get; set; }
        [Column("allowed_until")]
        public DateTime? AllowedUntil { get; set; }

        [Column("patient_joined")]
        public DateTime? PatientJoined { get; set; }
        [Column("professional_joined")]
        public DateTime? ProfessionalJoined { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("status")]
        public VideoSessionStatus Status { get; set; }
    }
}
