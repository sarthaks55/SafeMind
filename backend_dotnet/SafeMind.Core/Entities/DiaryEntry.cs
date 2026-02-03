using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SafeMind.Core.Entities
{
    [Table("diary_entries")]
    public class DiaryEntry : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("diary_id")]
        [JsonPropertyName("diaryId")]
        public long DiaryId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [JsonPropertyName("user")]
        public User User { get; set; } = null!;

        [Required]
        [Column("encrypted_text", TypeName = "TEXT")]
        [JsonPropertyName("encryptedText")]
        public string EncryptedText { get; set; } = string.Empty;

        [Column("is_deleted")]
        [JsonPropertyName("isDeleted")]
        public bool IsDeleted { get; set; } = false;
    }
}
