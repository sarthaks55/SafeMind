package com.project.dto;

import java.time.LocalDateTime;

import com.project.enums.AppointmentStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AppointmentResponseDTO {
    private Long appointmentId;
    private Long userId;
    private Long professionalId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AppointmentStatus status;
}
