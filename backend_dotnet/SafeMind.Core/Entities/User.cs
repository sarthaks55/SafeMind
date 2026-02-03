using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SafeMind.Core.Enums;

namespace SafeMind.Core.Entities
{
    [Table("users")]
    public class User : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("user_id")]
        [JsonPropertyName("userId")]
        public long UserId { get; set; }

        [Required]
        [ForeignKey(nameof(Role))]
        [Column("role_id")]
        [JsonPropertyName("roleId")]
        public long RoleId { get; set; }

        [JsonPropertyName("role")]
        public Role Role { get; set; } = null!;

        [Required]
        [Column("full_name")]
        [MaxLength(100)]
        [JsonPropertyName("fullName")]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [Column("email")]
        [MaxLength(255)] // Assuming standard length
        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Column("password_hash")]
        [JsonPropertyName("passwordHash")]
        public string PasswordHash { get; set; } = string.Empty;

        [RegularExpression("^[6-9]\\d{9}$", ErrorMessage = "Invalid phone number")]
        [Column("phone")]
        [MaxLength(15)]
        [JsonPropertyName("phone")]
        public string? Phone { get; set; }

        [Column("gender", TypeName = "nvarchar(20)")] // Helper for Enum string storage if needed, or by convention
        [JsonPropertyName("gender")]
        public Gender? Gender { get; set; }

        [Column("is_active")]
        [JsonPropertyName("isActive")]
        public bool IsActive { get; set; } = true;
        [Column("is_deleted")]
        [JsonPropertyName("isDeleted")]
        public bool IsDeleted { get; set; } = false;

        [JsonPropertyName("professional")]
        public Professional? Professional { get; set; }

        public override string ToString()
        {
            return $"User [UserId={UserId}, Role={Role?.RoleName}, FullName={FullName}, Email={Email}, " +
                   $"Phone={Phone}, Gender={Gender}, IsActive={IsActive}, IsDeleted={IsDeleted}]";
        }
    }
}
