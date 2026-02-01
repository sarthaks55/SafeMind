package com.project.dto.assessment.response;

import java.util.List;

import lombok.Data;

@Data
public class AssessmentResultDTO {

    private Double averageScore;
    private String resultTitle;
    private String suggestion;
    private String disclaimer =
        "This assessment is not a medical diagnosis.";
}

