package com.project.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.auth.request.LoginDTO;
import com.project.dto.auth.request.OtpVerifyDTO;
import com.project.dto.auth.request.RegisterDTO;
import com.project.dto.auth.request.RegisterProfessionalDTO;
import com.project.dto.auth.response.LoginResponseDTO;
import com.project.dto.auth.response.RegisterResponseDTO;
import com.project.entities.Professional;
import com.project.entities.User;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.security.JWTService;
import com.project.service.OtpService;
import com.project.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;
    private final JWTService jwtService;

    /* ================= REGISTER USER ================= */

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> register(
            @RequestBody @Valid RegisterDTO registerDTO) {

        User user = userService.registerUser(registerDTO);

        RegisterResponseDTO response =
                new RegisterResponseDTO(
                        user.getUserId(),
                        "User registered successfully. Please verify OTP."
                );

        return ResponseBuilder.success(
                "User registered successfully",
                response,
                HttpStatus.CREATED
        );
    }

    /* ================= REGISTER PROFESSIONAL ================= */

    @PostMapping("/register-professional")
    public ResponseEntity<ApiResponse<RegisterResponseDTO>> registerProfessional(
            @RequestBody @Valid RegisterProfessionalDTO dto) {

        Professional professional = userService.registerProfessional(dto);

        RegisterResponseDTO response =
                new RegisterResponseDTO(
                        professional.getUser().getUserId(),
                        "Professional registered successfully. Please verify OTP."
                );

        return ResponseBuilder.success(
                "Professional registered successfully",
                response,
                HttpStatus.CREATED
        );
    }

    /* ================= LOGIN ================= */

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
            @RequestBody @Valid LoginDTO dto) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dto.getEmail(),
                                dto.getPassword()
                        )
                );

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        String token = jwtService.generateToken(userDetails);

        return ResponseBuilder.success(
                "Login successful",
                new LoginResponseDTO(token),
                HttpStatus.OK
        );
    }

    /* ================= VERIFY OTP ================= */

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<Object>> verifyOtp(
            @RequestBody @Valid OtpVerifyDTO dto) {

        otpService.verifyOtp(dto.getUserId(), dto.getOtp());

        return ResponseBuilder.success(
                "OTP verified successfully",
                null,
                HttpStatus.NO_CONTENT
        );
    }
}
