package com.project.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.MoodAnalyticsResponseDTO;
import com.project.dto.MoodDailyStatsDTO;
import com.project.dto.MoodRequestDTO;
import com.project.dto.MoodResponseDTO;
import com.project.entities.MoodEntry;
import com.project.entities.User;
import com.project.exception.MoodAlreadyExistsException;
import com.project.exception.MoodNotFoundException;
import com.project.repo.MoodRepository;
import com.project.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MoodServiceImpl implements MoodService {

    private final MoodRepository moodRepo;
    private final UserRepository userRepo;

    @Override
    public MoodResponseDTO addTodayMood(
            MoodRequestDTO dto,
            Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDate today = LocalDate.now();

        if (moodRepo.findByUserAndEntryDate(user, today).isPresent()) {
            throw new MoodAlreadyExistsException(
                    "Mood already added for today");
        }

        MoodEntry mood = new MoodEntry();
        mood.setUser(user);
        mood.setMood(dto.getMood());
        mood.setNotes(dto.getNotes());
        mood.setEntryDate(today);

        moodRepo.save(mood);

        return mapToDTO(mood);
    }

    @Override
    public MoodResponseDTO updateTodayMood(
            MoodRequestDTO dto,
            Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MoodEntry mood = moodRepo.findByUserAndEntryDate(
                        user, LocalDate.now())
                .orElseThrow(() ->
                        new MoodNotFoundException(
                                "No mood found for today"));

        mood.setMood(dto.getMood());
        mood.setNotes(dto.getNotes());

        return mapToDTO(mood);
    }

    @Override
    public List<MoodResponseDTO> getUserMoods(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return moodRepo.findByUserOrderByEntryDateDesc(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private MoodResponseDTO mapToDTO(MoodEntry mood) {
        return MoodResponseDTO.builder()
                .moodId(mood.getMoodId())
                .mood(mood.getMood())
                .notes(mood.getNotes())
                .entryDate(mood.getEntryDate())
                .build();
    }
    
    
    
    
    
    
    
    /* ================= WEEKLY ================= */

    @Override
    public MoodAnalyticsResponseDTO getWeeklyAnalytics(
            Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(6);

        return buildAnalytics(
                moodRepo.findByUserAndEntryDateBetween(
                        user, start, end));
    }

    /* ================= MONTHLY ================= */

    @Override
    public MoodAnalyticsResponseDTO getMonthlyAnalytics(
            Long userId,
            int year,
            int month) {

        User user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        YearMonth ym = YearMonth.of(year, month);

        return buildAnalytics(
                moodRepo.findByUserAndEntryDateBetween(
                        user,
                        ym.atDay(1),
                        ym.atEndOfMonth()));
    }

    /* ================= COMMON BUILDER ================= */

    private MoodAnalyticsResponseDTO buildAnalytics(
            List<MoodEntry> entries) {

        if (entries.isEmpty()) {
            return MoodAnalyticsResponseDTO.builder()
                    .averageMood(0)
                    .totalEntries(0)
                    .dailyStats(List.of())
                    .moodDistribution(Map.of())
                    .build();
        }

        double avg = entries.stream()
                .mapToInt(e -> e.getMood().getScore())
                .average()
                .orElse(0);

        List<MoodDailyStatsDTO> dailyStats =
                entries.stream()
                        .map(e -> MoodDailyStatsDTO.builder()
                                .date(e.getEntryDate())
                                .moodScore(
                                        e.getMood().getScore())
                                .build())
                        .toList();

        Map<String, Long> distribution =
                entries.stream()
                        .collect(Collectors.groupingBy(
                                e -> e.getMood().name(),
                                Collectors.counting()));

        return MoodAnalyticsResponseDTO.builder()
                .averageMood(
                        Math.round(avg * 100.0) / 100.0)
                .totalEntries(entries.size())
                .dailyStats(dailyStats)
                .moodDistribution(distribution)
                .build();
    }

    
    
}
