using SafeMind.Core.DTOs.Assessment.Request;
using SafeMind.Core.DTOs.Assessment.Response;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class AssessmentService : IAssessmentService
    {
        private readonly ApplicationDbContext _context;

        public AssessmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<AssessmentListDTO>> GetAllAssessmentsAsync()
        {
            return await _context.Assessments
                .Select(a => new AssessmentListDTO
                {
                    AssessmentId = a.AssessmentId,
                    Title = a.Title ?? string.Empty,
                    Description = a.Description ?? string.Empty
                })
                .ToListAsync();
        }

        public async Task<AssessmentDetailDTO> GetAssessmentAsync(long assessmentId)
        {
            var assessment = await _context.Assessments
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.AssessmentId == assessmentId);

            if (assessment == null) throw new Exception("Assessment not found");

            // Load questions explicitly to avoid any lazy-loading/proxy issues
            var questions = await _context.AssessmentQuestions
                .Where(q => q.AssessmentId == assessmentId)
                .Include(q => q.Options)
                .OrderBy(q => q.OrderIndex)
                .ToListAsync();

            // If options are unexpectedly empty due to tracking/serialization, load them explicitly
            var questionIds = questions.Select(q => q.QuestionId).ToList();
            var anyMissingOptions = questions.Any(q => q.Options == null || !q.Options.Any());
            if (anyMissingOptions && questionIds.Any())
            {
                var options = await _context.AssessmentOptions
                    .Where(o => questionIds.Contains(o.QuestionId))
                    .ToListAsync();

                var optionsByQuestion = options.GroupBy(o => o.QuestionId)
                    .ToDictionary(g => g.Key, g => (ICollection<Core.Entities.AssessmentOption>)g.ToList());

                foreach (var q in questions)
                {
                    if (optionsByQuestion.TryGetValue(q.QuestionId, out var opts))
                    {
                        q.Options = opts;
                    }
                }
            }

            var questionDtos = questions.Select(q => new AssessmentQuestionDTO
            {
                QuestionId = q.QuestionId,
                QuestionText = q.QuestionText ?? string.Empty,
                Options = (q.Options ?? new List<Core.Entities.AssessmentOption>())
                    .Select(o => new AssessmentOptionDTO
                    {
                        OptionId = o.OptionId,
                        OptionText = o.OptionText ?? string.Empty,
                        OptionValue = o.OptionValue ?? 0
                    }).ToList()
            }).ToList();

            return new AssessmentDetailDTO
            {
                AssessmentId = assessment.AssessmentId,
                Title = assessment.Title ?? string.Empty,
                Description = assessment.Description ?? string.Empty,
                Questions = questionDtos
            };
        }

        public async Task<AssessmentResultDTO> SubmitAssessmentAsync(long assessmentId, AssessmentSubmitRequestDTO request)
        {
            // Calculate average score
            var totalScore = request.Answers.Sum(a => a.Value);
            var averageScore = (double)totalScore / request.Answers.Count;

            // Find matching result range
            var resultRange = await _context.AssessmentResultRanges
                .Where(r => r.AssessmentId == assessmentId 
                    && r.MinScore <= averageScore 
                    && r.MaxScore >= averageScore)
                .FirstOrDefaultAsync();

            if (resultRange == null)
            {
                return new AssessmentResultDTO
                {
                    AverageScore = averageScore,
                    ResultTitle = "Result",
                    Suggestion = "No specific suggestion available."
                };
            }

            return new AssessmentResultDTO
            {
                AverageScore = averageScore,
                ResultTitle = resultRange.ResultTitle ?? "Result",
                Suggestion = resultRange.SuggestionText ?? "No specific suggestion available."
            };
        }
    }
}
