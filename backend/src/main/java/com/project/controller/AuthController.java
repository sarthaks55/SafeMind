package com.project.controller;

import javax.management.relation.RoleNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.LoginDTO;
import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.entities.Professional;
import com.project.entities.User;
import com.project.exception.DuplicateEmailException;
import com.project.security.CustomUserDetails;
import com.project.security.JWTService;
import com.project.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JWTService JWTService;
	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

    AuthController(JWTService JWTService) {
        this.JWTService = JWTService;
    }
	
	@PostMapping("/register")
	public String register(@RequestBody RegisterDTO registerDTO) {
		User user = userService.registerUser(registerDTO);
		System.out.println(user);
		return "User registered successfully";
	}
	@PostMapping("/registerProfessional")
	public String registerProfessional(@RequestBody RegisterProfessionalDTO registerProfessionalDTO){
		Professional professional = userService.registerProfessional(registerProfessionalDTO);
		System.out.println(professional);
		return "Professional registered successfully";
	}
	
	@PostMapping("/login")
    public String login(@RequestBody LoginDTO dto) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dto.getEmail(),
                                dto.getPassword()
                        )
                );

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return JWTService.generateToken(userDetails);
    }
	
	

}
