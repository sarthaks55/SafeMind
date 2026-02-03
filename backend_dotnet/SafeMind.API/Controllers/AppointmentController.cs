using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Appointment.Request;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;
using System.Security.Claims;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    [Authorize]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        /* ================= USER ================= */

        [HttpPost]
        public async Task<IActionResult> Book([FromBody] AppointmentRequestDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                var response = await _appointmentService.BookAppointmentAsync(dto, userId);
                
                return CreatedAtAction(nameof(UserAppointments), new { }, 
                    ApiResponse<object>.SuccessResponse("Appointment booked successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _appointmentService.CancelAppointmentAsync(id, userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointment cancelled successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("user")]
        public async Task<IActionResult> UserAppointments()
        {
             try
            {
                var userId = GetCurrentUserId();
                var appointments = await _appointmentService.GetUserAppointmentsAsync(userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("User appointments fetched successfully", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        /* ================= PROFESSIONAL ================= */

        [HttpGet("professional")]
        [Authorize(Roles = "ROLE_PROFESSIONAL")]
        public async Task<IActionResult> ProfessionalAppointments()
        {
             try
            {
                var userId = GetCurrentUserId();
                var appointments = await _appointmentService.GetProfessionalAppointmentsAsync(userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Professional appointments fetched successfully", appointments));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "ROLE_PROFESSIONAL")]
        public async Task<IActionResult> UpdateStatus(long id, [FromBody] AppointmentStatusUpdateDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                var updated = await _appointmentService.UpdateAppointmentStatusAsync(id, dto, userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Appointment status updated successfully", updated));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
