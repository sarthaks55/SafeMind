package com.project.dto.mood.response;

import java.time.LocalDate;

import com.project.enums.Mood;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoodResponseDTO {
    private Long moodId;
    private Mood mood;
    private String notes;
    private LocalDate entryDate;

}

