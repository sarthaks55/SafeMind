package com.project.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.AppointmentRequestDTO;
import com.project.dto.AppointmentResponseDTO;
import com.project.dto.AppointmentStatusUpdateDTO;
import com.project.entities.Appointment;
import com.project.entities.Professional;
import com.project.entities.ProfessionalAvailability;
import com.project.entities.User;
import com.project.enums.AppointmentStatus;
import com.project.enums.DayOfWeekEnum;
import com.project.exception.AppointmentNotFoundException;
import com.project.exception.SlotAlreadyBookedException;
import com.project.exception.UnauthorizedAppointmentAccessException;
import com.project.repo.AppointmentRepository;
import com.project.repo.ProfessionalAvailabilityRepository;
import com.project.repo.ProfessionalRepo;
import com.project.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepo;
    private final ProfessionalAvailabilityRepository availabilityRepo;
    private final UserRepository userRepo;
    private final ProfessionalRepo professionalRepo;

    /* ================= USER BOOK APPOINTMENT ================= */

    @Override
    public AppointmentResponseDTO bookAppointment(
            AppointmentRequestDTO dto,
            Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Professional professional = professionalRepo.findById(dto.getProfessionalId())
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        if (!professional.isVerified()) {
            throw new RuntimeException("Professional not verified");
        }

        // Double booking check
        if (appointmentRepo.existsByProfessionalAndStartTime(
                professional, dto.getStartTime())) {
            throw new SlotAlreadyBookedException("Slot already booked");
        }

        // Availability check
        validateAvailability(professional, dto);

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setProfessional(professional);
        appointment.setStartTime(dto.getStartTime());
        appointment.setEndTime(dto.getEndTime());
        appointment.setStatus(AppointmentStatus.PENDING);

        appointmentRepo.save(appointment);

        return mapToDTO(appointment);
    }

    /* ================= USER CANCEL ================= */

    @Override
    public void cancelAppointment(Long appointmentId, Long userId) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));

        if (!appointment.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedAppointmentAccessException("Not your appointment");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);
    }

    /* ================= USER VIEW ================= */

    @Override
    public List<AppointmentResponseDTO> getUserAppointments(Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return appointmentRepo.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* ================= PROFESSIONAL VIEW ================= */

    @Override
    public List<AppointmentResponseDTO> getProfessionalAppointments(
            Long professionalUserId) {

        User user = userRepo.findById(professionalUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Professional professional = user.getProfessional();

        return appointmentRepo.findByProfessional(professional)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /* ================= PROFESSIONAL UPDATE STATUS ================= */

    @Override
    public AppointmentResponseDTO updateAppointmentStatus(
            Long appointmentId,
            AppointmentStatusUpdateDTO dto,
            Long professionalUserId) {

        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found"));

        if (!appointment.getProfessional().getUser().getUserId()
                .equals(professionalUserId)) {
            throw new UnauthorizedAppointmentAccessException("Not your appointment");
        }

        appointment.setStatus(dto.getStatus());
        return mapToDTO(appointment);
    }

    /* ================= HELPERS ================= */

    private void validateAvailability(
            Professional professional,
            AppointmentRequestDTO dto) {

        LocalDateTime start = dto.getStartTime();
        LocalDateTime end = dto.getEndTime();

        if (start.isAfter(end) || start.isEqual(end)) {
            throw new IllegalArgumentException(
                    "Invalid appointment time range");
        }

        /* 🚨 SAME DAY ENFORCEMENT */
        if (!start.toLocalDate().equals(end.toLocalDate())) {
            throw new IllegalArgumentException(
                    "Appointment must be on same day");
        }

        DayOfWeekEnum dayOfWeek =
                DayOfWeekEnum.valueOf(
                        start.getDayOfWeek().name());

        LocalTime appointmentStart = start.toLocalTime();
        LocalTime appointmentEnd = end.toLocalTime();

        List<ProfessionalAvailability> availabilities =
                availabilityRepo
                        .findByProfessional_ProfessionalIdAndDayOfWeek(
                                professional.getProfessionalId(),
                                dayOfWeek);

        if (availabilities.isEmpty()) {
            throw new IllegalArgumentException(
                    "Professional not available on " + dayOfWeek);
        }

        boolean fitsAnySlot = availabilities.stream()
                .anyMatch(a ->
                        !appointmentStart.isBefore(a.getStartTime()) &&
                        !appointmentEnd.isAfter(a.getEndTime())
                );

        if (!fitsAnySlot) {
            throw new IllegalArgumentException(
                    "Appointment time outside professional availability");
        }
    }


    private AppointmentResponseDTO mapToDTO(Appointment a) {
        return AppointmentResponseDTO.builder()
                .appointmentId(a.getAppointmentId())
                .userId(a.getUser().getUserId())
                .professionalId(a.getProfessional().getProfessionalId())
                .startTime(a.getStartTime())
                .endTime(a.getEndTime())
                .status(a.getStatus())
                .build();
    }
    
    
    
    
    
    @Override
    public List<AppointmentResponseDTO> getAllAppointments() {
        return appointmentRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsByStatus(
            AppointmentStatus status) {

        return appointmentRepo.findByStatus(status)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsByUser(Long userId) {

        return appointmentRepo.findByUser_UserId(userId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsByProfessional(
            Long professionalId) {

        return appointmentRepo.findByProfessional_ProfessionalId(professionalId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public List<AppointmentResponseDTO> getAppointmentsBetweenDates(
            LocalDateTime start,
            LocalDateTime end) {

        return appointmentRepo.findByStartTimeBetween(start, end)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

}
