package com.project.repo;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Professional;
import com.project.entities.ProfessionalAvailability;
import com.project.enums.DayOfWeekEnum;

public interface ProfessionalRepo extends JpaRepository<Professional, Long>{
	
	Optional<Professional> findByUser_UserId(Long userId);
	


}
