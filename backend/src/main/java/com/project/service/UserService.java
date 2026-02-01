package com.project.service;

import java.util.List;

import com.project.dto.auth.request.RegisterDTO;
import com.project.dto.auth.request.RegisterProfessionalDTO;
import com.project.dto.user.request.PasswordUpdateDTO;
import com.project.dto.user.request.UserUpdateDTO;
import com.project.dto.user.response.ProfessionalViewDTO;
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

	UserUpdateDTO getProfile(Long userId);

	
}
