package com.project.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.MoodEntry;
import com.project.entities.User;

public interface MoodRepository extends JpaRepository<MoodEntry, Long> {

    Optional<MoodEntry> findByUserAndEntryDate(
            User user,
            LocalDate entryDate
    );

    List<MoodEntry> findByUserOrderByEntryDateDesc(User user);
    
    List<MoodEntry> findByUserAndEntryDateBetween(
            User user,
            LocalDate start,
            LocalDate end
    );
}