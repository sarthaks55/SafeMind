package com.project.repo;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.ProfessionalAvailability;
import com.project.enums.DayOfWeekEnum;

public interface ProfessionalAvailabilityRepository
        extends JpaRepository<ProfessionalAvailability, Long> {

    List<ProfessionalAvailability> findByProfessional_ProfessionalId(
            Long professionalId);

    boolean existsByProfessional_ProfessionalIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
            Long professionalId,
            DayOfWeekEnum dayOfWeek,
            LocalTime endTime,
            LocalTime startTime
    );
    
    List<ProfessionalAvailability>
    findByProfessional_ProfessionalIdAndDayOfWeek(
            Long professionalId,
            DayOfWeekEnum dayOfWeek);

}
