using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Diary.Request;
using SafeMind.Core.Interfaces;
using System.Security.Claims;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/diary")]
    [Authorize]
    public class DiaryController : ControllerBase
    {
        private readonly IDiaryService _diaryService;

        public DiaryController(IDiaryService diaryService)
        {
            _diaryService = diaryService;
        }

        private long GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId");
            if (userIdClaim == null) throw new UnauthorizedAccessException("Invalid token");
            return long.Parse(userIdClaim.Value);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DiaryRequestDTO dto)
        {
            try
            {
                var userId = GetCurrentUserId();
                var response = await _diaryService.CreateAsync(userId, dto);
                
                return CreatedAtAction(nameof(GetAll), new { }, 
                    ApiResponse<SafeMind.Core.DTOs.Diary.Response.DiaryResponseDTO>.SuccessResponse("Diary created successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, [FromBody] DiaryRequestDTO dto)
        {
             try
            {
                var userId = GetCurrentUserId();
                var response = await _diaryService.UpdateAsync(id, userId, dto);
                
                return Ok(ApiResponse<SafeMind.Core.DTOs.Diary.Response.DiaryResponseDTO>.SuccessResponse("Diary updated successfully", response));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
             try
            {
                var userId = GetCurrentUserId();
                await _diaryService.DeleteAsync(id, userId);
                
                return Ok(ApiResponse<object>.SuccessResponse("Diary deleted successfully", null));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
             try
            {
                var userId = GetCurrentUserId();
                var diaries = await _diaryService.GetAllAsync(userId);
                
                return Ok(ApiResponse<List<SafeMind.Core.DTOs.Diary.Response.DiaryResponseDTO>>.SuccessResponse("Diaries fetched successfully", diaries));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
