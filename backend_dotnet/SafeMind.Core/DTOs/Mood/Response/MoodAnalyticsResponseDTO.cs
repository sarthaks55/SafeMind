using System;
using System.Collections.Generic;

namespace SafeMind.Core.DTOs.Mood.Response
{
    public class MoodAnalyticsResponseDTO
    {
        public double AverageMood { get; set; }
        public int TotalEntries { get; set; }

        // For line / bar charts
        public List<MoodDailyStatsDTO> DailyStats { get; set; } = new List<MoodDailyStatsDTO>();

        // For pie charts
        public Dictionary<string, long> MoodDistribution { get; set; } = new Dictionary<string, long>();
    }
}
