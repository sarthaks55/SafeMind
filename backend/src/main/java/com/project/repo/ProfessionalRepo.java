package com.project.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Professional;

public interface ProfessionalRepo extends JpaRepository<Professional, Long>{
	
	

}
