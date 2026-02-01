package com.project.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.entities.Appointment;
import com.project.entities.VideoSession;
import com.project.enums.AppointmentStatus;
import com.project.enums.VideoSessionStatus;
import com.project.exception.AppointmentNotFoundException;
import com.project.exception.VideoSessionNotFoundException;
import com.project.exception.InvalidAppointmentActionException;
import com.project.repo.AppointmentRepository;
import com.project.repo.VideoSessionRepo;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class VideoSessionServiceImpl implements VideoSessionService {

    private final VideoSessionRepo videoSessionRepo;
    private final AppointmentRepository appointmentRepository;

    /* ================= JOIN / CREATE ================= */

    @Override
    public VideoSession createOrGetVideoSession(Long appointmentId) {

        Appointment appointment = appointmentRepository
                .findById(appointmentId)
                .orElseThrow(() ->
                        new AppointmentNotFoundException(
                                "Appointment not found with id " + appointmentId));

        // 1️⃣ Status validation
        if (appointment.getStatus() != AppointmentStatus.CONFIRMED) {
            throw new InvalidAppointmentActionException(
                    "Video session allowed only for CONFIRMED appointments");
        }

        // 2️⃣ Time window validation
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(appointment.getStartTime())
                || now.isAfter(appointment.getEndTime())) {

            throw new InvalidAppointmentActionException(
                    "Outside appointment time window");
        }

        // 3️⃣ Idempotent fetch-or-create
        return videoSessionRepo
                .findByAppointmentAppointmentId(
                        appointment.getAppointmentId())
                .orElseGet(() -> createNewSession(appointment));
    }

    private VideoSession createNewSession(Appointment appointment) {

        VideoSession session = new VideoSession();
        session.setAppointment(appointment);
        session.setRoomToken(UUID.randomUUID().toString());
        session.setAllowedFrom(appointment.getStartTime());
        session.setAllowedUntil(appointment.getEndTime());
        session.setStatus(VideoSessionStatus.CREATED);

        return videoSessionRepo.save(session);
    }

    /* ================= PARTICIPANT JOIN ================= */

    @Override
    public void markParticipantJoined(Long videoSessionId, boolean isProfessional) {

        VideoSession session = getById(videoSessionId);

        if (session.getStatus() == VideoSessionStatus.COMPLETED
                || session.getStatus() == VideoSessionStatus.EXPIRED) {

            throw new InvalidAppointmentActionException(
                    "Session already ended");
        }

        if (isProfessional) {
            session.setProfessionalJoined(LocalDateTime.now());
        } else {
            session.setPatientJoined(LocalDateTime.now());
        }

        session.setStatus(VideoSessionStatus.ACTIVE);
        videoSessionRepo.save(session);
    }

    /* ================= END SESSION ================= */

    @Override
    public void endSession(Long videoSessionId) {

        VideoSession session = getById(videoSessionId);
        session.setStatus(VideoSessionStatus.COMPLETED);
        videoSessionRepo.save(session);
    }

    /* ================= FETCH ================= */

    @Override
    public VideoSession getById(Long videoSessionId) {

        return videoSessionRepo
                .findById(videoSessionId)
                .orElseThrow(() ->
                        new VideoSessionNotFoundException(
                                "Video session not found with id " + videoSessionId));
    }
}
