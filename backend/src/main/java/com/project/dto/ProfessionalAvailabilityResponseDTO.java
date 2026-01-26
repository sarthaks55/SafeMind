package com.project.dto;

import java.time.LocalTime;

import com.project.enums.DayOfWeekEnum;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfessionalAvailabilityResponseDTO {

    private Long availabilityId;
    private DayOfWeekEnum dayOfWeek;
    private LocalTime startTime;
    private LocalTime endTime;
}
