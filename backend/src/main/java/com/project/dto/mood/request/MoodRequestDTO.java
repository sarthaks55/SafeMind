package com.project.dto.mood.request;

import com.project.enums.Mood;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MoodRequestDTO {
	
    private Mood mood;
    
    private String notes;

}
