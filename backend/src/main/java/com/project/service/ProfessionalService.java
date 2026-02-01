package com.project.service;

import java.util.List;

import com.project.dto.appointment.request.ProfessionalAppointmentStatusDTO;
import com.project.dto.professional.request.ProfessionalAvailabilityDTO;
import com.project.dto.professional.request.ProfessionalUpdateDTO;
import com.project.dto.professional.response.ProfessionalAvailabilityResponseDTO;
import com.project.dto.user.request.PasswordUpdateDTO;
import com.project.entities.Professional;

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

//    ProfessionalAvailability updateAvailability(
//            Long professionalId,
//            Long availabilityId,
//            ProfessionalAvailabilityDTO dto);

    void deleteAvailability(
            Long professionalId,
            Long availabilityId);




	ProfessionalUpdateDTO getProfessionalProfile(Long userId);

}
