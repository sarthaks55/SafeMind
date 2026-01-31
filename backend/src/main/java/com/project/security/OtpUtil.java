package com.project.security;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class OtpUtil {

    private static final SecureRandom random = new SecureRandom();

    public String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000)); // 6-digit
    }
}

