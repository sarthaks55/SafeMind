using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("professionals")]
    public class Professional : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("professional_id")]
        [JsonPropertyName("professionalId")]
        public long ProfessionalId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; } = null!;

        [Required]
        [Column("specialization")]
        [JsonPropertyName("specialization")]
        public Specialization Specialization { get; set; }

        [Required]
        [Column("spoken_language")]
        [JsonPropertyName("spokenLanguage")]
        public SpokenLanguage SpokenLanguage { get; set; }

        [Range(0, 100)]
        [Column("experience_years")]
        [JsonPropertyName("experienceYears")]
        public int ExperienceYears { get; set; }

        [Column("qualification")]
        [JsonPropertyName("qualification")]
        public string? Qualification { get; set; } // @Lob -> string (max)

        [Column("bio")]
        [JsonPropertyName("bio")]
        public string? Bio { get; set; } // @Lob

        [Column("consultation_fee", TypeName = "decimal(18,2)")]
        [JsonPropertyName("consultationFee")]
        public decimal ConsultationFee { get; set; }

        [Column("is_verified")]
        [JsonPropertyName("isVerified")]
        public bool IsVerified { get; set; } = false;

        // public ICollection<ProfessionalAvailability> Availabilities { get; set; } = new List<ProfessionalAvailability>();
    }
}
