package com.project.dto.appointment.request;

import com.project.enums.AppointmentStatus;
import lombok.Data;

@Data
public class AppointmentStatusUpdateDTO {
    private AppointmentStatus status;
}
