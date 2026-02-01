package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.user.request.PasswordUpdateDTO;
import com.project.dto.user.request.UserUpdateDTO;
import com.project.dto.user.response.ProfessionalViewDTO;
import com.project.entities.User;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* ================= PROFILE ================= */

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(
            @RequestBody @Valid UserUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        User updated =
                userService.updateProfile(user.getUserId(), dto);

        return ResponseBuilder.success(
                "Profile updated successfully",
                null,
                HttpStatus.OK
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

    /* ================= PASSWORD ================= */

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Object>> updatePassword(
            @RequestBody @Valid PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        userService.updatePassword(user.getUserId(), dto);

        return ResponseBuilder.success(
                "Password updated successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    /* ================= APPOINTMENT ================= */

    @PutMapping("/appointments/{id}/cancel")
    public ResponseEntity<ApiResponse<Object>> cancelAppointment(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        userService.cancelConfirmedAppointment(
                id, user.getUserId());

        return ResponseBuilder.success(
                "Appointment cancelled successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    /* ================= PROFESSIONALS ================= */

    @GetMapping("/professionals")
    public ResponseEntity<ApiResponse<List<ProfessionalViewDTO>>> getProfessionals() {

        List<ProfessionalViewDTO> professionals =
                userService.getAllProfessionals();

        return ResponseBuilder.success(
                "Professionals fetched successfully",
                professionals,
                HttpStatus.OK
        );
    }
}
