using System;

namespace SafeMind.Core.DTOs.Mood.Response
{
    public class MoodDailyStatsDTO
    {
        public DateOnly Date { get; set; }
        public int MoodScore { get; set; }
    }
}
