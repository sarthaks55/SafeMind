package com.project.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.entities.Professional;
import com.project.entities.Role;
import com.project.entities.User;
import com.project.enums.Specialization;
import com.project.exception.DuplicateEmailException;
import com.project.exception.RoleNotFoundException;
import com.project.exception.SpecializationNotFoundException;
import com.project.repo.ProfessionalRepo;
import com.project.repo.RoleRepo;
import com.project.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private ProfessionalRepo professionalRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public User registerUser(RegisterDTO dto) {
		
		if(userRepository.existsByEmail(dto.getEmail())){
			throw new DuplicateEmailException("Email Already Exists");
		}
		
		Role role = roleRepo.findByRoleName(dto.getRole());

		if (role == null) {
			throw new RoleNotFoundException("Invalid Role");
		}
		User user = modelMapper.map(dto, User.class);
		String hashPassword = passwordEncoder.encode(dto.getPassword());
		user.setPasswordHash(hashPassword);
		user.setRole(role);
		return userRepository.save(user);

	}

	@Override
	public Professional registerProfessional(RegisterProfessionalDTO dto) {
		if(userRepository.existsByEmail(dto.getEmail())){
			throw new DuplicateEmailException("Email Already Exists");
		}
		
		Role role = roleRepo.findByRoleName(dto.getRole());

		if (role == null) {
			throw new RoleNotFoundException("Invalid Role");
		}
		
		Specialization specialization = null;
		try {
			specialization = Specialization.valueOf(dto.getSpecialization());
		} catch (IllegalArgumentException ex) {
			throw new SpecializationNotFoundException("Invalid Specialization");
		}
		System.out.println(specialization);

		User user = modelMapper.map(dto, User.class);
		String hashPassword = passwordEncoder.encode(dto.getPassword());
		user.setPasswordHash(hashPassword);
		user.setRole(role);
		Professional professional = new Professional(user, dto.getSpokenLanguage(), dto.getExperienceYears(), dto.getQualification(), dto.getBio(), dto.getConsultationFee());
		professional.setSpecialization(specialization);
		return professionalRepo.save(professional);
	}

}
