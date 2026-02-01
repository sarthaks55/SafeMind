package com.project.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.admin.request.AdminUpdateDTO;
import com.project.dto.admin.request.ProfessionalVerificationDTO;
import com.project.dto.admin.response.AdminProfessionalViewDTO;
import com.project.dto.admin.response.AdminUserViewDTO;
import com.project.dto.appointment.response.AppointmentResponseDTO;
import com.project.dto.user.request.PasswordUpdateDTO;
import com.project.dto.user.request.UserActivationDTO;
import com.project.dto.user.request.UserUpdateDTO;
import com.project.enums.AppointmentStatus;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.AdminService;
import com.project.service.AppointmentService;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AppointmentService appointmentService;
    private final AdminService adminService;
    private final UserService userService;

    /* ================= ADMIN SELF ================= */

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Object>> updateProfile(
            @RequestBody @Valid AdminUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        adminService.updateOwnProfile(user.getUserId(), dto);

        return ResponseBuilder.success(
                "Profile updated successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserUpdateDTO>> updateProfile(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        UserUpdateDTO profile =
                userService.getProfile(user.getUserId());

        return ResponseBuilder.success(
                "Profile found",
                profile,
                HttpStatus.OK
        );
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Object>> updatePassword(
            @RequestBody @Valid PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
        adminService.updatePassword(user.getUserId(), dto);

        return ResponseBuilder.success(
                "Password updated successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    /* ================= USERS ================= */

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<AdminUserViewDTO>>> getUsers() {

        List<AdminUserViewDTO> users = adminService.getAllUsers();

        return ResponseBuilder.success(
                "Users fetched successfully",
                users,
                HttpStatus.OK
        );
    }

    @PutMapping("/users/{id}/activation")
    public ResponseEntity<ApiResponse<Object>> updateUserStatus(
            @PathVariable Long id,
            @RequestBody @Valid UserActivationDTO dto) {

        adminService.updateUserActivation(id, dto.isActive());

        return ResponseBuilder.success(
                "User activation status updated",
                null,
                HttpStatus.OK
        );
    }

    /* ================= PROFESSIONALS ================= */

    @GetMapping("/professionals")
    public ResponseEntity<ApiResponse<List<AdminProfessionalViewDTO>>> getProfessionals() {

        List<AdminProfessionalViewDTO> professionals =
                adminService.getAllProfessionals();

        return ResponseBuilder.success(
                "Professionals fetched successfully",
                professionals,
                HttpStatus.OK
        );
    }

    @PutMapping("/professionals/{userId}/verification")
    public ResponseEntity<ApiResponse<Object>> updateVerification(
            @PathVariable Long userId,
            @RequestBody @Valid ProfessionalVerificationDTO dto) {

        adminService.updateProfessionalVerification(
                userId,
                dto.isVerified()
        );

        return ResponseBuilder.success(
                "Professional verification updated",
                null,
                HttpStatus.OK
        );
    }

    /* ================= APPOINTMENTS ================= */

    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> getAll() {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAllAppointments();

        return ResponseBuilder.success(
                "Appointments fetched successfully",
                appointments,
                HttpStatus.OK
        );
    }

    @GetMapping("/appointments/status/{status}")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> byStatus(
            @PathVariable AppointmentStatus status) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsByStatus(status);

        return ResponseBuilder.success(
                "Appointments fetched by status",
                appointments,
                HttpStatus.OK
        );
    }

    @GetMapping("/appointments/user/{userId}")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> byUser(
            @PathVariable Long userId) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsByUser(userId);

        return ResponseBuilder.success(
                "Appointments fetched by user",
                appointments,
                HttpStatus.OK
        );
    }

    @GetMapping("/appointments/professional/{professionalId}")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> byProfessional(
            @PathVariable Long professionalId) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsByProfessional(professionalId);

        return ResponseBuilder.success(
                "Appointments fetched by professional",
                appointments,
                HttpStatus.OK
        );
    }

    @GetMapping("/appointments/between")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> betweenDates(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        List<AppointmentResponseDTO> appointments =
                appointmentService.getAppointmentsBetweenDates(start, end);

        return ResponseBuilder.success(
                "Appointments fetched between dates",
                appointments,
                HttpStatus.OK
        );
    }
}
