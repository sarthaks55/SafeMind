package com.project.dto;

import java.util.List;

import lombok.Data;

@Data
public class AssessmentDetailDTO {
    private Long assessmentId;
    private String title;
    private String description;
    private List<AssessmentQuestionDTO> questions;
}

