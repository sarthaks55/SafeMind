package com.project.dto;

import lombok.Data;

@Data
public class OtpVerifyDTO {
    private Long userId;
    private String otp;
}

