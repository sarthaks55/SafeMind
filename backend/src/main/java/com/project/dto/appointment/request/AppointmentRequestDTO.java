package com.project.dto.appointment.request;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AppointmentRequestDTO {
    private Long professionalId;
    @NotNull
    private LocalDateTime startTime;
}
