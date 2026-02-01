package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.appointment.request.ProfessionalAppointmentStatusDTO;
import com.project.dto.professional.request.ProfessionalAvailabilityDTO;
import com.project.dto.professional.request.ProfessionalUpdateDTO;
import com.project.dto.professional.response.ProfessionalAvailabilityResponseDTO;
import com.project.dto.user.request.PasswordUpdateDTO;
import com.project.entities.Professional;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.ProfessionalService;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/professional")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;
    private final UserService userService;

    /* ================= PROFILE ================= */

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Professional>> updateProfile(
            @RequestBody @Valid ProfessionalUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        Professional updated =
                professionalService.updateProfessionalProfile(
                        user.getUserId(), dto);

        return ResponseBuilder.success(
                "Profile updated successfully",
                updated,
                HttpStatus.OK
        );
    }
    
    /* ================= PROFILE (GET) ================= */

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<ProfessionalUpdateDTO>> getProfile(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();
        
        

        ProfessionalUpdateDTO profile =
                professionalService.getProfessionalProfile(
                        user.getUserId());

        return ResponseBuilder.success(
                "Profile fetched successfully",
                profile,
                HttpStatus.OK
        );
    }


    /* ================= PASSWORD ================= */

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Object>> updatePassword(
            @RequestBody @Valid PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updatePassword(
                user.getUserId(), dto);

        return ResponseBuilder.success(
                "Password updated successfully",
                null,
                HttpStatus.OK
        );
    }

    /* ================= APPOINTMENTS ================= */

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<ApiResponse<Object>> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody @Valid ProfessionalAppointmentStatusDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updateAppointmentStatus(
                user.getUserId(), id, dto);

        return ResponseBuilder.success(
                "Appointment status updated successfully",
                null,
                HttpStatus.OK
        );
    }

    /* ================= AVAILABILITY ================= */

    @PostMapping("/availability")
    public ResponseEntity<ApiResponse<ProfessionalAvailabilityResponseDTO>> addAvailability(
            @RequestBody @Valid ProfessionalAvailabilityDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        ProfessionalAvailabilityResponseDTO response =
                professionalService.addAvailability(
                        user.getUserId(), dto);

        return ResponseBuilder.success(
                "Availability added successfully",
                response,
                HttpStatus.CREATED
        );
    }

    @GetMapping("/availability")
    public ResponseEntity<ApiResponse<List<ProfessionalAvailabilityResponseDTO>>> getAvailability(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<ProfessionalAvailabilityResponseDTO> response =
                professionalService.getMyAvailability(
                        user.getUserId());

        return ResponseBuilder.success(
                "Availability fetched successfully",
                response,
                HttpStatus.OK
        );
    }

    @DeleteMapping("/availability/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteAvailability(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.deleteAvailability(
                user.getUserId(), id);

        return ResponseBuilder.success(
                "Availability deleted successfully",
                null,
                HttpStatus.OK
        );
    }
}
