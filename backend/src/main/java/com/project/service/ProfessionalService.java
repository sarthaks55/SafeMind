package com.project.service;

import java.util.List;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalAppointmentStatusDTO;
import com.project.dto.ProfessionalAvailabilityDTO;
import com.project.dto.ProfessionalAvailabilityResponseDTO;
import com.project.dto.ProfessionalUpdateDTO;
import com.project.entities.Professional;
import com.project.entities.ProfessionalAvailability;

public interface ProfessionalService {

    Professional updateProfessionalProfile(
            Long userId,
            ProfessionalUpdateDTO dto
    );
    
    
    void updatePassword(
            Long userId,
            PasswordUpdateDTO dto
    );

    void updateAppointmentStatus(
            Long professionalId,
            Long appointmentId,
            ProfessionalAppointmentStatusDTO dto
    );
    
    
    
    ProfessionalAvailabilityResponseDTO addAvailability(
            Long userId,
            ProfessionalAvailabilityDTO dto);

    List<ProfessionalAvailabilityResponseDTO> getMyAvailability(
            Long userId);

    ProfessionalAvailability updateAvailability(
            Long professionalId,
            Long availabilityId,
            ProfessionalAvailabilityDTO dto);

    void deleteAvailability(
            Long professionalId,
            Long availabilityId);

}
