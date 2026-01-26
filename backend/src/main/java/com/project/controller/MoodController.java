package com.project.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MoodAnalyticsResponseDTO;
import com.project.dto.MoodRequestDTO;
import com.project.dto.MoodResponseDTO;
import com.project.security.CustomUserDetails;
import com.project.service.MoodService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/moods")
@RequiredArgsConstructor
public class MoodController {

    private final MoodService moodService;

    @PostMapping
    public MoodResponseDTO addMood(
            @RequestBody MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return moodService.addTodayMood(
                dto, user.getUserId());
    }

    @PutMapping
    public MoodResponseDTO updateMood(
            @RequestBody MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return moodService.updateTodayMood(
                dto, user.getUserId());
    }

    @GetMapping
    public List<MoodResponseDTO> getMyMoods(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return moodService.getUserMoods(user.getUserId());
    }
    
    
    
    
    /* ================= WEEKLY ================= */

    @GetMapping("/weekly")
    public MoodAnalyticsResponseDTO weekly(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return moodService
                .getWeeklyAnalytics(user.getUserId());
    }

    /* ================= MONTHLY ================= */

    @GetMapping("/monthly")
    public MoodAnalyticsResponseDTO monthly(
            @RequestParam int year,
            @RequestParam int month,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return moodService
                .getMonthlyAnalytics(
                        user.getUserId(), year, month);
    }
    

}
