package com.project.dto;



import java.math.BigDecimal;

import com.project.enums.Gender;
import com.project.enums.Specialization;
import com.project.enums.SpokenLanguage;

import lombok.Data;
@Data
public class RegisterProfessionalDTO {
	 private String fullName;
	 private String email;
	 private String password;
	 private String phone;
	 private Gender gender;
	 private String role= "ROLE_PROFESSIONAL"; // USER / THERAPIST / ADMIN
	 
	 private String specialization;
	 private int experienceYears;
	 private String qualification;
	 private String bio;
	 private BigDecimal consultationFee;
	 private SpokenLanguage spokenLanguage;
	
	
}
