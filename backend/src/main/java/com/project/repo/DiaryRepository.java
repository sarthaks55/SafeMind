package com.project.repo;

import com.project.entities.DiaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<DiaryEntry, Long> {

    List<DiaryEntry> findByUser_UserIdAndDeletedFalse(Long userId);

    Optional<DiaryEntry> findByDiaryIdAndUser_UserIdAndDeletedFalse(
            Long diaryId, Long userId);
}
