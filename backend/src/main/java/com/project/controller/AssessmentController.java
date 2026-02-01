package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.assessment.request.AssessmentSubmitRequestDTO;
import com.project.dto.assessment.response.AssessmentDetailDTO;
import com.project.dto.assessment.response.AssessmentListDTO;
import com.project.dto.assessment.response.AssessmentResultDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.service.AssessmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService service;

    /* ================= GET ALL ================= */

    @GetMapping
    public ResponseEntity<ApiResponse<List<AssessmentListDTO>>> getAll() {

        List<AssessmentListDTO> assessments =
                service.getAllAssessments();

        return ResponseBuilder.success(
                "Assessments fetched successfully",
                assessments,
                HttpStatus.OK
        );
    }

    /* ================= GET ONE ================= */

    @GetMapping("/{assessmentId}")
    public ResponseEntity<ApiResponse<AssessmentDetailDTO>> getAssessment(
            @PathVariable Long assessmentId) {

        AssessmentDetailDTO assessment =
                service.getAssessment(assessmentId);

        return ResponseBuilder.success(
                "Assessment fetched successfully",
                assessment,
                HttpStatus.OK
        );
    }

    /* ================= SUBMIT ================= */

    @PostMapping("/{assessmentId}/submit")
    public ResponseEntity<ApiResponse<AssessmentResultDTO>> submit(
            @PathVariable Long assessmentId,
            @RequestBody @Valid AssessmentSubmitRequestDTO request) {

        AssessmentResultDTO result =
                service.submitAssessment(assessmentId, request);

        return ResponseBuilder.success(
                "Assessment submitted successfully",
                result,
                HttpStatus.OK
        );
    }
}
