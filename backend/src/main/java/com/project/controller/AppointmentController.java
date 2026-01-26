package com.project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.dto.*;
import com.project.security.CustomUserDetails;
import com.project.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /* ================= USER ================= */

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> book(
            @RequestBody AppointmentRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return ResponseEntity.ok(
                appointmentService.bookAppointment(
                        dto, user.getUserId()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancel(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        appointmentService.cancelAppointment(id, user.getUserId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user")
    public List<AppointmentResponseDTO> userAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return appointmentService.getUserAppointments(user.getUserId());
    }

    /* ================= PROFESSIONAL ================= */

    @GetMapping("/professional")
    public List<AppointmentResponseDTO> professionalAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return appointmentService
                .getProfessionalAppointments(user.getUserId());
    }

    @PutMapping("/{id}/status")
    public AppointmentResponseDTO updateStatus(
            @PathVariable Long id,
            @RequestBody AppointmentStatusUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        return appointmentService
                .updateAppointmentStatus(id, dto, user.getUserId());
    }
}
