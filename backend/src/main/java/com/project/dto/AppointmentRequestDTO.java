package com.project.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AppointmentRequestDTO {
    private Long professionalId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
