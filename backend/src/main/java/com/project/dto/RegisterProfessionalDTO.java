package com.project.dto;



import java.math.BigDecimal;

import com.project.entities.SpokenLanguage;
import com.project.enums.Specialization;

import lombok.Data;
@Data
public class RegisterProfessionalDTO {
	 private String fullName;
	 private String email;
	 private String password;
	 private String phone;
	 private String role= "ROLE_PROFESSIONAL"; // USER / THERAPIST / ADMIN
	 
	 private String specialization;
	 private int experienceYears;
	 private String qualification;
	 private String bio;
	 private BigDecimal consultationFee;
	 private SpokenLanguage spokenLanguage;
	
	
}
