package com.project.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.AssessmentQuestion;

public interface AssessmentQuestionRepository
extends JpaRepository<AssessmentQuestion, Long> {

List<AssessmentQuestion> findByAssessment_AssessmentIdOrderByOrderIndex(Long assessmentId);
}

