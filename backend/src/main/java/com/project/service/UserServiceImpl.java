package com.project.service;



import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.RegisterDTO;
import com.project.dto.RegisterProfessionalDTO;
import com.project.dto.UserUpdateDTO;
import com.project.entities.Appointment;
import com.project.entities.Professional;
import com.project.entities.Role;
import com.project.entities.User;
import com.project.enums.AppointmentStatus;
import com.project.enums.Specialization;
import com.project.exception.DuplicateEmailException;
import com.project.exception.EmailAlreadyExistsException;
import com.project.exception.InvalidAppointmentActionException;
import com.project.exception.RoleNotFoundException;
import com.project.exception.SpecializationNotFoundException;
import com.project.exception.UnauthorizedAppointmentAccessException;
import com.project.exception.UserNotFoundException;
import com.project.repo.AppointmentRepository;
import com.project.repo.ProfessionalRepo;
import com.project.repo.RoleRepo;
import com.project.repo.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
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
	@Autowired
	private final AppointmentRepository appointmentRepo;
	@Autowired
    private final NotificationService notificationService;
	@Autowired
	private final EmailService emailService;

	
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

	    if (userRepository.existsByEmail(dto.getEmail())) {
	        throw new DuplicateEmailException("Email Already Exists");
	    }

	    Role role = roleRepo.findByRoleName(dto.getRole());
	    if (role == null) {
	        throw new RoleNotFoundException("Invalid Role");
	    }

	    Specialization specialization;
	    try {
	        specialization = Specialization.valueOf(dto.getSpecialization());
	    } catch (IllegalArgumentException ex) {
	        throw new SpecializationNotFoundException("Invalid Specialization");
	    }

	    User user = modelMapper.map(dto, User.class);
	    user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
	    user.setRole(role);

	    Professional professional = new Professional(
	            user,
	            dto.getSpokenLanguage(),
	            dto.getExperienceYears(),
	            dto.getQualification(),
	            dto.getBio(),
	            dto.getConsultationFee()
	    );
	    professional.setSpecialization(specialization);

	    Professional savedProfessional = professionalRepo.save(professional);

	    /* 🔔 NOTIFY ADMINS */
	    List<User> admins = userRepository.findByRole_RoleName("ROLE_ADMIN");

	    for (User admin : admins) {

	        // 🔔 In-app notification
	        notificationService.sendInAppNotification(
	                admin.getUserId(),
	                "New Professional Registration",
	                "A new professional (" + user.getFullName() + 
	                ") has registered and is awaiting verification."
	        );

	        // 📧 Email notification
	        try {
	            emailService.sendEmail(
	                    admin.getEmail(),
	                    "New Professional Registration",
	                    """
	                    Hello Admin,

	                    A new professional has registered and is awaiting verification.

	                    Name: %s
	                    Email: %s
	                    Specialization: %s

	                    Please log in to the admin panel to review and verify.

	                    Regards,
	                    Team
	                    """.formatted(
	                            user.getFullName(),
	                            user.getEmail(),
	                            specialization.name()
	                    )
	            );
	        } catch (Exception e) {
	            // ❗ NEVER fail registration due to email failure
	            System.out.println("Failed to send admin email notification"+e);
	        }
	    }

	    return savedProfessional;
	}

	
	
	
	
	
	
	
	
	
	
	 /* ================= PROFILE UPDATE ================= */

    @Override
    public User updateProfile(
            Long userId,
            UserUpdateDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found"));

        if (dto.getEmail() != null &&
        		userRepository.existsByEmailAndUserIdNot(
                    dto.getEmail(), userId)) {

            throw new EmailAlreadyExistsException(
                    "Email already in use");
        }

        if (dto.getFullName() != null)
            user.setFullName(dto.getFullName());

        if (dto.getEmail() != null)
            user.setEmail(dto.getEmail());

        if (dto.getPhone() != null)
            user.setPhone(dto.getPhone());

        if (dto.getGender() != null)
            user.setGender(dto.getGender());

        return user;
    }

    /* ================= PASSWORD UPDATE ================= */

    @Override
    public void updatePassword(
            Long userId,
            PasswordUpdateDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found"));

        if (!passwordEncoder.matches(
                dto.getOldPassword(),
                user.getPasswordHash())) {

            throw new RuntimeException(
                    "Old password incorrect");
        }

        user.setPasswordHash(
                passwordEncoder.encode(
                        dto.getNewPassword()));
    }

    /* ================= APPOINTMENT CANCEL ================= */

    @Override
    public void cancelConfirmedAppointment(
            Long appointmentId,
            Long userId) {

        Appointment appointment =
                appointmentRepo.findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found"));

        if (!appointment.getUser()
                .getUserId().equals(userId)) {

            throw new UnauthorizedAppointmentAccessException(
                    "Not your appointment");
        }

        if (appointment.getStatus()
                != AppointmentStatus.CONFIRMED) {

            throw new InvalidAppointmentActionException(
                    "Only CONFIRMED appointments can be cancelled");
        }

        appointment.setStatus(
                AppointmentStatus.CANCELLED);
    }
}
	
	
	
	

