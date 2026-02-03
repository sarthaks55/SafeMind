using SafeMind.Core.DTOs.Notification.Response;

namespace SafeMind.Core.Interfaces
{
    public interface INotificationService
    {
        Task SendInAppNotificationAsync(long userId, string title, string message);
        Task SendEmailNotificationAsync(string email, string subject, string body); // Optional, might rely on IEmailService
        Task<List<NotificationDTO>> GetUserNotificationsAsync(long userId);
        Task MarkAsReadAsync(long notificationId, long userId);
        Task<long> GetUnreadCountAsync(long userId);
    }
}
