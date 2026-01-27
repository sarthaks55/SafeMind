package com.project.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.dto.AdminProfessionalViewDTO;
import com.project.dto.AdminUpdateDTO;
import com.project.dto.AdminUserViewDTO;
import com.project.entities.Professional;
import com.project.entities.User;
import com.project.exception.AdminNotFoundException;
import com.project.exception.InvalidRoleOperationException;
import com.project.repo.ProfessionalRepo;
import com.project.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepo;
    private final ProfessionalRepo professionalRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void updateOwnProfile(Long adminId, AdminUpdateDTO dto) {

        User admin = userRepo.findById(adminId)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found"));

        if (!admin.getRole().getRoleName().equals("ROLE_ADMIN")) {
            throw new InvalidRoleOperationException("Not an admin");
        }

        if (dto.getFullName() != null) admin.setFullName(dto.getFullName());
        if (dto.getEmail() != null) admin.setEmail(dto.getEmail());
        if (dto.getPhone() != null) admin.setPhone(dto.getPhone());
        if (dto.getGender() != null) admin.setGender(dto.getGender());

        if (dto.getPassword() != null) {
            admin.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        userRepo.save(admin);
    }

    @Override
    public List<AdminUserViewDTO> getAllUsers() {

        return userRepo.findByRole_RoleName("ROLE_USER")
                .stream()
                .map(this::mapUser)
                .toList();
    }

    @Override
    public void updateUserActivation(Long userId, boolean isActive) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().getRoleName().equals("ROLE_USER")) {
            throw new InvalidRoleOperationException("Not a USER");
        }

        user.setActive(isActive);
        userRepo.save(user);
    }

    @Override
    public List<AdminProfessionalViewDTO> getAllProfessionals() {

        return professionalRepo.findAllProfessionalsWithUser()
                .stream()
                .map(this::mapProfessional)
                .toList();
    }

    @Override
    public void updateProfessionalVerification(Long userId, boolean isVerified) {

        Professional professional = professionalRepo
                .findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        professional.setVerified(isVerified);
        professionalRepo.save(professional);
    }

    private AdminUserViewDTO mapUser(User u) {
        AdminUserViewDTO dto = new AdminUserViewDTO();
        dto.setUserId(u.getUserId());
        dto.setFullName(u.getFullName());
        dto.setEmail(u.getEmail());
        dto.setPhone(u.getPhone());
        dto.setGender(u.getGender());
        dto.setActive(u.isActive());
        return dto;
    }

    private AdminProfessionalViewDTO mapProfessional(Professional p) {
        AdminProfessionalViewDTO dto = new AdminProfessionalViewDTO();
        dto.setProfessionalId(p.getProfessionalId());
        dto.setUserId(p.getUser().getUserId());
        dto.setFullName(p.getUser().getFullName());
        dto.setEmail(p.getUser().getEmail());
        dto.setVerified(p.isVerified());
        return dto;
    }
}
