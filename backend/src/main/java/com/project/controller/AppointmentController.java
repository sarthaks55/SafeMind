package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.dto.AppointmentRequestDTO;
import com.project.dto.AppointmentResponseDTO;
import com.project.dto.AppointmentStatusUpdateDTO;
import com.project.security.CustomUserDetails;
import com.project.service.AppointmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /* ================= USER ================= */

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> book(
            @RequestBody @Valid AppointmentRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        AppointmentResponseDTO response =
                appointmentService.bookAppointment(
                        dto, user.getUserId());

        return ResponseEntity.status(201).body(response); // 201 CREATED
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> cancel(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        appointmentService.cancelAppointment(id, user.getUserId());

        return ResponseEntity.noContent().build(); // 204
    }

    @GetMapping("/user")
    public ResponseEntity<List<AppointmentResponseDTO>> userAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<AppointmentResponseDTO> appointments =
                appointmentService.getUserAppointments(user.getUserId());

        return ResponseEntity.ok(appointments); // 200
    }

    /* ================= PROFESSIONAL ================= */

    @GetMapping("/professional")
    public ResponseEntity<List<AppointmentResponseDTO>> professionalAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<AppointmentResponseDTO> appointments =
                appointmentService
                        .getProfessionalAppointments(user.getUserId());

        return ResponseEntity.ok(appointments); // 200
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestBody @Valid AppointmentStatusUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        AppointmentResponseDTO updated =
                appointmentService
                        .updateAppointmentStatus(
                                id, dto, user.getUserId());

        return ResponseEntity.ok(updated); // 200
    }
}
