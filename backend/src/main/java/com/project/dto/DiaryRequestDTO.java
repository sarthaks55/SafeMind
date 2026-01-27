package com.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DiaryRequestDTO {

    @NotBlank
    private String text;
}
