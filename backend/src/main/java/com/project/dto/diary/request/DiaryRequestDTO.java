package com.project.dto.diary.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DiaryRequestDTO {

    @NotBlank
    private String text;
}
