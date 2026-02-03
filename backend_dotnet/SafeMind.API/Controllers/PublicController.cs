using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class PublicController : ControllerBase
    {
        private readonly IUserService _userService;

        public PublicController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("professionals")]
        public async Task<IActionResult> GetProfessionals()
        {
            try
            {
                var professionals = await _userService.GetAllProfessionalsAsync();
                
                return Ok(ApiResponse<object>.SuccessResponse("Professionals fetched successfully", professionals));
            }
            catch (Exception ex)
            {
                 return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
