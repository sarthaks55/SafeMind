using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.DTOs.Professional.Request;
using SafeMind.Core.DTOs.User.Request;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/professional")]
    [Authorize(Roles = "ROLE_PROFESSIONAL")] // Ensure only professionals access
    public class ProfessionalController : ControllerBase
    {
        private readonly IProfessionalService _professionalService;
        
        public ProfessionalController(IProfessionalService professionalService)
        {
            _professionalService = professionalService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        /* ================= PROFILE ================= */

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfessionalUpdateDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                var updated = await _professionalService.UpdateProfessionalProfileAsync(userId, dto);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Professional.Request.ProfessionalUpdateDTO>.SuccessResponse("Profile updated successfully", updated));
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
                var profile = await _professionalService.GetProfessionalProfileAsync(userId);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Professional.Request.ProfessionalUpdateDTO>.SuccessResponse("Profile fetched successfully", profile));
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
                await _professionalService.UpdatePasswordAsync(userId, dto);
                
                return Ok(ApiResponse<object>.SuccessResponse("Password updated successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= APPOINTMENTS ================= */

        [HttpPut("appointments/{id}/status")]
        public async Task<IActionResult> UpdateAppointmentStatus(long id, [FromBody] ProfessionalAppointmentStatusDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _professionalService.UpdateAppointmentStatusAsync(userId, id, dto);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointment status updated successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= AVAILABILITY ================= */

        [HttpPost("availability")]
        public async Task<IActionResult> AddAvailability([FromBody] ProfessionalAvailabilityDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _professionalService.AddAvailabilityAsync(userId, dto);
                
                return CreatedAtAction(nameof(AddAvailability), new { }, 
                    ApiResponse<SafeMind.Core.DTOs.Professional.Response.ProfessionalAvailabilityResponseDTO>.SuccessResponse("Availability added successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("availability")]
        public async Task<IActionResult> GetAvailability()
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _professionalService.GetMyAvailabilityAsync(userId);
                
                return Ok(ApiResponse<List<SafeMind.Core.DTOs.Professional.Response.ProfessionalAvailabilityResponseDTO>>.SuccessResponse("Availability fetched successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpDelete("availability/{id}")]
        public async Task<IActionResult> DeleteAvailability(long id)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _professionalService.DeleteAvailabilityAsync(userId, id);
                
                return Ok(ApiResponse<object>.SuccessResponse("Availability deleted successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
