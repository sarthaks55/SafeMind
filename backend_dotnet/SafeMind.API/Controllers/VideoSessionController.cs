using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Video.Response;
using SafeMind.Core.Interfaces;
using System.Security.Claims;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/video-sessions")]
    [Authorize]
    public class VideoSessionController : ControllerBase
    {
        private readonly IVideoSessionService _videoSessionService;

        public VideoSessionController(IVideoSessionService videoSessionService)
        {
            _videoSessionService = videoSessionService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        [HttpPost("appointments/{appointmentId}/join")]
        public async Task<IActionResult> JoinSession(long appointmentId)
        {
            try
            {
                var session = await _videoSessionService.CreateOrGetVideoSessionAsync(appointmentId);

                // Construct signaling URL (mock or real logic matching Java)
                // Java: scheme + "://" + host + (port) + "/ws/signaling"
                // .NET: Request.Scheme ...
                var request = HttpContext.Request;

                // Determine scheme: prefer X-Forwarded-Proto if present (behind proxies), else IsHttps
                var protoHeader = request.Headers["X-Forwarded-Proto"].FirstOrDefault();
                var scheme = !string.IsNullOrEmpty(protoHeader)
                    ? (protoHeader.Equals("https", StringComparison.OrdinalIgnoreCase) ? "wss" : "ws")
                    : (request.IsHttps ? "wss" : "ws");

                // Use Host.Value which may already contain port. Be defensive and avoid duplicate colons.
                var hostValue = request.Host.HasValue ? request.Host.Value : string.Empty;
                hostValue = hostValue?.Trim() ?? string.Empty;
                if (hostValue.StartsWith(":")) hostValue = hostValue.TrimStart(':');

                // If hostValue already contains port (like "localhost:8443"), do not append port again.
                var wsUrl = string.IsNullOrEmpty(hostValue)
                    ? $"{scheme}://{request.Host.Host}/ws/signaling"
                    : $"{scheme}://{hostValue}/ws/signaling";
                 
                // Mark participant joined? Java controller calls local logic or client calls via WS?
                // Java controller didn't call markJoined. It just returns token.
                // Ah, wait. Java Service has `markParticipantJoined` but Controller doesn't seem to call it in `joinSession`.
                // Maybe WS handler calls it? Or separate endpoint? 
                // Let's stick to what Java controller does: create/get session and return details.
                // I will add a side effect to mark usage if needed, but for now just Return.

                var response = new JoinSessionResponse(
                    session.RoomToken,
                    wsUrl,
                    session.AllowedFrom,
                    session.AllowedUntil
                );
                
                return Ok(ApiResponse<JoinSessionResponse>.SuccessResponse("Joined video session successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPost("{videoSessionId}/end")]
        public async Task<IActionResult> EndSession(long videoSessionId)
        {
             try
            {
                await _videoSessionService.EndSessionAsync(videoSessionId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Video session ended successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
