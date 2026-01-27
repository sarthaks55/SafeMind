package com.project.dto;

import com.project.enums.Gender;

import lombok.Data;

@Data
public class AdminUserViewDTO {
    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private Gender gender;
    private boolean isActive;
}
