using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Mood.Request;
using SafeMind.Core.Interfaces;
using System.Security.Claims;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/moods")]
    [Authorize]
    public class MoodController : ControllerBase
    {
        private readonly IMoodService _moodService;

        public MoodController(IMoodService moodService)
        {
            _moodService = moodService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        [HttpPost]
        public async Task<IActionResult> AddMood([FromBody] MoodRequestDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _moodService.AddTodayMoodAsync(dto, userId);
                
                return CreatedAtAction(nameof(GetMyMoods), new { }, 
                    ApiResponse<SafeMind.Core.DTOs.Mood.Response.MoodResponseDTO>.SuccessResponse("Mood added successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMood([FromBody] MoodRequestDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _moodService.UpdateTodayMoodAsync(dto, userId);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Mood.Response.MoodResponseDTO>.SuccessResponse("Mood updated successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMyMoods()
        {
             try
            {
                var userId = GetCurrentUserId();
                var moods = await _moodService.GetUserMoodsAsync(userId);
                
                return Ok(ApiResponse<List<SafeMind.Core.DTOs.Mood.Response.MoodResponseDTO>>.SuccessResponse("User moods fetched successfully", moods));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("weekly")]
        public async Task<IActionResult> Weekly()
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _moodService.GetWeeklyAnalyticsAsync(userId);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Mood.Response.MoodAnalyticsResponseDTO>.SuccessResponse("Weekly mood analytics fetched successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("monthly")]
        public async Task<IActionResult> Monthly([FromQuery] int year, [FromQuery] int month)
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _moodService.GetMonthlyAnalyticsAsync(userId, year, month);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Mood.Response.MoodAnalyticsResponseDTO>.SuccessResponse("Monthly mood analytics fetched successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
