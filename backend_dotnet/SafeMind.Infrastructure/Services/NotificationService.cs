using SafeMind.Core.DTOs.Notification.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ApplicationDbContext _context;

        public NotificationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SendInAppNotificationAsync(long userId, string title, string message)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                IsRead = false,
                Created = DateTime.UtcNow
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
        }

        public async Task SendEmailNotificationAsync(string email, string subject, string body)
        {
            // TODO: Implement email sending logic (SMTP, SendGrid, etc.)
            await Task.CompletedTask;
        }

        public async Task<List<NotificationDTO>> GetUserNotificationsAsync(long userId)
        {
            return await _context.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.Created)
                .Select(n => new NotificationDTO
                {
                    NotificationId = n.NotificationId,
                    UserId = n.UserId,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    CreatedAt = n.Created
                })
                .ToListAsync();
        }

        public async Task MarkAsReadAsync(long notificationId, long userId)
        {
            var notification = await _context.Notifications.FindAsync(notificationId);
            if (notification == null) throw new Exception("Notification not found");
            if (notification.UserId != userId) throw new Exception("Unauthorized");

            notification.IsRead = true;
            await _context.SaveChangesAsync();
        }

        public async Task<long> GetUnreadCountAsync(long userId)
        {
            return await _context.Notifications
                .CountAsync(n => n.UserId == userId && !n.IsRead);
        }
    }
}
