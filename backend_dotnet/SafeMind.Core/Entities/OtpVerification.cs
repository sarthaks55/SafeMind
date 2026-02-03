using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    [Table("otp_verifications")]
    public class OtpVerification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long OtpId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        public long UserId { get; set; }

        public User User { get; set; } = null!;

        public string? OtpHash { get; set; }

        public DateTime ExpiresAt { get; set; }

        public bool Verified { get; set; } = false;
    }
}
