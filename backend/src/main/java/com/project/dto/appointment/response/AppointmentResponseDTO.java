package com.project.dto.appointment.response;

import java.time.LocalDateTime;

import com.project.enums.AppointmentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;



@Data
@AllArgsConstructor
public class AppointmentResponseDTO {
    public AppointmentResponseDTO() {
	}
	private Long appointmentId;
    private Long userId;
    private String professionalName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private AppointmentStatus status;
}

