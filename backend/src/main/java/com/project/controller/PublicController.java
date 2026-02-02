package com.project.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.professional.response.ProfessionalAvailabilityResponseDTO;
import com.project.dto.user.response.ProfessionalViewDTO;
import com.project.exception.ApiResponse;
import com.project.exception.ResponseBuilder;
import com.project.security.CustomUserDetails;
import com.project.service.ProfessionalService;
import com.project.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PublicController {
	private final UserService userService;
    private final ProfessionalService professionalService;


	@GetMapping("/professionals")
	public ResponseEntity<ApiResponse<List<ProfessionalViewDTO>>> getProfessionals() {

		List<ProfessionalViewDTO> professionals = userService.getAllProfessionals();

		return ResponseBuilder.success("Professionals fetched successfully", professionals, HttpStatus.OK);

	}
	
	   @GetMapping("/availability/{professionalId}")
	    public ResponseEntity<ApiResponse<List<ProfessionalAvailabilityResponseDTO>>> getMyAvailabilityUser(
	          @PathVariable Long professionalId) {


	        List<ProfessionalAvailabilityResponseDTO> response =
	                professionalService.getMyAvailabilityUser(
	                		professionalId);

	        return ResponseBuilder.success(
	                "Availability fetched successfully",
	                response,
	                HttpStatus.OK
	        );
	    }
	
}
