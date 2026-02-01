package com.project.dto.diary.response;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DiaryResponseDTO {

    private Long diaryId;
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
