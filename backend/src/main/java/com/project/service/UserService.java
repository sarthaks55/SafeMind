package com.project.service;

import java.util.List;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalViewDTO;
import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.dto.UserUpdateDTO;
import com.project.entities.Professional;
import com.project.entities.User;


public interface UserService {

	User updateProfile(
            Long userId,
            UserUpdateDTO dto
    );

    void updatePassword(
            Long userId,
            PasswordUpdateDTO dto
    );

    void cancelConfirmedAppointment(
            Long appointmentId,
            Long userId
    );
	
	User registerUser(RegisterDTO dto);

	Professional registerProfessional(RegisterProfessionalDTO registerProfessionalDTO);
	
    List<ProfessionalViewDTO> getAllProfessionals();

	
}
