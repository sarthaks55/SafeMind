package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.LoginDTO;
import com.project.dto.OtpVerifyDTO;
import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.dto.RegisterResponseDTO;
import com.project.dto.LoginResponseDTO;
import com.project.entities.Professional;
import com.project.entities.User;
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

	@Autowired
    private final UserService userService;
	@Autowired
	private final AuthenticationManager authenticationManager;
	@Autowired
	private final OtpService otpService;
	@Autowired
	private final JWTService jwtService;

    /* ================= REGISTER USER ================= */

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(
            @RequestBody @Valid RegisterDTO registerDTO) {

        User user = userService.registerUser(registerDTO);

        return ResponseEntity.status(201).body(
                new RegisterResponseDTO(
                        user.getUserId(),
                        "User registered successfully. Please verify OTP."
                )
        );
    }

    /* ================= REGISTER PROFESSIONAL ================= */

    @PostMapping("/register-professional")
    public ResponseEntity<RegisterResponseDTO> registerProfessional(
            @RequestBody @Valid RegisterProfessionalDTO dto) {

        Professional professional = userService.registerProfessional(dto);

        return ResponseEntity.status(201).body(
                new RegisterResponseDTO(
                        professional.getUser().getUserId(),
                        "Professional registered successfully. Please verify OTP."
                )
        );
    }

    /* ================= LOGIN ================= */

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
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

        return ResponseEntity.ok(
                new LoginResponseDTO(
                        token
                )
        );
    }

    /* ================= VERIFY OTP ================= */

    @PostMapping("/verify-otp")
    public ResponseEntity<Void> verifyOtp(
            @RequestBody @Valid OtpVerifyDTO dto) {

        otpService.verifyOtp(dto.getUserId(), dto.getOtp());

        return ResponseEntity.noContent().build(); // 204
    }
}
