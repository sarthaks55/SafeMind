package com.project.dto;

import com.project.enums.AppointmentStatus;
import lombok.Data;

@Data
public class ProfessionalAppointmentStatusDTO {
    private AppointmentStatus status;
}
