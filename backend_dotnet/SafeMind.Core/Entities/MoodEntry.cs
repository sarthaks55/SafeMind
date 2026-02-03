using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("mood_entries")]
    public class MoodEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("moodId")]
        public long MoodId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; } = null!;

        [Required]
        [JsonPropertyName("mood")]
        public Mood Mood { get; set; }

        [Column(TypeName = "TEXT")]
        [JsonPropertyName("notes")]
        public string? Notes { get; set; }

        [Required]
        [Column("entry_date")]
        [JsonPropertyName("entryDate")]
        public DateOnly EntryDate { get; set; } // Use DateOnly for LocalDate equivalence in .NET 6+
    }
}
