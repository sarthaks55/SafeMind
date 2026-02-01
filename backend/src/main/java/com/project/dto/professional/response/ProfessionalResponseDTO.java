package com.project.dto.professional.response;

import java.math.BigDecimal;

import com.project.enums.Gender;
import com.project.enums.Specialization;
import com.project.enums.SpokenLanguage;

import lombok.Data;

@Data
public class ProfessionalResponseDTO {

	// USER fields
    private String fullName;
    private String email;
    private String phone;
    private Gender gender;

    // PROFESSIONAL fields
    private Specialization specialization;
    private SpokenLanguage spokenLanguage;
    private Integer experienceYears;
    private String qualification;
    private String bio;
    private BigDecimal consultationFee;
}
