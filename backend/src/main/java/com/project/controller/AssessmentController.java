package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.dto.AssessmentDetailDTO;
import com.project.dto.AssessmentListDTO;
import com.project.dto.AssessmentResultDTO;
import com.project.dto.AssessmentSubmitRequestDTO;
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
    public ResponseEntity<List<AssessmentListDTO>> getAll() {
        List<AssessmentListDTO> assessments = service.getAllAssessments();
        return ResponseEntity.ok(assessments); // 200
    }

    /* ================= GET ONE ================= */

    @GetMapping("/{assessmentId}")
    public ResponseEntity<AssessmentDetailDTO> getAssessment(
            @PathVariable Long assessmentId) {

        AssessmentDetailDTO assessment =
                service.getAssessment(assessmentId);

        return ResponseEntity.ok(assessment); // 200
    }

    /* ================= SUBMIT ================= */

    @PostMapping("/{assessmentId}/submit")
    public ResponseEntity<AssessmentResultDTO> submit(
            @PathVariable Long assessmentId,
            @RequestBody @Valid AssessmentSubmitRequestDTO request) {

        AssessmentResultDTO result =
                service.submitAssessment(assessmentId, request);

        return ResponseEntity.ok(result); // 200
    }
}
