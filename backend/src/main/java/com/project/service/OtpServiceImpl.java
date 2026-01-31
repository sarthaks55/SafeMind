package com.project.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.entities.OtpVerification;
import com.project.entities.User;
import com.project.repo.OtpVerificationRepository;
import com.project.repo.UserRepository;
import com.project.security.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final OtpVerificationRepository otpRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final SmsService smsService; // abstraction
    private final OtpUtil otpUtil;
    private final UserRepository userRepo;


    public void sendOtp(User user) {

        if (user.getUserId() == null) {
            throw new IllegalStateException(
                "User must be persisted before sending OTP"
            );
        }

        String otp = otpUtil.generateOtp();

        OtpVerification verification = new OtpVerification();
        verification.setUser(user);
        verification.setOtpHash(passwordEncoder.encode(otp));
        verification.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        otpRepo.save(verification);

        emailService.sendEmail(
                user.getEmail(),
                "OTP Verification",
                "Your OTP is: " + otp
        );

        smsService.sendSms(
                user.getPhone(),
                "Your OTP is " + otp
        );
    }


    @Transactional
    public void verifyOtp(Long userId, String otp) {

        OtpVerification verification =
                otpRepo.findByUser_UserIdAndVerifiedFalse(userId)
                        .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (!passwordEncoder.matches(otp, verification.getOtpHash())) {
            throw new RuntimeException("Invalid OTP");
        }

        verification.setVerified(true);

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setActive(true);
    }

}
