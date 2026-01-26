package com.project.service;

import java.util.List;

import com.project.dto.MoodAnalyticsResponseDTO;
import com.project.dto.MoodRequestDTO;
import com.project.dto.MoodResponseDTO;

public interface MoodService {

    MoodResponseDTO addTodayMood(
            MoodRequestDTO dto,
            Long userId
    );

    MoodResponseDTO updateTodayMood(
            MoodRequestDTO dto,
            Long userId
    );

    List<MoodResponseDTO> getUserMoods(Long userId);
    
    
    
    
    
    MoodAnalyticsResponseDTO getWeeklyAnalytics(Long userId);

    MoodAnalyticsResponseDTO getMonthlyAnalytics(
            Long userId,
            int year,
            int month
    );
}
