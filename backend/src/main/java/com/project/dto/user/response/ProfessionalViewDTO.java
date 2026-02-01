package com.project.dto.user.response;



import java.math.BigDecimal;

import com.project.enums.Gender;
import com.project.enums.Specialization;
import com.project.enums.SpokenLanguage;

import lombok.Data;

@Data
public class ProfessionalViewDTO {
	private Long professionalId;
    private Long userId;
	private String fullName;
	private Gender gender;
	 
	 private Specialization specialization;
	 private int experienceYears;
	 private String qualification;
	 private String bio;
	 private BigDecimal consultationFee;
	 private SpokenLanguage spokenLanguage;
	 private boolean isVerified;
}


