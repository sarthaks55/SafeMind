package com.project.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.AssessmentDetailDTO;
import com.project.dto.AssessmentListDTO;
import com.project.dto.AssessmentResultDTO;
import com.project.dto.AssessmentSubmitRequestDTO;
import com.project.service.AssessmentService;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    private final AssessmentService service;

    public AssessmentController(AssessmentService service) {
        this.service = service;
    }

    @GetMapping
    public List<AssessmentListDTO> getAll() {
        return service.getAllAssessments();
    }

    @GetMapping("/{assessmentId}")
    public AssessmentDetailDTO getAssessment(
            @PathVariable Long assessmentId) {
        return service.getAssessment(assessmentId);
    }

    @PostMapping("/{assessmentId}/submit")
    public AssessmentResultDTO submit(
            @PathVariable Long assessmentId,
            @RequestBody AssessmentSubmitRequestDTO request) {
        return service.submitAssessment(assessmentId, request);
    }
}

