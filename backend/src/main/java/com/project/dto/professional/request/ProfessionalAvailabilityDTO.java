package com.project.dto.professional.request;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.enums.DayOfWeekEnum;

import lombok.Data;

@Data
public class ProfessionalAvailabilityDTO {

    private DayOfWeekEnum dayOfWeek;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime startTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime endTime;
}