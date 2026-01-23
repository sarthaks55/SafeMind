package com.project.service;

import javax.management.relation.RoleNotFoundException;

import org.springframework.stereotype.Service;

import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.entities.Professional;
import com.project.entities.User;


public interface UserService {

	
	User registerUser(RegisterDTO dto);

	Professional registerProfessional(RegisterProfessionalDTO registerProfessionalDTO);
	
	
	
}
