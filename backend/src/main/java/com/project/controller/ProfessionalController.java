package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalAppointmentStatusDTO;
import com.project.dto.ProfessionalAvailabilityDTO;
import com.project.dto.ProfessionalAvailabilityResponseDTO;
import com.project.dto.ProfessionalUpdateDTO;
import com.project.entities.Professional;
import com.project.security.CustomUserDetails;
import com.project.service.ProfessionalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/professional")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;

    /* ================= PROFILE ================= */

    @PutMapping("/profile")
    public ResponseEntity<Professional> updateProfile(
            @RequestBody ProfessionalUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                professionalService
                        .updateProfessionalProfile(
                                user.getUserId(), dto));
    }
    
    
    /* ================= PASSWORD ================= */

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @RequestBody PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updatePassword(
                user.getUserId(), dto);

        return ResponseEntity.noContent().build();
    }

    

    /* ================= APPOINTMENTS ================= */

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<Void> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody ProfessionalAppointmentStatusDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updateAppointmentStatus(
                user.getUserId(), id, dto);

        return ResponseEntity.noContent().build();
    }
    
    
    
    
    /* ================= AVAILABILITY ================= */

    @PostMapping("/availability")
    public ResponseEntity<ProfessionalAvailabilityResponseDTO>
    addAvailability(
            @RequestBody ProfessionalAvailabilityDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                professionalService.addAvailability(
                        user.getUserId(), dto));
    }


    @GetMapping("/availability")
    public ResponseEntity<List<ProfessionalAvailabilityResponseDTO>>
    getAvailability(Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                professionalService.getMyAvailability(
                        user.getUserId()));
    }


    @PutMapping("/availability/{id}")
    public ResponseEntity<?> updateAvailability(
            @PathVariable Long id,
            @RequestBody ProfessionalAvailabilityDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                professionalService.updateAvailability(
                        user.getUserId(), id, dto));
    }

    @DeleteMapping("/availability/{id}")
    public ResponseEntity<Void> deleteAvailability(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.deleteAvailability(
                user.getUserId(), id);

        return ResponseEntity.noContent().build();
    }
    
    
    
}
