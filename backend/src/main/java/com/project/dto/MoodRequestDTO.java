package com.project.dto;

import com.project.enums.Mood;
import lombok.Data;

@Data
public class MoodRequestDTO {
    private Mood mood;
    private String notes;

}
