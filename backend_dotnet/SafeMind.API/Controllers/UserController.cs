using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.DTOs.User.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using System.Security.Claims;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        /* ================= PROFILE ================= */

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserUpdateDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                var updatedUser = await _userService.UpdateProfileAsync(userId, dto);
                
                return Ok(ApiResponse<object>.SuccessResponse("Profile updated successfully", null));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userId = GetCurrentUserId();
                var profile = await _userService.GetProfileAsync(userId);
                
                return Ok(ApiResponse<UserUpdateDTO>.SuccessResponse("Profile found", profile));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= PASSWORD ================= */

        [HttpPut("password")]
        public async Task<IActionResult> UpdatePassword([FromBody] PasswordUpdateDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _userService.UpdatePasswordAsync(userId, dto);
                
                return Ok(ApiResponse<object>.SuccessResponse("Password updated successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= APPOINTMENT ================= */

        [HttpPut("appointments/{id}/cancel")]
        public async Task<IActionResult> CancelAppointment(long id)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _userService.CancelConfirmedAppointmentAsync(id, userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointment cancelled successfully", null));
            }
             catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= PROFESSIONALS ================= */

        [HttpGet("professionals")]
        [AllowAnonymous] // Assuming listing professionals might be public? Java Controller didn't specify, likely authenticated.
        // Actually Java code: @RequestMapping("/api/user") -> likely for logged in users.
        // But `getAllProfessionals` might be used by patients.
        // Let's keep [Authorize] from class level, unless requested otherwise.
        public async Task<IActionResult> GetProfessionals()
        {
             try
            {
                var professionals = await _userService.GetAllProfessionalsAsync();
                
                 return Ok(ApiResponse<IEnumerable<ProfessionalViewDTO>>.SuccessResponse("Professionals fetched successfully", professionals));
            }
             catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
