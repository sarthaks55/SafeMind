package com.project.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.AdminProfessionalViewDTO;
import com.project.dto.AdminUpdateDTO;
import com.project.dto.AdminUserViewDTO;
import com.project.dto.AppointmentResponseDTO;
import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalVerificationDTO;
import com.project.dto.UserActivationDTO;
import com.project.enums.AppointmentStatus;
import com.project.security.CustomUserDetails;
import com.project.service.AdminService;
import com.project.service.AppointmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AppointmentService appointmentService;

    
    
    private final AdminService adminService;


    // -------- Admin Self --------
    @PutMapping("/profile")
    public void updateProfile(@RequestBody @Valid AdminUpdateDTO dto,Authentication auth) {
    	CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        adminService.updateOwnProfile(user.getUserId(), dto);
    }
    
    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @RequestBody PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        adminService.updatePassword(
                user.getUserId(), dto);

        return ResponseEntity.noContent().build();
    }

    // -------- Users --------
    @GetMapping("/users")
    public List<AdminUserViewDTO> getUsers() {
        return adminService.getAllUsers();
    }

    @PutMapping("/users/{id}/activation")
    public void updateUserStatus(
            @PathVariable Long id,
            @RequestBody UserActivationDTO dto) {
        adminService.updateUserActivation(id, dto.isActive());
    }

    // -------- Professionals --------
    @GetMapping("/professionals")
    public List<AdminProfessionalViewDTO> getProfessionals() {
        return adminService.getAllProfessionals();
    }

    @PutMapping("/professionals/{userId}/verification")
    public void updateVerification(
            @PathVariable Long userId,
            @RequestBody ProfessionalVerificationDTO dto) {
        adminService.updateProfessionalVerification(userId, dto.isVerified());
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* ================= ALL ================= */

    @GetMapping("/appointments")
    public List<AppointmentResponseDTO> getAll() {
        return appointmentService.getAllAppointments();
    }

    /* ================= FILTERS ================= */

    @GetMapping("/appointments/status/{status}")
    public List<AppointmentResponseDTO> byStatus(
            @PathVariable AppointmentStatus status) {

        return appointmentService.getAppointmentsByStatus(status);
    }

    @GetMapping("/appointments/user/{userId}")
    public List<AppointmentResponseDTO> byUser(
            @PathVariable Long userId) {

        return appointmentService.getAppointmentsByUser(userId);
    }

    @GetMapping("/appointments/professional/{professionalId}")
    public List<AppointmentResponseDTO> byProfessional(
            @PathVariable Long professionalId) {

        return appointmentService
                .getAppointmentsByProfessional(professionalId);
    }

    @GetMapping("/appointments/between")
    public List<AppointmentResponseDTO> betweenDates(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return appointmentService
                .getAppointmentsBetweenDates(start, end);
    }
}
