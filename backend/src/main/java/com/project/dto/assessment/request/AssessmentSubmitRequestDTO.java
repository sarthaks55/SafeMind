package com.project.dto.assessment.request;

import java.util.List;

import lombok.Data;

@Data
public class AssessmentSubmitRequestDTO {

    private List<AnswerDTO> answers;

    @Data
    public static class AnswerDTO {
        private Long questionId;
        private Integer value;
    }
}

