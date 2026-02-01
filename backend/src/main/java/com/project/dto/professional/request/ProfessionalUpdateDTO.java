package com.project.dto.professional.request;

import java.math.BigDecimal;

import com.project.enums.Gender;
import com.project.enums.Specialization;
import com.project.enums.SpokenLanguage;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class ProfessionalUpdateDTO {

    // USER fields (optional but validated if present)

    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
    @Pattern(
        regexp = "^[A-Za-z ]+$",
        message = "Full name can contain only letters and spaces"
    )
    private String fullName;

    @Email(message = "Invalid email format")
    private String email;

    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Phone number must be a valid 10-digit Indian mobile number"
    )
    private String phone;

    private Gender gender;

    // PROFESSIONAL fields

    private Specialization specialization;

    private SpokenLanguage spokenLanguage;

    @Min(value = 0, message = "Experience cannot be negative")
    @Max(value = 60, message = "Experience seems invalid")
    private Integer experienceYears;

    @Size(min = 2, max = 100, message = "Qualification must be between 2 and 100 characters")
    private String qualification;

    @Size(max = 500, message = "Bio must not exceed 500 characters")
    private String bio;

    @DecimalMin(value = "0.0", inclusive = false, message = "Consultation fee must be greater than 0")
    private BigDecimal consultationFee;
}
