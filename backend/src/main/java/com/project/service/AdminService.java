package com.project.service;

import java.util.List;

import com.project.dto.admin.request.AdminUpdateDTO;
import com.project.dto.admin.response.AdminProfessionalViewDTO;
import com.project.dto.admin.response.AdminUserViewDTO;
import com.project.dto.user.request.PasswordUpdateDTO;

public interface AdminService {

    void updateOwnProfile(Long adminId, AdminUpdateDTO dto);
    
    void updatePassword(Long userId,PasswordUpdateDTO dto);

    List<AdminUserViewDTO> getAllUsers();

    void updateUserActivation(Long userId, boolean isActive);

    List<AdminProfessionalViewDTO> getAllProfessionals();

    void updateProfessionalVerification(Long userId, boolean isVerified);
}
