package com.project.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.AssessmentResultRange;

public interface AssessmentResultRangeRepository
extends JpaRepository<AssessmentResultRange, Long> {

List<AssessmentResultRange> findByAssessment_AssessmentId(Long assessmentId);
}

