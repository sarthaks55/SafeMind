package com.project.service;

import java.util.List;

import com.project.dto.AssessmentDetailDTO;
import com.project.dto.AssessmentListDTO;
import com.project.dto.AssessmentResultDTO;
import com.project.dto.AssessmentSubmitRequestDTO;

public interface AssessmentService {

    List<AssessmentListDTO> getAllAssessments();

    AssessmentDetailDTO getAssessment(Long assessmentId);

    AssessmentResultDTO submitAssessment(
            Long assessmentId,
            AssessmentSubmitRequestDTO request);
}

