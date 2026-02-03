using SafeMind.Core.DTOs.Mood.Request;
using SafeMind.Core.DTOs.Mood.Response;

namespace SafeMind.Core.Interfaces
{
    public interface IMoodService
    {
        Task<MoodResponseDTO> AddTodayMoodAsync(MoodRequestDTO dto, long userId);
        Task<MoodResponseDTO> UpdateTodayMoodAsync(MoodRequestDTO dto, long userId);
        Task<List<MoodResponseDTO>> GetUserMoodsAsync(long userId);
        Task<MoodAnalyticsResponseDTO> GetWeeklyAnalyticsAsync(long userId);
        Task<MoodAnalyticsResponseDTO> GetMonthlyAnalyticsAsync(long userId, int year, int month);
    }
}
