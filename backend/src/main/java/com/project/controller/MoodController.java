package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.dto.MoodAnalyticsResponseDTO;
import com.project.dto.MoodRequestDTO;
import com.project.dto.MoodResponseDTO;
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
    public ResponseEntity<MoodResponseDTO> addMood(
            @RequestBody @Valid MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodResponseDTO response =
                moodService.addTodayMood(dto, user.getUserId());

        return ResponseEntity.status(201).body(response); // 201 CREATED
    }

    /* ================= UPDATE MOOD ================= */

    @PutMapping
    public ResponseEntity<MoodResponseDTO> updateMood(
            @RequestBody @Valid MoodRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodResponseDTO response =
                moodService.updateTodayMood(dto, user.getUserId());

        return ResponseEntity.ok(response); // 200 OK
    }

    /* ================= GET MY MOODS ================= */

    @GetMapping
    public ResponseEntity<List<MoodResponseDTO>> getMyMoods(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<MoodResponseDTO> moods =
                moodService.getUserMoods(user.getUserId());

        return ResponseEntity.ok(moods); // 200 OK
    }

    /* ================= WEEKLY ANALYTICS ================= */

    @GetMapping("/weekly")
    public ResponseEntity<MoodAnalyticsResponseDTO> weekly(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodAnalyticsResponseDTO response =
                moodService.getWeeklyAnalytics(user.getUserId());

        return ResponseEntity.ok(response); // 200 OK
    }

    /* ================= MONTHLY ANALYTICS ================= */

    @GetMapping("/monthly")
    public ResponseEntity<MoodAnalyticsResponseDTO> monthly(
            @RequestParam int year,
            @RequestParam int month,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        MoodAnalyticsResponseDTO response =
                moodService.getMonthlyAnalytics(user.getUserId(), year, month);

        return ResponseEntity.ok(response); // 200 OK
    }
}
