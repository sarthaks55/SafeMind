package com.project.dto;

import com.project.enums.AppointmentStatus;
import lombok.Data;

@Data
public class AppointmentStatusUpdateDTO {
    private AppointmentStatus status;
}
