package com.project.dto;

import com.project.entities.Gender;

import lombok.Data;

@Data
public class RegisterDTO {
	 private String fullName;
	 private String email;
	 private String password;
	 private String phone;
	 private Gender gender;
	 private String role= "ROLE_USER"; // USER / THERAPIST / ADMIN

}
