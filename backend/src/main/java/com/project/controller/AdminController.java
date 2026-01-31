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
    public ResponseEntity<Void> updateProfile(
            @RequestBody @Valid AdminUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        adminService.updateOwnProfile(user.getUserId(), dto);

        return ResponseEntity.noContent().build(); // 204
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @RequestBody @Valid PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        adminService.updatePassword(user.getUserId(), dto);

        return ResponseEntity.noContent().build(); // 204
    }

    // -------- Users --------

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserViewDTO>> getUsers() {
        List<AdminUserViewDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users); // 200
    }

    @PutMapping("/users/{id}/activation")
    public ResponseEntity<Void> updateUserStatus(
            @PathVariable Long id,
            @RequestBody @Valid UserActivationDTO dto) {

        adminService.updateUserActivation(id, dto.isActive());
        return ResponseEntity.noContent().build(); // 204
    }

    // -------- Professionals --------

    @GetMapping("/professionals")
    public ResponseEntity<List<AdminProfessionalViewDTO>> getProfessionals() {
        List<AdminProfessionalViewDTO> professionals = adminService.getAllProfessionals();
        return ResponseEntity.ok(professionals); // 200
    }

    @PutMapping("/professionals/{userId}/verification")
    public ResponseEntity<Void> updateVerification(
            @PathVariable Long userId,
            @RequestBody @Valid ProfessionalVerificationDTO dto) {

        adminService.updateProfessionalVerification(userId, dto.isVerified());
        return ResponseEntity.noContent().build(); // 204
    }

    /* ================= ALL ================= */

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponseDTO>> getAll() {
        List<AppointmentResponseDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments); // 200
    }

    /* ================= FILTERS ================= */

    @GetMapping("/appointments/status/{status}")
    public ResponseEntity<List<AppointmentResponseDTO>> byStatus(
            @PathVariable AppointmentStatus status) {

        List<AppointmentResponseDTO> appointments = appointmentService.getAppointmentsByStatus(status);
        return ResponseEntity.ok(appointments); // 200
    }

    @GetMapping("/appointments/user/{userId}")
    public ResponseEntity<List<AppointmentResponseDTO>> byUser(
            @PathVariable Long userId) {

        List<AppointmentResponseDTO> appointments = appointmentService.getAppointmentsByUser(userId);
        return ResponseEntity.ok(appointments); // 200
    }

    @GetMapping("/appointments/professional/{professionalId}")
    public ResponseEntity<List<AppointmentResponseDTO>> byProfessional(
            @PathVariable Long professionalId) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsByProfessional(professionalId);

        return ResponseEntity.ok(appointments); // 200
    }

    @GetMapping("/appointments/between")
    public ResponseEntity<List<AppointmentResponseDTO>> betweenDates(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsBetweenDates(start, end);

        return ResponseEntity.ok(appointments); // 200
    }
}
