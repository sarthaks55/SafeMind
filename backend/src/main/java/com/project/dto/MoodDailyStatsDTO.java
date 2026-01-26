package com.project.dto;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoodDailyStatsDTO {
    private LocalDate date;
    private int moodScore;
}
