using SafeMind.Core.DTOs.Mood.Request;
using SafeMind.Core.DTOs.Mood.Response;
using SafeMind.Core.Entities;
using SafeMind.Core.Interfaces;
using SafeMind.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SafeMind.Infrastructure.Services
{
    public class MoodService : IMoodService
    {
        private readonly ApplicationDbContext _context;

        public MoodService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MoodResponseDTO> AddTodayMoodAsync(MoodRequestDTO dto, long userId)
        {
             var today = DateOnly.FromDateTime(DateTime.UtcNow);
            
            var existing = await _context.MoodEntries
                .FirstOrDefaultAsync(m => m.UserId == userId && m.EntryDate == today);
            
            if (existing != null) throw new Exception("Mood for today already exists. Use update.");

            var mood = new MoodEntry
            {
                UserId = userId,
                Mood = dto.Mood,
                Notes = dto.Notes,
                EntryDate = today,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.MoodEntries.Add(mood);
            await _context.SaveChangesAsync();

            return MapToDTO(mood);
        }

        public async Task<MoodResponseDTO> UpdateTodayMoodAsync(MoodRequestDTO dto, long userId)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);
            var mood = await _context.MoodEntries
                .FirstOrDefaultAsync(m => m.UserId == userId && m.EntryDate == today);

            if (mood == null) throw new Exception("Mood for today not found.");

            mood.Mood = dto.Mood;
            mood.Notes = dto.Notes;
            mood.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToDTO(mood);
        }

        public async Task<List<MoodResponseDTO>> GetUserMoodsAsync(long userId)
        {
            return await _context.MoodEntries
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.EntryDate)
                .Select(m => new MoodResponseDTO
                {
                     MoodId = m.MoodId,
                     UserId = m.UserId,
                     Mood = m.Mood,
                     Notes = m.Notes,
                     Date = m.EntryDate.ToDateTime(TimeOnly.MinValue),
                     CreatedAt = m.CreatedAt,
                     UpdatedAt = m.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<MoodAnalyticsResponseDTO> GetWeeklyAnalyticsAsync(long userId)
        {
            var end = DateOnly.FromDateTime(DateTime.UtcNow);
            var start = end.AddDays(-6);

            var moods = await _context.MoodEntries
                .Where(m => m.UserId == userId && m.EntryDate >= start && m.EntryDate <= end)
                .ToListAsync();

            return CreateAnalytics(moods, start, end);
        }

        public async Task<MoodAnalyticsResponseDTO> GetMonthlyAnalyticsAsync(long userId, int year, int month)
        {
            var start = new DateOnly(year, month, 1);
            var end = start.AddMonths(1).AddDays(-1);

            var moods = await _context.MoodEntries
                .Where(m => m.UserId == userId && m.EntryDate >= start && m.EntryDate <= end)
                .ToListAsync();

            return CreateAnalytics(moods, start, end);
        }

        private MoodAnalyticsResponseDTO CreateAnalytics(List<MoodEntry> moods, DateOnly start, DateOnly end)
        {
            // Map entries by date
            var map = moods.ToDictionary(m => m.EntryDate, m => m);

            // Build daily stats for each date in range
            var daily = new List<MoodDailyStatsDTO>();
            for (var d = start; d <= end; d = d.AddDays(1))
            {
                if (map.TryGetValue(d, out var entry) && entry.Mood != null)
                {
                    daily.Add(new MoodDailyStatsDTO { Date = d, MoodScore = (int)entry.Mood });
                }
                else
                {
                    daily.Add(new MoodDailyStatsDTO { Date = d, MoodScore = 0 });
                }
            }

            var totalEntries = moods.Count;
            var average = totalEntries == 0 ? 0 : Math.Round(moods.Average(m => (int)m.Mood) , 2);

            var distribution = moods.GroupBy(m => m.Mood.ToString()).ToDictionary(g => g.Key, g => (long)g.Count());

            return new MoodAnalyticsResponseDTO
            {
                AverageMood = average,
                TotalEntries = totalEntries,
                DailyStats = daily,
                MoodDistribution = distribution
            };
        }

        private MoodResponseDTO MapToDTO(MoodEntry mood)
        {
            return new MoodResponseDTO
            {
                MoodId = mood.MoodId,
                UserId = mood.UserId,
                Mood = mood.Mood,
                Notes = mood.Notes,
                Date = mood.EntryDate.ToDateTime(TimeOnly.MinValue),
                CreatedAt = mood.CreatedAt,
                UpdatedAt = mood.UpdatedAt
            };
        }
    }
}
