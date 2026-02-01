package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.appointment.request.AppointmentRequestDTO;
import com.project.dto.appointment.request.AppointmentStatusUpdateDTO;
import com.project.dto.appointment.response.AppointmentResponseDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
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
    public ResponseEntity<ApiResponse<AppointmentResponseDTO>> book(
            @RequestBody @Valid AppointmentRequestDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        AppointmentResponseDTO response =
                appointmentService.bookAppointment(
                        dto, user.getUserId());

        return ResponseBuilder.success(
                "Appointment booked successfully",
                response,
                HttpStatus.CREATED
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> cancel(
            @PathVariable Long id,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        appointmentService.cancelAppointment(
                id, user.getUserId());

        return ResponseBuilder.success(
                "Appointment cancelled successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/user")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> userAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<AppointmentResponseDTO> appointments =
                appointmentService.getUserAppointments(
                        user.getUserId());

        return ResponseBuilder.success(
                "User appointments fetched successfully",
                appointments,
                HttpStatus.OK
        );
    }

    /* ================= PROFESSIONAL ================= */

    @GetMapping("/professional")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> professionalAppointments(
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        List<AppointmentResponseDTO> appointments =
                appointmentService.getProfessionalAppointments(
                        user.getUserId());

        return ResponseBuilder.success(
                "Professional appointments fetched successfully",
                appointments,
                HttpStatus.OK
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponseDTO>> updateStatus(
            @PathVariable Long id,
            @RequestBody @Valid AppointmentStatusUpdateDTO dto,
            Authentication auth) {

        CustomUserDetails user =
                (CustomUserDetails) auth.getPrincipal();

        AppointmentResponseDTO updated =
                appointmentService.updateAppointmentStatus(
                        id, dto, user.getUserId());

        return ResponseBuilder.success(
                "Appointment status updated successfully",
                updated,
                HttpStatus.OK
        );
    }
}
