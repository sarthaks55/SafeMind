package com.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Assessment;

public interface AssessmentRepository
extends JpaRepository<Assessment, Long> {}

