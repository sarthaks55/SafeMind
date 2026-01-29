package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalViewDTO;
import com.project.dto.UserUpdateDTO;
import com.project.entities.User;
import com.project.security.CustomUserDetails;
import com.project.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /* ================= PROFILE ================= */

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(
            @RequestBody UserUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                userService.updateProfile(
                        user.getUserId(), dto));
    }

    /* ================= PASSWORD ================= */

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @RequestBody PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        userService.updatePassword(
                user.getUserId(), dto);

        return ResponseEntity.noContent().build();
    }

    /* ================= APPOINTMENT ================= */

    @PutMapping("/appointments/{id}/cancel")
    public ResponseEntity<Void> cancelAppointment(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        userService.cancelConfirmedAppointment(
                id, user.getUserId());

        return ResponseEntity.noContent().build();
    }
    
    
    @GetMapping("/professionals")
    public List<ProfessionalViewDTO> getProfessionals() {
        return userService.getAllProfessionals();
    }
    
}
