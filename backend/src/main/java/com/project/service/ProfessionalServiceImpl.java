package com.project.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.PasswordUpdateDTO;
import com.project.dto.ProfessionalAppointmentStatusDTO;
import com.project.dto.ProfessionalAvailabilityDTO;
import com.project.dto.ProfessionalAvailabilityResponseDTO;
import com.project.dto.ProfessionalUpdateDTO;
import com.project.entities.Appointment;
import com.project.entities.Professional;
import com.project.entities.ProfessionalAvailability;
import com.project.entities.User;
import com.project.enums.AppointmentStatus;
import com.project.exception.DuplicateEmailException;
import com.project.exception.InvalidAppointmentStatusException;
import com.project.exception.ProfessionalNotFoundException;
import com.project.exception.UnauthorizedAppointmentAccessException;
import com.project.exception.UserNotFoundException;
import com.project.repo.AppointmentRepository;
import com.project.repo.ProfessionalAvailabilityRepository;
import com.project.repo.ProfessionalRepo;
import com.project.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfessionalServiceImpl implements ProfessionalService {

    private final ProfessionalRepo professionalRepo;
    private final UserRepository userRepo;
    private final AppointmentRepository appointmentRepo;
    private final PasswordEncoder passwordEncoder;
    private final ProfessionalAvailabilityRepository availabilityRepo;
    private final NotificationService notificationService;


    /* ================= PROFILE UPDATE ================= */

    @Override
    public Professional updateProfessionalProfile(
            Long userId,
            ProfessionalUpdateDTO dto) {

        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        User user = professional.getUser();

        /* ===== USER ===== */
        if (dto.getFullName() != null)
            user.setFullName(dto.getFullName());

        if (dto.getEmail() != null &&
            !dto.getEmail().equals(user.getEmail())) {

            if (userRepo.existsByEmail(dto.getEmail()))
                throw new DuplicateEmailException(
                        "Email already exists");

            user.setEmail(dto.getEmail());
        }

        if (dto.getPhone() != null)
            user.setPhone(dto.getPhone());

        if (dto.getGender() != null)
            user.setGender(dto.getGender());


        /* ===== PROFESSIONAL ===== */
        if (dto.getSpecialization() != null)
            professional.setSpecialization(
                    dto.getSpecialization());

        if (dto.getSpokenLanguage() != null)
            professional.setSpokenLanguage(
                    dto.getSpokenLanguage());

        if (dto.getExperienceYears() != null)
            professional.setExperienceYears(
                    dto.getExperienceYears());

        if (dto.getQualification() != null)
            professional.setQualification(
                    dto.getQualification());

        if (dto.getBio() != null)
            professional.setBio(dto.getBio());

        if (dto.getConsultationFee() != null)
            professional.setConsultationFee(
                    dto.getConsultationFee());

        return professional;
    }

    
    
    /* ================= PASSWORD UPDATE ================= */

    @Override
    public void updatePassword(
            Long userId,
            PasswordUpdateDTO dto) {

        User user = userRepo.findById(userId)
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

    
    
    /* ================= APPOINTMENT STATUS ================= */

    @Override
    public void updateAppointmentStatus(
    		Long userId,
            Long appointmentId,
            ProfessionalAppointmentStatusDTO dto) {

        Appointment appointment =
                appointmentRepo.findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found"));
        
        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        if (!appointment.getProfessional()
                .getProfessionalId()
                .equals(professional.getProfessionalId())) {

            throw new UnauthorizedAppointmentAccessException(
                    "Not your appointment");
        }

        AppointmentStatus current =
                appointment.getStatus();
        AppointmentStatus next =
                dto.getStatus();

        boolean valid =
                (current == AppointmentStatus.PENDING &&
                        next == AppointmentStatus.CONFIRMED)
             || (current == AppointmentStatus.CONFIRMED &&
                        (next == AppointmentStatus.CANCELLED
                      || next == AppointmentStatus.COMPLETED
                      || next == AppointmentStatus.NO_SHOW));

        if (!valid)
            throw new InvalidAppointmentStatusException(
                    "Invalid status transition");

        appointment.setStatus(next);
        appointmentRepo.save(appointment);

        /*  NOTIFY USER */
        String title = "Appointment Update";
        String message = switch (next) {
            case CONFIRMED -> "Your appointment has been confirmed.";
            case CANCELLED -> "Your appointment has been cancelled by the professional.";
            case COMPLETED -> "Your appointment has been marked as completed.";
            case NO_SHOW -> "You were marked as no-show for the appointment.";
            default -> "Appointment status updated.";
        };

        notificationService.sendInAppNotification(
            appointment.getUser().getUserId(),
            title,
            message
        );

        notificationService.sendEmailNotification(
            appointment.getUser().getEmail(),
            title,
            message);
    }
    
    
    
    
    
    
    
    @Override
    public ProfessionalAvailabilityResponseDTO addAvailability(
            Long userId,
            ProfessionalAvailabilityDTO dto) {

        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        if (dto.getStartTime().compareTo(dto.getEndTime()) >= 0)
            throw new IllegalArgumentException("Invalid time range");

        if (availabilityRepo
                .existsByProfessional_ProfessionalIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                        professional.getProfessionalId(),
                        dto.getDayOfWeek(),
                        dto.getEndTime(),
                        dto.getStartTime())) {

            throw new IllegalArgumentException(
                    "Overlapping availability exists");
        }

        ProfessionalAvailability availability =
                new ProfessionalAvailability();

        availability.setProfessional(professional);
        availability.setDayOfWeek(dto.getDayOfWeek());
        availability.setStartTime(dto.getStartTime());
        availability.setEndTime(dto.getEndTime());

        availabilityRepo.save(availability);

        return new ProfessionalAvailabilityResponseDTO(
                availability.getAvailabilityId(),
                availability.getDayOfWeek(),
                availability.getStartTime(),
                availability.getEndTime()
        );
    }



    /* ================= GET ================= */

    @Override
    public List<ProfessionalAvailabilityResponseDTO> getMyAvailability(
            Long userId) {

        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        return availabilityRepo
                .findByProfessional_ProfessionalId(
                        professional.getProfessionalId())
                .stream()
                .map(a -> new ProfessionalAvailabilityResponseDTO(
                        a.getAvailabilityId(),
                        a.getDayOfWeek(),
                        a.getStartTime(),
                        a.getEndTime()))
                .toList();
    }



    /* ================= UPDATE ================= */

    @Override
    public ProfessionalAvailability updateAvailability(
            Long userId,
            Long availabilityId,
            ProfessionalAvailabilityDTO dto) {

        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        ProfessionalAvailability availability =
                availabilityRepo.findById(availabilityId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Availability not found"));

        if (!availability.getProfessional()
                .getProfessionalId()
                .equals(professional.getProfessionalId())) {

            throw new UnauthorizedAppointmentAccessException(
                    "Not your availability");
        }

        if (availabilityRepo
                .existsByProfessional_ProfessionalIdAndDayOfWeekAndStartTimeLessThanAndEndTimeGreaterThan(
                        professional.getProfessionalId(),
                        dto.getDayOfWeek(),
                        dto.getEndTime(),
                        dto.getStartTime())) {

            throw new IllegalArgumentException(
                    "Overlapping availability exists");
        }

        availability.setDayOfWeek(dto.getDayOfWeek());
        availability.setStartTime(dto.getStartTime());
        availability.setEndTime(dto.getEndTime());

        return availability;
    }


    /* ================= DELETE ================= */

    @Override
    public void deleteAvailability(
            Long userId,
            Long availabilityId) {

        Professional professional =
                professionalRepo.findByUser_UserId(userId)
                        .orElseThrow(() ->
                                new ProfessionalNotFoundException(
                                        "Professional not found"));

        ProfessionalAvailability availability =
                availabilityRepo.findById(availabilityId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Availability not found"));

        if (!availability.getProfessional()
                .getProfessionalId()
                .equals(professional.getProfessionalId())) {

            throw new UnauthorizedAppointmentAccessException(
                    "Not your availability");
        }

        availabilityRepo.delete(availability);
    }

    
}
