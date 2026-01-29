package com.project.service;

import java.util.List;

import com.project.dto.AdminProfessionalViewDTO;
import com.project.dto.AdminUpdateDTO;
import com.project.dto.AdminUserViewDTO;
import com.project.dto.PasswordUpdateDTO;

public interface AdminService {

    void updateOwnProfile(Long adminId, AdminUpdateDTO dto);
    
    void updatePassword(Long userId,PasswordUpdateDTO dto);

    List<AdminUserViewDTO> getAllUsers();

    void updateUserActivation(Long userId, boolean isActive);

    List<AdminProfessionalViewDTO> getAllProfessionals();

    void updateProfessionalVerification(Long userId, boolean isVerified);
}
