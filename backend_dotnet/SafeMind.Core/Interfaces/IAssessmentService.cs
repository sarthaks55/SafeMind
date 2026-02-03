using SafeMind.Core.DTOs.Assessment.Request;
using SafeMind.Core.DTOs.Assessment.Response;

namespace SafeMind.Core.Interfaces
{
    public interface IAssessmentService
    {
        Task<List<AssessmentListDTO>> GetAllAssessmentsAsync();
        Task<AssessmentDetailDTO> GetAssessmentAsync(long assessmentId);
        Task<AssessmentResultDTO> SubmitAssessmentAsync(long assessmentId, AssessmentSubmitRequestDTO request);
    }
}
