using System.Text.Json.Serialization;

namespace SafeMind.Core.DTOs.Notification.Response
{
    public class NotificationDTO
    {
        [JsonPropertyName("notificationId")]
        public long NotificationId { get; set; }
        [JsonPropertyName("userId")]
        public long UserId { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("message")]
        public string Message { get; set; } = string.Empty;
        [JsonPropertyName("isRead")]
        public bool IsRead { get; set; }
        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; set; }
    }
}
