package com.project.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.project.dto.AppointmentResponseDTO;
import com.project.enums.AppointmentStatus;
import com.project.service.AppointmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/appointments")
@RequiredArgsConstructor
public class AdminAppointmentController {

    private final AppointmentService appointmentService;

    /* ================= ALL ================= */

    @GetMapping
    public List<AppointmentResponseDTO> getAll() {
        return appointmentService.getAllAppointments();
    }

    /* ================= FILTERS ================= */

    @GetMapping("/status/{status}")
    public List<AppointmentResponseDTO> byStatus(
            @PathVariable AppointmentStatus status) {

        return appointmentService.getAppointmentsByStatus(status);
    }

    @GetMapping("/user/{userId}")
    public List<AppointmentResponseDTO> byUser(
            @PathVariable Long userId) {

        return appointmentService.getAppointmentsByUser(userId);
    }

    @GetMapping("/professional/{professionalId}")
    public List<AppointmentResponseDTO> byProfessional(
            @PathVariable Long professionalId) {

        return appointmentService
                .getAppointmentsByProfessional(professionalId);
    }

    @GetMapping("/between")
    public List<AppointmentResponseDTO> betweenDates(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime start,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime end) {

        return appointmentService
                .getAppointmentsBetweenDates(start, end);
    }
}
