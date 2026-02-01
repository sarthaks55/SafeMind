package com.project.dto.auth.request;

import lombok.Data;

@Data
public class OtpVerifyDTO {
    private Long userId;
    private String otp;
}

