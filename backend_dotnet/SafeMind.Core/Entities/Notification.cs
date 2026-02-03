using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SafeMind.Core.Entities
{
    [Table("notifications")]
    public class Notification
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("notification_id")]
        public long NotificationId { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        [Column("user_id")]
        public long UserId { get; set; }

        public User User { get; set; } = null!;

        [Required]
        [MaxLength(150)]
        [Column("title")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [Column("message")]
        public string Message { get; set; } = string.Empty; // @Lob usually implies max length or TEXT

        [Column("is_read")]
        public bool IsRead { get; set; } = false;

        [Column("created")]
        public DateTime Created { get; set; } = DateTime.UtcNow;
    }
}
