using Microsoft.AspNetCore.Mvc;
using SafeMind.Core.DTOs.Assessment.Request;
using SafeMind.Core.Interfaces;
using SafeMind.Core.Responses;

namespace SafeMind.API.Controllers
{
    [ApiController]
    [Route("api/assessments")]
    public class AssessmentController : ControllerBase
    {
        private readonly IAssessmentService _assessmentService;

        public AssessmentController(IAssessmentService assessmentService)
        {
            _assessmentService = assessmentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var assessments = await _assessmentService.GetAllAssessmentsAsync();
                
                return Ok(ApiResponse<object>.SuccessResponse("Assessments fetched successfully", assessments));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpGet("{assessmentId}")]
        public async Task<IActionResult> GetAssessment(long assessmentId)
        {
            try
            {
                var assessment = await _assessmentService.GetAssessmentAsync(assessmentId);

                Console.WriteLine($"Fetched Assessment: {assessment.Title}, Questions Count: {assessment.Questions.Count}");

                return Ok(ApiResponse<object>.SuccessResponse("Assessment fetched successfully", assessment));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }

        [HttpPost("{assessmentId}/submit")]
        public async Task<IActionResult> Submit(long assessmentId, [FromBody] AssessmentSubmitRequestDTO request)
        {
            try
            {
                var result = await _assessmentService.SubmitAssessmentAsync(assessmentId, request);
                
                return Ok(ApiResponse<object>.SuccessResponse("Assessment submitted successfully", result));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse<object>.FailureResponse(ex.Message));
            }
        }
    }
}
