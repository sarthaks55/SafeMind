package com.project.dto.assessment.response;

import java.util.List;

import lombok.Data;

@Data
public class AssessmentOptionDTO {
    private Long optionId;
    private String optionText;
    private Integer optionValue;
}

