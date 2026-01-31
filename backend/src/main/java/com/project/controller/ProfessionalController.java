package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalAppointmentStatusDTO;
import com.project.dto.ProfessionalAvailabilityDTO;
import com.project.dto.ProfessionalAvailabilityResponseDTO;
import com.project.dto.ProfessionalUpdateDTO;
import com.project.entities.Professional;
import com.project.security.CustomUserDetails;
import com.project.service.ProfessionalService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/professional")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;

    /* ================= PROFILE ================= */

    @PutMapping("/profile")
    public ResponseEntity<Professional> updateProfile(
            @RequestBody @Valid ProfessionalUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        Professional updated =
                professionalService.updateProfessionalProfile(
                        user.getUserId(), dto);

        return ResponseEntity.ok(updated); // 200 OK
    }

    /* ================= PASSWORD ================= */

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            @RequestBody @Valid PasswordUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updatePassword(
                user.getUserId(), dto);

        return ResponseEntity.noContent().build(); // 204 NO CONTENT
    }

    /* ================= APPOINTMENTS ================= */

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<Void> updateAppointmentStatus(
            @PathVariable Long id,
            @RequestBody @Valid ProfessionalAppointmentStatusDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.updateAppointmentStatus(
                user.getUserId(), id, dto);

        return ResponseEntity.noContent().build(); // 204 NO CONTENT
    }

    /* ================= AVAILABILITY ================= */

    @PostMapping("/availability")
    public ResponseEntity<ProfessionalAvailabilityResponseDTO> addAvailability(
            @RequestBody @Valid ProfessionalAvailabilityDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        ProfessionalAvailabilityResponseDTO response =
                professionalService.addAvailability(
                        user.getUserId(), dto);

        return ResponseEntity.status(201).body(response); // 201 CREATED
    }

    @GetMapping("/availability")
    public ResponseEntity<List<ProfessionalAvailabilityResponseDTO>> getAvailability(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<ProfessionalAvailabilityResponseDTO> response =
                professionalService.getMyAvailability(user.getUserId());

        return ResponseEntity.ok(response); // 200 OK
    }

//    @PutMapping("/availability/{id}")
//    public ResponseEntity<ProfessionalAvailabilityResponseDTO> updateAvailability(
//            @PathVariable Long id,
//            @RequestBody @Valid ProfessionalAvailabilityDTO dto,
//            Authentication auth) {
//
//        CustomUserDetails user =
//                (CustomUserDetails) auth.getPrincipal();
//
//        ProfessionalAvailabilityResponseDTO response =
//                professionalService.updateAvailability(
//                        user.getUserId(), id, dto);
//
//        return ResponseEntity.ok(response); // 200 OK
//    }

    @DeleteMapping("/availability/{id}")
    public ResponseEntity<Void> deleteAvailability(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        professionalService.deleteAvailability(
                user.getUserId(), id);

        return ResponseEntity.noContent().build(); // 204 NO CONTENT
    }
}
