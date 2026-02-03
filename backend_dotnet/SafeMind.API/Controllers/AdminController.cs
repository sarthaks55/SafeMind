using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Admin.Request;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.Enums;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;
using System.Security.Claims;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "ROLE_ADMIN")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IAppointmentService _appointmentService;
        private readonly IUserService _userService;

        public AdminController(IAdminService adminService, IAppointmentService appointmentService, IUserService userService)
        {
            _adminService = adminService;
            _appointmentService = appointmentService;
            _userService = userService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        /* ================= ADMIN SELF ================= */

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] AdminUpdateDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                await _adminService.UpdateOwnProfileAsync(userId, dto);
                
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
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.User.Request.UserUpdateDTO>.SuccessResponse("Profile found", profile));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("password")]
        public async Task<IActionResult> UpdatePassword([FromBody] PasswordUpdateDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                await _adminService.UpdatePasswordAsync(userId, dto);
                
                return Ok(ApiResponse<object>.SuccessResponse("Password updated successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= USERS ================= */

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _adminService.GetAllUsersAsync();
                
                return Ok(ApiResponse<object>.SuccessResponse("Users fetched successfully", users));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("users/{id}/activation")]
        public async Task<IActionResult> UpdateUserStatus(long id, [FromBody] UserActivationDTO dto)
        {
            try
            {
                await _adminService.UpdateUserActivationAsync(id, dto.Active);
                
                return Ok(ApiResponse<object>.SuccessResponse("User activation status updated", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= PROFESSIONALS ================= */

        [HttpGet("professionals")]
        public async Task<IActionResult> GetProfessionals()
        {
            try
            {
                var professionals = await _adminService.GetAllProfessionalsAsync();
                
                return Ok(ApiResponse<object>.SuccessResponse("Professionals fetched successfully", professionals));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("professionals/{userId}/verification")]
        public async Task<IActionResult> UpdateVerification(long userId, [FromBody] ProfessionalVerificationDTO dto)
        {
            try
            {
                await _adminService.UpdateProfessionalVerificationAsync(userId, dto.Verified);
                
                return Ok(ApiResponse<object>.SuccessResponse("Professional verification updated", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= APPOINTMENTS ================= */

        [HttpGet("appointments")]
        public async Task<IActionResult> GetAllAppointments()
        {
            try
            {
                var appointments = await _appointmentService.GetAllAppointmentsAsync();
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointments fetched successfully", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("appointments/status/{status}")]
        public async Task<IActionResult> GetAppointmentsByStatus(AppointmentStatus status)
        {
            try
            {
                var appointments = await _appointmentService.GetAppointmentsByStatusAsync(status);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointments fetched by status", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("appointments/user/{userId}")]
        public async Task<IActionResult> GetAppointmentsByUser(long userId)
        {
            try
            {
                var appointments = await _appointmentService.GetAppointmentsByUserIdAsync(userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointments fetched by user", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("appointments/professional/{professionalId}")]
        public async Task<IActionResult> GetAppointmentsByProfessional(long professionalId)
        {
            try
            {
                var appointments = await _appointmentService.GetAppointmentsByProfessionalIdAsync(professionalId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointments fetched by professional", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("appointments/between")]
        public async Task<IActionResult> GetAppointmentsBetweenDates([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            try
            {
                var appointments = await _appointmentService.GetAppointmentsBetweenDatesAsync(start, end);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointments fetched between dates", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
