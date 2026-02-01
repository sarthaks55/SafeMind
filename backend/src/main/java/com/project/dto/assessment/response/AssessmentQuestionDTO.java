package com.project.dto.assessment.response;

import java.util.List;

import lombok.Data;

@Data
public class AssessmentQuestionDTO {
    private Long questionId;
    private String questionText;
    private List<AssessmentOptionDTO> options;
}
