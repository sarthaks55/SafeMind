package com.project.service;

import java.time.LocalDateTime;
import java.util.List;

import com.project.dto.AppointmentRequestDTO;
import com.project.dto.AppointmentResponseDTO;
import com.project.dto.AppointmentStatusUpdateDTO;
import com.project.enums.AppointmentStatus;

public interface AppointmentService {

    AppointmentResponseDTO bookAppointment(
            AppointmentRequestDTO dto,
            Long userId
    );

    void cancelAppointment(Long appointmentId, Long userId);

    List<AppointmentResponseDTO> getUserAppointments(Long userId);

    List<AppointmentResponseDTO> getProfessionalAppointments(Long professionalUserId);

    AppointmentResponseDTO updateAppointmentStatus(
            Long appointmentId,
            AppointmentStatusUpdateDTO dto,
            Long professionalUserId
    );
    
 // ===== ADMIN =====
    List<AppointmentResponseDTO> getAllAppointments();

    List<AppointmentResponseDTO> getAppointmentsByStatus(
            AppointmentStatus status);

    List<AppointmentResponseDTO> getAppointmentsByUser(Long userId);

    List<AppointmentResponseDTO> getAppointmentsByProfessional(
            Long professionalId);

    List<AppointmentResponseDTO> getAppointmentsBetweenDates(
            LocalDateTime start,
            LocalDateTime end);
}
