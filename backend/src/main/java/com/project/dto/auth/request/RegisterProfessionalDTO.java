package com.project.dto.auth.request;

import java.math.BigDecimal;

import com.project.enums.Gender;
import com.project.enums.Specialization;
import com.project.enums.SpokenLanguage;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class RegisterProfessionalDTO {

    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    @Pattern(
        regexp = "^[A-Za-z ]+$",
        message = "Full name can contain only letters and spaces"
    )
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 64, message = "Password must be between 6 and 64 characters")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
        message = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Phone number must be a valid 10-digit Indian mobile number"
    )
    private String phone;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @Pattern(
        regexp = "ROLE_PROFESSIONAL",
        message = "Role must be ROLE_PROFESSIONAL"
    )
    private String role = "ROLE_PROFESSIONAL";

    @NotNull(message = "Specialization is required")
    private Specialization specialization;

    @Min(value = 0, message = "Experience cannot be negative")
    @Max(value = 60, message = "Experience seems invalid")
    private int experienceYears;

    @NotBlank(message = "Qualification is required")
    @Size(min = 2, max = 100, message = "Qualification must be between 2 and 100 characters")
    private String qualification;

    @Size(max = 500, message = "Bio must not exceed 500 characters")
    private String bio;

    @NotNull(message = "Consultation fee is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Consultation fee must be greater than 0")
    private BigDecimal consultationFee;

    @NotNull(message = "Spoken language is required")
    private SpokenLanguage spokenLanguage;
}
