package com.project.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.entities.Appointment;
import com.project.entities.Professional;
import com.project.entities.User;
import com.project.enums.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    boolean existsByProfessionalAndStartTime(
            Professional professional,
            LocalDateTime startTime
    );

    List<Appointment> findByUser(User user);

    List<Appointment> findByProfessional(Professional professional);
    
    List<Appointment> findByStatus(AppointmentStatus status);

    List<Appointment> findByStartTimeBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    List<Appointment> findByUser_UserId(Long userId);

    List<Appointment> findByProfessional_ProfessionalId(Long professionalId);
}
