package com.project.dto.mood.response;

import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoodAnalyticsResponseDTO {

    private double averageMood;
    private int totalEntries;

    // For line / bar charts
    private List<MoodDailyStatsDTO> dailyStats;

    // For pie charts
    private Map<String, Long> moodDistribution;

}
