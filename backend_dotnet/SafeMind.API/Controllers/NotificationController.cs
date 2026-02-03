using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.Interfaces;
using System.Security.Claims;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/notifications")]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotifications()
        {
             try
            {
                var userId = GetCurrentUserId();
                var notifications = await _notificationService.GetUserNotificationsAsync(userId);
                
                return Ok(ApiResponse<List<SafeMind.Core.DTOs.Notification.Response.NotificationDTO>>.SuccessResponse("Notifications fetched successfully", notifications));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkRead(long id)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _notificationService.MarkAsReadAsync(id, userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Notification marked as read", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("unread-count")]
        public async Task<IActionResult> UnreadCount()
        {
             try
            {
                var userId = GetCurrentUserId();
                var count = await _notificationService.GetUnreadCountAsync(userId);
                
                return Ok(ApiResponse<int>.SuccessResponse("Unread notification count fetched successfully", (int)count));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
