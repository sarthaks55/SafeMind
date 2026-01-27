package com.project.repo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.entities.Appointment;
import com.project.entities.Professional;
import com.project.entities.User;
import com.project.enums.AppointmentStatus;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	@Query("""
			SELECT COUNT(a) > 0 FROM Appointment a
			WHERE a.professional = :professional
			AND a.status IN ('PENDING','CONFIRMED')
			AND (
			    (:start < a.endTime AND :end > a.startTime)
			)
			""")
			boolean existsOverlappingAppointment(
			        @Param("professional") Professional professional,
			        @Param("start") LocalDateTime start,
			        @Param("end") LocalDateTime end);



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
