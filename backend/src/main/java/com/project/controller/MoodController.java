package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.mood.request.MoodRequestDTO;
import com.project.dto.mood.response.MoodAnalyticsResponseDTO;
import com.project.dto.mood.response.MoodResponseDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.MoodService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/moods")
@RequiredArgsConstructor
public class MoodController {

    private final MoodService moodService;

    /* ================= ADD MOOD ================= */

    @PostMapping
    public ResponseEntity<ApiResponse<MoodResponseDTO>> addMood(
            @RequestBody @Valid MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodResponseDTO response =
                moodService.addTodayMood(dto, user.getUserId());

        return ResponseBuilder.success(
                "Mood added successfully",
                response,
                HttpStatus.CREATED
        );
    }

    /* ================= UPDATE MOOD ================= */

    @PutMapping
    public ResponseEntity<ApiResponse<MoodResponseDTO>> updateMood(
            @RequestBody @Valid MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodResponseDTO response =
                moodService.updateTodayMood(dto, user.getUserId());

        return ResponseBuilder.success(
                "Mood updated successfully",
                response,
                HttpStatus.OK
        );
    }

    /* ================= GET MY MOODS ================= */

    @GetMapping
    public ResponseEntity<ApiResponse<List<MoodResponseDTO>>> getMyMoods(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<MoodResponseDTO> moods =
                moodService.getUserMoods(user.getUserId());

        return ResponseBuilder.success(
                "User moods fetched successfully",
                moods,
                HttpStatus.OK
        );
    }

    /* ================= WEEKLY ANALYTICS ================= */

    @GetMapping("/weekly")
    public ResponseEntity<ApiResponse<MoodAnalyticsResponseDTO>> weekly(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodAnalyticsResponseDTO response =
                moodService.getWeeklyAnalytics(user.getUserId());

        return ResponseBuilder.success(
                "Weekly mood analytics fetched successfully",
                response,
                HttpStatus.OK
        );
    }

    /* ================= MONTHLY ANALYTICS ================= */

    @GetMapping("/monthly")
    public ResponseEntity<ApiResponse<MoodAnalyticsResponseDTO>> monthly(
            @RequestParam int year,
            @RequestParam int month,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodAnalyticsResponseDTO response =
                moodService.getMonthlyAnalytics(
                        user.getUserId(), year, month);

        return ResponseBuilder.success(
                "Monthly mood analytics fetched successfully",
                response,
                HttpStatus.OK
        );
    }
}
