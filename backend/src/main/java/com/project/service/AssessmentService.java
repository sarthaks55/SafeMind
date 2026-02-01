package com.project.service;

import java.util.List;

import com.project.dto.assessment.request.AssessmentSubmitRequestDTO;
import com.project.dto.assessment.response.AssessmentDetailDTO;
import com.project.dto.assessment.response.AssessmentListDTO;
import com.project.dto.assessment.response.AssessmentResultDTO;

public interface AssessmentService {

    List<AssessmentListDTO> getAllAssessments();

    AssessmentDetailDTO getAssessment(Long assessmentId);

    AssessmentResultDTO submitAssessment(
            Long assessmentId,
            AssessmentSubmitRequestDTO request);
}

